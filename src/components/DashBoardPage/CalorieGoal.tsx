import { Calendar, Dumbbell, TrendingUp } from "lucide-react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

const AnimatedNumber = ({ value }: { value: number }) => {
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) => Math.round(v));

  useEffect(() => {
    const controls = animate(motionVal, value, {
      duration: 1.2,
      ease: "easeOut",
    });
    return controls.stop;
  }, [value, motionVal]);

  return <motion.span>{rounded}</motion.span>;
};

const AnimatedProgressBar = ({ value }: { value: number }) => {
  const clamped = Math.min(Math.max(value, 0), 100);

  return (
    <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100">
      <motion.div
        className="h-full rounded-full bg-linear-to-r from-green-400 to-emerald-500"
        initial={{ width: "0%" }}
        animate={{ width: `${clamped}%` }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
      />
    </div>
  );
};

const CalorieGoal = ({
  consumedCalorie,
  burnedCalorie,
  netCalorie,
  weight,
  workoutToday,
  bmr,
  goalType,
}: {
  consumedCalorie: number;
  burnedCalorie: number;
  netCalorie: number;
  weight: number | undefined;
  workoutToday: number;
  bmr: number;
  goalType: string;
}) => {
  const miniStats = [
    { label: "Consumed", value: consumedCalorie ?? 0 },
    { label: "Burned", value: burnedCalorie ?? 0 },
    { label: "Net", value: netCalorie ?? 0 },
  ];

  const infoCards = [
    {
      icon: <TrendingUp className="text-purple-600" />,
      bg: "bg-purple-100",
      label: "Current Goal",
      value: goalType,
    },
    {
      icon: <Calendar className="text-primary-green-600" />,
      bg: "bg-primary-green-100",
      label: "Current Weight",
      value: weight ?? "—",
    },
    {
      icon: <Dumbbell className="text-orange-600" />,
      bg: "bg-orange-100",
      label: "Workouts Today",
      value: workoutToday,
    },
  ];

  return (
    <>
      <motion.section
        className="bg-blur space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div>
          <motion.h2
            className="font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            Daily calorie goal
          </motion.h2>
          <motion.h1
            className="text-3xl"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.4 }}
          >
            <AnimatedNumber value={bmr} />
          </motion.h1>
        </div>

        <div className="space-y-2">
          <AnimatedProgressBar value={(netCalorie / bmr) * 100} />
          <motion.div
            className="flex justify-between"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.3 }}
          >
            <p>{((netCalorie / bmr) * 100).toFixed(2)}%</p>
            <p>{bmr - netCalorie} remaining</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {miniStats.map(({ label, value }) => (
            <div className="rounded-xl border border-gray-200 bg-white p-2 shadow-2xs">
              <p className="text-xs">{label}</p>
              <p>
                <AnimatedNumber value={value} />
              </p>
            </div>
          ))}
        </div>
      </motion.section>

      <section className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
        {infoCards.map(({ icon, bg, label, value }, i) => (
          <motion.div
            key={label}
            className="flex items-center space-x-5 rounded-xl border border-gray-200 bg-white p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: i * 0.1,
              duration: 0.5,
              ease: "easeOut",
            }}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              className={`flex h-12 w-12 items-center justify-center rounded-full ${bg}`}
              whileHover={{ rotate: 12, scale: 1.15 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              {icon}
            </motion.div>
            <div>
              <h2 className="font-extralight">{label}</h2>
              <h1 className="text-xl">{value}</h1>
            </div>
          </motion.div>
        ))}
      </section>
    </>
  );
};

export default CalorieGoal;
