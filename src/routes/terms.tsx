import { createFileRoute } from "@tanstack/react-router";
import { StudioShell } from "@/components/site/StudioShell";
import { pageHead, studio } from "@/lib/studio";
export const Route = createFileRoute("/terms")({
  head: () =>
    pageHead(
      "Website Terms & Project Information | Sumirayan Design",
      "Information about portfolio usage, enquiries and project scopes.",
      "/terms",
    ),
  component: Terms,
});
function Terms() {
  return (
    <StudioShell>
      <article className="legal-copy">
        <p className="eyebrow">WEBSITE INFORMATION</p>
        <h1>Website & project information.</h1>
        <h2>Starting a project</h2>
        <p>
          Sending an enquiry starts a conversation. Project scope, pricing, schedule, revisions,
          deliverables and usage rights are confirmed in a separate written proposal or agreement.
        </p>
        <h2>Portfolio work</h2>
        <p>
          Portfolio images, films, designs and artwork are displayed to explain our creative work.
          Please contact the studio before reproducing or using these materials. Client names and
          marks belong to their respective owners.
        </p>
        <h2>Results and references</h2>
        <p>
          Service descriptions explain the areas in which we work. Outcomes vary with the brief and
          circumstances. Search rankings, advertising returns and business results are not
          guaranteed by this website.
        </p>
        <h2>Questions</h2>
        <p>
          For project information or questions about materials on this website, write to{" "}
          <a href={"mailto:" + studio.email}>{studio.email}</a>.
        </p>
      </article>
    </StudioShell>
  );
}
