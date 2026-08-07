import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { Scene3D } from "@/components/three/Scene3D";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — Sumirayan Design" },
      { name: "description", content: "Sign in or create an account for Sumirayan Design." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState<"client" | "employee">("client");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session) navigate({ to: "/dashboard", replace: true });
    });
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/dashboard", replace: true });
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`,
            data: { full_name: fullName, role },
          },
        });
        if (error) throw error;
      }
    } catch (err: any) {
      setError(err.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const onGoogle = async () => {
    setError(null);
    const res = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: `${window.location.origin}/dashboard`,
    });
    if ((res as any)?.error) setError(String((res as any).error.message ?? (res as any).error));
  };

  return (
    <main className="min-h-screen grid place-items-center px-4 py-16 relative overflow-hidden bg-background">
      <Scene3D />
      <div className="w-full max-w-md glass-strong rounded-3xl p-8 shadow-premium">
        <Link to="/" className="text-xs uppercase tracking-[0.18em] text-white/50 hover:text-white">← Back to Sumirayan Design</Link>
        <h1 className="mt-4 font-display text-3xl font-semibold text-white">
          {mode === "login" ? "Welcome back" : "Create your account"}
        </h1>
        <p className="mt-1 text-sm text-white/60">
          {mode === "login" ? "Sign in to continue to Sumirayan." : "Join Sumirayan as a client or team member."}
        </p>

        <button
          type="button"
          onClick={onGoogle}
          className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white text-black px-4 py-2.5 text-sm font-medium hover:bg-white/90 transition"
        >
          <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.4 29.3 35.5 24 35.5c-6.4 0-11.5-5.1-11.5-11.5S17.6 12.5 24 12.5c2.9 0 5.6 1.1 7.6 2.9l5.7-5.7C33.6 6.3 29 4.5 24 4.5 13.2 4.5 4.5 13.2 4.5 24S13.2 43.5 24 43.5 43.5 34.8 43.5 24c0-1.2-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 16 18.9 12.5 24 12.5c2.9 0 5.6 1.1 7.6 2.9l5.7-5.7C33.6 6.3 29 4.5 24 4.5 16.4 4.5 9.8 8.7 6.3 14.7z"/><path fill="#4CAF50" d="M24 43.5c5.2 0 9.9-2 13.4-5.2l-6.2-5.1c-2 1.4-4.5 2.3-7.2 2.3-5.3 0-9.7-3.1-11.3-7.5l-6.5 5C9.7 39.2 16.3 43.5 24 43.5z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.3l6.2 5.1c-.4.4 6.6-4.8 6.6-14.4 0-1.2-.1-2.4-.4-3.5z"/></svg>
          Continue with Google
        </button>

        <div className="my-5 flex items-center gap-3 text-xs text-white/40">
          <span className="h-px flex-1 bg-white/10" /> or <span className="h-px flex-1 bg-white/10" />
        </div>

        <form onSubmit={onSubmit} className="space-y-3">
          {mode === "signup" && (
            <>
              <Field label="Full name" value={fullName} onChange={setFullName} required />
              <div>
                <label className="text-xs uppercase tracking-[0.14em] text-white/50">I am a</label>
                <div className="mt-1 grid grid-cols-2 gap-2">
                  {(["client", "employee"] as const).map((r) => (
                    <button type="button" key={r} onClick={() => setRole(r)}
                      className={`rounded-xl px-3 py-2 text-sm border transition ${role === r ? "bg-white text-black border-white" : "border-white/10 text-white/70 hover:border-white/30"}`}>
                      {r === "client" ? "Client" : "Team member"}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
          <Field label="Email" type="email" value={email} onChange={setEmail} required />
          <Field label="Password" type="password" value={password} onChange={setPassword} required />

          {error && <p className="text-sm text-[oklch(0.62_0.22_27)]">{error}</p>}

          <button
            type="submit" disabled={loading}
            className="mt-2 w-full rounded-xl px-4 py-2.5 text-sm font-medium text-white disabled:opacity-60"
            style={{ background: "var(--gradient-brand)" }}
          >
            {loading ? "Please wait…" : mode === "login" ? "Sign in" : "Create account"}
          </button>
        </form>

        <p className="mt-5 text-sm text-white/60 text-center">
          {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
          <button onClick={() => setMode(mode === "login" ? "signup" : "login")} className="text-white underline underline-offset-4">
            {mode === "login" ? "Sign up" : "Sign in"}
          </button>
        </p>
      </div>
    </main>
  );
}

function Field({ label, value, onChange, type = "text", required }: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-[0.14em] text-white/50">{label}</span>
      <input
        type={type} value={value} onChange={(e) => onChange(e.target.value)} required={required}
        className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-white/30 focus:bg-white/[0.07]"
      />
    </label>
  );
}
