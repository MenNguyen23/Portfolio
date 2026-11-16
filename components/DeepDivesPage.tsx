import { Fragment } from "react";
import { deepDives } from "@/data/portfolio";

/** Page 3 · Engineering deep dives */
export default function DeepDivesPage() {
  return (
    <section className="page">
      <div className="wrap">
        <h2>Engineering Deep Dives</h2>

        {deepDives.map((d) => (
          <div className="dd" key={d.title} data-reveal="up">
            <div>
              <div className="eyebrow">{d.eyebrow}</div>
              <h3>{d.title}</h3>
              <div className="row">
                <b>Problem</b>
                <p>{d.problem}</p>
              </div>
              <div className="row">
                <b>Approach</b>
                <p>{d.approach}</p>
              </div>
              <div className="row">
                <b>Outcome</b>
                <p>{d.outcome}</p>
              </div>
            </div>

            <div className="mini">
              <div className="lbl">Approach (generic)</div>
              {d.flow.map((n, i) => (
                <Fragment key={n.label}>
                  {i > 0 && <div className="a">↓</div>}
                  <div className={`n${n.highlight ? " hl" : ""}`}>
                    {n.label}
                    {n.sub && <small>{n.sub}</small>}
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
