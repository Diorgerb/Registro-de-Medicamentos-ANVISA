import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { HeroSection } from '../components/landing/HeroSection';
import { FeaturesSection } from '../components/landing/FeaturesSection';
import { FreeDashboardSection } from '../components/landing/FreeDashboardSection';
import { HowItWorksSection } from '../components/landing/HowItWorksSection';

export function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <FreeDashboardSection />
        <HowItWorksSection />
      </main>
      <Footer />
    </div>
  );
}
