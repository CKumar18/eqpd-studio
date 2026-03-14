import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { supabase } from '@/lib/supabase';
import { getAdminReplyEmail } from '@/lib/email-templates';

const resend = new Resend(process.env.RESEND_API_KEY);

// POST /api/admin/messages/[id]/reply
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { subject, body, toEmail, toName } = await request.json();

  if (!subject || !body || !toEmail) {
    return NextResponse.json(
      { error: 'Missing required fields: subject, body, toEmail' },
      { status: 400 }
    );
  }

  // 1. Send email via Resend
  const { error: emailError } = await resend.emails.send({
    from: 'EQPD Admin <onboarding@resend.dev>',
    to: [toEmail],
    subject,
    html: getAdminReplyEmail({ body }),
  });

  if (emailError) {
    console.error('Failed to send reply email:', emailError);
    // Proceed to store in DB anyway so lead details aren't lost
  }

  // 2. Store reply in Supabase
  const { error: dbError } = await supabase
    .from('message_replies')
    .insert([{ message_id: id, reply_subject: subject, reply_body: body }]);

  if (dbError) {
    // Email sent but DB failed — warn rather than error
    return NextResponse.json({ success: true, warning: 'Email sent but reply not stored in DB.' });
  }

  // 3. Update message status to 'contacted' if it's still 'new'
  await supabase
    .from('contact_messages')
    .update({ status: 'contacted' })
    .eq('id', id)
    .eq('status', 'new');

  return NextResponse.json({ success: true });
}
