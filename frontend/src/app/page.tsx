import {
  ContactCTA,
  DevelopmentProcess,
  FAQ,
  Hero,
  Portfolio,
  Services,
  TechnologyStack,
  WhyCosmicLeaps,
} from "@/components/sections";

export default function HomePage() {
  return (
    <main className="bg-transparent">
      <Hero />

      <Services />

      <WhyCosmicLeaps />

      <DevelopmentProcess />

      <TechnologyStack />

      <Portfolio />

      <FAQ />

      <ContactCTA />
    </main>
  );
}