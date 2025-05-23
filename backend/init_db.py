# Local Development Helper

This script helps to initialize the database for local development.

```python
from app.database import Base, engine
from app.models import *  # Import all models

print("Creating database tables...")
Base.metadata.create_all(bind=engine)
print("Database tables created successfully!")
```

Run this script after setting up your backend environment:

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python init_db.py
```