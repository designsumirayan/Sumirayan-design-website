import type { ReactNode } from "react";
import { GlobalHeader } from "./GlobalHeader";
import { Footer } from "@/components/landing/Footer";
export function StudioShell({ children }: { children: ReactNode }) {
  return (
    <div className="studio-site">
      <GlobalHeader />
      <main id="main-content">{children}</main>
      <Footer />
    </div>
  );
}
