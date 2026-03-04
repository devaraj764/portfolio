---
order: 1
title: NyayaSetu — AI-Powered Case Management for Indian Lawyers
company: Personal Project
duration: MVP
tags: [React, TypeScript, Flutter, Elysia, Bun, FastAPI, PostgreSQL, Qdrant, Redis, Azure OpenAI, Tesseract OCR, Docker]
excerpt: An intelligent legal case management system with multi-language AI chat, document OCR, vector search, IPC/BNS section mappings, and a Flutter mobile app — built for the reality of Indian legal practice.
github: https://github.com/devaraj764/nyayasetu
---

## Overview

An intelligent legal case management system built for the reality of Indian legal practice — where documents are paper, languages are many, and no existing tool understands the workflow from FIR to final judgment.

![NyayaSetu Case Detail — Web](/assets/nyayasetu/case-detail-web.webp)

## Technical Architecture

```
┌──────────────┐     ┌──────────────────┐     ┌──────────────────┐
│   React +    │────▶│  Elysia/Bun API  │────▶│   PostgreSQL     │
│  TanStack    │     │  (REST + JWT)    │     │  (cases, clients,│
│  (port 5173) │     │  (port 3000)     │     │   hearings, docs)│
└──────────────┘     └──────────────────┘     └──────────────────┘
       │                     ▲
       │ SSE                 │
       ▼                     │
┌──────────────────┐     ┌───┴──────────────┐
│  FastAPI Chat    │────▶│  Azure OpenAI    │
│  (port 8000)     │     │  GPT-4.1         │
│  Plan→Execute→   │     └──────────────────┘
│  Answer pipeline │
└──────┬───────────┘
       │
       ├────▶ Qdrant (vector search for documents)
       ├────▶ PostgreSQL (structured data queries)
       └────▶ Redis (session cache + embed job queue)

┌──────────────┐
│ Flutter App  │────▶ Elysia API + FastAPI Chat
│  (mobile)    │
└──────────────┘
```

### Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, TypeScript, TanStack Router & Query, Tailwind CSS, shadcn/ui |
| Mobile App | Flutter, Provider state management |
| API Server | Elysia (Bun), JWT authentication, RBAC middleware |
| Chat Service | FastAPI, SSE streaming, Plan→Execute→Answer pipeline |
| LLM | Azure OpenAI GPT-4.1 |
| Embeddings | Azure OpenAI text-embedding-ada-002 |
| OCR | Tesseract (pytesseract), pdf2image |
| Vector DB | Qdrant |
| Database | PostgreSQL with pg_trgm (fuzzy matching), GIN full-text search |
| Cache | Redis (session store, embed job queue) |
| Document Viewer | react-doc-viewer (PDF, DOCX, images, spreadsheets) |
| Deployment | Docker Compose (PostgreSQL, Qdrant, Redis, API, Workers, Client) |

## Features

### Authentication & Accounts

- Email + password registration with JWT-based authentication
- **Two account types** — Individual (solo practitioner) or Organization (law firm)
- Organization accounts auto-create a firm and assign the registering user as admin
- **Designation support** — Senior Advocate, Advocate, Junior Advocate, Intern/Clerk

### Organization & Team Management

Full RBAC (Role-Based Access Control) for law firms and multi-lawyer practices.

- **Roles** — Admin (manages firm, members, case assignments) and Lawyer (works on assigned cases)
- **Add members** two ways: create a new account directly, or invite existing users by email with real-time availability check
- Edit member designation, rank, and role
- Remove members (revokes all org case access)

### Case Management

- Create and manage cases with full metadata — case number, title, court, jurisdiction, case type (criminal, civil, writ, appeal, revision, arbitration)
- **Court types** — District, Sessions, High Court, Supreme Court, Tribunal
- Track case status — active, pending, reserved, decided, closed, appealed
- Priority levels (low, medium, high, urgent), judge and opposing counsel tracking
- **Full-text search** using PostgreSQL `plainto_tsquery`
- Filter by status, case type, court type, client, and priority
- **Case visibility** — public (entire org) or private (creator + assigned lawyers only)
- **Tabbed detail view** — Documents, Hearings, Notes, Sections, Assignees

### Case Assignment & Access Control

- Assign lawyers from your organization to specific cases
- **Creator** always has full access
- **Org public cases** visible to all members; **private cases** only to creator + assigned lawyers
- Access flags per case: `can_modify` (content) and `can_manage` (settings + assignments)

### Document Management

- Upload PDF, DOCX, DOC, TXT, images, spreadsheets, audio, video, ZIP
- **16 document types** — FIR, chargesheet, petition, order, judgment, affidavit, vakalatnama, plaint, decree, evidence, application, pleading, financial filing, marriage proof, regulatory document, miscellaneous
- File explorer grouped by document type with detail panel
- Full in-app preview (PDF, DOCX, images, spreadsheets via react-doc-viewer)
- **AI embedding status** — green (AI-ready) / amber (processing) / stored-only for unsupported types

![Upload Document Form](/assets/nyayasetu/upload-form-web.webp)

### Document Intelligence

**Text Extraction Pipeline:**
- **PDF** — direct text extraction via PyPDF2 with automatic OCR fallback
- **DOCX** — python-docx extraction
- **Images** — direct OCR for JPEG, PNG, TIFF
- **Hybrid** — digital pages use direct text, scanned pages (< 50 chars) trigger Tesseract OCR

**Embedding & Vector Search:**
- Documents automatically chunked (with overlap) and embedded into Qdrant on upload
- **Page-aware chunking** — each chunk tracks page_start and page_end
- Redis job queue for async embedding — upload returns immediately
- Semantic search + document type filtering in vector queries

### Legal Section Mappings (IPC/BNS)

Complete database of old law → new law section mappings for the 2023 criminal law reforms:

- **IPC → BNS** (Bharatiya Nyaya Sanhita)
- **CrPC → BNSS** (Bharatiya Nagarik Suraksha Sanhita)
- **IEA → BSA** (Bharatiya Sakshya Adhiniyam)
- **100+ section mappings** with old section, new section, titles, full text, change summary, and practical implications
- **Mapping types** — exact, partial, merged, split, new, abolished
- Search powered by PostgreSQL GIN full-text search + trigram indexes
- Link/unlink sections to cases manually

**AI Section Suggestions** — On document upload, the LLM extracts section numbers and keywords, pulls candidate mappings from the database, then filters to only relevant ones. Accept or reject individually.

![AI Suggested Sections](/assets/nyayasetu/suggested-sections-web.webp)

### AI Chat Assistant

The core differentiator.

**Multi-Language Support** — 8 Indian languages: English, Hindi, Marathi, Tamil, Telugu, Bengali, Gujarati, Kannada

Ask in Telugu: *"Ankit Rawat FIR lo emi undi?"* — the AI finds the case, retrieves the FIR, and responds in Telugu.

![NyayaSetu AI Chat — Web](/assets/nyayasetu/nyayasetu-ai-web.webp)

**Plan → Execute → Answer Pipeline:**

```
User: "Ankit Rawat FIR lo emi undi?"

Round 1 — Plan:
  → list_cases(query="Ankit Rawat")        → finds the case
  → search_clients(query="Ankit Rawat")    → finds the client

Round 2 — Plan:
  → search_documents(mode="full", case_id="...", document_type="fir")
  → retrieves entire FIR in reading order

Round 3 — Answer:
  → Streams response in Telugu with FIR contents
```

**6 AI Tools:**

| Tool | What it does |
|------|-------------|
| `search_documents` | Semantic search OR full document retrieval from vector DB |
| `get_case_details` | Complete case metadata — client, hearings, documents, notes, sections |
| `list_cases` | Search/filter cases with fuzzy matching |
| `search_clients` | Find clients by name, phone, email with typo tolerance |
| `get_hearings` | Check upcoming and past hearings |
| `get_case_notes` | Read case notes by type |

**Two Document Search Modes** (LLM decides which to use):
- **`mode="full"`** — Retrieve entire document in reading order
- **`mode="search"`** — Semantic vector search for top matching chunks

**Clickable Document References** — AI responses include links to source documents with page numbers. Clicking opens the viewer at the exact page.

**Session Management** — Persistent conversations with auto-generated titles, session summaries, Redis-cached context, and message starring.

### Client Management

- Client directory — individual, corporate, government
- Track phone, email, address, notes
- **Fuzzy search** — misspell "Rawait" and it still finds "Rawat" (PostgreSQL trigram matching)

### Hearing Tracker

- Log hearings with date, time, court room, judge, purpose
- **Purposes** — arguments, evidence, order, final hearing, miscellaneous
- **Statuses** — upcoming, completed, adjourned, cancelled
- Filter upcoming hearings across all cases

### Dashboard

- Stat cards — total cases, active, pending, upcoming hearings
- Upcoming hearings table with case title, court, date, purpose
- Data scoped to user's accessible cases

### Flutter Mobile App

Full-featured companion app:

- Cases, Clients, Hearings, Documents, Notes, Sections — full CRUD
- AI Chat with the same assistant
- Organization management and member invites
- Bottom navigation: Cases, Clients, Hearings, Chat, Profile

<div class="mobile-screens">
  <img src="/assets/nyayasetu/case-detaisl-flutter.webp" alt="Flutter — Case Details" />
  <img src="/assets/nyayasetu/client-details-flutter.webp" alt="Flutter — Client Details" />
  <img src="/assets/nyayasetu/ai-conversation-telugu-flutter.webp" alt="Flutter — AI Conversation in Telugu" />
</div>

### Observability

Full pipeline logging:

```
======================================================================
14:32:01 │ INFO  │ NEW REQUEST  │ session=abc-123  user=u-456  lang=te
14:32:01 │ INFO  │   message: Ankit Rawat FIR lo emi undi
── Plan round 1/3 ──
14:32:03 │ INFO  │ └─ PLANNER responded  │ 1.84s  │ tokens: 1230/85
14:32:03 │ INFO  │    ┌─ TOOL: list_cases  │ 0.03s  │ 1 results
── Plan round 2/3 ──
14:32:04 │ INFO  │    ┌─ TOOL: search_documents(mode="full", type="fir")
14:32:04 │ INFO  │    └─ 0.14s  │ 5 results
── Answer phase ──
14:32:09 │ INFO  │ └─ ANSWER streamed  │ 3.82s  │ 580 chars
14:32:09 │ INFO  │ DONE  │ total: 7.25s
======================================================================
```

## What's Coming Next

- OCR for handwritten Hindi/regional language documents (Azure Document Intelligence)
- WhatsApp bot for document intake
- Structured field extraction from FIRs and court orders
- Court date reminders and push notifications
- Case timeline visualization
- Civil law section mappings (CPC, Transfer of Property Act, etc.)

---

Built for Indian lawyers. By someone who understands the practice.
