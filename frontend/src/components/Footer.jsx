import { motion } from "framer-motion";

// 👉 Put your own LinkedIn profile link here (the part after /in/)
const LINKEDIN_URL = "https://www.linkedin.com/in/shama-parveen-956258229/";
const EMAIL = "shama21parveen@gmail.com";
const GITHUB_URL = "https://github.com/shama21parveen";

const LINKS = [
  {
    label: "LinkedIn",
    href: LINKEDIN_URL,
    icon: (
      <path d="M4.98 3.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM.22 8h4.54v14H.22V8Zm7.5 0h4.35v1.92h.06c.6-1.15 2.08-2.36 4.29-2.36 4.59 0 5.44 3.02 5.44 6.95V22h-4.54v-6.5c0-1.55-.03-3.54-2.16-3.54-2.16 0-2.49 1.69-2.49 3.43V22H7.72V8Z" />
    ),
  },
  {
    label: "Email",
    href: `mailto:${EMAIL}`,
    icon: (
      <path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm1.6 2 7.4 5.6L19.4 7H4.6Z" />
    ),
  },
  {
    label: "GitHub",
    href: GITHUB_URL,
    icon: (
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.76 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    ),
  },
];

export default function Footer() {
  return (
    <footer className="relative z-10 overflow-hidden border-t border-gold/30 bg-black/80 px-6 pb-10 pt-16 text-center backdrop-blur">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-600 to-transparent" />

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-case text-xs uppercase tracking-[0.4em] text-gold"
      >
        Designed & built by
      </motion.p>
      <motion.h3
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-2 font-display text-6xl tracking-[0.12em] text-bone md:text-8xl"
      >
        SHAMA <span className="text-red-600">PARVEEN</span>
      </motion.h3>

      <a
        href={`mailto:${EMAIL}`}
        className="mt-4 inline-block font-case text-sm text-mist transition hover:text-gold"
      >
        {EMAIL}
      </a>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        {LINKS.map((l, i) => (
          <motion.a
            key={l.label}
            href={l.href}
            target={l.label === "Email" ? undefined : "_blank"}
            rel="noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 * i }}
            whileHover={{ y: -4, scale: 1.05 }}
            className="flex items-center gap-3 rounded-full border border-white/20 px-6 py-3 font-case text-sm uppercase tracking-widest text-bone transition hover:border-gold hover:text-gold hover:shadow-[0_0_25px_rgba(212,162,76,0.35)]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              {l.icon}
            </svg>
            {l.label}
          </motion.a>
        ))}
      </div>

      <p className="mt-12 font-display text-2xl tracking-[0.3em] text-bone/40">CHOOSE CHAOS</p>
      <p className="mt-1 font-case text-xs uppercase tracking-widest text-mist/50">
        An interactive story project · React · Framer Motion · Tailwind
      </p>
    </footer>
  );
}
