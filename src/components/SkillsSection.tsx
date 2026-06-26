import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { SKILLS, SKILL_CATEGORIES } from '../utils/constants';

const EASE = [0.4, 0, 0.2, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

function SkillRow({ skill, visible, index }: { skill: typeof SKILLS[0]; visible: boolean; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={visible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: 'relative' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 16 }}>{skill.icon}</span>
          <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--fg)' }}>{skill.name}</span>
        </div>
        <motion.span
          animate={{ opacity: hovered ? 1 : 0.45 }}
          style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)' }}
        >
          {skill.level}%
        </motion.span>
      </div>

      <div className="skill-track">
        <motion.div
          className="skill-fill"
          initial={{ width: 0 }}
          animate={visible ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1.2, ease: EASE, delay: index * 0.07 + 0.1 }}
          style={{ background: hovered ? 'var(--accent)' : 'var(--fg)', transition: 'background .25s' }}
        />
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState('frontend');
  const [ref, visible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });
  const [headerRef, headerVisible] = useScrollAnimation<HTMLDivElement>();

  const filtered = SKILLS.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" style={{ background: 'var(--surface)', paddingTop: 120, paddingBottom: 120 }}>
      <div className="container">

        {/* Header */}
        <motion.div
          ref={headerRef}
          initial="hidden"
          animate={headerVisible ? 'show' : 'hidden'}
          variants={fadeUp}
          style={{ marginBottom: 56 }}
        >
          <p className="label" style={{ marginBottom: 12 }}>Compétences</p>
          <h2 style={{
            fontFamily: 'var(--font-head)', fontWeight: 800,
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            letterSpacing: '-0.025em', color: 'var(--fg)',
          }}>
            Ma stack technique
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }} className="block lg:grid">

          {/* Left — bars */}
          <div>
            {/* Category tabs */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 32 }}>
              {SKILL_CATEGORIES.map((c) => (
                <button
                  key={c.key}
                  onClick={() => setActiveCategory(c.key)}
                  className={`tag ${activeCategory === c.key ? 'active' : ''}`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Skills list */}
            <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: 22 }}
                >
                  {filtered.map((skill, i) => (
                    <SkillRow key={skill.name} skill={skill} visible={visible} index={i} />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right — summary card + icon grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* Domain summary */}
            <div className="card" style={{ padding: 24 }}>
              <p className="label" style={{ marginBottom: 20 }}>Répartition</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                {SKILL_CATEGORIES.map((c) => {
                  const items = SKILLS.filter((s) => s.category === c.key);
                  const avg = Math.round(items.reduce((s, i) => s + i.level, 0) / items.length);
                  return (
                    <div key={c.key}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
                        <span style={{ fontSize: 13, color: 'var(--fg-2)' }}>{c.label}</span>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)' }}>{avg}%</span>
                      </div>
                      <div className="skill-track">
                        <motion.div
                          className="skill-fill"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${avg}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.1, ease: EASE }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Icon grid — all techs */}
            <div className="card" style={{ padding: 24 }}>
              <p className="label" style={{ marginBottom: 20 }}>Technologies</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                {SKILLS.map((s, i) => (
                  <motion.div
                    key={s.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                    whileHover={{ scale: 1.08 }}
                    title={`${s.name} — ${s.level}%`}
                    style={{
                      display: 'flex', flexDirection: 'column',
                      alignItems: 'center', gap: 5, padding: '10px 4px',
                      borderRadius: 10, border: '1px solid var(--border)',
                      background: 'transparent', cursor: 'default',
                      transition: 'border-color .2s, background .2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-strong)';
                      e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border)';
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <span style={{ fontSize: 18 }}>{s.icon}</span>
                    <span style={{ fontSize: 10, color: 'var(--fg-3)', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>
                      {s.name.split(' / ')[0].split(' ')[0]}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
