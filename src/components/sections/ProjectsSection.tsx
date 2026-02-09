import { useEffect, useRef, Suspense, lazy } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projects } from '@/data/projects';

// Lazy load 3D component for performance
const ProjectCard3D = lazy(() => import('@/components/ProjectCard3D'));

gsap.registerPlugin(ScrollTrigger);

const colorSchemes: ('primary' | 'accent' | 'gold')[] = ['primary', 'accent', 'gold', 'primary', 'accent'];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(sectionRef);
      const titleEl = q('.section-title')[0];
      const gridEl = q('.projects-grid')[0] as HTMLElement | undefined;
      const cardEls = q('.project-card');

      if (titleEl) {
        gsap.from(titleEl, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          immediateRender: false,
          clearProps: 'transform,opacity',
        });
      }

      if (gridEl && cardEls.length) {
        gsap.from(cardEls, {
          scrollTrigger: {
            trigger: gridEl,
            start: 'top 85%',
            once: true,
          },
          y: 60,
          opacity: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          immediateRender: false,
          clearProps: 'transform,opacity',
        });
      }

      // Helps when arriving via hash links (e.g. /#projects)
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="pt-6 pb-12 relative"
    >
      <div className="section-container">
        <div className="section-title text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient-primary">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A selection of AI systems and tools I've built—each solving real problems 
            with production-ready code.
          </p>
        </div>

        <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Link
              key={project.id}
              to={`/projects/${project.slug}`}
              className="project-card group glass-card p-6 hover-lift flex flex-col relative overflow-hidden min-h-[280px]"
            >
              {/* 3D Neural Network Background */}
              <Suspense fallback={null}>
                <ProjectCard3D colorScheme={colorSchemes[index % colorSchemes.length]} />
              </Suspense>

              {/* Content overlay */}
              <div className="relative z-10 flex flex-col h-full">
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
              </div>

              {/* Gradient overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent pointer-events-none" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
