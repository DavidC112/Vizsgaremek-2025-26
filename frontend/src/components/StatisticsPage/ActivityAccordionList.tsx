import CircularProgress from "@mui/material/CircularProgress";
import { useMemo } from "react";
import { type ActivityResponse } from "../../hooks/useActivity";
import ActivityAccordion from "./ActivityAccordion";

const ActivityAccordionList = ({
  userActivityData,
}: {
  userActivityData: ActivityResponse | undefined;
}) => {
  const groupedByDate = useMemo(() => {
    if (!userActivityData?.data) return {};
    return userActivityData.data.reduce<
      Record<string, typeof userActivityData.data>
    >((acc, activity) => {
      if (!acc[activity.date]) acc[activity.date] = [];
      acc[activity.date].push(activity);
      return acc;
    }, {});
  }, [userActivityData]);

  const sortedDates = Object.keys(groupedByDate).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime(),
  );

  if (!userActivityData) {
    return (
      <div className="flex justify-center py-10">
        <CircularProgress />
      </div>
    );
  }

  if (sortedDates.length === 0) {
    return (
      <p className="py-10 text-center text-gray-400">
        No activities logged yet.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {sortedDates.map((date) => (
        <ActivityAccordion
          key={date}
          date={date}
          activities={groupedByDate[date]}
        />
      ))}
    </div>
  );
};

export default ActivityAccordionList;
