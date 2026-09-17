> **Ghi chú vị trí tại CP4:** File này là bản sao nguyên văn từ nhánh CP3. Các đường dẫn `eval/...`
> trong hướng dẫn gốc tương ứng với `eval/cp3/...` trên nhánh hiện tại (ví dụ: `node eval/cp3/run_eval.mjs`
> nếu khôi phục đầy đủ runner). Bộ đề ở đây là `golden_set_cp3.json` (20 case).

# CP3 Evaluation

## Artifact

- `golden_set.json`: 20 case cß╗æ ─æß╗ïnh.
- `run_eval.mjs`: bß╗Ö chß║íy v├á chß║Ñm tß╗▒ ─æß╗Öng, kh├┤ng cß║ºn c├ái package.
- `run-01.json`: kß║┐t quß║ú chi tiß║┐t dß║íng m├íy ─æß╗ìc.
- `run-01.csv`: bß║úng kß║┐t quß║ú ─æß╗â mß╗ƒ bß║▒ng Excel/Google Sheets.
- `RUN-01-REPORT.md`: sß╗æ tß╗òng hß╗úp v├á failure ch├¡nh.

## ─Éß╗Ö phß╗º Golden Set

| Nh├│m | Sß╗æ case |
|---|---:|
| Case th╞░ß╗¥ng | 8 |
| Case kh├│ | 8 |
| Case hiß║┐m | 4 |
| Tß╗òng | 20 |

Bß╗æn lß╗¢p chß╗ù kh├│ ─æß╗üu c├│ ├¡t nhß║Ñt 2 case: nguß╗ôn sß╗▒ thß║¡t; m╞í hß╗ô hoß║╖c thiß║┐u th├┤ng tin; ngo├ái phß║ím vi hoß║╖c thß║⌐m quyß╗ün; ─æß║╖c th├╣ domain/cohort.

C├│ 10 case ph├ít triß╗ân tß╗½ Discord pack ─æ├ú ß║⌐n danh; repo chß╗ë l╞░u m├ú `msg_id` v├á c├óu r├║t gß╗ìn cß║ºn thiß║┐t, kh├┤ng sao ch├⌐p nguy├¬n data pack.

`author_role`, `official` v├á `allowed_channel` l├á **nh├ún fixture do nh├│m ─æß║╖t ─æß╗â m├┤ phß╗Ång whitelist/policy**, kh├┤ng phß║úi role hoß║╖c t├¬n k├¬nh ─æ╞░ß╗úc suy ra tß╗½ data pack. Tr╞░ß╗¥ng `channel` giß╗» nguy├¬n m├ú ß║⌐n danh khi case bß║»t nguß╗ôn tß╗½ pack.

## Chß║íy lß║íi l╞░ß╗út ─æo

Y├¬u cß║ºu Node.js 18 trß╗ƒ l├¬n:

```powershell
node eval/run_eval.mjs
```

Lß╗çnh ghi ─æ├¿ `run-01.json`, `run-01.csv` v├á `RUN-01-REPORT.md`.

Kiß╗âm tra cß║Ñu tr├║c, ─æß╗Ö phß╗º v├á ph├⌐p t├¡nh:

```powershell
node eval/verify_eval.mjs
```

## Chß║Ñm output tß╗½ AI thß║¡t

### C├ích chß║íy trß╗▒c tiß║┐p vß╗¢i Google Gemini

Repository c├│ runner gß╗ìi Gemini thß║¡t bß║▒ng REST, kh├┤ng cß║ºn c├ái th├¬m package:

1. Mß╗ƒ file `.env` ß╗ƒ th╞░ mß╗Ñc gß╗æc.
2. D├ín API key sau `GEMINI_API_KEY=`. Kh├┤ng th├¬m dß║Ñu ngoß║╖c v├á kh├┤ng gß╗¡i key cho ng╞░ß╗¥i kh├íc.
3. Kiß╗âm tra mß╗Öt lß╗¥i gß╗ìi tr╞░ß╗¢c:

```powershell
node eval/run_gemini_eval.mjs --smoke
```

4. Nß║┐u smoke test th├ánh c├┤ng, chß║íy ─æß╗º 20 case:

```powershell
node eval/run_gemini_eval.mjs
```

Lß╗çnh ─æß║ºy ─æß╗º sß║╜:

- gß╗ìi Gemini mß╗Öt lß║ºn cho tß╗½ng case;
- l╞░u output hß╗ç thß╗æng v├áo `ai-responses-run-01.json`;
- l╞░u trace c├│ timestamp v├á ─æ├ú loß║íi API key v├áo `traces/`;
- chß║íy scorer ─æß╗â cß║¡p nhß║¡t `run-01.json`, `run-01.csv`, `RUN-01-REPORT.md`;
- chß║íy verifier ─æß╗â ─æß╗æi chiß║┐u lß║íi ph├⌐p t├¡nh.

Smoke test v├á full run lu├┤n d├╣ng hai trace kh├íc nhau. Output full run l╞░u cß║ú `trace_ref` v├á `trace_sha256`; verifier sß║╜ b├ío lß╗ùi nß║┐u trace bß╗ï sß╗¡a, bß╗ï cß║»t hoß║╖c kh├┤ng c├▓n tß╗ôn tß║íi.

Gemini chß╗ë tr├¡ch xuß║Ñt dß╗» kiß╗çn deadline. Policy bß║▒ng code mß╗¢i quyß║┐t ─æß╗ïnh c├┤ng bß╗æ, tß╗½ chß╗æi hay chuyß╗ân ng╞░ß╗¥i duyß╗çt. Chß║┐ ─æß╗Ö eval gß╗ìi model cho ─æß╗º 20 case ─æß╗â mß╗ùi case ─æß╗üu c├│ trace; Candidate Gate cß╗ºa luß╗ông production vß║½n c├│ thß╗â loß║íi input tr╞░ß╗¢c khi gß╗ìi model ─æß╗â giß║úm chi ph├¡.

Chß╗ë gß╗¡i Golden Set ─æ├ú ß║⌐n danh/synthetic v├áo API. Kh├┤ng ─æ╞░a chatlog th├┤, th├┤ng tin c├í nh├ón hoß║╖c secret v├áo case ─æ├ính gi├í.

Nß║┐u muß╗æn ─æß╗òi model, sß╗¡a `GEMINI_MODEL` trong `.env`. Mß║╖c ─æß╗ïnh hiß╗çn tß║íi l├á `gemini-3.6-flash`, theo model m├á Gemini API cß║Ñp cho t├ái khoß║ún mß╗¢i.

### Chß║íy bß║▒ng DeepSeek

Nß║┐u Gemini kh├┤ng ─æß╗º quota, giß╗» nguy├¬n Gemini key v├á ─æiß╗ün th├¬m trong `.env`:

```env
DEEPSEEK_API_KEY=key_cß╗ºa_bß║ín
DEEPSEEK_MODEL=deepseek-flash
```

Kiß╗âm tra mß╗Öt case rß╗ôi chß║íy ─æß╗º 20 case:

```powershell
node eval/run_deepseek_eval.mjs --smoke
node eval/run_deepseek_eval.mjs
```

Runner d├╣ng JSON Output, tß║»t thinking cho t├íc vß╗Ñ tr├¡ch xuß║Ñt ngß║»n v├á vß║½n ├íp dß╗Ñng c├╣ng prompt, policy, Golden Set, scorer v├á verifier nh╞░ l╞░ß╗út Gemini.

### D├╣ng DeepSeek qua NVIDIA API Catalog

Key tß║ío tß║íi `build.nvidia.com` phß║úi d├╣ng NVIDIA NIM endpoint, kh├┤ng d├╣ng `api.deepseek.com`. L╞░u key n├áy trong biß║┐n ri├¬ng `NVIDIA_API_KEY`; runner kh├┤ng d├╣ng ch├⌐o key giß╗»a c├íc provider.

Model mß║╖c ─æß╗ïnh l├á free endpoint hiß╗çn h├ánh `deepseek-ai/deepseek-v4-flash-0731`:

```powershell
node eval/run_nvidia_eval.mjs --smoke
node eval/run_nvidia_eval.mjs
```

### Chß║Ñm file output ─æ├ú c├│

Xuß║Ñt kß║┐t quß║ú cß╗ºa model th├ánh JSON, mß╗Öt object cho mß╗ùi case:

```json
{
  "metadata": {
    "provider": "t├¬n nh├á cung cß║Ñp",
    "model": "t├¬n model",
    "prompt_version": "v1",
    "parameters": { "temperature": 0 },
    "trace_ref": "─æ╞░ß╗¥ng dß║½n trace trong repository",
    "trace_sha256": "64 k├╜ tß╗▒ SHA-256 cß╗ºa file trace"
  },
  "responses": [
    {
      "case_id": "GS-001",
      "decision": "PUBLISHED",
      "due_at_local": "2026-09-13T21:00:00+07:00",
      "source_message_id": "M49744",
      "calendar_action": "CREATE",
      "explanation": "Nguß╗ôn hß╗úp lß╗ç trong fixture."
    }
  ]
}
```

File thß║¡t phß║úi c├│ ─æß╗º output tß╗½ `GS-001` ─æß║┐n `GS-020`. Sau ─æ├│ chß║íy:

```powershell
node eval/run_eval.mjs --responses eval/ai-responses-run-01.json
```

Giß╗» lß║íi `ai-responses-run-01.json` v├á log/trace lß╗¥i gß╗ìi model trong repo. Scorer l╞░u SHA-256 cß╗ºa file, model, prompt version v├á parameters v├áo b├ío c├ío ─æß╗â ─æß╗æi chiß║┐u.

## Quy tß║»c PASS/FAIL

Mß╗Öt case chß╗ë PASS khi ─æß╗ông thß╗¥i ─æ├║ng quyß║┐t ─æß╗ïnh, ng├áy giß╗¥ chuß║⌐n h├│a, message nguß╗ôn, h├ánh ─æß╗Öng calendar v├á kh├┤ng bß╗ïa mß╗Öt deadline kh├íc ─æ├íp ├ín.

## Disclosure bß║»t buß╗Öc

`run-01` hiß╗çn l├á l╞░ß╗út **AI-backed hybrid thß║¡t**: 20/20 case ─æ╞░ß╗úc gß╗¡i tß╗¢i NVIDIA NIM API, model `deepseek-ai/deepseek-v4-flash-0731` tr├¡ch xuß║Ñt dß╗» kiß╗çn, sau ─æ├│ policy code quyß║┐t ─æß╗ïnh trß║íng th├íi cuß╗æi. Kß║┐t quß║ú l├á **19/20 PASS = 95%, 0 case bß╗ïa/sai deadline**. ─É├óy kh├┤ng phß║úi ΓÇ£─æß╗Ö ch├¡nh x├íc thuß║ºn cß╗ºa modelΓÇ¥; n├│ l├á ─æß╗Ö ch├¡nh x├íc end-to-end cß╗ºa pipeline model + policy.
