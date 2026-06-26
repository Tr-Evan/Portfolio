import { useEffect, useState } from 'react';

/**
 * Cycles through `words` with a typewriter effect.
 * @param words   List of strings to cycle through
 * @param speed   Typing speed in ms (default 80)
 * @param delay   Pause before deleting in ms (default 2000)
 */
export function useTypewriter(words: string[], speed = 80, delay = 2000) {
  const [text, setText] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx] ?? '';

    const timeout = setTimeout(
      () => {
        if (!deleting) {
          setText(current.slice(0, charIdx + 1));
          if (charIdx + 1 === current.length) {
            setTimeout(() => setDeleting(true), delay);
          } else {
            setCharIdx((c) => c + 1);
          }
        } else {
          setText(current.slice(0, charIdx - 1));
          if (charIdx - 1 === 0) {
            setDeleting(false);
            setCharIdx(0);
            setWordIdx((i) => (i + 1) % words.length);
          } else {
            setCharIdx((c) => c - 1);
          }
        }
      },
      deleting ? speed / 2 : speed
    );

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [charIdx, deleting, wordIdx]);

  return text;
}
