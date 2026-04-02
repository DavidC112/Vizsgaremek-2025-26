import HeroSection from "../components/LandingPage/HeroSection";
import FeaturesGrid from "../components/LandingPage/FeaturesGrid";
import LandingFooter from "../components/LandingPage/LandingFooter";
import FeatureShowcase from "../components/LandingPage/FeatureShowcase";
import HowItWorks from "../components/LandingPage/HowItWorks";

const LandingPage = () => {
  return (
    <>
      <main>
        <HeroSection />

        <section id="features">
          <FeaturesGrid />
        </section>

        <section id="how-it-works">
          <HowItWorks />
        </section>

        <FeatureShowcase />

        <LandingFooter />
      </main>
    </>
  );
};

export default LandingPage;
