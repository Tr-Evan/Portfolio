import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiDownload, FiMail, FiMapPin } from 'react-icons/fi';
import DarkVeil from './react-bits/DarkVeil';
import { PORTFOLIO_OWNER } from '../utils/constants';

const FADE = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
});

export default function HeroSection() {
  const stats = [
    { v: 'Mastère Dev',        l: 'Sup de Vinci 2026' },
    { v: '3 ans alt.',         l: '1 an + 2 ans'       },
    { v: '3ème place',         l: 'Hackathon 2026'     },
    { v: '120 ★',              l: 'open-source'        },
  ];

  return (
    <section id="hero" style={{ position: 'relative', minHeight: '100svh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>

      {/* DarkVeil background */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}>
        <DarkVeil hueShift={0} noiseIntensity={0} scanlineIntensity={0} speed={0.8} scanlineFrequency={0} warpAmount={0} />
      </div>

      {/* Minimal vignette */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 110% 100% at 50% 50%, transparent 15%, rgba(9,9,14,0.4) 100%)',
      }} />

      {/* Content */}
      <div className="container" style={{ position: 'relative', zIndex: 10, paddingTop: 108, paddingBottom: 96 }}>

        {/* Top badges */}
        <motion.div {...FADE(0)} style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 40 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 11, fontFamily: 'var(--font-mono)',
            padding: '5px 14px', borderRadius: 8,
            background: 'rgba(74,222,128,0.07)', border: '1px solid rgba(74,222,128,0.18)', color: '#4ade80',
          }}>
            <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.8, repeat: Infinity }}
              style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />
            Disponible oct. 2026
          </span>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, fontFamily: 'var(--font-mono)',
            padding: '5px 12px', borderRadius: 8,
            background: 'rgba(129,140,248,0.07)', border: '1px solid rgba(129,140,248,0.18)', color: 'var(--accent)',
          }}>
            🎯 CDI · CDD
          </span>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, fontFamily: 'var(--font-mono)',
            padding: '5px 12px', borderRadius: 8,
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'var(--fg-3)',
          }}>
            <FiMapPin size={11} /> {PORTFOLIO_OWNER.location}
          </span>
        </motion.div>

        {/* Two-col: text left, stats right */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 64, alignItems: 'center' }}
          className="hero-grid">

          {/* Left — text */}
          <div>
            <motion.h1 {...FADE(0.05)} style={{
              fontFamily: 'var(--font-head)', fontWeight: 800,
              fontSize: 'clamp(3rem, 8vw, 5.5rem)',
              lineHeight: 1.02, letterSpacing: '-0.04em',
              color: 'var(--fg)', marginBottom: 16,
            }}>
              {PORTFOLIO_OWNER.name}
            </motion.h1>

            <motion.p {...FADE(0.12)} style={{
              fontFamily: 'var(--font-head)', fontWeight: 500,
              fontSize: 'clamp(1.1rem, 2.5vw, 1.45rem)',
              color: 'var(--fg-2)', letterSpacing: '-0.02em', marginBottom: 6,
            }}>
              {PORTFOLIO_OWNER.title}
            </motion.p>

            <motion.p {...FADE(0.16)} style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.8rem',
              color: 'var(--fg-3)', marginBottom: 26, letterSpacing: '0.05em',
            }}>
              {PORTFOLIO_OWNER.stack}
            </motion.p>

            <motion.p {...FADE(0.22)} style={{
              fontSize: 15, color: 'var(--fg-2)', lineHeight: 1.8, maxWidth: 480, marginBottom: 36,
            }}>
              {PORTFOLIO_OWNER.subtitle}
            </motion.p>

            <motion.div {...FADE(0.3)} style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <button className="btn-primary"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                <FiMail size={13} /> Me recruter
              </button>
              <button className="btn-ghost"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
                Mes projets
              </button>
              <a href={PORTFOLIO_OWNER.github} target="_blank" rel="noopener noreferrer" className="btn-ghost"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <FiGithub size={13} /> GitHub
              </a>
              <a href="#" className="btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <FiDownload size={13} /> CV PDF
              </a>
            </motion.div>
          </div>

          {/* Right — compact stats card */}
          <motion.div {...FADE(0.2)} className="hero-stats-card" style={{ width: 200, flexShrink: 0 }}>
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 16, overflow: 'hidden',
            }}>
              {stats.map(({ v, l }, i) => (
                <div key={l} style={{
                  padding: '16px 20px',
                  borderBottom: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                }}>
                  <p style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 15, color: 'var(--fg)', lineHeight: 1.1, marginBottom: 3 }}>{v}</p>
                  <p style={{ fontSize: 10.5, color: 'var(--fg-3)', fontFamily: 'var(--font-mono)' }}>{l}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Socials + hint */}
        <motion.div {...FADE(0.45)} style={{
          display: 'flex', gap: 12, marginTop: 48, paddingTop: 28,
          borderTop: '1px solid rgba(255,255,255,0.07)', alignItems: 'center', flexWrap: 'wrap',
        }}>
          {[
            { icon: <FiGithub size={15} />,   href: PORTFOLIO_OWNER.github,   label: 'GitHub' },
            { icon: <FiLinkedin size={15} />, href: PORTFOLIO_OWNER.linkedin, label: 'LinkedIn' },
          ].map(({ icon, href, label }) => (
            <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer"
              whileHover={{ y: -1 }} className="btn-ghost"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
              {icon} {label}
            </motion.a>
          ))}
          <span style={{ fontSize: 12, color: 'var(--fg-3)', marginLeft: 4, fontFamily: 'var(--font-mono)' }}>
            Appuyez{' '}
            <kbd style={{ padding: '1px 5px', borderRadius: 4, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', fontSize: 11 }}>⌘K</kbd>
            {' '}pour naviguer rapidement
          </span>
        </motion.div>
      </div>
    </section>
  );
}
