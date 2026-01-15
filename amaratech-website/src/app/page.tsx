import Hero from "@/components/sections/Hero";
import TrustedBy from "@/components/sections/TrustedBy";
import CoreBusiness from "@/components/sections/CoreBusiness";
import Services from "@/components/sections/Services";
import Products from "@/components/sections/Products";
import Locations from "@/components/sections/Locations";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      {/* The Story of AmaraTech - Clean, Focused Sections */}
      <Hero />
      <TrustedBy />
      <CoreBusiness />
      <Services />
      <Products />
      <Locations />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}
