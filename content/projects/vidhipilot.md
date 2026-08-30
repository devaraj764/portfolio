---
order: 1
title: VidhiPilot — AI Litigation Intelligence & Brief Preparation for Indian Lawyers
company: Personal Project
duration: MVP / Production-Ready Architecture
tags: [React 19, TypeScript, Vite, Tailwind CSS v4, Bun, Elysia, FastAPI, Python, PostgreSQL, Qdrant, Redis, OpenAI, Tesseract OCR, Docker]
excerpt: An intelligent AI litigation intelligence system featuring multi-layer document extraction, 2-stage contradiction detection across case bundles, automated chronologies, hearing prep briefs, BNS/IPC section mapping, filing review, and a Flutter mobile app — built specifically for the reality of Indian litigation.
github: https://github.com/devaraj764/vidhi-pilot
demo: https://vidhi-pilot.web.app/login
---

An intelligent AI litigation intelligence system built for the reality of Indian legal practice — where briefs run into thousands of pages, documents are scanned in multiple scripts, and lawyers need instant clarity on factual contradictions and hearing preparations.

> **"You have 800 pages and a hearing on Thursday. VidhiPilot tells you what the matter turns on, where the evidence conflicts, and prepares your brief."**

- **Live Demo**: [vidhi-pilot.web.app](https://vidhi-pilot.web.app/login) _(Demo Account: `deva170725@gmail.com` / `Deva170725@`)_
- **GitHub**: [devaraj764/vidhi-pilot](https://github.com/devaraj764/vidhi-pilot)

![VidhiPilot Case Workspace — Web](/assets/vidhipilot/case-workspace-web.webp)

---

## Core Positioning & Targeted Case Types

VidhiPilot is not a generic practice manager or precedent research tool. It is built to create maximum value where **document mass multiplied by factual dispute** is highest across five primary case types:

1. **Serious Criminal Defence & Economic Offences (CT1)** — PMLA, NDPS, GST/Customs evasion, IPC 420/406/409 & BNS successors, bail, quashing, and discharge applications.
2. **Civil Title, Property & Partition Suits (CT2)** — Title declarations, partition, specific performance, and injunctions across multi-decade chains of deeds, pahanis, and mutation entries.
3. **Commercial Arbitration (CT3)** — Institutional/ad-hoc arbitrations, S.34 challenges, and S.9/S.17 interim reliefs with claim-by-claim monetary ledgers.
4. **Contested Matrimonial Clusters (CT4)** — Plurality matters spanning 498A/BNS 85, Domestic Violence Act, maintenance under S.125 CrPC / S.144 BNSS, and divorce petitions across forums.
5. **Writ Petitions — Service & Land Acquisition (CT5)** — Regulatory challenges, service disputes, and acquisition compensation enhancement files.

---

## Litigation Document Intelligence

### Hybrid Extraction & Multi-Script OCR Pipeline

- **Multi-Format Ingestion** — Accepts PDF, DOCX, DOC, TXT, CSV, RTF, XLSX, XLS, PPTX, JPEG, PNG, TIFF, MP3, WAV, M4A, MP4, AVI, and ZIP files across 20+ specialized legal document types (FIR, Chargesheet, Plaint, Written Statement, Sale Deed, Petition, Order, Judgment, Affidavit, etc.).
- **Automatic Multi-Script OCR** — Scanned PDFs trigger page-by-page density detection (< 50 chars threshold). Digital pages use PyPDF2 text extraction while scanned pages route to Tesseract OCR (`pytesseract` + `pdf2image`). Supports Hindi (Devanagari), Telugu, and English script extraction.
- **Async Vector Embedding Queue** — Upload returns immediately while a background Redis worker (`embed_worker`) chunks text (with page-level overlap) and upserts vectors into Qdrant using `text-embedding-3-small`.
- **Page-Aware Chunking & Provenance** — Every vector chunk retains payload metadata including `case_id`, `user_id`, `document_type`, `page_start`, `page_end`, and `char_offsets`.

### Structured Metadata, Issue & Relief Extraction

- **Multi-Field Extraction (`extraction_worker`)** — Reads document fragments to extract structured Facts, Parties, Citations, Document Dates, Issues, and Reliefs.
- **Monetary Amount Extraction** — Relief amounts are parsed into structured `numeric(18,2)` values with Indian currency formatting (e.g. ₹5,00,000) while keeping verbatim raw text and exact page citations.
- **Fuzzy Name & Entity Matching** — PostgreSQL `pg_trgm` trigram indexes handle misspelling tolerance across clients, counsel, judges, and opposing parties.

---

## 2-Stage Contradiction Detection Engine

The defining intelligence feature of VidhiPilot: detecting irreconcilable accounts, role shifts, and date discrepancies across large case bundles.

![Contradiction Detection Review UI](/assets/vidhipilot/contradiction-detection-web.webp)

### Stage 1: Deterministic SQL Candidate Scoring (0 LLM Cost)

High-speed SQL queries scan structured extractions for potential conflicts:

- **Incompatible Party Roles** — Flags parties listed with conflicting roles across filings (e.g., an accused listed as a witness elsewhere).
- **Relief Amount Conflicts** — Compares monetary claims and damages across statements and counter-affidavits.
- **Event Date Discrepancies** — Identifies the same event or transaction dated differently across documents.
- **Subject Relationship Conflicts** — Detects contradictory relation edges between the same parties.

### Stage 2: Reasoning-Tier LLM Adjudication

Candidates are passed to a reasoning-tier LLM (`o`-series / reasoning model) with chain-of-thought prompts:

1. Verifies exact assertions from Document A vs Document B.
2. Tests if both statements can be simultaneously true or explained by legitimate temporal progression.
3. Eliminates benign artifacts and rewrites, resolving ambiguous cases to `benign` to avoid false alarms.
4. Outputs severity ratings and detailed reasoning for true contradictions.

### Review UI & Access Control

- Contradiction findings are displayed in a dedicated workspace tab (`case-contradictions-tab.tsx`).
- Side-by-side quoted excerpts linked directly to original document pages.
- Status management: **Needs Review**, **Confirmed**, and **Checked & Consistent** (benign, collapsed).
- Enforces strict tenancy scoping via `scopeToVisibleCases()` middleware.

---

## Automated Hearing Preparation (`hearing_prep`)

Prepares courtroom-ready briefs for scheduled hearings in seconds.

![Hearing Preparation Brief](/assets/vidhipilot/hearing-prep-web.webp)

- **Deterministic SQL Assembly** — Aggregates case records from 11 database tables (hearings, orders, chronology, citations, parties, issues, reliefs, contradictions).
- **Frontier Synthesis (`gpt-4.1`)** — Generates a structured brief covering listing purpose, case background, key factual issues, evidentiary contradictions, and court arguments.
- **Strict Provenance Enforcement** — Post-processing (`_clean_brief`) verifies all cited document UUIDs against the database, stripping unverified citations or hallucinated IDs.
- **Live Staleness Tracking** — Compares brief generation timestamps against case updates and document uploads to inform advocates when underlying records change.

---

## Chronology & Entity Resolution

- **Automated Factual Timeline** — Extracts dated events and relationships automatically from case documents (`chronology_extract.py`).
- **PostgreSQL Edge Traversals** — Stores typed, dated, and provenanced edges in `chronology_relations` with canonical matching in `chronology_entities`, enabling multi-hop entity queries without the overhead of a separate graph database.
- **Practice-Level Chronologies Index (`/chronologies`)** — Unified view across all accessible active matters.

---

## BNS ↔ IPC Legal Section Mapping & Law Library

Complete criminal law reform mapping database covering the 2023 legislative transition.

- **Seeded Statute Mappings** — 120+ criminal law section mappings across **IPC ↔ BNS** (Bharatiya Nyaya Sanhita), **CrPC ↔ BNSS** (Bharatiya Nagarik Suraksha Sanhita), and **IEA ↔ BSA** (Bharatiya Sakshya Adhiniyam).
- **Mapping Classifications** — Exact, partial, merged, split, new, and abolished section classifications with detailed change summaries and practical implications.
- **Law Library (`/law`)** — Interactive statutory lookup tool with GIN full-text search and trigram indexing.
- **AI Section Suggestions** — Uploaded documents trigger LLM legal code extraction → GIN full-text candidate retrieval → LLM relevance filtering with accept/reject controls.

![BNS-IPC Section Mappings](/assets/vidhipilot/section-mappings-web.webp)

---

## AI Filing Review & Litigation Strategy

- **AI Filing Review (`review_worker`)** — Evaluates drafted or uploaded pleadings across multiple passes: missing legal arguments, unbacked factual assertions, citation accuracy, and formal formatting checks.
- **AI Strategy (`strategy_worker`)** — Reasoning-tier assessment analyzing matter weaknesses, potential opposing objections, and key strategic questions to address before trial.

---

## Multilingual Grounded AI Assistant (Chat)

The central interactive interface for brief analysis and document query.

![VidhiPilot AI Chat Assistant](/assets/vidhipilot/ai-chat-web.webp)

### Multi-Language Capabilities

Supports **8 Indian languages**: English, Hindi (हिन्दी), Telugu (తెలుగు), Marathi (मराठी), Tamil (தமிழ்), Bengali (বাংলা), Gujarati (ગુજરાતી), and Kannada (ಕನ್ನಡ). Advocates can query in native scripts or transliterated languages (e.g. asking in Telugu: _"Ankit Rawat FIR lo emi undi?"_).

### Plan → Execute → Answer Pipeline

Operates a multi-step SSE streaming agent pipeline:

```
User: "Ankit Rawat FIR lo emi undi?"

Round 1 (Plan):
  → list_cases(query="Ankit Rawat")        → Finds Case ID
  → search_clients(query="Ankit Rawat")    → Finds Client Record

Round 2 (Plan):
  → search_documents(mode="full", case_id="...", document_type="fir")
  → Retrieves full FIR in reading order

Round 3 (Answer):
  → Streams response in Telugu with FIR details and page citations
```

### 6 Specialized AI Tools

| Tool               | Capability                                                          |
| ------------------ | ------------------------------------------------------------------- |
| `search_documents` | Semantic vector search OR full document text retrieval from Qdrant  |
| `get_case_details` | Full case metadata — client, hearings, documents, notes, sections   |
| `list_cases`       | Search and filter cases with typo-tolerant fuzzy matching           |
| `search_clients`   | Client directory search with phone/email trigram lookup             |
| `get_hearings`     | Upcoming and past hearing history lookup                            |
| `get_case_notes`   | Categorized case notes (General, Hearing, Research, Strategy, Todo) |

### Page-Accurate Clickable Citations

- AI responses stream inline clickable document citations: `[Document Title (Page X-Y)](/documents/<id>/view?page=<N>)`.
- Clicking opens the built-in document viewer directly at the cited page.

---

## App Shell & Practice Management

- **Global Search / Command Palette (⌘K)** — Instant search dialog indexing cases, clients, statutes, and chronologies.
- **Court Diary (`/diary`)** — Grouped daily schedule across all cases with multi-courtroom location conflict warnings.
- **Organization & RBAC** — Multi-lawyer practice support featuring Admin and Lawyer roles, designation management (Senior Advocate, Junior Advocate, Clerk), invitation workflows, and multi-tenant case visibility (`scopeToVisibleCases`).

---

## Flutter Mobile App

Cross-platform mobile companion application built with Flutter and Provider.

- **Document Camera Scanner** — Integrated camera document scanner (`cunning_document_scanner`) supporting multi-page capture, preview, reordering, and instant PDF compilation for upload.
- **Full Mobile Workflow** — Manage cases, clients, hearing schedules, case notes, and interact with the multilingual AI Chat Assistant on the go.

---

## Technical Architecture

```
┌─────────────────────────┐     ┌─────────────────────────┐     ┌─────────────────────────┐
│   React 19 + Vite       │────▶│   Elysia / Bun API      │────▶│   PostgreSQL            │
│   Tailwind v4 / shadcn  │     │   (REST + JWT + Knex)   │     │   (cases, clients, docs,│
│   (port 5173)           │     │   (port 3000)           │     │    hearings, 47 schema) │
└─────────────────────────┘     └─────────────────────────┘     └─────────────────────────┘
             │                               ▲
             │ SSE                           │
             ▼                               │
┌─────────────────────────┐     ┌────────────┴────────────┐
│   FastAPI Chat Server   │────▶│   OpenAI API            │
│   (port 8000)           │     │   Tiered Client Manager │
│   Plan→Execute→Answer   │     │   (gpt-4.1 / o-series)  │
└────────────┬────────────┘     └─────────────────────────┘
             │
             ├────▶ Qdrant Vector DB (text-embedding-3-small, page payloads)
             ├────▶ PostgreSQL (structured metadata, trigram matching)
             └────▶ Redis (session cache + 9 daemon job queues)

┌─────────────────────────┐
│   9 Python Daemons      │────▶ embed, chronology, extraction, contradiction,
│   (workers/daemons)     │      case_memory, hearing_prep, draft, strategy, review
└─────────────────────────┘

┌─────────────────────────┐
│   Flutter Mobile App    │────▶ Elysia API + FastAPI Chat Server
└─────────────────────────┘
```

### Technology Stack Overview

| Component                  | Technology                                                                                                                            |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **Frontend Web**           | React 19, TypeScript, Vite, Tailwind CSS v4, shadcn/ui, TanStack Router/Query/Table, react-doc-viewer, jsPDF                          |
| **Mobile App**             | Flutter, Dart, Provider, `cunning_document_scanner`                                                                                   |
| **API Backend**            | Elysia framework running on Bun runtime, JWT auth, Knex query builder                                                                 |
| **AI Chat & Server**       | FastAPI, SSE streaming, multi-step tool execution engine                                                                              |
| **AI Workers**             | 9 Python daemons (`embed`, `chronology`, `extraction`, `contradiction`, `case_memory`, `hearing_prep`, `draft`, `strategy`, `review`) |
| **LLM Tiering**            | OpenAI — Frontier (`gpt-4.1`), Reasoning (`o`-series), Mid (`gpt-4.1-mini`), Cheap (`gpt-4.1-nano`)                                   |
| **Embeddings & Vector DB** | OpenAI `text-embedding-3-small` (1536-dim), Qdrant Vector Database                                                                    |
| **OCR & Readers**          | Tesseract OCR (`pytesseract` + `pdf2image`), PyPDF2, python-docx                                                                      |
| **Database & Cache**       | PostgreSQL with `pg_trgm` trigram fuzzy matching & GIN full-text search; Redis (`ioredis` / `redis-py`)                               |
| **Containerization**       | Docker Compose orchestration across PostgreSQL, Qdrant, Redis, Elysia API, FastAPI Chat/Workers, Client                               |

---

Built for Indian advocates. Powered by domain-specific litigation intelligence.
