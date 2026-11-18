import { featured } from "@/data/portfolio";

/** Page 2 · Featured project */
export default function FeaturedPage() {
  return (
    <section className="page" aria-label="Featured project">
      <div className="wrap">
        <h2>Featured Project</h2>

        <div className="case" data-reveal="up">
          <div className="eyebrow">{featured.eyebrow}</div>
          <h3>{featured.title}</h3>
          <div className="facts">
            {featured.facts.map((f) => (
              <div key={f.k}>
                {f.k}
                <b>{f.v}</b>
              </div>
            ))}
          </div>
        </div>

        <div className="sec overview" data-reveal="stagger">
          {featured.overview.map((o) => (
            <div className="ov" key={o.k}>
              <div className="eyebrow">{o.k}</div>
              <p>{o.v}</p>
            </div>
          ))}
        </div>

        <div className="sec">
          <h2>Scope of Work</h2>
          <div className="scope" data-reveal="stagger">
            {featured.scope.map((s, i) => (
              <div className="sc" key={s.title}>
                <div className="num">{String(i + 1).padStart(2, "0")}</div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="nda" data-reveal="up">
          <b>Confidentiality</b>
          <span>{featured.nda}</span>
        </div>
      </div>
    </section>
  );
}
