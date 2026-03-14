import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getContactConfirmationEmail } from '@/lib/email-templates';

const resend = new Resend(process.env.RESEND_API_KEY);

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company = '', projectType: service = '', message } = body;

    // --- Validation ---
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, message' },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // --- 1. Save lead in Supabase ---
    const { error: dbError } = await supabase
      .from('contact_messages')
      .insert([{ name, email, company, service, message }]);

    if (dbError) {
      console.error('Supabase insert error:', dbError);
      return NextResponse.json(
        { error: 'Failed to store your message. Please try again.' },
        { status: 500 }
      );
    }

    // --- 2. Send admin notification email ---
    const adminEmailResult = await resend.emails.send({
      from: 'EQPD Admin <onboarding@resend.dev>',
      to: ['eqpd.studio@gmail.com'],
      subject: `New Lead – EQPD Studio`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #7c3aed;">New Contact Form Submission</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; font-weight: bold; color: #555;">Name</td><td style="padding: 8px;">${name}</td></tr>
            <tr style="background:#f9f9f9;"><td style="padding: 8px; font-weight: bold; color: #555;">Email</td><td style="padding: 8px;"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding: 8px; font-weight: bold; color: #555;">Company</td><td style="padding: 8px;">${company || '—'}</td></tr>
            <tr style="background:#f9f9f9;"><td style="padding: 8px; font-weight: bold; color: #555;">Service</td><td style="padding: 8px;">${service || '—'}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; color: #555; vertical-align: top;">Message</td><td style="padding: 8px; white-space: pre-wrap;">${message}</td></tr>
          </table>
        </div>
      `,
    });

    // --- 3. Send confirmation email to user ---
    const confirmationEmailResult = await resend.emails.send({
      from: 'EQPD Admin <onboarding@resend.dev>',
      to: [email],
      subject: 'Thanks for contacting EQPD Studio',
      html: getContactConfirmationEmail({ name, service }),
    });

    // --- 4. Return response (warn if email failed, but lead is saved) ---
    if (adminEmailResult.error) {
      console.error('Failed to send admin notification:', adminEmailResult.error);
    }
    if (confirmationEmailResult.error) {
      console.error('Failed to send user confirmation:', confirmationEmailResult.error);
    }

    const emailWarning =
      adminEmailResult.error || confirmationEmailResult.error
        ? 'Lead saved but one or more emails failed to send.'
        : null;

    return NextResponse.json({
      success: true,
      ...(emailWarning && { warning: emailWarning }),
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
