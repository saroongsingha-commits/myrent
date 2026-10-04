import { Catalog } from "@/components/landing/Catalog";
import { FaqSection } from "@/components/landing/FaqSection";
import { FooterCta } from "@/components/landing/FooterCta";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { LocationSection } from "@/components/landing/LocationSection";
import { Navbar } from "@/components/landing/Navbar";
import { Testimonials } from "@/components/landing/Testimonials";
import { motion } from "framer-motion";

export default function Landing() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-background text-foreground"
    >
      <Navbar />
      <main>
        <Hero />
        <Catalog />
        <HowItWorks />
        <Testimonials />
        <FaqSection />
        <LocationSection />
      </main>
      <FooterCta />
    </motion.div>
  );
}
