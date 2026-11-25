import { useState } from 'react';
import SectionHeading from '@/components/SectionHeading';

const contactLinks = [
  { label: 'Email', value: 'manikmanavenddra@gmail.com', href: 'mailto:manikmanavenddra@gmail.com' },
  { label: 'GitHub', value: 'github.com/Manik0107', href: 'https://github.com/Manik0107' },
  { label: 'LinkedIn', value: 'in/manik-manavenddra', href: 'https://www.linkedin.com/in/manik-manavenddra/' },
  { label: 'Résumé', value: 'View PDF', href: '/resume' },
];

export default function ResumeSection() {
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
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="section-container">
        <SectionHeading
          title={
            <>
              Let&apos;s talk about the{' '}
              <span className="font-display font-normal">system you need.</span>
            </>
          }
          description="I'm open to AI engineering roles and selected consulting work. If you're building something serious, my inbox is open."
        />

        <div className="grid grid-cols-1 gap-12 border-t border-white/10 pt-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={copyEmail}
                className="rounded-lg bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                {copied ? 'Email copied' : 'Copy email address'}
              </button>
              <a
                href={`mailto:${email}`}
                className="rounded-lg border border-white/12 px-6 py-3.5 text-sm font-medium text-foreground transition-colors hover:border-white/25 hover:bg-white/[0.04]"
              >
                Say hello
              </a>
            </div>

            <p className="mt-8 font-mono text-xs leading-relaxed text-muted-foreground">
              AI engineer · 5+ projects shipped · production-focused
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="border-t border-white/10">
              {contactLinks.map((link) => {
                const external = link.href.startsWith('http');
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    className="group flex items-baseline justify-between gap-4 border-b border-white/10 py-4 transition-colors hover:text-foreground"
                  >
                    <span className="text-sm text-muted-foreground">
                      {link.label}
                    </span>
                    <span className="text-right text-sm text-foreground/80 transition-colors group-hover:text-primary">
                      {link.value}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
