import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiArrowUp } from 'react-icons/fi';
import { NAV_LINKS, PORTFOLIO_OWNER } from '../utils/constants';
import GradualBlur from './react-bits/GradualBlur';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
      {/* GradualBlur at the very bottom — blurs content upward, giving a fade-to-black feel */}
      <GradualBlur
        position="bottom"
        height="5rem"
        strength={2.5}
        divCount={6}
        curve="bezier"
        exponential
        opacity={0.9}
        zIndex={10}
      />
      <div className="container" style={{ paddingTop: 48, paddingBottom: 40 }}>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 40, marginBottom: 40 }} className="block lg:grid">

          {/* Brand */}
          <div>
            <p style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 16, color: 'var(--fg)', marginBottom: 10, letterSpacing: '-0.01em' }}>
              Evan Troget
            </p>
            <p style={{ fontSize: 13, color: 'var(--fg-3)', lineHeight: 1.7, maxWidth: 240 }}>
              Développeur Fullstack passionné par les interfaces modernes et performantes.
            </p>
          </div>

          {/* Nav */}
          <div>
            <p className="label" style={{ marginBottom: 16 }}>Navigation</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {NAV_LINKS.map((l) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => { e.preventDefault(); document.querySelector(l.href)?.scrollIntoView({ behavior: 'smooth' }); }}
                  whileHover={{ x: 4, color: 'var(--fg)' }}
                  style={{ fontSize: 13, color: 'var(--fg-3)', textDecoration: 'none', transition: 'color .2s' }}
                >
                  {l.label}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="label" style={{ marginBottom: 16 }}>Contact</p>
            <p style={{ fontSize: 13, color: 'var(--fg-3)', marginBottom: 16 }}>{PORTFOLIO_OWNER.email}</p>
            <div style={{ display: 'flex', gap: 8 }}>
              {[
                { icon: <FiGithub size={14} />, href: PORTFOLIO_OWNER.github },
                { icon: <FiLinkedin size={14} />, href: PORTFOLIO_OWNER.linkedin },
                { icon: <FiTwitter size={14} />, href: PORTFOLIO_OWNER.twitter },
              ].map(({ icon, href }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ color: 'var(--fg)', y: -2 }}
                  style={{
                    width: 32, height: 32, borderRadius: 8, display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    border: '1px solid var(--border)', color: 'var(--fg-3)',
                    transition: 'color .2s, border-color .2s',
                  }}
                >
                  {icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <p style={{ fontSize: 12, color: 'var(--fg-3)' }}>
            © 2026 Evan Troget — Fait avec React & TypeScript
          </p>
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ y: -2, color: 'var(--fg)' }}
            style={{
              display: 'flex', alignItems: 'center', gap: 6, fontSize: 12,
              color: 'var(--fg-3)', background: 'none', border: 'none',
              cursor: 'pointer', transition: 'color .2s',
            }}
          >
            Haut de page <FiArrowUp size={13} />
          </motion.button>
        </div>

      </div>
    </footer>
  );
}
