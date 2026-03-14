import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET /api/admin/messages?page=1&status=all&search=foo
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const pageSize = 20;
  const status = searchParams.get('status') || 'all';
  const search = searchParams.get('search') || '';

  let query = supabase
    .from('contact_messages')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range((page - 1) * pageSize, page * pageSize - 1);

  if (status !== 'all') {
    query = query.eq('status', status);
  }

  if (search.trim()) {
    query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%`);
  }

  const { data, error, count } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    messages: data,
    total: count,
    page,
    pageSize,
    totalPages: Math.ceil((count || 0) / pageSize),
  });
}
