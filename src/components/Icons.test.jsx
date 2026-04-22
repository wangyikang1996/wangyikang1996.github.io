import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { IconArrow, IconExternal, IconSun, IconMoon } from './Icons';

const getSvg = (container) => container.querySelector('svg');

describe('Icons', () => {
  it('IconArrow renders an svg at the default size', () => {
    const { container } = render(<IconArrow />);
    const svg = getSvg(container);
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('width', '14');
    expect(svg).toHaveAttribute('height', '14');
  });

  it('IconExternal renders at default size 12', () => {
    const { container } = render(<IconExternal />);
    const svg = getSvg(container);
    expect(svg).toHaveAttribute('width', '12');
  });

  it('IconSun renders 8 tick lines', () => {
    const { container } = render(<IconSun />);
    const svg = getSvg(container);
    expect(svg).toHaveAttribute('width', '16');
    expect(container.querySelectorAll('line')).toHaveLength(8);
  });

  it('IconMoon renders at default size 16', () => {
    const { container } = render(<IconMoon />);
    const svg = getSvg(container);
    expect(svg).toHaveAttribute('width', '16');
    expect(svg).toHaveAttribute('height', '16');
  });

  it('respects a custom size prop', () => {
    const { container } = render(<IconArrow size={24} />);
    const svg = getSvg(container);
    expect(svg).toHaveAttribute('width', '24');
    expect(svg).toHaveAttribute('height', '24');
  });
});
