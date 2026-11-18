import { Fragment } from "react";
import { deepDives } from "@/data/portfolio";

type DeepDive = (typeof deepDives)[number];

function DeepDiveCard({ d }: { d: DeepDive }) {
  return (
    <div className="dd" data-reveal="up">
      <div>
        <div className="eyebrow">{d.eyebrow}</div>
        <h3>{d.title}</h3>
        <div className="row">
          <b>Problem</b>
          <p>{d.problem}</p>
        </div>
        <div className="row">
          <b>My part</b>
          <p>{d.myPart}</p>
        </div>
        <div className="row">
          <b>Key decisions</b>
          <ul>
            {d.decisions.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
        <div className="row">
          <b>Outcome</b>
          <p>{d.outcome}</p>
        </div>
      </div>

      <div className="mini">
        <div className="lbl">Flow (simplified)</div>
        {d.flow.map((n, i) => (
          <Fragment key={n.label}>
            {i > 0 && <div className="a" aria-hidden="true">↓</div>}
            <div className={`n${n.highlight ? " hl" : ""}`}>
              {n.label}
              {n.sub && <small>{n.sub}</small>}
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

/**
 * Engineering deep dives from index `from` to `to` (exclusive), as a block rather than a page,
 * so the page layout in app/page.tsx decides how they share printed A4 sheets.
 */
export function DeepDivesSection({ from = 0, to, continued = false }: { from?: number; to?: number; continued?: boolean }) {
  return (
    <div className="dd-sec">
      <h2>{continued ? "Engineering Deep Dives · continued" : "Engineering Deep Dives"}</h2>
      {deepDives.slice(from, to).map((d) => (
        <DeepDiveCard d={d} key={d.title} />
      ))}
    </div>
  );
}
