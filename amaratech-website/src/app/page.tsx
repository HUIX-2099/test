import Hero from "@/components/sections/Hero";
import TrustedBy from "@/components/sections/TrustedBy";
import Services from "@/components/sections/Services";
import Features from "@/components/sections/Features";
import Process from "@/components/sections/Process";
import Products from "@/components/sections/Products";
import TechShowcase from "@/components/sections/TechShowcase";
import Locations from "@/components/sections/Locations";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";
import ParallaxSection from "../components/sections/ParallaxSection";

export default function Home() {
  return (
    <>
      {/* The Story of AmaraTech - Clean, Focused Sections */}
      <Hero />
      <TrustedBy />
      <Services />
      <Features />
      <ParallaxSection
        kicker="BLUEPRINT_SCROLL"
        title="Built like a circuit. Secured like a fortress."
        description="Scroll to feel the depth — this section uses your new blueprint image as a parallax layer behind the content."
      >
        <div style={{ display: "grid", gap: 10, maxWidth: 720 }}>
          <div
            style={{
              padding: 14,
              borderRadius: 14,
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(5,7,15,0.55)",
              backdropFilter: "blur(10px)",
            }}
          >
            <strong style={{ display: "block", marginBottom: 6 }}>
              Architecture-first delivery
            </strong>
            <span style={{ color: "rgba(255,255,255,0.78)", lineHeight: 1.5 }}>
              We map cloud + security controls like a board layout: clean paths, clear ownership,
              and zero-trust boundaries.
            </span>
          </div>
          <div
            style={{
              padding: 14,
              borderRadius: 14,
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(5,7,15,0.55)",
              backdropFilter: "blur(10px)",
            }}
          >
            <strong style={{ display: "block", marginBottom: 6 }}>
              Compliance-ready by design
            </strong>
            <span style={{ color: "rgba(255,255,255,0.78)", lineHeight: 1.5 }}>
              CMMC / HIPAA / SOC-aligned practices baked into the workflow instead of bolted on later.
            </span>
          </div>
        </div>
      </ParallaxSection>
      <Process />
      <Products />
      <TechShowcase />
      <Locations />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}
