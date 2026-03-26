import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { ChevronDown } from "lucide-react";
import { type UserActivityType } from "../../hooks/useActivity";

interface ActivityAccordionProps {
  date: string;
  activities: UserActivityType[];
}

interface ActivityRowProps {
  activityName: string;
  duration: number;
  caloriesBurned: number;
}

const ActivityRow = ({
  activityName,
  duration,
  caloriesBurned,
}: ActivityRowProps) => {
  return (
    <div className="flex items-center justify-between rounded-lg bg-gray-50 px-5 py-3 transition hover:bg-gray-100">
      <div className="flex items-center gap-3">
        <div>
          <p className="font-semibold text-gray-800 capitalize">
            {activityName}
          </p>
          <p className="text-sm text-gray-400">{duration} min</p>
        </div>
      </div>

      <div className="text-right">
        <p className="font-bold text-orange-500">{caloriesBurned} cal</p>
        <p className="text-sm text-gray-400">burned</p>
      </div>
    </div>
  );
};

const ActivityAccordion = ({ date, activities }: ActivityAccordionProps) => {
  const totalCaloriesBurned = activities.reduce(
    (sum, a) => sum + a.caloriesBurned,
    0,
  );

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ChevronDown />} id={date}>
        <div className="flex items-center gap-4">
          <Typography component="span" className="font-medium">
            {date}
          </Typography>
          <span className="text-sm text-gray-400">
            {activities.length} item{activities.length !== 1 ? "s" : ""}
          </span>
          <span className="text-sm font-medium text-orange-500">
            {totalCaloriesBurned.toFixed(1)} cal burned
          </span>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <div className="flex flex-col gap-2">
          {activities.map((activity) => (
            <ActivityRow
              key={activity.id}
              activityName={activity.activityName}
              duration={activity.duration}
              caloriesBurned={activity.caloriesBurned}
            />
          ))}
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default ActivityAccordion;
