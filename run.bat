@echo off
setlocal enabledelayedexpansion

:: Function to display help message
:show_help
echo Internal Management Platform - Run Script
echo Usage: run.bat [option]
echo Options:
echo   -h, --help     Show this help message
echo   -b, --backend  Run only the backend server
echo   -f, --frontend Run only the frontend server
echo   (no option)    Run both backend and frontend
goto :eof

:: Check if .env files exist, if not create them from examples
if not exist backend\.env (
  if exist backend\.env.example (
    echo Creating backend\.env from example...
    copy backend\.env.example backend\.env
    echo Please update backend\.env with your configuration if needed.
  ) else (
    echo Warning: backend\.env.example not found. You may need to create the .env file manually.
  )
)

if not exist frontend\.env (
  if exist frontend\.env.example (
    echo Creating frontend\.env from example...
    copy frontend\.env.example frontend\.env
    echo Please update frontend\.env with your configuration if needed.
  ) else (
    echo Warning: frontend\.env.example not found. You may need to create the .env file manually.
  )
)

:: Function to run backend
:run_backend
echo Setting up and running backend...
cd backend

:: Create virtual environment if it doesn't exist
if not exist venv (
  echo Creating virtual environment...
  python -m venv venv
)

:: Activate virtual environment
if exist venv\Scripts\activate.bat (
  echo Activating virtual environment...
  call venv\Scripts\activate.bat
) else (
  echo Error: Failed to create virtual environment. Please check your Python installation.
  exit /b 1
)

:: Install dependencies
echo Installing backend dependencies...
pip install -r requirements.txt

:: Initialize the database if it doesn't exist
if not exist app.db (
  echo Initializing database...
  python init_db.py
)

:: Run backend server
echo Starting backend server...
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
goto :eof

:: Function to run frontend
:run_frontend
echo Setting up and running frontend...
cd frontend

:: Install dependencies if node_modules doesn't exist
if not exist node_modules (
  echo Installing frontend dependencies...
  npm install
)

:: Run frontend development server
echo Starting frontend development server...
npm run dev
goto :eof

:: Parse command line arguments
if "%1"=="-h" goto show_help
if "%1"=="--help" goto show_help
if "%1"=="-b" goto run_backend
if "%1"=="--backend" goto run_backend
if "%1"=="-f" goto run_frontend
if "%1"=="--frontend" goto run_frontend

:: Run both services in separate windows if no arguments provided
echo Starting both backend and frontend services...
start cmd /k "cd %~dp0 && run.bat --backend"
start cmd /k "cd %~dp0 && run.bat --frontend"