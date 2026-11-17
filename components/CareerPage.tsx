import { career } from "@/data/portfolio";

/** Page 5 · Career */
export default function CareerPage() {
  return (
    <section className="page" aria-label="Career">
      <div className="wrap">
        <div className="sec">
          <h2>Career</h2>
          <div className="timeline" data-reveal="stagger">
            {career.map((c) => (
              <div className={`ti${c.current ? " now" : ""}`} key={c.company}>
                <div>
                  <div className="co">{c.company}</div>
                  <div className="pos">{c.position}</div>
                  <ul>
                    {c.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                </div>
                <div className="dt">{c.dates}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
