import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projects } from '@/data/projects';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.section-title', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.from('.project-card', {
        scrollTrigger: {
          trigger: '.projects-grid',
          start: 'top 80%',
        },
        y: 60,
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
      id="projects"
      className="py-20 relative"
    >
      <div className="section-container">
        <div className="section-title text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient-primary">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A selection of AI systems and tools I've built—each solving real problems 
            with production-ready code.
          </p>
        </div>

        <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link
              key={project.id}
              to={`/projects/${project.slug}`}
              className="project-card group glass-card p-6 hover-lift flex flex-col"
            >
              {/* Project Header */}
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground mb-6 flex-grow">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.techStack.slice(0, 4).map((tech) => (
                  <span key={tech} className="tech-tag">
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 4 && (
                  <span className="tech-tag">+{project.techStack.length - 4}</span>
                )}
              </div>

              {/* GitHub Link */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Github className="w-4 h-4" />
                <span className="link-underline">View on GitHub</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
