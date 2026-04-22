import { describe, it, expect, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useLocalState } from './useLocalState';

describe('useLocalState', () => {
  it('returns the initial value when localStorage is empty', () => {
    const { result } = renderHook(() => useLocalState('yw.key', 'dark'));
    expect(result.current[0]).toBe('dark');
  });

  it('reads an existing value from localStorage', () => {
    localStorage.setItem('yw.key', JSON.stringify('light'));
    const { result } = renderHook(() => useLocalState('yw.key', 'dark'));
    expect(result.current[0]).toBe('light');
  });

  it('persists updates back to localStorage', () => {
    const { result } = renderHook(() => useLocalState('yw.key', 'dark'));
    act(() => result.current[1]('light'));
    expect(result.current[0]).toBe('light');
    expect(JSON.parse(localStorage.getItem('yw.key'))).toBe('light');
  });

  it('falls back to the initial value when stored JSON is invalid', () => {
    localStorage.setItem('yw.key', '{not json');
    const { result } = renderHook(() => useLocalState('yw.key', 'dark'));
    expect(result.current[0]).toBe('dark');
  });

  it('ignores write errors (e.g. quota exceeded)', () => {
    const spy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('QuotaExceeded');
    });
    const { result } = renderHook(() => useLocalState('yw.key', 'dark'));
    expect(() => act(() => result.current[1]('light'))).not.toThrow();
    expect(result.current[0]).toBe('light');
    spy.mockRestore();
  });

  it('supports non-string values', () => {
    const { result } = renderHook(() => useLocalState('yw.obj', { n: 1 }));
    act(() => result.current[1]({ n: 2, s: 'x' }));
    expect(JSON.parse(localStorage.getItem('yw.obj'))).toEqual({ n: 2, s: 'x' });
  });
});
