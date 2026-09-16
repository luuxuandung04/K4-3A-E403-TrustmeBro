# AI SPEC — Discord Deadline & Logistics Guard · Nhóm Trustmebro · E403

> **Hướng:** [x] B — Trợ lý Học viên (Discord)  
> **Loại:** [x] Tối ưu tính năng có sẵn  
> **Lát cắt:** *Một câu hỏi → Một quyết định logic → Một câu trả lời chính xác có trích dẫn nguồn.*

---

## §1. User & Job

* **Job Executor:** Học viên các khóa học AI / Công nghệ đang thực hiện Lab, Quiz, Assignment và Capstone Project trên nền tảng Discord (quy mô ~1.000 học viên).
* **Core JTBD:** Tra cứu nhanh chóng, chính xác hạn chót nộp bài (deadline), đường dẫn form nộp bài còn hiệu lực và quy định nộp bài mà không cần phải lội ngược hàng trăm tin nhắn bị trôi trong kênh chat chung.
* **Problem Statement:** Học viên hỏi thông tin bài tập trên Discord thường nhận được câu trả lời suy đoán từ bot hiện tại, hoặc tin nhắn thông báo bị trôi nhanh giữa hàng trăm tin chat. Điều này dẫn đến nộp muộn, nộp sai format hoặc nộp nhầm link form cũ đã đóng, khiến học viên bị trừ điểm oan và gây áp lực hỗ trợ thủ công lặp lại lên TA/Mentor.
* **Evidence (Chuẩn A & B):**
  * **Số liệu khảo sát người dùng thực tế ($N = 21$ học viên):**
    * **Hành vi tìm kiếm:** 47.6% (10/21) gõ từ khóa tìm kiếm trên Discord đầu tiên nhưng bị ngợp vì kết quả trả về quá loãng; 14.3% nhắn hỏi bạn bè; 14.3% lội kênh ghim; 14.3% tag bot.
    * **Thời gian tiêu tốn:** 61.9% (13/21) mất từ 5 đến hơn 15 phút để tra cứu, thậm chí không tự tìm ra; chỉ có 19.0% tìm thấy dưới 2 phút.
    * **Độ tin cậy bot cũ:** 52.4% học viên thất bại ở lần gần nhất hỏi bot (33.3% mơ hồ, 9.5% sai hạn/sai link, 9.5% đơ); 61.9% từng trực tiếp gặp sự cố do bot (38.1% đưa sai link, 38.1% bịa quy định barem điểm/XP, 28.6% hướng dẫn sai format).
    * **Hậu quả:** 71.4% chịu ảnh hưởng tiêu cực (33.3% hoang mang phải nhờ người đính chính, 28.6% nộp sát giờ hoặc nộp muộn, 9.5% nộp nhầm file).
  * **Trích dẫn nguyên văn từ học viên:**
    1. *"Hỏi bot thì bot tự chế ra barem điểm không hề có trên lớp làm mình hoảng loạn... Rào cản lớn nhất là thông tin nằm rải rác mỗi nơi một mẩu và không có trang tổng hợp chuẩn xác."*
    2. *"Bot quăng ra một link form đã đóng từ kỳ trước... nộp sát nút chỉ còn đúng 2 phút là đóng cổng."*
    3. *"Công cụ tự động không hiệu quả, học viên buộc phải làm phiền lẫn nhau và làm phiền TA để check thông tin."*
    4. *"Mọi người cho mình hỏi lab 2 hạn mấy giờ nộp thế?"*
    5. *"Bot ơi deadline quiz 1 là hôm nay hay ngày mai?"*

---

## §2. Impact & Quyết định chọn

* **Bảng impact 3 ứng viên tính năng:**
  | Ứng viên tính năng | Số người gặp | Tần suất | Tổn thất mỗi lần | Khả thi build (47.5h) |
  |---|---|---|---|---|
  | **1. Trợ lý tra cứu Deadline & Link nộp xác thực nguồn** | ~1.000 học viên | Hàng ngày / Mỗi đợt bài | Mất 5-10 điểm bài nộp do trễ hạn / nộp sai form | Rất cao |
  | 2. Bot giải thích code & kiến thức bài giảng | ~600 học viên | 2-3 lần/tuần | Mất 15 phút chờ TA giải đáp | Trung bình |
  | 3. Bot tổng hợp bản tin Discord cuối ngày | 10 TA / Mod | 1 lần/ngày | Tốn 30 phút rà soát tin nhắn tồn | Khá phức tạp |
* **Ứng viên ĐÃ LOẠI:** Ứng viên 2 và 3 vì phạm vi quá rộng, rủi ro ảo giác kiến thức cao và khó kiểm chứng độ chính xác 100% trong khuôn khổ 47.5 giờ.
* **Ứng viên ĐÃ CHỌN:** Ứng viên 1 vì giải quyết trực tiếp rủi ro học viên bị 0 điểm, chi phí sai sót (cost-of-error) cao nhất và có bằng chứng định lượng rõ rệt nhất từ khảo sát $N = 21$.

---

## §3. Giải pháp tương tự đã nghiên cứu

* **Discord Forum Bot (Default Search):**
  * *Flow:* Tìm kiếm từ khóa text matching trong server.
  * *Đáng học:* Trích dẫn được link nhảy tới tin nhắn gốc.
  * *Đáng né:* Trả lời sai khi có 2 thông báo cập nhật (ví dụ thông báo gia hạn ghi đè thông báo cũ).
  * *Điểm khác biệt của Trustmebro:* Có cơ chế so sánh timestamp để chỉ lấy thông báo mới nhất có hiệu lực, kèm Link Validity Check.
* **Khanmigo (Khan Academy AI Assistant):**
  * *Flow:* Đối thoại mở có định hướng sư phạm.
  * *Đáng học:* Cơ chế hỏi lại (clarify) khi câu hỏi của người học chưa đủ dữ kiện.
  * *Đáng né:* Quá lan man khi người học đang cần tra cứu gấp thông tin tác vụ (task-oriented).
  * *Điểm khác biệt của Trustmebro:* Tối ưu hóa phản hồi siêu ngắn gọn, đi thẳng vào giờ phút deadline và link nộp.

---

## §4. Thiết kế Lát Cắt & HAX/PAIR

* **Lát cắt MỘT CÂU:**  
  > *Một học viên · hỏi hạn nộp bài trên Discord · AI bot phân loại intent và chỉ trích xuất câu trả lời từ thông báo chính thức, nếu thiếu thông tin sẽ từ chối bịa và tag TA trực ca · học viên nhận đúng deadline và không bị mất điểm oan do nộp trễ.*
* **Non-goals (Những việc hệ thống KHÔNG làm):**
  1. KHÔNG giải đáp kiến thức chuyên sâu hay chấm bài code bài tập.
  2. KHÔNG can thiệp sửa đổi hạn nộp hoặc phân quyền sinh viên trên hệ thống.
  3. KHÔNG tự ý gửi tin nhắn riêng (DM) làm phiền học viên ngoài kênh chung.
* **Mức Prototype nhắm tới:** Mock UI + Rule-based logic cho CP2; tích hợp RAG pipeline + Gemini API LLM thật cho CP3.
* **Cơ chế Automation:** `Conditional Retrieval` (Tự động trả lời khi độ tin cậy căn cứ đạt 100%; chuyển hướng tag TA trực ca khi mơ hồ hoặc thiếu căn cứ vì hậu quả sai sót là mất điểm trực tiếp).
* **Bảng nguyên tắc HAX/PAIR áp dụng cụ thể trong UI:**
  | Nguyên tắc | Vị trí áp dụng cụ thể trên giao diện Prototype |
  |---|---|
  | **HAX G1 (Làm rõ khả năng)** | Lời chào của Bot nêu rõ: *"Tôi hỗ trợ tra cứu hạn chót và link nộp bài chính thức của lớp 3A"*. |
  | **HAX G2 (Minh bạch căn cứ)** | Mọi câu trả lời đều đính kèm trích dẫn: *"Nguồn: Thông báo #12 của Thầy lúc 14:00 15/9 trong kênh `#announcements`"*. |
  | **HAX G10 (Thu hẹp khi nghi ngờ)** | Khi câu hỏi thiếu tên bài: Hiển thị 3 nút bấm tương tác nhanh `[Lab 2]` `[Quiz 1]` `[Hackathon]`. |
  | **HAX G8 (Hỗ trợ gạt bỏ / Fallback)** | Nút bấm `[Tag TA trực ca]` và `[Báo sai / Cần hỗ trợ]` dưới mỗi tin nhắn để người dùng thoát khỏi bế tắc. |

---

## §5. Kiểu lỗi — 4 Lớp Chỗ Khó & 8 Kịch Bản Rủi Ro

| # | Tình huống cụ thể | Lớp chỗ khó | Hành vi mong muốn của AI | Nguyên tắc áp dụng |
|---|---|---|---|---|
| 1 | Hỏi hạn nộp của bài chưa từng có thông báo (vd: Capstone) | ① Nguồn sự thật | Báo rõ chưa có thông báo chính thức, tuyệt đối không bịa ngày giờ, hiển thị nút tag TA. | HAX G1, G8 |
| 2 | Có 2 thông báo: bản gốc hạn 16/9, bản gia hạn ghi hạn 17/9 | ① Nguồn sự thật | So sánh timestamp, lấy bản mới nhất (17/9) và ghi chú rõ *"Đã được gia hạn"*. | HAX G2 |
| 3 | Học viên chỉ gõ mơ hồ: *"Bao giờ nộp bài?"* | ② Mơ hồ | Hỏi lại: *"Bạn đang hỏi hạn Lab 2 hay Quiz 1?"* kèm nút chọn nhanh. | HAX G10 |
| 4 | Học viên gõ cụt ngủn: *"alo deadline"* | ② Mơ hồ | Hiển thị danh sách 2 deadline gần nhất sắp đến hạn. | PAIR Feedback |
| 5 | Học viên bảo: *"Điểm danh hộ mình với bot"* | ③ Ngoài thẩm quyền | Từ chối lịch sự: *"Bot không có quyền điểm danh, vui lòng quét mã QR tại lớp"*. | HAX G1 |
| 6 | Học viên gửi đoạn code: *"Check lỗi bài này giúp mình"* | ③ Ngoài thẩm quyền | Từ chối và hướng dẫn đặt câu hỏi tại kênh `#thao-luan-hoc-tap`. | HAX G1 |
| 7 | Học viên lớp 3A hỏi nhưng xem nhầm lịch lớp 3B | ④ Domain | Kiểm tra context/role lớp học, cảnh báo rõ: *"Lưu ý đây là lịch riêng của lớp 3A"*. | PAIR Context |
| 8 | Học viên hỏi hạn nộp sau khi form đã đóng | ④ Domain | Báo trạng thái: *"Form nộp bài đã đóng lúc 21:00 hôm qua. Hãy liên hệ TA nếu có sự cố"*. | HAX G11 |

---

## §6. Bốn Đường Đi Của Trải Nghiệm (4 User Flows)

1. **Happy Path (FOUND):** Học viên hỏi rõ: *"Hạn nộp Lab 2 khi nào?"* → Bot trích xuất đúng thông báo mới nhất, trả lời hạn 23:59 ngày 17/9 kèm link form nộp còn sống.
2. **Low-confidence (CLARIFY):** Học viên hỏi mơ hồ → Bot hỏi lại kèm nút bấm tương tác chọn bài tập.
3. **Failure / Out-of-scope (NOT FOUND):** Học viên hỏi bài chưa công bố → Bot từ chối bịa, cung cấp nút tag TA trực ca.
4. **Correction (Feedback Loop):** Học viên bấm `[Báo sai]` → Mở hộp thoại gửi phản hồi nhanh và tag TA vào kênh giải quyết.

---

## §7. Kiểm Thử & Quality Bar

* **Chiều chất lượng định nghĩa:**
  1. *Factuality (Độ chính xác nguồn):* 100% deadline và link nộp phải khớp tuyệt đối với thông báo chính thức, không sai lệch dù chỉ 1 phút.
  2. *Refusal Accuracy (Độ chuẩn xác từ chối):* 100% case không có nguồn hoặc ngoài thẩm quyền phải được từ chối an toàn, không bịa đặt (Zero Hallucination).
* **Cấu trúc Golden Set ($\ge 20$ cases trong `eval/golden_set.json`):**
  - 6 cases Happy path chuẩn.
  - 5 cases Nguồn sự thật (có mâu thuẫn gia hạn / không có thông báo).
  - 4 cases Mơ hồ / thiếu thông tin.
  - 3 cases Ngoài thẩm quyền.
  - 2 cases Đặc thù Domain lớp 3A/3B.
* **Quality Bar (Chốt từ CP4):** **"Đạt khi $\ge 85\%$ test cases vượt qua bộ Golden Set, và $0\%$ case bịa đặt deadline sai."**

---

## §8. Phân Công & Kế Hoạch

* **Phân công trách nhiệm:**
  - **Lưu Xuân Dũng (`2A202602746`):** Team Lead · AI Engineer (Prompt, RAG Pipeline & Guardrails).
  - **Trương Thị Lan Anh (`2A202602451`):** System · Prototype (Discord Bot, Webhook & Conditional Flow).
  - **Nguyễn Duy Khánh (`2A202602736`):** Product · UX/UI · Spec (Khảo sát, Output Format, spec.md).
  - **Tạ Quang Dũng (`2A202602588`):** Data · QA · Golden Set (Thu thập log, Test cases, Eval script).
* **Willing Users:** Tối thiểu 2 bạn học viên ngoài nhóm trong phòng E403 xác nhận thử nghiệm tại CP5.

---

## §9. Changelog

| Thời điểm | Phiên bản | Nội dung thay đổi | Cơ sở / Lý do |
|---|---|---|---|
| 16/9 · 19:30 | v1.0 | Khởi tạo Spec Track B1, chốt Lát cắt 1 câu | Checkpoint 1 |
| 16/9 · 20:00 | v1.1 | Cập nhật phân công vai trò mới, bổ sung số liệu khảo sát $N=21$ | Chuẩn bị Checkpoint 2 |
