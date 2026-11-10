/**
 * Procedural "grain scatter" artwork, rendered as static SVG on the server.
 * Used as the brand's signature texture: each product has its own grain colours,
 * echoing the grain window on the Jibby Foods packs.
 *
 * Deterministic (seeded), so server and client output always match.
 */

function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Props = {
  colors: string[];
  seed?: number;
  count?: number;
  /** Grain size in viewBox units (viewBox is 400 × 400). */
  size?: [number, number];
  /** "round" for millet/sorghum, "kernel" for maize, "slice" for plantain/yam chips. */
  shape?: "round" | "kernel" | "slice";
  className?: string;
  /** 0–1: how much grains cluster towards the bottom (a "spill"). */
  spill?: number;
  /** Width ÷ height of the box the art fills, so grains keep their size in wide frames. */
  aspect?: number;
};

export function GrainField({
  colors,
  seed = 7,
  count = 140,
  size = [6, 10],
  shape = "round",
  className,
  spill = 0,
  aspect = 1,
}: Props) {
  const rand = mulberry32(seed);
  const W = Math.round(400 * aspect);
  const grains = Array.from({ length: Math.round(count * aspect) }, (_, i) => {
    const x = rand() * W;
    let y = rand() * 400;
    if (spill > 0) y = 400 - Math.pow(rand(), 1 + spill * 2.5) * 400;
    const r = size[0] + rand() * (size[1] - size[0]);
    const rot = rand() * 180;
    const fill = colors[i % colors.length];
    const shade = rand() * 0.25;
    return { x, y, r, rot, fill, shade, i };
  });

  return (
    <svg
      viewBox={`0 0 ${W} 400`}
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {grains.map((g) => {
        const common = { fill: g.fill, transform: `rotate(${g.rot.toFixed(1)} ${g.x.toFixed(1)} ${g.y.toFixed(1)})` };
        const hl = (
          <ellipse
            cx={(g.x - g.r * 0.25).toFixed(1)}
            cy={(g.y - g.r * 0.25).toFixed(1)}
            rx={(g.r * 0.28).toFixed(1)}
            ry={(g.r * 0.18).toFixed(1)}
            fill="#fff"
            opacity={0.28 - g.shade}
          />
        );
        if (shape === "kernel") {
          return (
            <g key={g.i} {...common}>
              <path
                d={`M ${g.x - g.r * 0.85} ${g.y - g.r * 0.55} C ${g.x - g.r * 0.85} ${g.y - g.r * 1.25} ${g.x + g.r * 0.85} ${g.y - g.r * 1.25} ${g.x + g.r * 0.85} ${g.y - g.r * 0.55} C ${g.x + g.r * 0.8} ${g.y + g.r * 0.2} ${g.x + g.r * 0.35} ${g.y + g.r * 1.15} ${g.x} ${g.y + g.r * 1.2} C ${g.x - g.r * 0.35} ${g.y + g.r * 1.15} ${g.x - g.r * 0.8} ${g.y + g.r * 0.2} ${g.x - g.r * 0.85} ${g.y - g.r * 0.55} Z`}
              />
              {hl}
            </g>
          );
        }
        if (shape === "slice") {
          return (
            <g key={g.i} {...common}>
              <ellipse cx={g.x} cy={g.y} rx={g.r * 1.4} ry={g.r * 0.9} />
              <ellipse cx={g.x} cy={g.y} rx={g.r * 1.05} ry={g.r * 0.62} fill="#fff" opacity={0.18} />
            </g>
          );
        }
        return (
          <g key={g.i} {...common}>
            <ellipse cx={g.x} cy={g.y} rx={g.r} ry={g.r * 0.86} />
            {hl}
          </g>
        );
      })}
    </svg>
  );
}
