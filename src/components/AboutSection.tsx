import { memo } from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiMapPin, FiMail, FiAward } from 'react-icons/fi';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { PORTFOLIO_OWNER, TIMELINE } from '../utils/constants';
import BorderGlow from './react-bits/BorderGlow';

const EASE = [0.4, 0, 0.2, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

function TimelineItem({ item, index }: { item: typeof TIMELINE[0]; index: number }) {
  const [ref, visible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
  return (
    <motion.div ref={ref} initial="hidden" animate={visible ? 'show' : 'hidden'} variants={fadeUp}
      style={{ display: 'grid', gridTemplateColumns: '64px 1px 1fr', gap: '0 22px', paddingBottom: index < TIMELINE.length - 1 ? 28 : 0 }}>
      <div style={{ textAlign: 'right', paddingTop: 3 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)' }}>{item.year}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{
          width: 7, height: 7, borderRadius: '50%', marginTop: 4, flexShrink: 0, zIndex: 1,
          background: index === 0 ? item.color : 'transparent',
          border: `1.5px solid ${index === 0 ? item.color : 'var(--border-strong)'}`,
        }} />
        {index < TIMELINE.length - 1 && <div style={{ flex: 1, width: 1, background: 'var(--border)', marginTop: 7 }} />}
      </div>
      <div style={{ paddingBottom: 4 }}>
        <p style={{ fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: 13.5, color: 'var(--fg)', marginBottom: 2 }}>{item.title}</p>
        <p style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: item.color, marginBottom: 7 }}>{item.company}</p>
        <p style={{ fontSize: 13, color: 'var(--fg-2)', lineHeight: 1.7 }}>{item.description}</p>
      </div>
    </motion.div>
  );
}

// ─── Redesigned profile bio card ─────────────────────────────────────────────
function ProfileBioCard() {
  return (
    <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={fadeUp}>
      <BorderGlow backgroundColor="var(--card)" borderRadius={16} glowRadius={50} glowIntensity={0.75}
        colors={['#60a5fa', '#f472b6', '#facc15']} edgeSensitivity={18} coneSpread={30} fillOpacity={0.28}>
        <div style={{ overflow: 'hidden', borderRadius: 16 }}>

          {/* Photo — large, full width */}
          <div style={{ position: 'relative', height: 220, overflow: 'hidden' }}>
            <img
              src={PORTFOLIO_OWNER.avatar}  
              alt={PORTFOLIO_OWNER.name}
              loading="lazy"
              decoding="async"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
            />
            {/* Gradient to card bg */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: '55%',
              background: 'linear-gradient(to bottom, transparent, var(--card))',
            }} />
            {/* Name + title overlay */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 22px 18px' }}>
              <p style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 18, color: 'var(--fg)', lineHeight: 1.1 }}>
                {PORTFOLIO_OWNER.name}
              </p>
              <p style={{ fontSize: 12, color: 'var(--fg-2)', marginTop: 3 }}>
                {PORTFOLIO_OWNER.title}
              </p>
            </div>
          </div>

          {/* Bio + details */}
          <div style={{ padding: '18px 22px 22px' }}>
            <p style={{ fontSize: 13.5, color: 'var(--fg-2)', lineHeight: 1.8, marginBottom: 18 }}>
              {PORTFOLIO_OWNER.bio}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 9, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
              {[
                { icon: <FiMapPin size={12} />, value: PORTFOLIO_OWNER.location },
                { icon: <FiMail size={12} />,   value: PORTFOLIO_OWNER.email },
                { icon: <FiAward size={12} />,  value: `Disponible dès ${PORTFOLIO_OWNER.availableFrom}` },
              ].map(({ icon, value }) => (
                <div key={value} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ color: 'var(--accent)', opacity: 0.7, flexShrink: 0 }}>{icon}</span>
                  <span style={{ fontSize: 12.5, color: 'var(--fg-2)' }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </BorderGlow>
    </motion.div>
  );
}

// ─── Value prop card ──────────────────────────────────────────────────────────
function ValuePropCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <BorderGlow backgroundColor="var(--card)" borderRadius={12} glowRadius={36} glowIntensity={0.7}
      colors={['#60a5fa', '#f472b6', '#facc15']} edgeSensitivity={25} coneSpread={30} fillOpacity={0.3}>
      <div style={{ padding: '18px 18px' }}>
        <span style={{ fontSize: 18, display: 'block', marginBottom: 10 }}>{icon}</span>
        <p style={{ fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: 13, color: 'var(--fg)', marginBottom: 5 }}>{title}</p>
        <p style={{ fontSize: 12.5, color: 'var(--fg-3)', lineHeight: 1.65 }}>{desc}</p>
      </div>
    </BorderGlow>
  );
}

function AboutSection() {
  const [ref, visible] = useScrollAnimation<HTMLDivElement>();
  return (
    <section id="about" style={{ background: 'var(--surface)', paddingTop: 120, paddingBottom: 120 }}>
      <div className="container">
        <motion.div ref={ref} initial="hidden" animate={visible ? 'show' : 'hidden'} variants={fadeUp} style={{ marginBottom: 64 }}>
          <p className="label" style={{ marginBottom: 14 }}>À propos</p>
          <h2 style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: 'clamp(1.9rem, 4vw, 3rem)', letterSpacing: '-0.03em', color: 'var(--fg)' }}>
            Fraichement diplômé.<br /><span className="grad">Pas forcément débutant.</span>
          </h2>
        </motion.div>

        <div className="two-col">

          {/* Left — redesigned profile card + value props */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            <ProfileBioCard />

            <motion.button initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
              whileHover={{ opacity: 0.78 }} whileTap={{ scale: 0.98 }}
              className="btn-ghost" style={{ justifyContent: 'center', gap: 8, padding: '12px 0' }}>
              <FiDownload size={13} /> Télécharger le CV (PDF)
            </motion.button>

            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
              <p className="label" style={{ marginBottom: 16 }}>Ce que j'apporte</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <ValuePropCard icon="🧠" title="Apprendre vite" desc="Je creuse jusqu'à vraiment comprendre, pas juste faire fonctionner." />
                <ValuePropCard icon="🔨" title="Projets concrets" desc="Stages, hackathon, open-source. Pas que des slides." />
                <ValuePropCard icon="👁️" title="Soin du détail" desc="Interfaces soignées, animations fluides, accessibilité." />
                <ValuePropCard icon="🤝" title="Sans l'ego" desc="Je veux apprendre autant que contribuer. Le feedback, j'aime ça." />
              </div>
            </motion.div>
          </div>

          {/* Right — timeline */}
          <div>
            <p className="label" style={{ marginBottom: 28 }}>Mon parcours</p>
            {TIMELINE.map((item, i) => <TimelineItem key={item.year + i} item={item} index={i} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(AboutSection);
