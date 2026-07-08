"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Container from "@/components/layout/Container";

const testimonials = [
  {
    quote:
      "EQPD Studio completely transformed our online presence. The website they built is blazing fast, beautiful, and has doubled our conversion rate.",
    name: "Sarah Chen",
    role: "CEO, Lumina Retail",
    avatar: "SC",
    rating: 5,
    color: "from-brand-500 to-violet-500",
  },
  {
    quote:
      "Working with EQPD was effortless. They understood our brand instantly and delivered a website that exceeded every expectation. Incredible team.",
    name: "Marcus Rodriguez",
    role: "Founder, Apex Ventures",
    avatar: "MR",
    rating: 5,
    color: "from-orange-500 to-pink-500",
  },
  {
    quote:
      "The attention to detail is unmatched. From micro-animations to mobile responsiveness — everything is polished and professional. 10/10.",
    name: "Aisha Patel",
    role: "Director, Bloom Creative",
    avatar: "AP",
    rating: 5,
    color: "from-cyan-500 to-blue-500",
  },
];

export default function Testimonials() {
  return (
    <SectionWrapper className="py-24 bg-zinc-100 dark:bg-zinc-800/30">
      <Container>
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-semibold uppercase tracking-widest text-brand-500 mb-3"
          >
            Client Reviews
          </motion.p>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-zinc-900 dark:text-zinc-50 mb-4">
            What Clients <span className="gradient-text">Say</span>
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
            We let our work speak for itself — but our clients have a few words
            to add.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 flex flex-col gap-5 hover:border-brand-500/30 hover:shadow-xl hover:shadow-brand-500/10 transition-all duration-300"
            >
              {/* Quote icon */}
              <div className="flex items-center justify-between">
                <Quote size={28} className="text-brand-500/40" />
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star
                      key={j}
                      size={13}
                      className="fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
              </div>

              {/* Quote text */}
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed italic flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-zinc-200 dark:border-zinc-800">
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="font-display font-semibold text-sm text-zinc-900 dark:text-zinc-50">
                    {t.name}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {t.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}
