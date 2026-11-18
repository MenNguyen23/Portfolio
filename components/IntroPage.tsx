import { areas, profile, stats, toolbox } from "@/data/portfolio";
import Tags from "./Tags";
import CountUp from "./effects/CountUp";

/** Page 1 · Intro */
export default function IntroPage() {
  return (
    <section className="page" aria-label="Introduction">
      <header className="hero">
        <h1>{profile.name}</h1>
        <div className="role">{profile.role}</div>
        <div className="tagline">{profile.tagline}</div>
        <div className="links">
          {profile.links.map((l) => (
            <span key={l.label}>
              <b>{l.label}</b>
              {l.href ? <a href={l.href}>{l.value}</a> : l.value}
            </span>
          ))}
        </div>
      </header>

      <div className="wrap">
        <div className="sec">
          <h2>About</h2>
          <p className="lead" data-reveal="up">
            .NET developer with <b>7 years</b> of experience. I currently work on the back end of a{" "}
            <b>multi-tenant SaaS platform</b> for an Australian client. I work spec-first and implement with an{" "}
            <b>AI coding agent</b>, keeping review and verification in my own hands.
          </p>
        </div>

        <div className="sec stats" data-reveal="stagger">
          {stats.map((s) => (
            <div className="stat" key={s.l}>
              <div className="n">
                <CountUp value={s.n} />
              </div>
              <div className="l">{s.l}</div>
            </div>
          ))}
        </div>

        <div className="sec">
          <h2>What I Do</h2>
          <div className="areas" data-reveal="stagger">
            {areas.map((a) => (
              <div className="area" key={a.title}>
                <h3>{a.title}</h3>
                <p>{a.text}</p>
                <Tags items={a.tags} />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2>Toolbox</h2>
          <div className="toolbox" data-reveal="stagger">
            {toolbox.map((r) => (
              <div className="tb-row" key={r.k}>
                <b>{r.k}</b>
                <span>{r.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
