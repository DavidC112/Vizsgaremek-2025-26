import {
  Calculator,
  Calendar,
  ChefHat,
  Dumbbell,
  Heart,
  Share2,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react";
import FeaturesCard from "./FeaturesCard";

const featuresList = [
  {
    icon: Calculator,
    title: "Calorie Counter",
    description:
      "Daily and history log with calorie borrowing feature. If you overeat, the next day recommends fewer calories.",
  },
  {
    icon: ChefHat,
    title: "Recipe Recommendations",
    description:
      "Breakfast, lunch and dinner recipes personalized to your taste and calorie goals.",
  },
  {
    icon: Users,
    title: "Community Recipes",
    description:
      "Upload your own recipes, follow your friends' recipes, comment and rate.",
  },
  {
    icon: TrendingUp,
    title: "Personalized Meal Planner",
    description:
      "Automatic meal planning tailored to your goals – weight loss, muscle building or healthy lifestyle.",
  },
  {
    icon: ShoppingCart,
    title: "Shopping List Generator",
    description:
      "Automatic shopping list creation from your weekly meal plan, with one click.",
  },
  {
    icon: Dumbbell,
    title: "Exercise Integration",
    description:
      "Record your workouts and see how they affect your daily calorie goal.",
  },
  {
    icon: Heart,
    title: "Health Metrics",
    description:
      "Log your weight, blood pressure and other health data in one place.",
  },
  {
    icon: Calendar,
    title: "Daily Log",
    description: "Detailed history and statistics to track your progress.",
  },
  {
    icon: Share2,
    title: "Social Features",
    description:
      "Mark favorite recipes, follow friends and engage with the community.",
  },
];

const FeaturesGrid = () => {
  return (
    <>
      <section className="grid-col-1 mx-auto grid justify-center space-y-5 py-30 md:max-lg:py-40">
        <header className="mx-auto space-y-5 text-center">
          <h1 className="text-3xl tracking-widest md:text-5xl">
            Everything you need
          </h1>
          <h2 className="font-light md:w-2xl">
            Complete solution for a healthy lifestyle - calorie counter,
            recipes, community and health tracking on one platform.
          </h2>
        </header>
        <article className="grid gap-8 px-10 lg:grid-cols-3 lg:px-30">
          {featuresList.map((features, _) => (
            <FeaturesCard
              key={_}
              icon={features.icon}
              title={features.title}
              description={features.description}
            />
          ))}
        </article>
      </section>
    </>
  );
};
export default FeaturesGrid;
