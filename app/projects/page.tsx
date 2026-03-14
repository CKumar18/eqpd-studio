import type { Metadata } from "next";
import SectionWrapper from "@/components/ui/SectionWrapper";
import ProjectCard from "@/components/ui/ProjectCard";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore EQPD Studio's portfolio — modern websites, SaaS dashboards, e-commerce stores, and more.",
};

const allProjects = [
  {
    title: "Nike Website Clone",
    description:
      "A pixel-perfect Nike landing page replica with smooth product showcases, animated transitions, and a complete modern e-commerce layout.",
    techStack: ["Next.js", "TailwindCSS", "Framer Motion"],
    projectLink: "#",
    imageUrl:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    category: "E-Commerce",
  },
  {
    title: "Apple Landing Page",
    description:
      "An immersive product landing page inspired by Apple's design philosophy with scroll-triggered animations and ultra-minimal aesthetics.",
    techStack: ["React", "GSAP", "CSS Modules"],
    projectLink: "#",
    imageUrl:
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80",
    category: "Landing Page",
  },
  {
    title: "SaaS Dashboard UI",
    description:
      "A comprehensive analytics dashboard with real-time charts, dark mode, role-based access, and responsive data visualization tables.",
    techStack: ["Next.js", "TypeScript", "Recharts", "Shadcn UI"],
    projectLink: "#",
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    category: "SaaS",
  },
  {
    title: "Portfolio Websites",
    description:
      "Custom portfolio websites for creatives, developers, and designers — featuring scroll animations, project showcases, and contact forms.",
    techStack: ["Next.js", "TailwindCSS", "Framer Motion"],
    projectLink: "#",
    imageUrl:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80",
    category: "Portfolio",
  },
  {
    title: "Agency Websites",
    description:
      "Premium agency website with bold typography, gradient sections, service showcases, team intro, and a high-converting contact flow.",
    techStack: ["Next.js", "TypeScript", "TailwindCSS"],
    projectLink: "#",
    imageUrl:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    category: "Agency",
  },
];

export default function ProjectsPage() {
  return (
    <SectionWrapper className="pt-8 sm:pt-12 lg:pt-16 pb-16 sm:pb-20 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-10 sm:mb-14 lg:mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-500 mb-3 sm:mb-4">
            Our Portfolio
          </p>
          <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-zinc-900 dark:text-zinc-50 leading-[1.1] mb-3 sm:mb-4">
            Projects We&apos;re{" "}
            <span className="gradient-text">Proud Of</span>
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-base sm:text-lg leading-relaxed">
            From e-commerce clones to SaaS dashboards — a curated selection of
            our best work, built with care and precision.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {allProjects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
