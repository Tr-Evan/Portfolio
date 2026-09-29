import { useEffect, useState, memo } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiCode, FiZap, FiHeart, FiMail, FiGithub } from 'react-icons/fi';
import Dock from './react-bits/Dock';

function DockNav() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const navItems = [
    { icon: <FiUser size={16} style={{ color: 'rgba(255,255,255,0.7)' }} />,   label: 'À propos', onClick: () => go('about') },
    { icon: <FiCode size={16} style={{ color: 'rgba(255,255,255,0.7)' }} />,   label: 'Projets',  onClick: () => go('projects') },
    { icon: <FiZap  size={16} style={{ color: 'rgba(255,255,255,0.7)' }} />,   label: 'Stack',    onClick: () => go('skills') },
    { icon: <FiHeart size={16} style={{ color: 'rgba(255,255,255,0.7)' }} />,  label: 'Passions', onClick: () => go('passions') },
    // Visual separator — contact item styled with accent
    {
      icon: <FiMail size={16} style={{ color: 'var(--primary)' }} />,
      label: 'Contact',
      onClick: () => go('contact'),
      className: 'ring-1 ring-[var(--primary)]/25 bg-[var(--primary)]/[0.08]',
    },
    { icon: <FiGithub size={15} style={{ color: 'rgba(255,255,255,0.5)' }} />, label: 'GitHub', onClick: () => window.open('https://github.com/Tr-Evan', '_blank', 'noopener') },
  ];

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: 'flex',
        justifyContent: 'center',
        pointerEvents: 'none',
        height: 80,
      }}
    >
      <motion.div
        initial={{ y: -70, opacity: 0 }}
        animate={mounted ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        style={{ pointerEvents: 'auto', position: 'relative', width: '100%', maxWidth: 700 }}
      >
        <Dock
          items={navItems}
          panelHeight={52}
          baseItemSize={38}
          magnification={54}
          distance={150}
          spring={{ mass: 0.1, stiffness: 170, damping: 14 }}
        />
      </motion.div>
    </div>
  );
}

export default memo(DockNav);
