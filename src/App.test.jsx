import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

beforeEach(() => {
  vi.stubGlobal(
    'IntersectionObserver',
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  );
});

describe('App', () => {
  it('sets body data attributes on mount', () => {
    render(<App />);
    expect(document.body.dataset.direction).toBe('terminal');
    expect(document.body.dataset.theme).toBe('dark');
  });

  it('restores a persisted theme from localStorage', () => {
    localStorage.setItem('yw.theme', JSON.stringify('light'));
    render(<App />);
    expect(document.body.dataset.theme).toBe('light');
  });

  it('toggles theme via the toggle button and persists to localStorage', async () => {
    const user = userEvent.setup();
    render(<App />);
    expect(document.body.dataset.theme).toBe('dark');
    await user.click(screen.getByRole('button', { name: /toggle theme/i }));
    expect(document.body.dataset.theme).toBe('light');
    expect(JSON.parse(localStorage.getItem('yw.theme'))).toBe('light');
  });
});
