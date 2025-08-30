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
  if (progress < 100) return 1 - (progress - 80) / 20;
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
    <div className="relative w-screen h-screen overflow-hidden bg-white z-0">
      <h1 className="absolute">{easedProgress}</h1>

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
          background: `linear-gradient(135deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 65%)`,
          mixBlendMode: "screen",
          opacity: glossOpacity(easedProgress),
        }}
      />

      {/* Radial gloss hotspot */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 35% 25%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.15) 25%, rgba(255,255,255,0) 60%)`,
          mixBlendMode: "screen",
          opacity: glossOpacity(easedProgress),
        }}
      />

      {/* Roller streaks */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            90deg,
            rgba(255,255,255,0.08) 0px,
            rgba(255,255,255,0.08) 3px,
            transparent 2px,
            transparent 16px
          )`,
          mixBlendMode: "overlay",
          opacity: 1 - percentToValue(easedProgress, 0, 1),
        }}
      />

      {/* Texture layer (fades IN slowly as paint dries) with animated noise */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/images/watch-paint-dry/texture.png')",
          backgroundSize: `${noiseSize}px`,
          opacity: percentToValue(easedProgress, 0, 0.45),
        }}
      />
    </div>
  );
}
