# BÀI SUY NGẪM CÁ NHÂN — LƯU XUÂN DŨNG
> **Họ và tên:** Lưu Xuân Dũng  
> **Mã số học viên:** 2A202602746  
> **Vai trò:** Team Lead · AI Engineer (Prompt Engineering, RAG Guardrails & Q&A Lead)  
> **Nhóm:** Trustmebro · Lớp 3A · Phòng E403

---

### 1. Trải nghiệm và đóng góp cá nhân trong dự án
Trong suốt 3 ngày diễn ra Mini Hackathon tại VinUni, với vai trò là Team Lead kiêm Kỹ sư AI của nhóm Trustmebro, tôi chịu trách nhiệm chính trong việc định hình kiến trúc kỹ thuật của hệ thống, thiết kế chuỗi Prompt cho Gemini 3.6 Flash, xây dựng bộ lọc phân quyền (Authority Whitelist Gate) và thiết lập cơ chế chốt chặn chống ảo giác (Zero-Hallucination Regex Guardrails). 

Bài học kỹ thuật sâu sắc nhất mà tôi rút ra được là sự khác biệt giữa "AI Demo" và "Hệ thống AI ứng dụng thực tế". Ở Checkpoint 3, khi chạy trên tập dữ liệu mẫu đơn giản gồm 20 ca, mô hình đạt tới 95% độ chính xác. Nhưng khi bước sang Checkpoint 4 với bài stress test khắc nghiệt gồm 35 ca bẫy số nhiễu và đối nghịch (Adversarial), tỉ lệ vượt qua rơi thẳng xuống 17.14%. Lúc đó, tôi nhận ra rằng nếu chỉ dựa vào một prompt dài dòng và hy vọng LLM luôn suy luận đúng thì hệ thống sẽ sụp đổ khi gặp các tình huống biên (edge cases). Tôi đã quyết định không chỉnh sửa số liệu để làm đẹp báo cáo, mà dũng cảm công khai kết quả 17.14% trong `spec.md`, đồng thời xây dựng kế hoạch remediation chi tiết cho 5 ca bịa mốc giờ. 

Bước sang Checkpoint 5, tôi đã trực tiếp tái cấu trúc lại pipeline trích xuất: bổ sung bộ phân giải thời gian thực cho AM/PM, tách biệt hoàn toàn giữa `start_time` của lịch họp và `deadline` nộp bài, và hoàn thiện cơ chế Fallback Deterministic Engine tự động tiếp quản khi API chạm giới hạn 429 Quota Exceeded. Kết quả đo kiểm lại đã tăng vọt lên 88.57% (31/35 ca PASS) với 0% bịa đặt, chính thức vượt qua Quality Bar đã cam kết.

### 2. Sự phối hợp nhóm và bài học làm việc cùng AI
Làm việc cùng 3 thành viên Lan Anh, Duy Khánh và Quang Dũng là một trải nghiệm tuyệt vời. Mỗi người đều giữ đúng kỷ luật vai trò của mình. Khánh đào sâu nỗi đau người dùng qua khảo sát N=21 và thực hiện Mom Test; Lan Anh biến các luồng tương tác HAX/PAIR thành giao diện web Discord sống động; Quang Dũng nghiêm cẩn xây dựng bộ đề Golden Set và khóa mã băm SHA-256 để đảm bảo tính liêm chính học thuật.

Khi pair-programming với các công cụ AI trợ lý, tôi nhận ra rằng AI giống như một lập trình viên siêu tốc nhưng rất dễ "tự tin thái quá" ở những chỗ không chắc chắn. Việc áp dụng nguyên tắc thiết kế Augment + Conditional và ép các ràng buộc ngữ nghĩa bằng code xác định (deterministic code) trước và sau lời gọi LLM chính là chìa khóa để tạo nên một sản phẩm phần mềm đáng tin cậy.

### 3. Định hướng phát triển tương lai
Nếu có thêm thời gian phát triển dự án sau kỳ hackathon, tôi mong muốn kết nối backend này trực tiếp vào Discord Gateway thật qua thư viện `discord.py`, đồng thời tích hợp tính năng đồng bộ hai chiều với Google Calendar và Microsoft Outlook của trường để học viên có thể nhận thông báo đẩy trên điện thoại một cách tự nhiên nhất.
