import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import ProjectWheel from '@/components/ProjectWheel';

interface ProjectsSectionProps {
  initialProject?: string;
}

export default function ProjectsSection({ initialProject }: ProjectsSectionProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      ref={ref}
      id="projects"
      className="py-20 relative overflow-x-hidden min-h-screen flex flex-col justify-center"
    >
      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient-primary">Projects</span>
          </h2>
        </motion.div>

        <div className="w-full">
          <ProjectWheel initialProject={initialProject} />
        </div>
      </div>
    </section>
  );
}
