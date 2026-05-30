import { useEffect } from 'react';
import { SITE } from '../data';

// `g`+key GitHub-style navigation. Press `g` then a section's shortcut to jump
// to it, or `g` then h to return to the top. Ignored while typing in inputs.
// The chord map is derived from SITE.sections so it never drifts from the nav.
const SHORTCUT_MAP = {
  ...Object.fromEntries(SITE.sections.map((s) => [s.shortcut, s.id])),
  h: 'top',
};

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
      const id = SHORTCUT_MAP[e.key];
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
