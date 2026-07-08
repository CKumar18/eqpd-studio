"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import HeroVisual from "@/components/3d/HeroVisual";
import Container from "@/components/layout/Container";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const words = ["Websites.", "Brands.", "Experiences."];

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-3.5rem)] sm:min-h-[calc(100vh-4rem)] flex items-center overflow-hidden py-8 sm:py-16">
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10 bg-white dark:bg-zinc-950">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-brand-500/20 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-indigo-500/15 blur-3xl animate-pulse [animation-delay:1s]" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(var(--border-c) 1px, transparent 1px), linear-gradient(90deg, var(--border-c) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <Container className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center z-10">
        {/* Left Side: Text Content */}
        <div className="text-left space-y-8 w-full max-w-2xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-brand-500 text-xs sm:text-sm font-semibold shadow-sm"
          >
            <Sparkles size={14} className="animate-pulse" />
            Premium Digital Web Agency
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.05] tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            We Build
            <br />
            <span className="gradient-text">Digital</span>
            <br />
            <WordCycler words={words} />
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-zinc-500 dark:text-zinc-400 text-base sm:text-lg lg:text-xl leading-relaxed max-w-xl"
          >
            Built to Equip Your Brand Online. EQPD Studio crafts modern, fast,
            and beautiful websites that connect. From design to deployment.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="flex flex-col sm:flex-row items-center gap-4 pt-2"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white rounded-xl gradient-bg hover:opacity-90 shadow-xl shadow-brand-500/20 hover:shadow-brand-500/40 transition-all duration-300 w-full sm:w-auto justify-center"
            >
              Start Your Project
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1.5 transition-transform"
              />
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-zinc-900 dark:text-zinc-50 rounded-xl glass-panel hover:bg-zinc-50 dark:hover:bg-zinc-800/80 transition-all duration-300 w-full sm:w-auto justify-center"
            >
              View Our Work
            </Link>
          </motion.div>

          {/* Setup stats under text later using the new component */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-wrap items-center gap-8 pt-6 border-t border-zinc-200 dark:border-zinc-800/50 max-w-xl"
          >
            <div className="flex -space-x-3">
               <div className="w-10 h-10 rounded-full border-2 border-white dark:border-zinc-950 bg-brand-100 dark:bg-brand-900 flex items-center justify-center text-xs font-bold text-brand-600 dark:text-brand-400">EQ</div>
               <div className="w-10 h-10 rounded-full border-2 border-white dark:border-zinc-950 bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-xs font-bold text-indigo-600 dark:text-indigo-400">PD</div>
               <div className="w-10 h-10 rounded-full border-2 border-white dark:border-zinc-950 bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-xs font-bold text-blue-600 dark:text-blue-400">...</div>
            </div>
            <div>
               <p className="font-semibold text-zinc-900 dark:text-white text-sm">Trusted by <span className="text-brand-500 font-bold"><AnimatedCounter value={50} suffix="+" /></span> clients</p>
               <p className="text-zinc-500 dark:text-zinc-400 text-xs mt-0.5">Startups, Agencies & Brands</p>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Visual */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative w-full h-[480px] sm:h-[520px] lg:h-[580px]"
        >
          <HeroVisual />
        </motion.div>
      </Container>
    </section>
  );
}

function WordCycler({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [words.length]);

  if (!mounted) {
    return <span className="gradient-text">{words[0]}</span>;
  }

  return (
    <span className="inline-block overflow-hidden align-bottom h-[1.1em]">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -32 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block gradient-text"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
