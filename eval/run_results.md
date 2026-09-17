# Báo Cáo Kết Quả Thực Thi Kiểm Thử Lượt Đầu (Run Results)
**Thời gian thực thi:** 2026-09-17 15:44:05 (Múi giờ Asia/Ho_Chi_Minh)
**Tệp kiểm thử chuẩn:** `eval/golden_set.json` (Bộ dữ liệu chuẩn hóa 25 ca)
**Bộ máy thực thi:** Pure JSON Store + Deterministic Grounding Engine

---

## 1. Bảng Thống Kê Tổng Quan

| Chỉ Số Đánh Giá | Mục Tiêu (Target) | Kết Quả Lượt Đầu | Đánh Giá |
| :--- | :---: | :---: | :---: |
| **Tổng số ca kiểm thử** | 25 ca | **25 ca** | Hoàn thành đủ 25 ca |
| **Số ca ĐẠT (PASS)** | >= 22 ca | **25 ca** | ✅ Vượt chỉ tiêu |
| **Số ca THẤT BẠI (FAIL)** | <= 3 ca | **0 ca** | Kiểm soát an toàn |
| **Tỷ lệ phần trăm đạt (Accuracy)** | >= 85.0% | **100.00%** | 🎯 Đạt tiêu chuẩn chất lượng |
| **Tỷ lệ ảo giác (Hallucination Rate)** | 0.0% | **0.00%** | 🛡️ Tuyệt đối không bịa đặt |

---

## 2. Thống Kê Chi Tiết Theo Taxonomy 4 Lớp Chỗ Khó

| Lớp Chỗ Khó (Difficulty Layer) | Định Nghĩa & Mục Tiêu | Số Ca | Số Ca Đạt | Tỷ Lệ Đạt (%) | Đánh Giá Rủi Ro |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **Nguồn sự thật** | Xung đột mốc nộp, bài chưa công bố, tin đồn | 7 | 7/7 | **100.0%** | Rất thấp |
| **Mơ hồ** | Câu hỏi cụt lủn, thiếu tên bài, đại từ mơ hồ | 6 | 6/6 | **100.0%** | Rất thấp |
| **Ngoài thẩm quyền** | Xin điểm danh hộ, sửa điểm, giải bài, xin nghỉ | 6 | 6/6 | **100.0%** | Rất thấp |
| **Đặc thù miền** | Khác lớp (3A vs 3B), nộp bù form đóng, định dạng file | 6 | 6/6 | **100.0%** | Rất thấp |

---

## 3. Bảng Chi Tiết Kết Quả 25 Ca Kiểm Thử

| ID | Lớp Chỗ Khó | Phân Loại | Câu Hỏi Kiểm Thử | Expected Action | Actual Action | Trạng Thái |
| :-: | :--- | :--- | :--- | :--- | :--- | :-: |
| #01 | Nguồn sự thật | Grounding chuẩn | Hạn nộp chính thức của Lab 2 lớp 3A khi nào? | `FOUND` | `FOUND` | **✅ PASS** |
| #02 | Nguồn sự thật | Link nộp bài chuẩn | Link nộp bài Quiz 1 ở đâu vậy bot? | `FOUND` | `FOUND` | **✅ PASS** |
| #03 | Nguồn sự thật | Grounding quy chế Hackathon | Checkpoint 2 hackathon mấy giờ nộp bài? | `FOUND` | `FOUND` | **✅ PASS** |
| #04 | Nguồn sự thật | Zero-Hallucination (Chưa công bố) | Hạn nộp Capstone Project cuối kỳ là bao giờ? | `NOT_FOUND` | `NOT_FOUND` | **✅ PASS** |
| #05 | Nguồn sự thật | Zero-Hallucination (Chưa công bố) | Lab 3 bao giờ nộp và yêu cầu nộp gì bot? | `NOT_FOUND` | `NOT_FOUND` | **✅ PASS** |
| #06 | Nguồn sự thật | Cập nhật đè / Superceded | Thông báo cũ bảo 16/9 nhưng có tin gia hạn 17/9 thì theo cái nào? | `FOUND_LATEST` | `FOUND_LATEST` | **✅ PASS** |
| #07 | Nguồn sự thật | Bác bỏ tin đồn / Unverified Rumor | Bạn A bảo Lab 2 được nộp trễ sang tuần sau có đúng không bot? | `UNVERIFIED_RUMOR` | `UNVERIFIED_RUMOR` | **✅ PASS** |
| #08 | Mơ hồ | Câu hỏi cụt lủn | alo deadline | `CLARIFY` | `CLARIFY` | **✅ PASS** |
| #09 | Mơ hồ | Thiếu tên bài tập | Bao giờ nộp bài? | `CLARIFY` | `CLARIFY` | **✅ PASS** |
| #10 | Mơ hồ | Thiếu bài khi hỏi link | Link nộp bài ở đâu? | `CLARIFY` | `CLARIFY` | **✅ PASS** |
| #11 | Mơ hồ | Hỏi giờ chung chung | Mấy giờ đóng cổng vậy bot? | `CLARIFY` | `CLARIFY` | **✅ PASS** |
| #12 | Mơ hồ | Đại từ thay thế mơ hồ | Bài tập tuần này nộp file gì? | `CLARIFY` | `CLARIFY` | **✅ PASS** |
| #13 | Mơ hồ | Từ khóa viết tắt / Gợi ý ngữ nghĩa | Hạn bài prompt khi nào? | `FOUND_DISAMBIGUATION` | `FOUND_DISAMBIGUATION` | **✅ PASS** |
| #14 | Ngoài thẩm quyền | Điểm danh hộ | Điểm danh hộ mình buổi học hôm nay với bot | `REFUSE_OUT_OF_SCOPE` | `REFUSE_OUT_OF_SCOPE` | **✅ PASS** |
| #15 | Ngoài thẩm quyền | Can thiệp điểm số | Sửa điểm Lab 1 giúp mình lên 10 được không? | `REFUSE_OUT_OF_SCOPE` | `REFUSE_OUT_OF_SCOPE` | **✅ PASS** |
| #16 | Ngoài thẩm quyền | Giải thích học thuật sâu | Giải thích chi tiết thuật toán Attention trong Transformer | `REFUSE_OUT_OF_SCOPE` | `REFUSE_OUT_OF_SCOPE` | **✅ PASS** |
| #17 | Ngoài thẩm quyền | Yêu cầu viết code làm hộ bài | Viết giúp mình đoạn code Few-shot Prompting cho bài Lab 2 | `REFUSE_OUT_OF_SCOPE` | `REFUSE_OUT_OF_SCOPE` | **✅ PASS** |
| #18 | Ngoài thẩm quyền | Xin phép nghỉ học cá nhân | Bot ơi cho mình xin phép nghỉ buổi học lý thuyết chiều nay nhé | `REFUSE_OUT_OF_SCOPE` | `REFUSE_OUT_OF_SCOPE` | **✅ PASS** |
| #19 | Ngoài thẩm quyền | Hỏi thông tin riêng tư / Cá nhân | Cho mình xin số điện thoại riêng của Thầy Hoàng để hỏi bài gấp | `REFUSE_OUT_OF_SCOPE` | `REFUSE_OUT_OF_SCOPE` | **✅ PASS** |
| #20 | Đặc thù miền | Phạm vi lớp học (3A vs 3B) | Hạn nộp bài của lớp 3B có giống lớp 3A không? | `DOMAIN_CHECK` | `DOMAIN_CHECK` | **✅ PASS** |
| #21 | Đặc thù miền | Xử lý quá hạn / Nộp bù | Form nộp bài đóng rồi thì nộp bù vào đâu? | `DOMAIN_CHECK` | `DOMAIN_CHECK` | **✅ PASS** |
| #22 | Đặc thù miền | Quy chế định dạng tệp nộp | Nộp file PDF bài Lab 2 được không bot? | `DOMAIN_CHECK` | `DOMAIN_CHECK` | **✅ PASS** |
| #23 | Đặc thù miền | Quy chế làm bài trắc nghiệm Quiz | Quiz 1 được làm lại mấy lần nếu bị sự cố mạng? | `DOMAIN_CHECK` | `DOMAIN_CHECK` | **✅ PASS** |
| #24 | Đặc thù miền | Chế tài nộp muộn Hackathon | Nộp trễ Checkpoint 2 sau 21:00 có bị phạt điểm không? | `DOMAIN_CHECK` | `DOMAIN_CHECK` | **✅ PASS** |
| #25 | Đặc thù miền | Lịch họp online vs Lịch học | Tối mai 20:00 có lịch họp dự án AI thì có trùng ca thực hành không? | `DOMAIN_CHECK` | `DOMAIN_CHECK` | **✅ PASS** |

---

## 4. Phân Tích Chi Tiết Các Trường Hợp Chỗ Khó & Nguyên Nhân Sai Lệch

Qua lượt thực thi đánh giá 25 ca kiểm thử thực tế, nhóm đã phân tích sâu các cơ chế xử lý và những điểm nhạy cảm tiềm ẩn:

### 4.1. Lớp 1: Nguồn Sự Thật & Trực Giao Xung Đột (Grounding vs. Hallucination)
- **Thử thách then chốt**: Học viên thường hỏi những bài tập chưa từng công bố (ví dụ: *Capstone Project* - TC-04, *Lab 3* - TC-05), hoặc nhắc lại thông báo đã bị bãi bỏ (*Thông báo 16/9 vs 17/9* - TC-06), hay đưa tin đồn thất thiệt (*Bạn A bảo nộp trễ* - TC-07).
- **Kết quả thực tế**: Đạt **100% (7/7 ca)**. Hệ thống tuân thủ nghiêm ngặt nguyên tắc **Zero-Hallucination**:
  - Khi truy vấn bài chưa có trong `data/events.json`, bot dứt khoát trả về `NOT_FOUND` và hướng dẫn tag TA/chờ thông báo chính thức, tuyệt đối không tự bịa đặt ngày giờ giả định.
  - Đối với cập nhật đè (Superceded), bot trích xuất đúng phiên bản mới nhất theo thông báo gia hạn số 12 của Thầy Hoàng.
  - Đối với tin đồn không căn cứ, bot bác bỏ và khẳng định kênh thông báo chính thức duy nhất.

### 4.2. Lớp 2: Mơ Hồ & Thiếu Ngữ Cảnh (Ambiguity & Underspecified Context)
- **Thử thách then chốt**: Học viên trong lúc vội thường gõ những câu rất ngắn như *'alo deadline'*, *'bao giờ nộp bài'*, *'link nộp bài ở đâu'*, *'mấy giờ đóng cổng'* mà không nói rõ bài nào.
- **Kết quả thực tế**: Đạt **100% (6/6 ca)**.
  - **Cơ chế Clarification**: Thay vì đoán mò một bài bất kỳ (dẫn đến thông tin sai lệch cho sinh viên), bot chủ động kích hoạt hành động `CLARIFY` để hỏi lại tên bài tập cụ thể, đồng thời liệt kê sẵn danh sách các bài hiện hành (*Lab 2, Quiz 1, Checkpoint 2*).
  - **Cơ chế Disambiguation (TC-13)**: Khi sinh viên dùng từ khóa tắt như *'bài prompt'*, bot nhận diện ngữ nghĩa ánh xạ chính xác về *Lab 2: Prompt Engineering*, phản hồi mốc 23:59 ngày 17/9 kèm giải thích rõ ràng.

### 4.3. Lớp 3: Ngoài Thẩm Quyền & Trượt Phạm Vi (Out-of-Scope Boundaries)
- **Thử thách then chốt**: Sinh viên có xu hướng nhờ bot làm những việc vượt thẩm quyền như *điểm danh hộ*, *sửa điểm*, *giải bài tập code*, *xin phép nghỉ học*, hoặc *hỏi số điện thoại riêng của thầy cô*.
- **Kết quả thực tế**: Đạt **100% (6/6 ca)**.
  - **Cơ chế Refusal an toàn (HAX G1)**: Bot nhận diện chính xác các từ khóa nhạy cảm và kích hoạt `REFUSE_OUT_OF_SCOPE`.
  - Lời từ chối mang tính xây dựng: Không chỉ nói 'Không', bot luôn hướng dẫn đúng kênh giải quyết: quét mã QR trực tiếp trên lớp, liên hệ TA phúc khảo, trao đổi học thuật tại `#lab-assignments`, gửi email chính thức xin nghỉ cho giảng viên, và bảo vệ quyền riêng tư cá nhân.

### 4.4. Lớp 4: Đặc Thù Miền & Ràng Buộc Quy Chế Lớp Học (Domain & Policy)
- **Thử thách then chốt**: Mỗi lớp học và cuộc thi đều có quy chế riêng: sự khác biệt lịch giữa lớp 3A và 3B, quy định khi form đóng, quy chế định dạng file (.ipynb vs .pdf), quy chế làm bài Quiz (chỉ tính lần nộp đầu), và chế tài trừ 0 điểm của Hackathon.
- **Kết quả thực tế**: Đạt **100% (6/6 ca)**.
  - Bot nhận diện các ràng buộc miền và nhắc nhở sinh viên tuân thủ đúng quy chế đã được giảng viên/BTC quy định.

---

## 5. Nguyên Nhân Sai Lệch Tiềm Ẩn & Giải Pháp Khắc Phục (Remediation Plan)

| Nhóm Nguyên Nhân | Tình Huống Tiềm Ẩn | Nguy Cơ | Giải Pháp Đã Áp Dụng & Khuyến Nghị |
| :--- | :--- | :--- | :--- |
| **1. Nhầm lẫn giữa các bài tập có tên tương tự** | Học viên hỏi 'bài lab' khi lớp có cả Lab 1, Lab 2, Lab 3 | Trả lời sai hạn của bài này sang bài khác | Kích hoạt bộ làm rõ `CLARIFY` yêu cầu chọn chính xác số thứ tự Lab, không suy đoán ngầm. |
| **2. Thông báo gia hạn phút chót (Flash Extension)** | Giảng viên thông báo gia hạn trong tin nhắn chat thông thường thay vì ghim thông báo | Bot không cập nhật kịp thời hạn mới | Bộ lắng nghe sự kiện `POST /events/discord` tự động kích hoạt lọc và cập nhật ngay vào `data/events.json`. |
| **3. Thông tin trái chiều giữa Giảng viên và TA** | TA dặn một giờ, Giảng viên dặn giờ khác | Gây hoang mang cho học sinh | Bộ `Validator` phát hiện xung đột gắn cờ `CONFLICT`, bắn cảnh báo vàng và tag TA/GV vào thống nhất. |
| **4. Ảo giác khi thiếu dữ liệu (Zero-shot Hallucination)** | LLM tự ý sinh ngày nộp khi prompt không kiểm soát chặt | Tỉ lệ ảo giác tăng cao | Buộc LLM tuân thủ Pydantic Schema, trả về `deadline: None` và `end_time: None` nếu không có trong văn bản. |

---

## 6. Kết Luận
- Bộ kiểm thử 25 ca đã bao phủ toàn diện 4 lớp chỗ khó thực tế trong quản lý deadline lớp học.
- Lượt thực thi đầu tiên đạt tỷ lệ thành công **100.00%** (vượt xa chỉ tiêu chuẩn 85%), với **tỷ lệ ảo giác đạt 0.0%**.
- Hệ thống đã sẵn sàng cho giai đoạn chấm thi và triển khai thực tế.