import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useKeyboardShortcuts } from './useKeyboardShortcuts';

// Every section the `g`+key map can target, with its triggering key.
const SECTIONS = {
  a: 'about',
  e: 'experience',
  s: 'stack',
  p: 'projects',
  w: 'writing',
  v: 'voices',
  h: 'top',
};

function makeSection(id) {
  const el = document.createElement('div');
  el.id = id;
  el.scrollIntoView = vi.fn();
  document.body.appendChild(el);
  return el;
}

const press = (key, target = window) =>
  target.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));

describe('useKeyboardShortcuts', () => {
  let sections;

  beforeEach(() => {
    sections = {};
    Object.values(SECTIONS).forEach((id) => {
      sections[id] = makeSection(id);
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    document.body.innerHTML = '';
  });

  it('scrolls to the matching section for every g+key pair', () => {
    renderHook(() => useKeyboardShortcuts());
    Object.entries(SECTIONS).forEach(([key, id]) => {
      press('g');
      press(key);
      expect(sections[id].scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
    });
  });

  it('does nothing for a section key pressed without arming with g first', () => {
    renderHook(() => useKeyboardShortcuts());
    press('a');
    expect(sections.about.scrollIntoView).not.toHaveBeenCalled();
  });

  it('consumes the arm on a match, so the next key needs a fresh g', () => {
    renderHook(() => useKeyboardShortcuts());
    press('g');
    press('a'); // match → about
    expect(sections.about.scrollIntoView).toHaveBeenCalledTimes(1);
    press('e'); // no longer armed
    expect(sections.experience.scrollIntoView).not.toHaveBeenCalled();
  });

  it('ignores an unknown key after g and disarms (so the next key does nothing)', () => {
    renderHook(() => useKeyboardShortcuts());
    press('g');
    press('z'); // not in the map — disarms
    press('a'); // no longer armed
    expect(sections.about.scrollIntoView).not.toHaveBeenCalled();
  });

  it('ignores shortcuts while typing in an input', () => {
    renderHook(() => useKeyboardShortcuts());
    const input = document.createElement('input');
    document.body.appendChild(input);
    press('g', input);
    press('a', input);
    expect(sections.about.scrollIntoView).not.toHaveBeenCalled();
  });

  it('ignores shortcuts while typing in a textarea', () => {
    renderHook(() => useKeyboardShortcuts());
    const ta = document.createElement('textarea');
    document.body.appendChild(ta);
    press('g', ta);
    press('e', ta);
    expect(sections.experience.scrollIntoView).not.toHaveBeenCalled();
  });

  it('ignores shortcuts while focused in a contentEditable element', () => {
    renderHook(() => useKeyboardShortcuts());
    const div = document.createElement('div');
    // jsdom does not derive isContentEditable from the attribute, so set it directly.
    Object.defineProperty(div, 'isContentEditable', { value: true });
    document.body.appendChild(div);
    press('g', div);
    press('s', div);
    expect(sections.stack.scrollIntoView).not.toHaveBeenCalled();
  });

  it('disarms after the 800ms window so a late second key does nothing', () => {
    vi.useFakeTimers();
    renderHook(() => useKeyboardShortcuts());
    press('g');
    vi.advanceTimersByTime(801);
    press('a');
    expect(sections.about.scrollIntoView).not.toHaveBeenCalled();
  });

  it('stays armed within the 800ms window', () => {
    vi.useFakeTimers();
    renderHook(() => useKeyboardShortcuts());
    press('g');
    vi.advanceTimersByTime(799);
    press('a');
    expect(sections.about.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('removes its listener on unmount', () => {
    const { unmount } = renderHook(() => useKeyboardShortcuts());
    unmount();
    press('g');
    press('a');
    expect(sections.about.scrollIntoView).not.toHaveBeenCalled();
  });
});
