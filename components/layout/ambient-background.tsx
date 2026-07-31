const routeNodes = [
  [18, 224],
  [88, 158],
  [160, 181],
  [232, 100],
  [309, 122],
  [371, 48]
] as const;

export function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <svg
        viewBox="0 0 390 270"
        className="ambient-route absolute right-[-5rem] top-[42vh] h-[19rem] w-[28rem] max-w-[88vw] overflow-visible"
      >
        <path
          d="M18 224 L88 158 L160 181 L232 100 L309 122 L371 48"
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M88 158 L61 102 L104 58 M232 100 L260 48 L331 25 M160 181 L207 231 L284 213"
          fill="none"
          stroke="rgba(176,38,255,0.18)"
          strokeDasharray="3 8"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />

        {routeNodes.map(([x, y], index) => (
          <rect
            key={`${x}-${y}`}
            x={x - 3}
            y={y - 3}
            width="6"
            height="6"
            fill={index === 3 ? "#b026ff" : "#080808"}
            stroke={index === 3 ? "#b026ff" : "rgba(255,255,255,0.34)"}
            strokeWidth="1"
            className="ambient-route-node"
            style={{ animationDelay: `${index * 0.42}s` }}
          />
        ))}

        <rect
          width="5"
          height="5"
          fill="#f5f5f5"
          className="ambient-route-signal"
        />

        <path
          d="M328 235 H373 V190"
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
        <rect
          x="323"
          y="231"
          width="8"
          height="8"
          fill="none"
          stroke="rgba(125,231,242,0.28)"
          strokeWidth="1"
        />
      </svg>

      <div className="ambient-corner absolute bottom-[17vh] left-[5vw] hidden h-28 w-28 border-b border-l border-white/[0.08] md:block">
        <span className="absolute -bottom-1 -left-1 h-2 w-2 border border-signal-violet/50 bg-ink-950 shadow-[0_0_12px_rgba(176,38,255,0.35)]" />
        <span className="absolute -right-1 -top-1 h-1.5 w-1.5 bg-white/35" />
      </div>

      <div className="ambient-bracket absolute right-[8vw] top-[22vh] h-14 w-14 border-r border-t border-white/[0.07]" />

      <div className="ambient-rail absolute right-[2.5vw] top-[13vh] hidden h-[74vh] w-px bg-white/[0.07] lg:block">
        <span className="absolute -left-1 top-[18%] h-px w-2 bg-white/15" />
        <span className="absolute -left-1 top-[46%] h-px w-2 bg-white/15" />
        <span className="absolute -left-1 top-[72%] h-px w-2 bg-signal-violet/25" />
        <span className="ambient-rail-signal absolute -left-[2px] top-0 h-[5px] w-[5px] bg-signal-violet shadow-[0_0_12px_rgba(176,38,255,0.72)]" />
      </div>

      <span className="ambient-particle ambient-particle-a absolute left-[13vw] top-[18vh] h-1.5 w-1.5 border border-white/25" />
      <span className="ambient-particle ambient-particle-b absolute bottom-[28vh] left-[31vw] h-1 w-1 bg-signal-violet/55" />
      <span className="ambient-particle ambient-particle-c absolute right-[24vw] top-[31vh] hidden h-1.5 w-1.5 border border-signal-cyan/25 sm:block" />
      <span className="ambient-particle ambient-particle-d absolute bottom-[12vh] right-[13vw] h-1 w-1 bg-white/30" />
    </div>
  );
}
