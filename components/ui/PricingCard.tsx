"use client";

import { motion } from "framer-motion";
import { Check, Zap } from "lucide-react";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface PricingCardProps {
  tier: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
}

export default function PricingCard({
  tier,
  price,
  description,
  features,
  highlighted = false,
  badge,
}: PricingCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={cn(
        "relative rounded-2xl p-8 border flex flex-col gap-6 transition-all duration-300",
        highlighted
          ? "gradient-bg border-brand-400 shadow-2xl shadow-brand-500/30 text-white"
          : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-brand-500/40 hover:shadow-xl hover:shadow-brand-500/10"
      )}
    >
      {badge && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span
            className={cn(
              "px-4 py-1 text-xs font-bold rounded-full flex items-center gap-1",
              highlighted
                ? "bg-white text-brand-500"
                : "gradient-bg text-white"
            )}
          >
            <Zap size={11} />
            {badge}
          </span>
        </div>
      )}

      {/* Header */}
      <div>
        <p
          className={cn(
            "text-sm font-semibold mb-2 uppercase tracking-wider",
            highlighted ? "text-white/70" : "text-brand-500"
          )}
        >
          {tier}
        </p>
        <div className="flex items-end gap-1 mb-2">
          <span
            className={cn(
              "font-display font-bold text-4xl",
              highlighted ? "text-white" : "text-zinc-900 dark:text-zinc-50"
            )}
          >
            {price}
          </span>
          {price !== "Custom" && (
            <span
              className={cn(
                "text-sm font-medium mb-1",
                highlighted ? "text-white/60" : "text-zinc-500 dark:text-zinc-400"
              )}
            >
              /project
            </span>
          )}
        </div>
        <p
          className={cn(
            "text-sm leading-relaxed",
            highlighted ? "text-white/75" : "text-zinc-500 dark:text-zinc-400"
          )}
        >
          {description}
        </p>
      </div>

      {/* Features */}
      <ul className="flex flex-col gap-3 flex-1">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm">
            <span
              className={cn(
                "w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                highlighted
                  ? "bg-white/20"
                  : "bg-brand-500/15"
              )}
            >
              <Check
                size={11}
                className={highlighted ? "text-white" : "text-brand-500"}
              />
            </span>
            <span
              className={
                highlighted ? "text-white/85" : "text-zinc-500 dark:text-zinc-400"
              }
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Button
        href="/contact"
        variant={highlighted ? "ghost" : "primary"}
        className={cn(
          "justify-center w-full",
          highlighted &&
            "bg-white/15 text-white hover:bg-white/25 border border-white/20"
        )}
      >
        Get Started
      </Button>
    </motion.div>
  );
}
