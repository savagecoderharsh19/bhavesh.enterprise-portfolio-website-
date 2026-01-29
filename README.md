# Bhavesh Enterprises

[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5.22-2D3748?logo=prisma)](https://www.prisma.io/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?logo=supabase)](https://supabase.com/)
[![License](https://img.shields.io/badge/License-Proprietary-red)]()

> **Enterprise-grade portfolio and lead generation platform** for Bhavesh Enterprises — featuring a premium marketing website, secure enquiry management system, and protected admin dashboard.

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 16.1.6 (App Router) |
| **Language** | TypeScript 5.x |
| **Database** | PostgreSQL (Supabase) |
| **ORM** | Prisma 5.22 |
| **Authentication** | NextAuth.js (JWT Sessions) |
| **File Storage** | Supabase Storage |
| **Styling** | Tailwind CSS + Custom Design System |
| **Deployment** | Vercel |

---

## 🔒 Security Features

This application implements industry-standard security practices:

### Authentication & Authorization
- ✅ **JWT-based sessions** via NextAuth.js
- ✅ **Role-based access control (RBAC)** — Admin-only dashboard
- ✅ **Secure password hashing** using bcryptjs
- ✅ **Protected routes** via Next.js middleware

### Input Validation & Sanitization
- ✅ **Zod schema validation** on all API endpoints
- ✅ **Prisma ORM** — Parameterized queries (SQL injection prevention)
- ✅ **File upload validation** — Type, extension, and size restrictions (10MB limit)
- ✅ **Filename sanitization** — Prevents path traversal attacks

### Rate Limiting
- ✅ **Form submissions**: 5 requests/minute per IP
- ✅ **File uploads**: 10 requests/minute per IP
- ✅ **429 responses** with `Retry-After` headers

### Security Headers
- ✅ `X-Frame-Options: DENY` — Clickjacking protection
- ✅ `X-Content-Type-Options: nosniff` — MIME sniffing prevention
- ✅ `X-XSS-Protection: 1; mode=block` — XSS filter
- ✅ `Referrer-Policy: strict-origin-when-cross-origin`
- ✅ `Permissions-Policy` — Camera, microphone, geolocation disabled
- ✅ `X-Powered-By` header disabled

### Data Protection
- ✅ **Environment variables** excluded from version control
- ✅ **Row Level Security (RLS)** policies for Supabase
- ✅ **CSV injection prevention** in data exports
- ✅ **No sensitive data in client bundles**

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or later
- npm 9.x or later
- PostgreSQL database (Supabase recommended)

### 1. Clone & Install

```bash
git clone https://github.com/savagecoderharsh19/bhavesh.enterprise-portfolio-website-.git
cd bhavesh.enterprise-portfolio-website-
npm install
```

### 2. Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env` with your credentials:

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | ✅ |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | ✅ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key | ✅ |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key (for file uploads) | ✅ |
| `NEXTAUTH_SECRET` | Session encryption key | ✅ |
| `NEXTAUTH_URL` | Application URL | ✅ |
| `ADMIN_PASSWORD` | Initial admin password | ✅ (Production) |

> ⚠️ **Security Note**: Generate secrets using cryptographically secure methods:
> ```bash
> openssl rand -base64 32  # For NEXTAUTH_SECRET
> ```

### 3. Database Setup

```bash
# Run migrations
npx prisma migrate deploy

# Seed admin user
npx prisma db seed
```

**Admin Credentials**:
- Email: `admin@bhaveshenterprises.com`
- Password: Set via `ADMIN_PASSWORD` environment variable

### 4. Supabase Storage Setup

1. Go to **Supabase Dashboard** → **Storage**
2. Create bucket: `enquiry-files`
3. Enable **Public bucket** option
4. Copy **service_role** key from Settings → API

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🌐 Production Deployment (Vercel)

### Step 1: Configure Environment Variables

Set the following in **Vercel Dashboard** → **Settings** → **Environment Variables**:

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | Supabase connection string |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://[project].supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key |
| `NEXTAUTH_SECRET` | `openssl rand -base64 32` |
| `NEXTAUTH_URL` | `https://your-domain.com` |
| `ADMIN_PASSWORD` | Strong password (16+ characters) |

### Step 2: Deploy

```bash
git push origin main
```

Vercel will automatically:
1. Run `prisma generate`
2. Build the Next.js application
3. Deploy to production

### Step 3: Post-Deployment

```bash
# Run migrations against production database
npx prisma migrate deploy
```

> ⚠️ **Security Warning**: Never run database seeding from local machines against production. Use CI/CD pipelines with secrets management.

### Step 4: Apply Row Level Security

Execute the SQL in `prisma/rls-policies.sql` via **Supabase Dashboard** → **SQL Editor**.

---

## 📁 Project Structure

```
├── app/
│   ├── (public)/           # Marketing pages
│   ├── admin/              # Protected admin dashboard
│   └── api/                # API routes
├── components/
│   ├── sections/           # Page sections
│   └── ui/                 # Reusable UI components
├── lib/
│   ├── prisma.ts           # Database client
│   ├── rate-limit.ts       # Rate limiting utility
│   └── supabase.ts         # Storage client
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── rls-policies.sql    # Row Level Security
└── middleware.ts           # Auth middleware
```

---

## 🛠️ Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npx prisma studio` | Open database GUI |

---

## 🔐 Security Checklist (Pre-Production)

Before deploying to production, ensure:

- [ ] Strong `NEXTAUTH_SECRET` (32+ characters, randomly generated)
- [ ] Strong `ADMIN_PASSWORD` (16+ characters, mixed case, numbers, symbols)
- [ ] `SUPABASE_SERVICE_ROLE_KEY` is not exposed in client code
- [ ] RLS policies applied in Supabase
- [ ] Storage bucket configured with appropriate permissions
- [ ] All environment variables set in Vercel
- [ ] Domain configured with HTTPS
- [ ] Regular security audits scheduled

---

## 📄 License

This project is proprietary software owned by Bhavesh Enterprises. All rights reserved.

---

## 🤝 Support

For technical support or security concerns, contact:
- **Email**: admin@bhaveshenterprises.com
- **Security Issues**: Report via private channels only

---

<div align="center">

**Built with ❤️ for Bhavesh Enterprises**

*One-Stop Industrial Hub*

</div>
