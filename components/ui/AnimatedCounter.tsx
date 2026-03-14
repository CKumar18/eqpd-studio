"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { useRef } from "react";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}

export default function AnimatedCounter({ 
  value, 
  duration = 2, 
  suffix = "", 
  prefix = "",
  decimals = 0 
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let startTimestamp: number;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      
      // easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setCount(easeProgress * value);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [value, duration, isInView]);

  return (
    <span ref={nodeRef} className="inline-block tabular-nums">
      {prefix}{count.toFixed(decimals)}{suffix}
    </span>
  );
}
