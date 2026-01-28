-- =====================================================
-- Supabase Row Level Security (RLS) Policies
-- Run this SQL in Supabase Dashboard > SQL Editor
-- =====================================================

-- 1. Enable RLS on Enquiry table
ALTER TABLE "Enquiry" ENABLE ROW LEVEL SECURITY;

-- 2. Enable RLS on Admin table
ALTER TABLE "Admin" ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- ENQUIRY TABLE POLICIES
-- =====================================================

-- Policy: Allow anyone to CREATE enquiries (public lead form)
CREATE POLICY "Allow public insert on Enquiry"
ON "Enquiry"
FOR INSERT
TO public
WITH CHECK (true);

-- Policy: Only service role can SELECT/UPDATE/DELETE enquiries
-- (Your Next.js API uses service role via Prisma connection string)
CREATE POLICY "Service role full access on Enquiry"
ON "Enquiry"
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- =====================================================
-- ADMIN TABLE POLICIES
-- =====================================================

-- Policy: Only service role can access Admin table
CREATE POLICY "Service role full access on Admin"
ON "Admin"
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- =====================================================
-- VERIFICATION
-- =====================================================
-- After running, verify RLS is enabled:
-- SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public';
