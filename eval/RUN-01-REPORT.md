# CP3 — Kết quả đánh giá lượt 1

## Kết quả

| Chỉ số | Giá trị |
|---|---:|
| Tổng số case | 20 |
| PASS | 19 |
| FAIL | 1 |
| Tỷ lệ đạt | **95%** |
| Case bịa/sai deadline | 0 |
| Quality bar | ≥85% và 0 case bịa deadline |
| Đạt quality bar? | **CÓ** |

## Phạm vi đo

Lượt chạy này chấm **20 output AI-backed hybrid** bằng cùng một scorer cố định. Model NVIDIA NIM API / deepseek-ai/deepseek-v4-flash-0731 trích xuất dữ kiện, sau đó policy code quyết định trạng thái cuối. Đây là độ chính xác end-to-end của pipeline model + policy, không phải độ chính xác thuần của model. Metadata và SHA-256 bên dưới liên kết response với trace lời gọi thật.

## Provenance

| Trường | Giá trị |
|---|---|
| response_file | ai-responses-run-01.json |
| response_file_sha256 | 9b7734a799f74e6faf6efc720118fa0d280a040d70182f4fdeaecadde6589680 |
| provider | NVIDIA NIM API |
| model | deepseek-ai/deepseek-v4-flash-0731 |
| prompt_version | deadline-extractor-v1 |
| parameters | `{"max_tokens":2048,"reasoning_effort":"none","temperature":0,"response_format":"json_object","successful_case_count":20,"provider_request_attempts":20,"policy_engine":"hybrid-policy-v1"}` |
| trace_ref | eval/traces/nvidia-run-01-2026-09-17T08-15-43-545Z.json |
| trace_sha256 | 8514e9bbc47a0187f7f2eaafbe2da7ea956bcdba371da4effa0d0552bada9101 |

## Case chưa đạt

| Case | Mong đợi | Thực tế | Nguyên nhân |
|---|---|---|---|
| GS-013 | IGNORED_OUT_OF_SCOPE | REJECTED | Policy từ chối vì không có nguồn chính thức trong kênh được phép. |

## Kết luận lượt 1

Kết quả được giữ nguyên, kể cả case FAIL. Failure ưu tiên của chính lượt này: **GS-013** — Policy từ chối vì không có nguồn chính thức trong kênh được phép.
