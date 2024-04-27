from fastapi import APIRouter, HTTPException
from typing import List, Dict
from datetime import datetime
from uuid import uuid4
import threading
import time
import json

from models.case import Case

router = APIRouter()

cases: Dict[str, Case] = {}

def update_cases():
  while True:
    current_time = datetime.now()
    for case_id, case in list(cases.items()):
      if case['status'] == 'complete':
        continue
      print(f'Updating case {case_id}')
      time_diff = (current_time - datetime.fromisoformat(case['created_at'])).seconds
      
      if time_diff >= 30:
        with open('../assets/response-3.json', 'r') as file:
          update_data = json.load(file)
        cases[case_id].update(update_data)
      elif time_diff >= 10 and time_diff < 30:
        with open('../assets/response-2.json', 'r') as file:
          update_data = json.load(file)
        cases[case_id].update(update_data)
      elif time_diff < 10:
        with open('../assets/response-1.json', 'r') as file:
          update_data = json.load(file)
        cases[case_id].update(update_data)
    time.sleep(1)
    
thread = threading.Thread(target=update_cases)
thread.daemon = True
thread.start()
      

@router.post("/cases/", response_model=Case)
async def create_case():
  with open('../assets/response-1.json', 'r') as file:
    data = json.load(file)
  new_id = data.get('case_id')
  data['created_at'] = datetime.now().isoformat()
  cases[new_id] = data
  return data

@router.get("/cases/{case_id}", response_model=Case)
async def get_case(case_id: str):
  case = cases.get(case_id)
  if not case:
      raise HTTPException(status_code=404, detail="Case not found")
  return case

@router.get("/cases/", response_model=List[Case])
async def get_all_cases():
  if not cases:
    raise HTTPException(status_code=404, detail="No cases available")
  return list(cases.values())