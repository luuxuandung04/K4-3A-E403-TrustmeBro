# KỊCH BẢN QUAY VIDEO DEMO DỰ PHÒNG (BACKUP STAGE DEMO)
> **Dự án:** Discord Deadline & Logistics Guard (Track B1)  
> **Nhóm:** Trustmebro · Lớp 3A · Phòng E403 · VinUniversity  
> **Thời lượng chuẩn:** 3 phút (180 giây)  
> **Mục đích:** Sẵn sàng chiếu thay thế trên sân khấu nếu mạng chập chờn hoặc live demo gặp sự cố tại CP6.

---

## I. CHUẨN BỊ MÔI TRƯỜNG TRƯỚC KHI BẤM REC

1. **Giao diện Web:** Mở trình duyệt ở địa chỉ `http://localhost:8000` (hoặc mở `codebase/index.html`).
2. **Cửa sổ chia đôi (Split Screen):**
   - Nửa trái: Kênh `#announcements` hoặc `#lab-assignments` của Discord Web Client.
   - Nửa phải: Kênh `#deadline-hub` hiển thị thanh thông báo 7 ngày và danh sách deadline.
3. **Dọn rác dữ liệu:** Bấm nút **"Reset Demo Data"** trên góc phải topbar để đưa dữ liệu về trạng thái sạch ban đầu.
4. **Phần mềm quay màn hình:** OBS Studio hoặc Windows Game Bar (`Win + Alt + R`), độ phân giải 1080p, âm thanh micro rõ ràng.

---

## II. KỊCH BẢN PHÂN CẢNH CHI TIẾT (3 PHÚT)

### 🎬 CẢNH 1: MỞ ĐẦU & NỖI ĐAU THỰC TẾ (0:00 – 0:35 · 35 giây)
* **Góc quay:** Toàn màn hình trình chiếu Slide 1 & Slide 2 (`demo-slides.pdf`).
* **Hành động:** 
  - Chiếu Slide 1 giới thiệu nhóm Trustmebro, lớp 3A phòng E403.
  - Chuyển sang Slide 2 chỉ vào 3 con số khảo sát: 61.9% mất >5-15 phút tìm hạn nộp, 52.4% thất bại vì AI bịa đặt, 71.4% chịu hậu quả tiêu cực.
* **Lời thoại (Duy Khánh / Xuân Dũng):**
  > *"Xin chào thầy cô và các bạn! Nhóm Trustmebro phòng E403 xin giới thiệu Discord Deadline & Logistics Guard. Khảo sát 21 bạn học viên thực tế cho thấy hơn 60% bạn mất từ 5 đến 15 phút lội kênh Discord chỉ để tìm lại deadline, và hơn một nửa từng hoảng loạn vì chatbot AI tự bịa barem điểm hoặc đưa link form đã đóng. Chúng mình xây dựng giải pháp này với một tôn chỉ duy nhất: Không làm chatbot chém gió lan man, mà biến các kênh rời rạc thành một kênh tổng hợp có căn cứ chính thức tại #deadline-hub."*

---

### 🎬 CẢNH 2: KIẾN TRÚC PIPELINE & CHỐT CHẶN AN TOÀN (0:35 – 1:05 · 30 giây)
* **Góc quay:** Slide 3 & Slide 4.
* **Hành động:** 
  - Chỉ vào sơ đồ 5 chốt chặn: Authority Whitelist Gate → Gemini 3.6 Flash → Zero-Hallucination Guard → Validator & Conflict Resolver → Quota Resilience Fallback Engine.
* **Lời thoại (Xuân Dũng):**
  > *"Hệ thống hoạt động theo cơ chế Augment + Conditional Automation với 5 lớp bảo vệ: Tin đồn của sinh viên bị chặn ngay tại Authority Gate mà không tốn token AI. Gemini 3.6 Flash trích xuất dữ liệu có cấu trúc, đi qua Zero-Hallucination Guard nghiêm cấm tự bịa giờ nếu tin gốc không có. Khi thầy cô gia hạn, Validator sẽ tự động ghi đè bản cũ. Nếu chạm hạn mức Quota 429, Fallback Engine tự động tiếp quản bảo vệ 100% thời gian hoạt động."*

---

### 🎬 CẢNH 3: LIVE DEMO TƯƠNG TÁC 4 LUỒNG HAX/PAIR (1:05 – 2:15 · 70 giây)
* **Góc quay:** Màn hình Live Discord Web Client (`http://localhost:8000`).

#### Phân đoạn 3.1: Luồng Happy Path & HAX G11 (20 giây)
* **Thao tác:** 
  - Chọn Giảng viên `ThayHoang_GV` gửi tin nhắn vào kênh `#announcements`:  
    `"Thông báo lớp 3A: Bài Lab 2 được gia hạn nộp đến 23:59 ngày 17/09 qua Form mới."`
  - Bấm **Gửi tin nhắn**.
* **Hiệu ứng trên màn hình:**
  - Kênh `#deadline-hub` tức thì hiển thị thẻ deadline mới với tag `[Lớp 3A]`, badge độ khẩn cấp P1.
  - Bấm vào nút **"Xem tin gốc" / "Chi tiết"**: Màn hình tự động cuộn mượt (*smooth-scroll*) sang kênh `#announcements` và làm nổi bật màu tím tin nhắn của Thầy Hoàng.
* **Lời thoại (Lan Anh):**
  > *"Thầy Hoàng thông báo dời hạn Lab 2 trong kênh announcements. Ngay lập tức, #deadline-hub cập nhật mốc 23:59 ngày 17/09. Học viên bấm vào thẻ, màn hình tự động nhảy mượt về đúng tin nhắn gốc của thầy và highlight màu tím theo chuẩn HAX G11 — không bao giờ lo thông tin bị cắt xén."*

#### Phân đoạn 3.2: Luồng Chặn Tin Đồn & HAX G1/G2 (15 giây)
* **Thao tác:** 
  - Đổi tác giả thành `SinhVien_A` gửi:  
    `"Các bạn ơi nghe nói Capstone nộp lùi sang Chủ nhật đấy, đừng nộp vội!"`
  - Bấm **Gửi tin nhắn**.
* **Hiệu ứng trên màn hình:**
  - Tin nhắn hiện trong kênh chat sinh viên nhưng `#deadline-hub` hoàn toàn KHÔNG nhảy thêm thẻ mới. Log hệ thống báo: `[BLOCKED] Non-whitelisted author`.
* **Lời thoại (Lan Anh):**
  > *"Ngược lại, khi sinh viên nhắn tin đồn dời hạn, Authority Gate nhận diện tác giả ngoài danh sách chính thức và chặn ngay lập tức. Tuyệt đối không để tin đồn của học viên trở thành lịch thi chung."*

#### Phân đoạn 3.3: Luồng Tin Nhắn Mơ Hồ & HAX G10 (15 giây)
* **Thao tác:** 
  - Giảng viên gửi: `"Lớp chú ý nộp báo cáo tiến độ trước thứ Sáu tuần này nhé."`
* **Hiệu ứng trên màn hình:**
  - Vì tin nhắn không có giờ cụ thể, Zero-Hallucination Guard ép mốc giờ về `null`. Hệ thống không đoán mò 23:59 mà đưa vào danh sách chờ duyệt với nhãn vàng `[Cần xác nhận giờ]`.
* **Lời thoại (Lan Anh):**
  > *"Với tin nhắn thiếu giờ cụ thể như 'trước thứ Sáu', AI không tự bịa 23:59 mà giữ trạng thái an toàn để TA xác nhận."*

#### Phân đoạn 3.4: Luồng Báo Sai & HAX G9 (20 giây)
* **Thao tác:** 
  - Bấm nút **"Báo sai"** trên một thẻ bài tập.
  - Thẻ lập tức đổi sang trạng thái màu vàng: `[Đang xác minh]`.
* **Lời thoại (Lan Anh):**
  > *"Nếu phát hiện link nộp lỗi hoặc form đóng sớm, học viên bấm Báo sai 1 chạm theo chuẩn HAX G9. Thẻ đổi sang trạng thái Đang xác minh để cả lớp cùng thấy, tránh việc hàng chục bạn nhắn tin trùng lặp làm phiền TA."*

---

### 🎬 CẢNH 4: ĐO KIỂM GOLDEN SET & PHẢN HỒI R6 (2:15 – 2:45 · 30 giây)
* **Góc quay:** Slide 4 & Slide 5.
* **Hành động:** 
  - Chiếu bảng đối chiếu Quality Bar: 31/35 PASS (88.57%), 0 ca bịa deadline (0.00%), 21/21 Unit Tests PASS.
  - Chiếu kết quả 5 phiên thử nghiệm Mom Test với 5 bạn học viên ngoài nhóm và 4 cải tiến thực tế đã đưa vào code (nút bấm 36px, banner hướng dẫn, lịch sử mốc giờ, nút Reset Demo).
* **Lời thoại (Quang Dũng):**
  > *"Trên bộ đề 35 test cases phức tạp có mã băm SHA-256 cố định, hệ thống đạt 31/35 ca PASS, tương đương 88.57%, với 0% ca bịa deadline — vượt qua Quality Bar 85% đã cam kết tại CP4. Ngoài ra, qua 5 phiên Mom Test với 5 bạn ngoài nhóm như bạn Đức Minh, Văn An phòng E403, nhóm đã bổ sung 4 tinh chỉnh thực tế như tăng vùng bấm nút 36px, thêm banner tân binh và nút Reset dữ liệu."*

---

### 🎬 CẢNH 5: KẾT LUẬN & CAM KẾT BÀN GIAO (2:45 – 3:00 · 15 giây)
* **Góc quay:** Slide 6 (Phân công thành viên & Kế hoạch tương lai).
* **Lời thoại (Xuân Dũng):**
  > *"Toàn bộ mã nguồn, slide 6 trang demo-slides.pdf, bộ test eval và nhật ký người dùng đã được đẩy lên GitHub repository công khai. Nhóm Trustmebro đã sẵn sàng cho phần thuyết trình và Q&A tại Checkpoint 6. Cảm ơn thầy cô và các bạn!"*

---

## III. CHECKLIST KIỂM TRA TRƯỚC KHI NỘP VIDEO

- [ ] File video xuất định dạng MP4/MKV, âm lượng đều, không bị rè tiếng.
- [ ] Thời lượng từ 2 phút 45 giây đến 3 phút 15 giây.
- [ ] Tải video lên Google Drive/YouTube (chế độ Unlisted/Công khai) và dán link vào phần ghi chú nộp bài CP5.
