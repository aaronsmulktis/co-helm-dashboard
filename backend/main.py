from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.routes import router as case_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(case_router, prefix="/api")