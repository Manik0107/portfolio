export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden bg-background">
      {/* A single, restrained lift behind the 3D piece — no colour blobs */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_72%_22%,hsl(240_8%_11%/0.8),transparent_72%)]" />

      {/* Vignette to settle the edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_38%,hsl(240_10%_2%/0.9)_100%)]" />

      {/* Very light paper grain */}
      <div className="grain absolute inset-0 opacity-[0.02] mix-blend-soft-light" />
    </div>
  );
}
