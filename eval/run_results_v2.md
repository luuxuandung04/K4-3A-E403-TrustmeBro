# Bao Cao Golden Set V2 — Do Mo Hinh That (Discord Pipeline)
**Thoi gian thuc thi:** 2026-09-17 20:22:10 (Asia/Ho_Chi_Minh)
**Bo de:** `eval/golden_set_v2.json` — 35 ca test + 2 seed tao ngu canh
**SHA-256 bo de (chong sua de lam dep so lieu):** `70b7ecf7ee3dbfbebbbca01e3372d88a21df8453878fcbb8ad798a7138efed56`
**Engine:** gemini | **Moc thoi gian khoa:** 2026-09-17T14:00:00+07:00

> Quality Bar KHOA TU CP4: Dat khi >= 85% ca vuot qua Golden Set VA 0% ca bia/sai deadline. Khong nang bar. Khong sua de.

---

## 1. Tong quan vs Quality Bar CP4

| Chi so | Bar CP4 (khoa) | Ket qua | Danh gia |
| :--- | :---: | :---: | :---: |
| Tong ca | 35 ca | **35 ca** | Du bo de |
| So ca PASS | >= 30 ca | **6 ca** | ROT |
| Ti le dat | >= 85.0% | **17.14%** | Khong dat |
| Ca bia/sai deadline | 0 ca (0.0%) | **5 ca (14.29%)** | VI PHAM |
| **KET LUAN** | | **KHONG DAT** | |

Danh sach ca bia/sai deadline: V2-04, V2-08, V2-18, V2-26, V2-35

---

## 2. Theo lop do kho

| Lop | So ca | PASS | Ti le |
| :--- | :---: | :---: | :---: |
| Bẫy căn cứ & Số nhiễu | 6 | 4/6 | 66.7% |
| Mơ hồ & Quy đổi thời gian | 6 | 0/6 | 0.0% |
| Ngoài thẩm quyền & Lọc nhiễu | 5 | 1/5 | 20.0% |
| Đặc thù miền & Phạm vi lớp | 6 | 0/6 | 0.0% |
| Adversarial Zero-Hallucination | 7 | 0/7 | 0.0% |
| Cập nhật đè & Chuỗi đa tin nhắn | 5 | 1/5 | 20.0% |

---

## 3. Chi tiet 35 ca

| ID | Lop | Phan loai | Ky vong | Thuc te | Trang thai | Loi |
| :-: | :--- | :--- | :--- | :--- | :--- | :--- |
| V2-01 | Bẫy căn cứ & Số nhiễu | Số điện thoại / phòng học / tín chỉ cài cắm | PROCESSED_WITH_DEADLINE | DEADLINE / 2026-09-20T23:59:00+07:00 | **PASS** |  |
| V2-02 | Bẫy căn cứ & Số nhiễu | Link nộp bài + giờ trong URL | PROCESSED_WITH_DEADLINE | DEADLINE / 2026-09-19T21:00:00+07:00 | **PASS** |  |
| V2-02B | Mơ hồ & Quy đổi thời gian | Thứ 5 tuần sau khi hôm nay là thứ 5 | PROCESSED_WITH_DEADLINE | OTHER / - | **FAIL** | Sai type: chap nhan ['DEADLINE'], model tra OTHER; MAT deadline: mong cho 2026-09-24T08:00, model tra null; Sai start_time: mong cho None, model tra 2026-09-17T08:00; Sai time_precision: mong cho DEADLINE_ONLY, model tra |
| V2-03 | Bẫy căn cứ & Số nhiễu | Năm cũ trong câu đùa + mốc thật | PROCESSED_WITH_DEADLINE | DEADLINE / 2026-10-03T23:59:00+07:00 | **PASS** |  |
| V2-04 | Bẫy căn cứ & Số nhiễu | Meeting có nhiều mốc giờ nhưng không phải deadline | MEETING_NO_DEADLINE | DEADLINE / 2026-09-18T14:00:00+07:00 | **FAIL + BIA/SAI DEADLINE** | Sai type: chap nhan ['MEETING'], model tra DEADLINE; BIA deadline: mong cho null, model tra 2026-09-18T14:00; Sai start_time: mong cho 2026-09-19T20:00, model tra None; Sai time_precision: mong cho START_TIME_ONLY, model |
| V2-05 | Bẫy căn cứ & Số nhiễu | Sinh viên chốt khung call nhóm, đầy mốc giờ nhưng không từ khóa sự kiện | FILTERED_NO_DECISION | - / - | **PASS** |  |
| V2-06 | Mơ hồ & Quy đổi thời gian | "Ngày kia" khi sự kiện đã qua | PROCESSED_WITH_DEADLINE | OTHER / - | **FAIL** | Sai type: chap nhan ['DEADLINE'], model tra OTHER; MAT deadline: mong cho 2026-09-19T08:00, model tra null; Sai start_time: mong cho None, model tra 2026-09-19T08:00; Sai time_precision: mong cho DEADLINE_ONLY, model tra |
| V2-07 | Mơ hồ & Quy đổi thời gian | Hai mốc giờ tương đối trong một tin | MEETING_NO_DEADLINE | OTHER / - | **FAIL** | Sai type: chap nhan ['MEETING'], model tra OTHER; Sai start_time: mong cho 2026-09-18T14:00, model tra 2026-09-18T21:00; Sai time_precision: mong cho START_TIME_ONLY, model tra DATE_ONLY |
| V2-08 | Mơ hồ & Quy đổi thời gian | Viết tắt AM/PM và giờ 12h | PROCESSED_WITH_DEADLINE | DEADLINE / 2026-10-01T11:59:00+07:00 | **FAIL + BIA/SAI DEADLINE** | SAI deadline: mong cho 2026-10-01T23:59, model tra 2026-10-01T11:59 |
| V2-09 | Mơ hồ & Quy đổi thời gian | "Nửa đêm mai" và mốc chốt danh sách | PROCESSED_WITH_DEADLINE | OTHER / - | **FAIL** | Sai type: chap nhan ['DEADLINE'], model tra OTHER; MAT deadline: mong cho 2026-09-19T00:00, model tra null; Sai start_time: mong cho None, model tra 2026-09-17T00:00; Sai time_precision: mong cho DEADLINE_ONLY, model tra |
| V2-10 | Mơ hồ & Quy đổi thời gian | Tin nhắn không có mốc tuyệt đối | RELEVANT_NO_TIME | CLASS / - | **FAIL** | Sai type: chap nhan ['DEADLINE'], model tra CLASS; Sai start_time: mong cho None, model tra 2026-09-17T20:00; Sai time_precision: mong cho NONE, model tra START_TIME_ONLY |
| V2-11 | Ngoài thẩm quyền & Lọc nhiễu | Sinh viên tung tin không chính thức | FILTERED_NO_DECISION | - / - | **FAIL** | Sai filter: mong cho LOC, thuc te PASS |
| V2-12 | Ngoài thẩm quyền & Lọc nhiễu | Sinh viên đưa tin 'khẩn' nhưng sai thẩm quyền | FILTERED_NO_DECISION | - / - | **FAIL** | Sai filter: mong cho LOC, thuc te PASS |
| V2-13 | Ngoài thẩm quyền & Lọc nhiễu | Tin nhắn đùa giỡn về hạn nộp | FILTERED_NO_DECISION | - / - | **PASS** |  |
| V2-14 | Ngoài thẩm quyền & Lọc nhiễu | Hỏi mẹo nộp bù khi form đóng | FILTERED_NO_DECISION | - / - | **FAIL** | Sai filter: mong cho LOC, thuc te PASS |
| V2-15 | Ngoài thẩm quyền & Lọc nhiễu | "Mình tự chốt deadline" không có thẩm quyền | FILTERED_NO_DECISION | - / - | **FAIL** | Sai filter: mong cho LOC, thuc te PASS |
| V2-16 | Đặc thù miền & Phạm vi lớp | Lớp 3B gửi nhầm kênh 3A | PROCESSED_WITH_DEADLINE | CLASS / - | **FAIL** | Sai type: chap nhan ['DEADLINE'], model tra CLASS; MAT deadline: mong cho 2026-09-25T21:00, model tra null; Sai start_time: mong cho None, model tra 2026-09-25T21:00; Sai time_precision: mong cho DEADLINE_ONLY, model tra |
| V2-17 | Đặc thù miền & Phạm vi lớp | Đăng ký tham quan tự nguyện | PROCESSED_WITH_DEADLINE | OTHER / - | **FAIL** | Sai type: chap nhan ['ANNOUNCEMENT'], model tra OTHER; MAT deadline: mong cho 2026-09-20T17:00, model tra null; Sai start_time: mong cho None, model tra 2026-09-25T09:00; Sai time_precision: mong cho DEADLINE_ONLY, model |
| V2-18 | Đặc thù miền & Phạm vi lớp | Thay đổi phòng học, không phải deadline | MEETING_NO_DEADLINE | DEADLINE / 2026-09-17T13:30:00+07:00 | **FAIL + BIA/SAI DEADLINE** | Sai type: chap nhan ['MEETING'], model tra DEADLINE; BIA deadline: mong cho null, model tra 2026-09-17T13:30; Sai start_time: mong cho 2026-09-17T13:30, model tra None; Sai time_precision: mong cho START_TIME_ONLY, model |
| V2-19 | Đặc thù miền & Phạm vi lớp | Quy chế Quiz chỉ tính lần đầu | PROCESSED_WITH_DEADLINE | OTHER / - | **FAIL** | Sai type: chap nhan ['DEADLINE'], model tra OTHER; MAT deadline: mong cho 2026-09-22T19:30, model tra null; Sai start_time: mong cho None, model tra 2026-09-22T19:30; Sai time_precision: mong cho DEADLINE_ONLY, model tra |
| V2-20 | Đặc thù miền & Phạm vi lớp | Hai mốc phân biệt nộp bài thật vs office hour | PROCESSED_WITH_DEADLINE | CLASS / - | **FAIL** | Sai type: chap nhan ['DEADLINE'], model tra CLASS; MAT deadline: mong cho 2026-09-27T23:59, model tra null; Sai start_time: mong cho None, model tra 2026-09-27T23:59; Sai time_precision: mong cho DEADLINE_ONLY, model tra |
| V2-21 | Adversarial Zero-Hallucination | Deadline giả trong ngoặc đùa | PROCESSED_WITH_DEADLINE | CLASS / - | **FAIL** | Sai type: chap nhan ['DEADLINE'], model tra CLASS; MAT deadline: mong cho 2026-09-24T23:59, model tra null; Sai start_time: mong cho None, model tra 2026-09-24T23:59; Sai time_precision: mong cho DEADLINE_ONLY, model tra |
| V2-22 | Adversarial Zero-Hallucination | Mốc cũ bị huỷ ngay trong tin | PROCESSED_WITH_DEADLINE | CLASS / - | **FAIL** | Sai type: chap nhan ['DEADLINE'], model tra CLASS; MAT deadline: mong cho 2026-09-27T23:59, model tra null; Sai start_time: mong cho None, model tra 2026-09-25T23:59; Sai time_precision: mong cho DEADLINE_ONLY, model tra |
| V2-23 | Adversarial Zero-Hallucination | Hai tin cùng topic, tin sau nhắc nộp sớm hơn | PROCESSED_WITH_DEADLINE | OTHER / - | **FAIL** | Sai type: chap nhan ['DEADLINE'], model tra OTHER; MAT deadline: mong cho 2026-09-24T20:00, model tra null; Sai start_time: mong cho None, model tra 2026-09-24T20:00; Sai time_precision: mong cho DEADLINE_ONLY, model tra |
| V2-24 | Adversarial Zero-Hallucination | Quên giờ, chỉ nói ngày và kênh nộp | RELEVANT_NO_TIME | OTHER / - | **FAIL** | Sai type: chap nhan ['ANNOUNCEMENT'], model tra OTHER; Sai start_time: mong cho None, model tra 2026-09-17T20:00; Sai time_precision: mong cho NONE, model tra DATE_ONLY |
| V2-26 | Adversarial Zero-Hallucination | Meeting có nhắc deadline cũ để đối chiếu | MEETING_NO_DEADLINE | DEADLINE / 2026-09-22T20:00:00+07:00 | **FAIL + BIA/SAI DEADLINE** | Sai type: chap nhan ['MEETING'], model tra DEADLINE; BIA deadline: mong cho null, model tra 2026-09-22T20:00; Sai start_time: mong cho 2026-09-22T20:00, model tra None; Sai time_precision: mong cho START_TIME_ONLY, model |
| V2-27 | Cập nhật đè & Chuỗi đa tin nhắn | GV gia hạn Lab 3 đè tin gốc | PROCESSED_WITH_DEADLINE | DEADLINE / 2026-09-26T23:59:00+07:00 | **PASS** |  |
| V2-28 | Cập nhật đè & Chuỗi đa tin nhắn | SINH VIÊN tự dời hạn, không được đè | FILTERED_NO_DECISION | - / - | **FAIL** | Sai filter: mong cho LOC, thuc te PASS; Side-effect: SEED-LAB3 phai giu PROCESSED, thuc te SUPERSEDED |
| V2-29 | Cập nhật đè & Chuỗi đa tin nhắn | GV xác nhận STUB của TA | PROCESSED_WITH_DEADLINE | DEADLINE / 2026-09-30T23:59:00+07:00 | **FAIL** | Sai importance: mong cho HIGH, model tra NORMAL |
| V2-30 | Cập nhật đè & Chuỗi đa tin nhắn | TA sửa giờ nhưng mốc trùng bản GV | PROCESSED_WITH_DEADLINE | OTHER / - | **FAIL** | Sai type: chap nhan ['DEADLINE'], model tra OTHER; MAT deadline: mong cho 2026-09-30T23:59, model tra null; Sai start_time: mong cho None, model tra 2026-09-30T23:59; Sai time_precision: mong cho DEADLINE_ONLY, model tra |
| V2-31 | Adversarial Zero-Hallucination | Sinh viên xin điểm danh hộ và nhờ sửa điểm | FILTERED_NO_DECISION | - / - | **FAIL** | Sai filter: mong cho LOC, thuc te PASS |
| V2-32 | Đặc thù miền & Phạm vi lớp | BTC đóng form và chế tài nộp muộn | PROCESSED_WITH_DEADLINE | DEADLINE / 2026-09-28T21:00:00+07:00 | **FAIL** | Sai importance: mong cho HIGH, model tra NORMAL |
| V2-33 | Cập nhật đè & Chuỗi đa tin nhắn | Sinh viên 'đính chính' mốc GV, gây xung đột phạm vi | FILTERED_NO_DECISION | - / - | **FAIL** | Sai filter: mong cho LOC, thuc te PASS |
| V2-34 | Bẫy căn cứ & Số nhiễu | Hỏi link + số thứ tự bài, không có mốc giờ | RELEVANT_NO_TIME | OTHER / - | **FAIL** | Sai type: chap nhan ['ANNOUNCEMENT'], model tra OTHER; Sai start_time: mong cho None, model tra 2026-09-17T20:00; Sai time_precision: mong cho NONE, model tra DATE_ONLY |
| V2-35 | Adversarial Zero-Hallucination | Deadline bị dời về SỚM hơn trong chính tin nhắn | PROCESSED_WITH_DEADLINE | DEADLINE / 2026-09-30T23:59:00+07:00 | **FAIL + BIA/SAI DEADLINE** | Sai importance: mong cho HIGH, model tra NORMAL; SAI deadline: mong cho 2026-09-28T17:00, model tra 2026-09-30T23:59 |

---

## 4. Ghi chu van hanh
- Bo de cu `eval/golden_set.json` (25 ca Q&A) giu nguyen lam ho so, khong dung toi.
- Moi luot chay phai ghi lai SHA-256 o tren; SHA doi nghia la bo de da bi sua sau khi khoa.
- Chay offline (khong key) chi do fallback; luot do CP4 chinh thuc phai chay engine gemini.