import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import logo from "@/assets/sumirayan design.png";
import { services } from "@/lib/studio";
export function GlobalHeader({ withTicker = false }: { withTicker?: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      {withTicker && (
        <div className="studio-ticker">
          <span>INDEPENDENT CREATIVE STUDIO</span>
          <span>PATNA, BIHAR · WORKING ACROSS INDIA</span>
        </div>
      )}
      <header className="studio-header">
        <a href="/" aria-label="Sumirayan Design home">
          <img src={logo} alt="Sumirayan Design" width="140" height="52" />
        </a>
        <nav aria-label="Main navigation" className="desktop-nav">
          <a href="/work">Our work</a>
          <details className="service-menu">
            <summary>
              Expertise <span>+</span>
            </summary>
            <div>
              {services.map((s) => (
                <a key={s.key} href={s.path}>
                  <small>{s.number}</small>
                  {s.name}
                  <ArrowUpRight size={15} />
                </a>
              ))}
            </div>
          </details>
          <a href="/about">The studio</a>
          <a href="/blog">Journal</a>
        </nav>
        <a href="/contact" className="studio-button header-cta">
          Start a project <ArrowUpRight size={16} />
        </a>
        <button
          className="menu-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </header>
      {open && (
        <nav id="mobile-navigation" className="mobile-navigation" aria-label="Mobile navigation">
          <a href="/work">Our work</a>
          {services.map((s) => (
            <a key={s.key} href={s.path}>
              {s.name}
            </a>
          ))}
          <a href="/about">The studio</a>
          <a href="/blog">Journal</a>
          <a href="/contact">Start a project ↗</a>
          <button onClick={() => setOpen(false)}>Close menu</button>
        </nav>
      )}
    </>
  );
}
