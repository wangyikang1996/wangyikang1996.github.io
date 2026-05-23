import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useActiveSection } from './useActiveSection';

const IDS = ['about', 'experience', 'stack'];

// Build an IntersectionObserver entry the hook understands.
const entry = (target, top, isIntersecting = true) => ({
  target,
  isIntersecting,
  boundingClientRect: { top },
});

describe('useActiveSection', () => {
  let observers;
  let els;

  beforeEach(() => {
    observers = [];
    class MockIO {
      constructor(cb, opts) {
        this.cb = cb;
        this.opts = opts;
        this.observed = new Set();
        observers.push(this);
      }
      observe(el) {
        this.observed.add(el);
      }
      unobserve(el) {
        this.observed.delete(el);
      }
      disconnect() {
        this.observed.clear();
      }
      trigger(entries) {
        this.cb(entries);
      }
    }
    vi.stubGlobal('IntersectionObserver', MockIO);

    els = {};
    IDS.forEach((id) => {
      const el = document.createElement('section');
      el.id = id;
      document.body.appendChild(el);
      els[id] = el;
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    document.body.innerHTML = '';
  });

  it('starts with no active section', () => {
    const { result } = renderHook(() => useActiveSection(IDS));
    expect(result.current).toBeNull();
  });

  it('observes every section element that exists in the DOM', () => {
    renderHook(() => useActiveSection(IDS));
    const io = observers[0];
    IDS.forEach((id) => expect(io.observed.has(els[id])).toBe(true));
  });

  it('activates the top-most intersecting section', () => {
    const { result } = renderHook(() => useActiveSection(IDS));
    const io = observers[0];
    act(() => {
      io.trigger([entry(els.about, 300), entry(els.experience, 40), entry(els.stack, 600)]);
    });
    expect(result.current).toBe('experience');
  });

  it('ignores entries that are not intersecting', () => {
    const { result } = renderHook(() => useActiveSection(IDS));
    const io = observers[0];
    act(() => {
      io.trigger([entry(els.about, 10, false)]);
    });
    expect(result.current).toBeNull();
  });

  it('creates no observer when none of the ids resolve to elements', () => {
    renderHook(() => useActiveSection(['nope', 'missing']));
    expect(observers).toHaveLength(0);
  });

  it('returns null and creates no observer when IntersectionObserver is unavailable', () => {
    const original = window.IntersectionObserver;
    delete window.IntersectionObserver;
    try {
      const { result } = renderHook(() => useActiveSection(IDS));
      expect(result.current).toBeNull();
      expect(observers).toHaveLength(0);
    } finally {
      window.IntersectionObserver = original;
    }
  });

  it('disconnects the observer on unmount', () => {
    const { unmount } = renderHook(() => useActiveSection(IDS));
    const io = observers[0];
    const spy = vi.spyOn(io, 'disconnect');
    unmount();
    expect(spy).toHaveBeenCalled();
  });
});
