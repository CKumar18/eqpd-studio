"use client";

import { motion } from "framer-motion";
import {
  Palette,
  Code2,
  ShoppingCart,
  Search,
  Megaphone,
  Layers,
} from "lucide-react";
import Container from "@/components/layout/Container";

const services = [
  {
    icon: Palette,
    title: "UI/UX Design",
    description:
      "Intuitive, beautiful interfaces that users love — from wireframes to pixel-perfect designs.",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: Code2,
    title: "Web Development",
    description:
      "Fast, scalable websites built with cutting-edge tech like Next.js, React, and TypeScript.",
    color: "from-violet-600 to-purple-500",
  },
  {
    icon: ShoppingCart,
    title: "eCommerce",
    description:
      "Complete e-commerce solutions with seamless checkout, inventory, and payment integration.",
    color: "from-orange-500 to-amber-500",
  },
  {
    icon: Search,
    title: "SEO Optimization",
    description:
      "Data-driven SEO strategies to boost visibility, drive organic traffic, and grow your brand.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Megaphone,
    title: "Branding",
    description:
      "Build a cohesive brand identity — logo, colors, typography — that resonates with your audience.",
    color: "from-cyan-500 to-blue-500",
  },
  {
    icon: Layers,
    title: "Web Design",
    description:
      "Stunning landing pages and full websites designed to convert visitors into loyal customers.",
    color: "from-indigo-500 to-violet-600",
  },
];

export default function Services() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <Container>
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14 lg:mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400 mb-3">
            What We Do
          </p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-zinc-900 dark:text-zinc-50 mb-3 sm:mb-4 leading-[1.1]">
            Services That{" "}
            <span className="gradient-text">Drive Growth</span>
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            End-to-end digital solutions tailored to equip your brand for
            success in the competitive online landscape.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.08,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -4 }}
              className="group relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 sm:p-6 hover:border-violet-400 dark:hover:border-violet-500 hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-300 overflow-hidden hover-lift"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-violet-600" />

              <div
                className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 shadow-lg`}
              >
                <service.icon size={19} className="text-white" />
              </div>

              <h3 className="font-display font-semibold text-base sm:text-lg text-zinc-900 dark:text-zinc-50 mb-1.5 sm:mb-2">
                {service.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {service.description}
              </p>

              <div
                className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
