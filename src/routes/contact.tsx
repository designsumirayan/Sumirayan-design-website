import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { ArrowUpRight } from "lucide-react";
import { StudioShell } from "@/components/site/StudioShell";
import { submitContact } from "@/lib/portal.functions";
import { pageHead, services, studio } from "@/lib/studio";
export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>) => ({
    service: typeof search.service === "string" ? search.service : "",
  }),
  head: () =>
    pageHead(
      "Start a Project | Contact Sumirayan Design, Patna",
      "Tell us about your branding, photography, film, art or website project. Contact the Sumirayan Design studio in Patna, Bihar.",
      "/contact",
    ),
  component: Contact,
});
function Contact() {
  const { service } = Route.useSearch();
  const [sent, setSent] = useState(false);
  const fn = useServerFn(submitContact);
  const mutation = useMutation({ mutationFn: fn, onSuccess: () => setSent(true) });
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    if (f.get("website")) return;
    const value = (k: string) => String(f.get(k) || "").trim();
    const message = [
      "Service: " + value("service"),
      "Phone: " + (value("phone") || "Not provided"),
      "Timeline: " + (value("timeline") || "To discuss"),
      "Budget: " + (value("budget") || "To discuss"),
      "",
      "Brief:",
      value("message"),
    ].join("\n");
    mutation.mutate({
      data: {
        name: value("name"),
        email: value("email"),
        company: value("company") || null,
        message,
      },
    });
  }
  return (
    <StudioShell>
      <section className="studio-container service-hero">
        <p className="eyebrow">START A CONVERSATION</p>
        <div className="service-heading">
          <h1>
            Your next big idea
            <br />
            <em>starts here.</em>
          </h1>
          <p>
            A new brand, a film, an artwork or a digital experience. Tell us what you have in mind
            and we will take it from there.
          </p>
        </div>
      </section>
      <section className="studio-container section-space contact-layout">
        <div>
          {sent ? (
            <div className="status-message" role="status">
              <h2>Thank you.</h2>
              <p>
                Your enquiry has reached the studio. We will review your brief and get in touch
                using the contact details you shared.
              </p>
              <button
                className="text-link"
                onClick={() => {
                  setSent(false);
                  mutation.reset();
                }}
              >
                Send another enquiry →
              </button>
            </div>
          ) : (
            <form className="studio-form" onSubmit={submit}>
              <label>
                Your name *<input name="name" required maxLength={120} autoComplete="name" />
              </label>
              <label>
                Email address *
                <input name="email" type="email" required maxLength={200} autoComplete="email" />
              </label>
              <label>
                Company
                <input name="company" maxLength={180} autoComplete="organization" />
              </label>
              <label>
                Phone / WhatsApp
                <input name="phone" type="tel" maxLength={30} autoComplete="tel" />
              </label>
              <label>
                What can we help with?
                <select
                  name="service"
                  defaultValue={services.some((s) => s.name === service) ? service : "Not sure yet"}
                >
                  {services.map((s) => (
                    <option key={s.key}>{s.name}</option>
                  ))}
                  <option>Multiple disciplines</option>
                  <option>Not sure yet</option>
                </select>
              </label>
              <label>
                Preferred timeline
                <select name="timeline">
                  <option>To discuss</option>
                  <option>Within a month</option>
                  <option>1–3 months</option>
                  <option>3+ months</option>
                </select>
              </label>
              <label className="form-wide">
                Indicative budget (optional)
                <select name="budget">
                  <option>To discuss</option>
                  <option>Under ₹25,000</option>
                  <option>₹25,000–₹75,000</option>
                  <option>₹75,000–₹2,00,000</option>
                  <option>₹2,00,000+</option>
                </select>
              </label>
              <label className="form-wide">
                Tell us about your project *
                <textarea
                  name="message"
                  required
                  minLength={10}
                  maxLength={1400}
                  rows={6}
                  placeholder="Your business, the challenge, and what you would like to create."
                />
              </label>
              <div hidden aria-hidden="true">
                <label>
                  Leave blank
                  <input name="website" tabIndex={-1} autoComplete="off" />
                </label>
              </div>
              <p className="form-wide form-notice">
                We use these details to respond to your enquiry. Please avoid including sensitive
                information.{" "}
                <a href="/privacy" className="underline">
                  Privacy information
                </a>
                .
              </p>
              {mutation.isError && (
                <p role="alert" className="form-wide status-message">
                  Your message could not be sent. Your details are still here—please try again, or
                  email the studio directly.
                </p>
              )}
              <button className="studio-button form-wide" disabled={mutation.isPending}>
                {mutation.isPending ? "Sending…" : "Send your brief"}
                <ArrowUpRight size={18} />
              </button>
            </form>
          )}
        </div>
        <aside className="contact-aside">
          <p className="eyebrow">DIRECT TO THE STUDIO</p>
          <h2>Prefer a conversation?</h2>
          <a href={"mailto:" + studio.email}>{studio.email} ↗</a>
          <a href={"tel:" + studio.telephone}>{studio.phone} ↗</a>
          <a href={studio.whatsapp}>Chat on WhatsApp ↗</a>
          <p>
            Based in {studio.location}.<br />
            Working with clients across Bihar and India.
          </p>
          <p>Please contact us to arrange a studio visit and confirm the location.</p>
          <div className="brief-checklist mt-8">
            <h3>What happens next?</h3>
            <p>01 · We review your requirements.</p>
            <p>02 · We discuss the approach and scope.</p>
            <p>03 · You receive a tailored proposal.</p>
          </div>
        </aside>
      </section>
    </StudioShell>
  );
}
