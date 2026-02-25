import { act, useEffect } from "react";
import { useActivity } from "../../hooks/useActivity";
import Modal from "../ui/Modal";
import { useNotification } from "../../context/NotificationProvider";

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

  const { addNotification } = useNotification();

  return (
    <div className="mx-auto grid max-w-5xl list-none grid-cols-1 gap-4 px-2 sm:grid-cols-2 lg:grid-cols-3 lg:px-2">
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
              <Modal
                onClose={() => {}}
                trigger={
                  <button
                    disabled={activity.isDeleted}
                    className="w-20 rounded border border-red-200 bg-red-100 px-2 py-1 text-sm font-medium text-red-600/90 transition hover:border-red-300 hover:bg-red-200 active:bg-red-100 disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-100 disabled:text-gray-400"
                  >
                    Delete
                  </button>
                }
                title="Delete ingredient"
                description={`Are you sure you want to delete ${activity.name}`}
                actions={(close) => (
                  <>
                    <button
                      onClick={() => {
                        close();
                      }}
                      className="w-20 rounded border border-emerald-200 bg-white px-2 py-1 text-sm font-medium text-emerald-600/90 transition hover:border-emerald-300 hover:bg-emerald-50 active:bg-emerald-100"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={async () => {
                        await deleteActivity(activity.id);
                        close();
                        addNotification(`${activity.name} deleted succesfully`);
                      }}
                      className="w-20 rounded border border-red-200 bg-red-100 px-2 py-1 text-sm font-medium text-red-600/90 transition hover:border-red-300 hover:bg-red-200 active:bg-red-100"
                    >
                      Delete
                    </button>
                  </>
                )}
              ></Modal>

              <button
                disabled={activity.isDeleted}
                className="w-20 rounded border border-emerald-200 bg-white px-2 py-1 text-sm font-medium text-emerald-600/90 transition hover:border-emerald-300 hover:bg-emerald-50 active:bg-emerald-100 disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-100 disabled:text-gray-400"
              >
                Edit
              </button>

              <button
                onClick={async () => {
                  await restoreActivity(activity.id);
                  addNotification(`${activity.name} restored successfully`);
                }}
                disabled={!activity.isDeleted}
                className="w-20 rounded border border-emerald-200 bg-white px-2 py-1 text-sm font-medium text-emerald-600/90 transition hover:border-emerald-300 hover:bg-emerald-50 active:bg-emerald-100 disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-100 disabled:text-gray-400"
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
