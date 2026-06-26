import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { PASSIONS } from '../utils/constants';

const EASE = [0.4, 0, 0.2, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

type Passion = (typeof PASSIONS)[0];

// ─── Background decorations ──────────────────────────────────────────────────
function Pattern({ pattern, accent }: { pattern: Passion['pattern']; accent: string }) {
  if (pattern === 'dots') return (
    <div style={{ position: 'absolute', inset: 0, opacity: 0.08, pointerEvents: 'none',
      backgroundImage: `radial-gradient(${accent} 1px, transparent 1px)`, backgroundSize: '18px 18px' }} />
  );
  if (pattern === 'grid') return (
    <div style={{ position: 'absolute', inset: 0, opacity: 0.06, pointerEvents: 'none',
      backgroundImage: `linear-gradient(${accent} 1px,transparent 1px),linear-gradient(90deg,${accent} 1px,transparent 1px)`,
      backgroundSize: '24px 24px' }} />
  );
  if (pattern === 'wave') return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.08, pointerEvents: 'none' }} preserveAspectRatio="none">
      <defs>
        <pattern id={`w-${accent.replace('#', '')}`} x="0" y="0" width="56" height="28" patternUnits="userSpaceOnUse">
          <path d="M0 14 Q14 4 28 14 Q42 24 56 14" stroke={accent} strokeWidth="1.5" fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#w-${accent.replace('#', '')})`} />
    </svg>
  );
  return null;
}

// ─── Card ────────────────────────────────────────────────────────────────────
function PassionCard({ passion, index }: { passion: Passion; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.52, delay: index * 0.07, ease: EASE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        borderRadius: 16,
        overflow: 'hidden',           // key for the description drawer effect
        background: 'var(--card)',
        border: `1px solid ${hovered ? `${passion.accent}45` : 'var(--border)'}`,
        height: 190,                  // all same height
        display: 'flex',
        flexDirection: 'column',
        padding: '22px 22px',
        cursor: 'default',
        transition: 'border-color .3s',
      }}
    >
      <Pattern pattern={passion.pattern} accent={passion.accent} />

      {/* Hover background tint */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `radial-gradient(ellipse 80% 80% at 80% 20%, ${passion.accent}12 0%, transparent 60%)`,
        }}
      />

      {/* Top: emoji + dot */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', position: 'relative', zIndex: 1, marginBottom: 'auto' }}>
        <motion.span
          animate={{ scale: hovered ? 1.18 : 1, rotate: hovered ? -6 : 0 }}
          transition={{ duration: 0.25, type: 'spring', stiffness: 220, damping: 14 }}
          style={{ fontSize: 32, lineHeight: 1, display: 'block' }}
        >
          {passion.emoji}
        </motion.span>
        <motion.div
          animate={{ opacity: hovered ? 1 : 0.25, scale: hovered ? 1.3 : 1 }}
          transition={{ duration: 0.25 }}
          style={{
            width: 7, height: 7, borderRadius: '50%', marginTop: 5,
            background: passion.accent,
            boxShadow: hovered ? `0 0 10px ${passion.accent}` : 'none',
          }}
        />
      </div>

      {/* Static text — always visible */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <p style={{
          fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 15,
          color: 'var(--fg)', letterSpacing: '-0.02em', marginBottom: 3, lineHeight: 1.2,
        }}>
          {passion.title}
        </p>
        <p style={{ fontSize: 10.5, fontFamily: 'var(--font-mono)', color: passion.accent, opacity: 0.8 }}>
          {passion.subtitle}
        </p>
      </div>

      {/* Description drawer — slides up from bottom on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0,     opacity: 1 }}
            exit={{   y: '110%', opacity: 0 }}
            transition={{ duration: 0.28, ease: EASE }}
            style={{
              position: 'absolute',
              bottom: 0, left: 0, right: 0,
              padding: '16px 22px 22px',
              background: `linear-gradient(to top, var(--card) 85%, transparent)`,
              zIndex: 2,
            }}
          >
            <p style={{
              fontSize: 12.5, color: 'var(--fg-2)', lineHeight: 1.65,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            } as React.CSSProperties}>
              {passion.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────
export default function PassionsSection() {
  const [ref, visible] = useScrollAnimation<HTMLDivElement>();

  return (
    <section id="passions" style={{ background: 'var(--bg)', paddingTop: 120, paddingBottom: 120 }}>
      <div className="container">

        <motion.div ref={ref} initial="hidden" animate={visible ? 'show' : 'hidden'} variants={fadeUp} style={{ marginBottom: 52 }}>
          <p className="label" style={{ marginBottom: 14 }}>Au-delà du code</p>
          <h2 style={{
            fontFamily: 'var(--font-head)', fontWeight: 800,
            fontSize: 'clamp(1.9rem, 4vw, 3rem)', letterSpacing: '-0.03em', color: 'var(--fg)',
          }}>
            Mes passions
          </h2>
          <p style={{ fontSize: 14.5, color: 'var(--fg-3)', marginTop: 12, maxWidth: 480, lineHeight: 1.7 }}>
            Ce qui me constitue en dehors des pull requests — et qui finit par influencer comment je code.
          </p>
        </motion.div>

        {/* 3×2 uniform grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 14,
        }}
        className="passions-grid-uniform">
          {PASSIONS.map((p, i) => (
            <PassionCard key={p.id} passion={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
