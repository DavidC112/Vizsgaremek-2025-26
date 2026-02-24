import { useEffect } from "react";
import { useActivity } from "../../hooks/useActivity";

const ActivityAdmin = () => {
  const {
    activityData,
    fetchAdminActivities,
    deleteActivity,
    restoreActivity,
  } = useActivity();

  useEffect(() => {
    fetchAdminActivities();
  }, [fetchAdminActivities]);

  return (
    <div className="mx-auto grid max-w-5xl list-none grid-cols-1 gap-4 px-2 sm:grid-cols-2 lg:grid-cols-3">
      {activityData.map((activity) => (
        <li
          key={activity.id}
          className={`rounded-lg p-4 ${
            activity.isDeleted
              ? "bg-red-100 text-red-800"
              : "bg-emerald-100 text-emerald-900"
          }`}
        >
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <p
                className={`font-semibold ${
                  activity.isDeleted ? "line-through" : ""
                }`}
              >
                {activity.name}
              </p>

              <p
                className={`text-sm whitespace-nowrap ${activity.isDeleted ? "text-red-600" : "emerald-600"}`}
              >
                🔥{" "}
                <span className="font-semibold">
                  {activity.caloriesBurnedPerHour}
                </span>{" "}
                cal/hour
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                disabled={activity.isDeleted}
                onClick={() => deleteActivity(activity.id)}
                className="w-20 rounded border px-2 py-1 text-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:bg-red-200 disabled:opacity-50"
              >
                Delete
              </button>

              <button
                disabled={activity.isDeleted}
                className="w-20 rounded border px-2 py-1 text-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:bg-red-200 disabled:opacity-50"
              >
                Edit
              </button>

              <button
                onClick={() => restoreActivity(activity.id)}
                disabled={!activity.isDeleted}
                className="w-20 rounded border px-2 py-1 text-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:bg-emerald-200 disabled:opacity-50"
              >
                Restore
              </button>
            </div>
          </div>
        </li>
      ))}
    </div>
  );
};

export default ActivityAdmin;
