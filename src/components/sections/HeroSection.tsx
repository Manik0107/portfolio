import { ArrowDown, FileText, Github, Mail, Linkedin, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface HeroSectionProps {
  onViewProjects: () => void;
}

export default function HeroSection({ onViewProjects }: HeroSectionProps) {
  const [copied, setCopied] = useState(false);
  const email = 'manikmanavenddra@gmail.com';

  const copyEmail = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="section-container relative z-10 text-center">
        <div className="space-y-6 animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
            <span className="text-gradient-primary">AI Developer</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Engineering production-grade AI systems, agentic workflows, and
            intelligent automation that solves real problems.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Button
              size="lg"
              onClick={onViewProjects}
              className="group bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg glow-primary"
            >
              View Projects
              <ArrowDown className="ml-2 h-5 w-5 transition-transform group-hover:translate-y-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-border/50 bg-background/50 backdrop-blur-sm hover:bg-primary/10 hover:text-foreground hover:border-primary/50 px-8 py-6 text-lg transition-all"
            >
              <a href="/resume" target="_blank" rel="noopener noreferrer">
                <FileText className="mr-2 h-5 w-5" />
                Resume
              </a>
            </Button>
          </div>

          <div className="flex items-center justify-center gap-6 pt-8">
            <button
              onClick={copyEmail}
              className="glass-card p-4 hover-lift group relative"
              aria-label="Copy Email"
            >
              <div className="relative">
                <Mail
                  className={`w-6 h-6 text-muted-foreground group-hover:text-foreground transition-all duration-300 ${copied ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
                />
                <Check
                  className={`w-6 h-6 text-accent absolute top-0 left-0 transition-all duration-300 ${copied ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
                />
              </div>
            </button>

            <a
              href="https://github.com/Manik0107"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-4 hover-lift group"
              aria-label="GitHub"
            >
              <Github className="w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors" />
            </a>

            <a
              href="https://www.linkedin.com/in/manik-manavenddra/"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-4 hover-lift group"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors" />
            </a>
          </div>
        </div>
      </div>{" "}
      {/* Elegant Bottom Separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 max-w-3xl h-[100px] bg-primary/20 blur-[60px] pointer-events-none rounded-full" />
    </section>
  );
}
