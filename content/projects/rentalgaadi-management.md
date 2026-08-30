---
order: 6
title: RentalGaadi Management — Full-Stack Vehicle Rental Platform
company: Personal Project
duration: Completed
tags: [Next.js, React, TypeScript, Vite, TanStack Router, Ant Design, Bun, Elysia, MongoDB, BullMQ, AWS S3, Flutter]
excerpt: A complete vehicle rental ecosystem with a customer booking app, admin operations panel, Bun/Elysia backend APIs, background job workers, and a Flutter manager app.
visit_link: http://rentalgaadi.com
note: Multi-app monorepo with active development across frontend, backend, and ops workflows
---

## Overview

RentalGaadi Management is a multi-application rental platform designed for end-to-end vehicle rental operations.

It includes:

- **Customer web app** for browsing vehicles, location-based search, and bookings
- **Admin app** for pricing, fleet, stations, bookings, payments, and staff operations
- **Backend API** built on Bun + Elysia with MongoDB and queue-based background jobs
- **Manager mobile app** (Flutter) for station-level execution workflows

<img src="/assets/rentalgaadi/logo.png" alt="RentalGaadi Logo" width="72" />

![RentalGaadi Customer Hero](/assets/rentalgaadi/userfront-hero.png)

## Architecture

```
Customer App (Next.js)
  -> Booking/Search APIs
  ->
API Layer (Bun + Elysia)
  -> MongoDB (core entities)
  -> BullMQ queues (async jobs)
  -> Object storage uploads (S3-compatible)
  ->
Admin App (React + Vite + TanStack Router)
Manager App (Flutter)
```

## Tech Stack

| Layer | Technologies |
|---|---|
| Customer Web | Next.js, React, TypeScript, React Query |
| Admin Dashboard | React, Vite, TanStack Router, Ant Design, Tailwind CSS |
| Backend API | Bun, Elysia, MongoDB, JWT, BullMQ |
| Storage & Jobs | AWS SDK (S3-compatible), background workers |
| Mobile | Flutter |

## Features

### Customer App (`rentride`)

- Vehicle discovery and location-based search
- Booking-oriented flows with station selection and availability checks
- Add-ons, policy pages, and user-friendly rental journey

![RentalGaadi Customer Vehicle Detail](/assets/rentalgaadi/userfront-vehicle-detail.png)

### Admin Dashboard (`Admin-Rental-App`)

- Role-aware admin and manager workflows
- Fleet operations for models, vehicles, and pricing
- Station and manager management across cities
- Booking, payment, and customer operations interfaces

![RentalGaadi Admin Panel](/assets/rentalgaadi/admin-panel.png)

### Backend API (`api`)

- Bun + Elysia API modules for auth, stations, users, bookings, models, and vehicles
- MongoDB-backed domain entities for rental operations
- Queue-backed async processing with BullMQ for heavier background tasks
- S3-compatible object storage integration for upload workflows

### Manager Mobile App (`manager_app`)

- Flutter app layer for station-level operational workflows
- Mobile execution path aligned with admin and backend systems

## Project Structure

```
rentalgaadi-management/
├── rentride/          # Customer-facing Next.js app
├── Admin-Rental-App/  # React + Vite admin operations panel
├── api/               # Bun + Elysia backend API and workers
└── manager_app/       # Flutter manager mobile app
```

## My Role

- Designed and implemented modular frontends for customer and admin experiences
- Built API modules for vehicles, bookings, stations, managers, and payments
- Structured role-aware flows for admin vs manager operations
- Integrated queue-backed processing to keep request/response paths fast
- Maintained a scalable, multi-app codebase for continuous feature iteration
