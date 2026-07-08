import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_mock_key");

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// 1. GET /api/bookings?date=YYYY-MM-DD
// Returns an array of booked times for the given date (e.g. ["10:00 AM", "12:00 PM"])
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");

    if (!date) {
      return NextResponse.json(
        { error: "Missing date parameter" },
        { status: 400 }
      );
    }

    if (!supabase) {
      return NextResponse.json([]);
    }

    const { data, error } = await supabase
      .from("bookings")
      .select("booking_time")
      .eq("booking_date", date);

    if (error) {
      console.error("Supabase query error:", error);
      return NextResponse.json(
        { error: "Database query failed" },
        { status: 500 }
      );
    }

    const bookedTimes = data.map((b: any) => b.booking_time);
    return NextResponse.json(bookedTimes);
  } catch (error) {
    console.error("API GET bookings error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// 2. POST /api/bookings
// Creates a new booking after checking availability constraints
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      company = "",
      projectType = "",
      date,
      time,
      message = "",
    } = body;

    // --- Validation ---
    if (!name || !email || !date || !time) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, date, time" },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Check availability rules
    const bookingDate = new Date(date);
    const dayOfWeek = bookingDate.getUTCDay(); // 0 is Sunday, 6 is Saturday

    // Enforce Monday (1) to Friday (5)
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return NextResponse.json(
        { error: "Bookings are only available from Monday to Friday." },
        { status: 400 }
      );
    }

    // Enforce that date is in the future
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (bookingDate < today) {
      return NextResponse.json(
        { error: "Cannot book slots in the past." },
        { status: 400 }
      );
    }

    if (!supabase) {
      return NextResponse.json(
        { error: "Database client not initialized" },
        { status: 500 }
      );
    }

    // Check if slot is already booked
    const { data: existingBooking, error: checkError } = await supabase
      .from("bookings")
      .select("id")
      .eq("booking_date", date)
      .eq("booking_time", time)
      .maybeSingle();

    if (checkError) {
      console.error("Supabase check error:", checkError);
      return NextResponse.json(
        { error: "Failed to verify slot availability" },
        { status: 500 }
      );
    }

    if (existingBooking) {
      return NextResponse.json(
        {
          error:
            "This time slot has already been booked. Please choose another slot.",
        },
        { status: 409 }
      );
    }

    // Save booking to Supabase
    const { error: dbError } = await supabase.from("bookings").insert([
      {
        name,
        email,
        company,
        project_type: projectType,
        booking_date: date,
        booking_time: time,
        message,
      },
    ]);

    if (dbError) {
      console.error("Supabase insert error:", dbError);
      return NextResponse.json(
        { error: "Failed to save booking details." },
        { status: 500 }
      );
    }

    // Send admin notification email
    const adminEmailResult = await resend.emails.send({
      from: "EQPD Booking <onboarding@resend.dev>",
      to: ["eqpd.studio@gmail.com"],
      subject: `New Call Booked: ${name}`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e4e4e7; padding: 24px; border-radius: 12px;">
          <h2 style="color: #7c3aed; margin-top: 0;">New Consultation Call Scheduled</h2>
          <p>A new consultation has been booked on the website.</p>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr style="background:#f4f4f5;"><td style="padding: 10px; font-weight: bold; color: #555;">Name</td><td style="padding: 10px;">${name}</td></tr>
            <tr><td style="padding: 10px; font-weight: bold; color: #555;">Email</td><td style="padding: 10px;"><a href="mailto:${email}">${email}</a></td></tr>
            <tr style="background:#f4f4f5;"><td style="padding: 10px; font-weight: bold; color: #555;">Company</td><td style="padding: 10px;">${company || "—"}</td></tr>
            <tr><td style="padding: 10px; font-weight: bold; color: #555;">Project Type</td><td style="padding: 10px;">${projectType || "—"}</td></tr>
            <tr style="background:#7c3aed; color: white;"><td style="padding: 10px; font-weight: bold;">Date & Time</td><td style="padding: 10px; font-weight: bold;">${date} at ${time} IST</td></tr>
            <tr><td style="padding: 10px; font-weight: bold; color: #555; vertical-align: top;">Notes/Message</td><td style="padding: 10px; white-space: pre-wrap;">${message || "—"}</td></tr>
          </table>
        </div>
      `,
    });

    // Send client confirmation email
    const clientEmailResult = await resend.emails.send({
      from: "EQPD Studio <onboarding@resend.dev>",
      to: [email],
      subject: "Your Consultation with EQPD Studio is Scheduled!",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e4e4e7; padding: 24px; border-radius: 12px;">
          <h2 style="color: #7c3aed; margin-top: 0;">Your Call is Confirmed!</h2>
          <p>Hi ${name},</p>
          <p>Thank you for scheduling a call with EQPD Studio. We are excited to learn more about your project.</p>
          
          <div style="background: #f5f0ff; border-left: 4px solid #7c3aed; padding: 16px; margin: 20px 0; border-radius: 4px;">
            <p style="margin: 0 0 8px 0; font-weight: bold; color: #7c3aed;">Meeting Details</p>
            <p style="margin: 0; font-size: 15px; font-weight: bold;">📅 Date: ${date}</p>
            <p style="margin: 4px 0 0 0; font-size: 15px; font-weight: bold;">⏰ Time: ${time} IST (India Standard Time)</p>
          </div>

          <p><strong>Next Steps:</strong> We will send a Google Meet link to this email address shortly before our scheduled call. Please prepare any details about your brand goals, target audience, and preferred websites for reference.</p>
          
          <p style="margin-top: 24px; font-size: 12px; color: #a1a1aa;">If you need to reschedule, please reply to this email at least 24 hours in advance.</p>
          <p style="margin-top: 24px; border-top: 1px solid #e4e4e7; padding-top: 16px; font-weight: bold;">Cheers,<br/>The EQPD Studio Team</p>
        </div>
      `,
    });

    if (adminEmailResult.error) {
      console.error("Admin email error:", adminEmailResult.error);
    }
    if (clientEmailResult.error) {
      console.error("Client email error:", clientEmailResult.error);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API POST bookings error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
