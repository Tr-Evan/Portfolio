import { useEffect, useRef } from 'react';

/**
 * Dual-ring custom cursor (desktop only — hidden on mobile via CSS).
 */
export function useCustomCursor() {
  const mouse = useRef({ x: 0, y: 0 });
  const ring  = useRef({ x: 0, y: 0 });
  const raf   = useRef<number>(0);

  useEffect(() => {
    const dot   = document.createElement('div');
    const ringEl = document.createElement('div');
    dot.className   = 'cursor-dot';
    ringEl.className = 'cursor-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ringEl);

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      dot.style.left = `${e.clientX}px`;
      dot.style.top  = `${e.clientY}px`;
    };

    const onIn  = () => { dot.classList.add('hovering');    ringEl.classList.add('hovering'); };
    const onOut = () => { dot.classList.remove('hovering'); ringEl.classList.remove('hovering'); };

    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12;
      ringEl.style.left = `${ring.current.x}px`;
      ringEl.style.top  = `${ring.current.y}px`;
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);

    let controller = new AbortController();
    const addListeners = () => {
      controller.abort();
      controller = new AbortController();
      document.querySelectorAll('a, button, [data-cursor="pointer"]').forEach((el) => {
        el.addEventListener('mouseenter', onIn,  { signal: controller.signal });
        el.addEventListener('mouseleave', onOut, { signal: controller.signal });
      });
    };
    addListeners();

    window.addEventListener('mousemove', onMove);

    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      controller.abort();
      cancelAnimationFrame(raf.current);
      window.removeEventListener('mousemove', onMove);
      observer.disconnect();
      dot.remove();
      ringEl.remove();
    };
  }, []);
}
