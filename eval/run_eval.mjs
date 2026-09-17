import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8").replace(/^\uFEFF/u, ""));
}

const cases = readJson(path.join(here, "golden_set.json"));
const responsesFlagIndex = process.argv.indexOf("--responses");
const responsesPath = responsesFlagIndex >= 0 ? process.argv[responsesFlagIndex + 1] : null;

if (responsesFlagIndex >= 0 && !responsesPath) {
  throw new Error("Thiếu đường dẫn sau --responses.");
}

let externalResponseMap = null;
let externalProvenance = null;
let runMode = "local-policy-baseline";
if (responsesPath) {
  const resolvedResponsesPath = path.resolve(process.cwd(), responsesPath);
  const rawResponses = fs.readFileSync(resolvedResponsesPath);
  const payload = JSON.parse(rawResponses.toString("utf8").replace(/^\uFEFF/u, ""));
  const responses = Array.isArray(payload) ? payload : payload.responses;
  if (!Array.isArray(responses)) {
    throw new Error("File responses phải là một array hoặc object có trường responses là array.");
  }
  externalResponseMap = new Map(responses.map((response) => [response.case_id, response]));
  const missing = cases.map((testCase) => testCase.id).filter((caseId) => !externalResponseMap.has(caseId));
  if (missing.length > 0) {
    throw new Error(`Thiếu output cho ${missing.length} case: ${missing.join(", ")}`);
  }
  runMode = "external-ai-responses";
  const metadata = Array.isArray(payload) ? {} : payload.metadata || {};
  externalProvenance = {
    response_file: path.basename(resolvedResponsesPath),
    response_file_sha256: crypto.createHash("sha256").update(rawResponses).digest("hex"),
    provider: metadata.provider || null,
    model: metadata.model || null,
    prompt_version: metadata.prompt_version || null,
    parameters: metadata.parameters || null,
    trace_ref: metadata.trace_ref || null,
    trace_sha256: metadata.trace_sha256 || null
  };
}

function hasDeadlineSignal(text) {
  return /deadline|hạn|nộp|đóng|trước\s+\d{1,2}:\d{2}/iu.test(text);
}

function parseAbsoluteDue(text) {
  const dateMatch = text.match(/(\d{1,2})\/(\d{1,2})(?:\/(\d{4}))?/u);
  const timeMatch = text.match(/(\d{1,2}):(\d{2})/u);
  if (!dateMatch || !timeMatch) return null;
  const year = Number(dateMatch[3] || 2026);
  const month = String(Number(dateMatch[2])).padStart(2, "0");
  const day = String(Number(dateMatch[1])).padStart(2, "0");
  const hour = String(Number(timeMatch[1])).padStart(2, "0");
  const minute = String(Number(timeMatch[2])).padStart(2, "0");
  return `${year}-${month}-${day}T${hour}:${minute}:00+07:00`;
}

function parseRelativeFriday(text, createdAt) {
  if (!/thứ\s+sáu\s+tuần\s+này/iu.test(text)) return null;
  const timeMatch = text.match(/(\d{1,2}):(\d{2})/u);
  if (!timeMatch) return null;
  const date = new Date(createdAt);
  const localDay = new Date(date.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }));
  const delta = (5 - localDay.getDay() + 7) % 7;
  localDay.setDate(localDay.getDate() + delta);
  const year = localDay.getFullYear();
  const month = String(localDay.getMonth() + 1).padStart(2, "0");
  const day = String(localDay.getDate()).padStart(2, "0");
  const hour = String(Number(timeMatch[1])).padStart(2, "0");
  const minute = String(Number(timeMatch[2])).padStart(2, "0");
  return `${year}-${month}-${day}T${hour}:${minute}:00+07:00`;
}

function baselineDecision(testCase) {
  const { input } = testCase;
  const messages = input.messages || [];
  const first = messages[0] || {};
  const combinedText = messages.map((message) => message.text || "").join("\n");

  if (input.event_type === "source_deleted" || messages.some((message) => message.deleted)) {
    return { decision: "HUMAN_REVIEW", due_at_local: null, source_message_id: first.message_id || null, calendar_action: "HOLD", explanation: "Nguồn đã bị xóa; giữ trạng thái để TA đối chiếu." };
  }

  if (input.event_type === "user_correction") {
    return { decision: "HUMAN_REVIEW", due_at_local: null, source_message_id: first.message_id || null, calendar_action: "HOLD", explanation: "Yêu cầu thay đổi deadline vượt thẩm quyền tự động của bot." };
  }

  if (!hasDeadlineSignal(combinedText)) {
    return { decision: "IGNORED_OUT_OF_SCOPE", due_at_local: null, source_message_id: null, calendar_action: "NONE", explanation: "Không phát hiện tín hiệu deadline." };
  }

  const officialMessages = messages.filter((message) => message.official && message.allowed_channel);
  if (officialMessages.length === 0) {
    return { decision: "REJECTED", due_at_local: null, source_message_id: null, calendar_action: "NONE", explanation: "Không có nguồn chính thức trong kênh được phép." };
  }

  const matchingCohortMessages = officialMessages.filter((message) => !message.cohort || message.cohort === input.viewer_cohort);
  if (matchingCohortMessages.length === 0) {
    return { decision: "REJECTED", due_at_local: null, source_message_id: null, calendar_action: "NONE", explanation: "Nguồn thuộc cohort khác." };
  }

  if (matchingCohortMessages.length > 1 && !/gia hạn/iu.test(combinedText)) {
    return { decision: "NEEDS_REVIEW", due_at_local: null, source_message_id: null, calendar_action: "HOLD", explanation: "Có nhiều nguồn chính thức nhưng chưa đủ căn cứ gộp thành một deadline." };
  }

  const selected = [...matchingCohortMessages].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0];
  const dueAt = parseAbsoluteDue(selected.text) || parseRelativeFriday(selected.text, selected.created_at);
  if (!dueAt) {
    return { decision: "NEEDS_REVIEW", due_at_local: null, source_message_id: selected.message_id, calendar_action: "HOLD", explanation: "Nguồn chính thức chưa đủ ngày và giờ tuyệt đối." };
  }

  return { decision: "PUBLISHED", due_at_local: dueAt, source_message_id: selected.message_id, calendar_action: "CREATE", explanation: "Nguồn chính thức, kênh hợp lệ và có ngày giờ chuẩn hóa được." };
}

function scoreCase(testCase, actual) {
  const expected = testCase.expected;
  const checks = {
    decision: actual.decision === expected.decision,
    due_at_local: actual.due_at_local === expected.due_at_local,
    source_message_id: actual.source_message_id === expected.source_message_id,
    calendar_action: actual.calendar_action === expected.calendar_action
  };
  const hallucinatedDeadline = actual.due_at_local !== null && (expected.due_at_local === null || actual.due_at_local !== expected.due_at_local);
  return { checks, hallucinated_deadline: hallucinatedDeadline, passed: Object.values(checks).every(Boolean) && !hallucinatedDeadline };
}

const results = cases.map((testCase) => {
  const actual = externalResponseMap ? externalResponseMap.get(testCase.id) : baselineDecision(testCase);
  for (const field of ["decision", "due_at_local", "source_message_id", "calendar_action"]) {
    if (!(field in actual)) throw new Error(`${testCase.id}: output thiếu trường ${field}`);
  }
  return { case_id: testCase.id, bucket: testCase.bucket, difficulty_layers: testCase.difficulty_layers, source_origin: testCase.source_origin, source_refs: testCase.source_refs, expected: testCase.expected, actual, ...scoreCase(testCase, actual) };
});

const passed = results.filter((result) => result.passed).length;
const failed = results.length - passed;
const hallucinations = results.filter((result) => result.hallucinated_deadline).length;
const passRate = Number(((passed / results.length) * 100).toFixed(1));
const summary = {
  run_id: "run-01",
  run_mode: runMode,
  system_version: externalResponseMap ? "captured-ai-output" : "policy-v1",
  generated_at: new Date().toISOString(),
  total_cases: results.length,
  passed_cases: passed,
  failed_cases: failed,
  pass_rate_percent: passRate,
  hallucinated_deadline_cases: hallucinations,
  quality_bar: { minimum_pass_rate_percent: 85, maximum_hallucinated_deadline_cases: 0 },
  quality_bar_met: passRate >= 85 && hallucinations === 0,
  provenance: externalProvenance || {
    source: "eval/run_eval.mjs baselineDecision",
    policy_reference: "SYSTEM_LOGIC.md",
    note: "Không có lời gọi model trong lượt baseline."
  },
  disclosure: externalResponseMap
    ? "Lượt này chấm file response bên ngoài; metadata và SHA-256 được lưu để truy vết."
    : "Lượt này đo policy baseline cục bộ từ SYSTEM_LOGIC.md; chưa phải output của model/API trong video CP3."
};

fs.writeFileSync(path.join(here, "run-01.json"), `${JSON.stringify({ summary, results }, null, 2)}\n`, "utf8");

function csvCell(value) {
  const text = Array.isArray(value) ? value.join("|") : String(value ?? "");
  return `"${text.replaceAll('"', '""')}"`;
}

const csvHeaders = ["case_id", "bucket", "difficulty_layers", "source_refs", "expected_decision", "actual_decision", "expected_due_at_local", "actual_due_at_local", "expected_source_message_id", "actual_source_message_id", "expected_calendar_action", "actual_calendar_action", "hallucinated_deadline", "result", "explanation"];
const csvRows = results.map((result) => [result.case_id, result.bucket, result.difficulty_layers, result.source_refs, result.expected.decision, result.actual.decision, result.expected.due_at_local, result.actual.due_at_local, result.expected.source_message_id, result.actual.source_message_id, result.expected.calendar_action, result.actual.calendar_action, result.hallucinated_deadline, result.passed ? "PASS" : "FAIL", result.actual.explanation]);
fs.writeFileSync(path.join(here, "run-01.csv"), `${[csvHeaders, ...csvRows].map((row) => row.map(csvCell).join(",")).join("\n")}\n`, "utf8");

const failedRows = results.filter((result) => !result.passed).map((result) => `| ${result.case_id} | ${result.expected.decision} | ${result.actual.decision} | ${result.actual.explanation} |`).join("\n");
const failurePriority = results.filter((result) => !result.passed).map((result) => `**${result.case_id}** — ${result.actual.explanation.replace(/\.$/u, "")}`).join(" · ");
const provenanceRows = Object.entries(summary.provenance).map(([key, value]) => `| ${key} | ${value === null ? "chưa khai" : typeof value === "object" ? `\`${JSON.stringify(value)}\`` : value} |`).join("\n");
const scopeText = externalResponseMap
  ? `Lượt chạy này chấm **20 output AI-backed hybrid** bằng cùng một scorer cố định. Model ${externalProvenance.provider || "chưa khai"} / ${externalProvenance.model || "chưa khai"} trích xuất dữ kiện, sau đó policy code quyết định trạng thái cuối. Đây là độ chính xác end-to-end của pipeline model + policy, không phải độ chính xác thuần của model. Metadata và SHA-256 bên dưới liên kết response với trace lời gọi thật.`
  : "Lượt chạy này sử dụng **local policy baseline** bám theo `SYSTEM_LOGIC.md`. Nó kiểm tra grounding, whitelist, cohort, quyền hạn, ngày giờ và hành động calendar. Đây là số đo tái lập được của policy hiện có, **không được trình bày như kết quả của model/API trong video CP3**.\n\nMuốn có số CP3 end-to-end, hãy xuất 20 output từ lời gọi AI thật theo cùng các trường `decision`, `due_at_local`, `source_message_id`, `calendar_action`, rồi chạy `node eval/run_eval.mjs --responses <file-output.json>`.";

const report = `# CP3 — Kết quả đánh giá lượt 1

## Kết quả

| Chỉ số | Giá trị |
|---|---:|
| Tổng số case | ${summary.total_cases} |
| PASS | ${summary.passed_cases} |
| FAIL | ${summary.failed_cases} |
| Tỷ lệ đạt | **${summary.pass_rate_percent}%** |
| Case bịa/sai deadline | ${summary.hallucinated_deadline_cases} |
| Quality bar | ≥85% và 0 case bịa deadline |
| Đạt quality bar? | **${summary.quality_bar_met ? "CÓ" : "CHƯA"}** |

## Phạm vi đo

${scopeText}

## Provenance

| Trường | Giá trị |
|---|---|
${provenanceRows}

## Case chưa đạt

| Case | Mong đợi | Thực tế | Nguyên nhân |
|---|---|---|---|
${failedRows || "| — | — | — | Không có |"}

## Kết luận lượt 1

Kết quả được giữ nguyên, kể cả case FAIL. Failure ưu tiên của chính lượt này: ${failurePriority || "không có case FAIL"}.
`;
fs.writeFileSync(path.join(here, "RUN-01-REPORT.md"), report, "utf8");
console.log(JSON.stringify(summary, null, 2));
