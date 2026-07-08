import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import "./view-transitions.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlowCursor from "@/components/ui/GlowCursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "EQPD Studio — Built to Equip Your Brand Online",
    template: "%s | EQPD Studio",
  },
  description:
    "EQPD Studio is a premium digital web agency specializing in modern, fast, and beautiful websites. We design and build brands that convert.",
  keywords: [
    "web agency",
    "web design",
    "web development",
    "UI/UX",
    "digital studio",
    "Next.js",
  ],
  authors: [{ name: "EQPD Studio" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://eqpdstudio.com",
    siteName: "EQPD Studio",
    title: "EQPD Studio — Built to Equip Your Brand Online",
    description:
      "Premium digital agency designing and building modern websites that convert.",
  },
  twitter: {
    card: "summary_large_image",
    title: "EQPD Studio",
    description: "Built to Equip Your Brand Online.",
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${outfit.variable} font-sans antialiased bg-white dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50 overflow-x-hidden`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <GlowCursor />
          <Navbar />
          <main className="main-content">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
