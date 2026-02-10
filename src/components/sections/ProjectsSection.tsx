import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import ProjectWheel from '@/components/ProjectWheel';

export default function ProjectsSection() {
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
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient-primary">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed font-mono">
            <br />
            <span className="text-sm opacity-70">
              [ A selection of deployed AI systems and neural architectures ]
            </span>
          </p>
        </motion.div>

        {/* Camera Zoom Style Wheel Scroller */}
        <div className="w-full">
          <ProjectWheel />
        </div>
      </div>
    </section>
  );
}
