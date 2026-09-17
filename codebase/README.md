# Discord Deadline & Logistics Guard — Web Client Interface

Giao diện người dùng mô phỏng Discord Web Client hoàn chỉnh của hệ thống **Discord Deadline & Logistics Guard**, kết nối trực tiếp với backend **FastAPI** qua RESTful API để xử lý thông tin thông báo, nhận diện deadline bằng AI và quản lý lịch biểu tập trung.

---

## 🌟 Các Tính năng Nổi bật trên Giao diện

1. **Kênh tập trung `#deadline-hub`**:
   - Tự động hiển thị Lịch tương tác (Interactive Calendar) ngay trong tin nhắn của Bot.
   - Các Slash command trực tiếp:
     - `/deadline tong-hop`: Tổng hợp toàn bộ lịch thi, nộp bài, seminar từ các kênh nguồn chính thức.
     - `/deadline xem`: Tra cứu hạn nộp cụ thể theo môn/bài tập.
     - `/deadline them`: Form mở nhanh dành cho Admin/TA tạo deadline bổ sung.
     - `/deadline duyet`: Xem danh sách các thông báo cần con người rà soát.

2. **Thanh thông báo 7 ngày (7-Day Urgency Banner)**:
   - Tự động quét và liệt kê các sự kiện/deadline trong vòng 7 ngày tới.
   - Nút **`↗ Chi tiết`**: Mở modal trích dẫn căn cứ gốc, người công bố, độ tin cậy và link form nộp bài.
   - Nhấp vào nguồn hoặc link tin gốc: **Tự động chuyển kênh và cuộn (smooth scroll) trực tiếp đến tin nhắn gốc** trong kênh chat.

3. **Gửi tin nhắn & Pipeline xử lý thời gian thực**:
   - Người dùng có thể chọn Persona (Thầy Hoàng, Cô Minh Anh, TA Tuấn, hoặc Học viên Lan Anh) để gửi thông báo vào các kênh whitelist (`#announcements`, `#lab-assignments`, `#quiz-updates`, `#hackathon`, `#lich-hoc`).
   - Tin nhắn được gửi lên backend FastAPI:
     - **Authority Filter**: Kiểm duyệt vai trò người gửi (chỉ Giảng viên/TA/BTC mới được ban hành deadline).
     - **Semantic Extractor**: Gemini AI phân tích ngữ nghĩa, bóc tách thời gian, loại sự kiện (`MEETING`, `DEADLINE`, `CLASS`, `ANNOUNCEMENT`).
     - **Zero-Hallucination Guard**: Nghiêm cấm tự bịa mốc giờ nếu thông báo không ghi giờ rõ ràng.
     - **Broadcast / Event Store**: Đồng bộ ngay lập tức vào cơ sở dữ liệu và hiển thị lên `#deadline-hub`.

4. **Nút `[🧹 Dọn rác / Reset Demo]` (1-Click Demo Reset)**:
   - Nằm ngay trên thanh điều hướng trên cùng (Top Navigation Bar).
   - Cho phép khôi phục toàn bộ kênh chat, sự kiện và deadline về trạng thái ban đầu sạch sẽ, sẵn sàng cho việc kiểm thử nhiều lần hoặc thuyết trình demo trực tiếp.

5. **Giám sát Pipeline Log & Cảnh báo Hạn mức AI**:
   - Card nhật ký thời gian thực (Live Pipeline Log) bên phải màn hình hiển thị từng bước xử lý: Gate -> Extractor -> Validator -> Store.
   - Tự động hiển thị Toast cảnh báo màu vàng khi Gemini API chạm giới hạn lượt gọi (429 ResourceExhausted) và chuyển mượt mà sang chế độ Fallback an toàn.

---

## 🚀 Cách Khởi Chạy

### Cách 1: Chạy cùng Backend FastAPI (Khuyến nghị để trải nghiệm đầy đủ)
1. Khởi động backend server:
   ```powershell
   # Chạy file batch hoặc lệnh uvicorn từ thư mục gốc
   .\start_server.bat
   ```
2. Mở trình duyệt truy cập: **`http://127.0.0.1:8000`** (FastAPI tự động mount thư mục `codebase/` làm trang chủ).

### Cách 2: Chạy độc lập (Static Preview)
- Mở trực tiếp tệp `codebase/index.html` bằng trình duyệt (Chrome/Edge/Firefox).
- Giao diện vẫn hoạt động trơn tru với dữ liệu mẫu tĩnh.

---

## 🎨 Cấu trúc Thư mục

- `index.html`: Cấu trúc DOM mô phỏng giao diện Discord (Sidebar kênh, Khung chat, Thanh thông báo, Modal chi tiết, Form nhập liệu).
- `style.css`: Bộ stylesheet hoàn chỉnh mô phỏng Discord Dark Theme (màu sắc, typography, responsive mobile/desktop).
- `app.js`: Toàn bộ logic tương tác phía client (gọi API FastAPI, quản lý state kênh chat, bộ lọc thời gian, xử lý slash commands).
