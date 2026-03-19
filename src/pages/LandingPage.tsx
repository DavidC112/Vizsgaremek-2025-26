import HeroSection from "../components/LandingPage/HeroSection";
import FeaturesGrid from "../components/LandingPage/FeaturesGrid";
import LandingFooter from "../components/LandingPage/LandingFooter";
import FeatureShowcase from "../components/LandingPage/FeatureShowcase";

const LandingPage = () => {
  return (
    <>
      <main>
        <HeroSection />
        <FeaturesGrid />
        <FeatureShowcase />
        <LandingFooter />
      </main>
    </>
  );
};

export default LandingPage;
