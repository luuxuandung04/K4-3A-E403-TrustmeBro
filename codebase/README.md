# Deadline Hub + Calendar — Clickable Prototype CP2

Đây là **Working Mock** chạy trực tiếp trên trình duyệt và mô phỏng đúng một Discord App/Bot. Thành viên dùng slash command trong `#deadline-hub`; bot trả calendar dưới dạng message tương tác ngay trong Discord, không mở dashboard hay lịch bên ngoài. Toàn trang web và vùng hội thoại có hai thanh cuộn độc lập; chat có nút quay về tin mới nhất, còn cuối trang có phần giải thích pipeline.

## Chạy prototype

Từ thư mục gốc repo, chạy `node codebase/server.js`, sau đó mở `http://127.0.0.1:4173/`. Không cần cài package hoặc API key.

Tin nhắn thường, slash command và phản hồi bot mới được lưu theo channel trong `codebase/data/mes.json`. Server giữ tối đa 300 tin gần nhất cho mỗi channel. Đây là file persistence dành cho demo cục bộ; bản production nên thay bằng database có transaction và phân quyền.

## Kịch bản demo 45–60 giây

1. Chạy **`/deadline tong-hop`** để mô phỏng bot đọc 4 nguồn và trả calendar trong message.
2. Chuyển tháng hoặc bấm **Chi tiết** để xem thông báo gốc và confidence.
3. Ở bảng **System Logic**, chạy lần lượt `Auto-publish`, `Admin review` và `Reject`.
4. Chạy `Correction`, chọn một loại lỗi rồi gửi; admin giữ quyền quyết định cuối.
5. Thử **`/deadline them`** để xem phương án nhập tay chỉ dành cho ngoại lệ.
5. Khi bộ đếm đạt `4/4`, bốn đường trải nghiệm bắt buộc đã được kiểm tra.

## Phạm vi chạy thật và giả lập

| Thành phần | CP2 |
|---|---|
| Slash command, chat scroll, Discord calendar message, modal nguồn/admin, báo sai | Chạy thật bằng HTML/CSS/JavaScript |
| Lưu/nạp lịch sử chat theo channel | Chạy thật qua `server.js` và `data/mes.json` |
| Trạng thái PUBLISHED / NEEDS REVIEW / NO GROUNDING / HUMAN REVIEW | Rule-based mô phỏng, bấm được end-to-end |
| Nội dung thông báo, confidence, kênh nguồn, TA, thời gian đồng bộ | Dữ liệu mock cố định |
| Extractor AI, Discord Gateway/API, Components V2, permission, database/audit | Chưa kết nối; thuộc CP3 trở đi |

Các nút mở nguồn không điều hướng tới form nộp thật nhằm tránh người thử vô tình dùng dữ liệu mẫu.

## Tiêu chí nghiệm thu

- [x] Có một bot, slash command và calendar tương tác nằm trong Discord message.
- [x] Bốn đường trải nghiệm có điểm bắt đầu, quyết định AI và điểm kết thúc rõ ràng.
- [x] Mức tự động hóa `Augment + Conditional`: bot chỉ công bố khi đủ nguồn; ngoại lệ chuyển người duyệt.
- [x] HAX G1, G2, G9, G10, G11 có vị trí cụ thể và tương tác nhìn thấy được.
- [x] Có thể dùng chuột, bàn phím và màn hình nhỏ; không yêu cầu dữ liệu nhạy cảm.
