"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Container from "@/components/layout/Container";

export default function CallToAction() {
  return (
    <SectionWrapper className="py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="relative rounded-2xl sm:rounded-3xl gradient-bg overflow-hidden py-14 sm:py-20 px-6 sm:px-12 lg:px-16 text-center noise">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-48 h-48 sm:w-72 sm:h-72 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-72 sm:h-72 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl pointer-events-none" />

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/15 rounded-full border border-white/25 text-white/90 text-xs font-semibold mb-5 sm:mb-6"
            >
              <Sparkles size={12} />
              Ready to Get Started?
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-white mb-4 sm:mb-5 leading-[1.1]"
            >
              Let&apos;s Build Something
              <br />
              <span className="text-white/80">Extraordinary Together</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-white/70 text-sm sm:text-base lg:text-lg max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed"
            >
              From concept to launch, EQPD Studio is your partner in crafting a
              digital presence that stands out and converts.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
            >
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold text-brand-500 bg-white rounded-xl hover:bg-white/90 shadow-2xl shadow-black/20 transition-all duration-200 w-full sm:w-auto"
              >
                Start Your Project
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold text-white bg-white/15 rounded-xl border border-white/25 hover:bg-white/25 transition-colors w-full sm:w-auto"
              >
                View Pricing
              </Link>
            </motion.div>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
