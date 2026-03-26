import { useEffect } from "react";
import { useActivity } from "../../hooks/useActivity";
import Modal from "../ui/Modal";
import { useNotification } from "../../context/NotificationProvider";
import ActivityAdmintModal from "../Modals/ActivityAdminModal";
import GenericAdminModal from "../Modals/GenericAdminModal";
import useAdminFilter from "../../hooks/useAdminFilter";
import AdminSearchBar from "../ui/Admin/AdminSearchBar";

const ActivityAdmin = () => {
  const {
    activityData,
    fetchAdminActivities,
    deleteActivity,
    restoreActivity,
    editActivity,
    addActivity,
  } = useActivity();

  const { search, setSearch, filters, setFilters, filtered } = useAdminFilter(
    activityData,
    (activity, search) =>
      activity.name.toLowerCase().includes(search.toLowerCase()),
    (activity, filters) => {
      if (filters.deleted !== activity.isDeleted) return false;
      return true;
    },
    { deleted: false },
  );

  useEffect(() => {
    fetchAdminActivities();
  }, [fetchAdminActivities]);

  const { addNotification } = useNotification();

  return (
    <div className="mx-auto max-w-5xl p-5">
      <div className="flex flex-col items-start gap-3 px-5 md:flex-row md:items-center md:justify-between lg:px-0">
        <GenericAdminModal
          data={{ name: "", caloriesBurnedPerHour: 0 }}
          onSave={addActivity}
          addNotification={addNotification}
          triggerLabel="+ Add"
          fields={[
            { name: "name", label: "Name", type: "text" },
            {
              name: "caloriesBurnedPerHour",
              label: "Calories",
              type: "number",
            },
          ]}
        />

        <AdminSearchBar
          type="Activity"
          value={search}
          onChange={setSearch}
          placeholder="Search activity..."
          isDeleted={filters.deleted}
          onDeletedChange={(val) => setFilters((f) => ({ ...f, deleted: val }))}
        />
      </div>
      <div className="mx-auto grid max-w-5xl list-none grid-cols-1 gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3 lg:px-0">
        {filtered.map((activity) => (
          <li
            key={activity.id}
            className={`rounded-lg border-2 bg-white p-4 text-gray-600 shadow-md ${
              activity.isDeleted
                ? "border-red-700"
                : "border-primary-green-400 border"
            }`}
          >
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <p
                  className={`text-lg font-semibold ${activity.isDeleted ? "line-through" : ""}`}
                >
                  {activity.name}
                </p>
                <p
                  className={`text-sm ${activity.isDeleted ? "text-red-600" : "text-emerald-600"}`}
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
                      className="brder-red-500 w-20 rounded border bg-red-100 px-2 py-1 text-sm font-medium text-red-600 transition hover:bg-red-200 disabled:cursor-not-allowed disabled:bg-red-200 disabled:opacity-50"
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
                        className="w-20 rounded border border-gray-200 bg-white px-2 py-1 text-sm font-medium text-gray-600 transition hover:border-gray-300 hover:bg-gray-50 active:bg-gray-100"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={async () => {
                          await deleteActivity(activity.id);
                          close();
                          addNotification(
                            `${activity.name} deleted succesfully`,
                          );
                        }}
                        className="w-20 rounded border border-red-200 bg-red-100 px-2 py-1 text-sm font-medium text-red-600/90 transition hover:border-red-300 hover:bg-red-200 active:bg-red-100"
                      >
                        Delete
                      </button>
                    </>
                  )}
                ></Modal>

                <ActivityAdmintModal
                  activity={activity}
                  editActivity={editActivity}
                  addNotification={addNotification}
                />

                <button
                  onClick={async () => {
                    await restoreActivity(activity.id);
                    addNotification(`${activity.name} restored successfully`);
                  }}
                  disabled={!activity.isDeleted}
                  className="w-20 rounded border border-gray-200 bg-white px-2 py-1 text-sm font-medium transition hover:border-gray-300 hover:bg-gray-50 active:bg-gray-100 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-50"
                >
                  Restore
                </button>
              </div>
            </div>
          </li>
        ))}
      </div>
    </div>
  );
};

export default ActivityAdmin;
