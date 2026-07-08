import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET /api/admin/messages/[id]/replies
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const { data, error } = await supabase
    .from('message_replies')
    .select('*')
    .eq('message_id', id)
    .order('sent_at', { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
