"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor, Tablet, Smartphone } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────
type Seg  = { t: string; c: string };
type Line = Seg[];

// ─── Code Snippets (4 different ones) ─────────────────────────
const SNIPPETS: { title: string; lang: string; code: Line[] }[] = [
  {
    title: "Hero.tsx",
    lang: "React",
    code: [
      [{ t: "// Hero Component · React + Framer", c: "#6272a4" }],
      [],
      [{ t: "import ", c: "#ff79c6" }, { t: "React ", c: "#f8f8f2" }, { t: "from ", c: "#ff79c6" }, { t: '"react"', c: "#f1fa8c" }],
      [{ t: "import ", c: "#ff79c6" }, { t: "{ motion } ", c: "#8be9fd" }, { t: "from ", c: "#ff79c6" }, { t: '"framer-motion"', c: "#f1fa8c" }],
      [],
      [{ t: "export default ", c: "#ff79c6" }, { t: "function ", c: "#50fa7b" }, { t: "Hero", c: "#ffb86c" }, { t: "() {", c: "#f8f8f2" }],
      [{ t: "  return ", c: "#ff79c6" }, { t: "(", c: "#f8f8f2" }],
      [{ t: "    <", c: "#f8f8f2" }, { t: "motion.section", c: "#8be9fd" }],
      [{ t: '      className', c: "#50fa7b" }, { t: '="', c: "#f8f8f2" }, { t: "hero-section", c: "#f1fa8c" }, { t: '"', c: "#f8f8f2" }],
      [{ t: "      animate", c: "#50fa7b" }, { t: "={{ ", c: "#f8f8f2" }, { t: "opacity", c: "#8be9fd" }, { t: ": ", c: "#f8f8f2" }, { t: "1", c: "#bd93f9" }, { t: " }}", c: "#f8f8f2" }],
      [{ t: "    >", c: "#f8f8f2" }],
      [{ t: "      <", c: "#f8f8f2" }, { t: "h1", c: "#ff79c6" }, { t: ' className="', c: "#f8f8f2" }, { t: "gradient", c: "#f1fa8c" }, { t: '">', c: "#f8f8f2" }, { t: "Digital Brands", c: "#f8f8f2" }, { t: "</", c: "#f8f8f2" }, { t: "h1", c: "#ff79c6" }, { t: ">", c: "#f8f8f2" }],
      [{ t: "    </", c: "#f8f8f2" }, { t: "motion.section", c: "#8be9fd" }, { t: ">", c: "#f8f8f2" }],
      [{ t: "  )", c: "#f8f8f2" }],
      [{ t: "}", c: "#f8f8f2" }],
    ],
  },
  {
    title: "layout.tsx",
    lang: "Next.js",
    code: [
      [{ t: "// App Layout · Next.js 14", c: "#6272a4" }],
      [],
      [{ t: "import ", c: "#ff79c6" }, { t: "type ", c: "#ff79c6" }, { t: "{ Metadata } ", c: "#8be9fd" }, { t: "from ", c: "#ff79c6" }, { t: '"next"', c: "#f1fa8c" }],
      [{ t: "import ", c: "#ff79c6" }, { t: "{ Inter } ", c: "#8be9fd" }, { t: "from ", c: "#ff79c6" }, { t: '"next/font/google"', c: "#f1fa8c" }],
      [],
      [{ t: "export const ", c: "#ff79c6" }, { t: "metadata", c: "#50fa7b" }, { t: ": Metadata = {", c: "#f8f8f2" }],
      [{ t: "  title", c: "#50fa7b" }, { t: ": ", c: "#f8f8f2" }, { t: '"EQPD Studio"', c: "#f1fa8c" }, { t: ",", c: "#f8f8f2" }],
      [{ t: "  description", c: "#50fa7b" }, { t: ": ", c: "#f8f8f2" }, { t: '"Built to Equip"', c: "#f1fa8c" }, { t: ",", c: "#f8f8f2" }],
      [{ t: "  openGraph", c: "#50fa7b" }, { t: ": {", c: "#f8f8f2" }],
      [{ t: "    type", c: "#50fa7b" }, { t: ": ", c: "#f8f8f2" }, { t: '"website"', c: "#f1fa8c" }, { t: ",", c: "#f8f8f2" }],
      [{ t: "    url", c: "#50fa7b" }, { t: ": ", c: "#f8f8f2" }, { t: '"https://eqpdstudio.com"', c: "#f1fa8c" }],
      [{ t: "  }", c: "#f8f8f2" }],
      [{ t: "}", c: "#f8f8f2" }],
      [],
      [{ t: "export default ", c: "#ff79c6" }, { t: "function ", c: "#50fa7b" }, { t: "Layout", c: "#ffb86c" }, { t: "({ children }) {", c: "#f8f8f2" }],
    ],
  },
  {
    title: "types.ts",
    lang: "TypeScript",
    code: [
      [{ t: "// Type Safety · TypeScript", c: "#6272a4" }],
      [],
      [{ t: "interface ", c: "#ff79c6" }, { t: "Project", c: "#8be9fd" }, { t: " {", c: "#f8f8f2" }],
      [{ t: "  id", c: "#50fa7b" }, { t: ": ", c: "#f8f8f2" }, { t: "string", c: "#bd93f9" }],
      [{ t: "  title", c: "#50fa7b" }, { t: ": ", c: "#f8f8f2" }, { t: "string", c: "#bd93f9" }],
      [{ t: "  stack", c: "#50fa7b" }, { t: ": ", c: "#f8f8f2" }, { t: "Technology", c: "#8be9fd" }, { t: "[]", c: "#f8f8f2" }],
      [{ t: "  status", c: "#50fa7b" }, { t: ": ", c: "#f8f8f2" }, { t: '"live"', c: "#f1fa8c" }, { t: " | ", c: "#f8f8f2" }, { t: '"wip"', c: "#f1fa8c" }, { t: " | ", c: "#f8f8f2" }, { t: '"archived"', c: "#f1fa8c" }],
      [{ t: "  url", c: "#50fa7b" }, { t: "?: ", c: "#f8f8f2" }, { t: "string", c: "#bd93f9" }],
      [{ t: "  createdAt", c: "#50fa7b" }, { t: ": ", c: "#f8f8f2" }, { t: "Date", c: "#8be9fd" }],
      [{ t: "}", c: "#f8f8f2" }],
      [],
      [{ t: "type ", c: "#ff79c6" }, { t: "Technology ", c: "#8be9fd" }, { t: "=", c: "#f8f8f2" }],
      [{ t: '  | "React" | "Next.js"', c: "#f1fa8c" }],
      [{ t: '  | "TypeScript" | "Tailwind"', c: "#f1fa8c" }],
      [{ t: '  | "Node.js" | "Supabase"', c: "#f1fa8c" }],
    ],
  },
  {
    title: "route.ts",
    lang: "API Route",
    code: [
      [{ t: "// API Route · Next.js App Router", c: "#6272a4" }],
      [],
      [{ t: "import ", c: "#ff79c6" }, { t: "{ NextResponse } ", c: "#8be9fd" }, { t: "from ", c: "#ff79c6" }, { t: '"next/server"', c: "#f1fa8c" }],
      [],
      [{ t: "export async function ", c: "#ff79c6" }, { t: "GET", c: "#50fa7b" }, { t: "(", c: "#f8f8f2" }, { t: "req", c: "#ffb86c" }, { t: ": Request) {", c: "#f8f8f2" }],
      [{ t: "  const ", c: "#ff79c6" }, { t: "{ searchParams } = ", c: "#f8f8f2" }, { t: "new ", c: "#ff79c6" }, { t: "URL", c: "#8be9fd" }, { t: "(req.url)", c: "#f8f8f2" }],
      [{ t: "  const ", c: "#ff79c6" }, { t: "id ", c: "#50fa7b" }, { t: "= searchParams.", c: "#f8f8f2" }, { t: "get", c: "#50fa7b" }, { t: '("id")', c: "#f1fa8c" }],
      [],
      [{ t: "  const ", c: "#ff79c6" }, { t: "data ", c: "#50fa7b" }, { t: "= await ", c: "#ff79c6" }, { t: "db", c: "#8be9fd" }, { t: ".project.", c: "#f8f8f2" }, { t: "findUnique", c: "#50fa7b" }, { t: "({", c: "#f8f8f2" }],
      [{ t: "    where", c: "#50fa7b" }, { t: ": { id },", c: "#f8f8f2" }],
      [{ t: "    select", c: "#50fa7b" }, { t: ": { title: ", c: "#f8f8f2" }, { t: "true", c: "#bd93f9" }, { t: " }", c: "#f8f8f2" }],
      [{ t: "  })", c: "#f8f8f2" }],
      [],
      [{ t: "  return ", c: "#ff79c6" }, { t: "NextResponse", c: "#8be9fd" }, { t: ".", c: "#f8f8f2" }, { t: "json", c: "#50fa7b" }, { t: "(data)", c: "#f8f8f2" }],
      [{ t: "}", c: "#f8f8f2" }],
    ],
  },
];

// ─── Code Editor (fixed height — all lines pre-rendered, opacity animates) ────
const LANG_COLORS: Record<string, string> = {
  "React":     "#61dafb",
  "Next.js":   "#f8f8f2",
  "TypeScript":"#3178c6",
  "API Route": "#50fa7b",
};

function CodeEditor({
  snippet,
  visibleLines,
  fading,
}: {
  snippet: typeof SNIPPETS[0];
  visibleLines: number;
  fading: boolean;
}) {
  return (
    <motion.div
      animate={{ opacity: fading ? 0 : 1 }}
      transition={{ duration: 0.3 }}
      className="rounded-xl overflow-hidden border border-black/10 dark:border-white/10 shadow-2xl shadow-black/40 flex flex-col h-full"
      style={{ background: "#282a36" }}
    >
      {/* Title bar — fixed */}
      <div
        className="flex items-center gap-2 px-3 py-2 border-b border-white/10 flex-shrink-0"
        style={{ background: "#21222c" }}
      >
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        </div>
        <span
          className="ml-2 text-[11px] text-zinc-300 font-medium"
          style={{ fontFamily: "monospace" }}
        >
          {snippet.title}
        </span>
        <span
          className="ml-2 text-[9px] px-1.5 py-0.5 rounded font-bold"
          style={{
            background: "rgba(255,255,255,0.08)",
            color: LANG_COLORS[snippet.lang] ?? "#f8f8f2",
          }}
        >
          {snippet.lang}
        </span>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-[9px] text-green-400 font-semibold tracking-wide">LIVE</span>
        </div>
      </div>

      {/* Code area — ALL lines pre-rendered at fixed positions; opacity toggles */}
      <div
        className="flex-1 overflow-hidden px-3 py-2"
        style={{
          fontFamily: "'Fira Code','JetBrains Mono',monospace",
          fontSize: "11px",
          lineHeight: "1.7",
        }}
      >
        {snippet.code.map((line, i) => (
          <div
            key={i}
            className="flex items-center"
            style={{
              opacity: i < visibleLines ? 1 : 0,
              transition: "opacity 0.12s ease",
            }}
          >
            <span
              className="select-none text-right mr-3 shrink-0 w-4"
              style={{ color: "#44475a", fontSize: "10px" }}
            >
              {i + 1}
            </span>
            <span className="flex flex-wrap">
              {line.length === 0 ? (
                <span className="invisible select-none">_</span>
              ) : (
                line.map((seg, j) => (
                  <span key={j} style={{ color: seg.c }}>
                    {seg.t}
                  </span>
                ))
              )}
              {/* Blinking cursor on last revealed line */}
              {i === visibleLines - 1 && visibleLines < snippet.code.length && !fading && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.9, repeat: Infinity }}
                  className="inline-block w-0.5 h-3.5 ml-px align-middle"
                  style={{ background: "#f8f8f2" }}
                />
              )}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Responsive Device Preview ─────────────────────────────────
type Device = "desktop" | "tablet" | "mobile";

const DEVICES: { key: Device; label: string; icon: any }[] = [
  { key: "desktop", label: "Desktop", icon: Monitor },
  { key: "tablet",  label: "Tablet",  icon: Tablet  },
  { key: "mobile",  label: "Mobile",  icon: Smartphone },
];

function DevicePreviewContent({ device }: { device: Device }) {
  const isDesktop = device === "desktop";
  const isMobile  = device === "mobile";
  return (
    <motion.div
      key={device}
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.25 }}
      className="w-full h-full rounded overflow-hidden"
      style={{ background: "#1a1a2e" }}
    >
      <div className="flex items-center gap-1 px-2 py-1 border-b border-white/10" style={{ background: "#0f0f1e" }}>
        <div className="w-1.5 h-1.5 rounded-full bg-purple-500/70" />
        <div className={`h-1 rounded-full bg-white/20 ${isMobile ? "w-8" : "w-12"}`} />
        {isDesktop && (
          <div className="ml-auto flex gap-1">
            {["w-5", "w-5", "w-7"].map((w, i) => (
              <div key={i} className={`h-1 rounded-full bg-white/15 ${w}`} />
            ))}
          </div>
        )}
      </div>
      <div className={`p-2 flex ${isDesktop ? "flex-row gap-2 items-start" : "flex-col gap-1"}`}>
        <div className="flex-1 flex flex-col gap-1">
          <div className="h-1.5 rounded-full bg-purple-400/40 w-3/4" />
          <div className="h-1 rounded-full bg-white/20 w-full" />
          <div className="h-1 rounded-full bg-white/15 w-5/6" />
          <div className="mt-1 flex gap-1">
            <div className="h-3 w-8 rounded bg-purple-500/60" />
            {!isMobile && <div className="h-3 w-6 rounded border border-white/20" />}
          </div>
        </div>
        {!isMobile && (
          <div className="w-10 h-8 rounded bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
            <div className="w-4 h-4 rounded-full bg-purple-400/30" />
          </div>
        )}
      </div>
      {isDesktop && (
        <div className="px-2 grid grid-cols-3 gap-1">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-4 rounded bg-white/5 border border-white/[0.06]" />
          ))}
        </div>
      )}
    </motion.div>
  );
}

function ResponsivePreview() {
  const [active, setActive] = useState<Device>("desktop");
  useEffect(() => {
    const order: Device[] = ["desktop", "tablet", "mobile"];
    const t = setInterval(() => {
      setActive((cur) => order[(order.indexOf(cur) + 1) % order.length]);
    }, 2600);
    return () => clearInterval(t);
  }, []);

  const dims: Record<Device, { w: number; h: number }> = {
    desktop: { w: 200, h: 110 },
    tablet:  { w: 90,  h: 110 },
    mobile:  { w: 60,  h: 110 },
  };

  return (
    <div
      className="rounded-xl overflow-hidden border border-black/10 dark:border-white/10 shadow-xl shadow-black/30 flex flex-col"
      style={{ background: "#21222c" }}
    >
      <div
        className="flex items-center gap-0.5 px-2 py-1.5 border-b border-white/10 flex-shrink-0"
        style={{ background: "#1a1b26" }}
      >
        {DEVICES.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className={`flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-semibold transition-all duration-200 ${
              active === key ? "bg-purple-500/20 text-purple-300" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <Icon size={9} />
            {label}
          </button>
        ))}
        <span className="ml-auto text-[9px] text-zinc-600 tracking-wide font-medium">Preview</span>
      </div>

      <div className="flex-1 flex items-center justify-center p-3">
        <motion.div
          animate={{ width: dims[active].w, height: dims[active].h }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
          className="relative rounded border border-white/15 overflow-hidden"
        >
          {active === "mobile" && (
            <div className="absolute top-0 inset-x-0 flex justify-center pt-0.5 z-10 pointer-events-none">
              <div className="w-5 h-1 rounded-full bg-black/80" />
            </div>
          )}
          <AnimatePresence mode="wait">
            <DevicePreviewContent key={active} device={active} />
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="px-3 py-1.5 border-t border-white/10 flex items-center gap-1.5 flex-shrink-0">
        <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
        <span className="text-[9px] text-green-400 font-semibold tracking-wide">
          Responsive · All breakpoints ✓
        </span>
      </div>
    </div>
  );
}

// ─── Main HeroVisual ──────────────────────────────────────────
export default function HeroVisual() {
  const [snippetIdx, setSnippetIdx] = useState(0);
  const [visibleLines, setVisibleLines] = useState(0);
  const [fading, setFading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    let line = 0;
    const snippet = SNIPPETS[snippetIdx];

    const advance = () => {
      line++;
      setVisibleLines(line);
      if (line >= snippet.code.length) {
        // Done typing — pause then fade out and switch snippet
        if (timerRef.current) clearInterval(timerRef.current);
        setTimeout(() => {
          setFading(true);
          setTimeout(() => {
            setSnippetIdx((prev) => (prev + 1) % SNIPPETS.length);
            setFading(false);
            setVisibleLines(0);
          }, 350); // fade duration
        }, 2800); // hold at completion
      }
    };

    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(advance, 170);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [snippetIdx]);

  const snippet = SNIPPETS[snippetIdx];

  return (
    <div className="w-full h-full flex flex-col gap-3 p-1 relative">
      {/* Code editor — fixed height, fills flex-1 */}
      <div className="flex-1 min-h-0">
        <CodeEditor snippet={snippet} visibleLines={visibleLines} fading={fading} />
      </div>

      {/* Device preview — fixed height at bottom */}
      <div className="flex-shrink-0">
        <ResponsivePreview />
      </div>

      {/* Floating badge */}
      <motion.div
        className="absolute -top-2 -right-2 px-2.5 py-1 rounded-full text-[9px] font-bold text-white bg-brand-600 border border-white/10 shadow-lg shadow-brand-500/20 z-10"
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      >
        ✦ Live Preview
      </motion.div>
    </div>
  );
}
