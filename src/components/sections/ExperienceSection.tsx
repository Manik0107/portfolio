import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    company: 'RD Technology',
    role: 'Machine Learning Intern',
    period: 'Dec 2024 – Jan 2025',
    description:
      'Trained and optimized ML models for classification and regression, deployed as FastAPI endpoints bridging research and production.',
    highlights: ['Python', 'TensorFlow', 'Keras', 'Scikit-learn', 'Pandas', 'NumPy', 'SQL', 'FastAPI', 'Git', 'Docker'],
  },
  {
    company: 'PhobosQ',
    role: 'Agentic AI Intern (Call Analytics)',
    period: 'Dec 2025 – Mar 2026',
    description:
      'Built real-time call analytics supporting 12+ Indic Languages using stream processing, speech AI, and NLP pipelines.',
    highlights: ['VoIP', 'PBX', 'Speech to Text', 'Kafka', 'TensorFlow', 'PostgreSQL', 'FastAPI', 'Docker'],
  },
];

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.timeline-item', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
        y: 50,
        opacity: 0,
        scale: 0.95,
        stagger: 0.2,
        duration: 0.8,
        ease: 'back.out(1.7)',
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

        <div className="relative max-w-5xl mx-auto">
          {/* Center vertical line */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-primary/30" />

          <div className="space-y-12">
            {experiences.map((exp, i) => {
              const isLeft = i % 2 === 0;
              const card = (
                <div className="glass-card p-6 hover-lift">
                  <div className="flex items-center gap-3 mb-2">
                    <Briefcase className="w-5 h-5 text-primary flex-shrink-0" />
                    <h3 className="text-lg font-semibold">{exp.company}</h3>
                  </div>
                  <p className="text-sm text-accent font-medium mb-1">{exp.role}</p>
                  <p className="text-xs text-muted-foreground mb-3">{exp.period}</p>
                  <p className="text-sm text-muted-foreground mb-4 text-justify">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.highlights.map((tag) => (
                      <span key={tag} className="tech-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              );
              return (
                <div key={i} className="timeline-item relative flex flex-col md:flex-row md:items-center gap-4 md:gap-0">
                  {/* Left slot */}
                  <div className="w-full md:w-[calc(50%-1.5rem)] md:pr-8">
                    {isLeft && card}
                  </div>

                  {/* Center dot */}
                  <div className="hidden md:block w-4 h-4 rounded-full bg-primary border-2 border-background glow-primary flex-shrink-0 mx-auto z-10" />

                  {/* Right slot */}
                  <div className="w-full md:w-[calc(50%-1.5rem)] md:pl-8">
                    {!isLeft && card}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
