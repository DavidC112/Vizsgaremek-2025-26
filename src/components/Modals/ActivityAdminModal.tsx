import { useState, useEffect } from "react";
import Modal from "../ui/Modal";
import type { ActivityType } from "../../hooks/useActivity";

type Props = {
  activity: ActivityType;
  editActivity: (id: number, data: Partial<ActivityType>) => Promise<void>;
  addNotification: (msg: string) => void;
};

const ActivityAdmintModal = ({
  activity,
  editActivity,
  addNotification,
}: Props) => {
  const [tempData, setTempData] = useState({
    name: activity.name,
    calories: activity.caloriesBurnedPerHour,
  });

  useEffect(() => {
    setTempData({
      name: activity.name,
      calories: activity.caloriesBurnedPerHour,
    });
  }, [activity]);

  const isChanged =
    tempData.name !== activity.name ||
    tempData.calories !== activity.caloriesBurnedPerHour;

  return (
    <Modal
      onClose={() => {}}
      trigger={
        <button
          disabled={activity.isDeleted}
          className="w-20 rounded border border-emerald-200 bg-white px-2 py-1 text-sm font-medium text-emerald-600/90 hover:border-emerald-300 hover:bg-emerald-50 disabled:cursor-not-allowed disabled:border-red-500 disabled:bg-red-200 disabled:text-red-600 disabled:opacity-50"
        >
          Edit
        </button>
      }
      title={`Edit ${activity.name}`}
      actions={(close) => (
        <div className="mt-3 flex gap-2">
          <button
            onClick={() => {
              close();
            }}
            className="w-20 rounded border border-emerald-200 bg-white px-2 py-1 text-sm font-medium text-emerald-600 hover:bg-emerald-50"
          >
            Cancel
          </button>
          <button
            disabled={!isChanged}
            onClick={async () => {
              await editActivity(activity.id, tempData);
              close();
              addNotification(`${tempData.name} updated successfully`);
            }}
            className="brder-red-500 w-20 rounded border bg-red-100 px-2 py-1 text-sm font-medium text-red-600 transition hover:bg-red-200 disabled:cursor-not-allowed disabled:bg-red-200 disabled:opacity-50"
          >
            Save
          </button>
        </div>
      )}
    >
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            value={tempData.name}
            onChange={(e) =>
              setTempData((prev) => ({ ...prev, name: e.target.value }))
            }
            className="mt-1 block w-full rounded border px-2 py-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">
            Calories burned per hour
          </label>
          <input
            type="number"
            value={tempData.calories}
            onChange={(e) =>
              setTempData((prev) => ({
                ...prev,
                calories: Number(e.target.value),
              }))
            }
            className="mt-1 block w-full rounded border px-2 py-1"
          />
        </div>
      </div>
    </Modal>
  );
};

export default ActivityAdmintModal;
