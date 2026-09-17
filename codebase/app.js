"use strict";

const deadlines = [
  { id: "checkpoint", title: "Mini Hackathon · Checkpoint 2", date: "2026-09-16", time: "21:00", type: "urgent", source: "#hackathon", sourceLabel: "Quy chế Mini Hackathon", confidence: 99, quote: "Nộp link repo public, prototype và phần cập nhật spec trước 21:00 ngày 16/09." },
  { id: "lab", title: "Lab 2 · Prompt Engineering", date: "2026-09-17", time: "23:59", type: "lab", source: "#lab-assignments", sourceLabel: "Thông báo số 12 · bản gia hạn", confidence: 98, quote: "Gia hạn Lab 2 đến 23:59 thứ Năm, 17/09. Nộp notebook hoặc link GitHub public." },
  { id: "quiz", title: "Quiz 1 · Transformer", date: "2026-09-19", time: "21:00", type: "quiz", source: "#quiz-updates", sourceLabel: "Thông báo mở Quiz 1", confidence: 97, quote: "Quiz 1 đóng lúc 21:00 thứ Bảy, 19/09. Thời gian làm bài 30 phút." },
];

const scenarios = {
  happy: { status: "AUTO-PUBLISH", tone: "found", signal: "Đủ tên bài + ngày giờ", confidence: "98% · Cao", grounding: "Kênh whitelist · GV đăng", action: "Tạo event trên calendar" },
  low: { status: "ADMIN REVIEW", tone: "review", signal: "Thiếu tên bài + giờ", confidence: "46% · Thấp", grounding: "Có tin nhưng chưa đủ", action: "Giữ khỏi calendar" },
  failure: { status: "REJECTED", tone: "rejected", signal: "Tin truyền miệng", confidence: "0%", grounding: "Không có nguồn", action: "Không tạo deadline" },
  correction: { status: "HUMAN REVIEW", tone: "review", signal: "Thành viên báo sai", confidence: "Tạm ngưng", grounding: "Chờ admin đối chiếu", action: "Gắn cờ event" },
};

const visited = new Set();
let viewYear = 2026;
let viewMonth = 8;
let selectedDeadlineId = "lab";
let toastTimer;

const messageFeed = document.querySelector("#messageFeed");
const feedScrollButton = document.querySelector("#feedScrollButton");
const commandComposer = document.querySelector("#commandComposer");
const commandInput = document.querySelector("#commandInput");
const detailDialog = document.querySelector("#detailDialog");
const adminDialog = document.querySelector("#adminDialog");
const reviewDialog = document.querySelector("#reviewDialog");
const correctionDialog = document.querySelector("#correctionDialog");
const toast = document.querySelector("#toast");

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]);
}

function now() {
  return new Intl.DateTimeFormat("vi-VN", { hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date());
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("show");
  toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2800);
}

function openDialog(dialog) {
  if (typeof dialog.showModal === "function") dialog.showModal();
  else dialog.setAttribute("open", "");
}

function closeDialog(dialog) {
  if (typeof dialog.close === "function") dialog.close();
  else dialog.removeAttribute("open");
}

function isFeedNearLatest() {
  return messageFeed.scrollHeight - messageFeed.scrollTop - messageFeed.clientHeight < 56;
}

function updateFeedScrollButton() {
  feedScrollButton.classList.toggle("visible", !isFeedNearLatest());
}

function scrollFeedToLatest(behavior = "smooth") {
  messageFeed.scrollTo({ top: messageFeed.scrollHeight, behavior });
  window.setTimeout(updateFeedScrollButton, behavior === "smooth" ? 260 : 0);
}

function monthLabel(year, month) {
  return `Tháng ${month + 1}, ${year}`;
}

function isoDate(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function renderCalendarCard(card) {
  const grid = card.querySelector("[data-calendar-grid]");
  const list = card.querySelector("[data-deadline-list]");
  card.querySelector("[data-calendar-title]").textContent = monthLabel(viewYear, viewMonth);

  const headers = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
  const firstOffset = (new Date(viewYear, viewMonth, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const daysInPrevious = new Date(viewYear, viewMonth, 0).getDate();
  let html = headers.map((label) => `<div class="cal-head">${label}</div>`).join("");

  for (let cell = 0; cell < 42; cell += 1) {
    let day = cell - firstOffset + 1;
    let cellYear = viewYear;
    let cellMonth = viewMonth;
    let muted = false;
    if (day < 1) {
      day = daysInPrevious + day;
      cellMonth -= 1;
      if (cellMonth < 0) { cellMonth = 11; cellYear -= 1; }
      muted = true;
    } else if (day > daysInMonth) {
      day -= daysInMonth;
      cellMonth += 1;
      if (cellMonth > 11) { cellMonth = 0; cellYear += 1; }
      muted = true;
    }
    const date = isoDate(cellYear, cellMonth, day);
    const deadline = deadlines.find((item) => item.date === date);
    const today = date === "2026-09-17";
    html += `<div class="cal-day ${muted ? "muted" : ""} ${today ? "today" : ""}"><span>${day}</span>${deadline ? `<i class="cal-event-dot ${deadline.type}" title="${escapeHtml(deadline.title)}"></i>` : ""}</div>`;
  }
  grid.innerHTML = html;

  const monthPrefix = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}`;
  const monthDeadlines = deadlines.filter((item) => item.date.startsWith(monthPrefix)).sort((a, b) => `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`));
  list.innerHTML = monthDeadlines.length
    ? monthDeadlines.map((item) => `<div class="discord-deadline ${item.type}"><i></i><div><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.source)} · nguồn ${item.confidence}%</small></div><time>${item.date.slice(8, 10)}/${item.date.slice(5, 7)} · ${item.time}</time><button type="button" data-deadline-id="${item.id}">Chi tiết</button></div>`).join("")
    : '<div class="empty-state">Không có deadline đã xác thực trong tháng này.</div>';
}

function renderCalendars() {
  document.querySelectorAll("[data-calendar-card]").forEach(renderCalendarCard);
}

function appendUserCommand(command) {
  const article = document.createElement("article");
  article.className = "discord-message user-command-message";
  article.innerHTML = `<div class="avatar user-avatar">LA</div><div class="discord-message-body"><div class="chat-meta"><strong>Lan Anh</strong><time>${now()}</time></div><p></p></div>`;
  article.querySelector("p").textContent = command;
  messageFeed.append(article);
  scrollFeedToLatest();
}

function appendBotText(text, kind = "normal") {
  const article = document.createElement("article");
  article.className = `discord-message bot-discord-message ${kind === "failure" ? "review-message" : ""}`;
  article.innerHTML = `<div class="avatar bot-avatar">D</div><div class="discord-message-body"><div class="chat-meta"><strong>Deadline Bot</strong><span>APP</span><time>${now()}</time></div><p></p></div>`;
  article.querySelector("p").textContent = text;
  messageFeed.append(article);
  scrollFeedToLatest();
}

function showTyping() {
  const article = document.createElement("article");
  article.className = "discord-message bot-discord-message typing-message";
  article.innerHTML = '<div class="avatar bot-avatar">D</div><div class="discord-message-body"><div class="typing-bubble" aria-label="Bot đang xử lý"><i></i><i></i><i></i></div></div>';
  messageFeed.append(article);
  scrollFeedToLatest();
  return article;
}

function appendCalendarResponse(prefix = "Đã tổng hợp") {
  const article = document.createElement("article");
  article.className = "discord-message bot-discord-message";
  article.innerHTML = `
    <div class="avatar bot-avatar">D</div>
    <div class="discord-message-body calendar-response">
      <div class="chat-meta"><strong>Deadline Bot</strong><span>APP</span><time>${now()}</time></div>
      <p>${prefix}: <b>${deadlines.length} deadline có căn cứ</b>, 1 mục chờ admin xác nhận.</p>
      <div class="discord-calendar-card" data-calendar-card>
        <div class="calendar-message-head"><div><span class="bot-eyebrow">DEADLINE CALENDAR · LỚP 3A</span><h2 data-calendar-title></h2></div><span class="verified-pill">✓ ${deadlines.length} đã xác thực</span></div>
        <div class="discord-calendar" data-calendar-grid></div><div class="calendar-deadline-list" data-deadline-list></div>
        <div class="calendar-message-actions"><button type="button" data-calendar-nav="previous">← Tháng trước</button><button type="button" data-calendar-nav="today">Hôm nay</button><button type="button" data-calendar-nav="next">Tháng sau →</button><button class="secondary-action" type="button" data-action="sync">↻ Đồng bộ</button></div>
        <div class="calendar-footer"><span>Bot chỉ công bố khi đủ tên bài · ngày giờ · nguồn</span><span>Cập nhật ${now()}</span></div>
      </div>
    </div>`;
  messageFeed.append(article);
  renderCalendars();
  scrollFeedToLatest();
}

function runCommand(rawCommand) {
  const command = rawCommand.trim();
  if (!command) return;
  appendUserCommand(command);
  const normalized = command.toLowerCase();
  if (normalized.startsWith("/deadline them")) {
    window.setTimeout(() => openDialog(adminDialog), 180);
    return;
  }
  const typing = showTyping();
  window.setTimeout(() => {
    typing.remove();
    if (normalized.startsWith("/deadline tong-hop")) {
      viewYear = 2026; viewMonth = 8;
      appendCalendarResponse("Đã quét 4 kênh và loại 2 bản trùng");
      markScenario("happy");
      updateTrace(scenarios.happy);
    } else if (normalized.startsWith("/deadline xem")) {
      appendCalendarResponse("Calendar hiện tại");
    } else {
      appendBotText("Lệnh chưa hợp lệ. Dùng /deadline tong-hop, /deadline xem hoặc /deadline them.");
    }
  }, 620);
}

function updateTrace(scenario) {
  const status = document.querySelector("#decisionStatus");
  status.textContent = scenario.status;
  status.className = `status ${scenario.tone}`;
  document.querySelector("#traceSignal").textContent = scenario.signal;
  document.querySelector("#traceConfidence").textContent = scenario.confidence;
  document.querySelector("#traceGrounding").textContent = scenario.grounding;
  document.querySelector("#traceAction").textContent = scenario.action;
}

function markScenario(name) {
  visited.add(name);
  document.querySelectorAll("[data-scenario]").forEach((button) => {
    button.classList.toggle("active", button.dataset.scenario === name);
    if (visited.has(button.dataset.scenario)) {
      button.classList.add("visited");
      button.querySelector("i").textContent = "●";
    }
  });
  document.querySelector("#coverageCounter").textContent = `${visited.size}/4`;
}

function openDeadlineDetail(id) {
  const item = deadlines.find((deadline) => deadline.id === id);
  if (!item) return;
  selectedDeadlineId = id;
  document.querySelector("#detailTitle").textContent = item.title;
  document.querySelector("#detailContent").innerHTML = `<div class="detail-summary"><div class="detail-date"><strong>${item.date.slice(8, 10)}</strong><span>THG ${Number(item.date.slice(5, 7))}</span></div><div><span class="confidence-chip">CÓ NGUỒN · ${item.confidence}%</span><h3>${item.time} · ${item.date.split("-").reverse().join("/")}</h3><p>Bot đã chuẩn hoá múi giờ Asia/Ho_Chi_Minh.</p></div></div><div class="evidence-box"><strong>Vì sao bot đưa mục này lên calendar?</strong><blockquote>“${escapeHtml(item.quote)}”</blockquote><div class="evidence-meta"><span>${escapeHtml(item.sourceLabel)}</span><span>${escapeHtml(item.source)}</span></div></div><div class="detail-actions"><button class="danger-button" type="button" data-action="report">⚑ Báo sai</button><div><button class="secondary-button" type="button" data-close="detailDialog">Đóng</button></div></div>`;
  openDialog(detailDialog);
}

document.addEventListener("click", (event) => {
  const commandButton = event.target.closest("[data-command]");
  if (commandButton) {
    commandInput.value = commandButton.dataset.command;
    commandComposer.requestSubmit();
    return;
  }

  const nav = event.target.closest("[data-calendar-nav]");
  if (nav) {
    if (nav.dataset.calendarNav === "today") { viewYear = 2026; viewMonth = 8; }
    else if (nav.dataset.calendarNav === "previous") { viewMonth -= 1; if (viewMonth < 0) { viewMonth = 11; viewYear -= 1; } }
    else { viewMonth += 1; if (viewMonth > 11) { viewMonth = 0; viewYear += 1; } }
    renderCalendars();
    return;
  }

  const deadlineButton = event.target.closest("[data-deadline-id]");
  if (deadlineButton) { openDeadlineDetail(deadlineButton.dataset.deadlineId); return; }

  const scenarioButton = event.target.closest("[data-scenario]");
  if (scenarioButton) {
    const name = scenarioButton.dataset.scenario;
    updateTrace(scenarios[name]);
    if (name === "low") openDialog(reviewDialog);
    else if (name === "correction") openDialog(correctionDialog);
    else {
      markScenario(name);
      appendBotText(name === "happy" ? "AUTO-PUBLISH: nguồn chính thức, đủ tên bài và ngày giờ nên deadline được đưa lên calendar." : "NO GROUNDING: không tìm thấy thông báo chính thức nên bot không tạo deadline.", name === "failure" ? "failure" : "normal");
    }
    return;
  }

  const action = event.target.closest("[data-action]")?.dataset.action;
  if (action === "sync") runCommand("/deadline tong-hop");
  else if (action === "approve-review") { updateTrace(scenarios.low); openDialog(reviewDialog); }
  else if (action === "admin-add") openDialog(adminDialog);
  else if (action === "complete-candidate") { closeDialog(reviewDialog); document.querySelector('#adminForm [name="title"]').value = "Project · chờ xác nhận"; openDialog(adminDialog); }
  else if (action === "reject-candidate") { closeDialog(reviewDialog); markScenario("low"); updateTrace(scenarios.low); appendBotText("Admin đã loại ứng viên mơ hồ khỏi hàng chờ. Calendar không thay đổi."); }
  else if (action === "report") { closeDialog(detailDialog); openDialog(correctionDialog); }

  const closeTarget = event.target.closest("[data-close]");
  if (closeTarget) closeDialog(document.querySelector(`#${closeTarget.dataset.close}`));
  if (event.target.matches("dialog")) closeDialog(event.target);
});

commandComposer.addEventListener("submit", (event) => {
  event.preventDefault();
  const command = commandInput.value;
  commandInput.value = "";
  runCommand(command);
  commandInput.focus();
});

document.querySelector("#adminForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const date = String(data.get("date"));
  deadlines.push({ id: `manual-${Date.now()}`, title: String(data.get("title")), date, time: String(data.get("time")), type: "review", source: String(data.get("source")), sourceLabel: "Admin nhập thủ công", confidence: 100, quote: "Deadline được admin nhập bằng slash command và chịu trách nhiệm xác nhận nguồn." });
  viewYear = Number(date.slice(0, 4)); viewMonth = Number(date.slice(5, 7)) - 1;
  closeDialog(adminDialog);
  renderCalendars();
  appendBotText(`Admin đã thêm “${data.get("title")}” vào calendar. Hệ thống đã lưu người tạo và nguồn để audit.`);
  showToast("Đã thêm deadline thủ công vào calendar trong Discord.");
  event.currentTarget.reset();
});

document.querySelector("#correctionForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const issue = new FormData(event.currentTarget).get("issue");
  closeDialog(correctionDialog);
  markScenario("correction");
  updateTrace(scenarios.correction);
  appendBotText(`${issue}: deadline đã chuyển sang “Đang xác minh”. Bot không tự sửa; admin sẽ đối chiếu nguồn.`);
  showToast("Đã chuyển phản hồi cho admin.");
});

messageFeed.addEventListener("scroll", updateFeedScrollButton, { passive: true });
feedScrollButton.addEventListener("click", () => scrollFeedToLatest());
document.querySelector("#resetButton").addEventListener("click", () => window.location.reload());
window.addEventListener("load", () => scrollFeedToLatest("auto"));

renderCalendars();
