@echo off
title Portfolio Video Optimizer
echo ========================================================
echo Running Portfolio Video Compression Script...
echo ========================================================
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0compress-videos.ps1"
echo.
echo Press any key to exit...
pause >nul
