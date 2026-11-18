import { experience, type ProjectEntry } from "@/data/portfolio";
import Tags from "./Tags";

function ProjectCard({ p }: { p: ProjectEntry }) {
  const external = p.product.href?.startsWith("http");
  return (
    <div className="xp-proj">
      <h3>{p.name}</h3>
      <div className="xp-ctx">{p.context}</div>
      <dl>
        <dt>Role</dt>
        <dd>{p.role}</dd>
        <dt>Tasks</dt>
        <dd>
          <ul>
            {p.tasks.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </dd>
        <dt>Tech</dt>
        <dd>
          <Tags items={p.tech} />
        </dd>
        <dt>Product</dt>
        <dd>
          {p.product.href ? (
            <a
              className="proj-link"
              href={p.product.href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {p.product.label}
              {external && <span className="sr-only"> (opens in a new tab)</span>}
            </a>
          ) : (
            p.product.label
          )}
          {p.product.note && <span className="xp-note"> · {p.product.note}</span>}
        </dd>
      </dl>
    </div>
  );
}

/**
 * Experience & projects: each company with the projects done there.
 * Rendered as a block (not a page) so a printed sheet can share it with other content.
 */
export function ExperienceSection({ idx, continued = false }: { idx: number[]; continued?: boolean }) {
  return (
    <div className="xp-sec">
      <h2>{continued ? "Experience & Projects · continued" : "Experience & Projects"}</h2>
      <div className="timeline" data-reveal="stagger">
        {idx.map((i) => {
          const c = experience[i];
          return (
            <div className={`ti xp${c.current ? " now" : ""}`} key={c.company}>
              <div className="xp-head">
                <div>
                  <div className="co">{c.company}</div>
                  <div className="pos">{c.position}</div>
                </div>
                <div className="dt">{c.dates}</div>
              </div>
              {c.projects.map((p) => (
                <ProjectCard p={p} key={p.name} />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
