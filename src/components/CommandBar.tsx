import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiArrowRight, FiX } from 'react-icons/fi';
import { CMD_ACTIONS } from '../utils/constants';

interface CommandBarProps {
  open: boolean;
  onClose: () => void;
}

type Action = (typeof CMD_ACTIONS)[0];

export default function CommandBar({ open, onClose }: CommandBarProps) {
  const [query,    setQuery]    = useState('');
  const [selected, setSelected] = useState(0);
  const [copied,   setCopied]   = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = CMD_ACTIONS.filter((a) =>
    a.label.toLowerCase().includes(query.toLowerCase())
  );

  // Focus input on open
  useEffect(() => {
    if (open) {
      setQuery('');
      setSelected(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Reset selection when query changes
  useEffect(() => { setSelected(0); }, [query]);

  const execute = useCallback((action: Action) => {
    if (action.type === 'nav') {
      document.querySelector(action.href!)?.scrollIntoView({ behavior: 'smooth' });
      onClose();
    } else if (action.type === 'link') {
      window.open(action.href, '_blank', 'noopener');
      onClose();
    } else if (action.type === 'copy' && action.value) {
      navigator.clipboard.writeText(action.value);
      setCopied(true);
      setTimeout(() => { setCopied(false); onClose(); }, 1200);
    } else if (action.type === 'action' && action.id === 'cv') {
      // Simulate CV download
      const a = document.createElement('a');
      a.href = '#';
      a.download = 'CV_Alex_Renard.pdf';
      onClose();
    }
  }, [onClose]);

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelected((s) => Math.min(s + 1, filtered.length - 1));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelected((s) => Math.max(s - 1, 0));
      }
      if (e.key === 'Enter' && filtered[selected]) {
        execute(filtered[selected]);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, filtered, selected, execute, onClose]);

  const typeColors: Record<string, string> = {
    nav:    'var(--accent)',
    link:   '#34d399',
    copy:   '#fb923c',
    action: '#f59e0b',
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            style={{
              position: 'fixed', inset: 0, zIndex: 200,
              background: 'rgba(0,0,0,0.55)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
            }}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0,   scale: 1 }}
            exit={{   opacity: 0, y: -20, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
            style={{
              position: 'fixed',
              top: '18%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 'calc(100% - 32px)',
              maxWidth: 560,
              zIndex: 201,
              borderRadius: 16,
              overflow: 'hidden',
              background: 'rgba(14,14,20,0.92)',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)',
              backdropFilter: 'blur(24px)',
            }}
          >
            {/* Search bar */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '14px 16px',
              borderBottom: '1px solid rgba(255,255,255,0.07)',
            }}>
              <FiSearch size={16} style={{ color: 'var(--fg-3)', flexShrink: 0 }} />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher une action…"
                style={{
                  flex: 1, background: 'none', border: 'none',
                  outline: 'none', color: 'var(--fg)',
                  fontFamily: 'var(--font-body)',
                  fontSize: 14,
                }}
              />
              <button
                onClick={onClose}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: 24, height: 24, borderRadius: 6,
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'var(--fg-3)', cursor: 'pointer', flexShrink: 0,
                }}
              >
                <FiX size={12} />
              </button>
            </div>

            {/* Results */}
            <div style={{ padding: '6px', maxHeight: 340, overflowY: 'auto' }}>
              {filtered.length === 0 ? (
                <p style={{ padding: '20px 16px', textAlign: 'center', fontSize: 13, color: 'var(--fg-3)' }}>
                  Aucune action trouvée
                </p>
              ) : (
                filtered.map((action, i) => {
                  const isSelected = i === selected;
                  return (
                    <motion.button
                      key={action.id}
                      onClick={() => execute(action)}
                      onMouseEnter={() => setSelected(i)}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.025 }}
                      style={{
                        width: '100%', display: 'flex', alignItems: 'center',
                        gap: 12, padding: '10px 12px', borderRadius: 9,
                        background: isSelected ? 'rgba(255,255,255,0.07)' : 'transparent',
                        border: 'none', cursor: 'pointer',
                        textAlign: 'left', transition: 'background .12s',
                      }}
                    >
                      {/* Icon */}
                      <span style={{
                        width: 32, height: 32, borderRadius: 8,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.07)',
                        fontSize: 15, flexShrink: 0,
                      }}>
                        {action.id === 'email' && copied ? '✅' : action.icon}
                      </span>

                      {/* Label */}
                      <span style={{ flex: 1, fontSize: 14, color: 'var(--fg)', fontWeight: 450 }}>
                        {action.id === 'email' && copied ? 'Copié !' : action.label}
                      </span>

                      {/* Type badge */}
                      <span style={{
                        fontSize: 10, fontFamily: 'var(--font-mono)',
                        color: typeColors[action.type] ?? 'var(--fg-3)',
                        background: `${typeColors[action.type] ?? 'transparent'}15`,
                        padding: '2px 7px', borderRadius: 4,
                        border: `1px solid ${typeColors[action.type] ?? 'transparent'}25`,
                        flexShrink: 0,
                      }}>
                        {action.type}
                      </span>

                      {isSelected && (
                        <FiArrowRight size={13} style={{ color: 'var(--fg-3)', flexShrink: 0 }} />
                      )}
                    </motion.button>
                  );
                })
              )}
            </div>

            {/* Footer hint */}
            <div style={{
              padding: '8px 16px',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              display: 'flex', gap: 16,
            }}>
              {[
                ['↑↓', 'naviguer'],
                ['↵', 'exécuter'],
                ['Esc', 'fermer'],
              ].map(([key, desc]) => (
                <span key={key} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <kbd style={{
                    fontSize: 10, fontFamily: 'var(--font-mono)',
                    padding: '2px 5px', borderRadius: 4,
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'var(--fg-3)',
                  }}>{key}</kbd>
                  <span style={{ fontSize: 11, color: 'var(--fg-3)' }}>{desc}</span>
                </span>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
