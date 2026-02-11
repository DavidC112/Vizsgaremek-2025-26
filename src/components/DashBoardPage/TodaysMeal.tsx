import { Check } from "lucide-react";

const TodaysMeal = () => {
  return (
    <>
      <section className="">
        <div className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <span className="flex justify-between">
            <div className="text-xl">Today's Meals</div>
            <div className="cursor-default rounded-xl border border-gray-400 px-3 py-1 hover:bg-gray-100">
              View Plan
            </div>
          </span>
          <div>
            <div className="space-y-3">
              <div
                key={0}
                className="flex items-center justify-between rounded-lg bg-gray-50 p-4 transition-colors hover:bg-gray-100"
              >
                <div className="flex items-center gap-4">
                  <div className="primary- flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-br from-green-400 to-blue-500"></div>
                  <div>
                    <p className="font-semibold">meal neve</p>
                    <p className="text-sm font-extralight">type • time</p>
                  </div>
                </div>
                <div className="cols-2 flex gap-3 text-right">
                  <div>
                    <p className="font-semibold text-orange-600">420 cal</p>
                    <p className="text-xs font-extralight md:text-sm">
                      P: 28g | C: 28 g | F: 18g
                    </p>
                  </div>

                  {/* if the user adds the meal as eaten */}
                  {/* <div className="flex size-10 items-center justify-center rounded-full bg-emerald-300">
                    <Check className="text-emerald-800" />
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default TodaysMeal;
