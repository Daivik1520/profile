import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import ProjectCaseStudies from "@/components/ProjectCaseStudies";
import HolographicFooter from "@/components/HolographicFooter";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Section with Scroll Animation */}
      <section className="relative">
        <ScrollyCanvas />
        <Overlay />
      </section>

      {/* Project Case Studies */}
      <ProjectCaseStudies />

      {/* Holographic Footer */}
      <HolographicFooter />
    </main>
  );
}
