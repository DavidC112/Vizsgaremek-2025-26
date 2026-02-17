import { Calendar, Dumbbell, TrendingUp } from "lucide-react";
import ProgressBar from "../ui/ProgressBar";

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
  return (
    <>
      <section className="bg-blur space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
        <div className="">
          <h2 className="font-light">Daily calorie goal</h2>
          <h1 className="text-3xl">{bmr}</h1>
        </div>
        <div className="space-y-2">
          <ProgressBar value={(netCalorie / bmr) * 100} />
          <div className="flex justify-between">
            <p>{netCalorie}</p>
            <p>{bmr - netCalorie} remaining</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-xl border border-gray-200 bg-white p-2 shadow-2xs">
            <p className="text-xs">Consumed</p>
            <p>{consumedCalorie ?? 0}</p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-2 shadow-2xs">
            <p className="text-xs">Burned</p>
            <p>{burnedCalorie ?? 0}</p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-2 shadow-2xs">
            <p className="text-xs">Net</p>
            <p>{netCalorie ?? 0}</p>
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
            <h1 className="text-xl">{goalType}</h1>
          </div>
        </div>
        <div className="flex items-center space-x-5 rounded-xl border border-gray-200 bg-white p-4">
          <div className="bg-primary-green-100 flex h-12 w-12 items-center justify-center rounded-full">
            <Calendar className="text-primary-green-600" />
          </div>
          <div>
            <h2 className="font-extralight">Current Weight</h2>
            <h1 className="text-xl">{weight ?? "error"}</h1>
          </div>
        </div>
        <div className="flex items-center space-x-5 rounded-xl border border-gray-200 bg-white p-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
            <Dumbbell className="text-orange-600" />
          </div>
          <div>
            <h2 className="font-extralight">Workouts Today</h2>
            <h1 className="text-xl">{workoutToday}</h1>
          </div>
        </div>
      </section>
    </>
  );
};
export default CalorieGoal;
