"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Clock,
  Coins,
  Calendar,
  ArrowRight,
  User,
  Mail,
  FileText,
  CheckCircle2,
} from "lucide-react";

type Message = {
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
  chips?: string[];
  isForm?: boolean;
};

const chatbotKnowledge = [
  {
    keywords: ["hi", "hello", "hey", "sup", "greetings", "greet", "howdy"],
    answer: "Hello! I am **EQ**, your brand and web design assistant. How can I help you build or grow your digital presence today?",
    chips: ["💰 Website Pricing", "⚡ Delivery Timelines", "🗓️ How to Book"]
  },
  {
    keywords: ["price", "cost", "pricing", "rate", "fee", "packages", "how much", "budget", "one-page", "business", "pro"],
    answer: "We offer three transparent web design and development packages:\n\n- **One-Page Website**: ₹20,000 (best for landing pages & portfolios)\n- **Business Website**: ₹35,000 – ₹50,000 (complete multi-page branding & SEO)\n- **Professional Custom build**: ₹60,000 – ₹1,00,000+ (complex web apps & bespoke designs)\n\nWe require a **50% advance deposit** to kick off the work.",
    chips: ["🗓️ How to Book", "🛠️ Services Offered"]
  },
  {
    keywords: ["service", "services", "offer", "what do you do", "design", "development", "ui", "ux", "branding"],
    answer: "EQPD Studio specializes in:\n\n1. Premium **UI/UX Design** with Outfit display typography.\n2. **Custom Next.js & React Development** (fast, optimized code).\n3. **Brand Identities** & strategy consultation.\n4. Complete checkout and kickoff call scheduling setup.",
    chips: ["💰 Website Pricing", "🗓️ How to Book"]
  },
  {
    keywords: ["book", "call", "schedule", "kickoff", "meeting", "contact", "appointment", "consultation"],
    answer: "Scheduling a kickoff call is fully automated! Choose your plan, select a preferred date/time slot (Monday to Friday, 10:00 AM - 6:00 PM IST) on the checkout page, verify slot availability, and place your order. A Google Meet link is instantly sent to you.",
    chips: ["💰 Website Pricing", "✍️ Leave a Message"]
  },
  {
    keywords: ["time", "timeline", "duration", "how long", "speed", "delivery", "days", "weeks"],
    answer: "Delivery timelines depend on plan scope:\n\n- **One-Page websites**: 5–7 days\n- **Business websites**: 10–20 days\n- **Professional custom builds**: 20–35 days\n\nEach project includes revisions to guarantee complete satisfaction.",
    chips: ["🛠️ Services Offered", "✍️ Leave a Message"]
  },
  {
    keywords: ["portfolio", "work", "projects", "clients", "showcase", "designs", "samples", "examples"],
    answer: "You can view our featured works on the [Projects Page](/projects)! We design everything in-house with modern typography, subtle micro-animations, and glassmorphic aesthetics.",
    chips: ["🛠️ Services Offered", "✍️ Leave a Message"]
  },
  {
    keywords: ["human", "admin", "sai", "person", "representative", "contact admin", "support"],
    answer: "If you'd like to leave a direct inquiry, you can write a message using the form button below and I'll send it directly to our team.",
    chips: ["✍️ Leave a Message"]
  }
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Hi! I am **EQ**, your brand and web design assistant. How can I help you build or grow your digital presence today?",
      timestamp: new Date(),
      chips: ["💰 Website Pricing", "🛠️ Services Offered", "🗓️ How to Book", "✍️ Leave a Message"],
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Lead capture form state
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadMsg, setLeadMsg] = useState("");
  const [submittingLead, setSubmittingLead] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Show welcome tooltip after 4 seconds if chat isn't already open
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowTooltip(true);
      }
    }, 4005);
    return () => clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg: Message = {
      sender: "user",
      text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    // Simulate thinking delay
    setTimeout(() => {
      setIsTyping(false);
      
      if (text.includes("✍️ Leave a Message") || text.toLowerCase() === "leave a message") {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: "Please fill out the contact form below and a representative will get back to you:",
            timestamp: new Date(),
            isForm: true,
          },
        ]);
        return;
      }

      // Keyword matching
      const cleanedText = text.toLowerCase();
      let matched = chatbotKnowledge.find((k) =>
        k.keywords.some((keyword) => cleanedText.includes(keyword))
      );

      let botResponseText = "";
      let botChips: string[] = ["💰 Website Pricing", "🛠️ Services Offered", "✍️ Leave a Message"];

      if (matched) {
        botResponseText = matched.answer;
        if (matched.chips) botChips = matched.chips;
      } else {
        botResponseText = "I'm sorry, I didn't quite catch that. You can ask me about our **Pricing plans**, **timelines**, **services**, or leave a direct message for the team.";
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: botResponseText,
          timestamp: new Date(),
          chips: botChips,
        },
      ]);
    }, 1000);
  };

  const handleChipClick = (chip: string) => {
    handleSendMessage(chip);
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadEmail || !leadMsg) return;

    setSubmittingLead(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: leadName,
          email: leadEmail,
          message: leadMsg,
        }),
      });

      if (res.ok) {
        setFormSubmitted(true);
        // Replace form item in message list with success confirmation
        setMessages((prev) => [
          ...prev.filter((m) => !m.isForm),
          {
            sender: "bot",
            text: "✓ **Success!** Your details have been submitted. Our team will get back to you within 24 hours.",
            timestamp: new Date(),
            chips: ["💰 Website Pricing", "🛠️ Services Offered"],
          },
        ]);
        // Reset states
        setLeadName("");
        setLeadEmail("");
        setLeadMsg("");
      } else {
        alert("Failed to submit lead. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Error sending message. Please check your network connection.");
    } finally {
      setSubmittingLead(false);
    }
  };

  // Helper to render formatting bold syntax and links in chatbot answers
  const renderMessageText = (text: string) => {
    const boldRegex = /\*\*(.*?)\*\*/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = boldRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      parts.push(<strong key={match.index} className="font-bold text-zinc-900 dark:text-white">{match[1]}</strong>);
      lastIndex = boldRegex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    // Format newlines
    return parts.map((part, index) => {
      if (typeof part === "string") {
        return part.split("\n").map((line, i) => (
          <React.Fragment key={`${index}-${i}`}>
            {line}
            {i < part.split("\n").length - 1 && <br />}
          </React.Fragment>
        ));
      }
      return part;
    });
  };

  return (
    <>
      {/* Floating Welcome Tooltip */}
      <AnimatePresence>
        {showTooltip && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-40 bg-zinc-900 text-white text-xs py-3 px-4 rounded-xl shadow-xl flex items-center gap-3 border border-zinc-800 max-w-xs"
          >
            <div className="w-2 h-2 rounded-full bg-green-500 animate-ping absolute -top-0.5 -left-0.5" />
            <div className="flex-1 leading-normal pr-1">
              <span className="font-semibold block text-violet-400">EQ Assistant</span>
              Hi! Ask me anything about our web agency pricing or services.
            </div>
            <button
              onClick={() => setShowTooltip(false)}
              className="text-zinc-400 hover:text-white transition-colors"
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setShowTooltip(false);
          }}
          className="w-14 h-14 rounded-full bg-violet-600 hover:bg-violet-500 text-white flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none cursor-pointer"
        >
          {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        </button>
      </div>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed sm:bottom-24 bottom-20 sm:right-6 right-4 left-4 sm:left-auto sm:w-96 w-[calc(100vw-2rem)] h-[540px] bg-white/95 dark:bg-zinc-900/95 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden backdrop-blur-md"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-900/50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-500">
                  <Sparkles size={16} />
                </div>
                <div className="text-left">
                  <h3 className="font-display font-bold text-sm text-zinc-900 dark:text-zinc-50 flex items-center gap-1.5 leading-none">
                    EQ Assistant
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500" />
                  </h3>
                  <span className="text-[10px] text-zinc-400 dark:text-zinc-500 leading-none">Brand & Web Agency AI</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, index) => (
                <div key={index} className="space-y-2">
                  <div
                    className={`flex ${
                      msg.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-violet-600 text-white rounded-tr-none font-medium"
                          : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-tl-none border border-zinc-150/40 dark:border-zinc-850"
                      }`}
                    >
                      {renderMessageText(msg.text)}
                    </div>
                  </div>

                  {/* Inline Lead Capture Form */}
                  {msg.isForm && (
                    <motion.form
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      onSubmit={handleLeadSubmit}
                      className="bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-150 dark:border-zinc-800/80 rounded-xl p-4 flex flex-col gap-3 text-left max-w-[90%]"
                    >
                      <div>
                        <label className="block text-[9px] font-bold text-zinc-400 uppercase mb-1">Name</label>
                        <div className="relative">
                          <User size={12} className="absolute left-3 top-3 text-zinc-400" />
                          <input
                            type="text"
                            required
                            placeholder="Your name"
                            value={leadName}
                            onChange={(e) => setLeadName(e.target.value)}
                            className="w-full pl-8 pr-3 py-1.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-violet-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[9px] font-bold text-zinc-400 uppercase mb-1">Email</label>
                        <div className="relative">
                          <Mail size={12} className="absolute left-3 top-3 text-zinc-400" />
                          <input
                            type="email"
                            required
                            placeholder="Your email address"
                            value={leadEmail}
                            onChange={(e) => setLeadEmail(e.target.value)}
                            className="w-full pl-8 pr-3 py-1.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-violet-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[9px] font-bold text-zinc-400 uppercase mb-1">Message</label>
                        <div className="relative">
                          <FileText size={12} className="absolute left-3 top-3 text-zinc-400" />
                          <textarea
                            required
                            rows={3}
                            placeholder="How can we help?"
                            value={leadMsg}
                            onChange={(e) => setLeadMsg(e.target.value)}
                            className="w-full pl-8 pr-3 py-1.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-violet-500 resize-none"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={submittingLead}
                        className="w-full py-2 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1 cursor-pointer transition-colors"
                      >
                        {submittingLead ? "Sending..." : "Submit Inquiry"}
                      </button>
                    </motion.form>
                  )}

                  {/* Suggestion Chips */}
                  {msg.chips && msg.chips.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1 pl-1">
                      {msg.chips.map((chip, chipIdx) => (
                        <button
                          key={chipIdx}
                          type="button"
                          onClick={() => handleChipClick(chip)}
                          className="py-1.5 px-3 bg-violet-500/5 hover:bg-violet-500/10 text-violet-600 dark:text-violet-400 text-[10px] font-semibold rounded-full border border-violet-500/10 transition"
                        >
                          {chip}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Bot Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-zinc-100 dark:bg-zinc-800 text-zinc-400 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Form Footer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="p-3 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask EQ about pricing, book..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-violet-500 transition text-zinc-800 dark:text-zinc-200"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="w-8 h-8 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white flex items-center justify-center cursor-pointer transition-colors"
              >
                <Send size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
