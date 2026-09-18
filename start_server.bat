@echo off
chcp 65001 > nul
title Discord Deadline Guard - FastAPI Server
cls
echo =======================================================================
echo   DISCORD DEADLINE & LOGISTICS GUARD - SERVER KHỞI ĐỘNG
echo =======================================================================
echo.
echo Server đang khởi động tại: http://127.0.0.1:8000
echo Mở trình duyệt tại: http://127.0.0.1:8000
echo.
echo Bấm Ctrl+C để dừng server.
echo =======================================================================
python -m uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload
pause
