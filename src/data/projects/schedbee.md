---
order: 2
title: SchedBee — Universal Multi-Tenant AI Scheduling & Business Operations Platform
company: Personal Project
duration: Ongoing
tags: [React 19, TypeScript, Vite, Next.js 16, Tailwind CSS v4, Node.js, Express 5, Drizzle ORM, PostgreSQL, RabbitMQ, LangChain, LangGraph, OpenAI, Qdrant, Meta WhatsApp API, Docker]
excerpt: An intelligent multi-tenant AI booking & business operations platform for local SMBs (clinics, salons, diagnostic centers, venues, home repair) featuring a 4-mode universal scheduling engine, multi-channel WhatsApp AI agent with human handoff, native Android background missed-call detector app, and dynamic website builder.
github: https://github.com/devaraj764/schedbee
demo: https://schedbee.web.app/login
---

An intelligent multi-tenant AI scheduling and business operations platform engineered specifically for local service businesses — clinics, salons, diagnostic centers, venues, home repair services, and professional consultants — to automate customer booking, messaging, missed call recovery, and practice operations across channels.

> **"From missed phone calls to automated WhatsApp confirmations: SchedBee turns multi-channel customer inquiries into confirmed, scheduled business appointments — powered by a universal 4-mode scheduling engine and agentic AI."**

- **Live Demo**: [schedbee.web.app](https://schedbee.web.app/login) _(Demo Account: `admin@schedbee.com` / `Schedbee123!`)_
- **GitHub**: [devaraj764/schedbee](https://github.com/devaraj764/schedbee)

![SchedBee Universal Booking & Management](/assets/schedbee/booking-schedbee.webp)

---

## Core Positioning & Multi-Industry Business Capabilities

SchedBee is built on the core principle that **customers book a service or result**, while the backend dynamically determines whether a specific provider (doctor, stylist), an asset (banquet hall, MRI machine), or simply a capacity-bounded time slot is required.

The platform adapts to 8+ SMB verticals using a data-driven **Capability Profile system** (`business_types` table + `capability_overrides` JSONB) rather than separate codebases:

1. **Healthcare & Medical Clinics** — Patient appointments, doctor sitting schedules, specialty triage, medical notes, vitals, prescriptions, and automated follow-ups (`medical` extension module).
2. **Beauty Salons & Wellness Spas** — Stylist/therapist calendars, catalog services with buffer times, add-ons/modifiers, and walk-in capacity management.
3. **Diagnostic & Collection Labs** — Time-window sample collection counters, capacity-capped booking slots, and home visit service dispatch.
4. **Venues, Turfs & Event Halls** — Resource-based asset reservation (courts, banquet halls, desks) selling duration presets ("1 hour", "Half day", "Full day") without complex hourly math.
5. **Home Repair & Field Services** — On-request job dispatch (`service` fulfillment), lead-time enforcement, technician auto-assignment, and quote-based requests.
6. **Professional Services (Lawyers, CAs, Consultants)** — Provider consultation slots, client onboarding, minimum notice rules, and prepaid booking deposits.

---

## Universal 4-Mode Scheduling & Availability Engine

The core scheduling engine calculates true real-time slot availability by evaluating overlapping multi-dimensional constraints.


### The 4 Configurable Scheduling Modes

| Mode                    | Target Domain                                            | Customer Flow                                             | Auto-Assignment Strategy                                                                 |
| ----------------------- | -------------------------------------------------------- | --------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| **1. Service-Based**    | Diagnostic centers, car wash, sample collection counters | Select service → Pick date & time slot                    | Capacity-limited time windows (`max_bookings` per slot template). No provider selection. |
| **2. Provider-Based**   | Clinics, salons, CAs, lawyers                            | Select service → Pick specific doctor/stylist → Pick slot | Evaluates individual staff shift rules, time-off, service capabilities, and buffers.     |
| **3. Resource-Based**   | Banquet halls, sports turfs, MRI scanners, meeting rooms | Select resource/asset → Pick duration preset → Pick time  | Resource calendar constraint prevents double-booking of physical assets.                 |
| **4. Hybrid (Default)** | High-throughput clinics & salons                         | Select service → Pick date & time slot                    | System automatically assigns the earliest/least-busy qualified provider or resource.     |

### Availability Calculation Math

Every offered time slot is calculated deterministically:

$$\text{Available Slot} = \text{Business Hours} \cap \text{Branch Hours} \cap \text{Resource Shift Rules} \cap \text{Asset Availability} \setminus (\text{Existing Bookings} \cup \text{Resource Time-Off} \cup \text{Blackout Dates}) \text{ subject to Capacity \& Lead Times}$$

- **Lead Time & Minimum Notice** — Enforces minimum booking advance notice (`min_notice_minutes`) per service (e.g. 12-hour fast before blood test) and tenant floor (`lead_time_minutes`).
- **Buffer Rules** — Automatic post-service setup/sanitization buffer (`buffer_minutes`) padded between appointments.
- **Resource Services Mapping** — `resource_services` junction table links qualified staff/assets to specific catalog items, ensuring patients only see doctors eligible for their selected service.

---

## Multi-Channel AI Agent & Messaging Worker

SchedBee runs an autonomous background worker built with **LangChain**, **LangGraph**, **OpenAI Agents**, and **RabbitMQ** (`amqplib`) to manage incoming customer conversations in real time across Meta WhatsApp Business Cloud API, Instagram, Facebook Messenger, SMS, and Web widgets.

![SchedBee AI Chat Assistant & Live Messaging](/assets/schedbee/chat-shcedbee.webp)

### Agent Architecture & Tool Execution Pipeline

```
Customer (WhatsApp/IG/SMS)
        │
        ▼ (Inbound Webhook)
┌────────────────────────────────┐     ┌────────────────────────────────┐
┌ Express API Server             │────▶│ RabbitMQ Message Queue         │
└────────────────────────────────┘     └───────────────┬────────────────┘
                                                       │
                                                       ▼
                                       ┌────────────────────────────────┐
                                       │ LangGraph / OpenAI Agent Worker│
                                       └───────────────┬────────────────┘
                                                       │
         ┌─────────────────────────────────────────────┴─────────────────────────────────────────────┐
         ▼                                             ▼                                             ▼
┌─────────────────┐                           ┌─────────────────┐                           ┌─────────────────┐
│ Business Context│                           │ Tool Execution  │                           │ Guardrails &    │
│ & Capability    │                           │ Engine          │                           │ Human Handoff   │
└─────────────────┘                           └─────────────────┘                           └─────────────────┘
```

### Specialized AI Tool Packs

The agent dynamically loads tool packs based on the business capability profile to prevent hallucination:

| Tool Pack     | Included AI Capabilities                                                                                     |
| ------------- | ------------------------------------------------------------------------------------------------------------ |
| `core`        | `get_business_info`, `list_catalog`, `search_customers`, `add_order_note`, `get_customer_orders`             |
| `appointment` | `list_resources`, `list_available_slots`, `book_appointment`, `reschedule_appointment`, `cancel_appointment` |
| `product`     | `browse_catalog`, `add_to_cart`, `view_cart`, `checkout_order`, `track_order`                                |
| `service`     | `list_technicians`, `request_job_quote`, `update_job_status`, `cancel_request`                               |
| `medical`     | `update_patient_record`, `link_patient_vitals`, `get_patient_medical_history`                                |

### Smart Human Handoff & Safety Guardrails

- **Assistant Hold (`assistant_held`)** — When an inquiry requires human intervention or sensitive handling, the AI sets `assistant_held = true`, notifying staff on the SchedBee Console shared inbox.
- **Tenant AI Settings** — Custom prompts, tone configuration, medical precautions, guardrails, and monthly credit budgets (`credit_limit`) enforced per business tenant (`ai_settings`).

---

## Android Native & Flutter Missed Call Recovery App (`missed-call-detect`)

A specialized companion Android mobile application built with **Flutter** and **Native Kotlin** that converts missed business phone calls into scheduled appointments.

### Cold-Start Native Detection Engine

- **Manifest-Registered `CallReceiver`** — Native Kotlin broadcast receiver registered for `PHONE_STATE`. Android cold-starts the app process to capture missed calls even if the app was never opened this boot or swiped from recents.
- **Persistent State Machine (`CallStore`)** — Tracks `RINGING → IDLE` without an intervening `OFFHOOK` transition in synchronous `SharedPreferences`.
- **`specialUse` Foreground Service (`WatcherService`)** — Keeps detection alive across aggressive OEM battery managers (Xiaomi/HyperOS, Oppo, Vivo, Realme).
- **Dual-SIM & E.164 Sync** — Normalizes phone numbers to E.164 standard, matches contacts using 9-digit fuzzy logic, respects SIM selection, and syncs queued events to the SchedBee server to automatically send WhatsApp template or SMS greetings.

---

## Multi-Tenant Business Console & EHR Module

The SchedBee Console is a desktop-class Web Application built with **React 19**, **Vite**, **TanStack Router**, **Tailwind CSS v4**, and **shadcn/ui**.


- **Dynamic Navigation & Terminology** — UI labels automatically adjust based on business type (Clinics see _Patients & Doctors_; Salons see _Clients & Stylists_; Turfs see _Guests & Courts_).
- **Interactive Multi-Calendar & Roster** — Drag-and-drop appointment scheduling, shift override management, and time-off tracking (`resource_time_off`).
- **Electronic Health Records (EHR)** — Dedicated clinical module for medical notes, patient diagnosis, vital tracking (BP, pulse, SpO2, temp), prescription generation, and scheduled follow-ups (`medical_records`, `medical_notes`, `medical_followups`).
- **Shared Live Inbox** — Real-time customer messaging workspace with human takeover toggle, conversation history, and quick booking sidebar.
- **SaaS Billing & Usage Metrics** — Built-in subscription usage engine (`pricing_plans`, `business_subscriptions`, `usage_records`) tracking confirmed bookings, WhatsApp messages, and AI token consumption.

---

## Dynamic AI Website Builder & Publishing Engine

Every business on SchedBee gets an instant, search-optimized marketing website hosted on Next.js 16.

- **Headless Release Architecture** — `website_projects` and `website_releases` tables store versioned JSON manifests (`manifestJson`).
- **Background Build Worker (`website-worker.ts`)** — Compiles template layouts, catalog listings, staff bios, working hours, and SEO metadata into statically rendered or edge-cached pages.
- **Instant Booking Web Widget** — Embedded booking widget integrated directly into tenant websites with real-time slot checking.

---

## Technical Architecture

```
┌─────────────────────────────────┐     ┌─────────────────────────────────┐     ┌─────────────────────────────────┐
│   React 19 + Vite Console       │────▶│   Express 5 REST API Server     │────▶│   PostgreSQL (Drizzle ORM)      │
│   TanStack Router / Tailwind v4 │     │   Node.js + JWT + Zod           │     │   (47+ tables, trigram search,  │
│   (port 3000)                   │     │   (port 4000)                   │     │    JSONB capability profiles)   │
└─────────────────────────────────┘     └─────────────────────────────────┘     └─────────────────────────────────┘
                 │                                       │
                 │ SSE / Shared DB                       │ RabbitMQ
                 ▼                                       ▼
┌─────────────────────────────────┐     ┌─────────────────────────────────┐     ┌─────────────────────────────────┐
│   Next.js 16 Website Builder    │     │   LangGraph AI Worker           │────▶│   OpenAI API                    │
│   (port 3001)                   │     │   Node.js / TypeScript          │     │   (gpt-4o / gpt-4o-mini)        │
└─────────────────────────────────┘     └─────────────────────────────────┘     └─────────────────────────────────┘
                                                         │
                                                         ├────▶ Meta WhatsApp Cloud API / Twilio
                                                         ├────▶ Qdrant Vector DB
                                                         └────▶ MinIO S3 Storage
┌─────────────────────────────────┐
│   Flutter Mobile App            │────▶ Express API + Native CallReceiver Sync
│   (Android Native Call Detector)│
└─────────────────────────────────┘
```

### Technology Stack Overview

| Component              | Technology                                                                                                          |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------- |
| **Frontend Console**   | React 19, TypeScript, Vite, TanStack Router, Tailwind CSS v4, Radix UI, Base UI, shadcn/ui, HugeIcons, Lucide icons |
| **Web & Storefront**   | Next.js 16 (App Router), React 19, Tailwind CSS v4                                                                  |
| **Mobile App**         | Flutter, Dart, Native Kotlin (`CallReceiver`, `WatcherService`), SQLite, E.164 Phone Normalization                  |
| **Backend REST API**   | Node.js, Express 5, TypeScript, Drizzle ORM, Zod, JWT authentication, Swagger UI (`swagger-jsdoc`)                  |
| **AI Worker & Queues** | Node.js Worker, RabbitMQ (`amqplib`), `@langchain/langgraph`, `@langchain/openai`, `@openai/agents`                 |
| **Vector DB & Search** | Qdrant Vector DB, PostgreSQL GIN indexes & `pg_trgm` trigram search                                                 |
| **Integrations**       | Meta WhatsApp Business Cloud API OAuth, Twilio SMS, Nodemailer, AWS S3 / MinIO                                      |
| **Database & Cache**   | PostgreSQL (47+ relational tables & JSONB profiles), Redis / RabbitMQ                                               |
| **Infrastructure**     | Docker Compose orchestration across PostgreSQL, RabbitMQ, MinIO, API Server, Worker, Console, Web                   |

---

Built for local SMBs. Powered by universal scheduling logic and autonomous agentic AI.
