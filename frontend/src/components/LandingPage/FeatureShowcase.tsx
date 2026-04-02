import { Check, BarChart2, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const FeatureShowcase = () => {
  return (
    <article
      id="recipes-showcase"
      className="mx-auto max-w-7xl space-y-28 px-5 py-16 md:px-15"
    >
      {/*Nutrition Tracking */}

      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        viewport={{ once: true, amount: 0.3 }}
        className="grid grid-cols-1 gap-10 lg:grid-cols-2"
      >
        <section className="order-2 space-y-6 lg:order-1">
          <div className="inline-block rounded-full bg-emerald-50 px-4 py-1 text-sm font-medium text-emerald-700">
            Nutrition Tracking
          </div>
          <h1 className="text-3xl tracking-tight md:text-5xl">
            Know exactly what you eat
          </h1>
          <h2 className="font-extralight text-neutral-600 md:text-xl">
            Log your meals daily, track your calorie intake against your
            personal goal, and review your full history week by week.
          </h2>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="bg-primary-green-400 mt-1 rounded-full p-1">
                <Check className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="font-medium">Daily & weekly history</p>
                <p className="font-light text-neutral-500">
                  Review past meals and spot patterns in your eating habits
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="bg-primary-green-400 mt-1 rounded-full p-1">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="font-medium">Automatic goal tracking</p>
                <p className="font-light text-neutral-500">
                  Personalized daily calorie targets based on your profile
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="bg-primary-green-400 mt-1 rounded-full p-1">
                <BarChart2 className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="font-medium">Macro breakdown</p>
                <p className="font-light text-neutral-500">
                  See your protein, carbohydrate, and fat balance at a glance
                </p>
              </div>
            </li>
          </ul>
        </section>

        <aside className="relative order-1 lg:order-2">
          <div className="from-primary-green-400 absolute -inset-4 rounded-2xl bg-linear-to-r to-blue-500 opacity-10 blur-2xl" />
          <div className="relative overflow-hidden rounded-2xl border border-gray-200 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1080&q=80"
              alt="Calorie tracking dashboard"
              className="h-auto w-full"
            />
          </div>
        </aside>
      </motion.div>

      {/* Meal Planning & Recipes */}
      <motion.div
        id="meal-planning"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        viewport={{ once: true, amount: 0.3 }}
        className="grid grid-cols-1 gap-10 pt-5 lg:grid-cols-2"
      >
        <div className="relative order-2 my-auto lg:order-1">
          <div className="absolute -inset-4 rounded-2xl bg-linear-to-r from-orange-400 to-pink-500 opacity-10 blur-2xl" />
          <div className="relative overflow-hidden rounded-2xl border border-gray-200 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1547592180-85f173990554?w=1080&q=80"
              alt="Meal planning and recipes"
              className="h-auto w-full"
            />
          </div>
        </div>

        <section className="order-1 space-y-6 lg:order-2">
          <div className="inline-block rounded-full bg-orange-50 px-4 py-1 text-sm font-medium text-orange-700">
            Meal Planning
          </div>
          <h1 className="text-3xl tracking-tight md:text-5xl">
            Your week, planned for you
          </h1>
          <h2 className="font-extralight text-neutral-600 md:text-xl">
            Get a personalized weekly meal plan with breakfast, soup, lunch, and
            dinner recommendations - all aligned with your calorie goals.
          </h2>
          <div className="space-y-4">
            <div className="rounded-xl border border-gray-200 bg-white p-5 transition-shadow duration-300 hover:shadow-md">
              <p className="mb-1 font-medium">🍳 Breakfast recommendations</p>
              <p className="font-extralight text-neutral-500">
                Start your day right with energizing, goal-aligned breakfast
                ideas
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-5 transition-shadow duration-300 hover:shadow-md">
              <p className="mb-1 font-medium">🥗 Lunch & dinner options</p>
              <p className="font-extralight text-neutral-500">
                Varied main dishes and soups with full nutritional information
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-5 transition-shadow duration-300 hover:shadow-md">
              <p className="mb-1 font-medium">🔍 Advanced recipe filtering</p>
              <p className="font-extralight text-neutral-500">
                Filter by calories, prep time, portions, vegan, vegetarian, and
                more
              </p>
            </div>
          </div>
        </section>
      </motion.div>

      {/* Exercise & Statistics */}
      <motion.div
        id="fitness-showcase"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        viewport={{ once: true, amount: 0.3 }}
        className="grid grid-cols-1 gap-10 pt-5 lg:grid-cols-2"
      >
        <section className="order-1 space-y-6 lg:order-2">
          <div className="inline-block rounded-full bg-blue-50 px-4 py-1 text-sm font-medium text-blue-700">
            Fitness & Progress
          </div>
          <h1 className="text-3xl tracking-tight md:text-5xl">
            Track your workouts & progress
          </h1>
          <h2 className="font-extralight text-neutral-600 md:text-xl">
            Log your exercises, see how many calories you've burned, and
            visualize your weight and nutrition trends over time.
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-linear-to-br from-emerald-50 to-teal-50 p-5 transition-all duration-300 hover:shadow-sm">
              <div className="mb-2 text-3xl">🏃</div>
              <p className="mb-1 font-medium text-gray-900">Exercise Log</p>
              <p className="text-sm font-extralight text-neutral-500">
                Track workouts and calories burned
              </p>
            </div>
            <div className="rounded-xl bg-linear-to-br from-blue-50 to-indigo-50 p-5 transition-all duration-300 hover:shadow-sm">
              <div className="mb-2 text-3xl">📊</div>
              <p className="mb-1 font-medium text-gray-900">Statistics</p>
              <p className="text-sm font-extralight text-neutral-500">
                Charts for weight, intake & macros
              </p>
            </div>
            <div className="rounded-xl bg-linear-to-br from-purple-50 to-pink-50 p-5 transition-all duration-300 hover:shadow-sm">
              <div className="mb-2 text-3xl">⚖️</div>
              <p className="mb-1 font-medium text-gray-900">Body Metrics</p>
              <p className="text-sm font-extralight text-neutral-500">
                Log weight, height, BMI & BMR
              </p>
            </div>
            <div className="rounded-xl bg-linear-to-br from-orange-50 to-yellow-50 p-5 transition-all duration-300 hover:shadow-sm">
              <div className="mb-2 text-3xl">🎯</div>
              <p className="mb-1 font-medium text-gray-900">Goal Tracking</p>
              <p className="text-sm font-extralight text-neutral-500">
                Set target weight with a deadline
              </p>
            </div>
          </div>
        </section>

        <aside className="relative order-1 my-auto lg:order-2">
          <div className="absolute -inset-4 rounded-2xl bg-linear-to-r from-blue-400 to-indigo-500 opacity-10 blur-2xl" />
          <div className="relative overflow-hidden rounded-2xl border border-gray-200 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1080&q=80"
              alt="Fitness tracking"
              className="h-auto w-full"
            />
          </div>
        </aside>
      </motion.div>

      {/* Community Recipes */}
      <motion.div
        id="community"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        viewport={{ once: true, amount: 0.4 }}
        className="grid grid-cols-1 gap-10 pt-5 lg:grid-cols-2"
      >
        <div className="relative order-2 my-auto lg:order-1">
          <div className="absolute -inset-4 rounded-2xl bg-linear-to-r from-violet-400 to-pink-500 opacity-10 blur-2xl" />
          <div className="relative overflow-hidden rounded-2xl border border-gray-200 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1740065592719-052d3e5ec6fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllbmRzJTIwY29tbXVuaXR5JTIwdG9nZXRoZXJ8ZW58MXx8fHwxNzY1Nzc1MjEwfDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Community recipes"
              className="h-auto w-full"
            />
          </div>
        </div>

        <section className="order-1 space-y-6 lg:order-2">
          <div className="inline-block rounded-full bg-violet-50 px-4 py-1 text-sm font-medium text-violet-700">
            Community
          </div>
          <h1 className="text-3xl tracking-tight md:text-5xl">
            Share what you cook
          </h1>
          <h2 className="font-extralight text-neutral-600 md:text-xl">
            Upload your own recipes for others to discover. Browse and cook
            recipes shared by the community, with full nutritional details.
          </h2>
          <div className="space-y-3">
            <div className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-4 transition-shadow duration-300 hover:shadow-sm">
              <span className="text-2xl">📤</span>
              <div>
                <p className="font-medium">Upload your recipes</p>
                <p className="text-sm font-extralight text-neutral-500">
                  Add ingredients, steps, photos, and nutritional info
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-4 transition-shadow duration-300 hover:shadow-sm">
              <span className="text-2xl">🔎</span>
              <div>
                <p className="font-medium">Browse community creations</p>
                <p className="text-sm font-extralight text-neutral-500">
                  Filter by vegan, vegetarian, category, and more
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-4 transition-shadow duration-300 hover:shadow-sm">
              <span className="text-2xl">➕</span>
              <div>
                <p className="font-medium">Add to your daily meals</p>
                <p className="text-sm font-extralight text-neutral-500">
                  Log any recipe directly to your daily calorie tracker
                </p>
              </div>
            </div>
          </div>
        </section>
      </motion.div>
    </article>
  );
};

export default FeatureShowcase;
