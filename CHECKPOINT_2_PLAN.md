# CHECKPOINT 2 — Deadline Hub + Calendar

## 1. Mục tiêu bàn giao

Tạo một **clickable web prototype mức Working Mock** của Deadline Bot: thành viên chạy `/deadline tong-hop` trong `#deadline-hub`, bot trả calendar ngay trong Discord message và dừng để admin xác nhận khi dữ liệu mơ hồ, không có nguồn hoặc bị báo sai.

## 2. Quyết định theo cost-of-error

Sai một deadline có thể khiến cả lớp nộp muộn, vì vậy giải pháp dùng **Augment + Conditional automation**:

- Bot có thể tự đọc, gộp bản trùng, sắp xếp và công bố khi đủ tên bài, ngày giờ và nguồn còn hiệu lực.
- Người học luôn mở lại được căn cứ từ card hoặc calendar.
- Dữ liệu mơ hồ/xung đột bị giữ khỏi lịch ở trạng thái `NEEDS REVIEW`.
- Dữ liệu không có nguồn bị loại ở trạng thái `NO GROUNDING`.
- Khi có báo sai, bot chỉ gắn cờ `HUMAN REVIEW`; TA quyết định bản sửa cuối cùng.

## 3. Kế hoạch thực hiện

| Bước | Đầu ra | Điều kiện hoàn thành |
|---|---|---|
| 1. Khóa lát cắt | PUBLISHED, NEEDS REVIEW, NO GROUNDING, HUMAN REVIEW | Mỗi trạng thái có điểm bắt đầu và kết thúc rõ |
| 2. Dựng Discord Bot UI | `codebase/index.html`, `style.css` | Có slash command, chat cuộn và calendar trong bot message |
| 3. Gắn tương tác | `codebase/app.js` | Chạy lệnh, chuyển tháng, mở nguồn, admin fallback và báo sai hoạt động |
| 4. Chuẩn hóa HAX/PAIR | G1, G2, G9, G10, G11 | Mỗi nguyên tắc trỏ tới một thành phần nhìn thấy/bấm được |
| 5. Đồng bộ đặc tả | `spec.md` §4 và §6 | Nêu rõ Working Mock, mock/thật, cost-of-error và bốn luồng |
| 6. Kiểm tra bàn giao | Checklist + kiểm tra cú pháp/link nội bộ | Mở được không cần cài đặt |

## 4. Ma trận bốn đường trải nghiệm

| Luồng | Đầu vào demo | Quyết định hệ thống | Điểm kết thúc |
|---|---|---|---|
| Happy path | Thông báo Lab 2 đủ tên bài, ngày giờ và nguồn | PUBLISHED · 98% | Card + sự kiện calendar + căn cứ mở được |
| Low-confidence | “Nộp project trước thứ Sáu” | NEEDS REVIEW · 46% | Không lên lịch; TA được yêu cầu xác nhận |
| Failure / no-grounding | “Nghe nói Capstone nộp Chủ nhật” | NO GROUNDING · 0% | Không tạo deadline; chờ nguồn chính thức |
| Correction | Thành viên bấm `Báo sai` trên deadline | HUMAN REVIEW | Card/sự kiện chuyển `Đang xác minh`; TA tiếp quản |

## 5. Kịch bản quay demo CP2 (45–60 giây)

- 0–8s: chỉ kênh `#deadline-hub`, bot và ba slash command.
- 8–17s: chạy **`/deadline tong-hop`**, mở một deadline từ calendar message và xem căn cứ.
- 17–32s: chạy `Happy path`, `Low-confidence`, `No grounding`; quan sát decision trace.
- 32–48s: chạy `Correction`, chọn “Sai ngày hoặc giờ”, gửi và chỉ trạng thái `Đang xác minh`.
- 48–55s: chốt bộ đếm `4/4` và nhấn mạnh TA có quyền quyết định cuối.

## 6. Nguồn khung thiết kế

- Microsoft HAX — Guidelines for Human-AI Interaction: <https://www.microsoft.com/en-us/haxtoolkit/ai-guidelines/>
- Google PAIR — People + AI Guidebook: <https://pair.withgoogle.com/guidebook-v2/chapters>
