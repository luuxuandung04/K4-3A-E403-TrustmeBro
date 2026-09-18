# BỘ SLIDE THUYẾT TRÌNH DEMO — CP5 & CP6 (ĐÚNG 6 TRANG CHUẨN)
> **Dự án:** Discord Deadline & Logistics Guard (Track B1)  
> **Nhóm:** Trustmebro · Lớp 3A · Phòng E403 · VinUniversity  
> **Lưu ý:** Xuất file ra định dạng PDF tại thư mục gốc repository với tên gọi: `demo-slides.pdf`.

---

## TRANG 1: BỐI CẢNH, BÀI TOÁN & BẰNG CHỨNG THỰC TẾ (CHUẨN A/B)
### Đề tài Track B1: Discord Deadline & Logistics Guard — Nhóm Trustmebro (Lớp 3A · Phòng E403)

- **Bối cảnh & Nỗi đau thực tế:**
  - Học viên lớp AI Batch 04 nhận thông tin và bài tập rải rác trên hàng chục kênh Discord (`#announcements`, `#lab-assignments`, `#quiz-updates`...).
  - Thông báo dời hạn, hủy buổi, đổi phòng nộp bài bị trôi dạt giữa hàng trăm tin chat.
  - Khi hỏi bot AI hiện tại, học viên liên tục nhận về thông tin bịa đặt hoặc link form đã đóng.
- **Bằng chứng định lượng (Khảo sát N = 21, Chuẩn A & B):**
  - **61.9% (13/21 bạn):** Mất từ 5 đến hơn 15 phút mỗi lần tra cứu deadline.
  - **52.4% bạn:** Thất bại ở lần gần nhất hỏi bot (33.3% trả lời mơ hồ, 9.5% sai hạn/link).
  - **71.4% bạn:** Chịu hậu quả tiêu cực (hoang mang, nộp sát nút, nộp muộn, nộp nhầm file).
- **Trích dẫn nguyên văn học viên (Chuẩn B):**
  > *"Hỏi bot thì bot tự chế ra barem điểm không hề có trên lớp làm mình hoảng loạn... Rào cản lớn nhất là thông tin nằm rải rác mỗi nơi một mẩu và không có trang tổng hợp chuẩn xác."*  
  > *"Bot quăng ra một link form đã đóng từ kỳ trước... nộp sát nút chỉ còn đúng 2 phút là đóng cổng."*  
  > *"Công cụ tự động không hiệu quả, học viên buộc phải làm phiền lẫn nhau và làm phiền TA để check thông tin."*
- **Hành vi tìm kiếm:** 47.6% gõ từ khóa trên Discord nhưng bị ngợp giữa hàng trăm tin chat rác; 14.3% lội kênh ghim; 14.3% hỏi bạn bè.

---

## TRANG 2: LÁT CẮT GIẢI PHÁP MỘT CÂU & KIẾN TRÚC TỔNG QUAN
### Không phải chatbot hỏi-đáp lan man — Trở thành Kênh Tổng Hợp & Lịch Biểu Có Căn Cứ

- **Lát cắt MỘT CÂU (Core Scope):**  
  > *"Nhiều kênh thông báo rải rác → Một quyết định AI có căn cứ từ nguồn chính thức → Một lịch deadline chung dễ theo dõi tại #deadline-hub."*
- **Mức tự động hóa theo cost-of-error:** Chọn **Augment + Conditional**. Chi phí sai sót (*cost-of-error*) cực cao — sai deadline cả lớp bị 0 điểm. Do đó, hệ thống chỉ tự công bố khi có đủ nguồn chính thức; thông báo mơ hồ đưa vào hàng chờ duyệt.
- **3 Non-goals nghiêm ngặt:**  
  1. KHÔNG tự bịa deadline từ tin đồn học viên hoặc tin nhắn thiếu mốc giờ.  
  2. KHÔNG can thiệp sửa đổi thông báo gốc hoặc quyền nộp bài của sinh viên.  
  3. KHÔNG tự động spam tin nhắn riêng (DM) làm phiền học viên.
- **Kiến trúc tổng quan Pipeline 5 chốt chặn an toàn:**
  1. **Authority Whitelist Gate:** Chỉ nhận tin từ Giảng viên/TA/BTC. Tin nhắn chém gió, tung tin đồn của sinh viên bị loại bỏ ngay tại cửa ngõ (tiết kiệm 100% token AI).
  2. **Gemini 3.6 Flash Extractor:** Trích xuất JSON có cấu trúc (loại sự kiện, ngày giờ, độ khẩn cấp, đối tượng lớp).
  3. **Zero-Hallucination Regex Guard:** Nghiêm cấm tự bịa giờ 20:00/23:59 nếu tin gốc không có con số cụ thể. Ép `null` an toàn.
  4. **Structured Validator & Conflict Resolver:** Nhận diện thông báo gia hạn để ghi đè (supersede) bản cũ, phát hiện xung đột mốc giờ nâng cảnh báo P0.
  5. **Quota Resilience Fallback Engine:** Tự động bắt mã lỗi 429 Quota Exceeded của Gemini Free Tier, chuyển sang Deterministic Fallback Engine bảo vệ 100% uptime.

---

## TRANG 3: 4 LỚP CHỖ KHÓ & CÁCH THỨC GIẢI QUYẾT TRONG TRẢI NGHIỆM NGƯỜI DÙNG
### Tích hợp trực quan các nguyên tắc Microsoft HAX G1/G2/G9/G10/G11 & Google PAIR

- **1. Bẫy căn cứ & Số nhiễu (HAX G1/G2: Khả năng & Giới hạn):**  
  - *Chỗ khó:* Tin nhắn chứa số điện thoại, số phòng 302, link URL có số dễ làm AI nhầm thành giờ nộp.  
  - *Giải pháp:* Regex phân tích ngữ cảnh cửa sổ 30 ký tự, loại bỏ số phòng/SĐT. Tin nhắn sinh viên bị chặn ngay tại Authority Gate.
- **2. Mơ hồ & Quy đổi thời gian (HAX G10: Scope in doubt):**  
  - *Chỗ khó:* Tin nhắn chỉ báo "Nộp bài trước thứ Sáu" hoặc "Cô sẽ chốt giờ trong tin tiếp theo".  
  - *Giải pháp:* Zero-Hallucination Guard ép mốc giờ về `null`, không đoán mò 20:00/23:59. Đưa vào hàng chờ duyệt để TA bổ sung bằng modal.
- **3. Cập nhật đè & Chuỗi đa tin nhắn (HAX G11: Explain why):**  
  - *Chỗ khó:* Thầy gia hạn mốc mới, tin cũ trôi dạt làm học viên hoang mang không biết theo mốc nào.  
  - *Giải pháp:* Validator tự động supersede bản cũ. Bấm vào deadline → Tự động smooth-scroll nhảy đến đúng tin nhắn của thầy và highlight tím.
- **4. Phát hiện sai lệch & Phản hồi (HAX G9: Efficient correction):**  
  - *Chỗ khó:* Form nộp bài đóng sớm hơn mốc giờ hoặc link bị lỗi, học viên cuống cuồng spam TA.  
  - *Giải pháp:* Nút "Báo sai" 1 chạm ngay trên deadline. Thẻ đổi sang "Đang xác minh", cả lớp cùng biết tình trạng, tránh báo trùng.

---

## TRANG 4: BẢNG ĐO LƯỜNG THỰC TẾ ĐỐI CHIẾU VỚI QUALITY BAR KHÓA TẠI CP4
### Chính thức vượt qua Quality Bar trên bộ đề 35 test cases phức tạp

- **Bảng đối chiếu Quality Bar (Khóa từ CP4):**
  | Chỉ số kiểm thử | Quality Bar (Khóa CP4) | Kết quả Đo Thật CP5 | Đánh giá |
  |---|:---:|:---:|:---:|
  | **Tổng số ca** | 35 ca (phủ 6 nhóm khó) | **35 ca** | Đủ bộ đề chuẩn |
  | **Số ca vượt qua (PASS)** | $\ge 30$ ca | **31 ca** | **VƯỢT BAR (+1 ca)** |
  | **Tỉ lệ đạt (Pass Rate)** | $\ge 85.0\%$ | **88.57%** | **ĐÃ ĐẠT (+3.57%)** |
  | **Ca bịa/sai deadline** | 0 ca (bắt buộc 0.0%) | **0 ca (0.00%)** | **ZERO HALLUCINATION** |
  | **KẾT LUẬN CHUNG** | | **ĐẠT QUALITY BAR** | **CHÍNH THỨC ĐẠT** |

- **Độ chính xác theo 6 nhóm thử thách khắc nghiệt:**
  - Mơ hồ & Quy đổi thời gian: **6/6 (100.0%)**
  - Ngoài thẩm quyền & Lọc nhiễu: **5/5 (100.0%)**
  - Adversarial Zero-Hallucination: **7/7 (100.0%)**
  - Bẫy căn cứ & Số nhiễu (SĐT, URL): **5/6 (83.3%)**
  - Cập nhật đè & Chuỗi đa tin nhắn: **4/5 (80.0%)**
  - Đặc thù miền & Phạm vi lớp 3A/3B: **4/6 (66.7%)**
- **Liêm chính học thuật:** Khóa mã băm SHA-256 (`90ccac7e3095...`). 21/21 Unit Tests backend đạt 100% PASS.

---

## TRANG 5: BÀI HỌC THẤT BẠI & DỮ LIỆU PHẢN HỒI NGƯỜI DÙNG (R6)
### 5 phiên thử nghiệm thực tế với học viên ngoài nhóm dẫn tới thay đổi trực tiếp trên sản phẩm

- **Bài học từ thất bại Stress Test CP4:**  
  - Đợt CP4 chỉ đạt 17.14% (5 ca bịa mốc giờ) do prompt dài dòng không trị được bẫy đối nghịch.  
  - Nhóm công khai kết quả thất bại, xây dựng Fallback Regex Engine và chốt chặn Zero-Hallucination Regex Guard giúp tăng vọt lên 88.57% PASS ở CP5.
- **Phản hồi thực tế từ 5 bạn ngoài nhóm (The Mom Test):**  
  - **Đức Minh (U1 · 3A):** *"Nút mũi tên góc này bé tí mày ơi, tao bấm trượt cụ nó một phát, tưởng icon trang trí chứ."*
  - **Văn An (U2 · 3A):** *"Ủa alo, con bot này không chat được à? Gom một chỗ thế này nhìn tiện vãi, đỡ phải gõ lệnh."*
  - **Lê Thảo (U3 · 3A):** *"Ơ đổi màu cam nhìn giật cả mình tưởng toang! Thêm cái dòng ghi chú nhỏ kiểu được gia hạn từ mốc cũ vào đây cho đỡ lú."*
  - **Hoàng Nam (U4 · 3B):** *"Server 3A sao hiện cả bài của 3B bọn tôi, lỡ nhìn nhầm hạn của 3A thì ăn cám. Cần làm thêm nút lọc riêng lớp."*
  - **Minh Tuấn (U5 · 3A):** *"Ngon mày ơi! Có cái nút Báo sai này đỡ hẳn quả sinh viên nháo nhào inbox spam TA mỗi lần form lỗi."*
- **4 Cải tiến thực tế đã đưa vào §9 Changelog (v5.0):**  
  1. *Tăng kích thước nút Chi tiết (36px) & Tooltip:* Học viên dễ bấm mở tin nhắn gốc.  
  2. *Thêm Banner hướng dẫn tân binh tại #deadline-hub:* Giải thích rõ kênh là nơi tổng hợp tự động, không cần gõ lệnh.  
  3. *Hiển thị lịch sử gia hạn từ mốc cũ:* Giúp học viên an tâm không nhìn nhầm bài.  
  4. *Nút Reset Demo Data 1-Click trên topbar:* Nút dọn rác tức thì phục vụ Ban giám khảo test live.

---

## TRANG 6: KẾ HOẠCH MỞ RỘNG SẢN PHẨM & ĐÓNG GÓP TỪNG THÀNH VIÊN
### Sẵn sàng bàn giao sản phẩm hoàn chỉnh và bảo vệ trước Ban giám khảo tại Checkpoint 6

- **Kế hoạch mở rộng sản phẩm (Post-Hackathon):**  
  1. **Kết nối Discord Gateway Thật:** Chuyển từ Web Client mock sang bot Discord chạy trực tiếp trên server lớp qua thư viện `discord.py`.  
  2. **Đồng bộ 2 Chiều Google Calendar / Outlook:** Tự động xuất file `.ics` hoặc đồng bộ vào email sinh viên trường VinUni.  
  3. **Kênh Webhook Riêng Cho TA (#ta-alerts):** Bắn thông báo đẩy riêng cho Trợ giảng khi có học viên gửi phiếu Báo sai sát giờ.  
  4. **Bộ Lọc Tab Phân Biệt Lớp Học (Class Filter):** Cho phép chuyển nhanh xem bài riêng của Lớp 3A hoặc Lớp 3B.
- **Bảng phân công & Đóng góp của từng thành viên:**  
  - **Lưu Xuân Dũng (Lead · 2A202602746):** Kiến trúc AI, Prompt Gemini 3.6 Flash, Authority Gate, Zero-Hallucination Guard, Fallback Engine, Lead Q&A.  
  - **Trương Thị Lan Anh (2A202602451):** Xây dựng Discord Web Client, hiện thực hóa 4 luồng HAX/PAIR, hiệu ứng smooth-scroll highlight, thiết kế slide.  
  - **Nguyễn Duy Khánh (2A202602736):** Product Manager, Khảo sát N=21, điều phối 5 phiên Mom Test với người dùng ngoài nhóm, tài liệu spec & Changelog.  
  - **Tạ Quang Dũng (2A202602588):** Data & QA Lead, biên soạn Golden Set 35 cases, thiết lập mã băm SHA-256, script `run_eval.py` tự động.
- **Khẳng định sẵn sàng bàn giao CP5 & CP6:** 21/21 Unit Tests 100% PASS · 31/35 Golden Set PASS (88.57%) · 0% Bịa Deadline · Đầy đủ video backup và tài liệu.
