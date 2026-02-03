import { useMediaQuery } from "react-responsive";
import Stepper, { Step } from "../Stepper";
import { motion, type Variants } from "framer-motion";
import { Link } from "react-router-dom";
import UserDetailsStep from "./UserDetailsStep";
import { useSignUpContext } from "../../context/UserSignUpContext";

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

const SignUpSection = () => {
  const { userDetails, updateUserDetails } = useSignUpContext();

  return (
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
          <UserDetailsStep details={userDetails} onChange={updateUserDetails} />

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
  );
};
export default SignUpSection;
