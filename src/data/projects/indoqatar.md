---
order: 3
title: IndoQatar Real Estate — Full-Stack Property Platform
company: IndoQatar Projects Pvt. Ltd.
duration: Freelance
tags: [Next.js, TypeScript, React, Tailwind CSS, MongoDB, Mongoose, JWT, Cloudinary, Zod, Vercel]
excerpt: A full-stack real estate web application for IndoQatar Projects Pvt. Ltd., featuring public property listings, an admin dashboard with CRUD management, and an AI-powered chat widget.
visit_link: https://indoqatar.in/
---

## Overview

A full-stack real estate web application for **IndoQatar Projects Pvt. Ltd.**, a Telangana-based real estate company specializing in DTCP & RERA approved open plots, villa plots, and homes in Hyderabad and Khammam.

![IndoQatar Homepage](/assets/indoqatar/home-1.webp)

![IndoQatar Homepage — Projects & Features](/assets/indoqatar/home-2.webp)

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| UI | React 19, Tailwind CSS 4 |
| Database | MongoDB 7 (via Mongoose 9) |
| Auth | JWT (jose) + bcryptjs password hashing |
| Validation | Zod |
| Images | Cloudinary, Sharp (optimization) |
| Rich Text | React Quill |
| Sanitization | sanitize-html |
| Deployment | Vercel |

## Features

### Public Pages

- **Home** — Hero section, featured projects, advantages, customer journey, testimonials, gallery, FAQ, and blog previews
- **Projects** — Filterable project listings with individual project detail pages (gallery, amenities, highlights, FAQs, schedule visit, map embed, walkthrough video)
- **About** — Company intro, experience stats, trusted partner section, agent profiles, newsletter signup
- **Contact** — Contact form, office locations, Google Maps integration
- **Blog** — Blog listing with individual article pages (`/blogs/[slug]`)
- **Gallery** — Photo gallery of completed and ongoing projects
- **Brochures** — Downloadable project brochures
- **Privacy Policy & Terms** — Legal pages

### Admin Dashboard (`/admin`)

- JWT-based authentication with login/logout
- **Dashboard** — Analytics overview
- **Projects** — CRUD management with image uploads, rich text editing, drag-and-drop ordering
- **Blog** — Create/edit/delete blog posts
- **Gallery** — Manage site-wide gallery images
- **Submissions** — View and manage contact form submissions with detail modals
- **Settings** — Site-wide configuration management
- **Support Center** — Internal support tools

### Chat Widget

- Integrated chat widget with AI-powered intelligence for answering visitor questions about properties and services

### Security

- CSRF protection
- Rate limiting
- HTML sanitization
- JWT token management with refresh tokens
- Security headers (HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, XSS Protection)
- Input validation with Zod schemas
- Admin routes excluded from search engine indexing

### SEO

- Structured data (JSON-LD) for organization and website schemas
- Dynamic sitemap generation and robots.txt
- Open Graph and meta tag configuration per page
- Canonical URLs

## Project Structure

```
src/
├── app/
│   ├── (main)/              # Public pages (home, about, contact, projects, gallery)
│   ├── admin/
│   │   ├── login/           # Admin login page
│   │   └── (protected)/     # Authenticated admin routes
│   ├── api/                 # API routes (auth, submissions, upload, gallery, settings)
│   └── blogs/               # Blog pages
├── components/
│   ├── AboutPage/           # About page sections
│   ├── Admin/               # Admin layout (sidebar, header)
│   ├── AdminPage/           # Admin CRUD components (forms, tables, modals)
│   ├── Blogs/               # Blog components
│   ├── ChatWidget/          # AI chat widget
│   ├── ContactPage/         # Contact page sections
│   ├── HomePage/            # Home page sections
│   ├── Layout/              # Shared layout (navbar, footer)
│   ├── Projects/            # Project listing and detail components
│   └── Reusable/            # Shared components
├── lib/
│   ├── actions/             # Server actions (auth, projects, blogs, booking, upload, chat)
│   ├── security/            # CSRF, JWT, rate limiter, sanitizer
│   ├── constants/           # Static data
│   ├── db.ts                # MongoDB connection
│   ├── seo-config.ts        # SEO configuration
│   ├── structured-data.ts   # JSON-LD schema generators
│   └── validation.ts        # Zod validation schemas
├── models/                  # Mongoose models (Project, Blog, User, Submission, etc.)
└── types.ts                 # TypeScript type definitions
```

## My Role

Built the entire application from scratch as a freelance project:

- Designed and developed the **public-facing site** with Next.js App Router, server components, and Tailwind CSS
- Built a complete **admin dashboard** with JWT authentication, CRUD operations, image uploads via Cloudinary, and rich text editing
- Implemented **security best practices** — CSRF protection, rate limiting, input sanitization, secure headers, and Zod validation
- Set up **SEO infrastructure** — JSON-LD structured data, dynamic sitemaps, Open Graph tags, and canonical URLs
- Integrated an **AI-powered chat widget** for visitor engagement
- Deployed on **Vercel** with automatic deployments from the main branch
