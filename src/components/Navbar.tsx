import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Work' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, y / max) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        open
          ? 'border-b border-white/10 bg-background'
          : scrolled
            ? 'border-b border-white/10 bg-background/85 backdrop-blur-md'
            : 'border-b border-transparent'
      }`}
    >
      <nav className="section-container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-baseline gap-3" onClick={() => setOpen(false)}>
          <span className="text-base font-semibold tracking-tight">Manik</span>
          <span className="hidden text-xs text-muted-foreground sm:inline">AI Engineer</span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/resume"
            className="rounded-lg border border-white/12 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-white/25 hover:bg-white/[0.04]"
          >
            Résumé
          </Link>
        </div>

        <button
          className="-mr-2 p-2 text-muted-foreground transition-colors hover:text-foreground md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="fixed inset-x-0 bottom-0 top-16 overflow-y-auto border-t border-white/10 bg-background md:hidden">
          <div className="section-container flex flex-col py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-white/[0.06] py-3 text-base text-muted-foreground transition-colors last:border-b-0 hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/resume"
              onClick={() => setOpen(false)}
              className="mt-3 rounded-lg bg-primary px-4 py-3 text-center text-sm font-medium text-primary-foreground"
            >
              View résumé
            </Link>
          </div>
        </div>
      )}

      {!open && (
        <div className={`h-px w-full ${scrolled ? 'bg-white/[0.06]' : 'bg-transparent'}`}>
          <div className="h-px bg-primary" style={{ width: `${progress * 100}%` }} />
        </div>
      )}
    </header>
  );
}
