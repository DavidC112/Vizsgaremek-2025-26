import { Check, TrendingUp } from "lucide-react";
import { useEffect } from "react";

const FeatureShowcase = () => {
  useEffect(() => {
    console.log(typeof Check);
  }, []);

  return (
    <>
      {/*Calorie Tracking*/}

      <article className="mx-auto max-w-7xl space-y-32">
        <div className="grid grid-cols-1 flex-col-reverse gap-10 px-5 md:px-15 lg:grid-cols-2">
          <section className="order-2 space-y-6 lg:order-1">
            <h1 className="text-3xl tracking-tight md:text-5xl">
              Calorie tracking
            </h1>
            <h2 className="font-extralight md:text-2xl">
              Daily and history log to accurately track your calorie intake. The
              unique calorie borrowing feature allows you to manage your meals
              more flexibly.
            </h2>
            <ul className="mb-8 space-y-4">
              <li className="flex items-start gap-3">
                <div className="bg-primary-green-400 mt-1 rounded-full p-1">
                  <Check className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h1 className="">Daily and weekly history</h1>
                  <h2 className="font-light">Detailed statistics and charts</h2>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-primary-green-400 mt-1 rounded-full p-1">
                  <TrendingUp className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h1 className="">Automatic goal tracking</h1>
                  <h2 className="font-light">
                    Personalized daily calorie targets
                  </h2>
                </div>
              </li>
            </ul>
          </section>
          <aside className="relative order-1 lg:order-2">
            <div className="from-primary-green-400 absolute -inset-4 rounded-2xl bg-linear-to-r to-blue-500 opacity-10 blur-2xl"></div>
            <div className="relative overflow-hidden rounded-2xl border border-gray-200 shadow-2xl">
              <img
                src="photo-1711698520626-bae97bc6c204.jpeg"
                alt="Calorie counter app"
                className="h-auto w-full"
              />
            </div>
          </aside>
        </div>

        {/*Personal Reacipe*/}

        <div className="grid grid-cols-1 flex-col-reverse gap-10 px-5 py-20 md:px-15 lg:grid-cols-2">
          <div className="relative my-auto">
            <div className="absolute -inset-4 rounded-2xl bg-linear-to-r from-orange-400 to-pink-500 opacity-10 blur-2xl"></div>
            <div className="relative overflow-hidden rounded-2xl border border-gray-200 shadow-2xl">
              <img
                src="photo-1732850960570-dc1fafea0970.jpeg"
                alt="Recipes and food"
                className="h-auto w-full"
              />
            </div>
          </div>
          <section className="order-1 space-y-6 lg:order-2">
            <h1 className="text-3xl tracking-tight md:text-5xl">
              Personalized recipe recommendations
            </h1>
            <h2 className="font-extralight md:text-2xl">
              Breakfast, lunch and dinner recipes tailored to your taste and
              calorie goals. Automatic meal planning and shopping list
              generation.
            </h2>
            <div className="space-y-6">
              <div className="rounded-xl border border-gray-200 bg-white p-6 transition-shadow duration-300 hover:shadow-lg">
                <div className="mb-2">🍳 Breakfast recipes</div>
                <div className="font-extralight">
                  Energizing breakfast ideas aligned with your calorie goals
                </div>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-6 transition-shadow duration-300 hover:shadow-lg">
                <div className="mb-2">🥗 Lunch & dinner recommendations</div>
                <div className="font-extralight">
                  Varied main dishes with nutritional information
                </div>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-6 transition-shadow duration-300 hover:shadow-lg">
                <div className="mb-2">🛒 Automatic shopping list</div>
                <div className="font-extralight">
                  One click from your weekly meal plan
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Community and sharing */}
        <div className="grid grid-cols-1 flex-col-reverse gap-10 px-5 py-20 md:px-15 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <h2 className="mb-6 text-4xl lg:text-5xl">Community and sharing</h2>

            <p className="mb-8 text-xl font-extralight">
              Upload your own recipes, follow your friends' recipes, comment and
              rate. Healthy lifestyle is a community experience.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-linear-to-br from-purple-50 to-pink-50 p-6 transition-all duration-300 hover:shadow">
                <div className="mb-2 text-3xl transition-transform">💚</div>
                <div className="mb-1 text-gray-900">Favorites</div>
                <div className="text-sm font-extralight">
                  Mark your favorite recipes
                </div>
              </div>

              <div className="rounded-xl bg-linear-to-br from-blue-50 to-cyan-50 p-6 transition-all duration-300 hover:shadow">
                <div className="mb-2 text-3xl">👥</div>
                <div className="mb-1 text-gray-900">Follow</div>
                <div className="text-sm font-extralight">
                  Follow your friends' recipes
                </div>
              </div>

              <div className="rounded-xl bg-linear-to-br from-orange-50 to-yellow-50 p-6 transition-all duration-300 hover:shadow">
                <div className="mb-2 text-3xl">💬</div>
                <div className="mb-1 text-gray-900">Comments</div>
                <div className="text-sm font-extralight">
                  Share your opinion
                </div>
              </div>

              <div className="to-primary-green-100 rounded-xl bg-linear-to-br from-green-50 p-6 transition-all duration-300 hover:shadow">
                <div className="mb-2 text-3xl">⭐</div>
                <div className="mb-1 text-gray-900">Ratings</div>
                <div className="text-sm font-extralight">Rate the recipes</div>
              </div>
            </div>
          </div>

          <div className="relative order-1 my-auto lg:order-2">
            <div className="absolute -inset-4 rounded-2xl bg-linear-to-r from-purple-400 to-pink-500 opacity-10 blur-2xl"></div>
            <div className="relative overflow-hidden rounded-2xl border border-gray-200 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1740065592719-052d3e5ec6fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllbmRzJTIwY29tbXVuaXR5JTIwdG9nZXRoZXJ8ZW58MXx8fHwxNzY1Nzc1MjEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Community"
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </article>
    </>
  );
};
export default FeatureShowcase;
