import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileText, Download, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

export default function ResumeSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.resume-content', {
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

  // Placeholder path - replace with actual resume path
  const resumePath = '/resume.pdf';

  return (
    <section
      ref={sectionRef}
      id="resume"
      className="py-20 relative"
    >
      <div className="section-container">
        <div className="resume-content max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-gradient-primary">Resume</span>
            </h2>
            <p className="text-muted-foreground">
              Download or view my full resume below.
            </p>
          </div>

          {/* Resume Preview Card */}
          <div className="glass-card p-8 mb-8">
            <div className="flex items-center justify-center gap-4 mb-8">
              <FileText className="w-12 h-12 text-primary" />
              <div>
                <h3 className="text-xl font-semibold">AI Developer Resume</h3>
                <p className="text-sm text-muted-foreground">PDF Document</p>
              </div>
            </div>

            {/* PDF Preview Area */}
            <div className="aspect-[8.5/11] bg-secondary/30 rounded-lg border border-border/50 flex items-center justify-center mb-8">
              <div className="text-center text-muted-foreground">
                <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-sm">Resume preview will appear here</p>
                <p className="text-xs mt-2 opacity-75">Upload resume.pdf to /public folder</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground glow-primary"
                asChild
              >
                <a href={resumePath} download>
                  <Download className="mr-2 h-5 w-5" />
                  Download PDF
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border/50 bg-background/50"
                asChild
              >
                <a href={resumePath} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-5 w-5" />
                  Open in New Tab
                </a>
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Years Experience', value: '5+' },
              { label: 'Projects Shipped', value: '20+' },
              { label: 'AI Systems Built', value: '15+' },
              { label: 'Languages', value: '6+' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="glass-card p-4 text-center"
              >
                <div className="text-2xl font-bold text-gradient-gold">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
