# Bhavesh Enterprises

Next.js app for the Bhavesh Enterprises site: marketing, enquiry form, and admin dashboard.

## Getting Started

1. **Copy environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and set:
   - `DATABASE_URL` – PostgreSQL connection string
   - `NEXT_PUBLIC_SUPABASE_URL` – Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` – Supabase anon/public key
   *Note: `NEXT_PUBLIC_` variables are required for client-side Supabase features.*
   - `NEXTAUTH_SECRET` – e.g. `openssl rand -base64 32`
   - `NEXTAUTH_URL` – `http://localhost:3000` locally
   - `BLOB_READ_WRITE_TOKEN` – (optional) Vercel Blob token for file uploads

2. **Run**
   ```bash
   npm install
   ```

3. **Database**
   ```bash
   npx prisma migrate deploy
   npx prisma db seed
   ```
   **Admin Setup**:
   The seed script creates the initial admin user (`admin@bhaveshenterprises.com`).
   - **Local Development**: If `ADMIN_PASSWORD` is not in `.env`, a random password is generated and printed to the console.
   - **Production**: The script **fails** if `ADMIN_PASSWORD` is not set. You must provide it explicitly.

4. **Develop**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000).

## Deploy (Vercel)

1. Push to GitHub and import the project in Vercel.
2. **Env vars** in Vercel:
   - `DATABASE_URL` – Supabase connection string (Settings > Database)
   - `NEXT_PUBLIC_SUPABASE_URL` – Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` – Supabase anon/public key
   - `NEXTAUTH_SECRET` – Generate with `openssl rand -base64 32`
   - `NEXTAUTH_URL` – `https://your-domain.com`
   - `ADMIN_PASSWORD` – (Required for seeding) Strong initial admin password

3. **Build**: `prisma generate` runs automatically before `next build`.

4. **After first deploy**: run migrations:
   ```bash
   npx prisma migrate deploy
   ```
   **Secure Seeding**:
   Do NOT run seeding from your local machine against the production database. Instead:
   - Run `npx prisma db seed` as part of your CI/CD pipeline (e.g., GitHub Actions, Vercel Build Step) with `ADMIN_PASSWORD` securely injected as a secret.
   - Or execute it from a secure bastion host / audited environment.
   - The seed script will strictly fail in production if `ADMIN_PASSWORD` is missing.

## Scripts

- `npm run dev` – development
- `npm run build` – `prisma generate` + `next build`
- `npm run start` – production server
- `npm run lint` – ESLint
