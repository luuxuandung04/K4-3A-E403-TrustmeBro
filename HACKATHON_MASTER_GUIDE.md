# HACKATHON MASTER GUIDE — TỔNG HỢP TOÀN BỘ QUY CHUẨN & KẾ HOẠCH
> **Sự kiện:** Mini Hackathon AI Batch 04 · Lớp 3A · Phòng E403  
> **Thời lượng:** 47,5 giờ (Từ 18:00 ngày 16/9 đến 17:30 ngày 18/9/2026)  
> **Tên nhóm:** Trustmebro | **Phòng:** E403 | **Lớp:** 3A  
> **Tệp này chứa toàn bộ:** Thông tin nhóm, Luật chơi, Rubric 100 điểm, Lịch 6 Checkpoint, Khung Spec chuẩn và Nội dung nộp ngay cho CP1.

---

## 1. 👥 THÔNG TIN NHÓM & PHÂN CÔNG VAI TRÒ (4 THÀNH VIÊN)

> ⚠️ **Quy tắc Vibe-Coding:** Giám khảo có thể hỏi vấn đáp bất kỳ thành viên nào tại CP6 về phần việc có tên mình. Không giải thích được phần việc của mình = 0 điểm cá nhân.  
> ⚠️ **Đội trưởng nộp form:** Bạn **Lưu Xuân Dũng** (Mã SV: `2A202602746`) nộp form thay cả nhóm ở cả 5 mốc CP1–CP5 bằng duy nhất mã SV này.

| Họ và Tên | Mã Sinh Viên | GitHub Username | Vai trò chính | Phần việc đảm nhiệm cụ thể trong dự án |
|---|---|---|---|---|
| **Lưu Xuân Dũng** *(Đội trưởng)* | **2A202602746** | `luuxuandung04` | **Team Lead · AI Engineer** | • Nộp form cả 5 checkpoint bằng mã SV `2A202602746` đúng hạn.<br>• Quản trị Repo GitHub mới, git flow, commit history (R7).<br>• Thiết kế Prompt hệ thống, Pipeline RAG và Guardrails chống bịa đặt (Zero Hallucination).<br>• Thuyết trình chính tại CP6 và điều phối trả lời Q&A. |
| **Trương Thị Lan Anh** | **2A202602451** | `SxAinsworth` | **System · Prototype** | • Xây dựng và tích hợp Clickable Prototype / Discord Bot cho CP2.<br>• Tích hợp webhook thông báo và luồng xử lý có điều kiện (Conditional Retrieval).<br>• Thể hiện các điểm chạm nguyên tắc HAX/PAIR (G1, G2, G9, G10, G11) trực quan trên giao diện.<br>• Thiết kế Slide 6 trang PDF (`demo-slides.pdf`) chuẩn rubric cho CP5. |
| **Nguyễn Duy Khánh** | **2A202602736** | `nguyenkhanhbh01989` | **Product · UX/UI · Spec** | • Phân tích dữ liệu khảo sát người dùng (N = 21), trích xuất bằng chứng định lượng & định tính (R1).<br>• Thiết kế chuẩn format câu trả lời của Bot và tài liệu bàn giao `spec.md` 9 phần chuẩn.<br>• Điều phối quy trình thử nghiệm người dùng 5 nhịp (R6 bonus +8đ). |
| **Tạ Quang Dũng** | **2A202602588** | `taquangdung123` | **Data · QA · Golden Set** | • Thu thập log thông báo chính thức, làm sạch dữ liệu nguồn sự thật.<br>• Xây dựng bộ test case Golden Set ≥20 cases phủ 4 lớp chỗ khó (R4).<br>• Viết script đo kiểm tự động và đánh giá độ chuẩn xác, đối chiếu Quality Bar (CP3 & CP4). |

---

## 2. 📁 QUY ĐỊNH REPO MỚI & BẢO MẬT DỮ LIỆU

1. **Tạo repo mới hoàn toàn trên GitHub:**
   - **Tên repo chuẩn:** `K4-3A-E403-Trustmebro`
   - **Chế độ:** Phải để **Public (Công khai)**. Mở thử bằng trình duyệt ẩn danh, nếu thấy được repo thì mới đạt.
   - **Cấm Fork/Clone repo gốc rồi push:** Vì sẽ kéo theo thư mục `data/` lên mạng công cộng, vi phạm quy chế bảo mật khoá học.
2. **Cấu trúc Repo chuẩn bắt buộc:**
   ```
   K4-3A-E403-Trustmebro/
   ├── README.md          ← Bảng thành viên và phân công ở đầu (copy mẫu bên dưới)
   ├── spec.md            ← AI Spec hoàn chỉnh 9 phần theo template
   ├── demo-slides.pdf    ← Slide 6 trang xuất PDF nộp tại CP5
   ├── codebase/          ← Mã nguồn prototype (ghi rõ phần nào mock, phần nào gọi AI thật)
   ├── eval/              ← Bộ golden_set.json/csv + bảng kết quả các lượt chạy đo kiểm
   ├── validation/        ← Nhật ký thử nghiệm người dùng ngoài nhóm (R6 bonus)
   └── reflection/        ← 4 file suy ngẫm cá nhân (mỗi người 1 file md)
   ```
3. **Bảo mật dữ liệu:**
   - Tuyệt đối không commit thư mục `data/` lên GitHub.
   - Không commit API Key / file `.env` lên GitHub (sử dụng biến môi trường hoặc nhập key trên UI khi demo).
   - Dữ liệu trích dẫn chỉ được lấy vài dòng ngắn minh hoạ, ẩn danh danh tính (`S####`, `[HV]`).

---

## 3. ⏰ LỊCH TRÌNH 6 CHECKPOINTS (CỰC KỲ QUAN TRỌNG)

> ⚠️ **Quy tắc chấm điểm mốc:** CP1 đến CP5 mỗi mốc 5 điểm (Tổng 25 điểm). **Nộp đúng hạn = 5 điểm, nộp trễ = 0 điểm**. Không gỡ được bằng mốc khác.

| Mốc | Thời hạn | Sản phẩm cần nộp | Tiêu chí đạt |
|---|---|---|---|
| **CP1** | **19:30 · 16/9** *(GẤP)* | • Form CP1 do Đội trưởng nộp.<br>• Canvas 7 dòng (xem mục 6 bên dưới).<br>• Link GitHub public mới.<br>• Khai báo **≥2 Willing Users** (người đồng ý test ở CP5). | Link mở ẩn danh được, đủ 7 dòng canvas, đủ tên 2 willing users. |
| **CP2** | **21:00 · 16/9** | • Luồng hoạt động bấm được: Figma / Web tĩnh / video quay màn hình.<br>• Commit đầu tiên trên repo GitHub. *(Chưa cần AI chạy thật)*. | Bấm qua lại thông suốt toàn bộ luồng chính, repo có commit. |
| **CP3** | **16:00 · 17/9** | • **Video 30 giây** quay màn hình AI chạy thật (bấm thật, ra kết quả thật, không hardcode).<br>• **Bảng số đo lượt 1** trên Golden Set (thử bao nhiêu câu, đúng bao nhiêu câu). | ≥1 lời gọi AI thật ở quyết định trung tâm; có file golden set và bảng số liệu thật trong `eval/`. |
| **CP4** | **21:00 · 17/9** *(HẠN CHỐT SPEC)* | • Chốt file `spec.md` hoàn chỉnh.<br>• **Khoá Quality Bar bằng %** (ví dụ: ≥80% đạt, 0% bịa thông tin). Sau 21:00 cấm sửa.<br>• Khai báo các phần chưa xong (khai thiếu không bị trừ điểm, giấu mới trừ). | Đủ 9 phần spec; quality bar bằng số rõ ràng; push lên repo trước 21:00. |
| **CP5** | **13:00 · 18/9** *(HẠN NỘP CUỐI)* | • **`demo-slides.pdf`** (đúng 6 trang theo quy định).<br>• **Video demo dự phòng** (quay sẵn phòng khi demo live mạng đứt).<br>• Thư mục `validation/` (nếu lấy bonus R6). Sau mốc này đóng repo. | Có file PDF, có video backup, dry run bấm giờ xong. |
| **CP6** | **17:30 · 18/9** | • **Thuyết trình Vòng cụm E403 (6 phút)** → Chọn top 1 vào **Chung kết phòng (10 phút: 7' pitch + 3' Q&A)**.<br>• Trả lời **Thẻ giám khảo** (chạy test 1 case lạ tại chỗ). | Mọi thành viên đều nói; giải thích được luồng AI; demo live không chết. |

---

## 4. 📊 RUBRIC 100 ĐIỂM (CƠ CẤU CHI TIẾT)

- **25 Điểm:** Nộp đúng hạn 5 Checkpoints (CP1 đến CP5, mỗi mốc 5đ).
- **67 Điểm Chấm Tài Liệu Repo:**
  - **R1 · Bằng chứng & Impact (15đ):** 
    - Evidence chuẩn A (khảo sát ≥20 người ngoài nhóm, ≥50% xác nhận, log đầy đủ) hoặc chuẩn B (mining số đếm + ≥5 quote nguyên văn) [6đ].
    - Pain cụ thể: Ai — làm gì — vướng đâu — hậu quả gì [3đ].
    - Bảng impact ≥3 ứng viên có con số (số người × tần suất × tốn gì) [3đ].
    - Ứng viên bị loại giữ lại + lý do chọn bằng số [3đ].
  - **R2 · Lát cắt & Thiết kế (15đ):**
    - Lát cắt MỘT CÂU đúng chuẩn (1 user · 1 việc · 1 quyết định AI · 1 kết quả) [3đ].
    - ≥3 Non-goals [2đ].
    - Automation chọn rõ (Augment / Conditional / Automate) + lý do theo cost-of-error [4đ].
    - ≥4 nguyên tắc HAX/PAIR, trỏ đúng vị trí trong UI [6đ].
  - **R3 · Chỗ khó & Kịch bản rủi ro (11đ):**
    - 4 lớp chỗ khó cụ thể hoá (① Nguồn sự thật, ② Mơ hồ, ③ Ngoài thẩm quyền, ④ Domain) [4đ].
    - ≥8 kịch bản rủi ro có hành vi mong muốn [4đ].
    - 4 đường đi trải nghiệm (Happy path / Low-confidence / Failure / Correction) [3đ].
  - **R4 · Kiểm thử & Golden Set (15đ):**
    - Golden Set ≥20 cases (≥2 case/lớp chỗ khó, 8-10 thường, 2-4 hiếm; ≥10 từ log thật) [4đ].
    - Chiều chất lượng định nghĩa kiểm chứng được [4đ].
    - Quality Bar bằng con số % chốt từ CP4 [3đ].
    - Bảng kết quả chạy trọn bộ ≥1 lượt có % đối chiếu bar, phân tích case fail [4đ].
  - **R5 · Prototype chạy được (8đ):**
    - Chạy end-to-end theo lát cắt, không can thiệp tay [3đ].
    - ≥1 lời gọi AI thật ở quyết định trung tâm [3đ].
    - Mức prototype khớp khai báo [2đ].
  - **R7 · Quy trình & Repo (3đ):** Đủ thư mục chuẩn, README có phân công rõ tên.
- **+8 Điểm Bonus R6 (Cho người ngoài dùng thử - Không làm trần 92đ):**
  - Nhật ký thử nghiệm ≥2 người ngoài nhóm theo quy trình 5 nhịp (task, quan sát, quote nguyên văn) [4đ].
  - ≥1 thay đổi từ feedback được ghi vào §9 Changelog [4đ].

---

## 5. 🎯 ĐỀ XUẤT LÁT CẮT & CHIẾN LƯỢC DỰ ÁN (TRACK B1)

Nhóm nên chọn **Track B1 — Tối ưu Trợ lý Discord (Hỏi Logistics & Deadline)** vì:
- Dữ liệu `data/discord-pack/` có sẵn 1.092 tin nhắn thực tế của khoá 4.
- Bot cũ có lỗi thật (bịa deadline, chèn text sai, trả lời lan man).
- Cả lớp 3A phòng E403 là người dùng thật, khảo sát 20 người trong 15 phút.

**Định nghĩa Lát cắt MỘT CÂU:**
> *Một học viên · hỏi hạn nộp bài hoặc thông tin bài tập trên Discord · AI bot phân loại intent và chỉ trích xuất câu trả lời từ thông báo chính thức, nếu không đủ căn cứ sẽ từ chối bịa và tag TA trực ca · học viên nhận đúng deadline và không bị mất điểm oan do nộp trễ.*

**4 Lớp chỗ khó cụ thể hoá:**
1. **① Nguồn sự thật:** Học viên hỏi deadline bài chưa có thông báo -> Bot nói rõ "Chưa có thông báo chính thức, hãy theo dõi kênh #thong-bao" thay vì tự bịa ngày.
2. **② Mơ hồ / Thiếu thông tin:** Học viên hỏi "Bao giờ nộp bài?" -> Bot hỏi lại: "Bạn đang hỏi hạn nộp Lab 2 hay Quiz 1?".
3. **③ Ngoài phạm vi / Thẩm quyền:** Học viên yêu cầu "Xem điểm danh của tôi" -> Bot từ chối lịch sự, gửi link xem bảng điểm cá nhân hoặc hướng dẫn mở ticket.
4. **④ Đặc thù Domain:** Deadline lớp 3A khác 3B -> Bot đối chiếu đúng role của học viên trong server.

---

## 6. 📋 CANVAS 4 Ô — CHECKPOINT 1 (CẬP NHẬT CHUẨN N = 21)

### 🟩 01 · NGƯỜI DÙNG & NỖI ĐAU
* **Người dùng:** Học viên các khóa học AI / Công nghệ đang thực hiện Lab, Quiz, Assignment và Capstone Project trên nền tảng Discord.
* **Pain (Nỗi đau thực tế):**
  - Thông báo quan trọng bị trôi rất nhanh giữa hàng trăm tin nhắn thảo luận chung; thiếu một nơi lưu trữ / dashboard tập trung cố định.
  - Bot hỗ trợ hiện tại hoạt động thiếu tin cậy: trả lời lan man, cung cấp link form cũ đã đóng, hoặc tự bịa barem điểm / quy định tính XP không có thật.
  - Mất rất nhiều thời gian tra cứu (61.9% học viên mất từ 5 phút đến hơn 15 phút, thậm chí không tự tìm ra).
* **Hậu quả:**
  - Nộp bài sát nút, nộp muộn do nhầm hạn, hoặc nộp sai định dạng / sai link dẫn đến mất điểm và phải xin nộp lại.
  - Học viên hoang mang, mất niềm tin vào công cụ tự động, tạo gánh nặng phải giải đáp thủ công lặp đi lặp lại lên TA và Mentor.

### 🟦 02 · BẰNG CHỨNG BAN ĐẦU (Khảo sát N = 21)
* **Hành vi tìm kiếm thông tin:**
  - 47.6% (10/21) chọn gõ từ khóa tìm kiếm trên Discord đầu tiên nhưng thường bị ngợp vì kết quả quá loãng.
  - 14.3% nhắn tin hỏi bạn bè; 14.3% lội tin ghim / announcement; 14.3% tag bot.
* **Thời gian tiêu tốn:** 61.9% (13/21) học viên mất từ 5 đến hơn 15 phút. Chỉ có 19.0% tìm thấy dưới 2 phút.
* **Độ chính xác và trải nghiệm với Bot:**
  - 52.4% (11/21) học viên nhận kết quả thất bại ở lần gần nhất hỏi bot (33.3% mơ hồ; 9.5% sai hạn/sai link; 9.5% không phản hồi).
  - 61.9% (13/21) từng trực tiếp gặp sự cố do bot: 38.1% sai link nộp; 38.1% bịa quy định tính điểm/XP; 28.6% sai format.
* **Hậu quả ghi nhận:** 71.4% (15/21) chịu ảnh hưởng tiêu cực (33.3% hoang mang phải hỏi lại; 28.6% nộp sát giờ/nộp muộn; 9.5% nhầm file).
* **Trích dẫn nguyên văn:**
  > *"Hỏi bot thì bot tự chế ra barem điểm không hề có trên lớp làm mình hoảng loạn... Rào cản lớn nhất là thông tin nằm rải rác mỗi nơi một mẩu và không có trang tổng hợp chuẩn xác."*  
  > *"Bot quăng ra một link form đã đóng từ kỳ trước... nộp sát nút chỉ còn đúng 2 phút là đóng cổng."*  
  > *"Công cụ tự động không hiệu quả, học viên buộc phải làm phiền lẫn nhau và làm phiền TA để check thông tin."*

### 🟪 03 · LÁT CẮT & AUTOMATION
* **Lát cắt:** Một câu hỏi → Một quyết định logic → Một câu trả lời chính xác có trích dẫn nguồn.
* **User Flow:** Học viên hỏi deadline/link/quy chế → AI nhận diện intent, tuần học, đối tượng → Đối chiếu kho dữ liệu thông báo chính thức mới nhất → Trả lời ngắn gọn kèm link nguồn đối chứng.
* **Bộ quy tắc phản hồi (Guardrails):**
  - **FOUND (Đủ căn cứ):** Trả lời trực tiếp hạn chót/link + đính kèm trích dẫn (link tin nhắn gốc/kênh #announcement).
  - **CLARIFY (Thiếu dữ kiện):** Phản hồi nhanh yêu cầu học viên chọn đúng đợt bài cần tra cứu (HAX G10).
- **NOT FOUND (Chưa có thông báo):** Tuyệt đối không bịa đặt (Zero Hallucination), nêu rõ giới hạn/độ bất định và đề xuất tag TA (HAX G1, G2; PAIR Graceful Failure).
* **Mức tự động hóa:** Augment; Conditional Retrieval và Link Validity Check là cơ chế nội bộ, còn học viên/TA giữ quyết định cuối cùng.

### 🟧 04 · NGƯỜI THỬ & PHÂN CÔNG
* **Willing users:** Tối thiểu 2–3 học viên ngoài nhóm sẵn sàng test trên Discord.
* **Phân công 4 thành viên:**
  - Lưu Xuân Dũng: Team Lead · AI Engineer (Prompt, RAG Pipeline & Guardrails).
  - Trương Thị Lan Anh: System · Prototype (Discord Bot, Webhook & Conditional Flow).
  - Nguyễn Duy Khánh: Product · UX/UI · Spec (Khảo sát, Output Format, spec.md).
  - Tạ Quang Dũng: Data · QA · Golden Set (Thu thập log, Test cases, Eval script).

---

## 7. 📄 MẪU TEMPLATE `spec.md` (9 PHẦN CHUẨN ĐỂ ĐƯA VÀO REPO MỚI)

*(Tạo file `spec.md` trong repo mới và paste nội dung dưới đây vào)*

```markdown
# AI SPEC — Discord Deadline & Logistics Guard · Nhóm Trustmebro · E403
Hướng: [x] B — Trợ lý Học viên (Discord)
Loại: [x] Tối ưu tính năng có sẵn

## §1. User & Job
- Job executor: Học viên khoá AI Thực Chiến đang làm bài tập và cần xác nhận hạn nộp hoặc link nộp bài.
- Core JTBD: Xác định chính xác hạn chót và yêu cầu nộp bài mà không cần đọc lội ngược hàng trăm tin nhắn bị trôi.
- Problem statement: Học viên hỏi thông tin bài tập trên Discord thường nhận được câu trả lời suy đoán hoặc bị trôi tin nhắn, dẫn đến nộp muộn hoặc nộp sai kênh và bị trừ điểm.
- Evidence (chuẩn A/B):
  - Số liệu mining (n = 1092 tin nhắn trong discord-pack): 35% tin nhắn xoay quanh việc hỏi deadline, điểm danh, link nộp bài.
  - ≥5 trích dẫn nguyên văn từ log thật:
    1. "Mọi người cho mình hỏi lab 2 hạn mấy giờ nộp thế?"
    2. "Bot ơi deadline quiz 1 là hôm nay hay ngày mai?"
    3. "Link nộp bài ở đâu vậy ạ bot trả lời chung chung quá"
    4. "Sao bot bảo hạn 23:59 mà form đóng lúc 21:00 rồi?"
    5. "Trợ lý ơi check hộ mình điểm danh hôm nay với"

## §2. Impact & Quyết định chọn
- Bảng impact 3 ứng viên:
  | Ứng viên tính năng | Số người gặp | Tần suất | Tổn thất mỗi lần | Khả thi build |
  |---|---|---|---|---|
  | 1. Xác thực deadline từ thông báo chính thức | ~1000 học viên | Hàng ngày | Mất 5-10 điểm bài nộp do trễ hạn | Rất cao |
  | 2. Tự động trả lời giải thích code/bài giảng | ~600 học viên | 2-3 lần/tuần | Mất 15 phút chờ TA | Trung bình |
  | 3. Tự tổng hợp bản tin Discord cuối ngày | 10 TA/Mod | 1 lần/ngày | Tốn 30 phút rà soát tin tồn | Khá phức tạp |
- Ứng viên ĐÃ LOẠI: Ứng viên 2 và 3 vì phạm vi quá rộng, rủi ro ảo giác cao và khó kiểm thử chặt trong 47.5h.
- Ứng viên CHỌN: Ứng viên 1 vì giải quyết trực tiếp rủi ro mất điểm của học viên, chi phí sai sót (cost-of-error) cao nhất và có bằng chứng rõ ràng nhất.

## §3. Giải pháp tương tự đã nghiên cứu
- Discord Forum Bot: Flow tìm kiếm từ khoá / Đáng học: trích dẫn link tin nhắn gốc / Đáng né: trả lời sai khi có 2 thông báo cập nhật / Khác biệt: Bot của nhóm có cơ chế kiểm tra tính mới nhất của thông báo.
- Khanmigo: Flow đối thoại gợi mở / Đáng học: hỏi lại khi câu hỏi chưa rõ ý / Đáng né: quá dài dòng khi hỏi việc cần ngắn gọn / Khác biệt: Tối ưu cho tác vụ logistics (ngắn gọn, chính xác 100%).

## §4. Thiết kế
- Lát cắt MỘT CÂU: Một học viên · hỏi hạn nộp bài trên Discord · AI bot phân loại intent và chỉ trả lời khi có căn cứ từ kênh thông báo chính thức, nếu thiếu thông tin sẽ từ chối bịa và tag TA · học viên nhận đúng deadline và không bị mất điểm oan.
- Non-goals:
  1. KHÔNG giải đáp kiến thức chuyên sâu về bài giảng trong tính năng này.
  2. KHÔNG can thiệp vào cơ sở dữ liệu chấm điểm hay sửa quyền nộp bài của học viên.
  3. KHÔNG tự động gửi tin nhắn riêng (DM) làm phiền học viên.
- Mức prototype nhắm tới: [x] Mock — Phần giao diện chat và dữ liệu thông báo được mock; phần phân loại intent, trích xuất căn cứ và quyết định fallback được gọi AI thật.
- Automation: [x] Augment — Bot tìm và trình bày căn cứ; người học xác nhận trước khi nộp và TA quyết định khi thiếu nguồn/bị báo sai. Conditional Retrieval là cơ chế nội bộ vì báo sai deadline gây thiệt hại điểm số trực tiếp.
- §4b. Nguyên tắc HAX/PAIR áp dụng:
  | Nguyên tắc | Áp cụ thể vào đâu trong prototype |
  |---|---|
  | **HAX G1** (Làm rõ khả năng) | Dòng chào đầu: "Tôi hỗ trợ tra cứu deadline và thông báo chính thức của lớp 3A". |
| **HAX G2** (Làm rõ hệ thống làm tốt tới đâu) | Hiển thị trạng thái mức tin cậy cao/thấp/không đủ căn cứ trên từng kết quả. |
| **HAX G10** (Thu hẹp khi nghi ngờ) | Khi câu hỏi thiếu tên bài: Hỏi lại "Bạn muốn tra cứu hạn Lab 2 hay Quiz 1?" |
| **HAX G11** (Giải thích vì sao hệ thống hành động) | Kèm thông báo nguồn, timestamp và lý do chọn bản mới nhất. |
| **HAX G9** (Hỗ trợ sửa sai hiệu quả) | Có nút "Báo sai / Sửa kết quả" để gắn cờ và chuyển toàn bộ ngữ cảnh cho TA. |

## §5. Kiểu lỗi — 4 lớp chỗ khó & Kịch bản rủi ro (≥8)
| # | Tình huống cụ thể | Lớp chỗ khó | Hành vi mong muốn của AI | Nguyên tắc |
|---|---|---|---|---|
| 1 | Hỏi deadline của bài Lab chưa từng được công bố | ① Nguồn sự thật | "Hiện chưa có thông báo chính thức về bài này. Vui lòng đợi BTC cập nhật." | HAX G10 |
| 2 | Hai thông báo có 2 deadline khác nhau (bản gia hạn) | ① Nguồn sự thật | Lấy thông báo có timestamp mới nhất và ghi chú "Đã được gia hạn". | HAX G2 |
| 3 | Học viên chỉ gõ: "Bao giờ nộp?" | ② Mơ hồ | Hỏi lại: "Bạn cần kiểm tra hạn nộp của Lab 2, Quiz 1 hay Hackathon?" | HAX G10 |
| 4 | Học viên gõ tin nhắn cụt: "alo hạn" | ② Mơ hồ | Đưa ra danh sách 3 deadline gần nhất kèm nút chọn nhanh. | PAIR Feedback |
| 5 | Học viên yêu cầu: "Điểm danh hộ mình với bot" | ③ Ngoài thẩm quyền | Từ chối: "Bot không có quyền điểm danh. Bạn vui lòng quét mã QR tại lớp." | HAX G1 |
| 6 | Học viên hỏi: "Review code bài này giúp mình" | ③ Ngoài thẩm quyền | Từ chối khéo và hướng dẫn đặt câu hỏi tại kênh #thao-luan-hoc-tap. | HAX G1 |
| 7 | Học viên lớp 3A hỏi nhưng xem nhầm lịch lớp 3B | ④ Domain | Kiểm tra role học viên, cảnh báo: "Lưu ý đây là lịch của lớp 3A, không áp dụng cho lớp 3B." | PAIR Context |
| 8 | Học viên hỏi deadline sau khi form đã đóng | ④ Domain | Báo rõ: "Form nộp bài đã đóng vào lúc 21:00 hôm qua. Hãy liên hệ TA nếu có sự cố." | HAX G11 |

## §6. Bốn đường đi của trải nghiệm
- Happy path: Học viên hỏi rõ "Hạn nộp Lab 2 lớp 3A khi nào?" -> Bot trích dẫn thông báo mới nhất, trả lời giờ chính xác kèm link form.
- Low-confidence (②): Câu hỏi không rõ tên bài -> Bot liệt kê 2 bài tập gần nhất kèm nút bấm xác nhận.
- Failure/Không căn cứ (①): Câu hỏi về việc chưa thông báo -> Bot từ chối bịa, hiển thị nút "Tag TA hỗ trợ".
- Correction (Người dùng sửa): Học viên bấm "Thông tin này sai rồi" -> Bot xin lỗi, mở form phản hồi nhanh và tag TA vào luồng.

## §7. Kiểm thử
- Chiều chất lượng: 
  1. *Factuality (Tính chính xác nguồn):* 100% câu trả lời deadline phải khớp chính xác với thông báo nguồn, không được sai lệch dù chỉ 1 phút.
  2. *Refusal Accuracy (Độ chính xác từ chối):* 100% case không có nguồn hoặc ngoài thẩm quyền phải được từ chối an toàn.
- Golden Set (20 cases trong `eval/golden_set.json`):
  - 4 cases Nguồn sự thật (có mâu thuẫn/không có nguồn).
  - 4 cases Mơ hồ/thiếu thông tin.
  - 3 cases Ngoài thẩm quyền.
  - 3 cases Đặc thù domain (lớp 3A/3B).
  - 6 cases Happy path chuẩn.
- Quality Bar (Chốt từ CP4): **"Đạt khi ≥ 85% case kiểm thử vượt qua bộ Golden Set, và 0% case bịa đặt deadline sai."**
- Kết quả chạy: (Cập nhật sau lượt đo CP3 và CP4).

## §8. Phân công & Kế hoạch
- Phân công: 
  - Spec & Slides: Trương Thị Lan Anh
  - Evidence & Golden Set & R6: Nguyễn Duy Khánh
  - AI Pipeline & Eval script: Tạ Quang Dũng
  - Codebase & Demo lead: Lưu Xuân Dũng
- Willing users: (2 người bạn ngoài nhóm đã khai tại CP1).

## §9. Changelog
| Thời điểm | Đổi gì | Vì sao (trỏ về feedback/case nào) |
|---|---|---|
| CP1 | Khởi tạo Spec v1.0 | Chốt hướng Track B1 |
```
