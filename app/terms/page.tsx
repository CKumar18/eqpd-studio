"use client";

import { motion } from "framer-motion";
import Container from "@/components/layout/Container";
import { ArrowRight } from "lucide-react";

const terms = [
  {
    title: "1. Acceptance of Terms",
    content: "By accessing or using EQPD Studio's services, you agree to comply with and be bound by these Terms of Service. These terms apply to all international and domestic clients.",
  },
  {
    title: "2. Intellectual Property",
    content: "Upon full and final payment, EQPD Studio assigns and transfers all rights, title, and interest in the final deliverables to the Client. We retain ownership of our proprietary tools and methodologies.",
  },
  {
    title: "3. Payment & Fees",
    content: "Fees are outlined in the Project Agreement. Late payments may incur interest. All payments are non-refundable unless otherwise explicitly stated in your contract.",
  },
  {
    title: "4. Limitation of Liability",
    content: "EQPD Studio shall not be liable for any indirect, incidental, or consequential damages. Our total liability is capped at the amount paid by the Client for the specific project.",
  },
  {
    title: "5. Governing Law",
    content: "These terms are governed by the laws of India. Any disputes shall be submitted to binding arbitration in accordance with the Arbitration and Conciliation Act, 1996.",
  },
];

export default function TermsPage() {
  return (
    <div className="pt-32 pb-20 bg-zinc-50 dark:bg-[#0a0a0c] min-h-screen">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="mb-16">
            <h1 className="text-4xl md:text-6xl font-bold font-outfit mb-6 bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-500 bg-clip-text text-transparent">
              Terms of Service
            </h1>
            <p className="text-zinc-500 dark:text-zinc-500 text-lg">
              Last Updated: March 14, 2026
            </p>
          </div>

          <div className="grid gap-8">
            {terms.map((term, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group p-8 rounded-3xl bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800/50 hover:border-brand-500/50 transition-all duration-300 shadow-sm"
              >
                <h2 className="text-xl font-bold font-outfit mb-4 text-zinc-900 dark:text-white flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-brand-500/10 text-brand-500 flex items-center justify-center text-sm">
                    {idx + 1}
                  </span>
                  {term.title}
                </h2>
                <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {term.content}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 p-10 rounded-[2.5rem] bg-gradient-to-br from-brand-500 to-purple-600 text-white overflow-hidden relative group">
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4">Have questions about our terms?</h3>
              <p className="text-white/80 mb-8 max-w-lg text-lg">
                We believe in transparent and fair business practices. If you need clarification on any point, our team is ready to help.
              </p>
              <a 
                href="/contact" 
                className="inline-flex items-center gap-2 py-4 px-8 bg-white text-zinc-900 rounded-full font-semibold hover:bg-zinc-100 transition-colors"
              >
                Contact Support <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
