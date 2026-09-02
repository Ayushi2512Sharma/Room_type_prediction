@echo off
start "" cmd /c "timeout /t 2 >nul & start http://127.0.0.1:8000/docs"
python -m uvicorn main:app --reload
pause