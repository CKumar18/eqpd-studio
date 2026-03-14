"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import ProjectCard from "@/components/ui/ProjectCard";
import Button from "@/components/ui/Button";
import Container from "@/components/layout/Container";

const featuredProjects = [
  {
    title: "Nike Website Clone",
    description:
      "A pixel-perfect Nike landing page replica with smooth product showcases, animated transitions, and a modern e-commerce layout.",
    techStack: ["Next.js", "TailwindCSS", "Framer Motion"],
    projectLink: "#",
    imageUrl:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    category: "E-Commerce",
  },
  {
    title: "Apple Landing Page",
    description:
      "An immersive product landing page inspired by Apple's design philosophy — scroll-triggered animations and minimal aesthetics.",
    techStack: ["React", "GSAP", "CSS Modules"],
    projectLink: "#",
    imageUrl:
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80",
    category: "Landing Page",
  },
  {
    title: "SaaS Dashboard UI",
    description:
      "A comprehensive analytics dashboard with real-time charts, dark mode, role-based access, and responsive data tables.",
    techStack: ["Next.js", "TypeScript", "Recharts", "Shadcn UI"],
    projectLink: "#",
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    category: "SaaS",
  },
];

export default function FeaturedProjects() {
  return (
    <SectionWrapper className="py-24 bg-zinc-100 dark:bg-zinc-800/30">
      <Container>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs font-semibold uppercase tracking-widest text-brand-500 mb-3"
            >
              Our Work
            </motion.p>
            <h2 className="font-display font-bold text-4xl sm:text-5xl text-zinc-900 dark:text-zinc-50">
              Featured <span className="gradient-text">Projects</span>
            </h2>
          </div>
          <Button href="/projects" variant="outline" arrow>
            View All Projects
          </Button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}
