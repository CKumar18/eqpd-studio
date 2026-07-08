"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import ProjectCard from "@/components/ui/ProjectCard";
import Button from "@/components/ui/Button";
import Container from "@/components/layout/Container";

const featuredProjects = [
  {
    title: "EQPD Studio",
    description:
      "Our own design-led web development studio, crafting premium custom Next.js websites, branding packages, and high-performance interfaces.",
    techStack: ["Next.js", "TypeScript", "TailwindCSS", "Framer Motion"],
    projectLink: "https://eqpd-studio.vercel.app/",
    imageUrl: "/images/projects/eqpd-studio.jpg",
    category: "Agency Website",
  },
  {
    title: "Limitless Greenz",
    description:
      "A creative marketing and production agency focused on sustainability, selling eco-friendly organic merchandise while providing premium branding and design services.",
    techStack: ["Wix", "Creative Design", "Branding", "Marketing"],
    projectLink: "https://www.limitlessgreenz.com",
    imageUrl: "/images/projects/limitless-greenz.jpg",
    category: "Marketing & Creative",
  },
  {
    title: "Rush Fitness Arena",
    description:
      "A premium fitness center offering customizable memberships, class-based rhythmic exercises, and specialized 90-day body transformation programs.",
    techStack: ["Wix", "Web Design", "Business Management"],
    projectLink: "https://www.rushfitnessarena.in",
    imageUrl: "/images/projects/rush-fitness.jpg",
    category: "Fitness & Wellness",
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
