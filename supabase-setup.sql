-- ============================================
-- SUPABASE DATABASE SETUP FOR MEMORY APP
-- ============================================
-- Copy and paste this entire script into Supabase SQL Editor
-- Then click "Run" to execute it

-- Step 1: Create the memories table
CREATE TABLE IF NOT EXISTS memories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 2: Enable Row Level Security
ALTER TABLE memories ENABLE ROW LEVEL SECURITY;

-- Step 3: Create policy to allow anonymous inserts
CREATE POLICY "Allow anonymous insert"
ON memories FOR INSERT
TO anon
WITH CHECK (true);

-- Step 4: Create policy to allow anonymous selects
CREATE POLICY "Allow anonymous select"
ON memories FOR SELECT
TO anon
USING (true);

-- ============================================
-- DONE! Your database is ready.
-- Next: Create storage bucket (see instructions below)
-- ============================================
