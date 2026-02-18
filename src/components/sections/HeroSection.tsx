import { ArrowDown, FileText, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  onViewProjects: () => void;
}

export default function HeroSection({ onViewProjects }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0 hero-grid pointer-events-none" />

      <div className="section-container relative z-10 text-center">
        <div className="space-y-6 animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
            <span className="text-gradient-primary">AI Developer</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Engineering production-grade AI systems, agentic workflows,
            and intelligent automation that solves real problems.
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
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FileText className="mr-2 h-5 w-5" />
                Resume
              </a>
            </Button>
          </div>

          <div className="flex items-center justify-center gap-6 pt-8">
            <a
              href="https://github.com/Manik0107"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
