"use client";

import { motion } from "framer-motion";
import { Search, Paintbrush, Code2, Rocket } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Container from "@/components/layout/Container";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Discovery",
    description:
      "We dive deep into understanding your brand, goals, target audience, and competitors. Every great project starts with listening.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    number: "02",
    icon: Paintbrush,
    title: "Design",
    description:
      "Our designers craft modern UI/UX systems — wireframes, prototypes, and pixel-perfect mockups aligned with your brand identity.",
    color: "from-brand-500 to-violet-500",
  },
  {
    number: "03",
    icon: Code2,
    title: "Development",
    description:
      "We build with cutting-edge technologies — Next.js, TypeScript, Tailwind — ensuring fast, accessible, and scalable websites.",
    color: "from-orange-500 to-pink-500",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Launch",
    description:
      "After rigorous testing, we deploy your site on Vercel with optimized performance, analytics, and ongoing support.",
    color: "from-green-500 to-emerald-500",
  },
];

export default function WorkflowProcess() {
  return (
    <SectionWrapper className="py-24">
      <Container>
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-semibold uppercase tracking-widest text-brand-500 mb-3"
          >
            How We Work
          </motion.p>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-zinc-900 dark:text-zinc-50 mb-4">
            Our <span className="gradient-text">Process</span>
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
            A proven four-step workflow that transforms your vision into a
            stunning, high-performing digital product.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-brand-500/30 to-transparent" />

          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col items-center text-center p-6 group"
            >
              {/* Number */}
              <div className="relative mb-5 z-10">
                <div
                  className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${step.color} flex flex-col items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <step.icon size={28} className="text-white mb-1" />
                  <span className="text-white/70 text-xs font-bold">
                    {step.number}
                  </span>
                </div>
              </div>
              <h3 className="font-display font-bold text-lg text-zinc-900 dark:text-zinc-50 mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}
