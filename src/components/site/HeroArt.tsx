import { Component, lazy, Suspense, useEffect, useRef, useState, type ReactNode } from "react";
const Sculpture = lazy(() => import("@/components/three/BrandSculpture"));
function Fallback() {
  return (
    <div className="sculpture-fallback" aria-hidden="true">
      <i />
      <i />
      <i />
      <b>S</b>
    </div>
  );
}
class ArtBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? <Fallback /> : this.props.children;
  }
}
export function HeroArt() {
  const [enabled, setEnabled] = useState(false);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!mq.matches && window.innerWidth > 760) setEnabled(true);
    const change = () => {
      if (mq.matches) {
        setPaused(true);
        setEnabled(false);
      }
    };
    mq.addEventListener("change", change);
    return () => mq.removeEventListener("change", change);
  }, []);
  useEffect(() => {
    let intersects = true;
    const update = () => setVisible(intersects && !document.hidden);
    const observer = new IntersectionObserver((entries) => {
      intersects = entries[0].isIntersecting;
      update();
    });
    if (container.current) observer.observe(container.current);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);
  return (
    <div className="hero-art" ref={container}>
      <div className="orbital-label orbital-top">IDEAS TAKE SHAPE</div>
      <div className="sculpture-stage">
        <ArtBoundary>
          {enabled ? (
            <Suspense fallback={<Fallback />}>
              <Sculpture paused={paused || !visible} />
            </Suspense>
          ) : (
            <Fallback />
          )}
        </ArtBoundary>
      </div>
      <span className="orbital-coordinate">25.59° N / 85.14° E</span>
      <div className="art-caption">
        <span>ART × DESIGN × TECHNOLOGY</span>
        <button
          onClick={() => {
            if (!enabled) {
              setEnabled(true);
              setPaused(false);
            } else setPaused(!paused);
          }}
        >
          {!enabled ? "Explore 3D" : paused ? "Play motion" : "Pause motion"}
        </button>
      </div>
    </div>
  );
}
