import { cn } from "@/lib/utils";

/** Esquema didático Yin / lateral / Yang — alinhado às coords de `ynsaMap`. */
export function YnsaSchematic({
  view,
}: {
  view: "ynsa-front" | "ynsa-lateral" | "ynsa-occiput";
}) {
  return (
    <svg
      viewBox="0 0 300 400"
      className="aspect-[3/4] w-full text-ink"
      role="img"
      aria-hidden
    >
      <rect width="300" height="400" className="fill-surface" />
      {view === "ynsa-front" ? <Front /> : view === "ynsa-lateral" ? <Lateral /> : <Occiput />}
    </svg>
  );
}

function hairline() {
  return (
    <path
      d="M68 148 Q150 70 232 148"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
    />
  );
}

function Front() {
  return (
    <g>
      <path
        d="M118 338 C118 368 108 392 88 400 H212 C192 392 182 368 182 338"
        className="fill-bg"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <ellipse cx="150" cy="192" rx="110" ry="156" className="fill-surface" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M68 148 Q150 70 232 148"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.12"
        strokeWidth="16"
        strokeLinecap="round"
      />
      <rect x="132" y="108" width="32" height="84" rx="16" className="fill-ynsa/10" />
      {hairline()}
      <line x1="150" y1="44" x2="150" y2="348" stroke="currentColor" strokeOpacity="0.18" strokeDasharray="3 5" />
      <path d="M108 204 Q150 196 192 204" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <ellipse cx="118" cy="220" rx="16" ry="9" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <ellipse cx="182" cy="220" rx="16" ry="9" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="118" cy="220" r="3" fill="currentColor" />
      <circle cx="182" cy="220" r="3" fill="currentColor" />
      <path d="M150 228 L142 268 Q150 276 158 268 Z" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <path d="M128 308 Q150 320 172 308" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M52 168 Q40 200 52 236" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M248 168 Q260 200 248 236" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <Label x={198} y={86} t="linha do cabelo" />
      <Label x={198} y={150} t="fronte · S" />
      <Label x={16} y={388} t="Yin · frente" />
    </g>
  );
}

function Lateral() {
  return (
    <g>
      <path
        d="M108 52
           C155 22 208 48 228 118
           C242 170 240 230 218 278
           C198 322 165 352 128 358
           C108 362 98 348 104 322
           C108 300 98 292 78 286
           C52 272 44 248 58 232
           C36 210 32 178 48 160
           C58 148 78 146 92 152
           C96 112 98 78 108 52 Z"
        className="fill-surface"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <ellipse cx="144" cy="148" rx="32" ry="36" className="fill-ok/10" />
      <ellipse cx="168" cy="216" rx="24" ry="36" className="fill-primary/10" />
      <ellipse cx="198" cy="196" rx="20" ry="34" className="fill-surface" stroke="currentColor" strokeWidth="1.5" />
      <ellipse cx="198" cy="196" rx="9" ry="16" fill="none" stroke="currentColor" strokeWidth="1.1" />
      <ellipse cx="88" cy="168" rx="10" ry="6" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="88" cy="168" r="2.2" fill="currentColor" />
      <path d="M48 168 C40 176 42 188 50 196" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M62 236 Q78 246 96 240" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M118 48 Q160 36 200 72" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <Label x={102} y={104} t="têmpora · Y" />
      <Label x={70} y={258} t="costeleta" />
      <Label x={214} y={148} t="orelha" />
      <Label x={16} y={388} t="Lateral · Ypsilon e D–I" />
    </g>
  );
}

function Occiput() {
  return (
    <g>
      <path
        d="M150 36
           C222 36 262 110 262 190
           C262 268 220 330 150 348
           C80 330 38 268 38 190
           C38 110 78 36 150 36 Z"
        className="fill-surface"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M118 338 C118 368 108 392 88 400 H212 C192 392 182 368 182 338"
        className="fill-bg"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <ellipse cx="150" cy="80" rx="36" ry="28" className="fill-ink/10" />
      <path d="M70 168 Q150 200 230 168 L222 210 Q150 244 78 210 Z" className="fill-primary/10" />
      <path d="M70 176 Q150 212 230 176" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="150" y1="44" x2="150" y2="348" stroke="currentColor" strokeOpacity="0.18" strokeDasharray="3 5" />
      <path d="M48 188 Q36 220 52 252" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M252 188 Q264 220 248 252" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <Label x={196} y={72} t="vértice · M1" />
      <Label x={186} y={156} t="lambdóide" />
      <Label x={16} y={388} t="Yang · nuca" />
    </g>
  );
}

function Label({ x, y, t, className }: { x: number; y: number; t: string; className?: string }) {
  return (
    <text
      x={x}
      y={y}
      className={cn("fill-muted", className)}
      fontSize="11"
      fontFamily="Figtree, system-ui, sans-serif"
    >
      {t}
    </text>
  );
}
