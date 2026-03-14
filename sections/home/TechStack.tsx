"use client";

import { motion } from "framer-motion";
import Container from "@/components/layout/Container";
import { Code2, Sparkles, Zap, Smartphone, Image as ImageIcon, Briefcase, FileText, Database, Globe, ShoppingBag, CreditCard, Layout, Terminal, Braces, Cloud, Search, BarChart } from "lucide-react";

// Using reliable CDN SVGs for official logos
const techGrid = [
  { name: "React", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
  { name: "Next.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg", invertInDark: true },
  { name: "Tailwind CSS", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Node.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
  { name: "TypeScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
  { name: "Framer", src: "https://cdn.simpleicons.org/framer/0055FF" },
  { name: "WordPress", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/wordpress/wordpress-plain.svg", invertInDark: true },
  { name: "VS Code", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" },
  { name: "Figma", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
  { name: "Shopify", src: "https://cdn.worldvectorlogo.com/logos/shopify.svg" },
  { name: "Stripe", src: "https://cdn.worldvectorlogo.com/logos/stripe-4.svg" },
  { name: "Vercel", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg", invertInDark: true },
  { name: "Github", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg", invertInDark: true },
  { name: "AWS", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", invertInDark: true },
  { name: "Supabase", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg" },
];

export default function TechStack() {
  // Duplicate array for seamless infinite marquee scrolling
  const marqueeItems = [...techGrid, ...techGrid];

  return (
    <section className="py-12 sm:py-20 lg:py-32 relative overflow-hidden bg-white dark:bg-zinc-950">
      <Container>
        <div className="text-center mb-10 sm:mb-16 max-w-2xl mx-auto space-y-4 pt-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex px-3 py-1 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-semibold tracking-wide uppercase"
          >
            Capabilities
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight px-4 sm:px-0"
          >
            Technologies We <span className="text-brand-500">Master</span>
          </motion.h2>
          <motion.p 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="text-zinc-500 dark:text-zinc-400 text-base sm:text-lg px-4 sm:px-0"
          >
            We leverage a modern and powerful tech stack to build scalable, high-performance digital solutions.
          </motion.p>
        </div>

        {/* Marquee Wrapper */}
        <div className="relative w-full max-w-full overflow-hidden flex inset-x-0 group py-4">
           
           {/* Left/Right Fade Masks for smooth entry/exit */}
           <div className="absolute inset-y-0 left-0 w-16 sm:w-40 bg-gradient-to-r from-white dark:from-zinc-950 to-transparent z-10 pointer-events-none" />
           <div className="absolute inset-y-0 right-0 w-16 sm:w-40 bg-gradient-to-l from-white dark:from-zinc-950 to-transparent z-10 pointer-events-none" />

           {/* The Scrolling Container */}
           <div className="flex w-max animate-marquee hover:[animation-play-state:paused] gap-4 sm:gap-8 px-4 will-change-transform">
              {marqueeItems.map((tech, idx) => (
                <div
                  key={`${tech.name}-${idx}`}
                  className="flex-shrink-0 w-[130px] sm:w-[160px] md:w-[180px] flex flex-col items-center justify-center p-4 sm:p-6 text-center rounded-2xl glass-panel relative transition-all duration-300 hover:-translate-y-3 hover:shadow-xl hover:shadow-brand-500/15 cursor-pointer"
                >
                  {/* Subtle hover background glow */}
                  <div className="absolute inset-0 bg-brand-500/0 hover:bg-brand-500/5 transition-colors duration-300 pointer-events-none" />
                  
                  {/* Fixed Aspect Ratio container for logos */}
                  <div className="w-14 h-14 sm:w-20 sm:h-20 mb-3 sm:mb-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/60 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-sm hover:scale-110 transition-transform duration-500 p-2 sm:p-4">
                    <img 
                      src={tech.src} 
                      alt={tech.name} 
                      className={`img-icon ${tech.invertInDark ? 'dark:invert' : ''}`}
                    />
                  </div>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100 text-xs sm:text-sm md:text-base hover:text-brand-500 transition-colors">
                    {tech.name}
                  </span>
                </div>
              ))}
           </div>
        </div>
      </Container>
    </section>
  );
}
