"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Copy,
  Smartphone,
  Building2,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  Shield,
  Clock,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

const bankDetails = {
  accountName: "Bandi Sai Kumar",
  bankName: "State Bank of India",
  accountNumber: "43514056869",
  ifsc: "SBIN0020459",
  branch: "Macha Bollarum",
};

const upiId = "saikumarmhop2404-1@oksbi";

const timeSlots = [
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
];

const plans = [
  { name: "One-Page Website", price: "₹20,000" },
  { name: "Business Website", price: "₹35,000 – ₹50,000" },
  { name: "Professional Website", price: "₹60,000 – ₹1,00,000+" },
  { name: "Custom Web App", price: "Custom Quote" },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      type="button"
      onClick={copy}
      className="flex items-center gap-1 text-[10px] sm:text-xs font-semibold text-violet-600 dark:text-violet-400 hover:text-violet-500 transition-colors px-2 py-1 rounded bg-violet-50 dark:bg-violet-950/40"
    >
      {copied ? (
        <>
          <CheckCircle2 size={12} className="text-green-500" />
          <span className="text-green-500">Copied</span>
        </>
      ) : (
        <>
          <Copy size={12} />
          Copy
        </>
      )}
    </button>
  );
}

function OrderPageInner() {
  const searchParams = useSearchParams();
  const planName = searchParams.get("plan") || "";
  const planPrice = searchParams.get("price") || "";

  const [activePayment, setActivePayment] = useState<"upi" | "bank">("upi");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    businessName: "",
    selectedPlan: planName || "",
    website: "",
    transactionId: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [availability, setAvailability] = useState<"idle" | "checking" | "available" | "unavailable">("idle");
  const [freeSlots, setFreeSlots] = useState<string[]>([]);
  const [checkingError, setCheckingError] = useState("");

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowString = tomorrow.toISOString().split("T")[0];

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookingDate(e.target.value);
    setAvailability("idle");
    setCheckingError("");
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBookingTime(e.target.value);
    setAvailability("idle");
    setCheckingError("");
  };

  const checkAvailability = async () => {
    if (!bookingDate || !bookingTime) {
      setCheckingError("Please select both date and time slot.");
      return;
    }

    const dateObj = new Date(bookingDate);
    const day = dateObj.getUTCDay();

    // Enforce Monday (1) to Friday (5)
    if (day === 0 || day === 6) {
      setCheckingError("Kickoff calls are only available from Monday to Friday.");
      setAvailability("idle");
      return;
    }

    // Enforce future date
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (dateObj < today) {
      setCheckingError("Cannot book a slot in the past.");
      setAvailability("idle");
      return;
    }

    setCheckingError("");
    setAvailability("checking");

    try {
      const res = await fetch(`/api/bookings?date=${bookingDate}`);
      if (res.ok) {
        const booked = await res.json() as string[];
        
        // Filter free slots from standard timeSlots
        const available = timeSlots.filter((t) => !booked.includes(t));
        setFreeSlots(available);

        if (booked.includes(bookingTime)) {
          setAvailability("unavailable");
        } else {
          setAvailability("available");
        }
      } else {
        setCheckingError("Failed to verify slot availability.");
        setAvailability("idle");
      }
    } catch (err) {
      console.error(err);
      setCheckingError("Failed to connect to the database. Please try again.");
      setAvailability("idle");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (bookingDate && bookingTime && availability !== "available") {
      alert("Please verify slot availability by clicking 'Check Availability' before submitting your order.");
      return;
    }

    setLoading(true);

    try {
      if (bookingDate && bookingTime) {
        const res = await fetch("/api/bookings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: form.fullName,
            email: form.email,
            company: form.businessName,
            projectType: form.selectedPlan,
            date: bookingDate,
            time: bookingTime,
            message: `Order kickoff call notes: ${form.message}`,
          }),
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Failed to book kickoff call slot");
        }
      }

      await new Promise((r) => setTimeout(r, 1200));
      setSubmitted(true);
    } catch (err: any) {
      console.error(err);
      alert(err.message || "An error occurred. Please verify details and try again.");
    } finally {
      setLoading(false);
    }
  };

  const faqs = [
    {
      q: "When is the payment due?",
      a: "A 50% advance payment is required to initiate the design and development process. The remaining 50% is due upon completion, prior to the website launch.",
    },
    {
      q: "What is the typical delivery timeline?",
      a: "One-Page websites are launched within 5–7 days. Business websites take 10–20 days. Professional custom builds require 20–35 days depending on features.",
    },
    {
      q: "What are the next steps after submitting?",
      a: "We will verify the payment reference within 24 hours, confirm via email, and reach out to schedule a kickoff session to gather your brand assets.",
    },
    {
      q: "Can I upgrade or request custom features later?",
      a: "Yes, you can request changes. Each project includes revisions as defined in the plan scope, and further custom integrations can be quoted separately.",
    },
    {
      q: "How do I trace my transaction?",
      a: "Please input the UTR or Transaction ID provided by your banking app or UPI app in the form. It helps us process your kickoff without delay.",
    },
  ];

  if (submitted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-md w-full p-8 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 rounded-2xl shadow-sm"
        >
          <div className="w-16 h-16 rounded-full bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={32} />
          </div>
          <h2 className="font-display font-bold text-2xl text-zinc-900 dark:text-zinc-50 mb-3">
            Order Submitted
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-6">
            Thank you, {form.fullName}. We have received your project scope and payment details. We will email you at <strong>{form.email}</strong> within 24 hours.
            {bookingDate && bookingTime && (
              <span className="block mt-4 p-3.5 bg-violet-500/10 border border-violet-500/20 text-violet-600 dark:text-violet-400 rounded-xl text-xs text-left leading-normal font-semibold">
                🗓️ Kickoff Call Confirmed:<br/>
                <span className="text-zinc-800 dark:text-zinc-200 mt-1 block">
                  {bookingDate} at {bookingTime} IST.
                </span>
                <span className="text-[10px] text-zinc-400 font-normal block mt-1">A calendar invite has been sent.</span>
              </span>
            )}
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center w-full py-3 px-6 bg-zinc-900 dark:bg-zinc-100 hover:bg-violet-600 dark:hover:bg-violet-600 hover:text-white dark:hover:text-white text-white dark:text-zinc-900 font-semibold rounded-xl text-sm transition"
          >
            Return to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pt-8 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/pricing"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors mb-8 group"
        >
          <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
          Pricing Plans
        </Link>

        {/* Header */}
        <div className="mb-10 text-left">
          <p className="text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400 mb-2">
            Checkout
          </p>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-zinc-900 dark:text-zinc-50 leading-[1.2] mb-3">
            Complete Your Order
          </h1>
          {planName && (
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">
              Plan selected: <span className="font-semibold text-zinc-800 dark:text-zinc-200">{planName}</span>
              {planPrice && planPrice !== "Custom" && (
                <> &mdash; <span className="text-violet-600 dark:text-violet-400 font-bold">{planPrice}</span></>
              )}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* LEFT COLUMN — Form & Booking */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            {/* Kickoff Call Booking */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 sm:p-8 shadow-sm">
              <h3 className="font-display font-semibold text-sm text-zinc-900 dark:text-zinc-50 mb-3 flex items-center gap-1.5">
                <Clock size={16} className="text-violet-500" />
                Book Kickoff Call Slot
              </h3>
              <p className="text-xs text-zinc-400 dark:text-zinc-500 leading-relaxed mb-4">
                Choose a date and time slot (Monday to Friday, 10:00 AM - 6:00 PM IST) for your initial kickoff consultation call.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-zinc-400 dark:text-zinc-500 mb-1.5 uppercase tracking-wider">Date *</label>
                  <input
                    type="date"
                    value={bookingDate}
                    onChange={handleDateChange}
                    min={tomorrowString}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-zinc-400 dark:text-zinc-500 mb-1.5 uppercase tracking-wider">Time Slot (IST) *</label>
                  <select
                    value={bookingTime}
                    onChange={handleTimeChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition appearance-none"
                  >
                    <option value="">Select a time slot</option>
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={checkAvailability}
                  disabled={!bookingDate || !bookingTime || availability === "checking"}
                  className="inline-flex items-center justify-center py-2.5 px-4 rounded-xl border border-violet-500/30 text-violet-600 dark:text-violet-400 bg-violet-500/5 hover:bg-violet-500/10 text-xs font-semibold cursor-pointer disabled:opacity-50 transition"
                >
                  {availability === "checking" ? "Checking availability..." : "Check Availability"}
                </button>

                {checkingError && (
                  <div className="flex items-center gap-1.5 text-red-500 text-xs mt-1.5">
                    <AlertCircle size={14} className="flex-shrink-0" />
                    <span>{checkingError}</span>
                  </div>
                )}

                {availability === "available" && (
                  <p className="text-xs text-green-500 font-semibold mt-1 flex items-center gap-1.5">
                    ✓ a developer is available! This slot will be reserved for your kickoff.
                  </p>
                )}

                {availability === "unavailable" && (
                  <div className="mt-1 flex flex-col gap-2 p-3 bg-red-500/5 dark:bg-red-500/10 border border-red-500/20 rounded-xl">
                    <p className="text-xs text-red-500 font-semibold flex items-center gap-1.5">
                      ❌ all developers are busy at {bookingTime}.
                    </p>
                    {freeSlots.length > 0 ? (
                      <div>
                        <p className="text-[10px] uppercase font-bold text-zinc-400 mb-1">Available slots on this day:</p>
                        <div className="flex flex-wrap gap-1.5">
                          {freeSlots.map((slot) => (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => {
                                setBookingTime(slot);
                                setAvailability("idle");
                              }}
                              className="py-1 px-2.5 bg-zinc-100 hover:bg-violet-500 hover:text-white dark:bg-zinc-800 text-[10px] font-semibold rounded-lg transition-colors border border-zinc-200 dark:border-zinc-700"
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <p className="text-[10px] text-zinc-500">All slots for this day are fully booked. Please select another date.</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Project Information Form */}
            <AnimatePresence mode="wait">
              {availability === "available" ? (
                <motion.form
                  key="project-form"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit}
                  className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 sm:p-8 shadow-sm flex flex-col gap-6"
                >
                  <div>
                    <h2 className="font-display font-bold text-lg text-zinc-900 dark:text-zinc-50 mb-1">
                      Project Information
                    </h2>
                    <p className="text-xs text-zinc-400 dark:text-zinc-500 leading-normal">
                      Fill out your details and verify payment reference to confirm order.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="sm:col-span-1">
                      <label className="block text-[10px] font-bold text-zinc-400 dark:text-zinc-500 mb-1.5 uppercase tracking-wider">Full Name *</label>
                      <input
                        name="fullName"
                        required
                        value={form.fullName}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition"
                      />
                    </div>

                    {/* Email */}
                    <div className="sm:col-span-1">
                      <label className="block text-[10px] font-bold text-zinc-400 dark:text-zinc-500 mb-1.5 uppercase tracking-wider">Email Address *</label>
                      <input
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="name@company.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition"
                      />
                    </div>

                    {/* Phone */}
                    <div className="sm:col-span-1">
                      <label className="block text-[10px] font-bold text-zinc-400 dark:text-zinc-500 mb-1.5 uppercase tracking-wider">Phone Number *</label>
                      <input
                        name="phone"
                        type="tel"
                        required
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Mobile number"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition"
                      />
                    </div>

                    {/* Business Name */}
                    <div className="sm:col-span-1">
                      <label className="block text-[10px] font-bold text-zinc-400 dark:text-zinc-500 mb-1.5 uppercase tracking-wider">Business / Brand Name</label>
                      <input
                        name="businessName"
                        value={form.businessName}
                        onChange={handleChange}
                        placeholder="Company name"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition"
                      />
                    </div>

                    {/* Plan Selection */}
                    <div className="sm:col-span-1">
                      <label className="block text-[10px] font-bold text-zinc-400 dark:text-zinc-500 mb-1.5 uppercase tracking-wider">Selected Plan *</label>
                      <select
                        name="selectedPlan"
                        required
                        value={form.selectedPlan}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition appearance-none"
                      >
                        <option value="">Select your plan</option>
                        {plans.map((p) => (
                          <option key={p.name} value={p.name}>
                            {p.name} — {p.price}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Existing Web */}
                    <div className="sm:col-span-1">
                      <label className="block text-[10px] font-bold text-zinc-400 dark:text-zinc-500 mb-1.5 uppercase tracking-wider">Current Website (if any)</label>
                      <input
                        name="website"
                        value={form.website}
                        onChange={handleChange}
                        placeholder="https://yoursite.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition"
                      />
                    </div>

                    {/* Transaction ID */}
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-bold text-zinc-400 dark:text-zinc-500 mb-1.5 uppercase tracking-wider">Transaction UTR or Reference ID *</label>
                      <input
                        name="transactionId"
                        required
                        value={form.transactionId}
                        onChange={handleChange}
                        placeholder="Reference number from your transfer"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition font-mono"
                      />
                    </div>

                    {/* Message */}
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-bold text-zinc-400 dark:text-zinc-500 mb-1.5 uppercase tracking-wider">Project Scope Brief</label>
                      <textarea
                        name="message"
                        rows={4}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Include details about design style, content layout, features required, or target launch date..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition resize-none"
                      />
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-2 w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-violet-600 dark:hover:bg-violet-600 hover:text-white dark:hover:text-white font-semibold text-sm rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition duration-300 cursor-pointer"
                  >
                    {loading ? "Submitting details..." : "Confirm Order"}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="form-locked"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 sm:p-8 text-center flex flex-col items-center justify-center min-h-[260px] shadow-sm"
                >
                  <Shield className="text-zinc-300 dark:text-zinc-700 mb-4 animate-pulse" size={40} />
                  <h3 className="font-display font-semibold text-sm text-zinc-900 dark:text-zinc-50 mb-2">Project Information Locked</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-xs leading-relaxed">
                    Please choose a preferred kickoff call date and time slot above, then click <strong>Check Availability</strong> to unlock the project details form.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT COLUMN — Payment Details */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Payment Method Selector */}
            {availability === "available" ? (
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
                <div className="flex border-b border-zinc-100 dark:border-zinc-800">
                  <button
                    type="button"
                    onClick={() => setActivePayment("upi")}
                    className={`flex-1 flex items-center justify-center gap-2 py-4 text-xs font-semibold uppercase tracking-wider transition-colors ${
                      activePayment === "upi"
                        ? "text-violet-600 dark:text-violet-400 border-b-2 border-violet-500"
                        : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                    }`}
                  >
                    <Smartphone size={14} />
                    UPI / QR Code
                  </button>
                  <button
                    type="button"
                    onClick={() => setActivePayment("bank")}
                    className={`flex-1 flex items-center justify-center gap-2 py-4 text-xs font-semibold uppercase tracking-wider transition-colors ${
                      activePayment === "bank"
                        ? "text-violet-600 dark:text-violet-400 border-b-2 border-violet-500"
                        : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                    }`}
                  >
                    <Building2 size={14} />
                    Bank Transfer
                  </button>
                </div>

                <div className="p-5 sm:p-6">
                  <AnimatePresence mode="wait">
                    {activePayment === "upi" ? (
                      <motion.div
                        key="upi"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col items-center"
                      >
                        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 shadow-sm mb-4">
                          <img
                            src="/images/scanner.jpg"
                            alt="UPI QR Code"
                            className="w-40 h-40 object-contain dark:brightness-95"
                          />
                        </div>
                        <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-semibold uppercase tracking-wider mb-4">
                          Scan with any UPI application
                        </p>

                        <div className="w-full flex items-center justify-between gap-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-800 rounded-xl px-4 py-3">
                          <div className="min-w-0">
                            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">UPI ID</p>
                            <p className="font-mono text-xs text-zinc-800 dark:text-zinc-200 font-bold truncate">{upiId}</p>
                          </div>
                          <CopyButton text={upiId} />
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="bank"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col gap-3"
                      >
                        {[
                          { label: "Account Name", value: bankDetails.accountName },
                          { label: "Bank Name", value: bankDetails.bankName },
                          { label: "Account Number", value: bankDetails.accountNumber },
                          { label: "IFSC Code", value: bankDetails.ifsc },
                          { label: "Branch", value: bankDetails.branch },
                        ].map((item) => (
                          <div
                            key={item.label}
                            className="flex items-center justify-between gap-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-800 rounded-xl px-4 py-2.5"
                          >
                            <div className="min-w-0">
                              <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider">{item.label}</p>
                              <p className="font-mono text-xs text-zinc-800 dark:text-zinc-200 font-bold truncate">{item.value}</p>
                            </div>
                            <CopyButton text={item.value} />
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 text-center flex flex-col items-center justify-center min-h-[320px] shadow-sm">
                <Clock className="text-zinc-300 dark:text-zinc-700 mb-4 animate-pulse" size={48} />
                <h3 className="font-display font-semibold text-sm text-zinc-900 dark:text-zinc-50 mb-2">Payment Details Locked</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-xs leading-relaxed">
                  Please choose a preferred kickoff date and time slot on the right, then click <strong>Check Availability</strong> to unlock payment details.
                </p>
              </div>
            )}

            {/* Advance Payment Note */}
            <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5">
              <h3 className="font-display font-semibold text-sm text-zinc-900 dark:text-zinc-50 mb-1.5">
                Advance Confirmation
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                A 50% deposit is required to lock in the timeline. Save the transaction UTR number or ID after transfer, and include it in the form to confirm.
              </p>
            </div>

            {/* Security Note */}
            <div className="flex gap-3 text-xs text-zinc-400 dark:text-zinc-500 px-1">
              <Shield size={14} className="text-violet-500 flex-shrink-0 mt-0.5" />
              <p className="leading-normal">
                Payments are processed manually via bank-to-bank or UPI transfer, ensuring safe and direct processing.
              </p>
            </div>

            {/* Accordion FAQ */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
              <div className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800">
                <h3 className="font-display font-semibold text-sm text-zinc-900 dark:text-zinc-50">Order FAQ</h3>
              </div>
              {faqs.map((faq, i) => (
                <div key={i} className="border-b border-zinc-100 dark:border-zinc-800 last:border-0">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between gap-3 px-6 py-3.5 text-left hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors"
                  >
                    <span className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-50">{faq.q}</span>
                    {openFaq === i ? (
                      <ChevronUp size={14} className="text-violet-500 flex-shrink-0" />
                    ) : (
                      <ChevronDown size={14} className="text-zinc-400 flex-shrink-0" />
                    )}
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-4 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed border-t border-zinc-100 dark:border-zinc-800/60 pt-2.5">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <div className="w-8 h-8 border-3 border-violet-500/20 border-t-violet-500 rounded-full animate-spin" />
      </div>
    }>
      <OrderPageInner />
    </Suspense>
  );
}
