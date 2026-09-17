# CP3 ΓÇö Kß║┐t quß║ú ─æ├ính gi├í l╞░ß╗út 1

## Kß║┐t quß║ú

| Chß╗ë sß╗æ | Gi├í trß╗ï |
|---|---:|
| Tß╗òng sß╗æ case | 20 |
| PASS | 19 |
| FAIL | 1 |
| Tß╗╖ lß╗ç ─æß║ít | **95%** |
| Case bß╗ïa/sai deadline | 0 |
| Quality bar | ΓëÑ85% v├á 0 case bß╗ïa deadline |
| ─Éß║ít quality bar? | **C├ô** |

## Phß║ím vi ─æo

L╞░ß╗út chß║íy n├áy chß║Ñm **20 output AI-backed hybrid** bß║▒ng c├╣ng mß╗Öt scorer cß╗æ ─æß╗ïnh. Model NVIDIA NIM API / deepseek-ai/deepseek-v4-flash-0731 tr├¡ch xuß║Ñt dß╗» kiß╗çn, sau ─æ├│ policy code quyß║┐t ─æß╗ïnh trß║íng th├íi cuß╗æi. ─É├óy l├á ─æß╗Ö ch├¡nh x├íc end-to-end cß╗ºa pipeline model + policy, kh├┤ng phß║úi ─æß╗Ö ch├¡nh x├íc thuß║ºn cß╗ºa model. Metadata v├á SHA-256 b├¬n d╞░ß╗¢i li├¬n kß║┐t response vß╗¢i trace lß╗¥i gß╗ìi thß║¡t.

## Provenance

| Tr╞░ß╗¥ng | Gi├í trß╗ï |
|---|---|
| response_file | ai-responses-run-01.json |
| response_file_sha256 | 9b7734a799f74e6faf6efc720118fa0d280a040d70182f4fdeaecadde6589680 |
| provider | NVIDIA NIM API |
| model | deepseek-ai/deepseek-v4-flash-0731 |
| prompt_version | deadline-extractor-v1 |
| parameters | `{"max_tokens":2048,"reasoning_effort":"none","temperature":0,"response_format":"json_object","successful_case_count":20,"provider_request_attempts":20,"policy_engine":"hybrid-policy-v1"}` |
| trace_ref | eval/traces/nvidia-run-01-2026-09-17T08-15-43-545Z.json |
| trace_sha256 | 8514e9bbc47a0187f7f2eaafbe2da7ea956bcdba371da4effa0d0552bada9101 |

## Case ch╞░a ─æß║ít

| Case | Mong ─æß╗úi | Thß╗▒c tß║┐ | Nguy├¬n nh├ón |
|---|---|---|---|
| GS-013 | IGNORED_OUT_OF_SCOPE | REJECTED | Policy tß╗½ chß╗æi v├¼ kh├┤ng c├│ nguß╗ôn ch├¡nh thß╗⌐c trong k├¬nh ─æ╞░ß╗úc ph├⌐p. |

## Kß║┐t luß║¡n l╞░ß╗út 1

Kß║┐t quß║ú ─æ╞░ß╗úc giß╗» nguy├¬n, kß╗â cß║ú case FAIL. Failure ╞░u ti├¬n cß╗ºa ch├¡nh l╞░ß╗út n├áy: **GS-013** ΓÇö Policy tß╗½ chß╗æi v├¼ kh├┤ng c├│ nguß╗ôn ch├¡nh thß╗⌐c trong k├¬nh ─æ╞░ß╗úc ph├⌐p.
