import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { GlobalHeader } from "@/components/site/GlobalHeader";
import { Footer } from "@/components/landing/Footer";
import { HeroArt } from "@/components/site/HeroArt";
import { ProjectGrid } from "@/components/site/ProjectGrid";
import { getCatalogue } from "@/lib/catalogue.functions";
import { publicBlogPosts } from "@/lib/portal.functions";
import { pageHead, services, type Project } from "@/lib/studio";
export const Route = createFileRoute("/")({
  head: () =>
    pageHead(
      "Advertising Agency in Patna, Bihar | Sumirayan Design",
      "An independent creative and advertising agency in Patna connecting branding, photography, film, fine art and digital experiences. Explore our work and start a project.",
      "/",
    ),
  loader: async () => {
    const [work, blog] = await Promise.allSettled([getCatalogue(), publicBlogPosts()]);
    return {
      projects: work.status === "fulfilled" ? work.value : ([] as Project[]),
      workUnavailable: work.status === "rejected",
      posts: blog.status === "fulfilled" ? blog.value.slice(0, 3) : [],
    };
  },
  component: Home,
});
export { GlobalHeader as Navbar } from "@/components/site/GlobalHeader";
function Home() {
  const { projects, posts, workUnavailable } = Route.useLoaderData();
  const selected = [
    ...projects.filter((p) => p.sector === "design").slice(0, 2),
    ...projects.filter((p) => p.sector === "photography").slice(0, 2),
    ...projects.filter((p) => p.sector === "art" || p.sector === "it").slice(0, 2),
  ];
  return (
    <div className="studio-site">
      <GlobalHeader withTicker />
      <main id="main-content">
        <section className="studio-container home-hero">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="live-dot" /> A CREATIVE AGENCY IN PATNA, BIHAR
            </p>
            <h1>
              Good ideas.
              <br />
              Bold identities.
              <br />
              <em>Lasting impressions.</em>
            </h1>
            <p className="hero-description">
              We bring brands to life through design, photography, film, art and digital
              experiences. Four connected disciplines. One thoughtful creative partner.
            </p>
            <div className="hero-actions">
              <a href="/work" className="studio-button">
                Explore our work <ArrowUpRight size={18} />
              </a>
              <a href="/contact" className="text-link">
                Start a conversation <ArrowUpRight size={17} />
              </a>
            </div>
            <a href="#expertise" className="scroll-cue">
              <ArrowDown size={16} /> SCROLL TO DISCOVER
            </a>
          </div>
          <HeroArt />
        </section>
        <div className="discipline-strip">
          <span>STRATEGY</span>
          <i>✳</i>
          <span>DESIGN</span>
          <i>✳</i>
          <span>FILM</span>
          <i>✳</i>
          <span>ART</span>
          <i>✳</i>
          <span>DIGITAL</span>
          <i>✳</i>
          <span>SUMIRAYAN</span>
        </div>
        <section className="studio-container section-space" id="expertise">
          <div className="section-heading">
            <div>
              <p className="eyebrow">01 / WHAT WE DO</p>
              <h2>
                Many disciplines.
                <br />
                <em>One creative vision.</em>
              </h2>
            </div>
            <p>
              A brand is more than a logo. It is what people see, feel and experience. We connect
              the pieces, from the first idea to the final interaction.
            </p>
          </div>
          <div className="expertise-list">
            {services.map((s) => (
              <a href={s.path} key={s.key} className={"expertise-row expertise-" + s.key}>
                <span className="expertise-number">{s.number}</span>
                <div>
                  <h3>{s.name}</h3>
                  <p>{s.label}</p>
                </div>
                <span className="expertise-short">{s.short}</span>
                <ArrowUpRight className="expertise-arrow" />
              </a>
            ))}
          </div>
        </section>
        <section className="studio-container section-space" id="work">
          <div className="section-heading">
            <div>
              <p className="eyebrow">02 / SELECTED WORK</p>
              <h2>
                A little of
                <br />
                <em>what we make.</em>
              </h2>
            </div>
            <a className="text-link" href="/work">
              View the collection <ArrowUpRight size={18} />
            </a>
          </div>
          {workUnavailable ? (
            <div className="collection-note">
              <p>Our collection is temporarily unavailable.</p>
              <a href="/work">Try the work collection →</a>
            </div>
          ) : (
            <ProjectGrid projects={selected} />
          )}
        </section>
        <section className="studio-manifesto">
          <div className="studio-container manifesto-grid">
            <p className="eyebrow">03 / THE WAY WE THINK</p>
            <div>
              <h2>
                Rooted in art.
                <br />
                Curious about technology.
                <br />
                <em>Focused on your business.</em>
              </h2>
              <p>
                We are Sumirayan Design, an independent creative studio based in Patna. Our work
                brings together the sensitivity of fine art, the clarity of design and the
                possibilities of digital technology.
              </p>
              <p>
                Whether you are launching a business, refreshing an identity or telling a new story,
                we begin by understanding what matters to your audience. Then we make every creative
                decision serve that purpose.
              </p>
              <a className="text-link" href="/about">
                Meet the studio <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
        </section>
        <section className="studio-container section-space">
          <div className="section-heading">
            <div>
              <p className="eyebrow">04 / FROM THOUGHT TO THING</p>
              <h2>
                A clear process.
                <br />
                <em>Room for imagination.</em>
              </h2>
            </div>
            <p>
              Good collaboration makes good work. Here is how we turn an open conversation into a
              defined, deliverable project.
            </p>
          </div>
          <div className="process-grid">
            {[
              [
                "Discover",
                "We listen, ask questions and understand your business, audience and ambition.",
              ],
              [
                "Define",
                "Together we agree the creative direction, scope, schedule and deliverables.",
              ],
              ["Create", "We design, shoot, build and refine through the agreed review stages."],
              [
                "Deliver",
                "We prepare the final assets and handover, with guidance for their intended use.",
              ],
            ].map(([t, d], i) => (
              <article key={t}>
                <span>0{i + 1}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </article>
            ))}
          </div>
        </section>
        {posts.length > 0 && (
          <section className="studio-container section-space">
            <div className="section-heading">
              <div>
                <p className="eyebrow">05 / STUDIO JOURNAL</p>
                <h2>
                  Ideas worth
                  <br />
                  <em>spending time with.</em>
                </h2>
              </div>
              <a href="/blog" className="text-link">
                Read the journal <ArrowUpRight size={18} />
              </a>
            </div>
            <div className="journal-grid">
              {posts.map((p) => (
                <a href={"/blog/" + encodeURIComponent(p.slug)} key={p.id}>
                  <span className="eyebrow">{p.category}</span>
                  <h3>{p.title}</h3>
                  <p>{p.excerpt}</p>
                  <span className="text-link">
                    Read story <ArrowUpRight size={17} />
                  </span>
                </a>
              ))}
            </div>
          </section>
        )}
        <section className="studio-container studio-connect">
          <div>
            <p className="eyebrow">LOCAL ROOTS. OPEN POSSIBILITIES.</p>
            <h2>
              Based in Patna.
              <br />
              <em>Built for your next move.</em>
            </h2>
          </div>
          <div>
            <p>
              We collaborate with businesses and organisations across Bihar and India. Bring us a
              brief, a challenge or an idea that is still taking shape.
            </p>
            <a className="text-link" href="/contact">
              Talk to the studio <ArrowUpRight size={18} />
            </a>
            <p className="secondary-note">
              Looking to learn? <a href="/learn">Explore learning & internships →</a>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
