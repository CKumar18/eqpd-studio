import type { Metadata } from "next";
import SectionWrapper from "@/components/ui/SectionWrapper";
import CallToAction from "@/sections/home/CallToAction";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about EQPD Studio — our mission, values, and the team behind premium digital experiences.",
};

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "30+", label: "Happy Clients" },
  { value: "3+", label: "Years Experience" },
  { value: "98%", label: "Satisfaction Rate" },
];

const values = [
  {
    title: "Quality First",
    description:
      "Every pixel and line of code is crafted with precision. We never ship something we wouldn't be proud to show.",
    icon: "◆",
  },
  {
    title: "Client-Centric",
    description:
      "Your vision is our blueprint. We collaborate closely to ensure the final product exceeds every expectation.",
    icon: "◉",
  },
  {
    title: "Innovation Driven",
    description:
      "We stay ahead of trends, using the latest tech and design to keep your brand future-ready.",
    icon: "✦",
  },
  {
    title: "Results Focused",
    description:
      "Beautiful design means nothing without results. Every decision optimizes for conversion and growth.",
    icon: "▲",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <SectionWrapper className="pt-8 sm:pt-12 lg:pt-16 pb-12 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-500 mb-3 sm:mb-4">
              About EQPD Studio
            </p>
            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-zinc-900 dark:text-zinc-50 leading-[1.1] mb-4 sm:mb-6">
              We Equip Brands to{" "}
              <span className="gradient-text">Thrive Online</span>
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 text-base sm:text-lg lg:text-xl leading-relaxed">
              EQPD Studio is a premium digital web agency dedicated to crafting
              modern, fast, and beautiful websites that help businesses grow.
              We combine stunning design with powerful technology to deliver
              digital experiences that convert.
            </p>
          </div>
        </div>
      </SectionWrapper>

      {/* Stats */}
      <SectionWrapper
        className="py-10 sm:py-12 border-y border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800/40"
        delay={0.1}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl gradient-text mb-1 sm:mb-2 flex justify-center">
                  <AnimatedCounter 
                    value={parseInt(stat.value)} 
                    suffix={stat.value.includes('+') ? '+' : stat.value.includes('%') ? '%' : ''} 
                  />
                </p>
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-tight">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Mission */}
      <SectionWrapper className="py-16 sm:py-20 lg:py-24" delay={0.1}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-500 mb-3 sm:mb-4">
                Our Mission
              </p>
              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-zinc-900 dark:text-zinc-50 mb-5 sm:mb-6 leading-[1.1]">
                Built to Equip Your
                <span className="gradient-text"> Brand Online</span>
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4 text-sm sm:text-base">
                At EQPD Studio, we believe every brand deserves a powerful
                digital presence. Our mission is to bridge the gap between great
                ideas and exceptional execution — from concept to launch.
              </p>
              <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed text-sm sm:text-base">
                We&apos;re a dedicated team of designers and developers who work
                with purpose: to build websites that don&apos;t just look great,
                but actually drive business growth and create memorable
                user experiences.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 hover:border-brand-500/40 transition-colors"
                >
                  <span className="text-xl sm:text-2xl text-brand-500 font-bold block mb-3">
                    {value.icon}
                  </span>
                  <h3 className="font-display font-semibold text-zinc-900 dark:text-zinc-50 mb-1.5 text-sm sm:text-base">
                    {value.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>

      <CallToAction />
    </>
  );
}
