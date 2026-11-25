import { useRef, type PointerEvent as ReactPointerEvent } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import type { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
  highlight?: boolean;
}

export default function ProjectCard({ project, featured = false, highlight = false }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [4, -4]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-4, 4]), { stiffness: 150, damping: 20 });

  const handleMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <div className={`${featured ? 'md:col-span-2' : ''} [perspective:1400px]`}>
      <motion.div
        ref={ref}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className={`group relative h-full overflow-hidden rounded-2xl border bg-card transition-colors duration-300 ${
          highlight ? 'border-primary/50' : 'border-white/[0.08] hover:border-white/20'
        }`}
      >
        <Link
          to={`/project/${project.slug}`}
          className={`block h-full ${featured ? 'md:grid md:grid-cols-2' : ''}`}
          aria-label={`View ${project.title} case study`}
        >
          <div
            className={`relative overflow-hidden ${
              featured ? 'aspect-[16/11] md:aspect-auto md:min-h-[360px]' : 'aspect-[16/10]'
            }`}
          >
            <div
              className="absolute inset-0"
              style={{ background: project.imagePlaceholder || 'linear-gradient(135deg, #1a1a2e, #16213e)' }}
            />
            {project.imageUrl && (
              <img
                src={project.imageUrl}
                alt={`${project.title} preview`}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover object-top opacity-90 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-card/70" />
          </div>

          <div className={`flex flex-col ${featured ? 'justify-center p-7 md:p-10' : 'p-6'}`}>
            <h3
              className={`font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary ${
                featured ? 'text-3xl sm:text-4xl' : 'text-2xl'
              }`}
            >
              {project.title}
            </h3>

            <p className={`mt-3 leading-relaxed text-muted-foreground ${featured ? 'max-w-md text-base' : 'text-sm'}`}>
              {project.description}
            </p>

            <p className="mt-5 font-mono text-[0.7rem] leading-relaxed text-muted-foreground">
              {project.techStack.slice(0, featured ? 5 : 3).join(', ')}
            </p>

            <div className="mt-6 border-t border-white/[0.07] pt-4">
              <span className="text-sm text-foreground/70 transition-colors group-hover:text-primary">
                View case study
              </span>
            </div>
          </div>
        </Link>
      </motion.div>
    </div>
  );
}
