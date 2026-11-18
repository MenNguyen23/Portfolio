import { Fragment } from "react";
import { deepDives } from "@/data/portfolio";

/** Deep dives per printed A4 page; three no longer fit on one sheet. */
const PER_PAGE = 2;

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

/** Page 3+ · Engineering deep dives, split across as many A4 pages as needed */
export default function DeepDivesPage() {
  const pages: DeepDive[][] = [];
  for (let i = 0; i < deepDives.length; i += PER_PAGE) pages.push(deepDives.slice(i, i + PER_PAGE));

  return (
    <>
      {pages.map((group, p) => (
        <section className="page" aria-label={p === 0 ? "Engineering deep dives" : "Engineering deep dives, continued"} key={p}>
          <div className="wrap">
            <h2>{p === 0 ? "Engineering Deep Dives" : "Engineering Deep Dives · continued"}</h2>
            {group.map((d) => (
              <DeepDiveCard d={d} key={d.title} />
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
