import type { Metadata } from "next";
import { Search, Paintbrush, Code2, Rocket } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import CallToAction from "@/sections/home/CallToAction";

export const metadata: Metadata = {
  title: "Process",
  description:
    "Discover EQPD Studio's 4-step workflow: Discovery, Design, Development, and Launch.",
};

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Discovery",
    subtitle: "Understanding Your World",
    description:
      "Every project starts with deep discovery. We analyze your brand identity, business goals, target audience, and competitive landscape. Through structured consultation we extract the insights needed to build a website that truly represents your brand.",
    deliverables: [
      "Brand questionnaire & consultation",
      "Competitor analysis",
      "User persona development",
      "Project scope & timeline",
    ],
    color: "from-blue-500 to-cyan-500",
    bg: "from-blue-500/10 to-cyan-500/10",
  },
  {
    number: "02",
    icon: Paintbrush,
    title: "Design",
    subtitle: "Crafting Your Visual Identity",
    description:
      "Our designers translate insights into stunning visual systems. We create wireframes, interactive prototypes, and high-fidelity mockups — all aligned with your brand's personality. Every design decision is intentional and conversion-optimized.",
    deliverables: [
      "Wireframes & sitemap",
      "UI style guide & design tokens",
      "Interactive Figma prototypes",
      "Mobile-first responsive layouts",
    ],
    color: "from-brand-500 to-violet-500",
    bg: "from-brand-500/10 to-violet-500/10",
  },
  {
    number: "03",
    icon: Code2,
    title: "Development",
    subtitle: "Engineering for Performance",
    description:
      "We build with Next.js, TypeScript, and TailwindCSS — ensuring your site is blazing fast, SEO-ready, and accessible. Smooth Framer Motion animations and best-in-class practices make your website feel premium on every device.",
    deliverables: [
      "Next.js App Router setup",
      "Responsive component library",
      "Framer Motion animations",
      "Performance & accessibility audit",
    ],
    color: "from-orange-500 to-pink-500",
    bg: "from-orange-500/10 to-pink-500/10",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Launch",
    subtitle: "Deploying Your Digital HQ",
    description:
      "After thorough QA, we deploy your site on Vercel with custom domain, SSL, analytics, and CDN optimization. Post-launch we monitor performance and make fine-tuning adjustments.",
    deliverables: [
      "Vercel deployment & CI/CD",
      "Domain & SSL configuration",
      "Google Analytics setup",
      "30-day post-launch support",
    ],
    color: "from-green-500 to-emerald-500",
    bg: "from-green-500/10 to-emerald-500/10",
  },
];

export default function ProcessPage() {
  return (
    <>
      <SectionWrapper className="pt-8 sm:pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-500 mb-3 sm:mb-4">
              How We Work
            </p>
            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-zinc-900 dark:text-zinc-50 leading-[1.1] mb-3 sm:mb-4">
              Our <span className="gradient-text">4-Step Process</span>
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 text-base sm:text-lg leading-relaxed">
              A transparent, structured workflow that delivers exceptional
              results — on time, every time.
            </p>
          </div>
        </div>
      </SectionWrapper>

      {/* Steps */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 lg:pb-24">
        <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6">
          {steps.map((step, i) => (
            <SectionWrapper key={step.title} delay={i * 0.05}>
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-br ${step.bg} hover:border-brand-500/30 transition-colors`}
              >
                {/* Left */}
                <div>
                  <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg flex-shrink-0`}
                    >
                      <step.icon size={22} className="text-white" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
                        Step {step.number}
                      </span>
                      <h2 className="font-display font-bold text-xl sm:text-2xl text-zinc-900 dark:text-zinc-50">
                        {step.title}
                      </h2>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-brand-500 mb-2 sm:mb-3">
                    {step.subtitle}
                  </p>
                  <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                {/* Right — deliverables */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-3 sm:mb-4">
                    Deliverables
                  </p>
                  <ul className="flex flex-col gap-2.5 sm:gap-3">
                    {step.deliverables.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-3 text-sm text-zinc-900 dark:text-zinc-50"
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${step.color} flex-shrink-0`}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </SectionWrapper>
          ))}
        </div>
      </div>

      <CallToAction />
    </>
  );
}
