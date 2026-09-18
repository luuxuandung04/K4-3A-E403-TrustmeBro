# KẾ HOẠCH & KỊCH BẢN CHI TIẾT BỘ SLIDE THUYẾT TRÌNH (6 TRANG)
> **Đề tài:** Discord Deadline & Logistics Guard (Track B1)  
> **Nhóm:** Trustmebro · Lớp 3A · Phòng E403 · VinUniversity  
> **Mục tiêu:** Trình bày 5 phút chuẩn mực tại Checkpoint 6, phủ kín các tiêu chí chấm điểm (R1 → R6).

---

## TỔNG QUAN PHÂN CÔNG THUYẾT TRÌNH

| Trang | Nội dung slide | Người trình bày chính | Thời lượng | Điểm nhấn Rubric |
|:---:|---|---|:---:|---|
| **1** | Bìa, Đề tài & Đội ngũ | **Lưu Xuân Dũng** (Team Lead) | 30s | Phân công vai trò rõ ràng, thông tin repo chuẩn |
| **2** | Vấn đề & Khảo sát N=21 | **Nguyễn Duy Khánh** (Product) | 50s | Tiêu chí R1: Bằng chứng định lượng A & B, quote đau đớn |
| **3** | Lát cắt giải pháp & Pipeline AI | **Lưu Xuân Dũng** (AI Engineer) | 60s | Tiêu chí R2 & R5: Lát cắt 1 câu, Augment+Conditional, 5 chốt chặn |
| **4** | 4 Luồng hoạt động HAX/PAIR | **Trương Thị Lan Anh** (System) | 60s | Tiêu chí R3: Giao diện Discord native, 4 luồng, HAX G1/G2/G9/G10/G11 |
| **5** | Đo kiểm Golden Set & Quality Bar | **Tạ Quang Dũng** (QA Lead) | 60s | Tiêu chí R4: 31/35 (88.57%), 0% bịa deadline, mã băm SHA-256 |
| **6** | Mom Test & Cải tiến sản phẩm | **Nguyễn Duy Khánh** & Cả nhóm | 40s | Tiêu chí R6 (+8đ): 5 bạn ngoài nhóm, 3 thay đổi thật, 2 giữ nguyên |

---

## CHI TIẾT NỘI DUNG TỪNG SLIDE & LỜI THOẠI (SPEAKER NOTES)

---

### SLIDE 1: BÌA & THÔNG TIN DỰ ÁN
#### 1. Bố cục Visual trên Slide
- **Header:** Tag nổi bật `MINI HACKATHON AI BATCH 04 · LỚP 3A · PHÒNG E403`.
- **Hero Title:** `Discord Deadline & Logistics Guard`.
- **Subtitle:** *Trợ lý tổng hợp lịch học tập & bảo vệ thông tin học viên khỏi ảo giác AI*.
- **Hàng Badges:** `Track B1` · `FastAPI + Gemini 3.6 Flash` · `Zero-Hallucination Guard` · `Quality Bar: 88.57% PASS`.
- **Grid 4 Thành viên (4 Cards):**
  - **Lưu Xuân Dũng (2A202602746):** Team Lead · AI Engineer (Prompt, RAG Guardrails, Q&A Lead).
  - **Trương Thị Lan Anh (2A202602451):** System · Discord Web Client · HAX/PAIR Points.
  - **Nguyễn Duy Khánh (2A202602736):** Product · UX/UI · Khảo sát N=21 · Mom Test User Log.
  - **Tạ Quang Dũng (2A202602588):** Data · QA · Golden Set (35 cases) · Auto Evaluation.
- **Footer:** Link GitHub public: `github.com/luuxuandung04/K4-3A-E403-TrustmeBro`.

#### 2. Kịch bản thuyết trình (Speaker Notes — Lưu Xuân Dũng)
> *"Kính chào Ban giám khảo và các bạn học viên lớp AI Batch 04. Em là Lưu Xuân Dũng, đại diện cho nhóm Trustmebro phòng E403. Hôm nay, nhóm em xin bảo vệ đề tài Track B1: **Discord Deadline & Logistics Guard** — giải pháp trợ lý tổng hợp thông tin học tập và chốt chặn chống ảo giác AI. 
> Dự án được xây dựng với sự tham gia của 4 thành viên theo đúng phân công trách nhiệm: bạn Duy Khánh phụ trách khảo sát bài toán thực tế và user testing; bạn Lan Anh xây dựng hệ thống web client mô phỏng Discord; bạn Quang Dũng phụ trách bộ đề đo kiểm Golden Set và chất lượng dữ liệu; còn em chịu trách nhiệm về kiến trúc AI và các chốt chặn an toàn."*

---

### SLIDE 2: VẤN ĐỀ THỰC TẾ & BẰNG CHỨNG KHẢO SÁT (N = 21)
#### 1. Bố cục Visual trên Slide
- **Cột trái — 3 Thẻ số liệu lớn (Big Numbers):**
  - **61.9% (13/21 học viên):** Mất từ 5 đến hơn 15 phút mỗi lần tìm deadline trên Discord (chỉ 19% tìm thấy < 2 phút).
  - **52.4% học viên:** Thất bại ở lần gần nhất hỏi bot AI cũ (33.3% trả lời mơ hồ, 9.5% đưa sai hạn/link).
  - **71.4% học viên:** Phải gánh chịu hậu quả tiêu cực (hoang mang hỏi lại, nộp sát nút, nộp muộn, nộp nhầm file).
- **Hành vi thực tế:** 47.6% gõ từ khóa trên Discord nhưng bị ngợp giữa hàng trăm tin chat loãng; 14.3% lội kênh ghim; 14.3% phải nhắn tin hỏi bạn bè và TA.
- **Cột phải — 3 Hộp trích dẫn nguyên văn học viên (Quotes):**
  - *"Hỏi bot thì bot tự chế ra barem điểm không hề có trên lớp làm mình hoảng loạn... Rào cản lớn nhất là thông tin nằm rải rác mỗi nơi một mẩu."*
  - *"Bot quăng ra link form đóng từ kỳ trước, nộp sát nút chỉ còn đúng 2 phút."*
  - *"Công cụ tự động không hiệu quả, học viên buộc phải làm phiền lẫn nhau và làm phiền TA để check thông tin."*

#### 2. Kịch bản thuyết trình (Speaker Notes — Nguyễn Duy Khánh)
> *"Để không xây dựng một sản phẩm viển vông, nhóm em đã thực hiện khảo sát định lượng với cỡ mẫu N = 21 học viên đang trực tiếp học tập tại phòng E403. Kết quả cho thấy một thực trạng báo động: hơn 60% học viên mất từ 5 đến 15 phút chỉ để lội kênh tìm lại hạn nộp bài. Đáng chú ý hơn, khi học viên tìm đến các chatbot AI hiện tại, hơn một nửa nhận về câu trả lời thất bại: bot tự bịa barem điểm không có thật, hoặc nguy hiểm hơn là cung cấp link Google Form đã đóng từ các khóa trước. 
> Có tới 71.4% bạn đã phải chịu hậu quả nộp muộn hoặc nộp nhầm file. Nỗi đau lớn nhất không phải là thiếu công cụ, mà là thông tin rải rác và AI tự tin trả lời sai lệch mà không có nguồn gốc đối chứng."*

---

### SLIDE 3: THIẾT KẾ LÁT CẮT & KIẾN TRÚC PIPELINE AI
#### 1. Bố cục Visual trên Slide
- **Khung nổi bật — Lát cắt MỘT CÂU:**  
  > *"Nhiều kênh thông báo rải rác → Một quyết định AI có căn cứ từ nguồn chính thức → Một lịch deadline chung dễ theo dõi tại #deadline-hub."*
- **Mức tự động hóa (Automation Level):** Chọn **Augment + Conditional**. Chi phí sai sót (cost-of-error) cực cao — AI bịa sai deadline sẽ khiến cả lớp bị 0 điểm. Do đó, hệ thống chỉ tự công bố khi có đủ nguồn chính thức; thông báo mơ hồ đưa vào hàng chờ duyệt.
- **3 Non-goals nghiêm ngặt:**  
  1. KHÔNG tự bịa deadline từ tin đồn học viên hoặc tin nhắn thiếu mốc giờ.  
  2. KHÔNG can thiệp sửa đổi thông báo gốc hoặc quyền nộp bài của sinh viên.  
  3. KHÔNG spam tin nhắn riêng (DM) làm phiền học viên.
- **Cột phải — Sơ đồ Pipeline 5 chốt chặn an toàn:**
  - **1. Authority Whitelist Gate:** Kiểm tra người gửi. Tin nhắn chém gió, tung tin đồn của sinh viên bị loại bỏ ngay từ đầu (tiết kiệm 100% token AI).
  - **2. Gemini 3.6 Flash Extractor:** Trích xuất JSON có cấu trúc (loại sự kiện, ngày giờ, độ khẩn cấp).
  - **3. Zero-Hallucination Regex Guard:** Nghiêm cấm tự bịa giờ 20:00 hay 23:59 nếu tin gốc không có con số cụ thể. Ép `null` an toàn.
  - **4. Structured Validator & Conflict Resolver:** Nhận diện thông báo gia hạn để ghi đè (supersede) bản cũ, phát hiện xung đột mốc giờ nâng cảnh báo P0.
  - **5. Quota Resilience Fallback Engine:** Tự động bắt lỗi 429 Quota Exceeded của Gemini Free Tier, chuyển sang Deterministic Fallback Engine bảo vệ 100% uptime.

#### 2. Kịch bản thuyết trình (Speaker Notes — Lưu Xuân Dũng)
> *"Từ nỗi đau đó, nhóm em đã đưa ra một lát cắt giải pháp cô đọng: 'Nhiều kênh thông báo rải rác chuyển thành một lịch chung có căn cứ tại #deadline-hub'. Nhóm em dứt khoát không làm một con chatbot hỏi đáp lan man. Thay vào đó, nhóm chọn mức tự động hóa Augment + Conditional với 3 Non-goals rõ ràng.
> Trọng tâm công nghệ của nhóm là Pipeline 5 bước bảo vệ: Cửa ngõ đầu tiên là Authority Gate lọc sạch tin đồn của sinh viên, không tốn một token AI nào. Tiếp theo, Gemini 3.6 Flash trích xuất dữ liệu có cấu trúc, đi qua chốt chặn Zero-Hallucination Guard ép triệt tiêu mọi mốc giờ tự đoán. Nếu giảng viên gia hạn, Validator sẽ tự động cập nhật đè bản cũ. Đặc biệt, hệ thống có cơ chế Fallback Engine tự động tiếp quản khi API chạm hạn mức 429, đảm bảo hệ thống không bao giờ bị sập khi chấm điểm ngoại tuyến."*

---

### SLIDE 4: TRẢI NGHIỆM NGƯỜI DÙNG & 4 LUỒNG HOẠT ĐỘNG (HAX/PAIR)
#### 1. Bố cục Visual trên Slide (4 Cards tương ứng 4 Luồng)
- **🟢 Luồng 1: Happy Path (AUTO-PUBLISH):**  
  - Giảng viên thông báo gia hạn Lab 2 trong `#announcements`.
  - AI trích xuất mốc 23:59 ngày 17/09, ghi đè bản cũ.
  - `#deadline-hub` cập nhật ngay bảng tin 7 ngày.
  - **Điểm chạm HAX G11:** Bấm vào deadline → Tự động nhảy mượt (smooth-scroll) đến đúng tin nhắn gốc có highlight màu tím.
- **🟡 Luồng 2: Low-Confidence (NEEDS REVIEW — HAX G10):**  
  - Thông báo mơ hồ: *"Nộp project trước thứ Sáu"*.
  - Không đoán tên bài hoặc giờ; giữ khỏi calendar chung.
  - Đưa vào hàng chờ duyệt kèm lý do; TA bổ sung bằng modal trước khi công bố.
- **🔴 Luồng 3: No-Grounding (REJECTED — HAX G1 & G2):**  
  - Sinh viên nhắn: *"Nghe nói Capstone nộp Chủ nhật"*.
  - Authority Gate chặn ngay vì tác giả không thuộc whitelist.
  - Tuyệt đối không để tin đồn học viên trở thành lịch thi chính thức của cả lớp.
- **🟣 Luồng 4: Correction (HUMAN REVIEW — HAX G9):**  
  - Học viên phát hiện form đóng sớm hơn lịch.
  - Bấm nút **"Báo sai"** ngay trên chi tiết deadline, chọn lý do lỗi.
  - Đổi trạng thái sang *Đang xác minh*, không tự ý xóa dữ liệu, gửi ticket cho TA.

#### 2. Kịch bản thuyết trình (Speaker Notes — Trương Thị Lan Anh)
> *"Về mặt trải nghiệm, nhóm em tái hiện 100% môi trường Discord Web Client quen thuộc. Mọi tương tác của học viên xoay quanh 4 luồng trải nghiệm theo sát các nguyên tắc Microsoft HAX và Google PAIR:
> Ở luồng Happy Path, khi giảng viên gửi tin gia hạn, bảng tin 7 ngày trên #deadline-hub cập nhật tức thì. Khi bấm vào thẻ deadline, màn hình tự động nhảy đến đúng tin nhắn của giảng viên và nhấp nháy viền tím highlight theo nguyên tắc HAX G11. 
> Ở luồng Low-confidence, khi thông báo thiếu giờ cụ thể, hệ thống tuân thủ HAX G10: không tự đoán con số mà giữ lại chờ TA bổ sung. 
> Ở luồng số 3, mọi tin đồn của sinh viên bị từ chối an toàn. 
> Và ở luồng số 4, theo nguyên tắc HAX G9, khi học viên phát hiện form đóng sớm, họ chỉ cần 1 click vào nút 'Báo sai' để chuyển trạng thái sang Đang xác minh, giúp cả lớp nắm được tình hình mà không cần spam inbox của TA."*

---

### SLIDE 5: ĐO KIỂM GOLDEN SET & QUALITY BAR
#### 1. Bố cục Visual trên Slide
- **Bảng đối chiếu kết quả đo kiểm (So sánh với Bar khóa từ CP4):**
  | Chỉ số kiểm thử | Quality Bar (Khóa CP4) | Kết quả Đo Thật CP5 | Đánh giá |
  |---|:---:|:---:|:---:|
  | **Tổng số ca** | 35 ca (phủ 6 nhóm khó) | **35 ca** | Đủ bộ đề chuẩn |
  | **Số ca vượt qua (PASS)** | $\ge 30$ ca | **31 ca** | **VƯỢT BAR (+1 ca)** |
  | **Tỉ lệ đạt (Pass Rate)** | $\ge 85.0\%$ | **88.57%** | **ĐÃ ĐẠT (+3.57%)** |
  | **Ca bịa/sai deadline** | 0 ca (bắt buộc 0.0%) | **0 ca (0.00%)** | **ZERO HALLUCINATION** |
  | **KẾT LUẬN CHUNG** | | **ĐẠT QUALITY BAR** | **CHÍNH THỨC ĐẠT** |
- **Tỉ lệ đạt theo 6 nhóm thử thách khắc nghiệt:**
  - Mơ hồ & Quy đổi thời gian: **6/6 (100.0%)**
  - Ngoài thẩm quyền & Lọc nhiễu: **5/5 (100.0%)**
  - Adversarial Zero-Hallucination: **7/7 (100.0%)**
  - Bẫy căn cứ & Số nhiễu (SĐT, URL): **5/6 (83.3%)**
  - Cập nhật đè & Chuỗi đa tin nhắn: **4/5 (80.0%)**
  - Đặc thù miền & Phạm vi lớp 3A/3B: **4/6 (66.7%)**
- **Liêm chính học thuật:** Khóa mã băm SHA-256 (`90ccac7e3095...`). 21/21 Unit Tests backend đạt 100% PASS.

#### 2. Kịch bản thuyết trình (Speaker Notes — Tạ Quang Dũng)
> *"Để chứng minh độ tin cậy của giải pháp, nhóm em đã xây dựng bộ đề Golden Set gồm 35 ca kiểm thử thực tế, bao phủ 6 nhóm thử thách khó nhất như bẫy số điện thoại, mốc giờ tương đối, và các câu bẫy ảo giác đối nghịch. Bộ đề này được khóa mã băm SHA-256 ngay từ CP4 để chống mọi hành vi sửa đề làm đẹp số liệu.
> Tại CP4, đợt stress test đầu tiên từng chỉ đạt 17.14% và có tới 5 ca bịa đặt deadline. Nhóm em đã dũng cảm công khai kết quả thất bại đó và lên kế hoạch remediation. 
> Hôm nay, tại CP5, sau khi tái cấu trúc pipeline và bộ phân giải ngữ nghĩa, lượt đo kiểm lại chính thức đạt **31/35 ca PASS, tương đương 88.57%**, và quan trọng nhất là tỉ lệ bịa đặt deadline đạt **0.00% tuyệt đối**. Hệ thống chính thức vượt qua Quality Bar đã cam kết!"*

---

### SLIDE 6: THỬ NGHIỆM NGƯỜI DÙNG (R6) & KẾ HOẠCH BÀN GIAO
#### 1. Bố cục Visual trên Slide
- **Cột trái — Thử nghiệm thực tế 5 phiên Mom Test (5 Nhịp):**
  - **5 Bạn học viên ngoài nhóm:** Đức Minh (U1), Văn An (U2), Lê Thảo (U3), Hoàng Nam (U4), Minh Tuấn (U5).
  - **Quy trình 5 nhịp:** Giao việc không mớm lời → Quan sát lúng túng → Trích dẫn nguyên văn sinh viên → Phân tích nhận thức → Cải tiến sản phẩm.
  - **Quotes nguyên văn tiêu biểu:**
    - *"Đù, bấm phát nhảy luôn tới tin nhắn của thầy Hoàng à, tiện vãi! Cơ mà cái nút mũi tên góc này bé tí mày ơi, tao bấm trượt cụ nó một phát."* — Đức Minh
    - *"Ủa alo, con bot này không chat được à? Gom một chỗ thế này nhìn tiện vãi, đỡ phải gõ lệnh."* — Văn An
    - *"Ngon mày ơi! Có cái nút Báo sai này đỡ hẳn quả sinh viên nháo nhào inbox spam TA."* — Minh Tuấn
- **Cột phải — Cải tiến thực tế đưa vào §9 Changelog (v5.0):**
  - **1. Tăng kích thước nút Chi tiết ($36\text{px}$) & Tooltip:** Học viên dễ bấm mở tin nhắn gốc.
  - **2. Thêm Banner hướng dẫn tân binh tại #deadline-hub:** Giải thích rõ kênh là nơi tổng hợp tự động, không cần gõ lệnh hỏi từng bài.
  - **3. Bổ sung lịch sử thay đổi mốc giờ:** Hiện rõ dòng gia hạn từ mốc cũ giúp học viên an tâm.
  - **4. Cơ chế 1-Click Demo Reset trên topbar:** Nút dọn rác tức thì phục vụ Ban giám khảo test live tại CP6.
- **Hộp khẳng định sẵn sàng:** *Đầy đủ Live Demo, Slide 6 trang PDF, Video dự phòng, sẵn sàng bảo vệ CP6!*

#### 2. Kịch bản thuyết trình (Speaker Notes — Nguyễn Duy Khánh & Lưu Xuân Dũng)
> *"Cuối cùng, để kiểm chứng giá trị thực tế theo tiêu chuẩn R6, nhóm em đã mời 5 bạn học viên ngoài nhóm tham gia thử nghiệm theo đúng nguyên tắc The Mom Test: đưa máy cho các bạn tự dùng và ghi nhận những câu nói tự nhiên nhất.
> Phản hồi từ các bạn đã dẫn tới 3 thay đổi trực tiếp trên code: tăng kích thước vùng bấm nút Chi tiết, thêm banner hướng dẫn cho tân binh và hiển thị lịch sử gia hạn trong modal. Nhóm cũng tích hợp nút 'Reset Demo Data' 1 chạm ngay trên topbar để Ban giám khảo có thể thoải mái thử nghiệm các kịch bản phá hoại mà vẫn khôi phục dữ liệu sạch trong 1 giây.
> Toàn bộ hồ sơ gồm slide 6 trang PDF, kịch bản video demo dự phòng, và 4 bài suy ngẫm cá nhân đã hoàn tất 100%. Nhóm Trustmebro xin chân thành cảm ơn thầy cô và sẵn sàng bước vào phần Q&A!"*
