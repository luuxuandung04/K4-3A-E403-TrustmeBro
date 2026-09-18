# BÀI SUY NGẪM CÁ NHÂN — NGUYỄN DUY KHÁNH
> **Họ và tên:** Nguyễn Duy Khánh  
> **Mã số học viên:** 2A202602736  
> **Vai trò:** Product Manager · UX/UI · Spec Lead (Khảo sát N=21, Mom Test & Tài liệu kỹ thuật)  
> **Nhóm:** Trustmebro · Lớp 3A · Phòng E403

---

### 1. Trải nghiệm và đóng góp cá nhân trong dự án
Là người giữ vai trò Product Manager của nhóm Trustmebro, nhiệm vụ hàng đầu của tôi là đảm bảo sản phẩm giải quyết đúng nỗi đau thật của người dùng thật chứ không sa đà vào việc xây dựng những tính năng viển vông. Ngay từ Checkpoint 1 và 2, tôi đã thiết kế và triển khai bảng khảo sát thực tế với cỡ mẫu $N = 21$ học viên đang trực tiếp theo học khóa AI Batch 04 tại phòng E403.

Kết quả thu thập được đã mang lại những con số định lượng vô cùng đắt giá: 61.9% học viên mất từ 5 đến hơn 15 phút chỉ để lội kênh tìm lại hạn nộp bài; 52.4% từng thất bại khi tra cứu qua bot AI cũ do bot tự bịa barem điểm hoặc đưa link form đã đóng; và có tới 71.4% học viên phải gánh chịu hậu quả tiêu cực như nộp sát giờ, nộp muộn hoặc nộp nhầm file. Những bằng chứng định lượng này đã giúp tôi và cả nhóm thống nhất được một "Lát cắt MỘT CÂU" chuẩn mực theo yêu cầu R2: loại bỏ hoàn toàn tính năng chatbot hỏi đáp rườm rà để tập trung 100% vào kênh `#deadline-hub` tự động cập nhật lịch 7 ngày có đối chiếu nguồn chính thức.

### 2. Trải nghiệm thực hiện Mom Test tại Checkpoint 5
Một trong những trải nghiệm đáng nhớ nhất của tôi là tiến hành 5 phiên thử nghiệm thực tế với 2 học viên ngoài nhóm: bạn Nguyễn Đức Minh và bạn Nguyễn Văn An. Tuân thủ nghiêm ngặt quy tắc The Mom Test, tôi không hề giải thích trước hay "mớm lời" cách sử dụng, mà chỉ đưa máy tính đã mở sẵn prototype và giao nhiệm vụ cụ thể: *"Hãy kiểm tra xem tuần này bạn có bao nhiêu deadline và Lab 2 nộp lúc mấy giờ"*.

Quan sát người dùng thật đã bộc lộ những điểm mù mà đội ngũ kỹ thuật không lường trước được: bạn Đức Minh navigate rất nhanh nhưng suýt bỏ qua nút "Chi tiết" vì kích thước icon hơi nhỏ; bạn Văn An ban đầu lại có thói quen gõ chat vào ô chat để hỏi vì quen với bot cũ, sau đó mới phát hiện ra bảng tin tổng hợp ở trên đầu. Toàn bộ quá trình quan sát, các trích dẫn nguyên văn và phân tích nguyên nhân gốc rễ đã được tôi ghi chép đầy đủ vào `validation/user_test_log.md`. Quan trọng hơn hết, những phản hồi này đã được nhóm chuyển hóa ngay thành các hành động điều chỉnh cụ thể trên code và ghi vào §9 Changelog của `spec.md` (phiên bản v5.0).

### 3. Bài học về tư duy sản phẩm AI
Dự án này dạy cho tôi một bài học then chốt: đối với các tác vụ liên quan đến logistics học tập, độ chính xác (Factuality) và tính minh bạch (Transparency) quan trọng gấp ngàn lần một giao diện bóng bẩy hay khả năng đối thoại trôi chảy. Một sản phẩm AI thành công không phải là một mô hình biết nói mọi thứ, mà là một hệ thống biết từ chối một cách an toàn khi dữ liệu không đủ căn cứ.
