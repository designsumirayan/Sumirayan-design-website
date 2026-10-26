import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/site/ServicePage";
import { getCatalogue } from "@/lib/catalogue.functions";
import { services, pageHead, type Project } from "@/lib/studio";
const service = services.find((s) => s.key === "it")!;
export const Route = createFileRoute("/it-services")({
  head: () => pageHead(service.title, service.description, service.path),
  loader: async () => {
    try {
      return { projects: await getCatalogue(), unavailable: false };
    } catch {
      return { projects: [] as Project[], unavailable: true };
    }
  },
  component: Page,
});
function Page() {
  const data = Route.useLoaderData();
  return <ServicePage sector="it" {...data} />;
}
