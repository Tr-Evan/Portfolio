import { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { PROJECTS, PROJECT_CATEGORIES, PORTFOLIO_OWNER } from '../utils/constants';
import BorderGlow from './react-bits/BorderGlow';

const EASE = [0.4, 0, 0.2, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

const CARD_COLORS: Record<string, string[]> = {
  '#818cf8': ['#818cf8', '#a78bfa', '#60a5fa'],
  '#34d399': ['#34d399', '#6ee7b7', '#a7f3d0'],
  '#60a5fa': ['#60a5fa', '#93c5fd', '#818cf8'],
  '#f59e0b': ['#f59e0b', '#fbbf24', '#fb923c'],
  '#a78bfa': ['#a78bfa', '#c4b5fd', '#818cf8'],
};

function ProjectCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const colors = CARD_COLORS[project.color] ?? ['#818cf8', '#a78bfa', '#60a5fa'];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
    >
      <BorderGlow
        backgroundColor="var(--card)"
        borderRadius={14}
        colors={colors}
        glowColor="220 70 70"
        glowRadius={50}
        glowIntensity={0.8}
        edgeSensitivity={20}
        coneSpread={28}
        fillOpacity={0.35}
        className="h-full"
      >
        <div
          style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Image */}
          <div style={{ position: 'relative', height: 172, overflow: 'hidden', borderRadius: '14px 14px 0 0' }}>
            <motion.img
              src={project.image} alt={project.name}
              loading="lazy"
              decoding="async"
              animate={{ scale: hovered ? 1.05 : 1 }}
              transition={{ duration: 0.5 }}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 45%, rgba(9,9,14,0.75))' }} />

            {/* Hover actions */}
            <motion.div
              animate={{ opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              style={{ position: 'absolute', top: 12, right: 12, display: 'flex', gap: 6 }}
            >
              {[
                { icon: <FiGithub size={13} />, href: project.github },
                { icon: <FiExternalLink size={13} />, href: project.demo },
              ].map(({ icon, href }, i) => (
                <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    width: 30, height: 30, borderRadius: 8,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(9,9,14,0.82)', backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: 'rgba(255,255,255,0.85)', textDecoration: 'none',
                  }}
                >
                  {icon}
                </a>
              ))}
            </motion.div>
          </div>

          {/* Body */}
          <div style={{ padding: '20px 22px 24px', display: 'flex', flexDirection: 'column', flex: 1, gap: 10 }}>
            <p style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 15, color: 'var(--fg)' }}>
              {project.name}
            </p>
            <p style={{ fontSize: 12.5, color: 'var(--fg-2)', lineHeight: 1.7, flex: 1 }}>
              {project.description}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, paddingTop: 4 }}>
              {project.tech.slice(0, 4).map((t) => (
                <span key={t} className="tag" style={{ cursor: 'default' }}>{t}</span>
              ))}
              {project.tech.length > 4 && (
                <span className="tag" style={{ cursor: 'default' }}>+{project.tech.length - 4}</span>
              )}
            </div>
          </div>
        </div>
      </BorderGlow>
    </motion.div>
  );
}

function ProjectsSection() {
  const [active, setActive] = useState('all');
  const [ref, visible] = useScrollAnimation<HTMLDivElement>();
  const filtered = active === 'all' ? PROJECTS : PROJECTS.filter((p) => p.category === active);

  return (
    <section id="projects" style={{ background: 'var(--bg)', paddingTop: 120, paddingBottom: 120 }}>
      <div className="container">
        <motion.div ref={ref} initial="hidden" animate={visible ? 'show' : 'hidden'} variants={fadeUp} style={{ marginBottom: 56 }}>
          <p className="label" style={{ marginBottom: 14 }}>Projets</p>
          <h2 style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: 'clamp(1.9rem, 4vw, 3rem)', letterSpacing: '-0.03em', color: 'var(--fg)' }}>
            Ce que j'ai construit
          </h2>
        </motion.div>

        {/* Filters */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 44 }}>
          {PROJECT_CATEGORIES.map((c) => (
            <button key={c.key} onClick={() => setActive(c.key)} className={`tag ${active === c.key ? 'active' : ''}`}>
              {c.label}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
          </AnimatePresence>
        </motion.div>

        {/* Footer link */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          style={{ marginTop: 48, display: 'flex', justifyContent: 'center' }}>
          <a href={PORTFOLIO_OWNER.github} target="_blank" rel="noopener noreferrer" className="btn-ghost"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
            <FiGithub size={14} /> Voir tous mes repos GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default memo(ProjectsSection);
