import { useEffect, useRef, useState } from 'react';
import { SITE } from '../data';
import { useReveal } from '../hooks/useReveal';
import { useActiveSection } from '../hooks/useActiveSection';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import { IconArrow, IconExternal, IconSun, IconMoon } from './Icons';

const cx = (...a) => a.filter(Boolean).join(' ');

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

// Section header block (NN · Title · terminal file label), shared by every section.
function SectionHead({ num, title, file }) {
  return (
    <div className="sec-head reveal">
      <span className="num">{num}</span>
      <h2>{title}</h2>
      <span className="file">{file}</span>
    </div>
  );
}

const SECTIONS = SITE.sections;
const SECTION_IDS = SECTIONS.map((s) => s.id);
const SEC = Object.fromEntries(SECTIONS.map((s) => [s.id, s]));

export default function TerminalDirection({ theme, setTheme }) {
  useReveal();
  useKeyboardShortcuts();
  const active = useActiveSection(SECTION_IDS);
  const S = SITE;

  return (
    <div className="site term">
      <a className="sr-only sr-only-focusable" href="#about">
        Skip to content
      </a>
      <nav className="term-nav" aria-label="Section navigation">
        <div className="term-nav-inner">
          <a className="brand" href="#top" aria-label="Back to top">
            <img className="avatar" src="/avatar.jpg" alt={S.name} width="28" height="28" />
            <span>yw@wangyikang:~$</span>
          </a>
          <div className="links">
            {SECTIONS.map(({ id }) => (
              <a
                key={id}
                href={`#${id}`}
                className={cx(active === id && 'active')}
                aria-current={active === id ? 'true' : undefined}
              >
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

      {/* No .reveal on the hero: it's the LCP element and must not start hidden
          waiting on JS — only below-the-fold sections animate in. */}
      <section className="term-hero container">
        <div className="prompt">
          <span className="c">$</span> whoami
        </div>
        <div className="role">
          Software Engineer · Search &amp; Recommendation Systems · Austin, TX
        </div>
        <h1>
          {S.name}
          <span className="cursor" aria-hidden="true" />
        </h1>
        <p className="tagline">
          I build the retrieval and ranking systems behind search and recommendations at{' '}
          <a href="https://www.indeed.com/">Indeed</a>, and keep them fast and reliable.
        </p>
        <div className="meta">
          <span><span className="k">role</span> SWE II</span>
          <span><span className="k">focus</span> Retrieval · Ranking · A/B testing</span>
          <span><span className="k">edu</span> MS BA · BS CS, UT Austin</span>
        </div>
        <div className="cta">
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
          <SectionHead {...SEC.about} />
          <div className="term-about">
            <p className="reveal">
              I'm a software engineer focused on <strong>recommendation retrieval</strong> and{' '}
              <strong>search ranking</strong>. I work on the employer side of Indeed, building the
              systems that surface the right candidates to the right employers at scale.
            </p>
            <p className="reveal d1">
              Five years in, I've gone from shipping features to owning retrieval changes end to end
              and driving work across teams. I ramp fast on various crucial systems, write design docs
              people outside the project can actually follow, and like being where data, product,
              and systems design overlap.
            </p>
            <dl className="kv reveal d2">
              <div><dt className="k">location</dt><dd>{S.location}</dd></div>
              <div><dt className="k">current</dt><dd>Indeed · SWE II</dd></div>
              <div><dt className="k">now</dt><dd>{S.now}</dd></div>
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
          <SectionHead {...SEC.experience} />
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
          <SectionHead {...SEC.stack} />
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
          <SectionHead {...SEC.projects} />
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
            <span className="c">$</span> Early projects from school and Kaggle. Source on{' '}
            <a href={S.links.github} target="_blank" rel="noreferrer">
              GitHub <IconExternal size={10} />
            </a>
            .
          </p>
        </div>
      </section>

      <section id="writing" className="term-sec">
        <div className="container">
          <SectionHead {...SEC.writing} />
          <div className="term-writing">
            {S.writing.map((w, i) => (
              <article key={w.title} className={cx('w reveal', `d${i}`)}>
                <h3>{w.title}</h3>
                <p>{w.blurb}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="voices" className="term-sec">
        <div className="container">
          <SectionHead {...SEC.voices} />
          <div className="term-voices">
            {S.testimonials.map((t, i) => (
              <figure key={i} className={cx('q reveal', `d${i}`)}>
                <blockquote>{t.quote}</blockquote>
                <figcaption className="who">{t.who}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <footer className="term-foot">
        <div className="container inner">
          <div>
            © {new Date().getFullYear()} {S.name} ·{' '}
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
