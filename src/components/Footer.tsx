import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 pb-10 pt-16">
      <div className="section-container">
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm text-muted-foreground">Let&apos;s connect</p>
            <a
              href="mailto:manikmanavenddra@gmail.com"
              className="mt-2 inline-block text-xl font-medium tracking-tight text-foreground transition-colors hover:text-primary sm:text-2xl"
            >
              manikmanavenddra@gmail.com
            </a>
          </div>

          <div className="flex flex-wrap gap-x-7 gap-y-3 text-sm text-muted-foreground">
            <a
              href="https://github.com/Manik0107"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline transition-colors hover:text-foreground"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/manik-manavenddra/"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline transition-colors hover:text-foreground"
            >
              LinkedIn
            </a>
            <Link to="/resume" className="link-underline transition-colors hover:text-foreground">
              Résumé
            </Link>
            <a href="#about" className="link-underline transition-colors hover:text-foreground">
              Top
            </a>
          </div>
        </div>

        <div className="mt-14 select-none overflow-hidden">
          <div className="text-outline whitespace-nowrap text-[clamp(4rem,17vw,14rem)] font-semibold leading-[0.8] tracking-[-0.04em]">
            MANIK
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {year} Manik Manavenddra · Manik0107</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="transition-colors hover:text-foreground"
          >
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
