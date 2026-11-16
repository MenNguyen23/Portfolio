import { areas, profile, stats, toolbox } from "@/data/portfolio";
import Tags from "./Tags";

/** Page 1 · Intro */
export default function IntroPage() {
  return (
    <section className="page">
      <header className="hero">
        <h1>{profile.name}</h1>
        <div className="role">{profile.role}</div>
        <div className="tagline">{profile.tagline}</div>
        <div className="links">
          {profile.links.map((l) => (
            <span key={l.label}>
              <b>{l.label}</b>
              {l.value}
            </span>
          ))}
        </div>
      </header>

      <div className="wrap">
        <div className="sec">
          <h2>About</h2>
          <p className="lead">
            .NET developer with <b>7 years</b> of experience in C# back-end systems, from enterprise applications for
            Japanese clients to a production <b>multi-tenant SaaS platform</b> for an Australian client, where I am the
            primary back-end developer. I work directly with international product teams in English to clarify
            requirements and deliver technical updates.
          </p>
        </div>

        <div className="sec stats">
          {stats.map((s) => (
            <div className="stat" key={s.l}>
              <div className="n">{s.n}</div>
              <div className="l">{s.l}</div>
            </div>
          ))}
        </div>

        <div className="sec">
          <h2>What I Do</h2>
          <div className="areas">
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
          <div className="toolbox">
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
