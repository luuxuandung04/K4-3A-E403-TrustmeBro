# Báo cáo bằng chứng CP3 — Lượt đo Run-01 (lưu trữ, giữ nguyên số liệu gốc)

> **Ghi chú lưu trữ (thêm tại CP4):** Thư mục `eval/cp3/` là bản sao nguyên văn bằng chứng lượt đo CP3
> từ nhánh `quangdung` (commit `fcf4413` + `52574c5`), giữ lại để đối chiếu với `spec.md` §7.
> Bộ đề CP3 (20 case) và lượt Run-01 KHÔNG bị sửa. Bộ đề đo chính thức tại CP4 là
> `eval/golden_set.json` (35 case); kết quả lượt stress test CP4 báo cáo riêng tại
> `eval/run_results.md` — không dùng để thay thế hay làm đẹp số liệu CP3.
>
> Script kiểm chứng gốc (`verify_eval.mjs`) yêu cầu các file response/trace nằm cùng thư mục `eval/`
> của nhánh CP3; các file đó không chuyển sang đây được do khác biệt xuống dòng khi trích xuất làm lệch
> SHA trong provenance. Số liệu tự kiểm của lượt đo giữ nguyên trong `run-01.json` và `run-01.csv`.

---
