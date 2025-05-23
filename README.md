# Internal Management Platform

A comprehensive web application for centralized HR, Expense, Asset, Maintenance, Education/Social, and Travel Management.

## Project Overview

- **Purpose**: Centralize HR, Expense, Asset, Maintenance, Education/Social, and Travel Management into a single, user-friendly web application.
- **Tech Stack**:
  - **Backend**: Python (FastAPI), MySQL, Azure Storage
  - **Frontend**: React, Material UI
  - **Hosting**: Azure Virtual Machine (Linux), Azure Blob Storage for files, Microsoft Teams Webhook for notifications
  - **CI/CD**: GitHub with GitHub Actions for backend and frontend pipelines

## Features

- **Expense Reporting**: Submit, approve, and track expenses
- **Sick Leave Management**: Request, approve, and track sick leave
- **Education & Social Activities**: Browse, sign up for, and manage educational courses and social activities
- **Internal Asset Booking**: Book and manage internal resources like meeting rooms, projectors, etc.
- **Maintenance Issues Reporting**: Report and track maintenance issues
- **Corporate Travel Management**: Request, approve, and manage corporate travel arrangements

## Getting Started

### Prerequisites

- Python 3.11+
- Node.js 18+
- Docker (optional)
- MySQL (or use SQLite for development)

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Create a virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Create a `.env` file based on `.env.example` and configure your environment variables.

5. Run the application:
   ```
   uvicorn app.main:app --reload
   ```

6. Access the API documentation at http://localhost:8000/docs

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file based on `.env.example` and configure your environment variables.

4. Start the development server:
   ```
   npm run dev
   ```

5. Access the application at http://localhost:3000

### Docker Setup

You can also run the application using Docker:

1. Build and run the backend:
   ```
   cd backend
   docker build -t thack9-backend .
   docker run -p 8000:8000 thack9-backend
   ```

2. Build and run the frontend:
   ```
   cd frontend
   docker build -t thack9-frontend .
   docker run -p 3000:3000 thack9-frontend
   ```

## Deployment

- CI/CD pipelines are set up using GitHub Actions
- Backend and frontend are containerized and deployed to Azure VM
- Files are stored in Azure Blob Storage
- Notifications are sent via Microsoft Teams webhooks

## Architecture

- **Frontend**: React app communicates via REST APIs to Python backend
- **Backend**: Python (FastAPI), connected to MySQL and Azure Blob Storage
- **Notifications**: In-app notifications and Teams webhook for status updates
- **Deployment**: Dockerized services deployed to Azure VM (Linux)

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -am 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Submit a pull request