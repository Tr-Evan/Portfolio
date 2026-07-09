import React, { useRef, useCallback, useState, useEffect, type ReactNode } from 'react';

interface BorderGlowProps {
  children?: ReactNode;
  className?: string;
  edgeSensitivity?: number;
  glowColor?: string;
  backgroundColor?: string;
  borderRadius?: number;
  glowRadius?: number;
  glowIntensity?: number;
  coneSpread?: number;
  animated?: boolean;
  colors?: string[];
  fillOpacity?: number;
}

function parseHSL(hslStr: string): { h: number; s: number; l: number } {
  const match = hslStr.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
  if (!match) return { h: 40, s: 80, l: 80 };
  return { h: parseFloat(match[1]), s: parseFloat(match[2]), l: parseFloat(match[3]) };
}

function buildBoxShadow(glowColor: string, intensity: number): string {
  const { h, s, l } = parseHSL(glowColor);
  const base = `${h}deg ${s}% ${l}%`;
  const layers: [number, number, number, number, number, boolean][] = [
    [0,0,0,1,100,true],[0,0,1,0,60,true],[0,0,3,0,50,true],
    [0,0,6,0,40,true],[0,0,15,0,30,true],[0,0,25,2,20,true],[0,0,50,2,10,true],
    [0,0,1,0,60,false],[0,0,3,0,50,false],[0,0,6,0,40,false],
    [0,0,15,0,30,false],[0,0,25,2,20,false],[0,0,50,2,10,false],
  ];
  return layers.map(([x,y,blur,spread,alpha,inset]) => {
    const a = Math.min(alpha * intensity, 100);
    return `${inset ? 'inset ' : ''}${x}px ${y}px ${blur}px ${spread}px hsl(${base} / ${a}%)`;
  }).join(', ');
}

function easeOutCubic(x: number) { return 1 - Math.pow(1 - x, 3); }
function easeInCubic(x: number)  { return x * x * x; }

interface AnimateOpts {
  start?: number; end?: number; duration?: number; delay?: number;
  ease?: (t: number) => number; onUpdate: (v: number) => void; onEnd?: () => void;
}
function animateValue({ start=0, end=100, duration=1000, delay=0, ease=easeOutCubic, onUpdate, onEnd }: AnimateOpts) {
  const t0 = performance.now() + delay;
  const tick = () => {
    const elapsed = performance.now() - t0;
    const t = Math.min(elapsed / duration, 1);
    onUpdate(start + (end - start) * ease(t));
    if (t < 1) requestAnimationFrame(tick);
    else if (onEnd) onEnd();
  };
  setTimeout(() => requestAnimationFrame(tick), delay);
}

const GRADIENT_POSITIONS = ['80% 55%','69% 34%','8% 6%','41% 38%','86% 85%','82% 18%','51% 4%'];
const COLOR_MAP = [0,1,2,0,1,2,1];

function buildMeshGradients(colors: string[]): string[] {
  return [
    ...GRADIENT_POSITIONS.map((pos, i) => {
      const c = colors[Math.min(COLOR_MAP[i], colors.length - 1)];
      return `radial-gradient(at ${pos}, ${c} 0px, transparent 50%)`;
    }),
    `linear-gradient(${colors[0]} 0 100%)`,
  ];
}

const BorderGlow: React.FC<BorderGlowProps> = ({
  children,
  className = '',
  edgeSensitivity = 30,
  glowColor = '40 80 80',
  backgroundColor = '#120F17',
  borderRadius = 14,
  glowRadius = 40,
  glowIntensity = 1.0,
  coneSpread = 25,
  animated = false,
  colors = ['#818cf8', '#a78bfa', '#60a5fa'],
  fillOpacity = 0.5,
}) => {
  const cardRef       = useRef<HTMLDivElement>(null);
  const pendingRef    = useRef(false);
  const rawMouseRef   = useRef({ clientX: 0, clientY: 0 });
  const [isHovered,     setIsHovered]     = useState(false);
  const [cursorAngle,   setCursorAngle]   = useState(45);
  const [edgeProximity, setEdgeProximity] = useState(0);
  const [sweepActive,   setSweepActive]   = useState(false);

  const getCenter = useCallback((el: HTMLElement) => {
    const { width, height } = el.getBoundingClientRect();
    return [width / 2, height / 2];
  }, []);

  const getEdgeProximity = useCallback((el: HTMLElement, x: number, y: number) => {
    const [cx, cy] = getCenter(el);
    const dx = x - cx, dy = y - cy;
    let kx = Infinity, ky = Infinity;
    if (dx !== 0) kx = cx / Math.abs(dx);
    if (dy !== 0) ky = cy / Math.abs(dy);
    return Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
  }, [getCenter]);

  const getCursorAngle = useCallback((el: HTMLElement, x: number, y: number) => {
    const [cx, cy] = getCenter(el);
    const dx = x - cx, dy = y - cy;
    if (dx === 0 && dy === 0) return 0;
    let deg = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
    if (deg < 0) deg += 360;
    return deg;
  }, [getCenter]);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    rawMouseRef.current = { clientX: e.clientX, clientY: e.clientY };
    if (pendingRef.current) return;
    pendingRef.current = true;
    requestAnimationFrame(() => {
      pendingRef.current = false;
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = rawMouseRef.current.clientX - rect.left;
      const y = rawMouseRef.current.clientY - rect.top;
      setEdgeProximity(getEdgeProximity(card, x, y));
      setCursorAngle(getCursorAngle(card, x, y));
    });
  }, [getEdgeProximity, getCursorAngle]);

  useEffect(() => {
    if (!animated) return;
    setSweepActive(true);
    setCursorAngle(110);
    animateValue({ duration: 500, onUpdate: v => setEdgeProximity(v / 100) });
    animateValue({ ease: easeInCubic, duration: 1500, end: 50, onUpdate: v => setCursorAngle(355 * (v / 100) + 110) });
    animateValue({ ease: easeOutCubic, delay: 1500, duration: 2250, start: 50, end: 100, onUpdate: v => setCursorAngle(355 * (v / 100) + 110) });
    animateValue({ ease: easeInCubic, delay: 2500, duration: 1500, start: 100, end: 0,
      onUpdate: v => setEdgeProximity(v / 100), onEnd: () => setSweepActive(false) });
  }, [animated]);

  const colorSensitivity = edgeSensitivity + 20;
  const isVisible    = isHovered || sweepActive;
  const borderOp = isVisible ? Math.max(0, (edgeProximity * 100 - colorSensitivity) / (100 - colorSensitivity)) : 0;
  const glowOp   = isVisible ? Math.max(0, (edgeProximity * 100 - edgeSensitivity)  / (100 - edgeSensitivity))  : 0;
  const meshGrads = buildMeshGradients(colors);
  const borderBg  = meshGrads.map(g => `${g} border-box`);
  const fillBg    = meshGrads.map(g => `${g} padding-box`);
  const angleDeg  = `${cursorAngle.toFixed(3)}deg`;
  const trans = isVisible ? 'opacity 0.25s ease-out' : 'opacity 0.75s ease-in-out';

  const maskBorder = `conic-gradient(from ${angleDeg} at center, black ${coneSpread}%, transparent ${coneSpread+15}%, transparent ${100-coneSpread-15}%, black ${100-coneSpread}%)`;
  const maskFill   = [
    'linear-gradient(to bottom,black,black)',
    'radial-gradient(ellipse at 50% 50%,black 40%,transparent 65%)',
    'radial-gradient(ellipse at 66% 66%,black 5%,transparent 40%)',
    'radial-gradient(ellipse at 33% 33%,black 5%,transparent 40%)',
    'radial-gradient(ellipse at 66% 33%,black 5%,transparent 40%)',
    'radial-gradient(ellipse at 33% 66%,black 5%,transparent 40%)',
    `conic-gradient(from ${angleDeg} at center,transparent 5%,black 15%,black 85%,transparent 95%)`,
  ].join(', ');
  const maskGlow = `conic-gradient(from ${angleDeg} at center,black 2.5%,transparent 10%,transparent 90%,black 97.5%)`;

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      className={`relative grid isolate border border-white/[0.07] ${className}`}
      style={{
        background: backgroundColor,
        borderRadius: `${borderRadius}px`,
        transform: 'translate3d(0,0,0.01px)',
        boxShadow: 'rgba(0,0,0,0.12) 0 2px 4px,rgba(0,0,0,0.08) 0 8px 24px',
      }}
    >
      {/* mesh border */}
      <div className="absolute inset-0 rounded-[inherit] -z-[1]" style={{
        border: '1px solid transparent',
        background: [`linear-gradient(${backgroundColor} 0 100%) padding-box`,'linear-gradient(rgb(255 255 255/0%) 0% 100%) border-box',...borderBg].join(', '),
        opacity: borderOp, maskImage: maskBorder, WebkitMaskImage: maskBorder,
        transition: trans,
      }} />

      {/* mesh fill */}
      <div className="absolute inset-0 rounded-[inherit] -z-[1]" style={{
        border: '1px solid transparent',
        background: fillBg.join(', '),
        maskImage: maskFill, WebkitMaskImage: maskFill,
        maskComposite: 'subtract,add,add,add,add,add',
        WebkitMaskComposite: 'source-out,source-over,source-over,source-over,source-over,source-over',
        opacity: borderOp * fillOpacity, mixBlendMode: 'soft-light', transition: trans,
      } as React.CSSProperties} />

      {/* outer glow */}
      <span className="absolute pointer-events-none z-[1] rounded-[inherit]" style={{
        inset: `${-glowRadius}px`,
        maskImage: maskGlow, WebkitMaskImage: maskGlow,
        opacity: glowOp, mixBlendMode: 'plus-lighter', transition: trans,
      } as React.CSSProperties}>
        <span className="absolute rounded-[inherit]" style={{
          inset: `${glowRadius}px`,
          boxShadow: buildBoxShadow(glowColor, glowIntensity),
        }} />
      </span>

      <div className="flex flex-col relative overflow-auto z-[1]">
        {children}
      </div>
    </div>
  );
};

export default React.memo(BorderGlow);
