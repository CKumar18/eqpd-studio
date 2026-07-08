"use client";

import Link from "next/link";
import { Mail, ArrowUpRight, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
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
  ],
};

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden bg-zinc-50 dark:bg-[#060608] pt-24 pb-12 border-t border-zinc-200 dark:border-zinc-800/40">
      {/* Editorial Watermark Background */}
      <div className="absolute bottom-16 left-0 right-0 pointer-events-none select-none overflow-hidden">
        <h2 className="text-[12vw] font-display font-black text-center text-zinc-900/[0.02] dark:text-white/[0.01] leading-none tracking-widest uppercase">
          EQPD Studio
        </h2>
      </div>

      <Container className="relative z-10">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8 mb-20">
          {/* Logo & Description */}
          <div className="lg:col-span-2 flex flex-col items-start">
            <Link href="/" className="inline-block hover:opacity-80 transition-opacity mb-6">
              <div className="relative flex items-center max-w-[170px] sm:max-w-[200px]">
                <img 
                  src="/assets/logo/horizontal/logo-purple.png" 
                  alt="EQPD Studio Brand Logo" 
                  className="h-7.5 sm:h-9 w-auto max-w-full object-contain" 
                />
              </div>
            </Link>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed max-w-sm mb-6">
              We craft design-centric, high-performance web experiences that equip modern brands to grow, stand out, and scale with digital excellence.
            </p>
            
            {/* Minimal Contact info */}
            <a 
              href="mailto:eqpd.studio@gmail.com" 
              className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-50 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
            >
              <Mail size={14} className="text-violet-500" />
              eqpd.studio@gmail.com
            </a>
          </div>

          {/* Links Column: Pages */}
          <div className="lg:col-span-1">
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-5">
              Navigation
            </h3>
            <ul className="space-y-3.5">
              {footerMenu.Pages.map((item) => (
                <li key={item.label}>
                  <Link 
                    href={item.href} 
                    className="text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column: Services */}
          <div className="lg:col-span-1">
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-5">
              Services
            </h3>
            <ul className="space-y-3.5">
              {footerMenu.Services.map((item) => (
                <li key={item.label}>
                  <Link 
                    href={item.href} 
                    className="text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column: Connect */}
          <div className="lg:col-span-1">
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-5">
              Connect
            </h3>
            <ul className="space-y-3.5">
              {footerMenu.Connect.map((item) => (
                <li key={item.label}>
                  <a 
                    href={item.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="group inline-flex items-center gap-1 text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                  >
                    {item.label}
                    <ArrowUpRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity text-violet-500" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Clean Subscription Block */}
          <div className="lg:col-span-1 min-w-[200px]">
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-5">
              Keep in Touch
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4 leading-relaxed">
              Stay updated with our latest design releases and case studies.
            </p>
            <form 
              onSubmit={(e) => e.preventDefault()} 
              className="flex border-b border-zinc-200 dark:border-zinc-800 focus-within:border-violet-500 transition-colors pb-1.5"
            >
              <input 
                type="email" 
                placeholder="Email address"
                required
                className="w-full text-xs bg-transparent text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none pr-2"
              />
              <button 
                type="submit" 
                aria-label="Subscribe"
                className="text-zinc-400 hover:text-violet-500 dark:hover:text-violet-400 transition-colors"
              >
                <ArrowRight size={14} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-zinc-200 dark:border-zinc-800/50 text-xs text-zinc-400 dark:text-zinc-500">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 order-2 sm:order-1 mt-4 sm:mt-0 text-center sm:text-left">
            <p>© {new Date().getFullYear()} EQPD Studio. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors">Terms</Link>
            </div>
          </div>
          
          <button 
            onClick={scrollToTop}
            type="button" 
            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors order-1 sm:order-2"
          >
            Back to Top
          </button>
        </div>
      </Container>
    </footer>
  );
}
