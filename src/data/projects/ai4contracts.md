---
order: 2
title: AI4Contracts — AI-Powered Contract Analysis Platform
company: AI4LEX
duration: AI4LEX
tags: [React, TypeScript, Java Spring Boot, Python, LangGraph, LangChain, MongoDB, Redis, Docker, Google Vertex AI]
excerpt: An enterprise contract management platform that uses AI agents to automatically extract data from uploaded contracts, analyze renewal opportunities, and generate new contract clauses.
visit_link: https://www.ai4lex.com/
note: Enterprise product — source code is proprietary
---

## Overview

AI4Contracts is an enterprise contract management platform built at **AI4LEX** that uses AI agents to automatically extract data from uploaded contract PDFs, analyze renewal opportunities, and generate new contract clauses. Built with a microservices architecture using **Spring Boot**, **React**, and **Python** AI workers.

![Contracts Dashboard](/assets/ai4contracts/contracts-list-page.webp)

## Architecture

```
                         +------------------+
                         |    Nginx (:80)   |
                         |  Reverse Proxy   |
                         +--------+---------+
                                  |
                    +-------------+-------------+
                    |                           |
             /api/* routes               / routes
                    |                           |
         +----------+-----------+    +----------+---------+
         | Spring Boot API      |    | React Frontend     |
         | - Contract CRUD      |    | - Dashboard        |
         | - Renewal management |    | - Upload           |
         | - SSE events         |    | - Contract detail  |
         | - File upload        |    | - Renewals         |
         +-----+------+---------+    +--------------------+
               |      |
       +-------+      +--------+
       |                       |
+------+-------+     +---------+--------+
| MongoDB      |     | Redis            |
| - contracts  |     | - Job queue      |
| - renewals   |     | - Pub/Sub SSE    |
| - app configs|     | - Notifications  |
+--------------+     +------------------+
                         |
            +------------+------------+
            |  Python AI Workers      |
            |  - Extraction Worker    |
            |  - Renewal Analysis     |
            |  - Clause Generation    |
            |  - Conversation Agent   |
            +-------------------------+
```

### How It Works

1. User uploads a contract PDF via the React frontend
2. Spring Boot saves the file, creates a DB record, and pushes a job to Redis
3. The Python extraction worker picks up the job, processes the PDF with AI, and writes extracted fields back to MongoDB
4. Real-time status updates flow via Redis Pub/Sub to Spring Boot's SSE endpoints to the frontend
5. Users can initiate contract renewals, which trigger analysis and clause generation agents

## Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| React 19 + TypeScript | UI framework |
| Vite 7 | Build tool and dev server |
| TanStack Router | File-based routing |
| TanStack React Query | Server state management |
| Zustand | Client state management |
| Tailwind CSS 4 | Styling |
| React Hook Form + Zod | Form handling and validation |
| Headless UI + Radix UI | Accessible UI primitives |

### Backend API

| Technology | Purpose |
|---|---|
| Java 17 | Language |
| Spring Boot 4.0 | Application framework |
| Spring Data MongoDB | Database access |
| Spring Data Redis | Job queue and Pub/Sub |
| Spring MVC (SSE) | Real-time event streaming |

### AI Workers (Python)

| Technology | Purpose |
|---|---|
| Python 3.11+ | Language |
| LangGraph | AI agent orchestration |
| LangChain | LLM tooling and abstractions |
| Google Vertex AI (Gemini) | LLM for renewal/clause agents |
| Motor (async MongoDB) | Async database access |
| FastAPI + Uvicorn | Conversation assistant API |

### Infrastructure

| Technology | Purpose |
|---|---|
| Docker Compose | Service orchestration |
| Nginx | Reverse proxy |
| MongoDB 7 | Document database |
| Redis 7 | Message broker and job queue |

## Features

### Contract Upload & Processing

Drag-and-drop or click-to-upload contract PDFs. The system queues them for AI extraction with real-time progress via SSE.

![Upload Page](/assets/ai4contracts/upload-page.webp)

### AI-Powered Data Extraction

The extraction worker automatically pulls key fields — parties, dates, amounts, clauses, and risks — from uploaded contracts, each with confidence scores and source locations.

![Extracted Contract Data](/assets/ai4contracts/contract-extraction-data.webp)

### Configurable Extraction Pipeline

Extraction fields, model settings, and prompts are fully configurable through the admin UI — no redeployment needed.

![Extraction Config](/assets/ai4contracts/extraction-config.webp)

### Contract Renewal & AI Analysis

Start a renewal for any completed contract. A multi-task ReAct agent analyzes the contract and produces change recommendations across 4 categories:

- Changes required by law
- Changes based on company standards
- Changes based on user instructions
- AI-suggested improvements

![Renewal Proposal](/assets/ai4contracts/renewal-proposal.webp)

### Clause Generation

After reviewing and accepting change recommendations, a second AI agent converts them into final legal clauses with proper article/clause numbering and action types (new, modify, or delete).

![Generated Clauses](/assets/ai4contracts/generated-clauses.webp)

### Conversation Assistant

- **Natural Language Queries** — Ask questions about your contracts in plain English
- **Database-Backed Answers** — Agent queries MongoDB to provide accurate, data-driven responses
- **Multi-Turn Context** — Maintains conversation history across questions
- **Integration Ready** — Slack and Microsoft Teams bot integrations

## Processing Pipelines

### Contract Extraction Pipeline

```
User Upload (Frontend)
  → Spring Boot: Save PDF + Create DB record
  → Push job to Redis (contract_processing_jobs)
  → Python Worker: Dequeue job, read PDF, send to extraction API
  → Parse response, write extractedData to MongoDB
  → SSE Event → Frontend updates in real-time
```

### Renewal Analysis Pipeline

```
User initiates renewal (Frontend)
  → Spring Boot: Create RenewalRequest in MongoDB
  → Push job to Redis (renewal_analysis_jobs)
  → Renewal Agent: Load config + company standards
  → Execute analysis tasks using ReAct loop
      - get_contract_text
      - search_internet (legal updates)
      - get_company_standards
      - get_user_instructions
  → Write task outputs to RenewalRequest
  → User reviews and accepts/rejects changes
  → Clause Agent: Convert accepted changes → final contract clauses
```

## My Role

Built the full-stack platform end-to-end at AI4LEX:

- Designed the **React frontend** with TanStack Router, React Query, and Zustand for state management
- Developed the **Spring Boot REST API** with MongoDB and Redis-based job queues
- Implemented the **Python AI workers** using LangGraph for extraction, renewal analysis, and clause generation agents
- Integrated **Google Vertex AI (Gemini)** for LLM-powered reasoning
- Built a **conversational AI assistant** with LangGraph state-graph architecture and FastAPI
- Orchestrated the entire system with **Docker Compose** and **Nginx** reverse proxy
