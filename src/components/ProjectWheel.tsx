import { useRef, useEffect, useCallback } from 'react';
import { motion, useTransform, useMotionValue, animate, MotionValue, useSpring } from 'framer-motion';
import { projects } from '@/data/projects';
import { ArrowUpRight, Github, Box, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CARD_WIDTH = 350;
const CARD_GAP = 50;
const ITEM_FULL_WIDTH = CARD_WIDTH + CARD_GAP;
const CENTER_THRESHOLD = ITEM_FULL_WIDTH * 0.6; // cards within this distance from center are selectable

// Tick Mark Component
const Tick = ({ x, index }: { x: MotionValue<number>, index: number }) => {
    const position = index * 20;

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

    // We use the smoothed x value passed from parent
    const distance = useTransform(x, (latest) => {
        return Math.abs(latest + cardOffset);
    });

    const scale = useTransform(distance, [0, 500], [1.1, 0.65]);
    const opacity = useTransform(distance, [0, 600], [1, 0.4]);
    const rotateY = useTransform(x, (latest) => {
        const pos = latest + cardOffset;
        // Reduced rotation sensitivity for smoother feel
        return -pos / 20;
    });
    const zIndex = useTransform(distance, (d) => Math.round(1000 - d));

    const handleClick = useCallback(() => {
        // Only allow click if card is near center
        const dist = Math.abs(x.get() + cardOffset);
        if (dist < CENTER_THRESHOLD) {
            onClick();
        }
    }, [x, cardOffset, onClick]);

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
            className="absolute top-0 h-[520px] perspective-1000 origin-center"
            onClick={handleClick}
        >
            <div className="w-full h-full relative group">
                <div className="absolute inset-0 bg-card/90 backdrop-blur-xl border border-primary/40 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 group-hover:border-accent group-hover:shadow-[0_0_30px_rgba(45,212,191,0.2)]">

                    {/* Image as absolute background — top 55% of card */}
                    <div
                        className="absolute inset-x-0 top-0 h-[55%]"
                        style={{ background: project.imagePlaceholder || 'linear-gradient(135deg, #1a1a2e, #16213e)' }}
                    >
                        {project.imageUrl && (
                            <img
                                src={project.imageUrl}
                                alt={project.title}
                                className="w-full h-full object-cover object-top opacity-90"
                            />
                        )}
                        {/* Tall gradient: fades image completely before content */}
                        <div className="absolute inset-x-0 bottom-0 h-[120%] bg-gradient-to-b from-transparent via-card/70 to-card" />
                    </div>

                    {/* Badges overlaid on image */}
                    <div className="absolute top-3 left-3 flex items-center gap-2 text-primary bg-background/60 backdrop-blur-sm px-2 py-1 rounded-md border border-primary/30 z-10">
                        <Box className="w-3 h-3" />
                        <span className="text-[10px] font-mono tracking-widest font-bold">
                            PRJ.{project.id.toUpperCase().padStart(3, '0')}
                        </span>
                    </div>
                    <div className="absolute top-3 right-3 p-1.5 rounded-full border border-white/10 bg-background/60 backdrop-blur-sm group-hover:bg-accent/20 transition-colors z-10">
                        <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-accent" />
                    </div>

                    {/* Content sits on top — padding-top pushes it past the image fade */}
                    <div className="relative z-10 flex flex-col h-full pt-[200px] px-6 pb-6">
                        <h3 className="text-2xl font-bold text-foreground mb-2 font-mono group-hover:text-accent transition-colors">
                            {project.title}
                        </h3>

                        <div className="flex flex-wrap gap-2 mb-4">
                            {project.techStack.slice(0, 3).map(tech => (
                                <span key={tech} className="text-[10px] font-mono px-2 py-1 rounded bg-secondary/80 text-secondary-foreground border border-white/10">
                                    {tech}
                                </span>
                            ))}
                        </div>

                        <p className="text-muted-foreground text-sm leading-relaxed font-mono opacity-90 flex-grow line-clamp-3">
                            {project.description}
                        </p>

                        <div className="pt-4 border-t border-white/10 flex items-center justify-between mt-auto">
                            <span className="text-xs font-mono text-accent flex items-center gap-2">
                                <span className="w-2 h-2 bg-accent rounded-full animate-pulse shadow-[0_0_8px_currentColor]" />
                                ONLINE
                            </span>
                            <Github className="w-5 h-5 text-muted-foreground hover:text-white transition-colors" />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default function ProjectWheel({ initialProject }: { initialProject?: string }) {
    const isDragging = useRef(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    // Determine initial index based on passed project slug or default to 2
    const initialIndex = initialProject
        ? projects.findIndex(p => p.slug === initialProject)
        : 2;

    // Fallback to 2 if project not found (-1)
    const activeIndex = initialIndex >= 0 ? initialIndex : 2;

    const x = useMotionValue(-activeIndex * ITEM_FULL_WIDTH);

    // Smooth spring physics for all movements
    const smoothX = useSpring(x, {
        stiffness: 120,  // Much softer (was 150)
        damping: 25,    // More viscous (was 20)
        mass: 0.5       // Heavier feel (was 0.5)
    });

    const totalWidth = (projects.length - 1) * ITEM_FULL_WIDTH;
    const leftConstraint = -totalWidth - ITEM_FULL_WIDTH;
    const rightConstraint = ITEM_FULL_WIDTH;

    const navigateBy = (direction: number) => {
        const currentX = x.get();
        const targetX = Math.round(currentX / ITEM_FULL_WIDTH) * ITEM_FULL_WIDTH + direction * ITEM_FULL_WIDTH;
        const clampedX = Math.max(leftConstraint, Math.min(rightConstraint, targetX));

        // Use smoother animation parameters
        animate(x, clampedX, {
            type: 'spring',
            stiffness: 80,  // Slower, more elegant (was 120)
            damping: 25     // No bounce (was 20)
        });
    };

    // Horizontal-only trackpad listener
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const onWheel = (e: WheelEvent) => {
            if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
            e.preventDefault();
            const currentX = x.get();
            const newX = currentX - e.deltaX;
            if (newX > rightConstraint || newX < leftConstraint) {
                x.set(currentX - e.deltaX * 0.2);
            } else {
                x.set(newX);
            }
        };

        container.addEventListener('wheel', onWheel, { passive: false });
        return () => container.removeEventListener('wheel', onWheel);
    }, [x, leftConstraint, rightConstraint]);

    return (
        <div ref={containerRef} className="w-full relative h-[700px] flex flex-col items-center justify-center overflow-visible touch-none">

            {/* Background Dial - uses smoothed X */}
            <div className="absolute inset-0 flex items-center justify-center opacity-80 pointer-events-none">
                <Dial x={useTransform(smoothX, (v) => v * 0.5)} />
            </div>

            {/* Left Button */}
            <button
                onClick={() => navigateBy(1)}
                className="absolute z-30 p-3 rounded-r-xl border border-l-0 border-primary/30 bg-card/60 backdrop-blur-sm hover:bg-primary/20 hover:border-accent transition-colors 
                max-md:bottom-8 max-md:left-[calc(50%-50px)]
                md:top-1/2 md:-translate-y-1/2 md:left-[calc(50%-270px)]"
                aria-label="Previous project"
            >
                <ChevronLeft className="w-6 h-6 text-foreground" />
            </button>

            {/* Right Button */}
            <button
                onClick={() => navigateBy(-1)}
                className="absolute z-30 p-3 rounded-l-xl border border-r-0 border-primary/30 bg-card/60 backdrop-blur-sm hover:bg-primary/20 hover:border-accent transition-colors
                max-md:bottom-8 max-md:right-[calc(50%-50px)]
                md:top-1/2 md:-translate-y-1/2 md:right-[calc(50%-270px)]"
                aria-label="Next project"
            >
                <ChevronRight className="w-6 h-6 text-foreground" />
            </button>

            {/* Drag Container */}
            <motion.div
                className="absolute z-20 flex items-center justify-center cursor-grab active:cursor-grabbing w-full h-full bg-transparent"
                style={{ x }}
                drag="x"
                dragConstraints={{ right: ITEM_FULL_WIDTH, left: -totalWidth - ITEM_FULL_WIDTH }}
                dragElastic={0.05}
                onDragStart={() => { isDragging.current = true; }}
                onDragEnd={() => {
                    setTimeout(() => { isDragging.current = false; }, 50);
                }}
                dragTransition={{
                    power: 0.1,       // Very low friction (was 0.3)
                    timeConstant: 500, // Long slide (was 250)
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
                        x={smoothX} // Pass smoothed X to cards
                        onClick={() => {
                            if (!isDragging.current) {
                                navigate(`/project/${project.slug}`);
                            }
                        }}
                    />
                ))}
            </motion.div>
        </div>
    );
}
