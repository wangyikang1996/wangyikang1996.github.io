import { useEffect } from 'react';

// `g`+key GitHub-style navigation. Press `g` then a/e/s/p/w/v to jump to a
// section, or `g` then h to return to the top. Ignored while typing in inputs.
export function useKeyboardShortcuts() {
  useEffect(() => {
    let armed = false;
    let disarm;

    const onKey = (e) => {
      const tgt = e.target;
      if (tgt instanceof HTMLInputElement || tgt instanceof HTMLTextAreaElement) return;
      if (tgt && tgt.isContentEditable) return;

      if (e.key === 'g') {
        armed = true;
        clearTimeout(disarm);
        disarm = setTimeout(() => {
          armed = false;
        }, 800);
        return;
      }

      if (!armed) return;
      const map = {
        a: 'about',
        e: 'experience',
        s: 'stack',
        p: 'projects',
        w: 'writing',
        v: 'voices',
        h: 'top',
      };
      const id = map[e.key];
      if (id) {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }
      armed = false;
      clearTimeout(disarm);
    };

    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      clearTimeout(disarm);
    };
  }, []);
}
