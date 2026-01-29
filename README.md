# Bhavesh Enterprises | Industrial Portal

A specialized engineering platform built for high-performance lead management and industrial enquiry processing. This portal bridges the gap between client requirements and sourcing operations through a premium, glassmorphism-inspired interface and a hardened administrative backend.

---

## Overview

Designed for scaling industrial operations, the Bhavesh Enterprises portal replaces traditional manual enquiry handling with an automated, secure technical workflow. It is engineered to handle everything from standard parts sourcing to complex custom manufacturing requests involving CAD drawings and large-scale technical specifications.

### Key Features
- **Technical Enquiry Pipeline**: Optimized form submission handling with support for large technical attachments (PDF, CAD, Images).
- **Admin Dashboard**: A secure central hub for managing client requirements, tracking RFQ status, and coordinating sourcing efforts.
- **Enterprise-Grade Security**: Full RBAC integration, rate-limiting on public endpoints, and comprehensive database isolation via Supabase RLS.
- **Business Intelligence**: Native hooks for Excel/TSV exports, enabling seamless integration with existing engineering and procurement workflows.

---

## Technical Stack

The foundation is built on modern, type-safe technologies designed for stability and future extensibility.

*   **Framework**: Next.js 15 (App Router)
*   **Authentication**: NextAuth.js (JWT-based)
*   **Database**: PostgreSQL via Supabase
*   **ORM**: Prisma
*   **Infrastructure**: Supabase Storage & Vercel
*   **Design**: Tailwind CSS with custom industrial tokens

---

## Getting Started

### 1. Environment Configuration
Clone the repository and install dependencies. Initialize your local environment variables:

```bash
cp .env.example .env
```

**Required Credentials:**
- `DATABASE_URL`: Your Supabase connection string.
- `NEXT_PUBLIC_SUPABASE_URL` & `ANON_KEY`: Supabase project identification.
- `SUPABASE_SERVICE_ROLE_KEY`: Required for server-side storage management.
- `NEXTAUTH_SECRET`: Generate using `openssl rand -base64 32`.

### 2. Database Initialization
Prepare the database schema and initialize the primary administrator account:

```bash
# Push schema to the database
npx prisma migrate deploy

# Seed the admin user (ensure ADMIN_PASSWORD is set in .env)
npx prisma db seed
```

### 3. Storage Setup
You must create a storage bucket named `enquiry-files` in the Supabase Dashboard. Ensure the bucket policy is configured for public uploads if you intend to accept enquiries from unauthenticated clients.

---

## Project Architecture

- `/app/(public)`: Public marketing and lead generation interface.
- `/app/admin`: Protected administrative command center.
- `/lib`: Central library for security, validation schemas, and database clients.
- `/prisma`: Data modeling and migration history.

---

## Deployment & Production

This project is optimized for deployment on **Vercel**. When moving to production:

1.  Connect your repository and link environment variables.
2.  Enable **Row Level Security** by executing the policies in `prisma/rls-policies.sql`.
3.  Ensure your `NEXTAUTH_URL` reflects the production domain.

---

## Security & Maintenance

We prioritize the security of industrial data. Please refer to [SECURITY.md](SECURITY.md) for vulnerability disclosure procedures. For operational support, contact the system administrator at `admin@bhaveshenterprises.com`.

*© 2026 Bhavesh Enterprises. Excellence in Engineering.*
