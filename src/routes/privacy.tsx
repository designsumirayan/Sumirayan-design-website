import { createFileRoute } from "@tanstack/react-router";
import { StudioShell } from "@/components/site/StudioShell";
import { pageHead, studio } from "@/lib/studio";
export const Route = createFileRoute("/privacy")({
  head: () =>
    pageHead(
      "Privacy Information | Sumirayan Design",
      "How enquiry information is used on the Sumirayan Design website.",
      "/privacy",
    ),
  component: Privacy,
});
function Privacy() {
  return (
    <StudioShell>
      <article className="legal-copy">
        <p className="eyebrow">WEBSITE INFORMATION</p>
        <h1>Privacy information.</h1>
        <p>
          When you send an enquiry, you provide your name, email, optional company and phone
          details, and project information. We use this information to review your requirements and
          respond to you.
        </p>
        <h2>Website services</h2>
        <p>
          The website is hosted using Vercel and uses Supabase for enquiry and account data. Images
          and videos may load from the media hosting services used for our portfolio. These services
          receive technical request information needed to provide their services.
        </p>
        <h2>Accounts and external links</h2>
        <p>
          If you use a client or team account, authentication information is used to provide access
          to the relevant portal. Links to WhatsApp and other websites take you to services with
          their own privacy practices.
        </p>
        <h2>Your information</h2>
        <p>
          Please do not submit passwords, payment information or other sensitive personal
          information through the enquiry form. For questions about information you have shared, or
          to request a correction or deletion, contact{" "}
          <a href={"mailto:" + studio.email}>{studio.email}</a>.
        </p>
      </article>
    </StudioShell>
  );
}
