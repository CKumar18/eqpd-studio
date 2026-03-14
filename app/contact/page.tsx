import type { Metadata } from "next";
import { Mail, MapPin, Clock } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import ContactForm from "@/components/ui/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with EQPD Studio. Let's build something extraordinary together.",
};

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "eqpd.studio@gmail.com",
    href: "mailto:eqpd.studio@gmail.com",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Remote — Worldwide",
    href: null,
  },
  {
    icon: Clock,
    label: "Response Time",
    value: "Within 24 hours",
    href: null,
  },
];

export default function ContactPage() {
  return (
    <SectionWrapper className="pt-8 sm:pt-12 lg:pt-16 pb-16 sm:pb-20 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-500 mb-3 sm:mb-4">
            Get In Touch
          </p>
          <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-zinc-900 dark:text-zinc-50 leading-[1.1] mb-3 sm:mb-4">
            Let&apos;s Build Something{" "}
            <span className="gradient-text">Together</span>
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-base sm:text-lg leading-relaxed">
            Tell us about your project and we&apos;ll get back to you within 24
            hours with a tailored proposal.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {/* Contact Info Sidebar */}
          <div className="flex flex-col gap-4">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 sm:p-6 gradient-bg text-white">
              <h2 className="font-display font-bold text-lg sm:text-xl mb-2 sm:mb-3">
                Ready to Level Up Your Brand?
              </h2>
              <p className="text-white/75 text-sm leading-relaxed">
                We&apos;re excited to hear about your project. Fill out the form
                and let&apos;s create something extraordinary together.
              </p>
            </div>

            {contactInfo.map((info) => (
              <div
                key={info.label}
                className="flex items-center gap-3 sm:gap-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 sm:p-5 hover:border-brand-500/40 transition-colors"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-brand-500/15 flex items-center justify-center flex-shrink-0">
                  <info.icon size={16} className="text-brand-500" />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mb-0.5">
                    {info.label}
                  </p>
                  {info.href ? (
                    <a
                      href={info.href}
                      className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 hover:text-brand-500 transition-colors"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                      {info.value}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8">
            <h2 className="font-display font-bold text-lg sm:text-xl text-zinc-900 dark:text-zinc-50 mb-5 sm:mb-6">
              Send Us a Message
            </h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
