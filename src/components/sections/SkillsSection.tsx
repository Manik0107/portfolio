import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: 'Languages',
    skills: ['Python', 'TypeScript', 'JavaScript', 'SQL', 'Rust'],
  },
  {
    title: 'AI / ML',
    skills: ['LangChain', 'LangGraph', 'OpenAI', 'Hugging Face', 'PyTorch', 'RAG'],
  },
  {
    title: 'Frameworks',
    skills: ['React', 'Next.js', 'FastAPI', 'Node.js', 'Express'],
  },
  {
    title: 'Infrastructure',
    skills: ['Docker', 'Kubernetes', 'AWS', 'PostgreSQL', 'Redis', 'Supabase'],
  },
];

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.skill-category', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-20 relative"
    >
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient-primary">Skills & Tools</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The technologies I work with daily to build production AI systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="skill-category glass-card p-6"
            >
              <h3 className="text-sm font-semibold text-accent uppercase tracking-wider mb-4">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-sm bg-secondary/50 border border-border/50 rounded-lg text-foreground hover:bg-secondary transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
