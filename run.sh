#!/bin/bash

# Function to display help message
show_help() {
  echo "Internal Management Platform - Run Script"
  echo "Usage: ./run.sh [option]"
  echo "Options:"
  echo "  -h, --help     Show this help message"
  echo "  -b, --backend  Run only the backend server"
  echo "  -f, --frontend Run only the frontend server"
  echo "  (no option)    Run both backend and frontend"
}

# Check if the .env files exist, if not create them from the examples
if [ ! -f backend/.env ]; then
  if [ -f backend/.env.example ]; then
    echo "Creating backend/.env from example..."
    cp backend/.env.example backend/.env
    echo "Please update backend/.env with your configuration if needed."
  else
    echo "Warning: backend/.env.example not found. You may need to create the .env file manually."
  fi
fi

if [ ! -f frontend/.env ]; then
  if [ -f frontend/.env.example ]; then
    echo "Creating frontend/.env from example..."
    cp frontend/.env.example frontend/.env
    echo "Please update frontend/.env with your configuration if needed."
  else
    echo "Warning: frontend/.env.example not found. You may need to create the .env file manually."
  fi
fi

# Function to run backend
run_backend() {
  echo "Setting up and running backend..."
  cd backend || exit
  
  # Create virtual environment if it doesn't exist
  if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python -m venv venv
  fi
  
  # Activate virtual environment
  if [ -f "venv/bin/activate" ]; then
    echo "Activating virtual environment..."
    source venv/bin/activate
  else
    echo "Error: Failed to create virtual environment. Please check your Python installation."
    exit 1
  fi
  
  # Install dependencies
  echo "Installing backend dependencies..."
  pip install -r requirements.txt
  
  # Initialize the database if it doesn't exist
  if [ ! -f "app.db" ]; then
    echo "Initializing database..."
    python init_db.py
  fi
  
  # Run backend server
  echo "Starting backend server..."
  uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
}

# Function to run frontend
run_frontend() {
  echo "Setting up and running frontend..."
  cd frontend || exit
  
  # Install dependencies if node_modules doesn't exist
  if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
  fi
  
  # Run frontend development server
  echo "Starting frontend development server..."
  npm run dev
}

# Parse command line arguments
case "$1" in
  -h|--help)
    show_help
    exit 0
    ;;
  -b|--backend)
    run_backend
    ;;
  -f|--frontend)
    run_frontend
    ;;
  *)
    # Run both services in separate terminals if no arguments provided
    echo "Starting both backend and frontend services..."
    if command -v gnome-terminal &> /dev/null; then
      gnome-terminal -- bash -c "$(dirname "$0")/run.sh --backend; exec bash"
      gnome-terminal -- bash -c "$(dirname "$0")/run.sh --frontend; exec bash"
    elif command -v xterm &> /dev/null; then
      xterm -e "$(dirname "$0")/run.sh --backend" &
      xterm -e "$(dirname "$0")/run.sh --frontend" &
    else
      echo "Cannot open multiple terminals automatically."
      echo "Please run backend and frontend separately:"
      echo "./run.sh --backend"
      echo "./run.sh --frontend"
    fi
    ;;
esac