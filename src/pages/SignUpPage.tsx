import { ArrowLeft } from "lucide-react";
import Silk from "../components/Silk";
import Stepper, { Step } from "../components/Stepper";
import { Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import { useMediaQuery } from "react-responsive";

const AnimatedDiv = ({ children }: { children: React.ReactNode }) => {
  const isDesktop = useMediaQuery({ query: "(min-width: 1280px)" });
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={isDesktop ? desktopVariant : mobileVariant}
    >
      {children}
    </motion.div>
  );
};

const mobileVariant: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

const desktopVariant: Variants = {
  hidden: { opacity: 0.9, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const SignUpPage = () => {
  return (
    <main className="relative w-full overflow-hidden">
      <div className="absolute inset-0 -z-10 h-full w-screen overflow-hidden">
        <Silk
          speed={5}
          scale={0.8}
          color="#6b9080"
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>

      <section className="absolute pt-10 pl-10">
        <Link to="/">
          <ArrowLeft className="b-white hidden size-10 rounded-full border p-1 text-black transition-all duration-300 hover:scale-110 md:text-white xl:block" />
        </Link>
      </section>

      <section className="absolute bottom-0 left-0 hidden pb-10 pl-10 text-5xl text-black italic transition-transform hover:scale-110 md:text-white xl:block">
        NutriLife
      </section>

      <AnimatedDiv>
        <section className="relative ml-auto min-h-screen w-full space-y-10 rounded-none bg-transparent px-6 shadow-2xl md:w-[50%] md:max-xl:mx-auto md:max-xl:mt-60 md:max-xl:scale-140 md:max-xl:rounded-2xl md:max-xl:shadow-none xl:rounded-l-2xl xl:bg-white">
          <h1 className="pt-20 text-center text-3xl font-bold text-white xl:text-black">
            Sign Up
          </h1>

          <Stepper
            initialStep={1}
            backButtonText="Previous"
            nextButtonText="Next"
          >
            <Step>
              <h2>Step 1</h2>
            </Step>

            <Step>
              <h2>Step 2</h2>
            </Step>

            <Step>
              <h2>Step 3</h2>
            </Step>

            <Step>
              <h2>Final Step</h2>
              <p>You made it!</p>
            </Step>
          </Stepper>
          <h2 className="text-center font-extralight italic max-xl:text-white">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary-green-50 xl:text-primary-green-500 underline transition-all hover:font-normal"
            >
              Log in
            </Link>
          </h2>
        </section>
      </AnimatedDiv>
    </main>
  );
};

export default SignUpPage;
