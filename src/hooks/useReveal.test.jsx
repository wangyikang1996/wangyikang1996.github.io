import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render } from '@testing-library/react';
import { useReveal } from './useReveal';

function Harness() {
  useReveal();
  return (
    <div>
      <div className="reveal" data-testid="a" />
      <div className="reveal" data-testid="b" />
    </div>
  );
}

describe('useReveal', () => {
  let observers;

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
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('observes elements with .reveal that are not yet in', () => {
    const { getByTestId } = render(<Harness />);
    const io = observers[0];
    expect(io.observed.has(getByTestId('a'))).toBe(true);
    expect(io.observed.has(getByTestId('b'))).toBe(true);
  });

  it('adds .in and unobserves when an element intersects', () => {
    const { getByTestId } = render(<Harness />);
    const io = observers[0];
    const a = getByTestId('a');
    io.trigger([{ target: a, isIntersecting: true }]);
    expect(a.classList.contains('in')).toBe(true);
    expect(io.observed.has(a)).toBe(false);
  });

  it('does not toggle .in when not intersecting', () => {
    const { getByTestId } = render(<Harness />);
    const io = observers[0];
    const a = getByTestId('a');
    io.trigger([{ target: a, isIntersecting: false }]);
    expect(a.classList.contains('in')).toBe(false);
  });

  it('falls back to immediate .in when IntersectionObserver is missing', () => {
    const original = window.IntersectionObserver;
    // The hook checks `'IntersectionObserver' in window`, so we must actually
    // remove the property (not just set it to undefined).
    delete window.IntersectionObserver;
    try {
      const { getByTestId } = render(<Harness />);
      expect(getByTestId('a').classList.contains('in')).toBe(true);
      expect(getByTestId('b').classList.contains('in')).toBe(true);
    } finally {
      window.IntersectionObserver = original;
    }
  });

  it('disconnects the observer on unmount', () => {
    const { unmount } = render(<Harness />);
    const io = observers[0];
    const spy = vi.spyOn(io, 'disconnect');
    unmount();
    expect(spy).toHaveBeenCalled();
  });
});
