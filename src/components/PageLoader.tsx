import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PageLoaderProps {
  onDone: () => void;
}

export default function PageLoader({ onDone }: PageLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'filling' | 'leaving'>('filling');

  useEffect(() => {
    // Fill progress bar over ~1.8s with eased steps
    const steps = [
      { target: 35,  delay: 0    },
      { target: 65,  delay: 400  },
      { target: 88,  delay: 900  },
      { target: 100, delay: 1500 },
    ];

    const timers: ReturnType<typeof setTimeout>[] = [];

    steps.forEach(({ target, delay }) => {
      timers.push(setTimeout(() => setProgress(target), delay));
    });

    // Start wipe-up after bar reaches 100
    timers.push(setTimeout(() => setPhase('leaving'), 1900));

    // Tell parent it's done after curtain leaves viewport
    timers.push(setTimeout(onDone, 2700));

    return () => timers.forEach(clearTimeout);
  }, [onDone]);

  return (
    <AnimatePresence>
      {phase === 'filling' && (
        <motion.div
          key="loader"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.72, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: '#09090e',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: 32,
          }}
        >
          {/* Logo mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}
          >
            {/* Monogram */}
            <div style={{
              width: 52, height: 52, borderRadius: 14,
              background: 'linear-gradient(135deg, rgba(129,140,248,0.18), rgba(167,139,250,0.1))',
              border: '1px solid rgba(129,140,248,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: 18,
              color: 'rgba(129,140,248,0.9)',
              letterSpacing: '-0.02em',
            }}>
              AR
            </div>

            {/* Name */}
            <div style={{ textAlign: 'center' }}>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.15 }}
                style={{
                  fontFamily: 'var(--font-head)', fontWeight: 700,
                  fontSize: 22, color: 'rgba(240,240,248,0.9)',
                  letterSpacing: '-0.025em', marginBottom: 4,
                }}
              >
                Evan Troget
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: 11,
                  color: 'rgba(136,136,168,0.7)',
                  letterSpacing: '0.12em',
                }}
              >
                PORTFOLIO 2026
              </motion.p>
            </div>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{ width: 160, display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}
          >
            <div style={{
              width: '100%', height: 2, borderRadius: 99,
              background: 'rgba(255,255,255,0.06)', overflow: 'hidden',
            }}>
              <motion.div
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                style={{
                  height: '100%', borderRadius: 99,
                  background: 'linear-gradient(90deg, rgba(129,140,248,0.7), rgba(167,139,250,0.9))',
                }}
              />
            </div>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 10,
              color: 'rgba(136,136,168,0.5)', letterSpacing: '0.1em',
            }}>
              {progress}%
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
