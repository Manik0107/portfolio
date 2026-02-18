import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: 'Languages',
    skills: ['Python', 'TypeScript', 'FastApi', 'SQL', 'Rust', "GoLang"],
  },
  {
    title: 'AI / ML',
    skills: ['LangChain', 'LangGraph', 'OpenAI', 'Hugging Face', 'PyTorch', 'RAG'],
  },
  {
    title: 'Infrastructure',
    skills: ['Docker', 'Kubernetes', 'AWS', 'PostgreSQL', 'Redis', 'Supabase'],
  },
];

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => { }, sectionRef);
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="skill-category glass-card p-6 border border-[rgba(255,215,0,0.4)] shadow-none hover:shadow-[0_0_25px_rgba(255,215,0,0.45)] transition-all duration-300">
              <h3 className="text-2xl font-bold text-accent mb-6">
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
