# NHẬT KÝ THỬ NGHIỆM NGƯỜI DÙNG (MOM TEST LOG · 5 NGƯỜI)
> **Dự án:** Discord Deadline & Logistics Guard (Track B1)  
> **Nhóm:** Trustmebro · Lớp 3A · Phòng E403  
> **Thời gian:** Sáng 18/09/2026 tại phòng E403, VinUniversity  
> **Cách làm:** Đưa máy cho từng bạn tự dùng, không mớm lời, không giải thích trước, quan sát phản ứng thật và chép lại nguyên văn lời nói.

---

## 1. Danh sách 5 bạn tham gia test

| # | Bạn tham gia | Lớp | Quan hệ | Nhiệm vụ chính |
|---|---|:---:|---|---|
| **U1** | **Nguyễn Đức Minh** | 3A | Bạn cùng phòng E403 (Willing user) | Thử tìm deadline và bấm xem tin gốc |
| **U2** | **Nguyễn Văn An** | 3A | Bạn cùng phòng E403 (Willing user) | Thử tra cứu khi có tin đồn dời hạn |
| **U3** | **Lê Thị Thảo** | 3A | Bạn cùng lớp 3A | Thử trường hợp giảng viên gia hạn khẩn cấp |
| **U4** | **Trần Hoàng Nam** | 3B | Bạn học lớp song song | Thử trường hợp bài tập riêng của lớp 3B |
| **U5** | **Vũ Minh Tuấn** | 3A | Trưởng nhóm đồ án cùng lớp | Thử tính năng Báo sai và thử gửi tin nhắn đùa |

---

## 2. Chi tiết 5 phiên thử nghiệm thực tế

---

### Phiên 1: Nguyễn Đức Minh (U1 · Lớp 3A)

- **Giao việc:**  
  *"Ê Minh, thử vào tìm xem từ giờ đến cuối tuần có bài gì phải nộp không, với check hộ tao cái Lab 2 hạn chót cụ thể mấy giờ."* (Đưa laptop mở sẵn web, không chỉ tay bấm vào đâu cả).

- **Quan sát:**  
  Minh nhìn lướt danh sách kênh rồi bấm thẳng vào `#deadline-hub`. Thấy ngay thẻ Lab 2 trên thanh lịch 7 ngày. Nhưng đến đoạn bấm vào nút để xem tin gốc thì bạn ấy rê chuột bấm hụt mất một phát vì cái icon mũi tên hơi bé, bấm nhát thứ hai mới trúng. Giao diện cuộn mượt sang kênh announcements và highlight tím tin của thầy Hoàng.

- **Trích dẫn nguyên văn:**  
  > *"Đù, bấm phát nhảy luôn tới tin nhắn của thầy Hoàng à, tiện vãi! Đỡ hơn hẳn con bot cũ lải nhải gõ lệnh mỏi tay xong toàn quăng link chết. Cơ mà cái nút mũi tên góc này bé tí mày ơi, tao bấm trượt cụ nó một phát, tưởng icon trang trí chứ."*

- **Điểm nghẽn & Sửa đổi:**  
  - *Điểm nghẽn:* Nút xem chi tiết kích thước nhỏ, dễ bấm trượt.
  - *Đã sửa:* Tăng vùng bấm của nút to hơn, rê chuột vào có đổi màu rõ ràng và hiện tooltip chỉ dẫn.

---

### Phiên 2: Nguyễn Văn An (U2 · Lớp 3A)

- **Giao việc:**  
  *"An ơi, nghe mấy đứa bảo bài Capstone bị dời hạn nộp về Chủ nhật tuần này đúng không, check hộ tao cái xem chuẩn không."*

- **Quan sát:**  
  An quen thói quen cũ nên bấm luôn vào ô chat định gõ lệnh hỏi bot. Thấy không có bot nào nhảy ra trả lời, An ngơ ngác mất mấy giây nhìn quanh màn hình. Nhóm vẫn ngồi im không nhắc. Sau đó An thấy kênh `#deadline-hub` có icon lịch thì bấm thử vào, nhìn thấy thẻ Capstone hạn tận 03/10 chứ không phải tuần này.

- **Trích dẫn nguyên văn:**  
  > *"Ủa alo, con bot này không chat được à? Tao gõ vào chat tưởng nó trả lời như mấy con bot trước. À hóa ra bấm vào kênh lịch này là có sẵn hết rồi à? Nhìn gom một chỗ thế này gọn đấy, mà mày nên để cái thông báo to đùng ở đầu kênh cho mấy đứa ngáo ngơ như tao biết là không cần gõ lệnh hỏi."*

- **Điểm nghẽn & Sửa đổi:**  
  - *Điểm nghẽn:* Người dùng quen gõ chat hỏi đáp, chưa biết cơ chế tự tổng hợp của kênh.
  - *Đã sửa:* Ghim ngay một banner ngắn gọn ở đầu kênh `#deadline-hub`: thông báo lịch tự động cập nhật, bấm xem trực tiếp, không cần gõ lệnh.

---

### Phiên 3: Lê Thị Thảo (U3 · Lớp 3A)

- **Giao việc:**  
  *"Thảo ơi, check hộ tớ xem Thầy Hoàng vừa thông báo gì khẩn cấp về Lab 2 đấy, hạn chót giờ là lúc nào."*

- **Quan sát:**  
  Thảo bấm vào `#deadline-hub` ngay. Khi nhóm gửi tin nhắn giả lập thầy gia hạn sang 26/09, thẻ Lab 2 trên màn hình đổi sang viền đỏ cam ngay trước mắt Thảo. Thảo bấm vào xem tin gốc đối chiếu giờ nộp, nhìn kỹ một lúc rồi hỏi mốc cũ đâu mất rồi.

- **Trích dẫn nguyên văn:**  
  > *"Ơ đổi màu cam luôn nè, nhìn giật cả mình tưởng sắp toang! Thầy dời sang 26 à, may thế suýt nữa thức đêm làm. Mà này, nó tự đè lên hạn cũ luôn hả cậu? Thêm cái dòng ghi chú nhỏ kiểu 'được gia hạn từ mốc cũ' vào đây cho bọn tớ đỡ lú, chứ nhiều khi nhìn lại tưởng nhớ nhầm bài."*

- **Điểm nghẽn & Sửa đổi:**  
  - *Điểm nghẽn:* Học viên muốn thấy lịch sử gia hạn để yên tâm là mình không nhìn nhầm bài tập.
  - *Đã sửa:* Bổ sung dòng ghi chú trong chi tiết deadline: *"Đã gia hạn từ mốc cũ theo thông báo mới nhất"*.

---

### Phiên 4: Trần Hoàng Nam (U4 · Lớp 3B)

- **Giao việc:**  
  *"Nam ơi, ông lớp 3B đúng không, vào nghía hộ tôi xem Quiz 3 lớp ông hạn ngày nào, có làm chung link với 3A không."*

- **Quan sát:**  
  Nam vào kênh xem tin ghim của giáo viên dặn lớp 3B, sau đó bấm sang xem lịch biểu. Thấy có thẻ Quiz 3 kèm nhãn `[Lớp 3B]` màu vàng riêng. Nam dừng lại săm soi một lúc vì thấy hơi lạ khi vào server 3A lại thấy bài của lớp mình.

- **Trích dẫn nguyên văn:**  
  > *"Ủa ông ơi, server lớp 3A sao hiện cả bài của 3B bọn tôi thế? À có gắn tag vàng Lớp 3B riêng này. Cơ mà nhìn chung một đống thế này hoa mắt lắm, lỡ đứa nào mắt nhắm mắt mở nhìn nhầm hạn của 3A thì ăn cám. Làm thêm cái nút lọc riêng lớp 3A với 3B đi ông."*

- **Điểm nghẽn & Sửa đổi:**  
  - *Điểm nghẽn:* Hiện chung bài 3A và 3B trong một bảng có thể khiến học viên vội vàng nhìn nhầm.
  - *Xử lý:* Giữ nguyên thiết kế tag vàng nổi bật cho kịp demo; tính năng bấm lọc riêng từng lớp đưa vào lộ trình bản tiếp theo.

---

### Phiên 5: Vũ Minh Tuấn (U5 · Lớp 3A · Leader Đồ Án)

- **Giao việc:**  
  *"Tuấn ơi, thử vào nộp bài mà giả vờ thấy link form bị đóng sớm xem mày báo lỗi kiểu gì, xong thử nhắn tin chém gió vào kênh lớp xem bot có bị lừa không."*

- **Quan sát:**  
  Tuấn mở chi tiết bài Lab 1, thấy nút Báo sai có icon cờ đỏ bấm luôn. Bạn chọn lý do form đóng sớm, gõ *"Form đóng lúc 22:00 rồi bot ơi"* rồi gửi. Thẻ đổi sang trạng thái 'Đang xác minh'. Sau đó Tuấn đổi tài khoản sinh viên gửi tin *"Lab được nộp bù nha"*, nhìn xuống bảng log thấy bot chặn luôn vì không có quyền, lịch không suy suyển gì.

- **Trích dẫn nguyên văn:**  
  > *"Ngon mày ơi! Có cái nút Báo sai này đỡ hẳn quả sinh viên nháo nhào inbox spam TA mỗi lần form lỗi. Bấm phát hiện Đang xác minh luôn là cả lớp biết, khỏi ai thắc mắc. Với cả chặn được mấy bố hay đùa dai trên kênh chat là chuẩn đấy, không thì loạn cào cào cả lịch lên. Cơ mà sau này làm thêm cái tin nhắn ping riêng cho TA nữa là chuẩn bài."*

- **Điểm nghẽn & Sửa đổi:**  
  - *Điểm nghẽn:* Cần kênh thông báo riêng cho Trợ giảng khi có khiếu nại báo sai sát giờ.
  - *Xử lý:* Luồng cho học viên giữ nguyên vì dùng rất tốt; webhook bắn tin riêng cho TA đưa vào lộ trình hoàn thiện bot thật.

---

## 3. Tổng kết phản hồi & Cải tiến sản phẩm

| Người dùng | Phản hồi chính | Cách xử lý trên sản phẩm |
|---|---|---|
| **Minh (U1)** | Nút Chi tiết bé, bấm trượt | **Đã sửa trên code:** Tăng kích thước nút lên $36\text{px}$, thêm tooltip chỉ dẫn. |
| **An (U2)** | Tưởng bot chat, không biết kênh tự cập nhật | **Đã sửa trên UI:** Thêm banner hướng dẫn ghim ở đầu kênh `#deadline-hub`. |
| **Thảo (U3)** | Sợ nhớ nhầm khi mốc mới đè mốc cũ | **Đã sửa:** Bổ sung dòng hiển thị lịch sử gia hạn từ mốc cũ trong chi tiết sự kiện. |
| **Nam (U4)** | Đề xuất lọc riêng lớp 3A và 3B | **Giữ nguyên thiết kế:** Giữ nhãn tag màu vàng `[Lớp 3B]` rõ ràng; nút lọc đưa vào roadmap. |
| **Tuấn (U5)** | Khen luồng Báo sai và chặn tin đồn, muốn có ping cho TA | **Giữ nguyên thiết kế:** Flow báo sai cho học viên giữ nguyên; webhook cho TA đưa vào bản sau. |
