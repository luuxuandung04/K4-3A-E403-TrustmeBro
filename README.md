# K4-3A-E403-Trustmebro — Discord Deadline & Logistics Guard

> **Sự kiện:** Mini Hackathon AI Batch 04 · Lớp 3A · Phòng E403  
> **Thời lượng:** 47,5 giờ (Từ 18:00 ngày 16/9 đến 17:30 ngày 18/9/2026)  
> **Tên nhóm:** Trustmebro | **Phòng:** E403 | **Lớp:** 3A  
> **Đề tài:** **Track B1 — Tối ưu Trợ lý Học viên Discord (Deadline & Logistics Guard)**  
> **Repo GitHub:** `https://github.com/luuxuandung04/K4-3A-E403-TrustmeBro`

---

## 👥 1. THÀNH VIÊN & PHÂN CÔNG VAI TRÒ (CẬP NHẬT MỚI NHẤT)

| Họ và Tên | Mã Sinh Viên | GitHub Username | Vai trò chính | Phần việc đảm nhiệm cụ thể trong dự án |
|---|---|---|---|---|
| **Lưu Xuân Dũng** *(Đội trưởng)* | **2A202602746** | `luuxuandung04` | **Team Lead · AI Engineer** | • Nộp form cả 5 checkpoint bằng mã SV `2A202602746` đúng hạn.<br>• Quản trị Repo GitHub, git flow, commit history.<br>• Thiết kế Prompt hệ thống, Pipeline RAG và Guardrails chống bịa đặt (Zero Hallucination).<br>• Thuyết trình chính tại CP6 và điều phối trả lời Q&A. |
| **Trương Thị Lan Anh** | **2A202602451** | `SxAinsworth` | **System · Prototype** | • Xây dựng và tích hợp Clickable Prototype / Discord Bot cho CP2.<br>• Tích hợp webhook thông báo và luồng xử lý có điều kiện (Conditional Retrieval).<br>• Thể hiện các điểm chạm HAX/PAIR (G1, G2, G9, G10, G11) trực quan trên giao diện.<br>• Thiết kế Slide 6 trang PDF (`demo-slides.pdf`) cho CP5. |
| **Nguyễn Duy Khánh** | **2A202602736** | `nguyenkhanhbh01989` | **Product · UX/UI · Spec** | • Phân tích dữ liệu khảo sát người dùng ($N = 21$), trích xuất bằng chứng định lượng & định tính (R1).<br>• Thiết kế chuẩn format câu trả lời của Bot và tài liệu bàn giao `spec.md` 9 phần chuẩn.<br>• Điều phối quy trình thử nghiệm người dùng 5 nhịp (R6 bonus +8đ). |
| **Tạ Quang Dũng** | **2A202602588** | `taquangdung123` | **Data · QA · Golden Set** | • Thu thập log thông báo chính thức, làm sạch dữ liệu nguồn sự thật.<br>• Xây dựng bộ test case Golden Set ≥20 cases phủ 4 lớp chỗ khó (R4).<br>• Viết script đo kiểm tự động và đánh giá độ chuẩn xác, đối chiếu Quality Bar (CP3 & CP4). |

---

## 📋 2. CANVAS 4 Ô — CHECKPOINT 1

### 🟩 01 · NGƯỜI DÙNG & NỖI ĐAU
* **Học viên cần tìm đúng deadline và thông tin logistics trên Discord**
* **Người dùng:** Học viên các khóa học AI / Công nghệ đang thực hiện Lab, Quiz, Assignment và Capstone Project trên nền tảng Discord.
* **Pain (Nỗi đau thực tế):**
  - Thông báo quan trọng bị trôi rất nhanh giữa hàng trăm tin nhắn thảo luận chung; thiếu một nơi lưu trữ / dashboard tập trung cố định.
  - Bot hỗ trợ hiện tại hoạt động thiếu tin cậy: trả lời lan man, cung cấp link form cũ đã đóng, hoặc tự bịa barem điểm / quy định tính XP không có thật.
  - Mất rất nhiều thời gian tra cứu (**61.9%** học viên mất từ 5 phút đến hơn 15 phút, thậm chí không tự tìm ra).
* **Hậu quả:**
  - Nộp bài sát nút, nộp muộn do nhầm hạn, hoặc nộp sai định dạng / sai link dẫn đến mất điểm và phải xin nộp lại.
  - Học viên hoang mang, mất niềm tin vào công cụ tự động, tạo gánh nặng phải giải đáp thủ công lặp đi lặp lại lên TA và Mentor.

### 🟦 02 · BẰNG CHỨNG BAN ĐẦU
* **Dữ liệu thực tế từ khảo sát 21 học viên trên hệ thống ($N = 21$):**
  - **Hành vi tìm kiếm thông tin:** 
    - **47.6% (10/21)** chọn gõ từ khóa tìm kiếm trên Discord đầu tiên nhưng thường bị ngợp vì kết quả trả về quá loãng, lẫn lộn giữa tin chat thường và thông báo chính thức.
    - **14.3%** nhắn tin hỏi bạn bè; **14.3%** lội tin ghim / kênh announcement; **14.3%** tag bot.
  - **Thời gian tiêu tốn:** 
    - **61.9% (13/21)** học viên mất từ 5 đến hơn 15 phút (trong đó có bạn hoàn toàn không tìm ra và phải chờ người khác hỗ trợ). Chỉ có **19.0%** tìm thấy dưới 2 phút.
  - **Độ chính xác và trải nghiệm với Bot:** 
    - **52.4% (11/21)** học viên nhận kết quả thất bại ở lần gần nhất hỏi bot (33.3% mơ hồ/lệch trọng tâm; 9.5% sai hạn/sai link; 9.5% đơ/không phản hồi).
    - **61.9% (13/21)** từng trực tiếp gặp sự cố do bot (38.1% đưa sai link; 38.1% bịa quy định tính điểm/XP; 28.6% hướng dẫn sai format).
  - **Hậu quả ghi nhận:** 
    - **71.4% (15/21)** chịu ảnh hưởng tiêu cực (33.3% hoang mang phải hỏi lại bạn bè/TA; 28.6% nộp sát giờ hoặc nộp muộn; 9.5% nộp nhầm file/format).
  - **Trích dẫn định tính nguyên văn nổi bật:**
    > *"Hỏi bot thì bot tự chế ra barem điểm không hề có trên lớp làm mình hoảng loạn... Rào cản lớn nhất là thông tin nằm rải rác mỗi nơi một mẩu và không có trang tổng hợp chuẩn xác."*  
    > *"Bot quăng ra một link form đã đóng từ kỳ trước... nộp sát nút chỉ còn đúng 2 phút là đóng cổng."*  
    > *"Công cụ tự động không hiệu quả, học viên buộc phải làm phiền lẫn nhau và làm phiền TA để check thông tin."*

### 🟪 03 · LÁT CẮT & AUTOMATION
* **Lát cắt MỘT CÂU:**  
  > *Nhiều kênh thông báo → Một quyết định AI có căn cứ → Một lịch deadline chung dễ theo dõi.*
  > *(Bot gom deadline từ các kênh được cho phép vào `#deadline-hub`, đưa mục đủ nguồn lên calendar và giữ mục mơ hồ/sai lệch để TA xác nhận).*
* **Luồng xử lý cốt lõi (User Flow):**  
  `Bot quét các kênh được cho phép` → `Nhận diện tên bài, ngày giờ và đối tượng` → `Gộp bản trùng, đối chiếu nguồn mới nhất` → `Đưa deadline có căn cứ lên danh sách + calendar`.
* **Bộ quy tắc phản hồi (Guardrails):**
  1. **PUBLISHED (Đủ căn cứ):** Có tên bài, ngày giờ và nguồn còn hiệu lực → tạo card + sự kiện calendar kèm căn cứ.
  2. **NEEDS REVIEW (Thiếu/xung đột dữ kiện):** Giữ khỏi calendar và nhờ TA xác nhận (HAX G10).
  3. **NO GROUNDING (Không có nguồn):** Không tạo deadline, cho phép gửi nguồn chính thức (HAX G1, G2; PAIR Graceful Failure).
  4. **HUMAN REVIEW (Bị báo sai):** Gắn `Đang xác minh`; bot không tự sửa và TA quyết định cuối (HAX G9).
* **Mức tự động hóa:** `Augment + Conditional automation`; bot tự gộp/sắp xếp khi đủ căn cứ, còn học viên/TA giữ quyết định ở các trường hợp rủi ro.

### 🟧 04 · NGƯỜI THỬ & PHÂN CÔNG
* **Willing users (Người dùng thử nghiệm):** Tối thiểu 2–3 học viên ngoài nhóm sẵn sàng test trực tiếp trên server Discord học tập.
* **Phân công trách nhiệm:**
  - **Lưu Xuân Dũng:** Team Lead · AI Engineer (Prompt, RAG Pipeline & Guardrails).
  - **Trương Thị Lan Anh:** System · Prototype (Discord Bot, Webhook & Conditional Flow).
  - **Nguyễn Duy Khánh:** Product · UX/UI · Spec (Khảo sát, Output Format, spec.md).
  - **Tạ Quang Dũng:** Data · QA · Golden Set (Thu thập log, Test cases, Eval script).

---

## ⏰ 3. TIẾN ĐỘ 6 CHECKPOINTS

- [x] **CP1 (19:30 · 16/9):** Nộp Form CP1 (Canvas 4 ô, Repo Public, Khai báo 2 Willing users).
- [x] **CP2 (21:00 · 16/9):** Working Mock `#deadline-hub` + calendar bấm thông suốt 4 luồng; đã cập nhật `spec.md` §4/§6. *(Chờ đội trưởng commit/push repo và nộp form.)*
- [ ] **CP3 (16:00 · 17/9):** Video 30s AI chạy thật + Bảng đo lượt 1 trên Golden Set.
- [ ] **CP4 (21:00 · 17/9):** Chốt spec.md hoàn chỉnh + Khoá Quality Bar bằng %.
- [ ] **CP5 (13:00 · 18/9):** demo-slides.pdf 6 trang + Video backup + Validation log R6.
- [ ] **CP6 (17:30 · 18/9):** Thuyết trình Vòng cụm E403 & Chung kết.

---

## 🚀 4. HƯỚNG DẪN TRẢI NGHIỆM PROTOTYPE (CHO CP2)

- **Mở ngay:** [`codebase/index.html`](./codebase/index.html) — chạy trực tiếp trên trình duyệt, không cần cài đặt.
- **Kịch bản demo 30–45 giây:** [`codebase/README.md`](./codebase/README.md).
- **Kế hoạch và tiêu chí nghiệm thu:** [`CHECKPOINT_2_PLAN.md`](./CHECKPOINT_2_PLAN.md).
- **Tài liệu hướng dẫn chi tiết:** [`HUONG_DAN_PROTOTYPE_CHO_LAN_ANH.md`](./HUONG_DAN_PROTOTYPE_CHO_LAN_ANH.md).

Prototype CP2 là **Working Mock** của kênh `#deadline-hub`: tổng hợp, lọc, mở card/calendar, xem nguồn, chạy bốn nhánh và báo sai đều tương tác thật bằng HTML/CSS/JavaScript; dữ liệu, confidence, AI/RAG, Discord/Calendar API và webhook TA đang được mô phỏng. Mức tự động hóa là **Augment + Conditional automation** vì sai deadline có cost-of-error cao: bot chỉ công bố khi đủ căn cứ, còn TA giữ quyền quyết định ở ngoại lệ.
