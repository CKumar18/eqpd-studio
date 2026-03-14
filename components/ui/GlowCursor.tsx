"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

export default function GlowCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const [isHover, setIsHover] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { resolvedTheme } = useTheme();

  const orbPos = useRef({ x: -500, y: -500 });
  const mouse = useRef({ x: -500, y: -500 });
  const rafId = useRef<number>(0);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);

    const onOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a, button, [role='button'], input, textarea, select, label, p, h1, h2, h3, h4")) {
        const isInteractive = (e.target as HTMLElement).closest("a, button, [role='button'], input, textarea, select, label");
        setIsHover(Boolean(isInteractive));
      }
    };
    
    const onOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a, button, [role='button'], input, textarea, select, label")) {
        setIsHover(false);
      }
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    const loop = () => {
      const speed = 0.15; 
      orbPos.current.x += (mouse.current.x - orbPos.current.x) * speed;
      orbPos.current.y += (mouse.current.y - orbPos.current.y) * speed;
      
      if (orbRef.current) {
        orbRef.current.style.transform = `translate3d(${orbPos.current.x}px, ${orbPos.current.y}px, 0)`;
      }
      rafId.current = requestAnimationFrame(loop);
    };
    rafId.current = requestAnimationFrame(loop);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(rafId.current);
    };
  }, [isVisible]);

  // Sizes & Effects (Accessibility Lens)
  const orbSize = isHover ? 80 : 32;
  const dotSize = 8; 

  const isDark = resolvedTheme === "dark";

  return (
    <>
      {/* Blend Mode Orb */}
      <div
        ref={orbRef}
        aria-hidden
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full will-change-transform flex items-center justify-center mix-blend-difference"
        style={{
          width: orbSize,
          height: orbSize,
          marginLeft: -orbSize / 2,
          marginTop: -orbSize / 2,
          background: "white", // Must be white for perfect difference inversion
          transition: "width 0.4s cubic-bezier(0.16, 1, 0.3, 1), height 0.4s cubic-bezier(0.16, 1, 0.3, 1), margin 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease",
          opacity: isVisible ? 1 : 0,
        }}
      />
      {/* Precision Dot */}
      <div
        ref={dotRef}
        aria-hidden
        className="fixed top-0 left-0 pointer-events-none z-[10000] rounded-full will-change-transform mix-blend-difference"
        style={{
          width: dotSize,
          height: dotSize,
          marginLeft: -dotSize / 2,
          marginTop: -dotSize / 2,
          background: "white",
          transition: "opacity 0.3s ease",
          opacity: isVisible && !isHover ? 1 : 0,
        }}
      />
    </>
  );
}
