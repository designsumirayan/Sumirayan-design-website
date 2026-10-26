import { ArrowUpRight } from "lucide-react";
import { services, studio } from "@/lib/studio";
import logo from "@/assets/sumirayan design.png";
export function Footer() {
  return (
    <footer className="studio-footer">
      <div className="studio-container footer-top">
        <div>
          <p className="eyebrow">YOUR NEXT CHAPTER</p>
          <h2>
            Have a good idea?
            <br />
            <em>Let's make it real.</em>
          </h2>
          <a className="studio-button" href="/contact">
            Tell us about it <ArrowUpRight size={18} />
          </a>
        </div>
        <a className="footer-email" href={"mailto:" + studio.email}>
          {studio.email}
          <ArrowUpRight size={24} />
        </a>
      </div>
      <div className="studio-container footer-grid">
        <div>
          <img src={logo} alt="Sumirayan Design" width="150" height="55" />
          <p>
            Independent ideas. Connected disciplines.
            <br />
            An advertising & creative studio in Patna, Bihar.
          </p>
          <a href={"tel:" + studio.telephone}>{studio.phone}</a>
        </div>
        <div>
          <h3>Expertise</h3>
          {services.map((s) => (
            <a key={s.key} href={s.path}>
              {s.name}
            </a>
          ))}
        </div>
        <div>
          <h3>Explore</h3>
          <a href="/work">Our work</a>
          <a href="/about">The studio</a>
          <a href="/blog">Journal</a>
          <a href="/contact">Contact</a>
        </div>
        <div>
          <h3>Beyond the brief</h3>
          <a href="/learn">Learn & internships</a>
          <a href="/events">Events</a>
          <a href="/careers">Careers</a>
          <a href="/auth">Client & team login</a>
        </div>
      </div>
      <div className="studio-container footer-bottom">
        <span>© {new Date().getFullYear()} Sumirayan Design</span>
        <div>
          <a href="/privacy">Privacy</a>
          <a href="/terms">Website terms</a>
          <a href="/sitemap.xml">Sitemap</a>
        </div>
        <span>MADE OF ART + IDEAS + TECHNOLOGY</span>
      </div>
    </footer>
  );
}
