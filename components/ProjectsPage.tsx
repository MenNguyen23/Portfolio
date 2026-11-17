import { projects } from "@/data/portfolio";
import Shot from "./Shot";
import Tags from "./Tags";

/** Page 4 · More projects */
export default function ProjectsPage() {
  return (
    <section className="page" aria-label="More projects">
      <div className="wrap">
        <h2>More Projects</h2>
        <div className="projects" data-reveal="stagger">
          {projects.map((p) => (
            <div className={`proj${p.wide ? " wide" : ""}`} key={p.title}>
              {p.shot && <Shot {...p.shot} />}
              <div className="body">
                <div className="top">
                  <span className="eyebrow">{p.company}</span>
                  <span className="yr">{p.years}</span>
                </div>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
                <Tags items={p.tags} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
