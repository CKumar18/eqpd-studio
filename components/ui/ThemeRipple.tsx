"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RippleEvent {
  x: number;
  y: number;
  id: number;
}

const EVENT_NAME = "theme-ripple";

export function dispatchThemeRipple(x: number, y: number) {
  window.dispatchEvent(
    new CustomEvent(EVENT_NAME, { detail: { x, y, id: Date.now() } })
  );
}

export default function ThemeRipple() {
  const [ripple, setRipple] = useState<RippleEvent | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as RippleEvent;
      setRipple(detail);
      // Clear after animation completes
      setTimeout(() => setRipple(null), 900);
    };
    window.addEventListener(EVENT_NAME, handler);
    return () => window.removeEventListener(EVENT_NAME, handler);
  }, []);

  if (!ripple) return null;

  const maxR = Math.hypot(
    Math.max(ripple.x, window.innerWidth - ripple.x),
    Math.max(ripple.y, window.innerHeight - ripple.y)
  );

  return (
    <AnimatePresence>
      <motion.div
        key={ripple.id}
        aria-hidden
        className="fixed inset-0 pointer-events-none z-[9990] overflow-hidden"
      >
        <motion.div
          className="absolute rounded-full"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 1,
            height: 1,
            marginLeft: 0,
            marginTop: 0,
            background: "radial-gradient(circle, rgba(124,58,237,0.35) 0%, rgba(79,70,229,0.18) 40%, transparent 70%)",
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: maxR * 2.4, opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{
            scale: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
            opacity: { duration: 0.85, ease: "easeIn", delay: 0.1 },
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
}
