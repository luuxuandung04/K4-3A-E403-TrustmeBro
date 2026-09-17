import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.dirname(here);
function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8").replace(/^\uFEFF/u, ""));
}

const golden = readJson(path.join(here, "golden_set.json"));
const run = readJson(path.join(here, "run-01.json"));

assert.equal(golden.length, 20, "Golden set phải có đúng 20 case trong lượt CP3 này.");
assert.equal(new Set(golden.map((item) => item.id)).size, 20, "Mỗi case_id phải duy nhất.");

const bucketCounts = golden.reduce((counts, item) => {
  counts[item.bucket] ||= [];
  counts[item.bucket].push(item);
  return counts;
}, {});
assert.equal(bucketCounts.normal?.length, 8, "Cần 8 case thường.");
assert.equal(bucketCounts.hard?.length, 8, "Cần 8 case khó.");
assert.equal(bucketCounts.rare?.length, 4, "Cần 4 case hiếm.");

const requiredLayers = ["source_truth", "ambiguity", "out_of_authority", "domain"];
for (const layer of requiredLayers) {
  const coverage = golden.filter((item) => item.difficulty_layers.includes(layer)).length;
  assert.ok(coverage >= 2, `Lớp ${layer} phải có ít nhất 2 case, hiện có ${coverage}.`);
}

const discordDerived = golden.filter((item) => item.source_origin === "discord_pack");
assert.ok(discordDerived.length >= 10, `Cần ít nhất 10 case từ Discord pack, hiện có ${discordDerived.length}.`);
const uniqueDiscordRefs = new Set(discordDerived.flatMap((item) => item.source_refs).filter((ref) => /^M\d+$/u.test(ref)));
assert.ok(uniqueDiscordRefs.size >= 10, `Cần ít nhất 10 msg_id Discord khác nhau, hiện có ${uniqueDiscordRefs.size}.`);

const decisions = new Set(["PUBLISHED", "NEEDS_REVIEW", "REJECTED", "HUMAN_REVIEW", "IGNORED_OUT_OF_SCOPE"]);
const actions = new Set(["CREATE", "HOLD", "NONE"]);
for (const item of golden) {
  assert.ok(decisions.has(item.expected.decision), `${item.id}: decision không hợp lệ.`);
  assert.ok(actions.has(item.expected.calendar_action), `${item.id}: calendar_action không hợp lệ.`);
  assert.ok(Array.isArray(item.input.messages) && item.input.messages.length > 0, `${item.id}: thiếu input message.`);
}

assert.equal(run.summary.total_cases, 20, "Run 01 phải chấm đủ 20 case.");
assert.equal(run.results.length, 20, "Bảng chi tiết phải có đủ 20 dòng.");
const runIds = run.results.map((result) => result.case_id);
assert.equal(new Set(runIds).size, 20, "Run 01 không được có case_id trùng.");
assert.deepEqual([...runIds].sort(), golden.map((item) => item.id).sort(), "Run 01 phải chứa đúng case_id của Golden Set hiện tại.");

const goldenById = new Map(golden.map((item) => [item.id, item]));
for (const result of run.results) {
  const testCase = goldenById.get(result.case_id);
  assert.deepEqual(result.expected, testCase.expected, `${result.case_id}: expected trong run đã cũ hoặc bị sửa.`);
  const recomputedChecks = {
    decision: result.actual.decision === testCase.expected.decision,
    due_at_local: result.actual.due_at_local === testCase.expected.due_at_local,
    source_message_id: result.actual.source_message_id === testCase.expected.source_message_id,
    calendar_action: result.actual.calendar_action === testCase.expected.calendar_action
  };
  const recomputedHallucination = result.actual.due_at_local !== null && (testCase.expected.due_at_local === null || result.actual.due_at_local !== testCase.expected.due_at_local);
  const recomputedPassed = Object.values(recomputedChecks).every(Boolean) && !recomputedHallucination;
  assert.deepEqual(result.checks, recomputedChecks, `${result.case_id}: checks không khớp dữ liệu.`);
  assert.equal(result.hallucinated_deadline, recomputedHallucination, `${result.case_id}: cờ hallucination không khớp.`);
  assert.equal(result.passed, recomputedPassed, `${result.case_id}: PASS/FAIL không khớp.`);
}

const recomputedPassedCases = run.results.filter((result) => result.passed).length;
const recomputedFailedCases = run.results.length - recomputedPassedCases;
const recomputedHallucinations = run.results.filter((result) => result.hallucinated_deadline).length;
assert.equal(run.summary.passed_cases, recomputedPassedCases, "Tổng PASS không khớp bảng chi tiết.");
assert.equal(run.summary.failed_cases, recomputedFailedCases, "Tổng FAIL không khớp bảng chi tiết.");
assert.equal(run.summary.hallucinated_deadline_cases, recomputedHallucinations, "Tổng hallucination không khớp bảng chi tiết.");
assert.equal(run.summary.passed_cases + run.summary.failed_cases, 20, "PASS + FAIL phải bằng tổng case.");
assert.equal(
  run.summary.pass_rate_percent,
  Number(((recomputedPassedCases / run.summary.total_cases) * 100).toFixed(1)),
  "Tỷ lệ phần trăm không khớp số PASS."
);
assert.equal(
  run.summary.quality_bar_met,
  run.summary.pass_rate_percent >= run.summary.quality_bar.minimum_pass_rate_percent && recomputedHallucinations <= run.summary.quality_bar.maximum_hallucinated_deadline_cases,
  "Kết luận quality bar không khớp kết quả."
);

if (run.summary.run_mode === "external-ai-responses") {
  const {
    response_file: responseFile,
    response_file_sha256: expectedResponseHash,
    trace_ref: traceRef,
    trace_sha256: expectedTraceHash
  } = run.summary.provenance || {};
  assert.ok(responseFile, "Run AI thật phải có provenance.response_file.");
  assert.match(expectedResponseHash || "", /^[a-f0-9]{64}$/u, "Run AI thật phải có response_file_sha256 hợp lệ.");
  const resolvedResponsePath = path.resolve(here, responseFile);
  const relativeResponsePath = path.relative(here, resolvedResponsePath);
  assert.ok(
    relativeResponsePath && !relativeResponsePath.startsWith("..") && !path.isAbsolute(relativeResponsePath),
    "response_file phải nằm bên trong thư mục eval."
  );
  assert.ok(fs.existsSync(resolvedResponsePath), `Không tìm thấy response file: ${responseFile}`);
  const actualResponseHash = crypto.createHash("sha256").update(fs.readFileSync(resolvedResponsePath)).digest("hex");
  assert.equal(actualResponseHash, expectedResponseHash, "SHA-256 của response file không khớp provenance.");

  assert.ok(traceRef, "Run AI thật phải có provenance.trace_ref.");
  assert.match(expectedTraceHash || "", /^[a-f0-9]{64}$/u, "Run AI thật phải có trace_sha256 hợp lệ.");
  const resolvedTracePath = path.resolve(projectRoot, traceRef);
  const relativeTracePath = path.relative(projectRoot, resolvedTracePath);
  assert.ok(
    relativeTracePath && !relativeTracePath.startsWith("..") && !path.isAbsolute(relativeTracePath),
    "trace_ref phải nằm bên trong repository."
  );
  assert.ok(fs.existsSync(resolvedTracePath), `Không tìm thấy trace: ${traceRef}`);
  const actualTraceHash = crypto.createHash("sha256").update(fs.readFileSync(resolvedTracePath)).digest("hex");
  assert.equal(actualTraceHash, expectedTraceHash, "SHA-256 của trace không khớp provenance.");
}

console.log(JSON.stringify({
  status: "PASS",
  total_cases: golden.length,
  buckets: Object.fromEntries(Object.entries(bucketCounts).map(([key, value]) => [key, value.length])),
  discord_derived_cases: discordDerived.length,
  unique_discord_message_refs: uniqueDiscordRefs.size,
  layer_coverage: Object.fromEntries(requiredLayers.map((layer) => [layer, golden.filter((item) => item.difficulty_layers.includes(layer)).length])),
  run_01: run.summary
}, null, 2));
