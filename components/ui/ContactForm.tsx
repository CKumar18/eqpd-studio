"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";
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

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setSubmitted(true);
        setForm({ name: "", email: "", company: "", projectType: "", message: "" });
      } else {
        const data = await response.json();
        throw new Error(data.error || "Failed to submit form");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      alert("Oops! There was a problem submitting your form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-16 text-center gap-4"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.1 }}
          className="w-16 h-16 rounded-full bg-green-500/15 flex items-center justify-center"
        >
          <CheckCircle className="text-green-500" size={32} />
        </motion.div>
        <h3 className="font-display font-bold text-2xl text-zinc-900 dark:text-zinc-50">
          Message Sent!
        </h3>
        <p className="text-zinc-500 dark:text-zinc-400 max-w-xs">
          Thanks for reaching out. We&apos;ll get back to you within 24 hours.
        </p>
        <Button
          onClick={() => {
            setSubmitted(false);
            setForm({ name: "", email: "", company: "", projectType: "", message: "" });
          }}
          variant="outline"
          className="mt-2"
        >
          Send another message
        </Button>
      </motion.div>
    );
  }

  const inputClass =
    "w-full px-4 py-3 text-sm rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-500 dark:text-zinc-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all duration-200";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Name + Email row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="name"
            className="text-sm font-medium text-zinc-900 dark:text-zinc-50"
          >
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="John Doe"
            value={form.name}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="company"
            className="text-sm font-medium text-zinc-900 dark:text-zinc-50"
          >
            Company <span className="text-zinc-400 font-normal">(optional)</span>
          </label>
          <input
            id="company"
            name="company"
            type="text"
            placeholder="Acme Inc."
            value={form.company}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="text-sm font-medium text-zinc-900 dark:text-zinc-50"
          >
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="john@example.com"
            value={form.email}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
      </div>

      {/* Project Type */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="projectType"
          className="text-sm font-medium text-zinc-900 dark:text-zinc-50"
        >
          Project Type
        </label>
        <select
          id="projectType"
          name="projectType"
          required
          value={form.projectType}
          onChange={handleChange}
          className={inputClass}
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

      {/* Message */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="message"
          className="text-sm font-medium text-zinc-900 dark:text-zinc-50"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell us about your project, goals, and timeline..."
          value={form.message}
          onChange={handleChange}
          className={`${inputClass} resize-none`}
        />
      </div>

      <Button
        type="submit"
        disabled={loading}
        size="lg"
        className="justify-center"
      >
        {loading ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send size={16} />
            Send Message
          </>
        )}
      </Button>
    </form>
  );
}
