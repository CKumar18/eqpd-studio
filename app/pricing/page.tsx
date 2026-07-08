"use client";

import { motion } from "framer-motion";
import { 
  Check, 
  ArrowRight, 
  Layers, 
  Globe, 
  Sparkles, 
  Code2,
  Smartphone,
  Search,
  Mail,
  MessageSquare,
  Share2,
  MapPin,
  Lock,
  BookOpen
} from "lucide-react";
import Link from "next/link";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Container from "@/components/layout/Container";
import { cn } from "@/lib/utils";

const plans = [
  {
    tier: "One-Page Website",
    icon: Layers,
    price: "₹20,000",
    priceNote: "Starting from",
    description: "Ideal for portfolios, landing pages, events, and launching a clean online presence quickly.",
    features: [
      "Single-page responsive design",
      "Modern UI/UX structure",
      "Contact & enquiry forms",
      "WhatsApp & social links",
      "SSL config & basic training",
      "Google Maps integration",
      "Basic SEO setup",
      "Post-launch support guidance",
    ],
    highlighted: false,
  },
  {
    tier: "Business Website",
    icon: Globe,
    price: "₹35,000 – ₹50,000",
    priceNote: "Up to 5 Pages",
    description: "Perfect for academies, fitness centers, schools, restaurants, startups, and service businesses.",
    features: [
      "Up to 5 custom designed pages",
      "Responsive layout for all devices",
      "Lead generation & contact forms",
      "WhatsApp chat integration",
      "Google Maps local embedding",
      "Basic SEO optimization & SSL",
      "Standard business workflows",
      "Post-launch training & handoff",
    ],
    highlighted: true,
    badge: "Recommended",
  },
  {
    tier: "Professional Website",
    icon: Sparkles,
    price: "₹60,000 – ₹1,00,000+",
    priceNote: "Bespoke Features",
    description: "Designed for businesses requiring premium design, advanced features, bookings, and custom integrations.",
    features: [
      "Premium custom design system",
      "Advanced custom features",
      "Booking & scheduling systems",
      "Integrated galleries & custom blogs",
      "Payment gateway integration",
      "Advanced SEO setup & analytics",
      "Extended post-launch support",
      "Complete admin dashboard access",
    ],
    highlighted: false,
  },
  {
    tier: "Custom Web App",
    icon: Code2,
    price: "Custom",
    priceNote: "Starts from ₹50,000",
    description: "Bespoke web applications, portals, dashboards, SaaS platforms, and enterprise solutions.",
    features: [
      "Bespoke scope & UX design",
      "Custom business logic & workflows",
      "Third-party API integrations",
      "Interactive portals & dashboards",
      "Robust database & backend services",
      "High performance & scaling",
      "Dedicated roadmap & documentation",
      "Custom premium support SLA",
    ],
    highlighted: false,
  },
];

const globalFeatures = [
  {
    icon: Smartphone,
    title: "Responsive Design",
    description: "Optimized layouts that scale beautifully across mobile, tablet, and desktop screens.",
  },
  {
    icon: Globe,
    title: "Modern UI/UX",
    description: "Conversion-focused layouts crafted with a clean, modern aesthetic.",
  },
  {
    icon: Search,
    title: "Basic SEO Setup",
    description: "Structured code and tags following Google's search visibility guidelines.",
  },
  {
    icon: Mail,
    title: "Enquiry Forms",
    description: "Direct form submissions routed to your business inbox immediately.",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp Integration",
    description: "Let prospects connect with you instantly through direct WhatsApp click-to-chat links.",
  },
  {
    icon: Share2,
    title: "Social Media Links",
    description: "Linked profiles to drive engagement across all your digital channels.",
  },
  {
    icon: MapPin,
    title: "Google Maps Setup",
    description: "Embedded local maps to guide clients directly to your physical locations.",
  },
  {
    icon: Lock,
    title: "SSL Setup Support",
    description: "Configuring security certificates so your website loads as trusted and secure.",
  },
  {
    icon: BookOpen,
    title: "Post-Launch Training",
    description: "Clear instructions and training so you can manage your website content independently.",
  },
];

export default function PricingPage() {
  return (
    <SectionWrapper className="pt-8 sm:pt-12 lg:pt-16 pb-16 sm:pb-20 lg:pb-24">
      <Container>
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400 mb-3">
            Pricing
          </p>
          <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-zinc-900 dark:text-zinc-50 leading-[1.1] mb-4">
            Simple, Transparent <span className="gradient-text">Pricing</span>
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
            Invest in a high-performing digital asset. No hidden costs. Choose a plan and launch your online presence with confidence.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch mb-20 sm:mb-24">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.tier}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: i * 0.08,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -4 }}
              className={cn(
                "group relative flex flex-col bg-white dark:bg-zinc-900 border rounded-2xl p-6 sm:p-7 transition-all duration-300 hover:shadow-xl",
                plan.highlighted
                  ? "border-violet-500 hover:shadow-violet-500/10 ring-1 ring-violet-500/30"
                  : "border-zinc-200 dark:border-zinc-800 hover:border-violet-400/50 dark:hover:border-violet-500/50 hover:shadow-violet-500/5"
              )}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-4">
                  <span className="px-2.5 py-0.5 text-[10px] font-bold tracking-widest uppercase bg-violet-600 text-white rounded-full">
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Title & Icon */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-display font-bold text-lg text-zinc-900 dark:text-zinc-50">
                    {plan.tier}
                  </h3>
                  <p className="text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-semibold mt-0.5">
                    {plan.priceNote}
                  </p>
                </div>
                <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 text-violet-600 dark:text-violet-400 group-hover:bg-violet-600 group-hover:text-white transition-colors duration-300">
                  <plan.icon size={18} />
                </div>
              </div>

              {/* Price */}
              <div className="mb-4">
                <span className="font-display font-bold text-2xl sm:text-3xl text-zinc-900 dark:text-zinc-50 leading-none">
                  {plan.price}
                </span>
                {plan.price !== "Custom" && (
                  <span className="text-xs text-zinc-400 dark:text-zinc-50 ml-1">
                    /project
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6">
                {plan.description}
              </p>

              {/* Divider */}
              <div className="h-px bg-zinc-100 dark:bg-zinc-800 w-full mb-6" />

              {/* Features List */}
              <ul className="flex flex-col gap-3 flex-1 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-xs sm:text-sm">
                    <span className="w-4 h-4 rounded-full bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={10} className="stroke-[3]" />
                    </span>
                    <span className="text-zinc-600 dark:text-zinc-300 text-xs sm:text-sm leading-relaxed">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Link
                href={`/order?plan=${encodeURIComponent(plan.tier)}&price=${encodeURIComponent(plan.price)}`}
                className={cn(
                  "w-full py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all duration-300",
                  plan.highlighted
                    ? "gradient-bg text-white hover:opacity-90 shadow-lg shadow-violet-500/20"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 hover:bg-violet-600 hover:text-white dark:hover:bg-violet-600"
                )}
              >
                Choose This
                <ArrowRight size={14} />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Global Features Section */}
        <div className="border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 lg:p-10 mb-12 bg-white dark:bg-zinc-900/30">
          <h2 className="font-display font-semibold text-xl sm:text-2xl text-zinc-900 dark:text-zinc-50 mb-8 text-center leading-[1.2]">
            All Packages Include As Standard
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {globalFeatures.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="flex gap-4"
              >
                <div className="w-9 h-9 rounded-xl bg-zinc-50 dark:bg-zinc-800 text-violet-600 dark:text-violet-400 flex items-center justify-center flex-shrink-0">
                  <feature.icon size={16} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-50 mb-1 leading-snug">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="border-t border-zinc-100 dark:border-zinc-800/80 mt-8 pt-6 text-center">
            <p className="text-[10px] sm:text-xs text-zinc-400 dark:text-zinc-500">
              Note: The final quote is provided upon confirmation of detailed project scope and design specifications.
            </p>
          </div>
        </div>

        {/* FAQ note */}
        <p className="text-center text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
          Need a fully custom build or have questions?{" "}
          <Link
            href="/contact"
            className="text-violet-600 dark:text-violet-400 hover:underline font-semibold"
          >
            Let&apos;s talk about your project →
          </Link>
        </p>
      </Container>
    </SectionWrapper>
  );
}
