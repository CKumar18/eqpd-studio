import type { Metadata } from "next";
import SectionWrapper from "@/components/ui/SectionWrapper";
import PricingCard from "@/components/ui/PricingCard";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent, value-packed pricing for every stage of your business. Choose the EQPD Studio plan that fits your needs.",
};

const plans = [
  {
    tier: "Starter",
    price: "$999",
    description:
      "Perfect for small businesses and personal brands launching their first professional website.",
    features: [
      "Up to 5 pages",
      "Responsive design",
      "Basic animations",
      "Contact form",
      "SEO setup",
      "Vercel deployment",
      "1 revision round",
      "7-day delivery",
    ],
    highlighted: false,
  },
  {
    tier: "Professional",
    price: "$2,499",
    description:
      "For growing businesses that need a fully-featured, high-performance website with premium design.",
    features: [
      "Up to 12 pages",
      "Custom UI/UX design",
      "Framer Motion animations",
      "CMS integration",
      "Advanced SEO",
      "Analytics setup",
      "Blog / Portfolio",
      "3 revision rounds",
      "14-day delivery",
      "30-day post-launch support",
    ],
    highlighted: true,
    badge: "Most Popular",
  },
  {
    tier: "Premium",
    price: "Custom",
    description:
      "For brands that need a fully bespoke digital experience — custom functionality, integrations, and scale.",
    features: [
      "Unlimited pages",
      "Custom design system",
      "Bespoke interactions & animations",
      "E-commerce / SaaS features",
      "API & third-party integrations",
      "Performance optimization",
      "Custom CMS",
      "Unlimited revisions",
      "Priority 24h support",
      "Dedicated project manager",
    ],
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <SectionWrapper className="pt-8 sm:pt-12 lg:pt-16 pb-16 sm:pb-20 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 lg:mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-500 mb-3 sm:mb-4">
            Pricing Plans
          </p>
          <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-zinc-900 dark:text-zinc-50 leading-[1.1] mb-3 sm:mb-4">
            Simple, Transparent{" "}
            <span className="gradient-text">Pricing</span>
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-base sm:text-lg leading-relaxed">
            No hidden fees. No surprises. Choose the plan that fits your needs
            and we&apos;ll handle the rest.
          </p>
        </div>

        {/* Cards — stacked on mobile, row on large screens */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch">
          {plans.map((plan) => (
            <PricingCard key={plan.tier} {...plan} />
          ))}
        </div>

        {/* FAQ note */}
        <p className="text-center text-sm text-zinc-500 dark:text-zinc-400 mt-10 sm:mt-12">
          All prices are per project. Need something custom?{" "}
          <a
            href="/contact"
            className="text-brand-500 hover:underline font-medium"
          >
            Let&apos;s talk →
          </a>
        </p>
      </div>
    </SectionWrapper>
  );
}
