import CircularProgress from "@mui/material/CircularProgress";
import { type ResolvedDailyEntry } from "../../hooks/useMeals";
import MealAccordion from "./MealAccordion";

const MealAccordionList = ({
  dailyIntake,
  loading,
}: {
  dailyIntake: ResolvedDailyEntry[];
  loading: boolean;
}) => {
  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <CircularProgress />
      </div>
    );
  }

  if (dailyIntake.length === 0) {
    return (
      <p className="py-10 text-center text-gray-400">No meals logged yet.</p>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {dailyIntake.map((entry) => (
        <MealAccordion key={entry.date} entry={entry} />
      ))}
    </div>
  );
};

export default MealAccordionList;
