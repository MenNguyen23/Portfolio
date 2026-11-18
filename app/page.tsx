import IntroPage from "@/components/IntroPage";
import FeaturedPage from "@/components/FeaturedPage";
import { DeepDivesSection } from "@/components/DeepDivesPage";
import { ExperienceSection } from "@/components/CareerPage";

/**
 * Each <section className="page"> is one printed A4 sheet; the sections below are grouped
 * so no sheet overflows or is left half empty.
 */
export default function Home() {
  return (
    <main>
      <IntroPage />
      <FeaturedPage />
      <section className="page" aria-label="Engineering deep dives">
        <div className="wrap">
          <DeepDivesSection to={2} />
        </div>
      </section>
      <section className="page" aria-label="Engineering deep dives and experience">
        <div className="wrap">
          <DeepDivesSection from={2} continued />
          <ExperienceSection idx={[0]} />
        </div>
      </section>
      <section className="page" aria-label="Experience and projects, continued">
        <div className="wrap">
          <ExperienceSection idx={[1, 2, 3]} continued />
        </div>
      </section>
    </main>
  );
}
