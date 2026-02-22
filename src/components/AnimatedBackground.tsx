import NeuralNodes from './NeuralNodes';

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none bg-background">
      {/* 
        Subtle static "Aurora" gradient.
        We use large, highly blurred radial gradients in the base colors.
        Positioned strategically to give depth without moving or distracting.
      */}

      {/* Top Right - Primary Blue Glow */}
      <div
        className="absolute -top-[20%] -right-[10%] w-[70vw] h-[70vw] rounded-full blur-[120px] opacity-20"
        style={{
          background: 'radial-gradient(circle, hsl(217 91% 60% / 0.8) 0%, transparent 70%)'
        }}
      />

      {/* Bottom Left - Turquoise Accent Glow */}
      <div
        className="absolute -bottom-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full blur-[120px] opacity-15"
        style={{
          background: 'radial-gradient(circle, hsl(174 72% 56% / 0.8) 0%, transparent 70%)'
        }}
      />

      {/* Subtle deep blue ambient light in the center */}
      <div
        className="absolute top-[30%] left-[20%] w-[50vw] h-[50vw] rounded-full blur-[100px] opacity-10"
        style={{
          background: 'radial-gradient(circle, hsl(217 91% 60% / 0.5) 0%, transparent 60%)'
        }}
      />

      {/* Noise texture overlay to give it a premium "frosted/matte" feel */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      {/* Interactive Neural Nodes Overlay */}
      <NeuralNodes />
    </div>
  );
}
