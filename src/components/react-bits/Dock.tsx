import {
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
  type SpringOptions,
  AnimatePresence,
} from 'framer-motion';
import React, { Children, cloneElement, useEffect, useMemo, useRef, useState } from 'react';

export type DockItemData = {
  icon: React.ReactNode;
  label: React.ReactNode;
  onClick: () => void;
  className?: string;
};

export type DockProps = {
  items: DockItemData[];
  className?: string;
  distance?: number;
  panelHeight?: number;
  baseItemSize?: number;
  dockHeight?: number;
  magnification?: number;
  spring?: SpringOptions;
};

type DockItemProps = {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  mouseX: MotionValue<number>;
  spring: SpringOptions;
  distance: number;
  baseItemSize: number;
  magnification: number;
  label?: React.ReactNode;
};

function DockItem({ children, className = '', onClick, mouseX, spring, distance, magnification, baseItemSize, label }: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isHovered = useMotionValue(0);

  const mouseDistance = useTransform(mouseX, (val) => {
    const rect = ref.current?.getBoundingClientRect() ?? { x: 0, width: baseItemSize };
    return val - rect.x - baseItemSize / 2;
  });

  const targetSize = useTransform(mouseDistance, [-distance, 0, distance], [baseItemSize, magnification, baseItemSize]);
  const size = useSpring(targetSize, spring);

  return (
    <motion.div
      ref={ref}
      style={{ width: size, height: size }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      onClick={onClick}
      onKeyDown={(e: React.KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick?.(); } }}
      className={`relative inline-flex items-center justify-center rounded-xl ${className}`}
      tabIndex={0}
      role="button"
      aria-label={typeof label === 'string' ? label : undefined}
    >
      {Children.map(children, (child) =>
        React.isValidElement(child)
          ? cloneElement(child as React.ReactElement<{ isHovered?: MotionValue<number> }>, { isHovered })
          : child
      )}
    </motion.div>
  );
}

type DockLabelProps = { className?: string; children: React.ReactNode; isHovered?: MotionValue<number>; };

function DockLabel({ children, className = '', isHovered }: DockLabelProps) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!isHovered) return;
    const unsub = isHovered.on('change', (v) => setVisible(v === 1));
    return unsub;
  }, [isHovered]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.15 }}
          className={`${className} absolute top-full mt-1.5 left-1/2 w-fit whitespace-pre rounded-lg border border-white/10 bg-[#0d0d14]/90 px-2.5 py-1 text-[11px] text-white/75`}
          role="tooltip"
          style={{ x: '-50%', fontFamily: 'var(--font-body)', backdropFilter: 'blur(8px)' }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DockIcon({ children, className = '' }: { className?: string; children: React.ReactNode }) {
  return <div className={`flex items-center justify-center ${className}`}>{children}</div>;
}

export default function Dock({
  items,
  className = '',
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = 58,
  distance = 160,
  panelHeight = 56,
  dockHeight = 240,
  baseItemSize = 40,
}: DockProps) {
  const mouseX = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);

  const maxHeight = useMemo(() => Math.max(dockHeight, magnification + magnification / 2 + 4), [magnification, dockHeight]);
  const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight]);
  const height = useSpring(heightRow, spring);

  return (
    <motion.div style={{ height, scrollbarWidth: 'none' }} className="mx-2 flex max-w-full items-center">
      <motion.div
        onMouseMove={({ clientX }) => { isHovered.set(1); mouseX.set(clientX); }}
        onMouseLeave={() => { isHovered.set(0); mouseX.set(Infinity); }}
        className={`${className} absolute top-2.5 left-1/2 -translate-x-1/2 flex items-center w-fit gap-1.5 rounded-xl pt-2 pb-2 px-3`}
        style={{
          height: panelHeight,
          background: 'rgba(10,10,16,0.78)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          border: '1px solid rgba(255,255,255,0.09)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.45), 0 1px 0 rgba(255,255,255,0.05) inset',
        }}
        role="toolbar"
        aria-label="Navigation"
      >
        {items.map((item, i) => (
          <DockItem
            key={i}
            onClick={item.onClick}
            className={item.className ?? ''}
            mouseX={mouseX}
            spring={spring}
            distance={distance}
            magnification={magnification}
            baseItemSize={baseItemSize}
            label={item.label}
          >
            <DockIcon>{item.icon}</DockIcon>
            <DockLabel>{item.label}</DockLabel>
          </DockItem>
        ))}
      </motion.div>
    </motion.div>
  );
}
