import { motion } from 'framer-motion';

interface GradientOrb {
  id: number;
  x: number;
  y: number;
  scale: number;
  color: string;
  duration: number;
}

export default function AnimatedBackground() {
  // Create multiple gradient orbs with different properties
  const orbs: GradientOrb[] = [
    { id: 1, x: 10, y: 20, scale: 1.5, color: 'hsl(217 91% 60% / 0.15)', duration: 20 },
    { id: 2, x: 80, y: 70, scale: 1.8, color: 'hsl(174 72% 56% / 0.12)', duration: 25 },
    { id: 3, x: 50, y: 50, scale: 1.2, color: 'hsl(45 93% 58% / 0.08)', duration: 18 },
    { id: 4, x: 25, y: 80, scale: 1.4, color: 'hsl(217 91% 60% / 0.1)', duration: 22 },
    { id: 5, x: 70, y: 30, scale: 1.6, color: 'hsl(174 72% 56% / 0.1)', duration: 24 },
  ];

  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
      {/* Gradient mesh background */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Animated orbs */}
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full blur-3xl"
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: `${400 * orb.scale}px`,
            height: `${400 * orb.scale}px`,
            background: orb.color,
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -40, 30, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Additional subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
    </div>
  );
}
