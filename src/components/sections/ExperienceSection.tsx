import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    company: 'RD Technology',
    role: 'AI Engineer',
    period: '2023 – Present',
    description:
      'Building production-grade AI systems, LLM integrations, and agentic workflows for enterprise clients.',
    highlights: ['RAG pipelines', 'Multi-agent orchestration', 'LLM fine-tuning'],
  },
];

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.timeline-item', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        x: -40,
        opacity: 0,
        stagger: 0.25,
        duration: 0.8,
        ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="py-16 relative">
      <div className="section-container">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          <span className="text-gradient-primary">Experience</span>
        </h2>

        <div className="relative max-w-3xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-primary/30" />

          <div className="space-y-10">
            {experiences.map((exp, i) => (
              <div key={i} className="timeline-item relative pl-16 md:pl-20">
                {/* Dot */}
                <div className="absolute left-4 md:left-6 top-1 w-4 h-4 rounded-full bg-primary border-2 border-background glow-primary" />

                <div className="glass-card p-6 hover-lift">
                  <div className="flex items-center gap-3 mb-2">
                    <Briefcase className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold">{exp.company}</h3>
                  </div>
                  <p className="text-sm text-accent font-medium mb-1">{exp.role}</p>
                  <p className="text-xs text-muted-foreground mb-3">{exp.period}</p>
                  <p className="text-sm text-muted-foreground mb-4">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.highlights.map((tag) => (
                      <span key={tag} className="tech-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
