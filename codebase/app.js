"use strict";

// DỮ LIỆU BAN ĐẦU
const initialDeadlines = [
  {
    "id": "lab-2",
    "assignment_code": "lab-2",
    "title": "Lab 2 · Prompt Engineering & LLM Basics",
    "due_date": "2026-09-17",
    "due_time": "23:59",
    "iso_deadline": "2026-09-17T23:59:00+07:00",
    "submission_link": "https://forms.gle/lab2-submit-k4",
    "format": "File notebook .ipynb hoặc link GitHub public",
    "source_channel": "#announcements",
    "source_message_id": "msg_ann_01",
    "source_label": "Thông báo số 12 · bản gia hạn",
    "author_name": "Thầy Hoàng",
    "author_role": "Giảng viên",
    "status": "ACTIVE",
    "is_important": true,
    "is_extension": true,
    "confidence": 98,
    "quote": "Gia hạn Lab 2 đến 23:59 thứ Năm, 17/09. Nộp notebook hoặc link GitHub public.",
    "updated_at": "2026-09-15T14:00:00+07:00"
  },
  {
    "id": "quiz-1",
    "assignment_code": "quiz-1",
    "title": "Quiz 1 · Transformer & Tokenization",
    "due_date": "2026-09-19",
    "due_time": "21:00",
    "iso_deadline": "2026-09-19T21:00:00+07:00",
    "submission_link": "https://vlearn.edu.vn/courses/ai-k4/quiz-1",
    "format": "Trắc nghiệm trực tiếp trên VLearn (thời gian làm bài 30 phút)",
    "source_channel": "#quiz-updates",
    "source_message_id": "msg_quiz_01",
    "source_label": "Thông báo mở cổng Quiz 1",
    "author_name": "Cô Minh Anh",
    "author_role": "Giảng viên",
    "status": "ACTIVE",
    "is_important": true,
    "is_extension": false,
    "confidence": 97,
    "quote": "Quiz 1 đóng lúc 21:00 thứ Bảy, 19/09. Thời gian làm bài 30 phút.",
    "updated_at": "2026-09-14T09:00:00+07:00"
  },
  {
    "id": "hackathon-cp2",
    "assignment_code": "hackathon-cp2",
    "title": "Mini Hackathon · Checkpoint 2 (Working Mock)",
    "due_date": "2026-09-16",
    "due_time": "21:00",
    "iso_deadline": "2026-09-16T21:00:00+07:00",
    "submission_link": "https://forms.gle/hackathon-cp2-submit",
    "format": "Link repo public + Video demo bấm được",
    "source_channel": "#hackathon",
    "source_message_id": "msg_hack_01",
    "source_label": "Quy chế Mini Hackathon AI Batch 04",
    "author_name": "BTC Hackathon",
    "author_role": "Admin",
    "status": "ACTIVE",
    "is_important": true,
    "is_extension": false,
    "confidence": 99,
    "quote": "Nộp link repo public, prototype và phần cập nhật spec trước 21:00 ngày 16/09.",
    "updated_at": "2026-09-16T18:00:00+07:00"
  }
];
const initialChannelMessages = {
  "announcements": [
    {
      "id": "msg_ann_01",
      "channel": "announcements",
      "author": {
        "name": "Thầy Hoàng",
        "role": "Giảng viên",
        "avatar": "TH",
        "type": "teacher"
      },
      "content": "📢 **Thông báo lớp 3A · Gia hạn Lab 2: Prompt Engineering & LLM Basics**\n\nDo nhiều bạn cần thêm thời gian thử nghiệm kỹ thuật Few-shot và Chain-of-Thought trên notebook, BTC và Giảng viên quyết định gia hạn:\n• **Hạn chót mới:** `23:59 · Thứ Năm, 17/09/2026`\n• **Link form nộp:** https://forms.gle/lab2-submit-k4\n• **Yêu cầu:** File notebook .ipynb kèm link GitHub repo public.\n\nCác bạn chú ý nộp đúng hạn để tránh bị trừ điểm nhé!",
      "timestamp": "14:00 · 15/09",
      "type": "official"
    },
    {
      "id": "msg_ann_02",
      "channel": "announcements",
      "author": {
        "name": "Deadline Bot",
        "role": "APP",
        "avatar": "D",
        "type": "bot"
      },
      "content": "Đã trích xuất và đồng bộ thông báo gia hạn từ Thầy Hoàng vào #deadline-hub.",
      "timestamp": "14:01 · 15/09",
      "type": "bot_embed",
      "embed": {
        "badge": "🟢 THÔNG BÁO GIA HẠN DEADLINE",
        "badgeType": "green",
        "title": "Lab 2 · Prompt Engineering & LLM Basics",
        "deadline": "23:59 · 17/09/2026 (Còn ~10 tiếng)",
        "link": "https://forms.gle/lab2-submit-k4",
        "source": "Thầy Hoàng lúc 14:00 15/09 (#announcements)",
        "status": "ACTIVE"
      }
    },
    {
      "id": "msg_ann_03",
      "channel": "announcements",
      "author": {
        "name": "Cô Minh Anh",
        "role": "Giảng viên",
        "avatar": "MA",
        "type": "teacher"
      },
      "content": "📢 **Thông báo mở cổng Quiz 1: Transformer Architecture**\n\nCổng làm bài Quiz 1 trên VLearn đã mở. Hạn chót hoàn thành là **21:00 · Thứ Bảy, 19/09/2026**. Link làm bài: https://vlearn.edu.vn/courses/ai-k4/quiz-1. Thời gian làm bài 30 phút, chỉ tính lần nộp đầu tiên.",
      "timestamp": "09:00 · 14/09",
      "type": "official"
    }
  ],
  "deadline-hub": [
    {
      "id": "msg_hub_intro",
      "author": {
        "name": "Deadline Bot",
        "role": "APP",
        "avatar": "D",
        "type": "bot"
      },
      "content": "Chào mừng bạn đến với **#deadline-hub**! Kênh này **tự động tổng hợp hạn nộp 7 ngày tới (Hôm nay + 6 ngày)**. Bạn không cần gõ lệnh. Bot sẽ chỉ gửi thông báo mới khi có **thay đổi đột ngột sát hạn**, **deadline mới phát sinh trong ngày** hoặc **trường hợp khẩn cấp**!",
      "timestamp": "08:00 · Hôm nay",
      "type": "guide"
    },
    {
      "id": "msg_hub_digest",
      "author": {
        "name": "Deadline Bot",
        "role": "APP",
        "avatar": "D",
        "type": "bot"
      },
      "timestamp": "14:20 · Hôm nay",
      "type": "weekly_digest"
    }
  ],
  "hackathon": [
    {
      "id": "msg_hack_01",
      "channel": "hackathon",
      "author": {
        "name": "BTC Hackathon",
        "role": "Admin",
        "avatar": "BTC",
        "type": "admin"
      },
      "content": "🔥 **Quy chế Mini Hackathon AI Batch 04 · Checkpoint 2**\n\nMọi nhóm nộp link GitHub repo public và video/click prototype trước **21:00 ngày 16/09/2026** tại form: https://forms.gle/hackathon-cp2-submit. Nhóm nào nộp sau 21:00 sẽ bị 0 điểm mốc CP2.",
      "timestamp": "18:00 · 16/09",
      "type": "official"
    },
    {
      "id": "msg_hack_02",
      "channel": "hackathon",
      "author": {
        "name": "Deadline Bot",
        "role": "APP",
        "avatar": "D",
        "type": "bot"
      },
      "content": "Đã ghi nhận deadline: Mini Hackathon · Checkpoint 2 (21:00 · 16/09/2026). Nguồn: Quy chế Mini Hackathon.",
      "timestamp": "18:01 · 16/09",
      "type": "bot_embed",
      "embed": {
        "badge": "🏆 MINI HACKATHON · CP2",
        "badgeType": "green",
        "title": "Mini Hackathon · Checkpoint 2 (Working Mock)",
        "deadline": "21:00 · 16/09/2026",
        "link": "https://forms.gle/hackathon-cp2-submit",
        "source": "BTC Hackathon lúc 18:00 16/09 (#hackathon)",
        "status": "ACTIVE"
      }
    }
  ],
  "lab-assignments": [
    {
      "id": "msg_lab_01",
      "channel": "lab-assignments",
      "author": {
        "name": "Duy Khánh",
        "role": "Học viên",
        "avatar": "DK",
        "type": "student"
      },
      "content": "Mọi người cho mình hỏi câu 3 phần Chain-of-Thought cần nộp kèm file log kết quả không ạ?",
      "timestamp": "10:15 · 16/09",
      "type": "chat"
    },
    {
      "id": "msg_lab_02",
      "channel": "lab-assignments",
      "author": {
        "name": "TA Tuấn",
        "role": "TA",
        "avatar": "TT",
        "type": "ta"
      },
      "content": "Chào Khánh, phần đó bạn chạy in thẳng output vào cell trong file notebook .ipynb là được nhé, không cần tách file log riêng.",
      "timestamp": "10:18 · 16/09",
      "type": "chat"
    },
    {
      "id": "msg_lab_03",
      "channel": "lab-assignments",
      "author": {
        "name": "Lan Anh",
        "role": "Học viên",
        "avatar": "LA",
        "type": "student"
      },
      "content": "Mọi người cho mình hỏi hạn nộp Lab 2 là hôm nay hay ngày mai thế?",
      "timestamp": "11:00 · 17/09",
      "type": "chat"
    },
    {
      "id": "msg_lab_04",
      "channel": "lab-assignments",
      "author": {
        "name": "Deadline Bot",
        "role": "APP",
        "avatar": "D",
        "type": "bot"
      },
      "replyTo": "Lan Anh",
      "content": "💬 [Trả lời @Lan Anh] 📌 Hạn nộp chính thức của **Lab 2: Prompt Engineering** là **23:59 hôm nay, 17/09/2026** (theo thông báo gia hạn của Thầy Hoàng). Form nộp: https://forms.gle/lab2-submit-k4. Bạn có thể sang kênh #deadline-hub để xem chi tiết lịch nhé!",
      "timestamp": "11:00 · 17/09",
      "type": "local_reply"
    }
  ],
  "lich-hoc": [
    {
      "id": "msg_lh_01",
      "channel": "lich-hoc",
      "author": {
        "name": "Thầy Hoàng",
        "role": "Giảng viên",
        "avatar": "TH",
        "type": "teacher"
      },
      "content": "Lịch học tuần này: Thứ Tư học lý thuyết Transformer, Thứ Năm thực hành Prompt Engineering tại Lab E403.",
      "timestamp": "08:00 · 14/09",
      "type": "chat"
    }
  ],
  "quiz-updates": [
    {
      "id": "msg_quiz_01",
      "channel": "quiz-updates",
      "author": {
        "name": "Cô Minh Anh",
        "role": "Giảng viên",
        "avatar": "MA",
        "type": "teacher"
      },
      "content": "Đã mở Quiz 1: Kiến trúc Transformer & Tokenization. Hạn chót: 21:00 Thứ Bảy 19/09.",
      "timestamp": "09:00 · 14/09",
      "type": "official"
    },
    {
      "id": "msg_quiz_02",
      "channel": "quiz-updates",
      "author": {
        "name": "Quang Dũng",
        "role": "Học viên",
        "avatar": "QD",
        "type": "student"
      },
      "content": "Cô ơi đề có mấy câu về Multi-Head Attention ạ?",
      "timestamp": "09:30 · 14/09",
      "type": "chat"
    },
    {
      "id": "msg_quiz_03",
      "channel": "quiz-updates",
      "author": {
        "name": "Cô Minh Anh",
        "role": "Giảng viên",
        "avatar": "MA",
        "type": "teacher"
      },
      "content": "Khoảng 5 câu lý thuyết tính ma trận Q, K, V nhé em.",
      "timestamp": "09:35 · 14/09",
      "type": "chat"
    }
  ]
};

const channelsInfo = {
  "deadline-hub": {
    name: "deadline-hub",
    title: "deadline-hub",
    desc: "Tự động tổng hợp hạn nộp 7 ngày tới (Hôm nay + 6 ngày) · Chỉ phát tin mới khi có sự cố khẩn cấp",
    welcome: "Kênh tự động tổng hợp deadline 7 ngày tới. Mọi dữ liệu được đồng bộ liên tục từ các kênh chính thức."
  },
  "announcements": {
    name: "announcements",
    title: "announcements",
    desc: "Kênh thông báo chính thức từ Giảng viên & Ban tổ chức",
    welcome: "Kênh thông báo chính thức của lớp 3A (Phòng E403). Mọi thông báo tại đây được bot theo dõi ưu tiên."
  },
  "lich-hoc": {
    name: "lich-hoc",
    title: "lich-hoc",
    desc: "Lịch học lý thuyết, lab thực hành và các mốc kiểm tra",
    welcome: "Lịch trình học tập và phân ca thực hành tại phòng Lab E403."
  },
  "lab-assignments": {
    name: "lab-assignments",
    title: "lab-assignments",
    desc: "Thảo luận bài tập Lab, hỏi đáp kỹ thuật với Mentor & TA",
    welcome: "Kênh thảo luận Lab. Học viên đặt câu hỏi sẽ được giải đáp tại chỗ, không làm loãng kênh thông báo chính."
  },
  "quiz-updates": {
    name: "quiz-updates",
    title: "quiz-updates",
    desc: "Thông tin mở cổng và kết quả trắc nghiệm Quiz",
    welcome: "Kênh cập nhật cổng thi Quiz online trên VLearn."
  },
  "hackathon": {
    name: "hackathon",
    title: "hackathon",
    desc: "Thông tin quy chế và hạn nộp 6 Checkpoints Mini Hackathon",
    welcome: "Kênh tác vụ Mini Hackathon AI Batch 04 (47.5 giờ)."
  }
};

const personas = {
  "student_lananh": { name: "Lan Anh", role: "Học viên", avatar: "LA", type: "student", label: "Lan Anh (Học viên · Lớp 3A)" },
  "teacher_hoang": { name: "Thầy Hoàng", role: "Giảng viên", avatar: "TH", type: "teacher", label: "Thầy Hoàng (Giảng viên)" },
  "ta_tuan": { name: "TA Tuấn", role: "TA", avatar: "TT", type: "ta", label: "TA Tuấn (Trợ giảng)" },
  "admin_btc": { name: "BTC Hackathon", role: "Admin", avatar: "BTC", type: "admin", label: "BTC Hackathon (Admin)" }
};

let currentPersona = "student_lananh";
let activeChannel = "deadline-hub";
let deadlines = JSON.parse(JSON.stringify(initialDeadlines));
let channelMessages = JSON.parse(JSON.stringify(initialChannelMessages));
let events = [
  {
    "_id": "evt_lab-2",
    "source": {
      "guild_id": "123456789012345678",
      "channel_id": "chan_announcements",
      "channel_name": "announcements",
      "message_id": "ann_01",
      "message_url": "https://discord.com/channels/123456789012345678/chan_announcements/ann_01",
      "author": { "id": "1029384756", "name": "Thầy Hoàng" },
      "created_at": "2026-09-15T14:00:00+07:00"
    },
    "classification": {
      "type": "DEADLINE",
      "importance": "HIGH",
      "is_relevant": true,
      "confidence": 0.98
    },
    "content": {
      "title": "Lab 2 · Prompt Engineering & LLM Basics",
      "summary": "Gia hạn Lab 2 đến 23:59 thứ Năm, 17/09. Nộp notebook hoặc link GitHub public."
    },
    "schedule": {
      "start_time": null,
      "end_time": null,
      "deadline": "2026-09-17T23:59:00+07:00",
      "time_precision": "DEADLINE_ONLY"
    },
    "target": { "audience": "UNKNOWN", "course": "AI Batch 04" },
    "system": {
      "status": "PROCESSED",
      "created_at": "2026-09-15T14:00:00+07:00",
      "updated_at": "2026-09-15T14:00:00+07:00",
      "conflict_detected": false,
      "conflict_note": null
    }
  },
  {
    "_id": "evt_quiz-1",
    "source": {
      "guild_id": "123456789012345678",
      "channel_id": "chan_quiz_updates",
      "channel_name": "quiz-updates",
      "message_id": "quiz_01",
      "message_url": "https://discord.com/channels/123456789012345678/chan_quiz_updates/quiz_01",
      "author": { "id": "1029384756", "name": "Cô Minh Anh" },
      "created_at": "2026-09-14T09:00:00+07:00"
    },
    "classification": {
      "type": "DEADLINE",
      "importance": "HIGH",
      "is_relevant": true,
      "confidence": 0.97
    },
    "content": {
      "title": "Quiz 1 · Transformer & Tokenization",
      "summary": "Quiz 1 đóng lúc 21:00 thứ Bảy, 19/09. Thời gian làm bài 30 phút."
    },
    "schedule": {
      "start_time": null,
      "end_time": null,
      "deadline": "2026-09-19T21:00:00+07:00",
      "time_precision": "DEADLINE_ONLY"
    },
    "target": { "audience": "UNKNOWN", "course": "AI Batch 04" },
    "system": {
      "status": "PROCESSED",
      "created_at": "2026-09-14T09:00:00+07:00",
      "updated_at": "2026-09-14T09:00:00+07:00",
      "conflict_detected": false,
      "conflict_note": null
    }
  },
  {
    "_id": "evt_1152837492837462",
    "source": {
      "guild_id": "123456789012345678",
      "channel_id": "99887766554433",
      "channel_name": "dự-án-ai",
      "message_id": "1152837492837462",
      "message_url": "https://discord.com/channels/123456789012345678/99887766554433/1152837492837462",
      "author": { "id": "1029384756", "name": "ThayDong_Tech" },
      "created_at": "2026-09-17T14:19:00.000Z"
    },
    "classification": {
      "type": "MEETING",
      "importance": "HIGH",
      "is_relevant": true,
      "confidence": 0.97
    },
    "content": {
      "title": "Họp chốt tiến độ dự án AI",
      "summary": "Họp online để chốt tiến độ dự án AI. Link Google Meet sẽ được gửi sau."
    },
    "schedule": {
      "start_time": "2026-09-18T20:00:00+07:00",
      "end_time": null,
      "deadline": null,
      "time_precision": "START_TIME_ONLY"
    },
    "target": { "audience": "UNKNOWN", "course": null },
    "system": {
      "status": "PROCESSED",
      "created_at": "2026-09-17T21:20:00+07:00",
      "updated_at": "2026-09-17T21:20:00+07:00",
      "conflict_detected": false,
      "conflict_note": null
    }
  }
];
let visited = new Set();
let toastTimer;

const messageFeed = document.querySelector("#messageFeed");
const feedScrollButton = document.querySelector("#feedScrollButton");
const commandComposer = document.querySelector("#commandComposer");
const commandInput = document.querySelector("#commandInput");
const personaSelect = document.querySelector("#personaSelect");
const composerPersonaLabel = document.querySelector("#composerPersonaLabel");
const activeChannelTitle = document.querySelector("#activeChannelTitle");
const activeChannelDesc = document.querySelector("#activeChannelDesc");

const detailDialog = document.querySelector("#detailDialog");
const adminDialog = document.querySelector("#adminDialog");
const reviewDialog = document.querySelector("#reviewDialog");
const correctionDialog = document.querySelector("#correctionDialog");
const dataDialog = document.querySelector("#dataDialog");
const toast = document.querySelector("#toast");

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[c]);
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

// ============================================================================
// 7-DAY ROLLING DIGEST RENDERING
// ============================================================================

function renderWeeklyDigestHtml() {
  const activeItems = deadlines.filter((d) => d.status === "ACTIVE" || d.status === "CONFLICT");

  const todayItems = activeItems.filter((d) => (d.due_date === "2026-09-17" || d.date === "2026-09-17"));
  const satItems = activeItems.filter((d) => (d.due_date === "2026-09-19" || d.date === "2026-09-19"));
  const totalCount = todayItems.length + satItems.length;

  let todayHtml = "";
  if (todayItems.length > 0) {
    todayHtml = todayItems.map((item) => `
      <div class="digest-item urgent">
        <div class="item-main">
          <div class="item-title-row">
            <strong>${escapeHtml(item.title)}</strong>
            <span class="countdown-tag red">⏳ Còn ~9 tiếng (${escapeHtml(item.time || item.due_time)} hôm nay)</span>
          </div>
          <div class="item-meta">
            <span>Hạn chót: <b>${escapeHtml(item.due_time || item.time)} hôm nay</b></span>
            <span>Nguồn: <b>${escapeHtml(item.source_channel || item.source || "#announcements")} (${escapeHtml(item.author_name || "Thầy Hoàng")})</b></span>
            <span>Format: <b>${escapeHtml(item.format || "File notebook .ipynb")}</b></span>
          </div>
        </div>
        <div class="item-actions">
          ${item.submission_link ? `<a href="${item.submission_link}" target="_blank" class="btn-submit">🔗 Nộp Form</a>` : ""}
          <button type="button" class="btn-detail" data-deadline-id="${item.id}">Chi tiết</button>
        </div>
      </div>
    `).join("");
  } else {
    todayHtml = '<div class="day-items empty"><span>Không có bài đến hạn hôm nay.</span></div>';
  }

  let satHtml = "";
  if (satItems.length > 0) {
    satHtml = satItems.map((item) => `
      <div class="digest-item quiz">
        <div class="item-main">
          <div class="item-title-row">
            <strong>${escapeHtml(item.title)}</strong>
            <span class="countdown-tag blue">⏳ Còn 2 ngày (21:00 Thứ Bảy)</span>
          </div>
          <div class="item-meta">
            <span>Hạn chót: <b>${escapeHtml(item.due_time || item.time)} · 19/09</b></span>
            <span>Nguồn: <b>${escapeHtml(item.source_channel || item.source || "#quiz-updates")} (${escapeHtml(item.author_name || "Cô Minh Anh")})</b></span>
            <span>Thời gian: <b>30 phút trên VLearn</b></span>
          </div>
        </div>
        <div class="item-actions">
          ${item.submission_link ? `<a href="${item.submission_link}" target="_blank" class="btn-submit">🔗 Vào thi</a>` : ""}
          <button type="button" class="btn-detail" data-deadline-id="${item.id}">Chi tiết</button>
        </div>
      </div>
    `).join("");
  } else {
    satHtml = '<div class="day-items empty"><span>Không có bài đến hạn.</span></div>';
  }

  return `
    <div class="weekly-digest-card">
      <div class="digest-header">
        <div>
          <span class="digest-badge">📅 TỰ ĐỘNG TỔNG HỢP 7 NGÀY TỚI</span>
          <h2>Lịch Deadline Tuần Này (17/09 – 23/09/2026)</h2>
          <p>Tự động đồng bộ từ các kênh thông báo chính thức · Không cần gõ lệnh</p>
        </div>
        <div class="digest-stat">
          <strong>${totalCount}</strong>
          <span>BÀI SẮP ĐẾN HẠN</span>
        </div>
      </div>

      <div class="digest-days-list">
        <!-- Hôm nay 17/09 -->
        <div class="digest-day today">
          <div class="day-col">
            <span class="day-badge today">HÔM NAY</span>
            <strong class="day-date">17/09</strong>
            <span class="day-name">Thứ Năm</span>
          </div>
          <div class="day-items">${todayHtml}</div>
        </div>

        <!-- Ngày mai 18/09 -->
        <div class="digest-day">
          <div class="day-col">
            <span class="day-badge">NGÀY MAI</span>
            <strong class="day-date">18/09</strong>
            <span class="day-name">Thứ Sáu</span>
          </div>
          <div class="day-items empty">
            <span>Không có bài đến hạn · Dành thời gian ôn tập lý thuyết & thực hành Lab</span>
          </div>
        </div>

        <!-- Thứ Bảy 19/09 -->
        <div class="digest-day">
          <div class="day-col">
            <span class="day-badge">2 NGÀY TỚI</span>
            <strong class="day-date">19/09</strong>
            <span class="day-name">Thứ Bảy</span>
          </div>
          <div class="day-items">${satHtml}</div>
        </div>

        <!-- 20/09 - 23/09 -->
        <div class="digest-day">
          <div class="day-col">
            <span class="day-badge">20 – 23/09</span>
            <span class="day-name">4 ngày tiếp</span>
          </div>
          <div class="day-items empty">
            <span>Chưa có deadline chính thức mới phát sinh. Theo dõi thêm tại #announcements.</span>
          </div>
        </div>
      </div>

      <div class="digest-footer">
        <span>💡 <b>Quy tắc thông báo:</b> Bot chỉ gửi tin nhắn mới khi có thay đổi đột ngột sát hạn, bài mới phát sinh trong ngày hoặc sự cố khẩn cấp.</span>
        <span>Cập nhật: <b>${now()} hôm nay</b></span>
      </div>
    </div>`;
}

function getRoleBadge(type, roleName) {
  if (type === "bot") return '<span class="role-tag bot">APP</span>';
  if (type === "teacher") return '<span class="role-tag teacher">GIẢNG VIÊN</span>';
  if (type === "ta") return '<span class="role-tag ta">TA</span>';
  if (type === "admin") return '<span class="role-tag admin">ADMIN</span>';
  return '<span class="role-tag student">HỌC VIÊN</span>';
}

function renderMessageItem(msg) {
  const isBot = msg.author && msg.author.type === "bot";
  const avatarClass = isBot ? "bot-avatar" : "user-avatar";

  let bodyHtml = "";

  if (msg.replyTo) {
    bodyHtml += `<div class="reply-reference">Đang trả lời <b>@${escapeHtml(msg.replyTo)}</b></div>`;
  }

  if (msg.type === "weekly_digest") {
    bodyHtml += renderWeeklyDigestHtml();
  } else if (msg.type === "urgent_alert") {
    const isMeeting = msg.alertType === "meeting" || (msg.alertTitle && msg.alertTitle.includes("HỌP"));
    const cardClass = isMeeting ? "urgent-alert-card meeting-card" : "urgent-alert-card";
    const badgeText = isMeeting ? "🤝 LỊCH HỌP MỚI / THAY ĐỔI ĐỘT XUẤT" : "🚨 THÔNG BÁO KHẨN CẤP / THAY ĐỔI ĐỘT NGỘT";
    const badgeStyle = isMeeting ? 'style="background:#2563eb;color:#fff;"' : '';
    const titleColor = isMeeting ? '#1e40af' : '#991b1b';
    const timeLabel = isMeeting ? "Thời gian họp:" : "Hạn chót mới:";
    const timeColor = isMeeting ? '#1d4ed8' : '#b91c1c';

    const rawSourceChannel = msg.sourceChannel || (msg.source ? msg.source.replace("#", "") : "announcements");
    const sourceChannel = rawSourceChannel.replace("#", "").trim();
    const sourceMsgId = msg.sourceMessageId || msg.sourceMsgId || "";

    const meetLink = msg.meetLink || null;
    const formLink = msg.formLink || null;

    bodyHtml += `
      <div class="${cardClass}">
        <div class="alert-top">
          <span class="alert-pulse-badge" ${badgeStyle}>${badgeText}</span>
          <span class="alert-time">${escapeHtml(msg.timestamp || now())}</span>
        </div>
        <h3 style="margin:4px 0 6px;color:${titleColor};font-size:14px;font-weight:800;">${escapeHtml(msg.alertTitle || (isMeeting ? "🤝 LỊCH HỌP MỚI" : "🚨 Thay đổi đột ngột sát hạn"))}</h3>
        <p style="margin:0 0 10px;font-size:11px;color:#4b4555;line-height:1.55;">${escapeHtml(msg.content)}</p>
        <dl class="embed-meta-grid" style="margin:8px 0;font-size:11px;">
          <dt>${timeLabel}</dt><dd style="color:${timeColor};font-weight:800;">${escapeHtml(msg.newDeadline || "")}</dd>
          ${meetLink ? `<dt>Link phòng họp:</dt><dd><a href="${escapeHtml(meetLink)}" target="_blank" rel="noopener" style="color:#2563eb;font-weight:700;word-break:break-all;">${escapeHtml(meetLink)}</a></dd>` : ""}
          ${formLink ? `<dt>Link nộp bài:</dt><dd><a href="${escapeHtml(formLink)}" target="_blank" rel="noopener" style="color:var(--purple);font-weight:700;word-break:break-all;">${escapeHtml(formLink)}</a></dd>` : ""}
          <dt>Người công bố:</dt><dd><b>${escapeHtml(msg.author_name || "Giảng viên")}</b> (<button type="button" class="channel-jump-btn" style="padding:1px 6px;font-size:10px;" data-jump-channel="${escapeHtml(sourceChannel)}" data-jump-msg="${escapeHtml(sourceMsgId)}">#${escapeHtml(sourceChannel)} ↗</button>)</dd>
          <dt>Tin nhắn gốc:</dt><dd><button type="button" class="channel-jump-btn" data-jump-channel="${escapeHtml(sourceChannel)}" data-jump-msg="${escapeHtml(sourceMsgId)}">#${escapeHtml(sourceChannel)} · Nhảy tới tin nhắn gốc ↗</button></dd>
        </dl>
        <div class="embed-actions">
          ${meetLink ? `<a class="btn-meet" href="${escapeHtml(meetLink)}" target="_blank" rel="noopener">📹 Vào Google Meet</a>` : ""}
          ${formLink ? `<a class="btn-submit" href="${escapeHtml(formLink)}" target="_blank" rel="noopener">📝 Mở Form Nộp Bài</a>` : ""}
          <button type="button" class="btn-detail" data-action="report">⚠️ Báo sự cố / Tag TA</button>
        </div>
      </div>`;
  } else if (msg.content) {
    const formattedContent = escapeHtml(msg.content)
      .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
      .replace(/`(.*?)`/g, "<code>$1</code>")
      .replace(/\n/g, "<br/>")
      .replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener" style="color:var(--purple);font-weight:700;">$1</a>');
    bodyHtml += `<p>${formattedContent}</p>`;
  }

  if (msg.type === "bot_embed" && msg.embed) {
    const isConflict = msg.embed.badgeType === "yellow" || (msg.embed.status && msg.embed.status === "CONFLICT");
    const rawEmbedCh = msg.embed.sourceChannel || msg.sourceChannel || (msg.channel ? msg.channel : "announcements");
    const embedSourceCh = rawEmbedCh.replace("#", "").trim();
    const embedMsgId = msg.embed.sourceMsgId || msg.sourceMsgId || "";
    bodyHtml += `
      <div class="discord-announcement-embed ${isConflict ? "conflict" : ""}">
        <div class="embed-top-row">
          <span class="embed-badge-pill ${isConflict ? "yellow" : "green"}">${escapeHtml(msg.embed.badge || (isConflict ? "⚠️ CẢNH BÁO XUNG ĐỘT" : "🟢 THÔNG BÁO DEADLINE"))}</span>
          <span style="font-size:9px;color:var(--muted);font-weight:700;">STATUS: ${escapeHtml(msg.embed.status || "ACTIVE")}</span>
        </div>
        <div class="embed-title">${escapeHtml(msg.embed.title || "Thông báo")}</div>
        <dl class="embed-meta-grid">
          <dt>Hạn chót:</dt><dd style="color:${isConflict ? "var(--orange)" : "var(--purple-deep)"};font-size:12px;font-weight:800;">${escapeHtml(msg.embed.deadline || "")}</dd>
          ${msg.embed.link ? `<dt>Link nộp:</dt><dd><a href="${msg.embed.link}" target="_blank" style="color:var(--purple);word-break:break-all;">${escapeHtml(msg.embed.link)}</a></dd>` : ""}
          <dt>Căn cứ:</dt><dd>${escapeHtml(msg.embed.source || "Thông báo chính thức")} ${embedMsgId ? `<button type="button" class="channel-jump-btn" style="padding:1px 5px;font-size:9px;margin-left:4px;" data-jump-channel="${escapeHtml(embedSourceCh)}" data-jump-msg="${escapeHtml(embedMsgId)}">#${escapeHtml(embedSourceCh)} ↗</button>` : ""}</dd>
          ${msg.embed.note ? `<dt>Cảnh báo:</dt><dd style="color:var(--orange);">${escapeHtml(msg.embed.note)}</dd>` : ""}
        </dl>
        <div class="embed-actions">
          ${msg.embed.link ? `<a class="embed-btn-link" href="${msg.embed.link}" target="_blank">🔗 Mở Form Nộp</a>` : ""}
          <button type="button" class="embed-btn-report" data-action="report">⚠️ Báo sai / Tag TA</button>
        </div>
      </div>`;
  }

  const authorObj = msg.author || { name: "Người dùng", role: "Học viên", avatar: "U", type: "student" };

  return `
    <article class="discord-message ${isBot ? "bot-discord-message" : "user-command-message"}" data-message-id="${escapeHtml(msg.id || "")}" id="${escapeHtml(msg.id || "")}">
      <div class="avatar ${avatarClass}">${escapeHtml(authorObj.avatar || "U")}</div>
      <div class="discord-message-body">
        <div class="chat-meta">
          <strong>${escapeHtml(authorObj.name)}</strong>
          ${getRoleBadge(authorObj.type, authorObj.role)}
          <time>${escapeHtml(msg.timestamp || now())}</time>
        </div>
        ${bodyHtml}
      </div>
    </article>`;
}

function renderChannelFeed(channelId) {
  const info = channelsInfo[channelId] || { name: channelId, title: channelId, desc: "", welcome: "" };
  activeChannelTitle.textContent = info.title;
  activeChannelDesc.textContent = info.desc;
  commandInput.placeholder = channelId === "deadline-hub"
    ? "Kênh tự động cập nhật · Chỉ TA/Giảng viên đăng thông báo khẩn cấp..."
    : `Nhắn #${info.name}...`;

  const msgs = channelMessages[channelId] || [];

  let html = `
    <div class="channel-welcome">
      <div class="welcome-hash">#</div>
      <h1>Chào mừng đến với #${escapeHtml(info.title)}!</h1>
      <p>${escapeHtml(info.welcome)}</p>
    </div>
    <div class="chat-date"><span>HÔM NAY, 17/09/2026</span></div>`;

  html += msgs.map(renderMessageItem).join("");
  messageFeed.innerHTML = html;

  scrollFeedToLatest("auto");
}

function updateComposerPlaceholder() {
  if (!commandInput) return;
  const p = personas[currentPersona] || personas.student_lananh;
  if (activeChannel === "announcements") {
    commandInput.placeholder = `[#announcements] Nhập thông báo của ${p.name} (ví dụ: Gia hạn nộp bài, lịch họp, bài tập mới)...`;
  } else if (activeChannel === "deadline-hub") {
    commandInput.placeholder = `[#deadline-hub] Bảng tin 7 ngày tự động · Nhập tin nhắn dưới danh nghĩa ${p.name}...`;
  } else if (activeChannel === "lab-assignments") {
    commandInput.placeholder = `[#lab-assignments] Nhập tin của ${p.name} (ví dụ: Hạn nộp Lab 2 khi nào? Link nộp ở đâu?)...`;
  } else if (activeChannel === "quiz-updates") {
    commandInput.placeholder = `[#quiz-updates] Nhập tin của ${p.name} (ví dụ: Quiz 1 làm trong bao lâu?)...`;
  } else {
    commandInput.placeholder = `[#${activeChannel}] Nhập tin nhắn dưới danh nghĩa ${p.name}...`;
  }
}

function switchChannel(channelId) {
  if (!channelsInfo[channelId]) return;
  activeChannel = channelId;

  document.querySelectorAll(".channel-list .channel").forEach((btn) => {
    const isTarget = btn.dataset.channel === channelId;
    btn.classList.toggle("active", isTarget);
    if (isTarget) btn.setAttribute("aria-current", "page");
    else btn.removeAttribute("aria-current");
  });

  const info = channelsInfo[channelId];
  if (activeChannelTitle) activeChannelTitle.textContent = info.title || channelId;
  if (activeChannelDesc) activeChannelDesc.textContent = info.desc || "";

  updateComposerPlaceholder();
  renderChannelFeed(channelId);
}

// ============================================================================
// SYSTEM LOGIC & DECISION TRACE
// ============================================================================

const pipelineScenarios = {
  urgent: {
    status: "URGENT ALERT",
    tone: "rejected",
    signal: "Thay đổi sát hạn · Form lỗi",
    ruleGate: "PASS (Role GV + Khẩn cấp)",
    importance: "KHẨN CẤP / ĐỘT NGỘT",
    targetData: "data/deadlines.json (ACTIVE)",
    action: "GỬI LUÔN THÔNG BÁO MỚI -> #deadline-hub",
    step: 4
  },
  new_daily: {
    status: "DAILY NEW",
    tone: "found",
    signal: "Hạn mới phát sinh trong ngày",
    ruleGate: "PASS (Role GV + Bài mới)",
    importance: "DEADLINE MỚI PHÁT SINH",
    targetData: "Ghi mới data/deadlines.json",
    action: "GỬI LUÔN THÔNG BÁO MỚI -> #deadline-hub",
    step: 4
  },
  conflict: {
    status: "CONFLICT",
    tone: "review",
    signal: "Lệch mốc 2 kênh (#ann vs #lab)",
    ruleGate: "PASS (Whitelist + TA + Keyword)",
    importance: "XUNG ĐỘT MỐC NỘP",
    targetData: "Gắn cờ CONFLICT",
    action: "GỬI LUÔN CẢNH BÁO VÀNG + Tag @TA",
    step: 4
  },
  normal: {
    status: "IN-CHANNEL",
    tone: "idle",
    signal: "Học viên hỏi bài tại kênh",
    ruleGate: "Hỏi đáp nội bộ",
    importance: "BÌNH THƯỜNG",
    targetData: "Tra cứu không sửa DB",
    action: "Trả lời tại chỗ · KHÔNG BẮN TIN MỚI",
    step: 3
  },
  correction: {
    status: "HUMAN REVIEW",
    tone: "review",
    signal: "Thành viên bấm Báo sai",
    ruleGate: "HAX G8 / Feedback",
    importance: "ĐANG XÁC MINH",
    targetData: "Ghi nhận audit_log.json",
    action: "Chuyển TA trực ca giải quyết",
    step: 4
  }
};

function updatePipelineTrace(scenario) {
  if (!scenario) return;
  const status = document.querySelector("#decisionStatus");
  if (status) {
    status.textContent = scenario.status || "";
    status.className = `status ${scenario.tone || "idle"}`;
  }
  const sig = document.querySelector("#traceSignal");
  if (sig) sig.textContent = scenario.signal || "";
  const rg = document.querySelector("#traceRuleGate");
  if (rg) rg.textContent = scenario.ruleGate || "";
  const imp = document.querySelector("#traceImportance");
  if (imp) imp.textContent = scenario.importance || "";
  const conf = document.querySelector("#traceConfidence");
  if (conf) conf.textContent = scenario.targetData || "";
  const act = document.querySelector("#traceAction");
  if (act) act.textContent = scenario.action || "";

  const step = scenario.step || 1;
  for (let i = 1; i <= 4; i++) {
    const el = document.querySelector(`#pipeStep${i}`);
    if (el) {
      if (i <= step) el.style.borderColor = "var(--purple)";
      else el.style.borderColor = "var(--line)";
    }
  }
}

function markScenario(name) {
  visited.add(name);
  document.querySelectorAll("[data-scenario]").forEach((button) => {
    button.classList.toggle("active", button.dataset.scenario === name);
    if (visited.has(button.dataset.scenario)) {
      button.classList.add("visited");
      const icon = button.querySelector("i");
      if (icon) icon.textContent = "●";
    }
  });
  const counter = document.querySelector("#coverageCounter");
  if (counter) counter.textContent = `${visited.size}/5`;
}

// ============================================================================
// PROCESSING NEW MESSAGES & TRIGGERING ALERTS
// ============================================================================

const BACKEND_API_URL = (window.location.origin && window.location.origin.startsWith("http")) ? window.location.origin : "http://127.0.0.1:8000";

async function checkBackendStatus() {
  const pill = document.querySelector("#backendStatusPill");
  if (!pill) return;
  try {
    const res = await fetch(`${BACKEND_API_URL}/health`);
    if (res.ok) {
      const data = await res.json();
      pill.innerHTML = `<i style="background:#23a55a;display:inline-block;width:8px;height:8px;border-radius:50%;margin-right:6px;"></i> FASTAPI ONLINE (PORT 8000)`;
      pill.style.borderColor = "#23a55a";
      pill.style.color = "#23a55a";
      pill.title = `Backend online | Storage: ${data.storage} | AI: ${data.ai_model}`;
      return true;
    }
  } catch (e) {}
  pill.innerHTML = `<i style="background:#80848e;display:inline-block;width:8px;height:8px;border-radius:50%;margin-right:6px;"></i> LOCAL STANDALONE`;
  pill.style.borderColor = "#4e5058";
  pill.style.color = "#b5bac1";
  pill.title = "Backend chưa khởi động hoặc chưa mở port 8000. Đang chạy chế độ local fallback.";
  return false;
}

// --- URL & Content Extraction Helpers ---
function extractLinksFromText(text) {
  let meetLink = null;
  let formLink = null;
  const urlRegex = /(https?:\/\/[^\s<]+)/gi;
  const matches = text.match(urlRegex) || [];
  for (const rawUrl of matches) {
    const cleanUrl = rawUrl.replace(/[.,;!?)]+$/, "");
    if (/meet\.google\.com|zoom\.us|teams\.microsoft\.com/i.test(cleanUrl)) {
      meetLink = cleanUrl;
    } else if (/forms\.gle|docs\.google\.com\/forms|vlearn\.edu\.vn|docs\.google\.com\/spreadsheets/i.test(cleanUrl)) {
      formLink = cleanUrl;
    } else if (!meetLink && !formLink) {
      if (/meet|zoom|họp/i.test(text)) meetLink = cleanUrl;
      else formLink = cleanUrl;
    }
  }
  return { meetLink, formLink };
}

function parseVietnameseDateTime(text) {
  const lower = text.toLowerCase();
  let timeStr = "";
  let dateStr = "";

  const pmMatch = lower.match(/(?:lúc\s+)?(\d{1,2})\s*(?:giờ|h)\s*(?:chiều|tối)/);
  const amMatch = lower.match(/(?:lúc\s+)?(\d{1,2})\s*(?:giờ|h)\s*(?:sáng)/);
  const colonMatch = lower.match(/(?:lúc\s+)?(\d{1,2})[:h](\d{2})?/);

  if (pmMatch) {
    let h = parseInt(pmMatch[1], 10);
    if (h < 12) h += 12;
    timeStr = `${String(h).padStart(2, "0")}:00`;
  } else if (amMatch) {
    let h = parseInt(amMatch[1], 10);
    timeStr = `${String(h).padStart(2, "0")}:00`;
  } else if (colonMatch) {
    let h = parseInt(colonMatch[1], 10);
    let m = colonMatch[2] || "00";
    if ((lower.includes("chiều") || lower.includes("tối")) && h < 12) {
      h += 12;
    }
    timeStr = `${String(h).padStart(2, "0")}:${m}`;
  }

  if (lower.includes("chiều nay") || lower.includes("tối nay") || lower.includes("sáng nay") || lower.includes("hôm nay") || lower.includes("nay")) {
    dateStr = "Hôm nay (17/09/2026)";
  } else if (lower.includes("sáng mai") || lower.includes("chiều mai") || lower.includes("tối mai") || lower.includes("ngày mai") || lower.includes("mai")) {
    dateStr = "Ngày mai (18/09/2026)";
  } else if (lower.includes("18/09") || lower.includes("18-09")) {
    dateStr = "Ngày mai (18/09/2026)";
  } else if (lower.includes("19/09") || lower.includes("19-09") || lower.includes("thứ bảy")) {
    dateStr = "Thứ Bảy (19/09/2026)";
  } else {
    dateStr = "Hôm nay (17/09/2026)";
  }

  if (timeStr && dateStr) return `${timeStr} · ${dateStr}`;
  if (timeStr) return `${timeStr} · Hôm nay (17/09/2026)`;
  return dateStr;
}

function extractEventTitle(text, isMeeting) {
  const lower = text.toLowerCase();
  if (isMeeting) {
    if (lower.includes("khẩn")) return "🤝 LỊCH HỌP MỚI: Họp khẩn";
    if (lower.includes("tiến độ") || lower.includes("chốt")) return "🤝 LỊCH HỌP MỚI: Họp chốt tiến độ dự án AI";
    if (lower.includes("hackathon")) return "🤝 LỊCH HỌP MỚI: Họp Ban tổ chức Hackathon";
    return "🤝 LỊCH HỌP MỚI: Lịch họp trực tuyến";
  }
  if (lower.includes("lab 2") || lower.includes("lab2")) {
    if (lower.includes("gia hạn") || lower.includes("thêm")) return "🚨 GIA HẠN ĐỘT NGỘT: Lab 2 được gia hạn thêm";
    return "🚨 THÔNG BÁO KHẨN: Cập nhật Lab 2";
  }
  if (lower.includes("mini quiz") || lower.includes("quiz")) {
    return "⚡ DEADLINE MỚI PHÁT SINH: Mini Quiz";
  }
  return "🚨 THÔNG BÁO KHẨN CẤP / THAY ĐỔI ĐỘT NGỘT";
}

function formatIsoToDisplayTime(isoStr) {
  if (!isoStr) return "";
  const m = String(isoStr).match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
  if (!m) return isoStr;
  const [_, year, month, day, hour, minute] = m;
  const isToday = (day === "17" && month === "09" && year === "2026");
  const isTomorrow = (day === "18" && month === "09" && year === "2026");
  const relStr = isToday ? "Hôm nay" : (isTomorrow ? "Ngày mai" : `${day}/${month}/${year}`);
  return `${hour}:${minute} · ${relStr} (${day}/${month}/${year})`;
}

async function callBackendDiscordEvent(channelId, author, text, msgId, alertMsgId) {
  try {
    const rawPayload = {
      t: "MESSAGE_CREATE",
      d: {
        id: msgId || String(Date.now()),
        guild_id: "123456789012345678",
        channel_id: `chan_${channelId}`,
        author: {
          id: "1029384756",
          username: author.name
        },
        content: text,
        timestamp: new Date().toISOString(),
        mention_everyone: text.includes("@everyone")
      }
    };
    const res = await fetch(`${BACKEND_API_URL}/events/discord`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rawPayload)
    });
    if (res.ok) {
      const data = await res.json();
      console.log("[LIVE BACKEND AI PIPELINE RESPONSE]", data);
      if (data.status === "PROCESSED" && data.saved_document) {
        const exists = events.findIndex(e => e._id === data.saved_document._id);
        if (exists >= 0) events[exists] = data.saved_document;
        else events.unshift(data.saved_document);

        // Update alert card in deadline-hub if present
        if (alertMsgId && channelMessages["deadline-hub"]) {
          const alert = channelMessages["deadline-hub"].find(m => m.id === alertMsgId);
          if (alert && data.ai_output) {
            const ai = data.ai_output;
            const isMeeting = ai.classification?.type === "MEETING";
            if (ai.content?.title) {
              alert.alertTitle = isMeeting 
                ? `🤝 LỊCH HỌP MỚI: ${ai.content.title}` 
                : `🚨 THÔNG BÁO KHẨN: ${ai.content.title}`;
            }
            if (isMeeting && ai.schedule?.start_time) {
              alert.newDeadline = formatIsoToDisplayTime(ai.schedule.start_time);
            } else if (!isMeeting && ai.schedule?.deadline) {
              alert.newDeadline = formatIsoToDisplayTime(ai.schedule.deadline);
            } else if (ai.schedule?.start_time) {
              alert.newDeadline = formatIsoToDisplayTime(ai.schedule.start_time);
            }
            if (data.saved_document?.source?.message_id) {
              alert.sourceMsgId = data.saved_document.source.message_id;
            }
            if (activeChannel === "deadline-hub") {
              renderChannelFeed("deadline-hub");
            }
          }
        }

        if (data.ai_output) {
          const ai = data.ai_output;
          updatePipelineTrace({
            status: ai.classification.type,
            tone: ai.classification.importance === "HIGH" ? "rejected" : "found",
            signal: `AI Gemini: "${ai.content.title}"`,
            ruleGate: `PASS (${author.role} + #${channelId})`,
            importance: `${ai.classification.importance} · AI: ${Math.round((ai.classification.confidence || 0.95) * 100)}%`,
            targetData: "data/events.json (Doc Schema)",
            action: "Lưu JSON & Đồng bộ sang #deadline-hub",
            step: 4
          });
        }

        showToast("⚡ FastAPI AI Backend: Gemini đã trích xuất và lưu vào data/events.json!");
      }
    }
  } catch (err) {
    console.warn("Backend offline, running standalone.", err);
  }
}

function processNewMessage(channelId, authorKey, text) {
  const author = personas[authorKey] || personas.student_lananh;
  const msgId = `msg_${Date.now()}`;
  const msgObj = {
    id: msgId,
    channel: channelId,
    author: { name: author.name, role: author.role, avatar: author.avatar, type: author.type },
    content: text,
    timestamp: now(),
    type: "chat"
  };

  if (!channelMessages[channelId]) channelMessages[channelId] = [];
  channelMessages[channelId].push(msgObj);

  if (activeChannel === channelId) {
    renderChannelFeed(channelId);
  }

  const whitelistChannels = ["announcements", "lab-assignments", "quiz-updates", "hackathon"];
  const isWhitelistChannel = whitelistChannels.includes(channelId);
  const isAuthorityRole = ["teacher", "ta", "admin"].includes(author.type);
  const lowerText = text.toLowerCase();

  const { meetLink, formLink } = extractLinksFromText(text);

  const isMeeting = isAuthorityRole && (lowerText.includes("họp") || lowerText.includes("meeting") || lowerText.includes("meet"));
  const isUrgent = isAuthorityRole && (lowerText.includes("khẩn cấp") || lowerText.includes("lỗi") || lowerText.includes("đột xuất") || lowerText.includes("thêm 2 tiếng") || lowerText.includes("gia hạn"));
  const isNewDaily = isAuthorityRole && (lowerText.includes("bổ sung") || lowerText.includes("mới phát sinh") || lowerText.includes("mini quiz"));
  const isConflict = isAuthorityRole && (lowerText.includes("18/09") && lowerText.includes("lab 2") && channelId === "lab-assignments");

  if (isMeeting) {
    const alertId = `meeting_${Date.now()}`;
    const parsedTime = parseVietnameseDateTime(text);
    const parsedTitle = extractEventTitle(text, true);

    updatePipelineTrace({
      status: "MEETING EVENT",
      tone: "found",
      signal: parsedTitle,
      ruleGate: `PASS (${author.role} + Lịch họp)`,
      importance: "QUAN TRỌNG (@everyone)",
      targetData: "data/events.json (Doc Schema)",
      action: "Gửi thẻ họp & cập nhật bản tin 7 ngày",
      step: 4
    });

    const meetingMsg = {
      id: alertId,
      channel: "deadline-hub",
      author: { name: "Deadline Bot", role: "APP", avatar: "D", type: "bot" },
      type: "urgent_alert",
      alertType: "meeting",
      alertTitle: parsedTitle,
      content: `Thông báo từ ${author.name}: ${text}`,
      newDeadline: parsedTime,
      meetLink: meetLink,
      formLink: formLink,
      author_name: author.name,
      source: `#${channelId}`,
      sourceChannel: channelId,
      sourceMsgId: msgId,
      timestamp: now()
    };
    channelMessages["deadline-hub"].push(meetingMsg);
    showToast("🤝 Đã gửi THẺ LỊCH HỌP sang #deadline-hub!");
    if (activeChannel === "deadline-hub") renderChannelFeed("deadline-hub");

    callBackendDiscordEvent(channelId, author, text, msgId, alertId);
    return;
  }

  if (isUrgent) {
    markScenario("urgent");
    const alertId = `alert_${Date.now()}`;
    const parsedTime = parseVietnameseDateTime(text);
    const parsedTitle = extractEventTitle(text, false);

    updatePipelineTrace(pipelineScenarios.urgent);

    deadlines.forEach((d) => {
      if (d.assignment_code === "lab-2") {
        d.time = parsedTime.includes("02:00") ? "02:00 (sáng 18/09)" : "23:59 (17/09)";
        d.due_time = parsedTime.includes("02:00") ? "02:00" : "23:59";
        d.quote = text;
        if (formLink) d.submission_link = formLink;
      }
    });

    const urgentMsg = {
      id: alertId,
      channel: "deadline-hub",
      author: { name: "Deadline Bot", role: "APP", avatar: "D", type: "bot" },
      type: "urgent_alert",
      alertType: "deadline",
      alertTitle: parsedTitle,
      content: `Thông báo khẩn cấp từ ${author.name}: ${text}`,
      newDeadline: parsedTime,
      meetLink: meetLink,
      formLink: formLink,
      author_name: author.name,
      source: `#${channelId}`,
      sourceChannel: channelId,
      sourceMsgId: msgId,
      timestamp: now()
    };
    channelMessages["deadline-hub"].push(urgentMsg);
    showToast("🚨 Đã gửi THÔNG BÁO KHẨN CẤP sang #deadline-hub!");
    if (activeChannel === "deadline-hub") renderChannelFeed("deadline-hub");

    callBackendDiscordEvent(channelId, author, text, msgId, alertId);
    return;
  }

  if (isNewDaily) {
    markScenario("new_daily");
    updatePipelineTrace(pipelineScenarios.new_daily);

    const alertId = `daily_${Date.now()}`;
    const parsedTime = parseVietnameseDateTime(text);
    const newDailyItem = {
      id: `new-daily-${Date.now()}`,
      assignment_code: "mini-quiz-daily",
      title: "Mini Quiz 15 phút · Tokenization & WordPiece",
      date: "2026-09-17",
      due_date: "2026-09-17",
      time: "18:00",
      due_time: "18:00",
      type: "quiz",
      submission_link: formLink || "https://vlearn.edu.vn/courses/ai-k4/mini-quiz",
      source_channel: `#${channelId}`,
      source: `#${channelId}`,
      sourceLabel: `${author.name} (${author.role})`,
      source_message_id: msgId,
      status: "ACTIVE",
      is_important: true,
      confidence: 100,
      quote: text,
      author_name: author.name,
      author_role: author.role
    };
    deadlines.unshift(newDailyItem);

    const dailyAlert = {
      id: alertId,
      channel: "deadline-hub",
      author: { name: "Deadline Bot", role: "APP", avatar: "D", type: "bot" },
      type: "urgent_alert",
      alertType: "deadline",
      alertTitle: "⚡ DEADLINE MỚI PHÁT SINH TRONG NGÀY (Chưa có trong lịch tuần)",
      content: `Giảng viên vừa công bố bài tập mới trong ngày hôm nay: ${text}`,
      newDeadline: parsedTime,
      meetLink: meetLink,
      formLink: formLink || "https://vlearn.edu.vn/courses/ai-k4/mini-quiz",
      author_name: author.name,
      source: `#${channelId}`,
      sourceChannel: channelId,
      sourceMsgId: msgId,
      timestamp: now()
    };
    channelMessages["deadline-hub"].push(dailyAlert);
    showToast("⚡ Đã ghi nhận bài mới phát sinh trong ngày và BẮN THÔNG BÁO MỚI sang #deadline-hub!");
    if (activeChannel === "deadline-hub") renderChannelFeed("deadline-hub");

    callBackendDiscordEvent(channelId, author, text, msgId, alertId);
    return;
  }

  if (isConflict) {
    markScenario("conflict");
    updatePipelineTrace(pipelineScenarios.conflict);

    const conflictMsg = {
      id: `conflict_${Date.now()}`,
      channel: "deadline-hub",
      author: { name: "Deadline Bot", role: "APP", avatar: "D", type: "bot" },
      type: "bot_embed",
      sourceChannel: channelId,
      sourceMsgId: msgId,
      content: "⚠️ **CẢNH BÁO XUNG ĐỘT KHẨN CẤP:** Phát hiện thông báo mâu thuẫn giữa các kênh!",
      embed: {
        badge: "⚠️ PHÁT HIỆN MÂU THUẪN MỐC NỘP SÁT HẠN",
        badgeType: "yellow",
        title: "Lab 2 · Prompt Engineering",
        deadline: "Mốc 1: 23:59 17/09 (#announcements) vs Mốc 2: 18:00 18/09 (#lab-assignments)",
        source: `Tin mới từ ${author.name} trong #${channelId}`,
        sourceChannel: channelId,
        sourceMsgId: msgId,
        status: "CONFLICT",
        note: "Đã giữ nguyên bản cũ và gắn cờ CONFLICT, tag @TA và @GiảngViên vào thống nhất."
      },
      timestamp: now()
    };
    channelMessages["deadline-hub"].push(conflictMsg);
    showToast("⚠️ Phát hiện xung đột: Đã BẮN THẺ CẢNH BÁO VÀNG sang #deadline-hub!");
    if (activeChannel === "deadline-hub") renderChannelFeed("deadline-hub");

    callBackendDiscordEvent(channelId, author, text, msgId);
    return;
  }

  // Case D: Thảo luận bình thường của học viên tại kênh bài tập
  if (!isAuthorityRole && (lowerText.includes("hạn") || lowerText.includes("khi nào") || lowerText.includes("mấy giờ"))) {
    markScenario("normal");
    updatePipelineTrace(pipelineScenarios.normal);

    window.setTimeout(() => {
      const replyMsg = {
        id: `reply_${Date.now()}`,
        channel: channelId,
        author: { name: "Deadline Bot", role: "APP", avatar: "D", type: "bot" },
        replyTo: author.name,
        content: `💬 [Trả lời @${author.name}] 📌 Hạn nộp **Lab 2: Prompt Engineering** là **23:59 hôm nay (17/09/2026)**. Form: https://forms.gle/lab2-submit-k4. Lịch tổng hợp 7 ngày đang hiển thị sẵn tại kênh **#deadline-hub** nhé!`,
        timestamp: now(),
        type: "local_reply"
      };
      channelMessages[channelId].push(replyMsg);
      if (activeChannel === channelId) renderChannelFeed(channelId);
      showToast("Bot chỉ trả lời tại chỗ trong kênh này, KHÔNG gửi tin mới sang #deadline-hub.");
    }, 500);
    return;
  }

  // Regular chat: do nothing in deadline-hub
  callBackendDiscordEvent(channelId, author, text, msgId);
  updatePipelineTrace({
    status: "CHAT THƯỜNG",
    tone: "idle",
    signal: `#${channelId} · ${author.name}`,
    ruleGate: "Chat thông thường",
    importance: "KHÔNG LIÊN QUAN",
    targetData: "Lưu nội bộ kênh",
    action: "Không gửi tin sang #deadline-hub",
    step: 2
  });
}

// ============================================================================
// DATA INSPECTOR MODAL
// ============================================================================

let currentJsonTab = "events";

async function fetchPipelineLogs() {
  try {
    const res = await fetch(`${BACKEND_API_URL}/logs?limit=150`);
    if (res.ok) {
      const data = await res.json();
      if (data.lines && Array.isArray(data.lines)) {
        return data.lines.join("\n");
      }
    }
  } catch (err) {
    console.warn("Could not fetch logs from backend:", err);
  }
  return `[${new Date().toISOString()}] [CLIENT_OFFLINE] Không thể kết nối tới backend để đọc logs/pipeline.log. Hãy đảm bảo FastAPI backend đang chạy tại port 8000.`;
}

async function renderJsonViewer(tabName) {
  currentJsonTab = tabName;
  document.querySelectorAll(".json-tab-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.json === tabName);
  });

  const pathLabel = document.querySelector("#jsonViewerPath");
  const codeBlock = document.querySelector("#jsonViewerCode");

  if (tabName === "pipeline_log") {
    pathLabel.textContent = "logs/pipeline.log (Audit Log)";
    codeBlock.textContent = "Đang tải logs/pipeline.log từ server...";
    const logs = await fetchPipelineLogs();
    codeBlock.textContent = logs;
    return;
  }

  let dataObj = null;
  if (tabName === "events") {
    pathLabel.textContent = "data/events.json (Document Schema)";
    dataObj = events;
  } else if (tabName === "deadlines") {
    pathLabel.textContent = "data/deadlines.json";
    dataObj = deadlines;
  } else {
    pathLabel.textContent = `data/channels/${tabName}.json`;
    dataObj = channelMessages[tabName] || [];
  }

  codeBlock.textContent = JSON.stringify(dataObj, null, 2);
}

function openDataInspector() {
  renderJsonViewer(currentJsonTab);
  openDialog(dataDialog);
}

async function openLogViewer() {
  const codeEl = document.querySelector("#logViewerCode");
  if (codeEl) codeEl.textContent = "Đang tải logs từ logs/pipeline.log...";
  openDialog(document.querySelector("#logDialog"));
  const logText = await fetchPipelineLogs();
  if (codeEl) codeEl.textContent = logText;
}

function openDeadlineDetail(id) {
  const item = deadlines.find((d) => d.id === id);
  if (!item) return;
  const dStr = item.due_date || item.date || "";
  const tStr = item.due_time || item.time || "";

  const rawCh = item.source_channel || item.source || "announcements";
  const chName = rawCh.replace("#", "").trim();
  const srcMsgId = item.source_message_id || "";

  document.querySelector("#detailTitle").textContent = item.title;
  document.querySelector("#detailContent").innerHTML = `
    <div class="detail-summary">
      <div class="detail-date">
        <strong>${dStr.slice(8, 10)}</strong>
        <span>THG ${Number(dStr.slice(5, 7))}</span>
      </div>
      <div>
        <span class="confidence-chip" style="color:var(--green);font-weight:800;font-size:9px;">CÓ NGUỒN XÁC THỰC · ${item.confidence || 98}% · ${item.status}</span>
        <h3 style="margin:4px 0;">${tStr} · ${dStr.split("-").reverse().join("/")}</h3>
        <p style="margin:3px 0;color:var(--muted);font-size:11px;">Kênh thông báo gốc: <button type="button" class="channel-jump-btn" data-jump-channel="${escapeHtml(chName)}" data-jump-msg="${escapeHtml(srcMsgId)}">#${escapeHtml(chName)} · Nhảy tới tin nhắn gốc ↗</button></p>
        ${item.submission_link ? `<p style="margin:4px 0;"><a href="${item.submission_link}" target="_blank" style="color:var(--purple);font-weight:700;">🔗 Form nộp: ${escapeHtml(item.submission_link)}</a></p>` : ""}
      </div>
    </div>
    <div class="evidence-box">
      <strong>Vì sao bot đưa mục này lên lịch (HAX G2 Grounding)?</strong>
      <blockquote>“${escapeHtml(item.quote || "Nguồn chính thức đã được xác thực.")}”</blockquote>
      <div class="evidence-meta">
        <span>Người đăng: <b>${escapeHtml(item.author_name || "GV/TA")}</b> (${escapeHtml(item.author_role || "Giảng viên")})</span>
        <span>Kênh: <button type="button" class="channel-jump-btn" style="padding:1px 6px;font-size:9px;" data-jump-channel="${escapeHtml(chName)}" data-jump-msg="${escapeHtml(srcMsgId)}">#${escapeHtml(chName)} ↗</button></span>
      </div>
    </div>
    <div class="detail-actions">
      <button class="danger-button" type="button" data-action="report">⚑ Báo sai / Tag TA</button>
      <div><button class="secondary-button" type="button" data-close="detailDialog">Đóng</button></div>
    </div>`;
  openDialog(detailDialog);
}

// ============================================================================
// EVENT LISTENERS
// ============================================================================

document.addEventListener("click", (event) => {
  const jumpBtn = event.target.closest("[data-jump-channel]");
  if (jumpBtn) {
    const rawTarget = jumpBtn.dataset.jumpChannel || "announcements";
    const targetChannel = rawTarget.replace("#", "").trim();
    const targetMsgId = jumpBtn.dataset.jumpMsg;

    closeDialog(detailDialog);
    closeDialog(dataDialog);
    closeDialog(adminDialog);
    closeDialog(correctionDialog);

    if (targetChannel && channelsInfo[targetChannel]) {
      switchChannel(targetChannel);
      setTimeout(() => {
        let el = targetMsgId ? document.querySelector(`[data-message-id="${targetMsgId}"]`) : null;
        if (!el && targetMsgId) {
          el = document.getElementById(targetMsgId);
        }
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
          el.classList.remove("highlight-flash");
          void el.offsetWidth;
          el.classList.add("highlight-flash");
          setTimeout(() => el.classList.remove("highlight-flash"), 2600);
        } else {
          scrollFeedToLatest("smooth");
        }
      }, 120);
    }
    return;
  }

  const channelBtn = event.target.closest(".channel[data-channel]");
  if (channelBtn) {
    switchChannel(channelBtn.dataset.channel);
    return;
  }

  const quickBtn = event.target.closest("[data-quick]");
  if (quickBtn) {
    const quickType = quickBtn.dataset.quick;
    if (quickType === "meeting-event") {
      personaSelect.value = "teacher_hoang";
      personaSelect.dispatchEvent(new Event("change"));
      switchChannel("announcements");
      processNewMessage("announcements", "teacher_hoang", "@everyone Chào các bạn, ngày mai chúng ta có lịch họp online lúc 20:00 để chốt tiến độ dự án AI nhé. Link meet mình sẽ gửi sau.");
    } else if (quickType === "urgent-extension") {
      personaSelect.value = "teacher_hoang";
      personaSelect.dispatchEvent(new Event("change"));
      switchChannel("announcements");
      processNewMessage("announcements", "teacher_hoang", "Thông báo khẩn cấp lớp 3A: Do sự cố quyền truy cập form nộp bài, Giảng viên gia hạn khẩn cấp thêm 2 tiếng cho Lab 2 đến 02:00 sáng mai (18/09/2026)!");
    } else if (quickType === "new-daily-deadline") {
      personaSelect.value = "teacher_hoang";
      personaSelect.dispatchEvent(new Event("change"));
      switchChannel("announcements");
      processNewMessage("announcements", "teacher_hoang", "Thông báo bổ sung trong ngày: Mở thêm Mini Quiz 15 phút về Tokenization, hạn chót nộp trước 18:00 chiều nay 17/09/2026!");
    } else if (quickType === "conflict-alert") {
      personaSelect.value = "ta_tuan";
      personaSelect.dispatchEvent(new Event("change"));
      switchChannel("lab-assignments");
      processNewMessage("lab-assignments", "ta_tuan", "Lưu ý Lab 2: Hạn chót là 18:00 ngày 18/09 nhé các bạn, form sẽ đóng sớm.");
    } else if (quickType === "normal-chat") {
      personaSelect.value = "student_lananh";
      personaSelect.dispatchEvent(new Event("change"));
      switchChannel("lab-assignments");
      processNewMessage("lab-assignments", "student_lananh", "Mọi người cho mình hỏi hạn nộp Lab 2 là mấy giờ thế?");
    }
    return;
  }

  const deadlineButton = event.target.closest("[data-deadline-id]");
  if (deadlineButton) {
    openDeadlineDetail(deadlineButton.dataset.deadlineId);
    return;
  }

  const scenarioButton = event.target.closest("[data-scenario]");
  if (scenarioButton) {
    const name = scenarioButton.dataset.scenario;
    markScenario(name);
    if (pipelineScenarios[name]) updatePipelineTrace(pipelineScenarios[name]);
    if (name === "correction") openDialog(correctionDialog);
    return;
  }

  const jsonTab = event.target.closest(".json-tab-btn");
  if (jsonTab) {
    renderJsonViewer(jsonTab.dataset.json);
    return;
  }

  const action = event.target.closest("[data-action]")?.dataset.action;
  if (action === "admin-add") openDialog(adminDialog);
  else if (action === "report") { closeDialog(detailDialog); openDialog(correctionDialog); }

  const closeTarget = event.target.closest("[data-close]");
  if (closeTarget) closeDialog(document.querySelector(`#${closeTarget.dataset.close}`));
  if (event.target.matches("dialog")) closeDialog(event.target);
});

commandComposer.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = commandInput.value.trim();
  if (!text) return;
  commandInput.value = "";
  processNewMessage(activeChannel, currentPersona, text);
  commandInput.focus();
});

personaSelect.addEventListener("change", (event) => {
  currentPersona = event.target.value;
  const p = personas[currentPersona] || personas.student_lananh;
  composerPersonaLabel.textContent = p.label;
  document.querySelector("#profileName").textContent = p.name;
  document.querySelector("#profileRole").textContent = `${p.role} · Lớp 3A`;
  document.querySelector("#profileAvatar").textContent = p.avatar;
  updateComposerPlaceholder();
  showToast(`Đã chuyển vai trò sang: ${p.label}`);
});

document.querySelector("#openDataInspectorButton").addEventListener("click", openDataInspector);

document.querySelector("#copyJsonBtn").addEventListener("click", () => {
  const code = document.querySelector("#jsonViewerCode").textContent;
  navigator.clipboard.writeText(code).then(() => {
    showToast("Đã sao chép nội dung JSON vào Clipboard!");
  }).catch(() => {
    showToast("Không thể sao chép tự động, vui lòng chọn và Ctrl+C.");
  });
});

document.querySelector("#adminForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const date = String(data.get("date"));
  const newDl = {
    id: `manual-${Date.now()}`,
    assignment_code: `manual-${Date.now()}`,
    title: String(data.get("title")),
    date,
    due_date: date,
    time: String(data.get("time")),
    due_time: String(data.get("time")),
    type: "review",
    source_channel: String(data.get("source")),
    source: String(data.get("source")),
    sourceLabel: "Admin nhập thủ công",
    status: "ACTIVE",
    is_important: true,
    confidence: 100,
    quote: "Deadline được admin nhập bằng form và chịu trách nhiệm xác nhận nguồn."
  };
  deadlines.unshift(newDl);
  closeDialog(adminDialog);
  showToast(`Admin đã thêm “${data.get("title")}” vào danh sách & lưu trữ JSON.`);
  renderChannelFeed(activeChannel);
  event.currentTarget.reset();
});

document.querySelector("#correctionForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const issue = new FormData(event.currentTarget).get("issue");
  closeDialog(correctionDialog);
  markScenario("correction");
  updatePipelineTrace(pipelineScenarios.correction);
  showToast(`Đã ghi nhận báo sai: “${issue}”. Chuyển cờ cho TA trực ca.`);
});

document.querySelector("#openLogViewerButton")?.addEventListener("click", openLogViewer);

document.querySelector("#refreshLogBtn")?.addEventListener("click", async () => {
  const codeEl = document.querySelector("#logViewerCode");
  if (codeEl) codeEl.textContent = "Đang làm mới logs từ logs/pipeline.log...";
  const logText = await fetchPipelineLogs();
  if (codeEl) codeEl.textContent = logText;
  showToast("Đã làm mới nhật ký luồng xử lý!");
});

document.querySelector("#copyLogBtn")?.addEventListener("click", () => {
  const code = document.querySelector("#logViewerCode")?.textContent || "";
  navigator.clipboard.writeText(code).then(() => {
    showToast("Đã sao chép nội dung logs/pipeline.log!");
  }).catch(() => {
    showToast("Không thể sao chép tự động, vui lòng chọn và Ctrl+C.");
  });
});

const toggleMembersBtn = document.querySelector("#toggleMembersBtn");
if (toggleMembersBtn) {
  toggleMembersBtn.addEventListener("click", () => {
    const shell = document.querySelector(".app-shell");
    if (shell) {
      shell.classList.toggle("hide-members");
      const isHidden = shell.classList.contains("hide-members");
      showToast(isHidden ? "Đã ẩn danh sách thành viên" : "Đã hiện danh sách thành viên");
    }
  });
}

messageFeed.addEventListener("scroll", updateFeedScrollButton, { passive: true });
feedScrollButton.addEventListener("click", () => scrollFeedToLatest());
document.querySelector("#resetButton")?.addEventListener("click", () => window.location.reload());

const backendPill = document.querySelector("#backendStatusPill");
if (backendPill) {
  backendPill.addEventListener("click", () => {
    checkBackendStatus().then((ok) => {
      showToast(ok ? "Đã kết nối FastAPI Backend (Port 8000) thành công!" : "Chưa kết nối được Backend. Chạy 'python -m backend.main' để bật server.");
    });
  });
}

// Initial load
switchChannel("deadline-hub");
updatePipelineTrace(pipelineScenarios.urgent);
checkBackendStatus();
