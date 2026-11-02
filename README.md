<div align="center">

# Guardian AI

### AI-Assisted Child Online Grooming Detection & Real-Time Alerting Platform

[![Python 3.11+](https://img.shields.io/badge/Python-3.11%2B-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![PyTorch](https://img.shields.io/badge/PyTorch-Deep%20Learning-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white)](https://pytorch.org/)
[![DistilBERT](https://img.shields.io/badge/DistilBERT-HuggingFace-FFD21E?style=for-the-badge&logo=huggingface&logoColor=black)](https://huggingface.co/)
[![Whisper STT](https://img.shields.io/badge/Whisper-Speech--to--Text-412991?style=for-the-badge&logo=openai&logoColor=white)](https://github.com/openai/whisper)
[![FastAPI](https://img.shields.io/badge/FastAPI-Async%20Backend-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![WebSockets](https://img.shields.io/badge/WebSockets-Live%20Alerts-010101?style=for-the-badge&logo=socketdotio&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

**A proactive threat assessment system integrating local speech-to-text transcription, dual-path NLP classification (fine-tuned DistilBERT + LLM analysis), and real-time parent alert broadcasting.**

[Architecture](#system-architecture) • [NLP Pipeline](#dual-path-nlp-classification) • [Tech Stack](#technology-stack) • [Setup Guide](#getting-started)

</div>

---

## 1. System Overview

**Guardian AI** is a real-time conversational monitoring and risk assessment platform designed to identify online predatory behavior and protect vulnerable minors. 

By analyzing multi-modal conversation streams (audio logs and chat transcripts), the platform identifies linguistic risk markers across classic grooming stages: **Trust Building, Isolation, Secrecy, and Escalation**.

---

## 2. System Architecture

```mermaid
flowchart TD
    subgraph IngestionLayer["Ingestion & Client Interface"]
        ParentClient[Parent Alerts Dashboard - React]
        AudioInput[Audio Stream / Chat Transcript Ingestion]
        Gateway[FastAPI Async Gateway - Port 8000]
    end

    subgraph AsyncPipeline["Asynchronous Processing Pipeline"]
        Queue[Background Task Worker]
        Whisper[OpenAI Whisper STT Model]
        MLBridge[ML Orchestration Bridge]
    end

    subgraph DualPathNLP["Dual-Path NLP Classification"]
        DistilBERT[Path A: Fine-Tuned DistilBERT<br/>Local PyTorch Classifier]
        LLMAnalyzer[Path B: Semantic Risk Extractor<br/>LLaMA via Groq API]
    end

    subgraph AlertSystem["Alerting & Persistence"]
        DB[(PostgreSQL / Session History)]
        WSManager[WebSocket Alert Manager]
    end

    ParentClient --> Gateway
    AudioInput --> Gateway
    Gateway --> Queue
    Gateway --> DB

    Queue --> Whisper
    Whisper --> MLBridge
    MLBridge --> DistilBERT
    MLBridge --> LLMAnalyzer

    DistilBERT --> WSManager
    LLMAnalyzer --> WSManager
    WSManager -->|Live Real-Time Alerts| ParentClient
```

---

## 3. Dual-Path NLP Classification

To balance inference velocity with contextual comprehension, Guardian AI utilizes a hybrid detection architecture:

| Classification Path | Engine | Responsibility | Inference Profile |
| :--- | :--- | :--- | :--- |
| **Path A: Sequence Classifier** | Local **DistilBERT** (`distilbert-base-uncased`) | Fine-tuned on the PAN 2012 predator dataset to compute per-sentence grooming probability scores. | Ultra-low latency, running on local CPU / GPU. |
| **Path B: Semantic Context Extractor** | **LLaMA** via Groq / LiteLLM API | Evaluates multi-turn conversational progression, extracts tactical snippets, and identifies manipulation stages. | Deep context-aware semantic analysis. |

---

## 4. Technology Stack

- **Backend Framework:** FastAPI, Uvicorn, Asynchronous Background Tasks
- **Machine Learning & NLP:** PyTorch, Hugging Face Transformers (`distilbert-base-uncased`), OpenAI Whisper (`base` model)
- **Database:** PostgreSQL (SQLAlchemy ORM + Alembic Migrations)
- **Real-Time Communication:** WebSockets (`/ws/alerts`)
- **Frontend Dashboard:** React 19, Vite, Tailwind CSS, Lucide Icons

---

## 5. Repository Structure

```
Guardian-AI/
├── .env.example              # Documented environment template
├── LICENSE                   # Open-source MIT License
├── backend/                  # FastAPI orchestration server & WebSockets
├── frontend/                 # React parent alerts dashboard
├── ml/                       # PyTorch training pipelines & STT models
└── data/                     # Ingestion schemas & dataset references
```

---

## 6. Getting Started

### Prerequisites
- Python `3.11+`
- Node.js `18+`
- PostgreSQL database URL

### 1. Environment Configuration
Create a `.env` file in `backend/` using the template below:
```env
APP_NAME="Guardian AI Backend"
APP_ENV=dev
DATABASE_URL=postgresql://user:password@localhost:5432/guardian_db
GROQ_API_KEY=your_groq_api_key
```

### 2. Backend & ML Setup
```bash
cd backend
python -m venv .venv

# Activate virtual environment
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt

# Start backend server
python -m uvicorn main:app --reload --port 8000
```

### 3. Frontend Dashboard Setup
```bash
cd ../frontend
npm install
npm run dev
```
Navigate to `http://localhost:5173/` (or configured port) to access the Parent Alerts Dashboard.
