# coding: utf-8
"""
Script khôi phục dữ liệu Demo gốc và dọn sạch các tin nhắn/deadline thử nghiệm.
Chạy: python scripts/reset_demo_data.py
"""
import sys
from pathlib import Path

# Add project root to sys.path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from backend.services.demo_reset import reset_all_demo_data

if __name__ == "__main__":
    res = reset_all_demo_data()
    msg = res["message"].encode("ascii", errors="replace").decode()
    print(f"[RESET DEMO DATA] {msg}")
    print(f"- Channels reset: {len(res['channels_reset'])} ({', '.join(res['channels_reset'])})")
    print(f"- Deadlines: {res['deadlines_count']}")
    print(f"- Events: {res['events_count']}")
