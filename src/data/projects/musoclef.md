---
order: 4
title: MusoClef — Online Music Education Platform
company: Freelance
duration: Ongoing
tags: [Next.js, TypeScript, React, Tailwind CSS, MongoDB, NextAuth.js, Framer Motion, Docker, PM2]
excerpt: An online music education platform offering personalized music classes for kids and adults, with interactive browser-based music tools, course management, and a full admin CMS.
visit_link: http://demo.musoclef.com
---

## Overview

An online music education platform offering personalized music classes for kids and adults. Learn guitar, piano, drums, vocals, and more with professional instructors.

![MusoClef Courses](/assets/musoclef/courses-list.webp)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| UI | React 18, Tailwind CSS, Radix UI (shadcn/ui), Framer Motion |
| State/Data | TanStack React Query, React Hook Form + Zod |
| Database | MongoDB (Mongoose) |
| Authentication | NextAuth.js + JWT |
| Charts | Recharts |
| Deployment | Docker, PM2 |

## Features

### Public Website

- **Hero with Video Background** — Animated landing section with intro video and call-to-action
- **Featured Courses** — Highlighted music courses with detailed pages, purchase cards, and related course suggestions
- **Book a Free Demo** — Enquiry form for prospective students to schedule a trial class
- **Gamified Learning** — Interactive, game-based approach to music education
- **Top Performers** — Showcase of standout students
- **Testimonials** — Student and parent reviews with social proof
- **Why Choose Us** — International certification, kids-friendly certified teachers, progress feedback, and performance opportunities
- **Affiliations** — Partner and affiliate organization showcase
- **FAQ** and **How to Enroll** — Step-by-step enrollment guide

### Courses & Rentals

- Full course catalog with filtering and detailed course pages (curriculum, pricing, purchase options)
- Related course recommendations
- **Rent & Learn** — Instrument rental service with available instruments listing, pricing, and how-it-works guide

### Interactive Music Tools

Built-in browser-based tools for practice and learning:

- **Virtual Piano** — Play piano keys in the browser
- **Virtual Guitar Fretboard** — Interactive guitar fretboard
- **Drum Pad** — Beat-making drum pad
- **Metronome** — Adjustable tempo metronome
- **Ear Training Game** — Interval and note recognition practice
- **Simple Music Composer** — Compose melodies in the browser

### Admin Dashboard

- **Dashboard** — Overview and analytics with Recharts
- **Courses Management** — CRUD operations with form dialogs
- **Blogs Management** — Create, edit, and delete blog posts
- **Bookings Management** — View and manage demo booking requests with status tracking
- **Instruments Management** — Manage rental instrument inventory
- **Teachers Management** — Manage teacher profiles
- **Testimonials Management** — Manage student/parent testimonials
- **Authentication** — JWT-based admin login with middleware-protected routes

### Additional Pages

- **Blogs** — Music education articles and content
- **Teach With Us** — Teacher recruitment and onboarding
- **About** — Our Story, Mission, Moments Gallery, stats and charts

## Project Structure

```
app/
  (public)/          # Public pages (home, about, courses, blogs, etc.)
  admin/             # Admin dashboard & login
  api/               # API routes
components/
  Home/              # Landing page sections
  Courses/           # Course listing & detail components
  Tools/             # Interactive music tools
  admin/             # Admin CMS components (tables, forms, dialogs)
lib/
  models/            # Mongoose models (Admin, Blog, Booking, Course, etc.)
  mongodb.ts         # Database connection
  auth-server.ts     # Auth utilities
```

## My Role

Built the full platform as a freelance project:

- Designed and developed the **public-facing site** with Next.js App Router, server components, Tailwind CSS, and Framer Motion animations
- Built 6 **interactive browser-based music tools** (piano, guitar, drums, metronome, ear training, composer)
- Implemented a complete **admin CMS** with JWT authentication, CRUD for courses, blogs, bookings, instruments, teachers, and testimonials
- Set up **Docker** containerization and **PM2** for production deployment
- Integrated **NextAuth.js** for authentication and **MongoDB** with Mongoose for data persistence
