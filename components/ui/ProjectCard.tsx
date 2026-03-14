"use client";

import { motion } from "framer-motion";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface ProjectCardProps {
  title: string;
  description: string;
  techStack: string[];
  projectLink: string;
  imageUrl: string;
  category: string;
}

export default function ProjectCard({
  title,
  description,
  techStack,
  projectLink,
  imageUrl,
  category,
}: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="group relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden hover:border-brand-500/40 hover:shadow-xl hover:shadow-brand-500/10 transition-all duration-300 hover-lift"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-video bg-zinc-100 dark:bg-zinc-800">
        <div
          className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 text-xs font-semibold bg-brand-600 dark:bg-brand-500/90 text-white rounded-full backdrop-blur-sm shadow-sm">
            {category}
          </span>
        </div>
        {/* Link icon */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
          <a
            href={projectLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 bg-zinc-900/20 dark:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-zinc-900/30 dark:hover:bg-white/30 transition-colors border border-white/20"
          >
            <ExternalLink size={14} />
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-display font-semibold text-zinc-900 dark:text-zinc-50 text-base leading-tight">
            {title}
          </h3>
          <motion.div
            whileHover={{ x: 2, y: -2 }}
            className="text-zinc-500 dark:text-zinc-400 group-hover:text-brand-500 transition-colors flex-shrink-0 mt-0.5"
          >
            <ArrowUpRight size={18} />
          </motion.div>
        </div>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4 leading-relaxed line-clamp-2">
          {description}
        </p>
        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 rounded-md border border-zinc-200 dark:border-zinc-800"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
