# CP3 Evaluation

## Artifact

- `golden_set.json`: 20 case cố định.
- `run_eval.mjs`: bộ chạy và chấm tự động, không cần cài package.
- `run-01.json`: kết quả chi tiết dạng máy đọc.
- `run-01.csv`: bảng kết quả để mở bằng Excel/Google Sheets.
- `RUN-01-REPORT.md`: số tổng hợp và failure chính.

## Độ phủ Golden Set

| Nhóm | Số case |
|---|---:|
| Case thường | 8 |
| Case khó | 8 |
| Case hiếm | 4 |
| Tổng | 20 |

Bốn lớp chỗ khó đều có ít nhất 2 case: nguồn sự thật; mơ hồ hoặc thiếu thông tin; ngoài phạm vi hoặc thẩm quyền; đặc thù domain/cohort.

Có 10 case phát triển từ Discord pack đã ẩn danh; repo chỉ lưu mã `msg_id` và câu rút gọn cần thiết, không sao chép nguyên data pack.

`author_role`, `official` và `allowed_channel` là **nhãn fixture do nhóm đặt để mô phỏng whitelist/policy**, không phải role hoặc tên kênh được suy ra từ data pack. Trường `channel` giữ nguyên mã ẩn danh khi case bắt nguồn từ pack.

## Chạy lại lượt đo

Yêu cầu Node.js 18 trở lên:

```powershell
node eval/run_eval.mjs
```

Lệnh ghi đè `run-01.json`, `run-01.csv` và `RUN-01-REPORT.md`.

Kiểm tra cấu trúc, độ phủ và phép tính:

```powershell
node eval/verify_eval.mjs
```

## Chấm output từ AI thật

### Cách chạy trực tiếp với Google Gemini

Repository có runner gọi Gemini thật bằng REST, không cần cài thêm package:

1. Mở file `.env` ở thư mục gốc.
2. Dán API key sau `GEMINI_API_KEY=`. Không thêm dấu ngoặc và không gửi key cho người khác.
3. Kiểm tra một lời gọi trước:

```powershell
node eval/run_gemini_eval.mjs --smoke
```

4. Nếu smoke test thành công, chạy đủ 20 case:

```powershell
node eval/run_gemini_eval.mjs
```

Lệnh đầy đủ sẽ:

- gọi Gemini một lần cho từng case;
- lưu output hệ thống vào `ai-responses-run-01.json`;
- lưu trace có timestamp và đã loại API key vào `traces/`;
- chạy scorer để cập nhật `run-01.json`, `run-01.csv`, `RUN-01-REPORT.md`;
- chạy verifier để đối chiếu lại phép tính.

Smoke test và full run luôn dùng hai trace khác nhau. Output full run lưu cả `trace_ref` và `trace_sha256`; verifier sẽ báo lỗi nếu trace bị sửa, bị cắt hoặc không còn tồn tại.

Gemini chỉ trích xuất dữ kiện deadline. Policy bằng code mới quyết định công bố, từ chối hay chuyển người duyệt. Chế độ eval gọi model cho đủ 20 case để mỗi case đều có trace; Candidate Gate của luồng production vẫn có thể loại input trước khi gọi model để giảm chi phí.

Chỉ gửi Golden Set đã ẩn danh/synthetic vào API. Không đưa chatlog thô, thông tin cá nhân hoặc secret vào case đánh giá.

Nếu muốn đổi model, sửa `GEMINI_MODEL` trong `.env`. Mặc định hiện tại là `gemini-3.6-flash`, theo model mà Gemini API cấp cho tài khoản mới.

### Chạy bằng DeepSeek

Nếu Gemini không đủ quota, giữ nguyên Gemini key và điền thêm trong `.env`:

```env
DEEPSEEK_API_KEY=key_của_bạn
DEEPSEEK_MODEL=deepseek-flash
```

Kiểm tra một case rồi chạy đủ 20 case:

```powershell
node eval/run_deepseek_eval.mjs --smoke
node eval/run_deepseek_eval.mjs
```

Runner dùng JSON Output, tắt thinking cho tác vụ trích xuất ngắn và vẫn áp dụng cùng prompt, policy, Golden Set, scorer và verifier như lượt Gemini.

### Dùng DeepSeek qua NVIDIA API Catalog

Key tạo tại `build.nvidia.com` phải dùng NVIDIA NIM endpoint, không dùng `api.deepseek.com`. Lưu key này trong biến riêng `NVIDIA_API_KEY`; runner không dùng chéo key giữa các provider.

Model mặc định là free endpoint hiện hành `deepseek-ai/deepseek-v4-flash-0731`:

```powershell
node eval/run_nvidia_eval.mjs --smoke
node eval/run_nvidia_eval.mjs
```

### Chấm file output đã có

Xuất kết quả của model thành JSON, một object cho mỗi case:

```json
{
  "metadata": {
    "provider": "tên nhà cung cấp",
    "model": "tên model",
    "prompt_version": "v1",
    "parameters": { "temperature": 0 },
    "trace_ref": "đường dẫn trace trong repository",
    "trace_sha256": "64 ký tự SHA-256 của file trace"
  },
  "responses": [
    {
      "case_id": "GS-001",
      "decision": "PUBLISHED",
      "due_at_local": "2026-09-13T21:00:00+07:00",
      "source_message_id": "M49744",
      "calendar_action": "CREATE",
      "explanation": "Nguồn hợp lệ trong fixture."
    }
  ]
}
```

File thật phải có đủ output từ `GS-001` đến `GS-020`. Sau đó chạy:

```powershell
node eval/run_eval.mjs --responses eval/ai-responses-run-01.json
```

Giữ lại `ai-responses-run-01.json` và log/trace lời gọi model trong repo. Scorer lưu SHA-256 của file, model, prompt version và parameters vào báo cáo để đối chiếu.

## Quy tắc PASS/FAIL

Một case chỉ PASS khi đồng thời đúng quyết định, ngày giờ chuẩn hóa, message nguồn, hành động calendar và không bịa một deadline khác đáp án.

## Disclosure bắt buộc

`run-01` hiện là lượt **AI-backed hybrid thật**: 20/20 case được gửi tới NVIDIA NIM API, model `deepseek-ai/deepseek-v4-flash-0731` trích xuất dữ kiện, sau đó policy code quyết định trạng thái cuối. Kết quả là **19/20 PASS = 95%, 0 case bịa/sai deadline**. Đây không phải “độ chính xác thuần của model”; nó là độ chính xác end-to-end của pipeline model + policy.
