import { useStatistics } from "../../context/StatisticsContext";
import { motion, type Variants } from "framer-motion";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.45, ease: "easeOut" as const },
  }),
};

const StatisticsCards = () => {
  const { avgCaloriesConsumed, avgCaloriesBurned } = useStatistics();

  return (
    <section className="mx-auto grid max-w-7xl grid-cols-1 gap-4 md:grid-cols-2">
      {[
        {
          label: "Avg. Calorie Consumed",
          value: avgCaloriesConsumed,
          className: "text-primary-green-500 text-xl font-semibold",
        },
        {
          label: "Avg. Calorie Burned",
          value: avgCaloriesBurned,
          className: "text-xl font-semibold text-orange-500",
        },
      ].map((card, i) => (
        <motion.div
          key={card.label}
          custom={i}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.02, boxShadow: "0 6px 24px rgba(0,0,0,0.08)" }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="flex items-center space-x-5 rounded-xl border border-gray-200 bg-white p-4"
        >
          <div>
            <h2>{card.label}</h2>
            <h1 className={card.className}>{card.value}</h1>
          </div>
        </motion.div>
      ))}
    </section>
  );
};

export default StatisticsCards;
