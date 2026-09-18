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
      "content": "📢 **BẢNG TIN TỰ ĐỘNG 7 NGÀY TỚI (CHỈ ĐỌC)**\n\nĐây là không gian **chỉ đọc** hiển thị lịch nộp bài 7 ngày tới (đồng bộ tự động) và các thông báo khẩn cấp từ Giảng viên. Hệ thống tự động phân loại mức ưu tiên (Khẩn cấp, Quan trọng, Thông báo thường) và cập nhật liên tục.",
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
  "deadline-hub-bulletin": [
    {
      "id": "msg_hub_intro",
      "author": {
        "name": "Deadline Bot",
        "role": "APP",
        "avatar": "D",
        "type": "bot"
      },
      "content": "📢 **BẢNG TIN TỰ ĐỘNG 7 NGÀY TỚI (CHỈ ĐỌC)**\n\nĐây là không gian **chỉ đọc** hiển thị lịch nộp bài 7 ngày tới (đồng bộ tự động) và các thông báo khẩn cấp từ Giảng viên. Hệ thống tự động phân loại mức ưu tiên (Khẩn cấp, Quan trọng, Thông báo thường) và cập nhật liên tục.",
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
        "name": "TA Tuấn",
        "role": "TA",
        "avatar": "TT",
        "type": "ta"
      },
      "replyTo": "Lan Anh",
      "content": "Chào Lan Anh, hạn Lab 2 là **23:59 hôm nay (17/09)** nhé. Nộp file notebook hoặc link GitHub qua form. Cần check lịch tổng hợp và các thông báo mới nhất thì qua Bảng Tin **#deadline-hub** nha!",
      "timestamp": "11:02 · 17/09",
      "type": "chat"
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
  if (!dialog) return;
  if (typeof dialog.close === "function") {
    if (dialog.open) dialog.close();
  } else {
    dialog.removeAttribute("open");
  }
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
// 7-DAY ROLLING DIGEST RENDERING & SMART DEDUPLICATION
// ============================================================================

function extractChannelName(rawStr) {
  if (!rawStr) return "announcements";
  const s = String(rawStr).toLowerCase().trim();
  if (s.includes("hub") || s.includes("bulletin")) return "deadline-hub";
  if (s.includes("quiz")) return "quiz-updates";
  if (s.includes("lab")) return "lab-assignments";
  if (s.includes("hack")) return "hackathon";
  if (s.includes("lich") || s.includes("học")) return "lich-hoc";
  if (s.includes("announcement")) return "announcements";
  return s
    .replace(/^#/, "")
    .replace(/^chan_/, "")
    .replace(/_/g, "-");
}

function mergeChannelMessageLists(...messageLists) {
  const merged = [];
  const positions = new Map();

  for (const list of messageLists) {
    if (!Array.isArray(list)) continue;
    for (const message of list) {
      if (!message || typeof message !== "object") continue;
      const rawId = String(message.id || "").trim();
      const fallbackKey = `${message.timestamp || ""}|${message.content || ""}`;
      const key = rawId ? `id:${rawId}` : `fallback:${fallbackKey}`;
      if (positions.has(key)) {
        const index = positions.get(key);
        merged[index] = { ...merged[index], ...message };
      } else {
        positions.set(key, merged.length);
        merged.push({ ...message });
      }
    }
  }

  return merged;
}

function getCanonicalEventKey(item) {
  if (!item) return `item_${Date.now()}`;
  const code = (item.assignment_code || item.id || "").toLowerCase();
  const title = (item.title || "").toLowerCase();
  const date = item.due_date || item.date || "";

  // Match Labs: Lab 1, Lab 2, Lab 3, etc.
  const labMatch = title.match(/lab\s*(\d+)/) || code.match(/lab\s*(\d+)/);
  if (labMatch) return `lab-${labMatch[1]}`;

  // Match Quizzes: Quiz 1, Quiz 2, etc.
  const quizMatch = title.match(/quiz\s*(\d+)/) || code.match(/quiz\s*(\d+)/);
  if (quizMatch) return `quiz-${quizMatch[1]}`;

  // Match Checkpoints: Checkpoint 2, CP2, Hackathon
  const cpMatch = title.match(/checkpoint\s*(\d+)/) || title.match(/cp\s*(\d+)/) || code.match(/cp\s*(\d+)/);
  if (cpMatch) return `hackathon-cp${cpMatch[1]}`;
  if (title.includes("hackathon") || code.includes("hackathon")) return "hackathon-cp2";

  // Meetings: Group by date + meeting keywords
  const isMeeting = item.type === "MEETING" || title.includes("họp") || title.includes("meeting");
  if (isMeeting) {
    if (title.includes("tiến độ") || title.includes("dự án") || title.includes("slide") || title.includes("online")) {
      return `meeting_${date}_project_ai`;
    }
    return `meeting_${date}_${item.due_time || item.time || "general"}`;
  }

  return code || title;
}

function deduplicateEventList(items) {
  const map = new Map();
  for (const item of items) {
    const key = getCanonicalEventKey(item);
    if (!map.has(key)) {
      map.set(key, { ...item });
    } else {
      const existing = map.get(key);
      const isItemExtension = item.is_extension || (item.due_time && item.due_time !== "23:59");
      const hasMeet = Boolean(item.meetLink);
      const isItemNewer = (item.updated_at || "") >= (existing.updated_at || "");

      if (hasMeet) existing.meetLink = item.meetLink;
      if (item.submission_link) existing.submission_link = item.submission_link;
      if (item.source_message_id) existing.source_message_id = item.source_message_id;
      if (item.format) existing.format = item.format;

      if (isItemExtension || isItemNewer) {
        map.set(key, { ...existing, ...item });
      }
    }
  }
  return Array.from(map.values());
}

function renderDigestSingleItem(item) {
  const isMeeting = item.type === "MEETING" || (item.title && item.title.toLowerCase().includes("họp"));
  const rawCh = item.source_channel || item.source || "announcements";
  const chName = extractChannelName(rawCh);
  const srcMsgId = item.source_message_id || item.source_msg_id || "";
  const authorName = item.author_name || "Giảng viên";

  const tagClass = isMeeting ? "blue" : (item.is_extension ? "red" : (item.title && item.title.toLowerCase().includes("quiz") ? "blue" : "purple"));
  const timeText = isMeeting ? `🤝 Họp lúc ${item.due_time || item.time}` : (item.is_extension ? `🚨 Gia hạn: ${item.due_time || item.time}` : `⏳ Hạn: ${item.due_time || item.time}`);
  const meetLink = item.meetLink || null;
  const subLink = item.submission_link || null;
  const formatText = item.format || (isMeeting ? "Google Meet trực tuyến" : "Nộp bài trực tuyến");

  return `
    <div class="digest-item ${isMeeting ? "meeting" : (item.is_extension ? "urgent" : "quiz")}">
      <div class="item-main">
        <div class="item-title-row">
          <strong>${escapeHtml(item.title)}</strong>
          <span class="countdown-tag ${tagClass}">${escapeHtml(timeText)}</span>
        </div>
        <div class="item-meta">
          <span>Thời gian: <b>${escapeHtml(item.due_time || item.time)}</b></span>
          <span>Nguồn: <b>#${escapeHtml(chName)} (${escapeHtml(authorName)})</b></span>
          <span>Hình thức: <b>${escapeHtml(formatText)}</b></span>
        </div>
      </div>
      <div class="item-actions">
        ${meetLink ? `<a href="${escapeHtml(meetLink)}" target="_blank" rel="noopener" class="btn-submit" style="background:#2563eb;">📹 Vào Meet</a>` : ""}
        ${subLink && !meetLink ? `<a href="${escapeHtml(subLink)}" target="_blank" rel="noopener" class="btn-submit">🔗 Nộp Form</a>` : ""}
        <button type="button" class="btn-detail" data-deadline-id="${item.id}">Chi tiết</button>
      </div>
    </div>
  `;
}

function renderWeeklyDigestHtml() {
  const rawActive = deadlines.filter((d) => d.status === "ACTIVE" || d.status === "CONFLICT");
  const activeItems = deduplicateEventList(rawActive);

  const todayItems = activeItems.filter((d) => (d.due_date === "2026-09-17" || d.date === "2026-09-17"));
  const tomorrowItems = activeItems.filter((d) => (d.due_date === "2026-09-18" || d.date === "2026-09-18"));
  const satItems = activeItems.filter((d) => (d.due_date === "2026-09-19" || d.date === "2026-09-19"));
  const nextDaysItems = activeItems.filter((d) => {
    const dt = d.due_date || d.date || "";
    return dt >= "2026-09-20" && dt <= "2026-09-23";
  });

  const totalCount = todayItems.length + tomorrowItems.length + satItems.length + nextDaysItems.length;

  const todayHtml = todayItems.length > 0
    ? todayItems.map(renderDigestSingleItem).join("")
    : '<div class="day-items empty"><span>Không có bài nộp hoặc lịch họp hôm nay.</span></div>';

  const tomorrowHtml = tomorrowItems.length > 0
    ? tomorrowItems.map(renderDigestSingleItem).join("")
    : '<div class="day-items empty"><span>Không có bài đến hạn · Dành thời gian ôn tập lý thuyết & thực hành Lab</span></div>';

  const satHtml = satItems.length > 0
    ? satItems.map(renderDigestSingleItem).join("")
    : '<div class="day-items empty"><span>Không có bài đến hạn.</span></div>';

  const nextDaysHtml = nextDaysItems.length > 0
    ? nextDaysItems.map(renderDigestSingleItem).join("")
    : '<div class="day-items empty"><span>Chưa có deadline chính thức mới phát sinh. Theo dõi thêm tại #announcements.</span></div>';

  return `
    <div class="weekly-digest-card">
      <div class="digest-header">
        <div>
          <span class="digest-badge">📅 TỰ ĐỘNG TỔNG HỢP 7 NGÀY TỚI</span>
          <h2>Lịch Trình & Deadline Tuần Này (17/09 – 23/09/2026)</h2>
          <p>Tự động đồng bộ từ các kênh thông báo chính thức · Bao gồm bài tập & lịch họp</p>
        </div>
        <div class="digest-stat">
          <strong>${totalCount}</strong>
          <span>SỰ KIỆN SẮP TỚI</span>
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
          <div class="day-items">${tomorrowHtml}</div>
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
          <div class="day-items">${nextDaysHtml}</div>
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


function updateComposerLockState() {
  const composer = document.querySelector("#commandComposer");
  const input = document.querySelector("#commandInput");
  if (!composer || !input) return;

  const p = personas[currentPersona] || personas.student_lananh;
  const isAuthority = ["teacher", "ta", "admin"].includes(p.type);

  if (activeChannel === "deadline-hub") {
    if (!isAuthority) {
      composer.classList.add("locked");
      input.disabled = true;
      input.placeholder = "🔒 Bảng tin chỉ đọc · Chỉ Giảng viên & Ban tổ chức mới có quyền đăng thông báo tại đây.";
    } else {
      composer.classList.remove("locked");
      input.disabled = false;
      input.placeholder = `📢 [${p.role}] Đăng thông báo khẩn cấp lên Bảng Tin Deadline...`;
    }
  } else {
    composer.classList.remove("locked");
    input.disabled = false;
    updateComposerPlaceholder();
  }
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
      .replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener" style="color:var(--purple);font-weight:700;">$1</a>')
      .replace(/#(announcements|deadline-hub|lab-assignments|quiz-updates|hackathon|lich-hoc)\b/g, '<button type="button" class="channel-jump-btn" data-jump-channel="$1" style="padding:1px 5px;font-size:10px;margin:0 2px;">#$1 ↗</button>');
    bodyHtml += `<p>${formattedContent}</p>`;
  }

  if (msg.type === "bot_embed" && msg.embed) {
    const isConflict = msg.embed.badgeType === "yellow" || (msg.embed.status && msg.embed.status === "CONFLICT");
    const rawEmbedCh = msg.embed.sourceChannel || msg.sourceChannel || (msg.channel ? msg.channel : "announcements");
    const embedSourceCh = rawEmbedCh.replace("#", "").trim();
    const embedMsgId = msg.embed.sourceMsgId || msg.embed.source_message_id || msg.sourceMsgId || msg.source_message_id || "";
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
          <button type="button" class="channel-jump-btn" data-jump-channel="${escapeHtml(embedSourceCh)}" data-jump-msg="${escapeHtml(embedMsgId)}" style="padding:4px 10px;font-size:11px;">💬 Xem tin gốc #${escapeHtml(embedSourceCh)} ↗</button>
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
  let msgs = [];
  let welcomeIcon = "#";
  let welcomeTitle = "";
  let welcomeDesc = "";

  if (channelId === "deadline-hub") {
    activeChannelTitle.textContent = "deadline-hub";
    activeChannelDesc.textContent = "Bảng tin chỉ đọc hiển thị lịch 7 ngày tới & thông báo khẩn cấp từ Giảng viên";
    welcomeIcon = "📢";
    welcomeTitle = "Bảng Tin Deadline 7 Ngày (Chỉ Đọc)";
    welcomeDesc = "Lịch trình nộp bài 7 ngày tới được hệ thống tự động cập nhật liên tục. Chỉ Giảng viên & Ban tổ chức mới có quyền đăng thông báo khẩn cấp tại đây.";
    msgs = channelMessages["deadline-hub-bulletin"] || channelMessages["deadline-hub"] || [];
  } else {
    const info = channelsInfo[channelId] || { name: channelId, title: channelId, desc: "", welcome: "" };
    activeChannelTitle.textContent = info.title;
    activeChannelDesc.textContent = info.desc;
    welcomeIcon = "#";
    welcomeTitle = `Chào mừng đến với #${info.title}!`;
    welcomeDesc = info.welcome;
    msgs = channelMessages[channelId] || [];
  }

  let html = `
    <div class="channel-welcome">
      <div class="welcome-hash">${welcomeIcon}</div>
      <h1>${escapeHtml(welcomeTitle)}</h1>
      <p>${escapeHtml(welcomeDesc)}</p>
    </div>
    <div class="chat-date"><span>HÔM NAY, 17/09/2026</span></div>`;

  html += msgs.map(renderMessageItem).join("");
  messageFeed.innerHTML = html;

  updateComposerLockState();
  scrollFeedToLatest("auto");
}

function updateComposerPlaceholder() {
  if (!commandInput) return;
  const p = personas[currentPersona] || personas.student_lananh;
  if (activeChannel === "announcements") {
    commandInput.placeholder = `[#announcements] Nhập thông báo của ${p.name} (ví dụ: Gia hạn nộp bài, lịch họp, bài tập mới)...`;
  } else if (activeChannel === "deadline-hub") {
    commandInput.placeholder = `🔒 Bảng tin chỉ đọc · Chỉ Giảng viên & Ban tổ chức mới có quyền đăng thông báo...`;
  } else if (activeChannel === "lab-assignments") {
    commandInput.placeholder = `[#lab-assignments] Thảo luận với bạn học & TA (ví dụ: Ai làm xong câu 3 notebook chưa?)...`;
  } else if (activeChannel === "quiz-updates") {
    commandInput.placeholder = `[#quiz-updates] Thảo luận về đề thi Quiz với bạn học & TA...`;
  } else {
    commandInput.placeholder = `[#${activeChannel}] Nhập tin nhắn dưới danh nghĩa ${p.name}...`;
  }
}

function switchChannel(channelId) {
  if (!channelsInfo[channelId]) {
    if (!Object.prototype.hasOwnProperty.call(channelMessages, channelId)) return false;
    channelsInfo[channelId] = {
      name: channelId,
      title: channelId,
      desc: "Kênh nguồn được đồng bộ từ backend",
      welcome: `Lịch sử tin nhắn nguồn của #${channelId}.`
    };
  }
  activeChannel = channelId;

  if (channelId === "deadline-hub") {
    unseenUpdates = 0;
    updateDeadlineHubBadge(0);
    // On-demand sync: cập nhật tức thì nếu có thông báo thường mới từ backend
    fetchAndSyncDigestFromBackend().then((hasNew) => {
      if (hasNew && activeChannel === "deadline-hub") {
        renderChannelFeed("deadline-hub");
      }
    });
  }

  document.querySelectorAll(".channel-list .channel").forEach((btn) => {
    const isTarget = btn.dataset.channel === channelId;
    btn.classList.toggle("active", isTarget);
    if (isTarget) btn.setAttribute("aria-current", "page");
    else btn.removeAttribute("aria-current");
  });

  const info = channelsInfo[channelId];
  if (activeChannelTitle) activeChannelTitle.textContent = info.title || channelId;
  if (activeChannelDesc) activeChannelDesc.textContent = info.desc || "";

  renderChannelFeed(channelId);
  return true;
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

const BACKEND_API_URL = (window.location.port === "8000") ? window.location.origin : "http://127.0.0.1:8000";

async function persistMessageToBackend(channelName, msgObj) {
  try {
    const cleanCh = String(channelName).replace("chan_", "").replace("#", "").trim();
    await fetch(`${BACKEND_API_URL}/channels/${cleanCh}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(msgObj)
    });
  } catch (err) {
    console.warn(`[Persist] Không thể lưu tin nhắn vào backend channel ${channelName}:`, err);
  }
}

async function persistDeadlineToBackend(dlObj) {
  try {
    await fetch(`${BACKEND_API_URL}/deadlines`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dlObj)
    });
  } catch (err) {
    console.warn("[Persist] Không thể lưu deadline vào backend:", err);
  }
}

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
    dateStr = "";
  }

  if (timeStr && dateStr) return `${timeStr} · ${dateStr}`;
  if (timeStr) return `${timeStr} · Hôm nay (17/09/2026)`;
  // Zero-Hallucination: Không tự trả về datetime khi không có giờ cụ thể
  return null;
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

async function callBackendDiscordEvent(channelId, author, text, msgId) {
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
      if (data.key_status === "QUOTA_EXCEEDED") {
        showToast("⚠️ Gemini API đã hết hạn ngạch (429 Quota Exceeded). Hệ thống đã chuyển sang Fallback Engine an toàn!");
      }
      if (data.status === "PROCESSED" && data.saved_document) {
        const doc = data.saved_document;
        const ai = data.ai_output || {};
        const priority = doc.system?.notification_priority || "P2";
        const isConflict = doc.system?.conflict_detected;
        const conflictNote = doc.system?.conflict_note;
        const { meetLink, formLink } = extractLinksFromText(text);

        // Update events list
        const existsIdx = events.findIndex(e => e._id === doc._id);
        if (existsIdx >= 0) events[existsIdx] = doc;
        else events.unshift(doc);

        // Deduplicate / synchronize with frontend deadlines & schedule list
        const iso = doc.schedule?.deadline || doc.schedule?.start_time;
        if (iso) {
          const isMeeting = doc.classification?.type === "MEETING";
          const candidate = {
            id: doc.system?.topic_key || `evt_${Date.now()}`,
            assignment_code: doc.system?.topic_key,
            title: doc.content?.title || text,
            type: isMeeting ? "MEETING" : "DEADLINE",
            due_date: iso.slice(0, 10),
            due_time: iso.slice(11, 16)
          };
          const canonicalKey = getCanonicalEventKey(candidate);
          const targetDl = deadlines.find(d => getCanonicalEventKey(d) === canonicalKey || d.assignment_code === candidate.id || d.id === candidate.id);
          if (targetDl) {
            targetDl.iso_deadline = iso;
            targetDl.due_date = iso.slice(0, 10);
            targetDl.due_time = iso.slice(11, 16);
            targetDl.time = `${targetDl.due_time} (${targetDl.due_date})`;
            targetDl.quote = doc.content?.summary || text;
            if (formLink) targetDl.submission_link = formLink;
            if (meetLink) targetDl.meetLink = meetLink;
            if (priority === "P0") targetDl.is_extension = true;
            if (msgId) targetDl.source_message_id = msgId;
          } else {
            deadlines.unshift({
              id: canonicalKey,
              assignment_code: canonicalKey,
              title: doc.content?.title || (isMeeting ? "Lịch họp mới" : "Bài tập mới"),
              type: doc.classification?.type || "DEADLINE",
              due_date: iso.slice(0, 10),
              due_time: iso.slice(11, 16),
              time: `${iso.slice(11, 16)} (${iso.slice(0, 10)})`,
              iso_deadline: iso,
              submission_link: formLink || (isMeeting ? null : "https://forms.gle/vlearn-submit"),
              meetLink: meetLink || (isMeeting ? "https://meet.google.com/abc-defg-hij" : null),
              format: isMeeting ? "Google Meet trực tuyến" : "File notebook .ipynb hoặc link form",
              source_channel: `#${channelId}`,
              source: `#${channelId}`,
              sourceLabel: `${author.name} (${author.role})`,
              source_message_id: msgId,
              status: "ACTIVE",
              is_important: doc.classification?.importance === "HIGH",
              confidence: Math.round((doc.classification?.confidence || 0.95) * 100),
              quote: doc.content?.summary || text,
              author_name: author.name,
              author_role: author.role
            });
          }
        }

        // --- SMART NOTIFICATION DISPATCH (P0, P1, P2, P3) ---
        if (!channelMessages["deadline-hub-bulletin"]) channelMessages["deadline-hub-bulletin"] = [];
        if (!channelMessages["deadline-hub"]) channelMessages["deadline-hub"] = [];

        if (isConflict) {
          // P0: CONFLICT DETECTED
          markScenario("conflict");
          updatePipelineTrace(pipelineScenarios.conflict);
          const conflictMsg = {
            id: `conflict_${Date.now()}`,
            channel: "deadline-hub",
            author: { name: "Deadline Bot", role: "APP", avatar: "D", type: "bot" },
            type: "bot_embed",
            sourceChannel: channelId,
            sourceMsgId: msgId,
            content: "⚠️ **CẢNH BÁO XUNG ĐỘT KHẨN CẤP:** Phát hiện mâu thuẫn thông tin giữa các kênh!",
            embed: {
              badge: "⚠️ PHÁT HIỆN MÂU THUẪN MỐC NỘP SÁT HẠN",
              badgeType: "yellow",
              title: doc.content?.title || "Phát hiện xung đột lịch",
              deadline: conflictNote || `Lệch mốc thời gian giữa thông báo mới và dữ liệu đã lưu.`,
              source: `Tin mới từ ${author.name} trong #${channelId}`,
              sourceChannel: channelId,
              sourceMsgId: msgId,
              status: "CONFLICT",
              note: "Đã giữ nguyên bản cũ và gắn cờ CONFLICT, tag @TA và @GiảngViên vào thống nhất."
            },
            timestamp: now()
          };
          channelMessages["deadline-hub-bulletin"].push(conflictMsg);
          channelMessages["deadline-hub"].push(conflictMsg);
          persistMessageToBackend("deadline-hub", conflictMsg);
          showToast("⚠️ Phát hiện xung đột: Đã BẮN THẺ CẢNH BÁO VÀNG sang #deadline-hub!");
          notifyHubUpdate();
        } else if (priority === "P0") {
          // P0: URGENT EXTENSION / CRITICAL ALERT
          markScenario("urgent");
          updatePipelineTrace(pipelineScenarios.urgent);
          const parsedTime = doc.schedule?.deadline ? formatIsoToDisplayTime(doc.schedule.deadline) : parseVietnameseDateTime(text);
          const urgentMsg = {
            id: `alert_${Date.now()}`,
            channel: "deadline-hub",
            author: { name: "Deadline Bot", role: "APP", avatar: "D", type: "bot" },
            type: "urgent_alert",
            alertType: "deadline",
            alertTitle: `🚨 THÔNG BÁO KHẨN: ${doc.content?.title || "Gia hạn khẩn cấp"}`,
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
          channelMessages["deadline-hub-bulletin"].push(urgentMsg);
          channelMessages["deadline-hub"].push(urgentMsg);
          persistMessageToBackend("deadline-hub", urgentMsg);
          showToast("🚨 Đã gửi THÔNG BÁO KHẨN CẤP sang #deadline-hub!");
          notifyHubUpdate();
        } else if (priority === "P1") {
          // P1: IMPORTANT NEW DEADLINE OR MEETING
          const isMeeting = doc.classification?.type === "MEETING";
          const parsedTime = isMeeting
            ? (doc.schedule?.start_time ? formatIsoToDisplayTime(doc.schedule.start_time) : null)
            : (doc.schedule?.deadline ? formatIsoToDisplayTime(doc.schedule.deadline) : null);

          if (!parsedTime) {
            showToast(`ℹ️ Đã ghi nhận thông báo từ ${author.name} (Chưa có mốc thời gian cụ thể, không lập thẻ lịch hẹn).`);
            return;
          }

          const alertMsg = {
            id: `p1_${Date.now()}`,
            channel: "deadline-hub",
            author: { name: "Deadline Bot", role: "APP", avatar: "D", type: "bot" },
            type: "urgent_alert",
            alertType: isMeeting ? "meeting" : "deadline",
            alertTitle: isMeeting ? `🤝 LỊCH HỌP MỚI: ${doc.content?.title}` : `⚡ DEADLINE MỚI: ${doc.content?.title}`,
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
          channelMessages["deadline-hub-bulletin"].push(alertMsg);
          channelMessages["deadline-hub"].push(alertMsg);
          persistMessageToBackend("deadline-hub", alertMsg);
          showToast(isMeeting ? "🤝 Đã gửi THẺ LỊCH HỌP sang #deadline-hub!" : "⚡ Đã gửi THẺ DEADLINE MỚI sang #deadline-hub!");
          notifyHubUpdate();
        } else if (priority === "P2") {
          // P2: GENERAL NOTIFICATION (THÔNG BÁO THƯỜNG / NHẮC NHỞ)
          // Không spam thẻ khẩn cấp, cập nhật ngầm vào bảng tin và báo nhẹ
          showToast(`ℹ️ Đã ghi nhận thông báo thường từ ${author.name} vào hệ thống.`);
          notifyHubUpdate(false);
        } else {
          // P3: REFERENCE ONLY
          console.log("[P3 Reference Document Stored]", doc);
        }

        // Trace pipeline updates
        updatePipelineTrace({
          status: `${priority} · ${doc.classification.type}`,
          tone: priority === "P0" ? "rejected" : (priority === "P1" ? "found" : "review"),
          signal: `AI [${doc.system.topic_key || "generic"}]: "${doc.content.title}"`,
          ruleGate: `PASS (${author.role} + #${channelId})`,
          importance: `${doc.classification.importance} · ${priority}`,
          targetData: "data/events.json (Doc Schema)",
          action: priority === "P0" || priority === "P1" ? "Bắn thẻ Alert + Cập nhật Bảng tin" : "Lưu Store & Cập nhật Bảng tin tuần",
          step: 4
        });

        return data;
      }
    }
  } catch (err) {
    console.warn("Backend offline, running standalone fallback.", err);
    runLocalFallbackProcessing(channelId, author, text, msgId);
  }
}

// Giải pháp 1: Cơ chế "Xóa bản cũ & Bắn bản mới nhất xuống đáy" (Chuẩn Discord Bot)
function repostWeeklyDigestAtBottom() {
  const hubChannels = ["deadline-hub", "deadline-hub-bulletin"];
  hubChannels.forEach(ch => {
    if (!channelMessages[ch]) return;
    // 1. Xóa bản Bảng tin cũ bị kẹt ở trên
    channelMessages[ch] = channelMessages[ch].filter(m => m.type !== "weekly_digest");
    // 2. Tái tạo Bảng tin mới toanh và đẩy xuống vị trí cuối cùng
    channelMessages[ch].push({
      id: `msg_hub_digest_${Date.now()}`,
      author: {
        name: "Deadline Bot",
        role: "APP",
        avatar: "D",
        type: "bot"
      },
      timestamp: `${new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })} · Hôm nay`,
      type: "weekly_digest"
    });
  });
}

function notifyHubUpdate(reRenderNow = true) {
  // Luôn dời Bảng tin 7 ngày xuống đáy cùng sau khi nhận các thẻ thông báo khẩn
  repostWeeklyDigestAtBottom();

  if (activeChannel === "deadline-hub") {
    if (reRenderNow) {
      renderChannelFeed("deadline-hub");
      scrollFeedToLatest("smooth");
    }
  } else {
    unseenUpdates++;
    updateDeadlineHubBadge(unseenUpdates);
  }
}

// Fallback logic when backend is not responding
function runLocalFallbackProcessing(channelId, author, text, msgId) {
  const lowerText = text.toLowerCase();
  const { meetLink, formLink } = extractLinksFromText(text);
  const parsedTime = parseVietnameseDateTime(text);
  const isMeeting = lowerText.includes("họp") || lowerText.includes("meeting");
  const isUrgent = lowerText.includes("khẩn cấp") || lowerText.includes("gia hạn") || lowerText.includes("thêm");

  if (isMeeting) {
    const meetTimeMatch = parsedTime ? parsedTime.match(/\d{1,2}:\d{2}/) : null;
    if (!meetTimeMatch) {
      showToast(`ℹ️ Đã ghi nhận thông báo họp từ ${author.name} (Chưa có giờ họp cụ thể, không lập lịch hẹn).`);
      return;
    }
    const alertId = `meeting_${Date.now()}`;
    const meetDate = (parsedTime && parsedTime.includes("18/09")) ? "2026-09-18" : ((parsedTime && parsedTime.includes("19/09")) ? "2026-09-19" : "2026-09-17");
    const meetTime = meetTimeMatch[0];
    const meetTitle = extractEventTitle(text, true);

    const existingMeet = deadlines.find(d => (d.type === "MEETING" && (d.due_date === meetDate || d.date === meetDate)) || d.title === meetTitle);
    if (existingMeet) {
      existingMeet.title = meetTitle;
      existingMeet.due_time = meetTime;
      existingMeet.time = `${meetTime} (${meetDate})`;
      existingMeet.iso_deadline = `${meetDate}T${meetTime}:00+07:00`;
      if (meetLink) existingMeet.meetLink = meetLink;
      if (msgId) existingMeet.source_message_id = msgId;
    } else {
      deadlines.unshift({
        id: alertId,
        assignment_code: alertId,
        title: meetTitle,
        type: "MEETING",
        due_date: meetDate,
        due_time: meetTime,
        time: `${meetTime} (${meetDate})`,
        iso_deadline: `${meetDate}T${meetTime}:00+07:00`,
        meetLink: meetLink || "https://meet.google.com/abc-defg-hij",
        format: "Google Meet trực tuyến",
        source_channel: `#${channelId}`,
        source: `#${channelId}`,
        sourceLabel: `${author.name} (${author.role})`,
        source_message_id: msgId,
        status: "ACTIVE",
        is_important: true,
        confidence: 95,
        quote: text,
        author_name: author.name,
        author_role: author.role
      });
    }

    const meetingMsg = {
      id: alertId,
      channel: "deadline-hub",
      author: { name: "Deadline Bot", role: "APP", avatar: "D", type: "bot" },
      type: "urgent_alert",
      alertType: "meeting",
      alertTitle: "🤝 LỊCH HỌP MỚI / THAY ĐỔI ĐỘT XUẤT",
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
    channelMessages["deadline-hub-bulletin"]?.push(meetingMsg);
    channelMessages["deadline-hub"]?.push(meetingMsg);
    persistMessageToBackend("deadline-hub", meetingMsg);
    showToast("🤝 [Offline Mode] Đã gửi THẺ LỊCH HỌP sang #deadline-hub!");
    notifyHubUpdate();
  } else if (isUrgent) {
    const alertId = `alert_${Date.now()}`;
    const dlDate = parsedTime.includes("18/09") ? "2026-09-18" : (parsedTime.includes("19/09") ? "2026-09-19" : "2026-09-17");
    const dlTimeMatch = parsedTime.match(/\d{1,2}:\d{2}/);
    const dlTime = dlTimeMatch ? dlTimeMatch[0] : "02:00";
    const lab2 = deadlines.find(d => d.assignment_code === "lab-2" || d.id === "lab-2" || (d.title && d.title.toLowerCase().includes("lab 2")));
    if (lab2 && (text.toLowerCase().includes("lab 2") || text.toLowerCase().includes("lab2"))) {
      lab2.due_date = dlDate;
      lab2.due_time = dlTime;
      lab2.time = `${dlTime} (${dlDate})`;
      lab2.iso_deadline = `${dlDate}T${dlTime}:00+07:00`;
      lab2.is_extension = true;
      lab2.quote = text;
      if (formLink) lab2.submission_link = formLink;
      if (msgId) lab2.source_message_id = msgId;
    } else {
      deadlines.unshift({
        id: alertId,
        assignment_code: alertId,
        title: extractEventTitle(text, false),
        type: "DEADLINE",
        due_date: dlDate,
        due_time: dlTime,
        time: `${dlTime} (${dlDate})`,
        iso_deadline: `${dlDate}T${dlTime}:00+07:00`,
        submission_link: formLink || "https://forms.gle/lab2-submit-k4",
        format: "File notebook .ipynb hoặc link form",
        source_channel: `#${channelId}`,
        source: `#${channelId}`,
        sourceLabel: `${author.name} (${author.role})`,
        source_message_id: msgId,
        status: "ACTIVE",
        is_important: true,
        is_extension: true,
        confidence: 95,
        quote: text,
        author_name: author.name,
        author_role: author.role
      });
    }

    const urgentMsg = {
      id: alertId,
      channel: "deadline-hub",
      author: { name: "Deadline Bot", role: "APP", avatar: "D", type: "bot" },
      type: "urgent_alert",
      alertType: "deadline",
      alertTitle: "🚨 THÔNG BÁO KHẨN CẤP / GIA HẠN",
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
    channelMessages["deadline-hub-bulletin"]?.push(urgentMsg);
    channelMessages["deadline-hub"]?.push(urgentMsg);
    persistMessageToBackend("deadline-hub", urgentMsg);
    showToast("🚨 [Offline Mode] Đã gửi THÔNG BÁO KHẨN sang #deadline-hub!");
    notifyHubUpdate();
  }
}

function processNewMessage(channelId, authorKey, text) {
  const author = personas[authorKey] || personas.student_lananh;
  const isAuthorityRole = ["teacher", "ta", "admin"].includes(author.type);
  const msgId = `msg_${Date.now()}`;
  const msgObj = {
    id: msgId,
    channel: channelId,
    author: { name: author.name, role: author.role, avatar: author.avatar, type: author.type },
    content: text,
    timestamp: now(),
    type: "chat"
  };

  // Case 1: In #deadline-hub
  if (channelId === "deadline-hub") {
    if (!isAuthorityRole) {
      showToast("🔒 Bảng tin chỉ đọc! Học viên không được gửi tin tại đây.");
      return;
    }
    if (!channelMessages["deadline-hub-bulletin"]) channelMessages["deadline-hub-bulletin"] = [];
    channelMessages["deadline-hub-bulletin"].push(msgObj);
    if (!channelMessages["deadline-hub"]) channelMessages["deadline-hub"] = [];
    channelMessages["deadline-hub"].push(msgObj);
    persistMessageToBackend("deadline-hub", msgObj);
    renderChannelFeed("deadline-hub");
  } else {
    // Other channels: push message to feed
    if (!channelMessages[channelId]) channelMessages[channelId] = [];
    channelMessages[channelId].push(msgObj);
    persistMessageToBackend(channelId, msgObj);
    if (activeChannel === channelId) {
      renderChannelFeed(channelId);
    }
  }

  // Student discussion in channels: Silent Observer
  if (!isAuthorityRole) {
    showToast(`💬 Đã gửi tin vào #${channelId}. Kênh thảo luận học viên, Bot không tạo lịch/deadline từ học viên.`);
    return;
  }

  // Authority message: Let Backend AI extract semantics & route priority P0-P3 dynamically
  callBackendDiscordEvent(channelId, author, text, msgId);
}

// ============================================================================
// PIPELINE AUDIT LOG VIEWER (VISUAL + TEXT MODES)
// ============================================================================

let rawLogsCache = "";
let currentLogStageFilter = "ALL";
let logDisplayMode = "cards"; // "cards" hoặc "raw"

const STAGE_META = {
  "DISCORD_EVENT": { name: "Sự Kiện Đến", icon: "📩", color: "#5865f2", bg: "rgba(88,101,242,0.15)" },
  "CANDIDATE_GATE": { name: "Bộ Lọc Gate", icon: "🚪", color: "#10b981", bg: "rgba(16,185,129,0.15)" },
  "AI_EXTRACTOR": { name: "AI Gemini", icon: "🤖", color: "#a855f7", bg: "rgba(168,85,247,0.15)" },
  "VALIDATOR": { name: "Xác Thực & Xung Đột", icon: "⚖️", color: "#f59e0b", bg: "rgba(245,158,11,0.15)" },
  "JSON_STORE": { name: "Lưu Kho Dữ Liệu", icon: "💾", color: "#06b6d4", bg: "rgba(6,182,212,0.15)" },
  "DISCORD_FORMAT": { name: "Định Dạng Discord", icon: "📢", color: "#ec4899", bg: "rgba(236,72,153,0.15)" }
};

async function fetchPipelineLogs() {
  try {
    const res = await fetch(`${BACKEND_API_URL}/logs?limit=200`);
    if (res.ok) {
      const data = await res.json();
      if (data.lines && Array.isArray(data.lines)) {
        rawLogsCache = data.lines.join("\n");
        return rawLogsCache;
      }
    }
  } catch (err) {
    console.warn("Could not fetch logs from backend:", err);
  }
  rawLogsCache = `[${new Date().toISOString()}] [CLIENT_OFFLINE] [DISCORD_EVENT] Không thể kết nối tới backend để đọc logs/pipeline.log. Hãy đảm bảo FastAPI backend đang chạy tại port 8000.`;
  return rawLogsCache;
}

function parseLogLine(line) {
  if (!line || line.startsWith("#")) return null;
  // Format: [YYYY-MM-DD HH:MM:SS] [LEVEL] [STAGE] message | key=val · key=val
  const match = line.match(/^\[(.*?)\]\s*\[(.*?)\]\s*\[(.*?)\]\s*(.*?)(?:\s*\|\s*(.*))?$/);
  if (!match) return { raw: line };

  const [, timestamp, level, stage, message, metaStr] = match;
  const metaPairs = {};
  if (metaStr) {
    metaStr.split("·").forEach(pair => {
      const parts = pair.split("=");
      if (parts.length >= 2) {
        const key = parts[0].trim();
        const val = parts.slice(1).join("=").trim();
        metaPairs[key] = val;
      }
    });
  }

  return {
    timestamp: timestamp.slice(11), // chỉ lấy HH:MM:SS cho gọn
    fullTimestamp: timestamp,
    level: level.trim(),
    stage: stage.trim(),
    message: message.trim(),
    meta: metaPairs
  };
}

function renderParsedLogCards() {
  const container = document.querySelector("#logCardsContainer");
  const codeEl = document.querySelector("#logViewerCode");
  if (!container) return;

  if (logDisplayMode === "raw") {
    container.style.display = "none";
    if (codeEl) {
      codeEl.style.display = "block";
      codeEl.textContent = rawLogsCache;
    }
    return;
  }

  container.style.display = "flex";
  if (codeEl) codeEl.style.display = "none";

  const lines = rawLogsCache.split("\n");
  const parsedItems = lines
    .map(parseLogLine)
    .filter(item => item !== null);

  const filtered = parsedItems.filter(item => {
    if (currentLogStageFilter === "ALL") return true;
    return item.stage === currentLogStageFilter;
  });

  if (filtered.length === 0) {
    container.innerHTML = `<div class="log-empty-state">Không có nhật ký nào thuộc công đoạn [${escapeHtml(currentLogStageFilter)}].</div>`;
    return;
  }

  // Render cards (đảo chiều để tin mới nhất nằm ở dưới hoặc trên, ở đây render xuôi dòng thời gian)
  container.innerHTML = filtered.map(item => {
    if (item.raw) {
      return `<div class="log-card-raw">${escapeHtml(item.raw)}</div>`;
    }

    const stageMeta = STAGE_META[item.stage] || { name: item.stage, icon: "🔹", color: "#94a3b8", bg: "rgba(148,163,184,0.15)" };
    const isWarn = item.level === "WARN" || (item.message && (item.message.includes("xung đột") || item.message.includes("Từ chối")));
    const borderLeftColor = isWarn ? "#ef4444" : stageMeta.color;

    let metaChipsHtml = "";
    if (item.meta && Object.keys(item.meta).length > 0) {
      metaChipsHtml = `<div class="log-meta-chips">` +
        Object.entries(item.meta).map(([k, v]) => {
          let label = k;
          if (k === "Author") label = "Tác giả";
          else if (k === "Channel") label = "Kênh";
          else if (k === "Reason") label = "Lý do";
          else if (k === "Confidence") label = "Độ tin cậy";
          else if (k === "Time") label = "Mốc giờ";
          return `<span class="log-meta-chip"><strong>${escapeHtml(label)}:</strong> ${escapeHtml(v)}</span>`;
        }).join("") +
        `</div>`;
    }

    return `
      <div class="log-card-item ${isWarn ? 'log-card-warn' : ''}" style="border-left-color: ${borderLeftColor};">
        <div class="log-card-header">
          <div class="log-stage-tag" style="color:${stageMeta.color};background:${stageMeta.bg};">
            <span>${stageMeta.icon}</span>
            <strong>${escapeHtml(stageMeta.name)}</strong>
          </div>
          <span class="log-time-badge">${escapeHtml(item.timestamp)}</span>
        </div>
        <div class="log-card-body">
          <p class="log-card-msg">${escapeHtml(item.message)}</p>
          ${metaChipsHtml}
        </div>
      </div>
    `;
  }).join("");

  // Tự động cuộn xuống dưới cùng để thấy hành động mới nhất
  container.scrollTop = container.scrollHeight;
}

async function openLogViewer() {
  openDialog(document.querySelector("#logDialog"));
  const container = document.querySelector("#logCardsContainer");
  if (container) container.innerHTML = `<div class="log-empty-state">Đang đồng bộ nhật ký từ server...</div>`;
  await fetchPipelineLogs();
  renderParsedLogCards();
}

async function loadSourceChannelMessages(channelId) {
  try {
    const response = await fetch(
      `${BACKEND_API_URL}/channels/${encodeURIComponent(channelId)}/messages`,
      { cache: "no-store" }
    );
    if (!response.ok) return;
    const storedMessages = await response.json();
    channelMessages[channelId] = mergeChannelMessageLists(
      channelMessages[channelId],
      storedMessages
    );
  } catch (error) {
    console.warn(`[Jump] Không thể tải kênh nguồn #${channelId}:`, error);
  }
}

function findRenderedSourceMessage(targetMsgId, contextKw = "") {
  const allMessages = Array.from(
    messageFeed.querySelectorAll(".discord-message[data-message-id]")
  );

  if (targetMsgId) {
    const rawId = String(targetMsgId).trim();
    const aliases = new Set([
      rawId,
      rawId.startsWith("msg_") ? rawId.slice(4) : `msg_${rawId}`
    ]);
    const exactMatch = allMessages.find((message) => aliases.has(message.dataset.messageId));
    if (exactMatch) return exactMatch;
  }

  const normalizedKeyword = String(contextKw).trim().toLocaleLowerCase("vi-VN");
  if (!normalizedKeyword) return null;

  const keywordParts = normalizedKeyword
    .split(/[:·\-()]/)
    .map((part) => part.trim())
    .filter((part) => part.length >= 4);

  return allMessages.find((message) => {
    const text = message.textContent.toLocaleLowerCase("vi-VN");
    return text.includes(normalizedKeyword) || keywordParts.some((part) => text.includes(part));
  }) || null;
}

function waitForFeedLayout() {
  return new Promise((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(resolve));
  });
}

function resolveSourceChannel(rawChannel, targetMsgId) {
  const requestedChannel = extractChannelName(rawChannel);
  if (Object.prototype.hasOwnProperty.call(channelMessages, requestedChannel)) {
    return requestedChannel;
  }

  const matchingEvent = events.find((eventItem) => (
    String(eventItem?.source?.message_id || "") === String(targetMsgId || "")
  ));
  if (!matchingEvent?.source) return requestedChannel;

  const candidates = [
    matchingEvent.source.channel_name,
    matchingEvent.source.channel_id
  ].map(extractChannelName);

  return candidates.find((candidate) => (
    Object.prototype.hasOwnProperty.call(channelMessages, candidate)
  )) || candidates[0] || requestedChannel;
}

async function jumpToSourceMessage(rawChannel, rawMsgId, contextKw = "") {
  const targetMsgId = (rawMsgId || "").trim();
  const targetChannel = resolveSourceChannel(rawChannel, targetMsgId);

  closeDialog(detailDialog);
  closeDialog(dataDialog);
  closeDialog(adminDialog);
  closeDialog(correctionDialog);

  await loadSourceChannelMessages(targetChannel);

  if (!switchChannel(targetChannel)) {
    showToast(`⚠️ Không tìm thấy kênh nguồn #${targetChannel}.`);
    return false;
  }

  await waitForFeedLayout();
  const sourceMessage = findRenderedSourceMessage(targetMsgId, contextKw);

  if (!sourceMessage) {
    showToast(`⚠️ Đã mở #${targetChannel}, nhưng tin nhắn gốc không còn trong lịch sử.`);
    return false;
  }

  const feedRect = messageFeed.getBoundingClientRect();
  const messageRect = sourceMessage.getBoundingClientRect();
  const targetScrollTop = messageFeed.scrollTop
    + (messageRect.top - feedRect.top)
    - (feedRect.height / 2)
    + (messageRect.height / 2);
  messageFeed.scrollTo({ top: Math.max(0, targetScrollTop), behavior: "smooth" });

  sourceMessage.classList.remove("highlight-flash");
  void sourceMessage.offsetWidth;
  sourceMessage.classList.add("highlight-flash");
  setTimeout(() => sourceMessage.classList.remove("highlight-flash"), 2600);
  showToast(`📍 Đã nhảy tới đúng tin nhắn gốc trong #${targetChannel}!`);
  return true;
}

function openDeadlineDetail(id) {
  const item = deadlines.find((d) => d.id === id) || deadlines.find(d => getCanonicalEventKey(d) === id);
  if (!item) return;
  const dStr = item.due_date || item.date || "";
  const tStr = item.due_time || item.time || "";

  const chName = extractChannelName(item.source_channel || item.source || "announcements");
  let srcMsgId = item.source_message_id || "";
  if (!srcMsgId) {
    if (item.title?.toLowerCase().includes("lab 2")) srcMsgId = "msg_ann_01";
    else if (item.title?.toLowerCase().includes("quiz")) srcMsgId = "msg_quiz_01";
    else if (item.title?.toLowerCase().includes("hackathon")) srcMsgId = "msg_hack_01";
  }

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
        <p style="margin:3px 0;color:var(--muted);font-size:11px;">Kênh thông báo gốc: <b>#${escapeHtml(chName)}</b></p>
        ${item.meetLink ? `<p style="margin:4px 0;"><a href="${item.meetLink}" target="_blank" style="color:#2563eb;font-weight:700;">📹 Google Meet: ${escapeHtml(item.meetLink)}</a></p>` : ""}
        ${item.submission_link && !item.meetLink ? `<p style="margin:4px 0;"><a href="${item.submission_link}" target="_blank" style="color:var(--purple);font-weight:700;">🔗 Form nộp: ${escapeHtml(item.submission_link)}</a></p>` : ""}
      </div>
    </div>
    <div class="evidence-box">
      <strong>Vì sao bot đưa mục này lên lịch (HAX G2 Grounding)?</strong>
      <blockquote>“${escapeHtml(item.quote || "Nguồn chính thức đã được xác thực.")}”</blockquote>
      <div class="evidence-meta">
        <span>Người đăng: <b>${escapeHtml(item.author_name || "GV/TA")}</b> (${escapeHtml(item.author_role || "Giảng viên")})</span>
        <span>Kênh: <b>#${escapeHtml(chName)}</b></span>
      </div>
    </div>
    <div class="detail-actions">
      <button class="primary-button channel-jump-btn" type="button" data-jump-channel="${escapeHtml(chName)}" data-jump-msg="${escapeHtml(srcMsgId)}" data-jump-kw="${escapeHtml(item.title)}" style="background:var(--blurple);color:#fff;font-weight:700;">🚀 Nhảy tới tin nhắn gốc #${escapeHtml(chName)} ↗</button>
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
    const targetMsgId = jumpBtn.dataset.jumpMsg || "";
    const kw = jumpBtn.dataset.jumpKw || "";
    void jumpToSourceMessage(rawTarget, targetMsgId, kw);
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
      processNewMessage("announcements", "teacher_hoang", "@everyone Chào các bạn, ngày mai chúng ta có lịch họp online lúc 20:00 để chốt tiến độ dự án AI nhé. Link Google Meet: https://meet.google.com/abc-defg-hij");
      window.setTimeout(() => {
        switchChannel("deadline-hub");
      }, 500);
    } else if (quickType === "urgent-extension") {
      personaSelect.value = "teacher_hoang";
      personaSelect.dispatchEvent(new Event("change"));
      switchChannel("announcements");
      processNewMessage("announcements", "teacher_hoang", "Thông báo khẩn cấp lớp 3A: Do sự cố quyền truy cập form nộp bài, Giảng viên gia hạn khẩn cấp thêm 2 tiếng cho Lab 2 đến 02:00 sáng mai (18/09/2026)! Form nộp: https://forms.gle/lab2-submit-k4");
      window.setTimeout(() => {
        switchChannel("deadline-hub");
      }, 500);
    } else if (quickType === "student-lab-chat") {
      personaSelect.value = "student_lananh";
      personaSelect.dispatchEvent(new Event("change"));
      switchChannel("lab-assignments");
      processNewMessage("lab-assignments", "student_lananh", "Mọi người cho mình hỏi câu 3 bài Lab 2 chạy Few-shot có cần xuất file log riêng không?");
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
  updateComposerLockState();
  showToast(`Đã chuyển vai trò sang: ${p.label}`);
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
  persistDeadlineToBackend(newDl);
  closeDialog(adminDialog);
  showToast(`Admin đã thêm “${data.get("title")}” vào danh sách theo dõi.`);
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

document.querySelector("#resetDemoDataBtn")?.addEventListener("click", async () => {
  const confirmed = confirm("🧹 Bạn có chắc muốn DỌN SẠCH toàn bộ tin nhắn thử nghiệm và khôi phục dữ liệu Demo chuẩn ban đầu?");
  if (!confirmed) return;

  showToast("⏳ Đang dọn rác và khôi phục dữ liệu chuẩn...");
  try {
    const res = await fetch(`${BACKEND_API_URL}/admin/reset-demo-data`, { method: "POST" });
    if (res.ok) {
      const data = await res.json();
      console.log("[DEMO DATA RESET SUCCESS]", data);
    }
  } catch (err) {
    console.warn("Backend reset endpoint offline, resetting local state.", err);
  }

  // Khôi phục bộ nhớ cục bộ về chuẩn ban đầu
  deadlines = JSON.parse(JSON.stringify(initialDeadlines));
  channelMessages = JSON.parse(JSON.stringify(initialChannelMessages));
  events = [
    {
      "_id": "evt_lab-2",
      "source": { "guild_id": "123456789012345678", "channel_id": "chan_announcements", "channel_name": "announcements", "message_id": "msg_ann_01", "author": { "id": "1029384756", "name": "Thầy Hoàng" }, "created_at": "2026-09-15T14:00:00+07:00" },
      "classification": { "type": "DEADLINE", "importance": "HIGH", "is_relevant": true, "confidence": 0.98 },
      "content": { "title": "Lab 2 · Prompt Engineering & LLM Basics", "summary": "Gia hạn Lab 2 đến 23:59 thứ Năm, 17/09. Nộp notebook hoặc link GitHub public." },
      "schedule": { "start_time": null, "end_time": null, "deadline": "2026-09-17T23:59:00+07:00", "time_precision": "DEADLINE_ONLY" },
      "target": { "audience": "UNKNOWN", "course": "AI Batch 04" },
      "system": { "status": "PROCESSED", "created_at": "2026-09-15T14:00:00+07:00", "updated_at": "2026-09-15T14:00:00+07:00", "conflict_detected": false, "conflict_note": null }
    },
    {
      "_id": "evt_quiz-1",
      "source": { "guild_id": "123456789012345678", "channel_id": "chan_quiz_updates", "channel_name": "quiz-updates", "message_id": "msg_quiz_01", "author": { "id": "1029384756", "name": "Cô Minh Anh" }, "created_at": "2026-09-14T09:00:00+07:00" },
      "classification": { "type": "DEADLINE", "importance": "HIGH", "is_relevant": true, "confidence": 0.97 },
      "content": { "title": "Quiz 1 · Transformer & Tokenization", "summary": "Quiz 1 đóng lúc 21:00 thứ Bảy, 19/09. Thời gian làm bài 30 phút." },
      "schedule": { "start_time": null, "end_time": null, "deadline": "2026-09-19T21:00:00+07:00", "time_precision": "DEADLINE_ONLY" },
      "target": { "audience": "UNKNOWN", "course": "AI Batch 04" },
      "system": { "status": "PROCESSED", "created_at": "2026-09-14T09:00:00+07:00", "updated_at": "2026-09-14T09:00:00+07:00", "conflict_detected": false, "conflict_note": null }
    },
    {
      "_id": "evt_hackathon-cp2",
      "source": { "guild_id": "123456789012345678", "channel_id": "chan_hackathon", "channel_name": "hackathon", "message_id": "msg_hack_01", "author": { "id": "1029384756", "name": "BTC Hackathon" }, "created_at": "2026-09-16T18:00:00+07:00" },
      "classification": { "type": "DEADLINE", "importance": "HIGH", "is_relevant": true, "confidence": 0.99 },
      "content": { "title": "Mini Hackathon · Checkpoint 2 (Working Mock)", "summary": "Nộp link repo public, prototype và phần cập nhật spec trước 21:00 ngày 16/09." },
      "schedule": { "start_time": null, "end_time": null, "deadline": "2026-09-16T21:00:00+07:00", "time_precision": "DEADLINE_ONLY" },
      "target": { "audience": "UNKNOWN", "course": "AI Batch 04" },
      "system": { "status": "PROCESSED", "created_at": "2026-09-16T18:00:00+07:00", "updated_at": "2026-09-16T18:00:00+07:00", "conflict_detected": false, "conflict_note": null }
    }
  ];

  // Cập nhật lại giao diện
  repostWeeklyDigestAtBottom();
  renderChannelFeed(activeChannel);
  unseenUpdates = 0;
  updateDeadlineHubBadge(0);
  showToast("✨ Đã dọn sạch toàn bộ tin nhắn test và khôi phục dữ liệu Demo chuẩn!");
});

document.querySelector("#refreshLogBtn")?.addEventListener("click", async () => {
  const container = document.querySelector("#logCardsContainer");
  if (container) container.innerHTML = `<div class="log-empty-state">Đang làm mới logs...</div>`;
  await fetchPipelineLogs();
  renderParsedLogCards();
  showToast("🔄 Đã cập nhật nhật ký mới nhất!");
});

document.querySelector("#toggleLogModeBtn")?.addEventListener("click", () => {
  const btn = document.querySelector("#toggleLogModeBtn");
  if (logDisplayMode === "cards") {
    logDisplayMode = "raw";
    if (btn) btn.textContent = "🎴 Xem Dạng Thẻ";
  } else {
    logDisplayMode = "cards";
    if (btn) btn.textContent = "📄 Xem Raw Text";
  }
  renderParsedLogCards();
});

document.querySelector("#logStageFilters")?.addEventListener("click", (event) => {
  const chip = event.target.closest(".log-filter-chip");
  if (!chip) return;
  document.querySelectorAll(".log-filter-chip").forEach(c => c.classList.remove("active"));
  chip.classList.add("active");
  currentLogStageFilter = chip.dataset.stage || "ALL";
  renderParsedLogCards();
});

document.querySelector("#copyLogBtn")?.addEventListener("click", () => {
  navigator.clipboard.writeText(rawLogsCache || "").then(() => {
    showToast("📋 Đã sao chép toàn bộ nhật ký vào Clipboard!");
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

// ============================================================================
// AUTO-REFRESH THÔNG BÁO CHUNG (DIGEST) — 1 PHÚT / LẦN (TEST MODE) + SMART POLLING
// ============================================================================
let unseenUpdates = 0;
let lastEventsHash = "";

function updateDeadlineHubBadge(count) {
  const hubBtn = document.querySelector('[data-channel="deadline-hub"]');
  if (!hubBtn) return;
  let badge = hubBtn.querySelector('.unread-badge');
  if (count <= 0) {
    if (badge) badge.remove();
    return;
  }
  if (!badge) {
    badge = document.createElement('span');
    badge.className = 'unread-badge';
    badge.style.cssText = "background:#f23f43;color:#fff;font-size:11px;font-weight:700;padding:1px 6px;border-radius:10px;margin-left:auto;display:inline-block;";
    hubBtn.appendChild(badge);
  }
  badge.textContent = count > 9 ? '9+' : count;
}

const DIGEST_REFRESH_INTERVAL_MS = 60 * 1000; // 1 phút / lần (Chế độ kiểm thử - Test Mode)
let digestRefreshTimer = null;

async function fetchAndSyncDigestFromBackend() {
  try {
    const [eventsRes, digestRes] = await Promise.allSettled([
      fetch(`${BACKEND_API_URL}/events?limit=50`),
      fetch(`${BACKEND_API_URL}/schedule/digest`)
    ]);

    let hasChanges = false;
    if (eventsRes.status === "fulfilled" && eventsRes.value.ok) {
      const backendEvents = await eventsRes.value.json();
      const currentHash = JSON.stringify(backendEvents.map(e => e._id + "_" + (e.system?.updated_at || "")).sort());
      if (lastEventsHash && currentHash !== lastEventsHash) {
        hasChanges = true;
      }
      lastEventsHash = currentHash;

    // Đồng bộ vào mảng deadlines frontend nếu có bài tập mới hoặc cập nhật gia hạn / lịch họp
      for (const evt of backendEvents) {
        if (evt.system?.status === "SUPERSEDED" || evt.system?.status === "CANCELLED") continue;
        const topic = evt.system?.topic_key || evt._id;
        const iso = evt.schedule?.deadline || evt.schedule?.start_time;
        const isMeeting = evt.classification?.type === "MEETING";
        const isDeadline = evt.classification?.type === "DEADLINE";
        if (topic && iso && (isDeadline || isMeeting)) {
          const existing = deadlines.find(d => d.assignment_code === topic || d.id === topic || (evt.content?.title && d.title === evt.content.title));
          if (!existing) {
            deadlines.push({
              id: topic,
              assignment_code: topic,
              title: evt.content?.title || (isMeeting ? "Lịch họp mới" : "Deadline mới"),
              type: isMeeting ? "MEETING" : "DEADLINE",
              due_date: iso.slice(0, 10),
              due_time: iso.slice(11, 16),
              time: `${iso.slice(11, 16)} (${iso.slice(0, 10)})`,
              iso_deadline: iso,
              submission_link: evt.content?.meet_link || "https://forms.gle/vlearn-submit",
              meetLink: evt.content?.meet_link,
              format: isMeeting ? "Google Meet trực tuyến" : "Nộp bài trực tuyến",
              source_channel: `#${evt.source?.channel_name || "announcements"}`,
              source: `#${evt.source?.channel_name || "announcements"}`,
              sourceLabel: `${evt.source?.author?.name || "Giảng viên"}`,
              source_message_id: evt.source?.message_id || "",
              status: "ACTIVE",
              is_important: evt.classification?.importance === "HIGH",
              confidence: Math.round((evt.classification?.confidence || 0.95) * 100),
              quote: evt.content?.summary || "",
              author_name: evt.source?.author?.name || "Giảng viên",
              author_role: "Giảng viên"
            });
            hasChanges = true;
          } else if (existing.iso_deadline !== iso) {
            existing.iso_deadline = iso;
            existing.due_date = iso.slice(0, 10);
            existing.due_time = iso.slice(11, 16);
            existing.time = `${iso.slice(11, 16)} (${iso.slice(0, 10)})`;
            existing.quote = evt.content?.summary || existing.quote;
            if (isMeeting) {
              if (evt.content?.meet_link) existing.meetLink = evt.content?.meet_link;
            } else {
              existing.is_extension = true;
            }
            hasChanges = true;
          }
        }
      }
    }
    return hasChanges;
  } catch (e) {
    console.log("[SmartRefresh] Backend offline, skipping sync.");
    return false;
  }
}

async function hydrateAppDataFromBackend() {
  try {
    const isOnline = await checkBackendStatus();
    if (!isOnline) {
      console.log("[Hydrate] Backend offline, sử dụng dữ liệu mặc định.");
      repostWeeklyDigestAtBottom();
      renderChannelFeed(activeChannel);
      return;
    }

    const [channelsRes, deadlinesRes, eventsRes] = await Promise.allSettled([
      fetch(`${BACKEND_API_URL}/channels`),
      fetch(`${BACKEND_API_URL}/deadlines`),
      fetch(`${BACKEND_API_URL}/events?limit=100`)
    ]);

    let hasData = false;

    // 1. Đồng bộ tin nhắn từng channel từ file data/channels/*.json
    if (channelsRes.status === "fulfilled" && channelsRes.value.ok) {
      const allChannels = await channelsRes.value.json();
      if (allChannels && typeof allChannels === "object") {
        Object.keys(allChannels).forEach(ch => {
          if (Array.isArray(allChannels[ch]) && allChannels[ch].length > 0) {
            const normalizedChannel = extractChannelName(ch);
            channelMessages[normalizedChannel] = mergeChannelMessageLists(
              channelMessages[normalizedChannel],
              allChannels[ch]
            );
            hasData = true;
          }
        });
        if (channelMessages["deadline-hub"]) {
          channelMessages["deadline-hub-bulletin"] = channelMessages["deadline-hub"];
        }
      }
    }

    // 2. Đồng bộ danh sách deadline từ data/deadlines.json
    if (deadlinesRes.status === "fulfilled" && deadlinesRes.value.ok) {
      const storedDeadlines = await deadlinesRes.value.json();
      if (Array.isArray(storedDeadlines) && storedDeadlines.length > 0) {
        deadlines = storedDeadlines;
        hasData = true;
      }
    }

    // 3. Đồng bộ danh sách events từ data/events.json
    if (eventsRes.status === "fulfilled" && eventsRes.value.ok) {
      const storedEvents = await eventsRes.value.json();
      if (Array.isArray(storedEvents) && storedEvents.length > 0) {
        events = storedEvents;
      }
    }

    // 4. Luôn đảm bảo Bảng tin tuần ở đáy và cập nhật giao diện
    repostWeeklyDigestAtBottom();
    renderChannelFeed(activeChannel);
    if (hasData) {
      console.log("[Hydrate] Đã tải toàn bộ tin nhắn & hạn chót từ database backend thành công!");
    }
  } catch (err) {
    console.warn("[Hydrate] Lỗi đồng bộ backend:", err);
    repostWeeklyDigestAtBottom();
    renderChannelFeed(activeChannel);
  }
}

function startDigestAutoRefresh() {
  if (digestRefreshTimer) clearInterval(digestRefreshTimer);

  digestRefreshTimer = setInterval(async () => {
    console.log(`[DigestAutoRefresh] Đồng bộ định kỳ Bảng Tin — ${new Date().toLocaleTimeString("vi-VN")}`);
    const hasChanges = await fetchAndSyncDigestFromBackend();

    if (hasChanges) {
      repostWeeklyDigestAtBottom();
      if (activeChannel === "deadline-hub") {
        renderChannelFeed("deadline-hub");
        scrollFeedToLatest("smooth");
        showToast("🔄 Bảng tin 7 ngày đã tự động cập nhật dữ liệu mới xuống đáy kênh!");
      } else {
        unseenUpdates++;
        updateDeadlineHubBadge(unseenUpdates);
        showToast(`📢 Bảng tin tuần có thông báo mới (Đồng bộ định kỳ)!`);
      }
    } else {
      if (activeChannel === "deadline-hub") {
        renderChannelFeed("deadline-hub");
      }
    }
  }, DIGEST_REFRESH_INTERVAL_MS);

  console.log(`[DigestAutoRefresh] Đã bật đồng bộ định kỳ mỗi ${DIGEST_REFRESH_INTERVAL_MS / 1000} giây (Chế độ kiểm thử).`);
}

// Initial load: Render placeholder -> Hydrate from persistent backend -> start timers
switchChannel("deadline-hub");
updatePipelineTrace(pipelineScenarios.urgent);
hydrateAppDataFromBackend().then(() => {
  startDigestAutoRefresh();
});
