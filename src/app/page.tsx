import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SpecsSection from "@/components/SpecsSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white text-slate-900 selection:bg-sky-500 selection:text-white">
      {/* Top Floating Luxury Navigation */}
      <Navbar />

      {/* Core Hero Section with GSAP Load & ScrollTrigger scrub animations */}
      <Hero />

      {/* Technical Specifications Section */}
      <SpecsSection />

      {/* Clean Footer */}
      <Footer />
    </main>
  );
}
