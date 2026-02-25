@echo off
REM Siragugal App - Setup Script for Windows
REM This script sets up both frontend and backend

echo 🌾 Siragugal Agricultural Management System - Setup
echo ==================================================

REM Check Node.js
where node >nul 2>nul
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js 16+
    pause
    exit /b 1
)

REM Check npm
where npm >nul 2>nul
if errorlevel 1 (
    echo ❌ npm is not installed. Please install npm
    pause
    exit /b 1
)

REM Check PHP
where php >nul 2>nul
if errorlevel 1 (
    echo ❌ PHP is not installed. Please install PHP 7.4+
    pause
    exit /b 1
)

echo ✓ All prerequisites found
echo.

REM Setup Backend
echo 📦 Setting up Backend...
cd backend
if not exist .env (
    echo Creating .env file...
    copy nul .env >nul
)
echo ✓ Backend ready at .\backend\
cd ..

REM Setup Frontend
echo.
echo 📦 Setting up Frontend...
cd frontend
echo Installing npm dependencies...
call npm install --legacy-peer-deps
if not exist .env (
    echo ✓ .env file already configured
)
echo ✓ Frontend ready at .\frontend\
cd ..

REM Summary
echo.
echo ==================================================
echo ✅ Setup Complete!
echo ==================================================
echo.
echo 📝 Next Steps:
echo.
echo 1. Setup Database:
echo    mysql -u root -p < database/migrations/001_initial_schema.sql
echo.
echo 2. Start Backend (in new terminal):
echo    cd backend
echo    php -S localhost:8000
echo.
echo 3. Start Frontend (in new terminal):
echo    cd frontend
echo    npm run dev
echo.
echo 4. Open http://localhost:3000 in your browser
echo.
echo 📚 Documentation:
echo    - README.md - Main documentation
echo    - QUICKSTART.md - Quick start guide
echo    - frontend/README.md - Frontend docs
echo    - backend/README.md - Backend docs
echo.
echo 🌾 Happy farming!
echo.
pause
