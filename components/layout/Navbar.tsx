"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/process", label: "Process" },
  { href: "/pricing", label: "Pricing" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      {/* ── Floating Pill Navbar ── */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-4 left-1/2 -translate-x-1/2 z-50",
          "w-[calc(100%-2rem)] max-w-4xl",
          "transition-all duration-500"
        )}
      >
        {/* Gradient glow ring (shows on scroll) */}
        <motion.div
          aria-hidden
          animate={{ opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="absolute -inset-px rounded-2xl pointer-events-none"
          style={{
            background: "linear-gradient(135deg, rgba(124,58,237,0.45), rgba(79,70,229,0.3), rgba(37,99,235,0.2))",
            filter: "blur(1px)",
          }}
        />

        <div
          className={cn(
            "relative rounded-2xl px-4 sm:px-5 transition-all duration-500",
            scrolled || isOpen
              ? "bg-white/85 dark:bg-zinc-950/80 backdrop-blur-2xl border border-zinc-200/50 dark:border-white/8 shadow-xl shadow-black/5 dark:shadow-black/40"
              : "bg-white/75 dark:bg-zinc-950/50 backdrop-blur-lg border border-zinc-200/40 dark:border-white/5 shadow-sm"
          )}
        >
          <nav className="flex items-center justify-between h-14 sm:h-16">

            {/* ── Logo ── */}
            <Link href="/" className="flex items-center flex-shrink-0 group">
              <motion.div
                whileHover={{ scale: 1.04 }}
                transition={{ type: "spring", stiffness: 500, damping: 20 }}
                className="relative flex items-center max-w-[140px] sm:max-w-[160px]"
              >
                {/* Dark-mode logo */}
                <img
                  src="/assets/logo/dark-logo.png"
                  alt="EQPD Studio"
                  className="hidden dark:block h-6 sm:h-7 w-auto max-w-full object-contain"
                />
                {/* Light-mode logo */}
                <img
                  src="/assets/logo/light-logo.png"
                  alt="EQPD Studio"
                  className="block dark:hidden h-6 sm:h-7 w-auto max-w-full object-contain"
                />
              </motion.div>
            </Link>

            {/* ── Desktop Nav Links ── */}
            <div className="hidden md:flex flex-1 justify-center items-center gap-0.5 lg:gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative px-4 py-2 text-sm font-medium rounded-xl transition-colors duration-200 group",
                      isActive
                        ? "text-brand-600 dark:text-brand-400"
                        : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                    )}
                  >
                    {/* Active background pill */}
                    <span
                      className={cn(
                        "absolute inset-0 rounded-xl transition-all duration-300",
                        isActive
                          ? "bg-brand-500/10 dark:bg-brand-400/10 opacity-100"
                          : "opacity-0 bg-zinc-100 dark:bg-zinc-800/60 group-hover:opacity-100"
                      )}
                    />

                    <motion.span
                      className="relative z-10 flex items-center gap-0.5"
                      whileHover={{ y: -1 }}
                      transition={{ type: "spring", stiffness: 600, damping: 25 }}
                    >
                      {link.label}
                    </motion.span>

                    {/* Active bottom bar — CSS transition, no layoutId */}
                    <span
                      className={cn(
                        "absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-brand-500 dark:bg-brand-400 transition-all duration-300",
                        isActive ? "w-4 opacity-100" : "w-0 opacity-0"
                      )}
                    />
                  </Link>
                );
              })}
            </div>

            {/* ── Right: Theme Toggle + CTA + Hamburger ── */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <ThemeToggle />

              {/* CTA Button — glowing gradient */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 500, damping: 20 }}
                className="hidden md:block"
              >
                <Link
                  href="/contact"
                  className="nav-cta-glow inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white rounded-xl gradient-bg shadow-md whitespace-nowrap"
                >
                  Get in touch
                  <ArrowUpRight size={14} className="opacity-80" />
                </Link>
              </motion.div>

              {/* Mobile hamburger */}
              <motion.button
                id="mobile-menu-btn"
                onClick={() => setIsOpen(!isOpen)}
                whileTap={{ scale: 0.9 }}
                className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-700/60 bg-white/80 dark:bg-zinc-900/60 backdrop-blur-md text-zinc-700 dark:text-zinc-200"
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={isOpen ? "x" : "menu"}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center justify-center"
                  >
                    {isOpen ? <X size={18} /> : <Menu size={18} />}
                  </motion.span>
                </AnimatePresence>
              </motion.button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* ── Full-Screen Mobile Menu Overlay ── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              key="mobile-menu"
              id="mobile-menu"
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "fixed top-24 left-4 right-4 z-50 md:hidden",
                "rounded-2xl border border-white/20 dark:border-white/8",
                "bg-white/90 dark:bg-zinc-950/95 backdrop-blur-2xl shadow-2xl shadow-black/10 dark:shadow-black/60",
                "overflow-hidden"
              )}
            >
              {/* Nav links */}
              <div className="px-4 pt-5 pb-3 flex flex-col gap-1">
                {navLinks.map((link, i) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.25, ease: "easeOut" }}
                    >
                      <Link
                        href={link.href}
                        className={cn(
                          "flex items-center justify-between px-4 py-3.5 text-base font-medium rounded-xl transition-all duration-200",
                          isActive
                            ? "bg-brand-500/10 dark:bg-brand-400/10 text-brand-600 dark:text-brand-400"
                            : "text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/70 hover:text-zinc-900 dark:hover:text-white"
                        )}
                      >
                        <span>{link.label}</span>
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-500 dark:bg-brand-400" />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Divider */}
              <div className="mx-4 border-t border-zinc-100 dark:border-zinc-800" />

              {/* CTA row */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05 + 0.05, duration: 0.25 }}
                className="px-4 py-4"
              >
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3.5 text-sm font-semibold text-white rounded-xl gradient-bg shadow-md"
                >
                  Get in touch
                  <ArrowUpRight size={15} />
                </Link>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
