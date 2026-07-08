"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar as CalendarIcon,
  Clock,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  User,
  Mail,
  Building2,
  Briefcase,
  MessageSquare,
  Shield,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Button from "@/components/ui/Button";

const projectTypes = [
  "Landing Page",
  "Portfolio Website",
  "Business Website",
  "eCommerce Store",
  "SaaS Dashboard",
  "Agency Website",
  "Other",
];

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

export default function BookPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "",
    message: "",
  });

  // Calendar calculations
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Check if a date is in the past
  const isPast = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  // Check if a date is a weekend (Sat/Sun)
  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6; // 0 is Sunday, 6 is Saturday
  };

  // Format date to YYYY-MM-DD for API
  const formatDateString = (date: Date) => {
    const offset = date.getTimezoneOffset();
    const adjustedDate = new Date(date.getTime() - offset * 60 * 1000);
    return adjustedDate.toISOString().split("T")[0];
  };

  // Fetch booked slots when date changes
  useEffect(() => {
    if (!selectedDate) {
      setBookedTimes([]);
      return;
    }

    const fetchBookings = async () => {
      setLoadingSlots(true);
      setErrorMsg("");
      try {
        const dateStr = formatDateString(selectedDate);
        const res = await fetch(`/api/bookings?date=${dateStr}`);
        if (res.ok) {
          const data = await res.json();
          setBookedTimes(data);
        } else {
          console.error("Failed to fetch slots");
        }
      } catch (err) {
        console.error("Error fetching bookings:", err);
      } finally {
        setLoadingSlots(false);
      }
    };

    fetchBookings();
  }, [selectedDate]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) {
      setErrorMsg("Please select a date and time slot first.");
      return;
    }

    setSubmitting(true);
    setErrorMsg("");

    try {
      const dateStr = formatDateString(selectedDate);
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          date: dateStr,
          time: selectedTime,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSubmitted(true);
      } else {
        setErrorMsg(data.error || "An error occurred. Please try again.");
      }
    } catch (err) {
      console.error("Booking error:", err);
      setErrorMsg("Failed to connect to server. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Render Calendar Grid Cells
  const renderDays = () => {
    const days = [];
    
    // Empty cells for days of previous month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 w-10 sm:h-12 sm:w-12" />);
    }

    // Days in current month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const past = isPast(date);
      const weekend = isWeekend(date);
      const disabled = past || weekend;
      
      const isSelected = selectedDate && 
        selectedDate.getDate() === day && 
        selectedDate.getMonth() === month && 
        selectedDate.getFullYear() === year;

      const isToday = new Date().getDate() === day && 
        new Date().getMonth() === month && 
        new Date().getFullYear() === year;

      days.push(
        <button
          key={`day-${day}`}
          type="button"
          disabled={disabled}
          onClick={() => {
            setSelectedDate(date);
            setSelectedTime(null);
          }}
          className={`h-10 w-10 sm:h-12 sm:w-12 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center transition-all duration-200
            ${disabled 
              ? "text-zinc-300 dark:text-zinc-700 cursor-not-allowed" 
              : isSelected
                ? "bg-brand-500 text-white shadow-md shadow-brand-500/20 scale-105"
                : isToday
                  ? "border-2 border-brand-500/50 text-brand-600 dark:text-brand-400 bg-brand-500/5 hover:bg-brand-500/10"
                  : "text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-900/60 hover:bg-brand-500/10 hover:text-brand-500"
            }`}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  if (submitted && selectedDate) {
    return (
      <SectionWrapper className="pt-24 pb-20 bg-zinc-50 dark:bg-zinc-950 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-md w-full p-8 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 rounded-3xl shadow-sm"
        >
          <div className="w-16 h-16 rounded-full bg-green-500/15 text-green-500 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={32} />
          </div>
          <h2 className="font-display font-bold text-2xl text-zinc-900 dark:text-zinc-50 mb-3">
            Consultation Scheduled!
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-6">
            Thank you, {form.name}. Your call is confirmed for <strong className="text-zinc-800 dark:text-zinc-200">{formatDateString(selectedDate)}</strong> at <strong className="text-zinc-800 dark:text-zinc-200">{selectedTime} IST</strong>.
          </p>

          <div className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-800 rounded-2xl p-4 text-left text-xs leading-relaxed mb-8 flex flex-col gap-2">
            <div className="flex gap-2 text-zinc-600 dark:text-zinc-300">
              <span className="font-bold text-brand-500">📅 Date:</span>
              <span>{selectedDate.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span>
            </div>
            <div className="flex gap-2 text-zinc-600 dark:text-zinc-300">
              <span className="font-bold text-brand-500">⏰ Time:</span>
              <span>{selectedTime} IST (India Standard Time)</span>
            </div>
            <div className="flex gap-2 text-zinc-600 dark:text-zinc-300">
              <span className="font-bold text-brand-500">📧 Email:</span>
              <span>{form.email}</span>
            </div>
          </div>

          <Link
            href="/"
            className="inline-flex items-center justify-center w-full py-3 px-6 bg-zinc-900 dark:bg-zinc-100 hover:bg-brand-500 dark:hover:bg-brand-500 hover:text-white dark:hover:text-white text-white dark:text-zinc-900 font-semibold rounded-xl text-sm transition"
          >
            Return to Home
          </Link>
        </motion.div>
      </SectionWrapper>
    );
  }

  const inputClass =
    "w-full pl-10 pr-4 py-3 text-sm rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-500 dark:text-zinc-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all duration-200";

  return (
    <SectionWrapper className="pt-24 pb-20 bg-zinc-50 dark:bg-zinc-950 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-500 mb-3 sm:mb-4">
            Book a Slot
          </p>
          <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-zinc-900 dark:text-zinc-50 leading-[1.1] mb-3 sm:mb-4">
            Consult with a <span className="gradient-text">Developer</span>
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-base sm:text-lg leading-relaxed">
            Select an available weekday slot (10:00 AM - 6:00 PM IST) to discuss your digital brand goals, project scope, and timeline.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* STEP 1 & 2: CALENDAR & SLOTS */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Calendar Block */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-5 sm:p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display font-bold text-lg text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                  <CalendarIcon className="text-brand-500" size={20} />
                  Select a Date
                </h2>
                
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={prevMonth}
                    className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-brand-500/10 hover:text-brand-500 transition-colors"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200 min-w-[100px] text-center">
                    {monthNames[month]} {year}
                  </span>
                  <button
                    type="button"
                    onClick={nextMonth}
                    className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-brand-500/10 hover:text-brand-500 transition-colors"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              {/* Days of week */}
              <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2 text-center text-xs font-bold text-zinc-400 dark:text-zinc-600">
                <div>Su</div>
                <div>Mo</div>
                <div>Tu</div>
                <div>We</div>
                <div>Th</div>
                <div>Fr</div>
                <div>Sa</div>
              </div>

              {/* Days numbers */}
              <div className="grid grid-cols-7 gap-1 sm:gap-2 justify-items-center">
                {renderDays()}
              </div>
            </div>

            {/* Time Slots Block */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-5 sm:p-6 shadow-sm">
              <h2 className="font-display font-bold text-lg text-zinc-900 dark:text-zinc-50 mb-4 flex items-center gap-2">
                <Clock className="text-brand-500" size={20} />
                Select a Time Slot (IST)
              </h2>

              {!selectedDate ? (
                <div className="flex flex-col items-center justify-center py-10 text-center text-zinc-400">
                  <CalendarIcon className="opacity-30 mb-3" size={32} />
                  <p className="text-sm">Please select a working date from the calendar to view available slots.</p>
                </div>
              ) : loadingSlots ? (
                <div className="flex items-center justify-center py-12 gap-2 text-sm text-zinc-400">
                  <div className="w-4 h-4 border-2 border-brand-500/30 border-t-brand-500 rounded-full animate-spin" />
                  Loading availability...
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {timeSlots.map((time) => {
                    const isBooked = bookedTimes.includes(time);
                    const isSelected = selectedTime === time;
                    return (
                      <button
                        key={time}
                        type="button"
                        disabled={isBooked}
                        onClick={() => setSelectedTime(time)}
                        className={`py-3 px-4 rounded-xl text-xs font-bold transition-all duration-200 border
                          ${isBooked
                            ? "bg-zinc-50 dark:bg-zinc-950 border-zinc-100 dark:border-zinc-900 text-zinc-300 dark:text-zinc-700 cursor-not-allowed line-through"
                            : isSelected
                              ? "bg-brand-500 text-white border-brand-500 shadow-md shadow-brand-500/10 scale-[1.02]"
                              : "bg-zinc-100/50 dark:bg-zinc-900/40 border-zinc-200 dark:border-zinc-800/80 text-zinc-700 dark:text-zinc-300 hover:border-brand-500 hover:text-brand-500"
                          }`}
                      >
                        {time}
                        {isBooked && (
                          <span className="block text-[8px] uppercase tracking-wider font-normal mt-0.5 opacity-60">
                            Booked
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* STEP 3: DETAILS FORM */}
          <div className="lg:col-span-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm">
            <h2 className="font-display font-bold text-lg sm:text-xl text-zinc-900 dark:text-zinc-50 mb-6">
              Your Booking Details
            </h2>

            <form onSubmit={handleBookingSubmit} className="flex flex-col gap-4">
              
              {/* Selected date / time preview bar */}
              <div className="bg-zinc-50 dark:bg-zinc-950/80 border border-zinc-150 dark:border-zinc-800/80 rounded-2xl p-4 flex flex-col gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 mb-2">
                <div className="flex justify-between items-center">
                  <span>Selected Date:</span>
                  <span className="font-bold text-zinc-800 dark:text-zinc-200">
                    {selectedDate ? formatDateString(selectedDate) : "—"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Selected Time:</span>
                  <span className="font-bold text-zinc-800 dark:text-zinc-200">
                    {selectedTime ? `${selectedTime} IST` : "—"}
                  </span>
                </div>
              </div>

              {/* Full Name */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Full Name
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400">
                    <User size={15} />
                  </span>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="John Doe"
                    value={form.name}
                    onChange={handleInputChange}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400">
                    <Mail size={15} />
                  </span>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={handleInputChange}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Company (optional) */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="company" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Company Name <span className="text-zinc-400 dark:text-zinc-500 font-normal">(optional)</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400">
                    <Building2 size={15} />
                  </span>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    placeholder="Acme Inc."
                    value={form.company}
                    onChange={handleInputChange}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Project Type */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="projectType" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Project Type
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400">
                    <Briefcase size={15} />
                  </span>
                  <select
                    id="projectType"
                    name="projectType"
                    required
                    value={form.projectType}
                    onChange={handleInputChange}
                    className={`${inputClass} appearance-none`}
                  >
                    <option value="" disabled>
                      Select a project type...
                    </option>
                    {projectTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Briefly describe your goals
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-3.5 text-zinc-400">
                    <MessageSquare size={15} />
                  </span>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="What would you like to achieve in this call?"
                    value={form.message}
                    onChange={handleInputChange}
                    className={`${inputClass} pl-10 resize-none`}
                  />
                </div>
              </div>

              {/* Error messages */}
              {errorMsg && (
                <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-xs rounded-xl font-medium">
                  <AlertCircle size={15} className="flex-shrink-0" />
                  <p>{errorMsg}</p>
                </div>
              )}

              <Button
                type="submit"
                disabled={submitting || !selectedDate || !selectedTime}
                className="justify-center mt-3 shadow-md"
                size="lg"
              >
                {submitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Confirming Booking...
                  </>
                ) : (
                  "Schedule Consultation"
                )}
              </Button>

              <div className="flex gap-2 text-[10px] text-zinc-400 dark:text-zinc-500 px-1 mt-1.5">
                <Shield size={12} className="text-brand-500 flex-shrink-0 mt-0.5" />
                <p>We respect your privacy. Call links and details are shared securely via email.</p>
              </div>
            </form>
          </div>

        </div>

      </div>
    </SectionWrapper>
  );
}
