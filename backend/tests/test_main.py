from fastapi.testclient import TestClient
import pytest
from ..app.main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "healthy"}

def test_setup_endpoint():
    response = client.get("/setup")
    assert response.status_code == 200
    assert "message" in response.json()