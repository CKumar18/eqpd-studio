"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ChevronUp, ArrowUpRight, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/layout/Container";

const footerMenu = {
  Pages: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Process", href: "/process" },
    { label: "Pricing", href: "/pricing" },
  ],
  Services: [
    { label: "Web Design", href: "/contact" },
    { label: "Development", href: "/contact" },
    { label: "UI/UX Design", href: "/contact" },
    { label: "eCommerce", href: "/contact" },
    { label: "Optimization", href: "/contact" },
  ],
  Connect: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/eqpd-studio/" },
    { label: "Instagram", href: "https://www.instagram.com/eqpd_studio/" },
    { label: "GitHub", href: "https://github.com/EQPD-Studio" },
    { label: "Twitter", href: "#" },
    { label: "Dribbble", href: "#" },
    { label: "Contact Us", href: "/contact" },
  ],
};

function DropdownMenu({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="flex items-center gap-2 text-base font-medium text-zinc-600 dark:text-zinc-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors py-3">
        {title}
        <ChevronUp className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-56 py-3 bg-white/95 dark:bg-zinc-900/90 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl shadow-black/10 dark:shadow-brand-500/10 origin-bottom z-50"
          >
            <div className="flex flex-col">
              {items.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="px-5 py-2.5 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors flex items-center justify-between group"
                >
                  {item.label}
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-brand-500" />
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-zinc-50 dark:bg-[#0a0a0c] pt-20 pb-10 border-t border-zinc-200 dark:border-zinc-800/50">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          <div className="lg:col-span-2 flex flex-col items-start">
            <Link href="/" className="inline-block hover:opacity-80 transition-opacity mb-6">
              <div className="relative flex items-center max-w-[140px] sm:max-w-[160px]">
                <img 
                  src="/assets/logo/horizontal/logo-purple.png" 
                  alt="EQPD Studio Brand Logo" 
                  className="h-6 sm:h-7 w-auto max-w-full object-contain" 
                />
              </div>
            </Link>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-md">
              We engineer digital excellence. Combining cutting-edge design with robust engineering to build web experiences that stand out and scale.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-zinc-900 dark:text-white mb-6 tracking-wide">Pages</h3>
            <ul className="space-y-4">
              {footerMenu.Pages.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-zinc-500 dark:text-zinc-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-zinc-900 dark:text-white mb-6 tracking-wide">Services</h3>
            <ul className="space-y-4">
              {footerMenu.Services.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-zinc-500 dark:text-zinc-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-zinc-900 dark:text-white mb-6 tracking-wide">Connect</h3>
            <ul className="space-y-4">
              {footerMenu.Connect.map((item) => (
                <li key={item.label}>
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors group">
                    {item.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-zinc-200 dark:border-zinc-800/50 text-sm text-zinc-500 dark:text-zinc-500">
          <p>© {new Date().getFullYear()} EQPD Studio. All rights reserved.</p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
