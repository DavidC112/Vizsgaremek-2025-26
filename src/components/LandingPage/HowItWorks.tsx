import { motion } from "framer-motion";
import { UserPlus, Ruler, UtensilsCrossed, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Create your account",
    description:
      "Sign up in seconds. Enter your age, height, weight, and fitness goal - we'll calculate your daily calorie target automatically.",
    color: "bg-emerald-50",
    iconColor: "text-emerald-600",
    border: "border-emerald-100",
  },
  {
    number: "02",
    icon: Ruler,
    title: "Set your goal",
    description:
      "Choose your target weight and deadline. NutriLife builds your personalized calorie plan and weekly meal recommendations around it.",
    color: "bg-blue-50",
    iconColor: "text-blue-600",
    border: "border-blue-100",
  },
  {
    number: "03",
    icon: UtensilsCrossed,
    title: "Log meals & workouts",
    description:
      "Browse recipes, add meals to your daily log, and record your workouts. Watch your net calorie balance update in real time.",
    color: "bg-orange-50",
    iconColor: "text-orange-600",
    border: "border-orange-100",
  },
  {
    number: "04",
    icon: TrendingUp,
    title: "Track your progress",
    description:
      "Check your statistics dashboard to see weight trends, average calorie intake, and macro breakdown over time.",
    color: "bg-violet-50",
    iconColor: "text-violet-600",
    border: "border-violet-100",
  },
];

const HowItWorks = () => {
  return (
    <section className="from-primary-green-50 bg-linear-to-b to-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-16 space-y-4 text-center"
        >
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-700">
            Simple by design
          </div>
          <h2 className="text-3xl tracking-tight md:text-5xl">How it works</h2>
          <p className="mx-auto max-w-xl font-light text-neutral-500 md:text-lg">
            From sign-up to progress tracking - get up and running in minutes,
            not hours.
          </p>
        </motion.div>

        <div className="relative grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="absolute top-10 left-0 hidden h-px w-full bg-linear-to-r from-transparent via-neutral-200 to-transparent lg:block" />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
                viewport={{ once: true }}
                className={`relative flex flex-col gap-4 rounded-2xl border ${step.border} bg-white p-6 shadow-sm`}
              >
                <div className="absolute -top-3 left-6 rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-neutral-400 shadow-sm ring-1 ring-neutral-100">
                  {step.number}
                </div>

                <div className={`w-fit rounded-xl ${step.color} p-3`}>
                  <Icon className={`h-6 w-6 ${step.iconColor}`} />
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-neutral-900">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed font-light text-neutral-500">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <Link
            to="/register"
            className="bg-primary-green-400 hover:bg-primary-green-500 inline-block rounded-3xl px-10 py-3 text-lg text-white transition-colors duration-300"
          >
            Start
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
