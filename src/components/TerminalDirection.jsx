import { useEffect, useRef, useState } from 'react';
import { SITE } from '../data';
import { useReveal } from '../hooks/useReveal';
import { IconArrow, IconExternal, IconSun, IconMoon } from './Icons';

const cx = (...a) => a.filter(Boolean).join(' ');

// Active-section scroll spy: watches each nav-targetable section and reports
// which one is roughly centered in the viewport. Used to highlight the matching
// nav link with an accent dot.
function useActiveSection(ids) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;

    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (els.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        // Pick the first currently-intersecting entry (top-most in viewport).
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids.join('|')]); // eslint-disable-line react-hooks/exhaustive-deps

  return active;
}

// `g`+key GitHub-style navigation. Typing `g` then h/a/e/s/p scrolls to the
// matching section. Ignored while typing in inputs.
function useKeyboardShortcuts() {
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
      const map = { a: 'about', e: 'experience', s: 'stack', p: 'projects', h: 'top' };
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

// Renders the floating keyboard hint once per browser session. Auto-fades
// after ~8s via CSS; also dismissable with a click or Escape.
function KeyboardHint() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem('yw.kbd-hint-dismissed') === '1') return;
    } catch {
      /* sessionStorage may be blocked — show the hint anyway */
    }
    setVisible(true);
    const onKey = (e) => {
      if (e.key === 'Escape') setVisible(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  if (!visible) return null;

  const dismiss = () => {
    setVisible(false);
    try {
      sessionStorage.setItem('yw.kbd-hint-dismissed', '1');
    } catch {
      /* noop */
    }
  };

  return (
    <button className="kbd-hint" type="button" onClick={dismiss} aria-label="Dismiss keyboard hint">
      <span className="k">g</span> then <span className="k">h</span>ome ·{' '}
      <span className="k">a</span>bout · <span className="k">e</span>xp ·{' '}
      <span className="k">s</span>tack · <span className="k">p</span>rojects
    </button>
  );
}

// Inline client-side copy-to-clipboard for the email address.
function CopyEmailButton({ email }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard may be blocked (http, permissions) — fail quietly */
    }
  };

  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <button type="button" className="copy-btn" onClick={copy} aria-label="Copy email address">
      {copied ? '✓ copied' : '$ copy'}
    </button>
  );
}

const NAV_SECTIONS = ['about', 'experience', 'stack', 'projects'];

export default function TerminalDirection({ theme, setTheme }) {
  useReveal();
  useKeyboardShortcuts();
  const active = useActiveSection(NAV_SECTIONS);
  const S = SITE;

  return (
    <div className="site term">
      <KeyboardHint />

      <nav className="term-nav">
        <div className="term-nav-inner">
          <a className="brand" href="#top" aria-label="Back to top">
            <img className="avatar" src="/avatar.jpg" alt="Yikang Wang" />
            <span>yw@wangyikang:~$</span>
          </a>
          <div className="links" role="menubar">
            {NAV_SECTIONS.map((id) => (
              <a key={id} href={`#${id}`} className={cx(active === id && 'active')}>
                {id}
              </a>
            ))}
          </div>
          <button
            className="theme-toggle"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <IconSun size={13} /> : <IconMoon size={13} />}
            <span>{theme === 'dark' ? 'light' : 'dark'}</span>
          </button>
        </div>
      </nav>

      <div id="top" />

      <section className="term-hero container">
        <div className="prompt reveal">
          <span className="c">$</span> whoami
        </div>
        <div className="role reveal d1">Software Engineer · Austin, TX</div>
        <h1 className="reveal d1">
          Yikang Wang
          <span className="cursor" aria-hidden="true" />
        </h1>
        <p className="tagline reveal d2">
          Building recommendation systems & search infrastructure at{' '}
          <a href="https://www.indeed.com/">Indeed</a>. I like making systems that quietly do the
          right thing at scale.
        </p>
        <div className="meta reveal d3">
          <span><span className="k">role</span> SWE II</span>
          <span><span className="k">team</span> Employer Recommendation</span>
          <span><span className="k">edu</span> MS BA · BS CS, UT Austin</span>
        </div>
        <div className="cta reveal d4">
          <a className="btn primary" href={`mailto:${S.links.email}`}>→ Get in touch</a>
          <a className="btn" href={S.links.resume}>Resume <IconExternal /></a>
          <a className="btn" href={S.links.github} target="_blank" rel="noreferrer">
            GitHub <IconExternal />
          </a>
          <a className="btn" href={S.links.linkedin} target="_blank" rel="noreferrer">
            LinkedIn <IconExternal />
          </a>
        </div>
      </section>

      <section id="about" className="term-sec">
        <div className="container">
          <div className="sec-head reveal">
            <span className="num">01</span>
            <h2>About</h2>
            <span className="file">$ whoami --verbose</span>
          </div>
          <div className="term-about">
            <p className="reveal">
              I'm a software engineer focused on <strong>recommendation retrieval</strong> and{' '}
              <strong>search ranking</strong>. Today I work on the employer side of Indeed — building
              systems that surface qualified candidates for sourcing and the premium job experience.
            </p>
            <p className="reveal d1">
              5 years of progressive engineering across recsys, ranking, ML infrastructure, and
              full-stack. I'm happiest where data, product, and systems design overlap — designing
              experiments, shipping retrieval changes, and paying down debt.
            </p>
            <dl className="kv reveal d2">
              <div><dt className="k">location</dt><dd>Austin, TX</dd></div>
              <div><dt className="k">current</dt><dd>Indeed · SWE II</dd></div>
              <div><dt className="k">focus</dt><dd>Recsys retrieval, search ranking, A/B testing</dd></div>
              <div><dt className="k">education</dt><dd>{S.edu}</dd></div>
              <div>
                <dt className="k">email</dt>
                <dd className="email-row">
                  <a href={`mailto:${S.links.email}`}>{S.links.email}</a>
                  <CopyEmailButton email={S.links.email} />
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section id="experience" className="term-sec">
        <div className="container">
          <div className="sec-head reveal">
            <span className="num">02</span>
            <h2>Experience</h2>
            <span className="file">$ git log --author=yw --oneline</span>
          </div>
          <div className="term-exp">
            {S.experience.map((e, i) => (
              <article key={i} className="entry reveal">
                <div className="range">
                  <span className="org">{e.org}</span>
                  {e.range}
                </div>
                <div>
                  <h3>{e.role}</h3>
                  <div className="team">{e.team}</div>
                  <ul>
                    {e.bullets.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                  <div className="tags">
                    {e.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="stack" className="term-sec">
        <div className="container">
          <div className="sec-head reveal">
            <span className="num">03</span>
            <h2>Stack</h2>
            <span className="file">$ cat deps.json | jq keys</span>
          </div>
          <div className="term-stack">
            {Object.entries(S.stack).map(([k, items], idx) => (
              <div key={k} className={cx('grp reveal', `d${idx}`)}>
                <div className="h">
                  <span>{k.toLowerCase()}</span>
                  <small>{items.length}</small>
                </div>
                <div className="items">
                  {items.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="term-sec">
        <div className="container">
          <div className="sec-head reveal">
            <span className="num">04</span>
            <h2>Projects</h2>
            <span className="file">$ find ~/projects -name "*.md" -exec cat</span>
          </div>
          <div className="term-projects">
            {S.projects.map((p, i) => (
              <a
                key={p.title}
                className={cx('p reveal', `d${i}`)}
                href={p.href}
                target="_blank"
                rel="noreferrer"
              >
                <div className="tag">{p.tags.join(' · ')}</div>
                <h3>
                  <span>{p.title}</span>
                  <span className="arr" aria-hidden="true">
                    <IconArrow />
                  </span>
                </h3>
                <p>{p.blurb}</p>
                <div className="metric">
                  <span className="v">{p.metric}</span>
                  <span className="l">{p.metricLabel}</span>
                  <span className="yr">{p.year}</span>
                </div>
              </a>
            ))}
          </div>
          <p className="proj-note reveal">
            <span className="c">$</span> These links point to old project pages — real write-ups
            coming soon.{' '}
            <a href={S.links.github} target="_blank" rel="noreferrer">
              GitHub <IconExternal size={10} />
            </a>{' '}
            has the source.
          </p>
        </div>
      </section>

      <footer className="term-foot">
        <div className="container inner">
          <div>
            © {new Date().getFullYear()} Yikang Wang ·{' '}
            <a href={`mailto:${S.links.email}`}>{S.links.email}</a>
          </div>
          <div>
            $ <a href="#top">scroll --top</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
