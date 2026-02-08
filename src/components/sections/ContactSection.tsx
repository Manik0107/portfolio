import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Github, Linkedin, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);
  
  const email = 'hello@example.com'; // Replace with actual email

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-content', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-20 relative"
    >
      <div className="section-container">
        <div className="contact-content max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient-primary">Let's Connect</span>
          </h2>
          <p className="text-muted-foreground mb-12">
            Interested in working together or have a question about AI systems? 
            I'd love to hear from you.
          </p>

          {/* Email with copy */}
          <div className="glass-card p-6 mb-8 inline-flex items-center gap-4">
            <Mail className="w-5 h-5 text-accent" />
            <span className="text-lg">{email}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={copyEmail}
              className="text-muted-foreground hover:text-foreground"
            >
              {copied ? (
                <Check className="w-4 h-4 text-accent" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-4 hover-lift group"
              aria-label="GitHub"
            >
              <Github className="w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-4 hover-lift group"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors" />
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-32 border-t border-border/50 pt-8">
        <div className="section-container text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} AI Developer. Built with precision.</p>
        </div>
      </div>
    </section>
  );
}
