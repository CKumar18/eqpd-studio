-- Run this in Supabase SQL Editor

-- 1. Add status column to contact_messages (if not already present)
ALTER TABLE contact_messages 
ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'new';

-- 2. Create message_replies table
CREATE TABLE IF NOT EXISTS message_replies (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  message_id    UUID NOT NULL REFERENCES contact_messages(id) ON DELETE CASCADE,
  reply_subject TEXT NOT NULL,
  reply_body    TEXT NOT NULL,
  sent_at       TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Indexes
CREATE INDEX IF NOT EXISTS idx_message_replies_message_id ON message_replies(message_id);
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);

-- 4. RLS for message_replies
ALTER TABLE message_replies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can manage replies" ON message_replies
  FOR ALL TO service_role USING (true);

CREATE POLICY "Anon can insert replies" ON message_replies
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Anon can read replies" ON message_replies
  FOR SELECT TO anon USING (true);

-- 5. Allow anon to update status on contact_messages
CREATE POLICY "Allow anon status update" ON contact_messages
  FOR UPDATE TO anon USING (true) WITH CHECK (true);

-- 6. Allow anon to read contact_messages (for admin dashboard)
CREATE POLICY "Allow anon to read messages" ON contact_messages
  FOR SELECT TO anon USING (true);
