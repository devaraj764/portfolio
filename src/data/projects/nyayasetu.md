---
order: 1
title: NyayaSetu — AI-Powered Case Management for Indian Lawyers
company: Personal Project
duration: MVP
tags: [React, TypeScript, Flutter, Elysia, Bun, FastAPI, PostgreSQL, Qdrant, Redis, Azure OpenAI, Tesseract OCR, Docker]
excerpt: An intelligent legal case management system with multi-language AI chat, document OCR, vector search, IPC/BNS section mappings, and a Flutter mobile app — built for the reality of Indian legal practice.
github: https://github.com/devaraj764/nyayasetu
---

An intelligent legal case management system built for the reality of Indian legal practice — where documents are paper, languages are many, and no existing tool understands the workflow from FIR to final judgment.

![NyayaSetu Case Detail — Web](/assets/nyayasetu/case-detail-web.webp)

---

## Authentication & Accounts

- Email + password registration with JWT-based authentication
- **Two account types** — Individual (solo practitioner) or Organization (law firm)
- Organization accounts auto-create a firm and assign the registering user as admin
- **Designation support** — Senior Advocate, Advocate, Junior Advocate, Intern/Clerk
- Profile view with account details, role, designation, and organization info
- Persistent login with token-based session management

## Organization & Team Management

Full RBAC (Role-Based Access Control) for law firms and multi-lawyer practices.

- **Roles** — Admin (manages firm, members, case assignments) and Lawyer (works on assigned cases)
- Admin dashboard — edit organization name and description, view member count
- **Add members** two ways:
  - **Create account** — admin creates a new lawyer account directly (name, email, password, designation, rank)
  - **Invite existing user** — search by email with real-time availability check, then invite to join the org
- Edit member designation, rank, and role (admin/lawyer)
- Remove members from organization (revokes all org case access)
- Members listed in a sortable table with designation badges

## Case Management

- Create and manage cases with full metadata — case number, title, court, jurisdiction, case type (criminal, civil, writ, appeal, revision, arbitration)
- **Court types** — District, Sessions, High Court, Supreme Court, Tribunal
- Track case status — active, pending, reserved, decided, closed, appealed
- Set priority levels (low, medium, high, urgent) and assign judges, opposing counsel
- Link clients to cases with full contact details
- Organize cases by type and filter/search across your entire practice
- **Full-text search** on cases using PostgreSQL `plainto_tsquery`
- Filter by status, case type, court type, client, and priority
- **Case visibility** — public (visible to entire org) or private (creator + assigned lawyers only)
- Soft-delete cases (sets status to closed)

### Case Detail View

Tabbed interface with everything about a case in one place:

- **Documents** — file explorer grouped by document type with detail panel
- **Hearings** — chronological hearing history
- **Notes** — categorized case notes
- **Sections** — linked IPC/BNS legal sections with AI suggestions
- **Assignees** — lawyers assigned to the case (org accounts only)
- Case header with metadata, client info, and edit controls

### Case Assignment

- Assign lawyers from your organization to specific cases
- Assigned lawyers get full read/write access to case content (documents, hearings, notes, sections)
- Admin or case creator can assign/unassign lawyers
- Search organization members by name or email when assigning
- Access flags computed per case: `can_modify` (content), `can_manage` (case settings + assignments)

### Case Access Control

- **Creator** — always has full access
- **Org public cases** — visible to all members of the same organization
- **Org private cases** — visible only to creator and explicitly assigned lawyers
- **Org admin** — can manage case settings and assignments for all org cases

## Case Notes

- Create, edit, and delete notes per case
- **5 note types** — General, Hearing, Research, Strategy, Todo
- Notes accessible via case detail tab and through AI chat assistant
- Chronological ordering with timestamps

## Legal Section Mappings (IPC/BNS)

Complete database of old law to new law section mappings for the 2023 criminal law reforms.

- **IPC → BNS** (Bharatiya Nyaya Sanhita)
- **CrPC → BNSS** (Bharatiya Nagarik Suraksha Sanhita)
- **IEA → BSA** (Bharatiya Sakshya Adhiniyam)
- **100+ section mappings** seeded with old section, new section, titles, full text, mapping type, change summary, and practical implications
- **Mapping types** — exact, partial, merged, split, new, abolished
- **Search sections** by number, title, keyword, or full text — powered by PostgreSQL GIN full-text search + trigram indexes
- **Link sections to cases** — manually search and add relevant sections
- **Unlink sections** from cases

### AI Section Suggestions

When uploading a document, optionally enable AI section suggestions:

1. **LLM extracts** section numbers, legal codes, and keywords from the document text
2. **Database pulls** candidate section mappings via section number match + keyword full-text search + title ILIKE
3. **LLM filters** candidates to only the ones actually relevant to the document

- Suggested sections appear in the Sections tab with accept/reject controls
- Accept individual suggestions, reject individual suggestions, or reject all at once
- Suggestions marked with source=`ai` and status=`suggested` until accepted

![AI Suggested Sections](/assets/nyayasetu/suggested-sections-web.webp)

## Document Management

- Upload documents (PDF, DOCX, DOC, TXT, images, spreadsheets, presentations, audio, video, ZIP) per case
- **Supported formats** — PDF, DOC, DOCX, TXT, CSV, RTF, XLSX, XLS, PPTX, JPG, JPEG, PNG, TIFF, MP3, WAV, M4A, MP4, AVI, ZIP
- **16 document types** — FIR, chargesheet, petition, order, judgment, affidavit, vakalatnama, plaint, decree, evidence, application, pleading, financial filing, marriage proof, regulatory document, miscellaneous
- Document type is mandatory on upload — keeps everything organized
- File explorer view grouped by document type with detail panel
- Full document preview in-app (PDF, DOCX, images, spreadsheets, and more via react-doc-viewer)
- Download original files
- Edit document metadata (title, type, notes)
- Delete documents (removes file from disk + embeddings from Qdrant)
- **AI embedding status visible** — green brain icon (AI-ready) / amber clock (processing) / stored-only for unsupported types
- Option to trigger AI section suggestions on upload

![Upload Document Form](/assets/nyayasetu/upload-form-web.webp)

## Document Intelligence

### Text Extraction Pipeline

- **PDF** — direct text extraction via PyPDF2 with automatic OCR fallback
- **DOCX** — python-docx text extraction
- **DOC (legacy)** — legacy .doc format support
- **Plain text** — direct read for .txt, .csv, .rtf files
- **Images** — direct OCR for JPEG, PNG, TIFF uploads

### OCR (Optical Character Recognition)

- **Automatic OCR** for scanned PDFs — per-page detection (pages with < 50 characters trigger OCR)
- **Hybrid extraction** — digital pages use direct text, scanned pages use Tesseract OCR
- Image files (JPEG, PNG, TIFF) route directly to OCR
- OCR text saved alongside original file as `{document_id}_ocr.txt`
- Powered by Tesseract (pytesseract) + pdf2image

### Embedding & Vector Search

- Documents automatically chunked (with overlap) and embedded into Qdrant vector database on upload
- **Page-aware chunking** — each chunk tracks which pages it spans (page_start, page_end)
- Embeddings include metadata: case_id, user_id, document_type, extraction_method (direct/ocr)
- Redis job queue for async embedding — upload returns immediately, embedding happens in background
- **Document status tracking** — 1=uploaded (processing), 2=embedded (AI-ready), 3=stored-only (unsupported type)
- Searchable by AI — both semantic (meaning-based) and by document type
- Document type filtering in vector search — ask about FIR, only FIR chunks are searched
- Document deletion cleans up all embeddings from Qdrant
- Fuzzy name matching via PostgreSQL trigram index — handles misspellings across cases, clients, judges, opposing counsel

## Client Management

- Maintain a client directory — individual, corporate, government
- Track phone, email, address, notes per client
- See all cases linked to a client at a glance
- Fuzzy search — misspell "Rawait" and it still finds "Rawat" (powered by PostgreSQL trigram matching)

## Hearing Tracker

- Log hearings with date, time, court room, judge, purpose
- **Hearing purposes** — arguments, evidence, order, final hearing, miscellaneous
- **Hearing statuses** — upcoming, completed, adjourned, cancelled
- Track outcomes, next date, and notes per hearing
- Filter upcoming hearings across all cases
- All hearings linked to their respective case

## Dashboard

- **Stat cards** — total cases, active cases, pending cases, upcoming hearings
- **Upcoming hearings table** — next 10 scheduled hearings with case title, court, date, and purpose
- Quick action buttons — New Case, All Cases, Clients
- Dashboard data scoped to user's accessible cases (own + org public + assigned)

## AI Chat Assistant

The core differentiator of NyayaSetu.

### Multi-Language Support

Supports **8 Indian languages**: English, Hindi (हिन्दी), Marathi (मराठी), Tamil (தமிழ்), Telugu (తెలుగు), Bengali (বাংলা), Gujarati (ગુજરાતી), Kannada (ಕನ್ನಡ)

Ask in Telugu: *"Ankit Rawat FIR lo emi undi?"* — the AI finds the case, retrieves the FIR document, and responds in Telugu.

![NyayaSetu AI Chat — Web](/assets/nyayasetu/nyayasetu-ai-web.webp)

### Plan → Execute → Answer Pipeline

The AI doesn't do a single search. It plans multi-step tool chains, executes them iteratively, then streams a final answer.

**Example flow:**
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

### 6 AI Tools

| Tool | What it does |
|------|-------------|
| `search_documents` | Semantic search OR full document retrieval from vector database |
| `get_case_details` | Complete case metadata — client, hearings, documents, notes, sections |
| `list_cases` | Search/filter cases with fuzzy matching |
| `search_clients` | Find clients by name, phone, email with typo tolerance |
| `get_hearings` | Check upcoming and past hearings |
| `get_case_notes` | Read case notes by type (general, hearing, research, strategy, todo) |

### Two Document Search Modes

The LLM decides which mode to use:

- **`mode="full"`** — Retrieve entire document in reading order. No embedding needed. Used for: "show me the FIR", "chargesheet lo emi undi"
- **`mode="search"`** — Semantic vector search for top matching chunks. Used for: "what sections are mentioned in the FIR?", "who is the complainant?"

### Clickable Document References

- AI responses include clickable links to source documents with page numbers
- Format: `[Document Title (Page X-Y)](/documents/<id>/view?page=<page>)`
- Clicking a link opens the document viewer at the exact page — no manual searching
- Links are rendered inline in the markdown response

### Session Management

- Conversations persist across sessions with auto-generated titles
- Session summary + last 10 messages sent to LLM (not full history — optimized for token cost)
- Redis-cached sessions — sub-millisecond context retrieval
- Background summary and title generation after each exchange
- Create, load, and delete conversation sessions
- Session list with titles and dates
- Message starring — star/unstar important messages for quick reference

### Live Status Indicators

- See the AI's reasoning in real-time (planning phase)
- Watch which tools are being called (searching documents, looking up cases...)
- Streaming answer with markdown rendering
- Quick-start suggestions for new conversations ("What cases do I have?", "When are my next hearings?")

## Flutter Mobile App

Full-featured mobile companion app built with Flutter.

- **Authentication** — login and registration with same account types (individual/organization)
- **Cases** — list, create, edit, view case details
- **Clients** — list, create, edit, view client details
- **Hearings** — view all hearings across cases
- **Document scanning** — scan paper documents using phone camera, multi-page support with page preview and reorder, auto-converts scanned pages to PDF for upload (powered by cunning_document_scanner)
- **Documents** — upload documents from file picker or camera scan, edit metadata
- **Notes** — create and edit case notes
- **Sections** — add legal sections to cases
- **AI Chat** — full chat interface with the same AI assistant
- **Organization** — view org info, invite members
- **Profile** — view account details, designation, org info, logout
- **Bottom navigation** — Cases, Clients, Hearings, Chat, Profile

<div class="mobile-screens">
  <img src="/assets/nyayasetu/case-detaisl-flutter.webp" alt="Flutter — Case Details" />
  <img src="/assets/nyayasetu/client-details-flutter.webp" alt="Flutter — Client Details" />
  <img src="/assets/nyayasetu/ai-conversation-telugu-flutter.webp" alt="Flutter — AI Conversation in Telugu" />
</div>

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
| Markdown | react-markdown for chat responses |
| Document Viewer | react-doc-viewer (PDF, DOCX, images, spreadsheets) |
| Deployment | Docker Compose (PostgreSQL, Qdrant, Redis, API, Workers, Client) |

### Observability

Full pipeline logging in terminal:
```
======================================================================
14:32:01 │ INFO  │ NEW REQUEST  │ session=abc-123  user=u-456  lang=te
14:32:01 │ INFO  │   message: Ankit Rawat FIR lo emi undi
── Plan round 1/3 ──
14:32:01 │ INFO  │ ┌─ PLANNER LLM call  │ context_msgs=2
14:32:03 │ INFO  │ └─ PLANNER responded  │ 1.84s  │ tokens: 1230 in / 85 out
14:32:03 │ INFO  │    ┌─ TOOL EXEC: list_cases({"query": "Ankit Rawat"})
14:32:03 │ INFO  │    └─ TOOL DONE: list_cases  │ 0.03s  │ 1 results
── Plan round 2/3 ──
14:32:04 │ INFO  │    ┌─ TOOL EXEC: search_documents(mode="full", document_type="fir")
14:32:04 │ INFO  │    └─ TOOL DONE: search_documents  │ 0.14s  │ 5 results
── Answer phase ──
14:32:05 │ INFO  │ ┌─ ANSWER LLM call  │ results_text=2340 chars
14:32:09 │ INFO  │ └─ ANSWER streamed  │ 3.82s  │ 580 chars
14:32:09 │ INFO  │ DONE  │ total pipeline: 7.25s
======================================================================
```

---

Built for Indian lawyers. By someone who understands the practice.
