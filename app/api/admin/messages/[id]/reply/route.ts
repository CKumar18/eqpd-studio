import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { supabase } from '@/lib/supabase';

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
    from: 'EQPD Studio <onboarding@resend.dev>',
    to: [toEmail],
    subject,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #09090b;">
        <div style="background: linear-gradient(135deg, #7c3aed, #4f46e5); padding: 24px; border-radius: 12px 12px 0 0;">
          <h2 style="color: white; margin: 0; font-size: 20px;">EQPD Studio</h2>
        </div>
        <div style="background: #f9f9f9; padding: 32px; border-radius: 0 0 12px 12px; border: 1px solid #e4e4e7; border-top: none;">
          <p>Hello ${toName || 'there'},</p>
          <div style="white-space: pre-wrap; line-height: 1.7;">${body}</div>
          <hr style="border: 1px solid #e4e4e7; margin: 24px 0;" />
          <p style="color: #71717a; font-size: 13px;">Best regards,<br/><strong>EQPD Studio Team</strong><br/>eqpd.studio@gmail.com</p>
        </div>
      </div>
    `,
  });

  if (emailError) {
    return NextResponse.json(
      { error: 'Failed to send email', detail: emailError },
      { status: 500 }
    );
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
