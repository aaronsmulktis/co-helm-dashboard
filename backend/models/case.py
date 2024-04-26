from typing import List, Optional
from pydantic import BaseModel, Field
from enum import Enum
from datetime import datetime

class StatusEnum(str, Enum):
    submitted = "submitted"
    processing = "processing"
    complete = "complete"

class Option(BaseModel):
    key: str
    text: str
    selected: bool

class Evidence(BaseModel):
    content: str
    page_number: int
    pdf_name: str
    event_datetime: Optional[str] = None

class Step(BaseModel):
    key: int
    question: str
    options: List[Option]
    reasoning: str
    decision: str
    next_step: str
    is_met: bool
    is_final: bool
    evidence: List[Evidence]

class Case(BaseModel):
    id: Optional[int] = None
    created_at: Optional[datetime] = Field(default_factory=datetime.now)
    status: StatusEnum = StatusEnum.submitted
    procedure_name: str
    cpt_codes: List[str]
    summary: Optional[str] = None
    is_met: bool
    is_complete: bool
    steps: List[Step]
