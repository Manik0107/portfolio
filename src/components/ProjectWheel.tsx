import { useRef, useState, useEffect } from 'react';
import { motion, useTransform, useMotionValue, MotionValue } from 'framer-motion';
import { projects } from '@/data/projects';
import { ArrowUpRight, Github, Monitor, Box } from 'lucide-react';
import ProjectModal from './ProjectModal';

// Styles
const CARD_WIDTH = 350;
const CARD_GAP = 50;
const ITEM_FULL_WIDTH = CARD_WIDTH + CARD_GAP;

// Tick Mark Component
const Tick = ({ x, index }: { x: MotionValue<number>, index: number }) => {
    const position = index * 20;

    // Calculate opacity based on distance from center
    const opacity = useTransform(x, (latest) => {
        const dist = Math.abs(position + latest);
        return Math.max(0.2, 1 - dist / 700);
    });

    const height = useTransform(x, (latest) => {
        const dist = Math.abs(position + latest);
        return Math.max(4, 30 - dist / 25);
    });

    const backgroundColor = useTransform(x, (latest) => {
        const dist = Math.abs(position + latest);
        return dist < 100 ? 'hsl(174, 72%, 56%)' : 'hsl(217, 91%, 60%)';
    });

    return (
        <motion.div
            style={{ height, opacity, x: position, backgroundColor }}
            className="absolute top-1/2 -translate-y-1/2 w-[2px] rounded-full shadow-[0_0_8px_currentColor]"
        />
    );
};

// Dial Background Component
const Dial = ({ x }: { x: MotionValue<number> }) => {
    const tickCount = 200;
    return (
        <div className="absolute inset-x-0 bottom-0 h-40 flex items-center justify-center pointer-events-none overflow-hidden mask-linear-fade">
            <motion.div
                style={{ x }}
                className="flex items-center relative"
            >
                {Array.from({ length: tickCount }).map((_, i) => (
                    <Tick key={i} index={i - tickCount / 2} x={x} />
                ))}
            </motion.div>

            {/* Center Indicator */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[12px] border-b-accent z-10 opacity-80" />
        </div>
    );
};

// Project Card Component
const WheelCard = ({
    project,
    index,
    x,
    onClick
}: {
    project: typeof projects[0],
    index: number,
    x: MotionValue<number>,
    onClick: () => void
}) => {
    const cardOffset = index * ITEM_FULL_WIDTH;

    const distance = useTransform(x, (latest) => {
        return Math.abs(latest + cardOffset);
    });

    // Enhanced transforms 
    const scale = useTransform(distance, [0, 500], [1.1, 0.65]);
    const opacity = useTransform(distance, [0, 600], [1, 0.4]);
    const rotateY = useTransform(x, (latest) => {
        const pos = latest + cardOffset;
        return -pos / 15;
    });

    const zIndex = useTransform(distance, (d) => Math.round(1000 - d));

    return (
        <motion.div
            style={{
                width: CARD_WIDTH,
                zIndex,
                scale,
                opacity,
                rotateY,
                left: '50%',
                x: cardOffset - CARD_WIDTH / 2,
            }}
            className="absolute top-0 h-[500px] cursor-pointer perspective-1000 origin-center"
            onClick={onClick}
            whileHover={{ scale: 1.15, zIndex: 2000 }}
        >
            <div className="w-full h-full relative group">
                <div className="absolute inset-0 bg-card/90 backdrop-blur-xl border border-primary/40 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 group-hover:border-accent group-hover:shadow-[0_0_30px_rgba(45,212,191,0.2)]">
                    {/* Content */}
                    <div className="p-8 h-full flex flex-col relative z-10">
                        {/* Header */}
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-2 text-primary">
                                <Box className="w-4 h-4" />
                                <span className="text-xs font-mono tracking-widest font-bold">
                                    PRJ.{project.id.toUpperCase().padStart(3, '0')}
                                </span>
                            </div>
                            <div className="p-2 rounded-full border border-white/10 group-hover:bg-accent/20 transition-colors">
                                <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-accent" />
                            </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-3xl font-bold text-foreground mb-3 font-mono group-hover:text-accent transition-colors">
                            {project.title}
                        </h3>

                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            {project.techStack.slice(0, 3).map(tech => (
                                <span key={tech} className="text-[10px] font-mono px-2 py-1 rounded bg-secondary/80 text-secondary-foreground border border-white/10">
                                    {tech}
                                </span>
                            ))}
                        </div>

                        {/* Description */}
                        <p className="text-muted-foreground text-sm leading-relaxed font-mono opacity-90 flex-grow">
                            {project.description}
                        </p>

                        {/* Footer */}
                        <div className="pt-4 border-t border-white/10 flex items-center justify-between mt-auto">
                            <span className="text-xs font-mono text-accent flex items-center gap-2">
                                <span className="w-2 h-2 bg-accent rounded-full animate-pulse shadow-[0_0_8px_currentColor]" />
                                ONLINE
                            </span>
                            <Github className="w-5 h-5 text-muted-foreground hover:text-white transition-colors" />
                        </div>
                    </div>

                    {/* Brighter Gradient Effects */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background via-background/60 to-transparent" />
                </div>
            </div>
        </motion.div>
    );
};

export default function ProjectWheel() {
    const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
    const isDragging = useRef(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const snapTimeout = useRef<NodeJS.Timeout>();

    // Motion Value for Drag - Start at Index 2 (Center Project)
    const x = useMotionValue(-2 * ITEM_FULL_WIDTH);

    // Bounds
    const totalWidth = (projects.length - 1) * ITEM_FULL_WIDTH;
    const leftConstraint = -totalWidth - ITEM_FULL_WIDTH;
    const rightConstraint = ITEM_FULL_WIDTH;

    // Handle Wheel Scroll
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const onWheel = (e: WheelEvent) => {
            e.preventDefault();

            const currentX = x.get();
            // Translate vertical scroll to horizontal movement
            const newX = currentX - e.deltaY;

            // Apply resistance at edges
            if (newX > rightConstraint || newX < leftConstraint) {
                x.set(currentX - e.deltaY * 0.2);
            } else {
                x.set(newX);
            }

            // Debounce snap to nearest item
            clearTimeout(snapTimeout.current);
            snapTimeout.current = setTimeout(() => {
                const finalX = x.get();
                const snappedX = Math.round(finalX / ITEM_FULL_WIDTH) * ITEM_FULL_WIDTH;
                // Note: We don't animate the snap here because mixing manual set() with dragTransition is complex.
                // But dragging will snap. 
                // If we want to snap after wheel, we'd need to use 'animate' from framer-motion.
                // For now, we leave it free-floating on wheel or let user touch to snap.
                // Actually, let's just let it be free on wheel for precise inspection.
            }, 150);
        };

        container.addEventListener('wheel', onWheel, { passive: false });
        return () => container.removeEventListener('wheel', onWheel);
    }, [x, leftConstraint, rightConstraint]);

    return (
        <div ref={containerRef} className="w-full relative h-[700px] flex flex-col items-center justify-center overflow-visible touch-none">

            {/* Background Dial - Parallax - Increased Opacity */}
            <div className="absolute inset-0 flex items-center justify-center opacity-80 pointer-events-none">
                <Dial x={useTransform(x, (v) => v * 0.5)} />
            </div>

            {/* Drag Container - Explicit bg-transparent to catch events */}
            <motion.div
                className="absolute z-20 flex items-center justify-center cursor-grab active:cursor-grabbing w-full h-full bg-transparent"
                style={{ x }}
                drag="x"
                // Constraints loose to allow overscroll
                dragConstraints={{ right: ITEM_FULL_WIDTH, left: -totalWidth - ITEM_FULL_WIDTH }}
                dragElastic={0.05}
                onDragStart={() => { isDragging.current = true; }}
                onDragEnd={() => {
                    setTimeout(() => { isDragging.current = false; }, 50);
                }}
                dragTransition={{
                    power: 0.4,
                    timeConstant: 300,
                    modifyTarget: (target) => {
                        return Math.round(target / ITEM_FULL_WIDTH) * ITEM_FULL_WIDTH;
                    }
                }}
            >
                {projects.map((project, i) => (
                    <WheelCard
                        key={project.id}
                        project={project}
                        index={i}
                        x={x}
                        onClick={() => {
                            if (!isDragging.current) {
                                setSelectedProject(project);
                            }
                        }}
                    />
                ))}
            </motion.div>

            {/* Modal */}
            <ProjectModal
                project={selectedProject!}
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
                colorScheme="primary"
            />
        </div>
    );
}
