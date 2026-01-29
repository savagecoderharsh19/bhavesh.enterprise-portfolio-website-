# Bhavesh Enterprises | Industrial Portal

A high-performance, secure engineering portal designed for Bhavesh Enterprises. This platform serves as a multi-functional bridge between industrial clients and sourcing teams, featuring a premium marketing interface and a robust administration backend.

---

## ⚡ Core Concept

The portal is built to handle complex industrial enquiries with ease. It combines a high-luxury, industrial-grade brand aesthetic with specialized engineering tools like secure CAD file handling, automated technical exports, and real-time requirement tracking.

### Key Capabilities
- **Technical Enquiry System**: Managed form submission with support for large file attachments (PDF, CAD, Images).
- **Admin Command Center**: A protected dashboard for the team to manage, review, and progress customer requirements.
- **Industrial Design System**: Premium "glassmorphism" UI tailored for the engineering industry.
- **Smart Data Export**: Direct-to-Excel and TSV clipboard synchronization for engineering workflows.

---

## 🛠 Technical Foundation

We chose a modern, type-safe stack to ensure long-term stability and security.

- **Frontend**: Next.js 15 (App Router) for speed and SEO.
- **Auth**: NextAuth.js with JWT-based session security.
- **Database**: PostgreSQL via Supabase for enterprise-grade data persistence.
- **ORM**: Prisma for a type-safe database interface.
- **Storage**: Supabase Storage buckets for secure technical drawing management.
- **Styling**: Tailwind CSS with custom industrial design tokens.

### Security Architecture
Security wasn't an afterthought—it's built into every layer.
- **Access Control**: Strict RBAC (Role Based Access Control) and Middleware protection.
- **Rate Limiting**: Automated IP-based protection for form spam and file abuse.
- **Input Integrity**: Full Zod schema validation across the entire request pipeline.
- **Hardened Headers**: Pre-configured security headers (CSP, HSTS, X-Frame-Options).

---

## 🚀 Development Setup

### 1. Environment Configuration
Clone the repository and install dependencies using `npm install`. You'll need to create a `.env` file based on the template:

```bash
cp .env.example .env
```

**Key Credentials Required:**
- `DATABASE_URL`: Your Supabase Postgres connection string.
- `NEXT_PUBLIC_SUPABASE_URL` / `ANON_KEY`: Project identification.
- `SUPABASE_SERVICE_ROLE_KEY`: Required for server-side storage management.
- `NEXTAUTH_SECRET`: Generate a strong key using `openssl rand -base64 32`.

### 2. Database & Admin Setup
Sync your schema and create the primary administrator:

```bash
# Push schema to db
npx prisma migrate deploy

# Seed initial admin (requires ADMIN_PASSWORD in .env)
npx prisma db seed
```

### 3. Storage Preparation
You must create a bucket named `enquiry-files` in your Supabase storage dashboard. Ensure it's set to **Public** for public form submissions to work correctly.

---

## 📂 Internal Structure

- `app/(public)`: Marketing sections and public lead generation.
- `app/admin`: Secure administrative interface and dashboard.
- `app/api`: Server-side logic and third-party integrations.
- `lib/`: Centralized utilities (rate limiting, auth, db clients).
- `prisma/`: Database schema definitions and migration history.

---

## 📦 Deployment

The project is optimized for **Vercel**. 
1. Connect your GitHub repository.
2. Link your environment variables.
3. Apply Row Level Security policies using `prisma/rls-policies.sql` in the Supabase SQL editor.

### Pre-Launch Checklist
- [ ] Verify `NEXTAUTH_URL` matches your production domain.
- [ ] Ensure `ADMIN_PASSWORD` is unique and strong.
- [ ] Confirm storage bucket permissions are active.
- [ ] Run `npm build` locally to verify production parity.

---

## 🤝 Support & Security

For support or bug reporting, reach out to the technical team at `admin@bhaveshenterprises.com`. Security concerns should be handled via private channels as outlined in our `SECURITY.md`.

*© 2026 Bhavesh Enterprises. Industrial Engineering Excellence.*
