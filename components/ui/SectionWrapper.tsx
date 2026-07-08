import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  id?: string;
}

/**
 * Simple section wrapper — renders immediately without any animation.
 * Card-level animations (whileInView) inside each section handle the reveal effect.
 */
export default function SectionWrapper({
  children,
  className,
  delay: _delay,
  id,
}: SectionWrapperProps) {
  return (
    <section id={id} className={cn("relative", className)}>
      {children}
    </section>
  );
}
