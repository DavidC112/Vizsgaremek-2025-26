import {
  Calculator,
  Calendar,
  ChefHat,
  Dumbbell,
  TrendingUp,
  Users,
  BarChart2,
  Utensils,
} from "lucide-react";
import FeaturesCard from "./FeaturesCard";
import { motion } from "framer-motion";

const featuresList = [
  {
    icon: Calculator,
    title: "Calorie Counter",
    description:
      "Track your daily calorie intake with a detailed history log. Set your personal calorie goal and monitor your progress throughout the day.",
  },
  {
    icon: ChefHat,
    title: "Recipe Recommendations",
    description:
      "Get personalized breakfast, lunch, and dinner recipe recommendations tailored to your calorie goals and dietary preferences.",
  },
  {
    icon: Users,
    title: "Community Recipes",
    description:
      "Upload and share your own recipes with the community. Browse recipes created by other users and get inspired.",
  },
  {
    icon: TrendingUp,
    title: "Personalized Meal Planner",
    description:
      "Automatic weekly meal planning tailored to your goals - whether you're losing weight, building muscle, or maintaining a healthy lifestyle.",
  },
  {
    icon: Dumbbell,
    title: "Exercise Tracking",
    description:
      "Log your workouts and see exactly how they affect your daily calorie balance. Supports a wide range of activities.",
  },
  {
    icon: BarChart2,
    title: "Statistics & Progress",
    description:
      "Visualize your journey with detailed charts: weight history, average calorie intake, macro breakdown, and activity logs.",
  },
  {
    icon: Calendar,
    title: "Daily & Weekly Log",
    description:
      "A full history of your meals and workouts, organized by day. Review your past entries and spot patterns in your habits.",
  },
  {
    icon: Utensils,
    title: "Recipe Library",
    description:
      "Browse a curated library of official recipes filtered by category, prep time, calories, portions, and dietary tags like vegan or vegetarian.",
  },
];

const FeaturesGrid = () => {
  return (
    <section className="mx-auto space-y-5 py-24 md:pb-32">
      <motion.header
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        viewport={{ once: true }}
        className="mx-auto space-y-4 px-6 text-center"
      >
        <h1 className="text-3xl tracking-widest md:text-5xl">
          Everything you need
        </h1>
        <h2 className="mx-auto max-w-2xl font-light text-neutral-500 md:text-lg">
          A complete toolkit for a healthier lifestyle - calorie tracking,
          recipes, meal planning, and fitness all in one place.
        </h2>
      </motion.header>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut", delay: 0.1 }}
        viewport={{ once: true }}
        className="grid items-stretch gap-8 px-10 lg:grid-cols-3 lg:px-30"
      >
        {featuresList.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.07, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <FeaturesCard
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default FeaturesGrid;
