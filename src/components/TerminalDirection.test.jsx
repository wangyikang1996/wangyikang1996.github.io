import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TerminalDirection from './TerminalDirection';
import { SITE } from '../data';

beforeEach(() => {
  // IntersectionObserver isn't provided by jsdom; stub a no-op.
  vi.stubGlobal(
    'IntersectionObserver',
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  );
});

const renderWith = (theme = 'dark') => {
  const setTheme = vi.fn();
  const utils = render(<TerminalDirection theme={theme} setTheme={setTheme} />);
  return { ...utils, setTheme };
};

describe('TerminalDirection', () => {
  it('renders nav links for every section', () => {
    renderWith();
    const nav = screen.getByRole('navigation');
    ['about', 'experience', 'stack', 'projects'].forEach((label) => {
      expect(within(nav).getByText(label)).toHaveAttribute('href', `#${label}`);
    });
  });

  it('renders the hero name and tagline', () => {
    renderWith();
    expect(screen.getByRole('heading', { level: 1, name: /Yikang Wang/i })).toBeInTheDocument();
    expect(screen.getByText(/Building recommendation systems/i)).toBeInTheDocument();
  });

  it('renders resume / github / linkedin / email CTAs from SITE', () => {
    renderWith();
    expect(screen.getByRole('link', { name: /Get in touch/i })).toHaveAttribute(
      'href',
      `mailto:${SITE.links.email}`,
    );
    expect(screen.getByRole('link', { name: /Resume/i })).toHaveAttribute('href', SITE.links.resume);
    expect(screen.getByRole('link', { name: /GitHub/i })).toHaveAttribute('href', SITE.links.github);
    expect(screen.getByRole('link', { name: /LinkedIn/i })).toHaveAttribute('href', SITE.links.linkedin);
  });

  it('renders one entry per experience item', () => {
    renderWith();
    SITE.experience.forEach((e) => {
      // role headings can repeat (e.g. multiple "Software Engineer"), so use getAllByRole.
      const matches = screen.getAllByRole('heading', { level: 3, name: e.role });
      expect(matches.length).toBeGreaterThan(0);
      expect(screen.getByText(e.team)).toBeInTheDocument();
    });
  });

  it('renders each stack group with its correct item count', () => {
    renderWith();
    Object.entries(SITE.stack).forEach(([group, items]) => {
      expect(screen.getByText(group.toLowerCase())).toBeInTheDocument();
      const count = screen.getAllByText(String(items.length));
      expect(count.length).toBeGreaterThan(0);
    });
  });

  it('renders each project as a link opening in a new tab', () => {
    renderWith();
    SITE.projects.forEach((p) => {
      const link = screen.getByRole('link', { name: new RegExp(p.title, 'i') });
      expect(link).toHaveAttribute('href', p.href);
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noreferrer');
    });
  });

  it('shows "light" label with sun icon when theme is dark', () => {
    renderWith('dark');
    const btn = screen.getByRole('button', { name: /toggle theme/i });
    expect(btn).toHaveTextContent('light');
  });

  it('shows "dark" label with moon icon when theme is light', () => {
    renderWith('light');
    const btn = screen.getByRole('button', { name: /toggle theme/i });
    expect(btn).toHaveTextContent('dark');
  });

  it('calls setTheme with the opposite theme when toggle is clicked', async () => {
    const user = userEvent.setup();
    const { setTheme } = renderWith('dark');
    await user.click(screen.getByRole('button', { name: /toggle theme/i }));
    expect(setTheme).toHaveBeenCalledWith('light');
  });

  it('toggles from light → dark', async () => {
    const user = userEvent.setup();
    const { setTheme } = renderWith('light');
    await user.click(screen.getByRole('button', { name: /toggle theme/i }));
    expect(setTheme).toHaveBeenCalledWith('dark');
  });

  it('footer contains the current year and email', () => {
    renderWith();
    const year = String(new Date().getFullYear());
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
    const emailLinks = screen.getAllByRole('link', { name: SITE.links.email });
    expect(emailLinks.length).toBeGreaterThan(0);
  });
});
