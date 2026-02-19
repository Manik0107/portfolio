import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Project } from '@/data/projects';

interface ProjectModalProps {
    project: Project;
    isOpen: boolean;
    onClose: () => void;
    colorScheme: 'primary' | 'accent' | 'gold';
}

export default function ProjectModal({ project, isOpen, onClose, colorScheme }: ProjectModalProps) {
    const colorClasses = {
        primary: 'from-primary/20 to-primary/5',
        accent: 'from-accent/20 to-accent/5',
        gold: 'from-gold/20 to-gold/5',
    };

    const accentColors = {
        primary: 'text-primary',
        accent: 'text-accent',
        gold: 'text-gold',
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: 'spring', stiffness: 80, damping: 15, mass: 1 }}
                        className="fixed inset-4 md:inset-8 lg:inset-16 z-50 overflow-hidden"
                    >
                        <div className="glass-card h-full overflow-y-auto">
                            <div className="relative">

                                {/* Image as absolute-positioned background */}
                                <div
                                    className="w-full h-[200px] md:h-[240px] relative overflow-hidden"
                                    style={{ background: project.imagePlaceholder || 'linear-gradient(135deg, #1a1a2e, #16213e)' }}
                                >
                                    {project.imageUrl ? (
                                        <img
                                            src={project.imageUrl}
                                            alt={`${project.title} preview`}
                                            className="w-full h-full object-cover object-top"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <span className="text-5xl md:text-7xl font-bold font-mono text-white/10 select-none">{project.title}</span>
                                        </div>
                                    )}
                                    {/* Tall gradient — fully fades before header text */}
                                    <div className="absolute inset-x-0 bottom-0 h-[80%] bg-gradient-to-b from-transparent via-background/60 to-background pointer-events-none" />
                                </div>

                                {/* Header overlaps the fade zone — no hard boundary */}
                                <div className={`bg-gradient-to-br ${colorClasses[colorScheme]} -mt-16 relative z-10 p-6 md:p-8 border-b border-border/50`}>
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <h2 className="text-3xl md:text-4xl font-bold mb-2">{project.title}</h2>
                                            <p className="text-lg text-muted-foreground">{project.description}</p>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={onClose}
                                            className="ml-4 hover:bg-background/50"
                                        >
                                            <X className="h-6 w-6" />
                                        </Button>
                                    </div>

                                    {/* Action buttons */}
                                    <div className="flex flex-wrap gap-3">
                                        <Button
                                            asChild
                                            className="bg-primary hover:bg-primary/90 glow-primary"
                                        >
                                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                                <Github className="mr-2 h-4 w-4" />
                                                View on GitHub
                                            </a>
                                        </Button>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 md:p-8 space-y-8">
                                    {/* Problem Statement */}
                                    <section>
                                        <h3 className={`text-xl font-semibold mb-3 ${accentColors[colorScheme]}`}>
                                            Problem Statement
                                        </h3>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {project.problemStatement}
                                        </p>
                                    </section>

                                    {/* Long Description */}
                                    <section>
                                        <h3 className={`text-xl font-semibold mb-3 ${accentColors[colorScheme]}`}>
                                            Overview
                                        </h3>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {project.longDescription}
                                        </p>
                                    </section>

                                    {/* Key Features */}
                                    <section>
                                        <h3 className={`text-xl font-semibold mb-3 ${accentColors[colorScheme]}`}>
                                            Key Features
                                        </h3>
                                        <ul className="space-y-2">
                                            {project.features.map((feature, index) => (
                                                <motion.li
                                                    key={index}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.1 }}
                                                    className="flex items-start gap-3 text-muted-foreground"
                                                >
                                                    <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${colorScheme === 'primary' ? 'bg-primary' : colorScheme === 'accent' ? 'bg-accent' : 'bg-gold'} flex-shrink-0`} />
                                                    <span>{feature}</span>
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </section>

                                    {/* Architecture */}
                                    <section>
                                        <h3 className={`text-xl font-semibold mb-3 ${accentColors[colorScheme]}`}>
                                            Architecture
                                        </h3>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {project.architecture}
                                        </p>
                                    </section>

                                    {/* Tech Stack */}
                                    <section>
                                        <h3 className={`text-xl font-semibold mb-3 ${accentColors[colorScheme]}`}>
                                            Tech Stack
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {project.techStack.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="tech-tag hover:bg-secondary/80 transition-colors"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </section>

                                    {/* Metrics if available */}
                                    {project.metrics && project.metrics.length > 0 && (
                                        <section>
                                            <h3 className={`text-xl font-semibold mb-3 ${accentColors[colorScheme]}`}>
                                                Impact & Metrics
                                            </h3>
                                            <ul className="space-y-2">
                                                {project.metrics.map((metric, index) => (
                                                    <li
                                                        key={index}
                                                        className="flex items-start gap-3 text-muted-foreground"
                                                    >
                                                        <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${colorScheme === 'primary' ? 'bg-primary' : colorScheme === 'accent' ? 'bg-accent' : 'bg-gold'} flex-shrink-0`} />
                                                        <span>{metric}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </section>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
