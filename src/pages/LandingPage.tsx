import { Link } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import HeroSection from "../components/LandingPage/HeroSection";
import FeaturesGrid from "../components/LandingPage/FeaturesGrid";
import LandingFooter from "../components/LandingPage/LandingFooter";
import FeatureShowcase from "../components/LandingPage/FeatureShowcase";

const LandingPage = () => {
  return (
    <>
      <Navbar>
        <div className="flex space-x-15">
          <section className="my-auto hidden w-full md:block md:w-auto">
            <ul className="flex space-x-15">
              <li>
                <a href="#">Link 1</a>
              </li>
              <li>
                <a href="#">Link 2</a>
              </li>
              <li>
                <a href="#">Link 3</a>
              </li>
            </ul>
          </section>

          <section>
            <Link
              to="/login"
              className="bg-primary-green-400 hover:bg-primary-green-500 rounded-3xl px-6 py-1 text-white md:px-10"
            >
              Login
            </Link>
          </section>
        </div>
      </Navbar>

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
