import { SITE } from '../data';
import { useReveal } from '../hooks/useReveal';
import { IconArrow, IconExternal, IconSun, IconMoon } from './Icons';

const cx = (...a) => a.filter(Boolean).join(' ');

export default function TerminalDirection({ theme, setTheme }) {
  useReveal();
  const S = SITE;

  return (
    <div className="site term">
      <nav className="term-nav">
        <div className="term-nav-inner">
          <a className="brand" href="#top">
            <span className="dot" />
            <span>yw@wangyikang:~$</span>
          </a>
          <div className="links">
            <a href="#about">about</a>
            <a href="#experience">experience</a>
            <a href="#stack">stack</a>
            <a href="#projects">projects</a>
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
          <span className="cursor" />
        </h1>
        <p className="tagline reveal d2">
          Building recommendation systems & search infrastructure at{' '}
          <a href="https://www.indeed.com/">Indeed</a>. I like making systems that quietly do the right thing at scale.
        </p>
        <div className="meta reveal d3">
          <span><span className="k">role</span> SWE II</span>
          <span><span className="k">team</span> Employer Recommendation</span>
          <span><span className="k">edu</span> MS BA · BS CS, UT Austin</span>
          <span><span className="k">uptime</span> 5y</span>
        </div>
        <div className="cta reveal d4">
          <a className="btn primary" href={`mailto:${S.links.email}`}>→ Get in touch</a>
          <a className="btn" href={S.links.resume}>Resume <IconExternal /></a>
          <a className="btn" href={S.links.github}>GitHub <IconExternal /></a>
          <a className="btn" href={S.links.linkedin}>LinkedIn <IconExternal /></a>
        </div>
      </section>

      <section id="about" className="term-sec">
        <div className="container">
          <div className="sec-head reveal">
            <span className="num">01</span>
            <h2>About</h2>
            <span className="file">~/about.md</span>
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
            <div className="kv reveal d2">
              <span className="k">location</span><span>Austin, TX</span>
              <span className="k">current</span><span>Indeed · SWE II</span>
              <span className="k">focus</span><span>Recsys retrieval, search ranking, A/B testing</span>
              <span className="k">education</span><span>{S.edu}</span>
              <span className="k">email</span><span><a href={`mailto:${S.links.email}`}>{S.links.email}</a></span>
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="term-sec">
        <div className="container">
          <div className="sec-head reveal">
            <span className="num">02</span>
            <h2>Experience</h2>
            <span className="file">$ cat experience.log</span>
          </div>
          <div className="term-exp">
            {S.experience.map((e, i) => (
              <div key={i} className="entry reveal">
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
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="stack" className="term-sec">
        <div className="container">
          <div className="sec-head reveal">
            <span className="num">03</span>
            <h2>Stack</h2>
            <span className="file">// tools of the trade</span>
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
            <span className="file">$ ls -la ~/projects</span>
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
                  <span className="arr">
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
