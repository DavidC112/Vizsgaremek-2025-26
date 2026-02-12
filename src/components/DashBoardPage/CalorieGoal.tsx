import { Calendar, Dumbbell, TrendingUp } from "lucide-react";
import ProgressBar from "../ui/ProgressBar";

const CalorieGoal = () => {
  return (
    <>
      <section className="bg-blur space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
        <div className="">
          <h2 className="font-light">Daily calorie goal</h2>
          <h1 className="text-3xl">2300 cal</h1>
        </div>
        <div className="space-y-2">
          <ProgressBar value={(1100 / 2300) * 100} />
          <div className="flex justify-between">
            <p>1100</p>
            <p>remaining</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-xl border border-gray-200 bg-white p-2 shadow-2xs">
            <p className="text-xs">Consumed</p>
            <p>1100</p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-2 shadow-2xs">
            <p className="text-xs">Burned</p>
            <p>0</p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-2 shadow-2xs">
            <p className="text-xs">Net</p>
            <p>1100</p>
          </div>
        </div>
      </section>
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="flex items-center space-x-5 rounded-xl border border-gray-200 bg-white p-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
            <TrendingUp className="text-purple-600" />
          </div>
          <div>
            <h2 className="font-extralight">Current Goal</h2>
            <h1 className="text-xl">Muscle Gain</h1>
          </div>
        </div>
        <div className="flex items-center space-x-5 rounded-xl border border-gray-200 bg-white p-4">
          <div className="bg-primary-green-100 flex h-12 w-12 items-center justify-center rounded-full">
            <Calendar className="text-primary-green-600" />
          </div>
          <div>
            <h2 className="font-extralight">Current Weight</h2>
            <h1 className="text-xl">60 kg</h1>
          </div>
        </div>
        <div className="flex items-center space-x-5 rounded-xl border border-gray-200 bg-white p-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
            <Dumbbell className="text-orange-600" />
          </div>
          <div>
            <h2 className="font-extralight">Workouts Today</h2>
            <h1 className="text-xl">0</h1>
          </div>
        </div>
      </section>
    </>
  );
};
export default CalorieGoal;
