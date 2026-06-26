import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiHome, FiUser, FiCode, FiZap, FiHeart, FiMail, FiGithub, FiCommand } from 'react-icons/fi';
import Dock from './react-bits/Dock';

interface DockNavProps {
  onOpenCmd?: () => void;
}

export default function DockNav({ onOpenCmd }: DockNavProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const navItems = [
    { icon: <FiHome size={16} style={{ color: 'rgba(255,255,255,0.7)' }} />,   label: 'Accueil',  onClick: () => go('hero') },
    { icon: <FiUser size={16} style={{ color: 'rgba(255,255,255,0.7)' }} />,   label: 'À propos', onClick: () => go('about') },
    { icon: <FiCode size={16} style={{ color: 'rgba(255,255,255,0.7)' }} />,   label: 'Projets',  onClick: () => go('projects') },
    { icon: <FiZap  size={16} style={{ color: 'rgba(255,255,255,0.7)' }} />,   label: 'Stack',    onClick: () => go('skills') },
    { icon: <FiHeart size={16} style={{ color: 'rgba(255,255,255,0.7)' }} />,  label: 'Passions', onClick: () => go('passions') },
    // Visual separator — contact item styled with accent
    {
      icon: <FiMail size={16} style={{ color: '#818cf8' }} />,
      label: 'Contact',
      onClick: () => go('contact'),
      className: 'ring-1 ring-[#818cf8]/25 bg-[#818cf8]/[0.08]',
    },
    { icon: <FiGithub size={15} style={{ color: 'rgba(255,255,255,0.5)' }} />, label: 'GitHub', onClick: () => window.open('https://github.com/alex-renard', '_blank', 'noopener') },
    ...(onOpenCmd
      ? [{ icon: <FiCommand size={13} style={{ color: 'rgba(255,255,255,0.4)' }} />, label: '⌘K', onClick: onOpenCmd }]
      : []),
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
