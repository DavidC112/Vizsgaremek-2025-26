import { Link } from "react-router-dom";
import Silk from "../components/Silk";
import { ArrowLeft } from "lucide-react";
import LoginForm from "../components/LoginPage/LoginForm";
import { useMediaQuery } from "react-responsive";
import { motion, type Variants } from "framer-motion";

const AnimatedDiv = ({ children }: { children: React.ReactNode }) => {
  const isDesktop = useMediaQuery({ query: "(min-width: 1280px)" });
  return (
    <motion.div
      initial="hidden"
      animate="visible"
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
  hidden: { opacity: 0.9, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const LoginPage = () => {
  return (
    <main className="relative w-full overflow-hidden">
      <section className="absolute end-0 bottom-0 pr-10 pb-10">
        <section className="hidden h-10 text-5xl text-black italic transition-transform hover:scale-110 md:text-white xl:block">
          NutriLife
        </section>
      </section>

      <AnimatedDiv>
        <section className="relative mr-auto min-h-screen w-full space-y-10 rounded-none bg-transparent shadow-2xl md:w-[50%] md:max-xl:mx-auto md:max-xl:mt-60 md:max-xl:scale-140 md:max-xl:rounded-2xl md:max-xl:shadow-none xl:max-h-screen xl:rounded-r-2xl xl:bg-white">
          <section className="absolute pt-10 pl-10">
            <Link to="/">
              <ArrowLeft className="b-white z-10 hidden size-10 rounded-full border p-1 text-black transition-all duration-300 hover:scale-110 md:text-black xl:block" />
            </Link>
          </section>
          <h1 className="pt-20 text-center text-3xl font-bold text-white xl:text-black">
            Login
          </h1>
          <LoginForm />
          <h2 className="text-center font-extralight italic max-xl:text-white">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-primary-green-50 xl:text-primary-green-500 underline transition-all hover:font-normal"
            >
              Sign up
            </Link>
          </h2>
        </section>
      </AnimatedDiv>
      <div className="absolute inset-0 -z-10 h-full w-screen overflow-hidden">
        <Silk
          speed={5}
          scale={0.8}
          color="#6b9080"
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>
    </main>
  );
};

export default LoginPage;
