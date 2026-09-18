# BÀI SUY NGẪM CÁ NHÂN — TRƯƠNG THỊ LAN ANH
> **Họ và tên:** Trương Thị Lan Anh  
> **Mã số học viên:** 2A202602451  
> **Vai trò:** System · Prototype Engineer (Discord Web Client, Webhooks & HAX/PAIR Principles)  
> **Nhóm:** Trustmebro · Lớp 3A · Phòng E403

---

### 1. Trải nghiệm và đóng góp cá nhân trong dự án
Trong dự án Discord Deadline & Logistics Guard, tôi đảm nhận vai trò xây dựng giao diện tương tác người dùng và hệ thống kết nối Frontend - Backend. Thách thức lớn nhất mà tôi phải đối mặt ở Checkpoint 2 là: làm sao để người dùng trải nghiệm được một hệ thống AI phức tạp mà không cảm thấy xa lạ hay phải học cách sử dụng một phần mềm hoàn toàn mới?

Tôi đã quyết định dựng lại giao diện Discord Web Client nguyên bản bằng HTML, CSS và JavaScript thuần, tái hiện đầy đủ cây thư mục kênh `#announcements`, `#lab-assignments`, `#quiz-updates`, `#deadline-hub` cùng thanh điều khiển vai trò giả lập (Persona Switcher). Thay vì tạo một chatbot hỏi đáp thông thường, tôi tập trung hiện thực hóa lát cắt giải pháp của nhóm: biến kênh `#deadline-hub` thành một trung tâm điều phối với thanh thông báo 7 ngày trực quan. Tôi đã lập trình tính năng tương tác cốt lõi: khi người dùng bấm vào bất kỳ thẻ deadline nào trên lịch biểu, giao diện sẽ kích hoạt hiệu ứng cuộn mượt (smooth-scroll) đưa tầm mắt của học viên đến chính xác tin nhắn thông báo gốc của Giảng viên và làm nổi bật tin nhắn đó bằng viền màu tím. Đây chính là hiện thân sinh động nhất của nguyên tắc thiết kế Microsoft HAX G11: giải thích lý do và nguồn gốc của mọi quyết định mà AI đưa ra.

### 2. Vận dụng các nguyên tắc thiết kế AI (HAX & PAIR)
Quá trình triển khai 4 luồng trải nghiệm giúp tôi hiểu sâu sắc cách dung hòa giữa công nghệ và tâm lý người dùng. Tôi đã cài đặt cơ chế xử lý lỗi theo nguyên tắc HAX G9 (Efficient Correction) thông qua tính năng "Báo sai": khi học viên thấy form nộp bài đóng sớm hơn mốc giờ trên lịch, họ có thể bấm báo cáo ngay tại chỗ; hệ thống lập tức gắn nhãn "Đang xác minh" chứ không tự ý xóa bỏ dữ liệu. Tôi cũng thiết kế nút "Reset Demo Data" 1-Click trên topbar để Ban giám khảo có thể tự do thử nghiệm các kịch bản phá hoại mà vẫn dễ dàng đưa hệ thống về trạng thái ban đầu chỉ trong 1 giây.

Sau buổi thử nghiệm người dùng tại Checkpoint 5 với bạn Nguyễn Đức Minh và Nguyễn Văn An, tôi đã trực tiếp tiếp thu phản hồi và điều chỉnh lại giao diện: tăng kích thước nút Chi tiết, bổ sung banner hướng dẫn cho học viên mới và kéo dài thời gian hiển thị cảnh báo khi hệ thống chạy ở chế độ Offline Fallback.

### 3. Bài học cá nhân và cảm nghĩ
Kỳ hackathon này đã mang lại cho tôi bước nhảy vọt về tư duy làm sản phẩm. Tôi nhận ra giao diện người dùng cho hệ thống AI không chỉ là việc làm cho các nút bấm đẹp mắt, mà là việc xây dựng lòng tin (trust building) giữa con người và máy tính. Làm việc cùng các bạn trong nhóm Trustmebro dưới áp lực thời gian gấp rút đã rèn luyện cho tôi sự điềm tĩnh và tinh thần kỷ luật cao độ.
