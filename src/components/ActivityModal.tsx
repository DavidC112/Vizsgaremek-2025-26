import { ChevronDownIcon, NotebookTabs } from "lucide-react";
import Modal from "./ui/Modal";
import { Field, Fieldset, Input, Label, Select } from "@headlessui/react";
import type { ActivityType } from "../hooks/useActivity";
import { useMemo, useState } from "react";
import { useNotification } from "../context/NotificationProvider";
import { motion } from "framer-motion";

export type ExerciseModalPropType = {
  addUserActivity: (activityId: number, duration: number) => Promise<void>;
  activityData: ActivityType[];
};

const AddExerciseModal = ({
  addUserActivity,
  activityData,
}: ExerciseModalPropType) => {
  const [selectedActivity, setSelectedActivity] = useState<number>(
    activityData[0]?.id ?? 1,
  );

  const [duration, setDuration] = useState<number>(1);

  const burnedActivityCalorie = useMemo(() => {
    const activity = activityData.find((item) => item.id === selectedActivity);
    if (!activity) return 0;
    console.log("calories burned / h" + activity?.caloriesBurnedPerHour);
    return (activity.caloriesBurnedPerHour / 60) * duration;
  }, [selectedActivity, duration, activityData]);

  const { addNotification } = useNotification();

  return (
    <>
      <Modal
        onClose={() => {
          setSelectedActivity(1);
          setDuration(1);
        }}
        trigger={
          <motion.div
            className="flex items-center space-x-5 rounded-xl border border-gray-200 bg-white p-4"
            whileHover={{
              scale: 1.02,
              boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100"
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <NotebookTabs className="text-orange-600" />
            </motion.div>
            <div>
              <h2 className="text-xl">Add Exerecise</h2>
              <h1 className="font-extralight">Track your workout activity</h1>
            </div>
          </motion.div>
        }
        title="Add Exercise"
        actions={(close) => (
          <>
            <button
              onClick={() => {
                close();
              }}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                try {
                  await addUserActivity(selectedActivity, duration);
                  addNotification("Exercise added successfully!");
                } catch {
                  addNotification("Something went wrong", "error");
                } finally {
                  close();
                }
              }}
              className="bg-primary-green-400 hover:bg-primary-green-500 rounded-lg px-4 py-2 text-sm font-semibold text-white"
            >
              Add Exercise
            </button>
          </>
        )}
      >
        <Fieldset className="space-y-5">
          <Field>
            <Label className="text-sm font-medium">Activity</Label>
            <div className="relative">
              <Select
                onChange={(e) => {
                  setSelectedActivity(Number(e.target.value));
                }}
                className="text-sm/6text-black mt-3 block w-full appearance-none rounded-lg border bg-white/5 px-3 py-1.5 focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25"
              >
                {activityData.map((data) => (
                  <option key={data?.id} value={data?.id}>
                    {data.name}
                  </option>
                ))}
              </Select>
              <ChevronDownIcon
                className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
                aria-hidden="true"
              />
            </div>
          </Field>
          <Field>
            <Label className="text-sm font-medium">Duration</Label>
            <Input
              placeholder="1"
              min={1}
              onChange={(e) => {
                setDuration(Number(e.target.value));
              }}
              type="number"
              className="mt-3 block w-full rounded-lg border bg-white/5 px-3 py-1.5 text-sm/6 text-black focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25"
            />
          </Field>

          <Field>
            <Label className="text-sm font-medium">Burned Calorie</Label>
            <div className="mt-3 block min-h-3 rounded-lg border-none bg-white/5 py-1.5 text-sm/6 font-light text-black">
              {burnedActivityCalorie} cal
            </div>
          </Field>
        </Fieldset>
      </Modal>
    </>
  );
};
export default AddExerciseModal;
