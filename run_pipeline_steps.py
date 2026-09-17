# coding: utf-8
import sys
import json
import argparse
from pathlib import Path

# Add project root to sys.path
sys.path.insert(0, str(Path(__file__).resolve().parent))

from backend.models.discord_raw import DiscordRawEvent, RawMessageData, RawAuthor
from backend.services.filter_router import filter_and_route
from backend.services.ai_extractor import extract_semantics
from backend.services.validator import validate_and_create_document
from backend.services.aggregator import aggregate_events
from backend.services.discord_formatter import format_discord_payload
from backend.db.json_store import get_store

SAMPLE_RAW_EVENT = DiscordRawEvent(
    t="MESSAGE_CREATE",
    d=RawMessageData(
        id="1152837492837462",
        guild_id="123456789012345678",
        channel_id="99887766554433",
        author=RawAuthor(id="1029384756", username="ThayDong_Tech"),
        content="@everyone Chào các bạn, ngày mai chúng ta có lịch họp online lúc 20:00 để chốt tiến độ dự án AI nhé. Link meet mình sẽ gửi sau.",
        timestamp="2026-09-17T14:19:00.000Z",
        mention_everyone=True
    )
)

def print_banner(title: str):
    print("\n" + "=" * 60)
    print(f"  {title}")
    print("=" * 60)

def step_1():
    print_banner("BƯỚC 1: DISCORD RAW EVENT -> BACKEND LẤY METADATA")
    print("1.1. Tin nhắn gốc nhận từ Discord API (MESSAGE_CREATE):")
    print(json.dumps(SAMPLE_RAW_EVENT.model_dump(), ensure_ascii=False, indent=2))
    
    passed, reason, ai_input = filter_and_route(SAMPLE_RAW_EVENT)
    print(f"\n1.2. Kết quả qua Candidate Gate (Bộ lọc Whitelist & Keywords):")
    print(f"  - Trạng thái: {'[PASS] Cho phép gọi AI' if passed else '[IGNORE] Bỏ qua'}")
    print(f"  - Lý do: {reason}")
    
    print("\n1.3. Backend đóng gói sạch thành AI Input JSON (JSON 2):")
    print(json.dumps(ai_input.model_dump(), ensure_ascii=False, indent=2))
    return ai_input

def step_2(ai_input=None):
    if ai_input is None:
        ai_input = step_1()
    
    print_banner("BƯỚC 2: AI SEMANTIC EXTRACTOR (ZERO-HALLUCINATION)")
    print("AI phân tích ngữ nghĩa tiếng Việt và trích xuất JSON 3:")
    ai_output = extract_semantics(ai_input)
    print(json.dumps(ai_output.model_dump(), ensure_ascii=False, indent=2))
    
    print("\nKiểm tra quy tắc Zero-Hallucination:")
    print(f"  - Event Type: {ai_output.classification.type}")
    print(f"  - Start Time: {ai_output.schedule.start_time}")
    print(f"  - End Time  : {ai_output.schedule.end_time} (Phải là null vì tin nhắn không nói kết thúc lúc nào!)")
    print(f"  - Deadline  : {ai_output.schedule.deadline} (Phải là null vì đây là lịch họp, không phải nộp bài!)")
    return ai_input, ai_output

def step_3(ai_input=None, ai_output=None):
    if ai_input is None or ai_output is None:
        ai_input, ai_output = step_2()
    
    print_banner("BƯỚC 3: BACKEND VALIDATE & LƯU VÀO JSON STORE (DATA/EVENTS.JSON)")
    valid, reason, doc = validate_and_create_document(ai_input, ai_output)
    print(f"Trạng thái xác thực: {valid} ({reason})")
    print("\nDocument Schema hoàn chỉnh đã lưu (kèm source metadata & message_url):")
    print(json.dumps(doc.model_dump(by_alias=True), ensure_ascii=False, indent=2))
    return doc

def step_4():
    print_banner("BƯỚC 4: BACKEND AGGREGATOR (GOM LỊCH 7 NGÀY TỚI)")
    view_model = aggregate_events()
    print("UI View Model (Dữ liệu lịch trình đã gom):")
    print(json.dumps(view_model.model_dump(by_alias=True), ensure_ascii=False, indent=2))
    return view_model

def step_5(view_model=None):
    if view_model is None:
        view_model = step_4()
    
    print_banner("BƯỚC 5: SINH DISCORD API PAYLOAD (EMBEDS + LINK BUTTONS)")
    payload = format_discord_payload(view_model)
    print("Discord Payload JSON gửi tới Discord API:")
    print(json.dumps(payload.model_dump(), ensure_ascii=False, indent=2))
    
    print("\nTrải nghiệm học viên nhìn thấy trên Discord:")
    print(f"{payload.content}\n")
    for emb in payload.embeds:
        print(f"┌─ {emb.title} ───────────────────")
        print(f"│ {emb.description}")
        for f in emb.fields:
            lines = f.value.split('\n')
            print(f"│\n│ {f.name}")
            for l in lines:
                print(f"│   {l}")
        print(f"│\n│ {emb.footer.text}")
        print("└────────────────────────────────────────")
    
    btn_labels = [f"[{b.label}]" for b in payload.components[0].components]
    print("Nút bấm liên kết: " + " ".join(btn_labels))

def main():
    parser = argparse.ArgumentParser(description="Chạy kiểm thử từng bước luồng xử lý")
    parser.add_argument("--step", type=int, choices=[1, 2, 3, 4, 5, 0], default=1,
                        help="Chọn bước cần chạy (1: Raw->Input, 2: AI Output, 3: Validate & Store, 4: Aggregator, 5: Discord Payload, 0: Chạy toàn bộ)")
    args = parser.parse_args()

    if args.step == 1:
        step_1()
    elif args.step == 2:
        step_2()
    elif args.step == 3:
        step_3()
    elif args.step == 4:
        step_4()
    elif args.step == 5:
        step_5()
    elif args.step == 0:
        ai_in = step_1()
        _, ai_out = step_2(ai_in)
        step_3(ai_in, ai_out)
        vm = step_4()
        step_5(vm)

if __name__ == "__main__":
    main()
