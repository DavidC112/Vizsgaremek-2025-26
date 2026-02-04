import { useMediaQuery } from "react-responsive";
import Stepper, { Step } from "../Stepper";
import { motion, type Variants } from "framer-motion";
import { Link } from "react-router-dom";
import UserDetailsStep from "./UserDetailsStep";
import { useSignUpContext } from "../../context/UserSignUpContext";
import { useRef, useState } from "react";
import {
  validateUserAttributes,
  validateUserDetails,
} from "../../utils/signUpValidators";
import UserAttributesStep from "./UserAttributesStep";

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
  const {
    userDetails,
    updateUserDetails,
    userAttributes,
    updateUserAttributes,
  } = useSignUpContext();

  // key + initialStep to allow remounting Stepper to previous step if validation fails
  const [stepperKey, setStepperKey] = useState(0);
  const [stepperInitial, setStepperInitial] = useState(1);
  const prevStepRef = useRef<number>(1);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleStepChange = (newStep: number) => {
    const prev = prevStepRef.current;

    // only validate when moving forward from step 1 (adjustable per-step)
    if (newStep > prev && prev === 1) {
      const { isValid, errors: vErrors } = validateUserDetails(userDetails);
      if (!isValid) {
        // show inline errors and revert UI by remounting Stepper to previous step
        setErrors(vErrors as Record<string, string>);
        setStepperInitial(prev);
        setStepperKey((k) => k + 1);
        return;
      } else {
        setErrors({});
      }
    }
    if (newStep > prev && prev === 2) {
      const { isValid, errors: vErrors } =
        validateUserAttributes(userAttributes);
      if (!isValid) {
        setErrors(vErrors as Record<string, string>);
        setStepperInitial(prev);
        setStepperKey((k) => k + 1);
        return;
      } else {
        setErrors({});
      }
    }

    prevStepRef.current = newStep;
  };

  return (
    <AnimatedDiv>
      <section className="relative ml-auto min-h-screen w-full space-y-10 rounded-none bg-transparent px-6 shadow-2xl md:w-[50%] md:max-xl:mx-auto md:max-xl:mt-60 md:max-xl:scale-140 md:max-xl:rounded-2xl md:max-xl:shadow-none xl:max-h-screen xl:rounded-l-2xl xl:bg-white">
        <h1 className="pt-20 text-center text-3xl font-bold text-white xl:text-black">
          Sign Up
        </h1>
        <Stepper
          key={stepperKey}
          initialStep={stepperInitial}
          backButtonText="Previous"
          nextButtonText="Next"
          onStepChange={handleStepChange}
        >
          <UserDetailsStep
            details={userDetails}
            onChange={updateUserDetails}
            errors={errors}
          />

          <UserAttributesStep
            details={userAttributes}
            onChange={updateUserAttributes}
            errors={errors}
          />
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
