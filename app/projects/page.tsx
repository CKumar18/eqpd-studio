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
  {
    title: "Ready Set Go (NGO)",
    description:
      "A non-profit organization dedicated to uplifting and upskilling youth through art, community engagement, education, and creative workshop clubs.",
    techStack: ["Wix Studio", "UI/UX Design", "NGO Branding"],
    projectLink: "https://limitlessgreenzdev.wixstudio.com/readysetgo",
    imageUrl: "/images/projects/ready-set-go.jpg",
    category: "NGO & Community",
  },
  {
    title: "Bagh Beans",
    description:
      "A specialty coffee shop and art café concept combining premium brewing with a local art gallery, café menu, and BookMyShow-linked live events.",
    techStack: ["Wix Studio", "Art café Branding", "E-Commerce"],
    projectLink: "https://limitlessgreenzdev.wixstudio.com/baghbeans?rc=test-site",
    imageUrl: "/images/projects/bagh-beans.jpg",
    category: "Food & Creative Café",
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
