"use client";

import { useEffect, useState, useCallback } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

interface TransitionState {
  id: number;
  x: number;
  y: number;
  nextTheme: string;
  radius: number;
  bg: string;
}

const EVENT = "theme-transition-start";

export function dispatchThemeTransition(x: number, y: number, nextTheme: string) {
  const maxR =
    Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y)) + 20;
  const bg = nextTheme === "dark" ? "#09090b" : "#ffffff";
  window.dispatchEvent(
    new CustomEvent(EVENT, { detail: { x, y, nextTheme, radius: maxR, bg, id: Date.now() } })
  );
}

export default function ThemeTransition() {
  const { setTheme } = useTheme();
  const [state, setState] = useState<TransitionState | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      const d = (e as CustomEvent).detail as TransitionState;
      setState(d);
    };
    window.addEventListener(EVENT, handler);
    return () => window.removeEventListener(EVENT, handler);
  }, []);

  const onComplete = useCallback(() => {
    if (!state) return;
    // Theme switches while the overlay fully covers the screen (seamless)
    setTheme(state.nextTheme);
    // Brief hold so the new theme renders under the overlay, then snap away
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setState(null));
    });
  }, [state, setTheme]);

  return (
    <AnimatePresence>
      {state && (
        <motion.div
          key={state.id}
          aria-hidden
          className="fixed inset-0 pointer-events-none"
          style={{
            zIndex: 99999,
            backgroundColor: state.bg,
            clipPath: `circle(0px at ${state.x}px ${state.y}px)`,
          }}
          animate={{
            clipPath: `circle(${state.radius}px at ${state.x}px ${state.y}px)`,
          }}
          transition={{
            duration: 0.65,
            ease: [0.4, 0, 0.2, 1],
          }}
          onAnimationComplete={onComplete}
        />
      )}
    </AnimatePresence>
  );
}
