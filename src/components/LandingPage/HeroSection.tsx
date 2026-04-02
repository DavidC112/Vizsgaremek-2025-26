import { Link } from "react-router-dom";
import { motion } from "motion/react";

const HeroSection = () => {
  return (
    <>
      <div className="from-primary-green-50 relative overflow-hidden bg-linear-to-br via-white to-blue-50 px-15 py-10 md:py-40 lg:px-13 lg:max-xl:py-25">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="mx-auto max-w-7xl"
        >
          <section className="grid grid-cols-1 items-center gap-12 md:gap-20 md:max-lg:text-center lg:grid-cols-2 lg:gap-8">
            <article className="flex flex-col gap-8 md:gap-15">
              <h1 className="text-5xl font-semibold tracking-tight lg:text-7xl">
                Complex Nutrition &{" "}
                <span className="text-primary-green-400">
                  Health Management
                </span>
              </h1>
              <p className="max-w-xl text-2xl font-extralight tracking-tight italic md:max-lg:mx-auto">
                Log meals, plan your week, track workouts, and watch your
                progress - all in one place.
              </p>
              <span className="border-b border-gray-400"></span>
              <div className="flex flex-col gap-4 text-center md:flex-row md:gap-6 md:max-lg:mx-auto xl:justify-between">
                <Link
                  to="/register"
                  className="bg-primary-green-400 hover:bg-primary-green-500 rounded-3xl px-6 py-3 text-lg text-white transition-colors duration-300 md:max-lg:px-10 xl:px-15 xl:text-xl"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="md:max-lgpx-10 text-md rounded-3xl border px-6 py-3 font-extralight italic"
                >
                  Already have an account
                </Link>
              </div>
            </article>
            <aside className="relative md:mx-auto md:max-lg:w-2/3">
              <div className="from-primary-green-400 absolute -inset-4 rounded-2xl bg-linear-to-r to-blue-500 opacity-20 blur-2xl"></div>
              <div className="relative size-full overflow-hidden rounded-2xl">
                <img
                  src="572949-1640772.jpg"
                  alt=""
                  className="h-auto w-full"
                />
              </div>
            </aside>
          </section>
        </motion.div>
      </div>
    </>
  );
};
export default HeroSection;
