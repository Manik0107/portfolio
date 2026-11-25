import { useState } from 'react';
import { motion, type Variants } from 'framer-motion';

interface HeroSectionProps {
  onViewProjects: () => void;
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function HeroSection({ onViewProjects }: HeroSectionProps) {
  const [copied, setCopied] = useState(false);
  const email = 'manikmanavenddra@gmail.com';

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pb-20 pt-32 sm:pt-36">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background via-background/75 to-transparent md:from-background/90 md:via-background/30 md:to-transparent" />

      <div className="section-container relative z-10">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-5xl">
          <motion.h1
            variants={item}
            className="text-[clamp(2.25rem,9vw,7rem)] font-semibold leading-[0.88] tracking-[-0.045em]"
          >
            Manik
            <br />
            Manavenddra M.
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-5 text-sm font-medium text-foreground"
          >
            AI Engineer · India
          </motion.p>

          <motion.p
            variants={item}
            className="mt-4 max-w-2xl font-display text-2xl leading-snug text-foreground/85 sm:text-3xl"
          >
            AI systems that hold up in production.
          </motion.p>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            I design and ship autonomous agents, LLM applications and automation
            for teams that need working systems, not demos.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
            <button
              onClick={onViewProjects}
              className="rounded-lg bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              View selected work
            </button>
            <a
              href="/resume"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-white/12 px-6 py-3.5 text-sm font-medium text-foreground transition-colors hover:border-white/25 hover:bg-white/[0.04]"
            >
              View résumé
            </a>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground"
          >
            <a
              href="https://github.com/Manik0107"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/manik-manavenddra/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              LinkedIn
            </a>
            <button onClick={copyEmail} className="transition-colors hover:text-foreground">
              {copied ? 'Email copied' : 'Copy email'}
            </button>
            <span className="text-muted-foreground/60">{email}</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
