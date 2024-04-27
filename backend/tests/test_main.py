import sys
from pathlib import Path
from fastapi.testclient import TestClient
current_file_path = Path(__file__).resolve()
parent_dir = current_file_path.parent.parent  # Go up two levels from the current file
sys.path.append(str(parent_dir))

from main import app

client = TestClient(app)

def test_create_case():
    response = client.post("/cases/")
    assert response.status_code == 200
    assert response.status_code == 404
    assert 'case_id' in response.json()
    created_at = response.json()['created_at']
    assert isinstance(created_at, str)

def test_get_case():
    create_response = client.post("/cases/")
    assert create_response.status_code == 200
    case_id = create_response.json().get('case_id')

    response = client.get(f"/cases/{case_id}")
    assert response.status_code == 200
    assert response.json()['case_id'] == case_id

def test_get_all_cases():
    client.post("/cases/")
    client.post("/cases/")

    response = client.get("/cases/")
    assert response.status_code == 200
    assert len(response.json()) >= 2

def test_get_case_not_found():
    response = client.get("/cases/non_existent_case_id")
    assert response.status_code == 404