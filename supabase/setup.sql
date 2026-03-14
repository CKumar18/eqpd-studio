-- Create the contact_messages table in Supabase
-- Run this SQL in: Supabase Dashboard > SQL Editor

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS contact_messages (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  company     TEXT,
  service     TEXT,
  message     TEXT NOT NULL,
  created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Optional: Enable Row Level Security
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow the anon key to INSERT (from the API route)
CREATE POLICY "Allow anon inserts" ON contact_messages
  FOR INSERT TO anon WITH CHECK (true);

-- Only service_role (admin/server) can SELECT all rows
CREATE POLICY "Service role can read all" ON contact_messages
  FOR SELECT TO service_role USING (true);
