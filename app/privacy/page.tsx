"use client";

import { motion } from "framer-motion";
import Container from "@/components/layout/Container";

const sections = [
  {
    title: "1. Information We Collect",
    content: (
      <>
        <p className="mb-4">We collect personal identification information, including but not limited to:</p>
        <ul className="list-disc pl-6 space-y-2 text-zinc-600 dark:text-zinc-400">
          <li>Name, Email address, and Phone number</li>
          <li>Company name and Business details</li>
          <li>IP address, browsing data, and device information</li>
        </ul>
      </>
    ),
  },
  {
    title: "2. How We Use Your Information",
    content: (
      <>
        <p className="mb-4">We use the collected data for:</p>
        <ul className="list-disc pl-6 space-y-2 text-zinc-600 dark:text-zinc-400">
          <li>Providing and maintaining our digital services.</li>
          <li>Communicating regarding projects, inquiries, or updates.</li>
          <li>Improving website performance and user experience.</li>
          <li>Legal and regulatory compliance.</li>
        </ul>
      </>
    ),
  },
  {
    title: "3. Compliance & Legal Basis",
    content: (
      <p className="text-zinc-600 dark:text-zinc-400">
        In accordance with the **Digital Personal Data Protection Act (DPDPA), 2023 (India)** and the **GDPR (EU)**, we process data based on your explicit consent, contractual necessity, or our legitimate business interests.
      </p>
    ),
  },
  {
    title: "4. International Data Transfers",
    content: (
      <p className="text-zinc-600 dark:text-zinc-400">
        As a global studio, we ensure that any cross-border data transfers comply with standard contractual clauses and provide the same level of protection as required by international privacy laws.
      </p>
    ),
  },
  {
    title: "5. Your Rights",
    content: (
      <ul className="list-disc pl-6 space-y-2 text-zinc-600 dark:text-zinc-400">
        <li><strong>Access:</strong> Request copies of your personal data.</li>
        <li><strong>Erasure:</strong> Request deletion of your data (Right to be Forgotten).</li>
        <li><strong>Portability:</strong> Request transfer of your data to another organization.</li>
        <li><strong>Correction:</strong> Request rectification of inaccurate information.</li>
      </ul>
    ),
  },
];

export default function PrivacyPage() {
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
              Privacy Policy
            </h1>
            <p className="text-zinc-500 dark:text-zinc-500 text-lg">
              Effective Date: March 14, 2026. Last Updated: March 14, 2026.
            </p>
          </div>

          <div className="space-y-12">
            <section className="prose prose-zinc dark:prose-invert max-w-none">
              <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed mb-12">
                Welcome to EQPD Studio. We value your privacy and are committed to protecting your personal data. This policy explains how we handle your information in compliance with Indian and International standards.
              </p>

              {sections.map((section, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="mb-12 border-b border-zinc-200 dark:border-zinc-800/50 pb-12 last:border-0"
                >
                  <h2 className="text-2xl font-semibold font-outfit mb-6 text-zinc-900 dark:text-white">
                    {section.title}
                  </h2>
                  <div className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {section.content}
                  </div>
                </motion.div>
              ))}
            </section>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="p-8 rounded-3xl bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 mt-20"
            >
              <h3 className="text-xl font-semibold mb-4 text-zinc-900 dark:text-white">Contact Our Legal Team</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                If you have any questions or concern regarding your data, please contact our grievance officer.
              </p>
              <a 
                href="mailto:eqpd.studio@gmail.com" 
                className="inline-flex items-center gap-2 text-brand-500 font-medium hover:underline"
              >
                eqpd.studio@gmail.com
              </a>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
