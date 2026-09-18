# BÀI SUY NGẪM CÁ NHÂN — TẠ QUANG DŨNG
> **Họ và tên:** Tạ Quang Dũng  
> **Mã số học viên:** 2A202602588  
> **Vai trò:** Data Engineer · QA Lead (Bộ đề Golden Set, Eval Scripts & Stress Testing)  
> **Nhóm:** Trustmebro · Lớp 3A · Phòng E403

---

### 1. Trải nghiệm và đóng góp cá nhân trong dự án
Trong nhóm Trustmebro, tôi đóng vai trò là "người gác cổng chất lượng" (Quality Gatekeeper). Trách nhiệm của tôi là xây dựng bộ dữ liệu kiểm thử chuẩn mực, thiết lập bài toán đo lường tự động và đảm bảo tính liêm chính học thuật tuyệt đối cho toàn bộ dự án qua các kỳ Checkpoint.

Ở Checkpoint 4, tôi đã dành toàn bộ tâm sức để biên soạn bộ đề Golden Set toàn diện gồm 35 ca kiểm thử thực tế và 2 tin nhắn hạt giống tạo ngữ cảnh lưu tại `eval/golden_set.json`. Tôi không chọn những ca test dễ dãi, mà chủ động phân bổ đều theo 6 nhóm thử thách khắc nghiệt nhất: các bẫy căn cứ số nhiễu (số điện thoại, phòng học, mã link URL), các câu hỏi mơ hồ về mặt thời gian ("ngày kia", "nửa đêm mai"), các tin nhắn giả mạo ngoài thẩm quyền của sinh viên, đặc thù phân biệt giữa lớp 3A và 3B, và đặc biệt là nhóm Adversarial Zero-Hallucination nhằm bẫy xem AI có tự bịa giờ khi không có căn cứ hay không. Để ngăn chặn việc sửa đề làm đẹp số liệu, tôi đã khóa chặt bộ đề bằng mã băm SHA-256 (`90ccac7e3095ff35...`) và viết script đánh giá tự động `eval/run_eval.py`.

### 2. Cú sốc Checkpoint 4 và tinh thần liêm chính học thuật
Khi chạy lượt đo thử nghiệm đầu tiên tại CP4, mô hình chỉ đạt 17.14% (6/35 ca PASS) và xuất hiện tới 5 ca bịa đặt deadline sai lệch. Đây là một cú sốc lớn đối với cả nhóm vì Quality Bar đã cam kết là $\ge 85\%$ PASS và $0\%$ bịa đặt. Dưới sự thống nhất của cả nhóm, tôi đã kiên quyết ghi trung thực kết quả 17.14% "CHƯA ĐẠT" vào `spec.md` và `eval/run_results.md`, không hề có ý định chỉnh sửa tiêu chí đánh giá hay nới lỏng bài test.

Chính nhờ sự nghiêm khắc đó, tại Checkpoint 5, sau khi anh Xuân Dũng và Lan Anh tiến hành nâng cấp pipeline xử lý và tối ưu hóa bộ phân giải ngữ nghĩa, tôi đã chạy lại quy trình đo kiểm tự động trên cùng một bộ đề có mã băm bất biến. Kết quả đo kiểm mới đã vươn lên mốc **31/35 ca PASS, tương đương tỉ lệ 88.57%**, và quan trọng nhất là số ca bịa đặt deadline đã được triệt tiêu hoàn toàn về **0 ca (0.00%)**. Hệ thống đã chính thức vượt qua Quality Bar một cách minh bạch và thuyết phục.

### 3. Bài học rút ra cho bản thân
Trải nghiệm xây dựng hệ thống QA cho AI đã thay đổi hoàn toàn cách nhìn nhận của tôi về kiểm thử phần mềm. Trong các phần mềm truyền thống, kiểm thử dựa trên các luồng logic rẽ nhánh có thể đoán trước. Nhưng với LLM, tính bất định (non-deterministic) của mô hình đòi hỏi một phương pháp luận đánh giá khắt khe, có cấu trúc và có khả năng phát hiện ảo giác tự động. Tôi rất tự hào vì đã cùng nhóm Trustmebro hoàn thành xuất sắc cam kết chất lượng của mình.
