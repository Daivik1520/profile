import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import ProjectCaseStudies from "@/components/ProjectCaseStudies";
import HolographicFooter from "@/components/HolographicFooter";
import VirtualMouse from "@/components/VirtualMouse";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* Virtual Mouse Control */}
      <VirtualMouse />

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
