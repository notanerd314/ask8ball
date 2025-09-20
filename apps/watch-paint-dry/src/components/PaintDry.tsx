// Helper: maps percent (0-100) to value between min and max
function percentToValue(percent: number, min = 0, max = 1) {
  return min + (percent / 100) * (max - min);
}

// Easing for more natural drying curve (fast start, slow finish)
function easeOutQuad(t: number) {
  return t * (2 - t);
}

// Gloss opacity: stays full till 80%, then fades out by 100%
function glossOpacity(progress: number) {
  if (progress < 80) return 1;
  if (progress < 100) return 1 - (progress - 80) / 20 * 0.9;
  return 0;
}

export default function PaintDry({ color, noiseSize, progress }: { color: string, noiseSize: number, progress: number }) {
  const easedProgress = easeOutQuad(Math.min(progress, 100) / 100) * 100;

  // Base paint layer filter with brightness, saturation, and subtle hue shift
  const baseFilter = `
    brightness(${1 - easedProgress / 1200})
    saturate(${1.3 - easedProgress / 250})
    hue-rotate(${easedProgress / 20}deg)
  `;

  return (
    <div className="relative z-0 w-screen h-screen overflow-hidden bg-white">
      {/* Base paint layer (darker, richer at first) */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: color,
          filter: baseFilter,
        }}
      />

      {/* Gloss highlight - broad sweep */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 65%)`,
          mixBlendMode: "screen",
          opacity: glossOpacity(easedProgress),
        }}
      />

      {/* Radial gloss hotspot */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 35% 25%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.15) 25%, rgba(255,255,255,0) 60%)`,
          mixBlendMode: "soft-light",
          opacity: glossOpacity(easedProgress),
        }}
      />

      {/* Texture layer (fades IN slowly as paint dries) with animated noise */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/texture.png')",
          backgroundSize: `${noiseSize}px`,
          opacity: percentToValue(easedProgress, 0, 0.5),
        }}
      />
    </div>
  );
}
