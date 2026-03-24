import { Field, Fieldset, Input, Label } from "@headlessui/react";
import { Target, Scale, Loader2 } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import Modal from "../ui/Modal";
import { useNotification } from "../../context/NotificationProvider";
import { useAttributes } from "../../hooks/useAttributes";

type UpdateProfileModalProps = {
  currentWeight?: number;
  currentHeight?: number;
  onSaved?: () => void;
};

const UpdateProfileModal = ({
  currentWeight,
  currentHeight,
  onSaved,
}: UpdateProfileModalProps) => {
  const { addNotification } = useNotification();
  const { addAttribute, addGoal } = useAttributes();

  const [weight, setWeight] = useState<string>(currentWeight?.toString() ?? "");
  const [height, setHeight] = useState<string>(currentHeight?.toString() ?? "");
  const [weightLoading, setWeightLoading] = useState(false);

  const [targetWeight, setTargetWeight] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");
  const [goalLoading, setGoalLoading] = useState(false);

  const resetAll = () => {
    setWeight(currentWeight?.toString() ?? "");
    setHeight(currentHeight?.toString() ?? "");
    setTargetWeight("");
    setDeadline("");
  };

  const handleSaveAttributes = async () => {
    const parsedWeight = parseFloat(weight);
    const parsedHeight = parseFloat(height);

    if (!weight || isNaN(parsedWeight) || parsedWeight <= 0) {
      addNotification("Please enter a valid weight.", "error");
      return;
    }
    if (!height || isNaN(parsedHeight) || parsedHeight <= 0) {
      addNotification("Please enter a valid height.", "error");
      return;
    }

    setWeightLoading(true);
    try {
      const today = new Date().toISOString().split("T")[0];
      await addAttribute({
        weight: parsedWeight,
        height: parsedHeight,
        measuredAt: today,
      });
      addNotification("Measurements updated successfully!", "success");
      onSaved?.();
    } catch (e) {
      addNotification(
        e instanceof Error ? e.message : "Something went wrong.",
        "error",
      );
    } finally {
      setWeightLoading(false);
    }
  };

  const handleSaveGoal = async () => {
    const parsedTarget = parseFloat(targetWeight);

    if (!targetWeight || isNaN(parsedTarget) || parsedTarget <= 0) {
      addNotification("Please enter a valid target weight.", "error");
      return;
    }
    if (!deadline) {
      addNotification("Please select a deadline.", "error");
      return;
    }

    setGoalLoading(true);
    try {
      await addGoal({ targetWeight: parsedTarget, deadLine: deadline });
      addNotification("Goal updated successfully!", "success");
      onSaved?.();
    } catch (e) {
      addNotification(
        e instanceof Error ? e.message : "Something went wrong.",
        "error",
      );
    } finally {
      setGoalLoading(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <Modal
      onClose={resetAll}
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
            className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100"
            whileHover={{ rotate: 15, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <Target className="text-green-600" />
          </motion.div>
          <div>
            <h2 className="text-xl">Update Attribute</h2>
            <h1 className="font-extralight">Edit your measurements & goal</h1>
          </div>
        </motion.div>
      }
      title="Update Attribute"
      description="Update your body measurements or set a new goal."
      actions={(close) => (
        <button
          onClick={close}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Close
        </button>
      )}
    >
      <Fieldset className="space-y-5">
        {/* ── Body Measurements ── */}
        <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Scale size={15} />
          <span>Body Measurements</span>
        </div>

        <Field>
          <Label className="text-sm font-medium">Current Weight</Label>
          <div className="relative mt-3 flex items-center">
            <Input
              type="number"
              min={1}
              step={0.1}
              value={weight}
              placeholder="e.g. 74.5"
              onChange={(e) => setWeight(e.target.value)}
              className="block w-full rounded-lg border bg-white/5 px-3 py-1.5 pr-10 text-sm/6 text-black focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25"
            />
            <span className="absolute right-3 text-xs text-gray-400">kg</span>
          </div>
        </Field>

        <Field>
          <Label className="text-sm font-medium">Height</Label>
          <div className="relative mt-3 flex items-center">
            <Input
              type="number"
              min={1}
              step={0.1}
              value={height}
              placeholder="e.g. 175"
              onChange={(e) => setHeight(e.target.value)}
              className="block w-full rounded-lg border bg-white/5 px-3 py-1.5 pr-10 text-sm/6 text-black focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25"
            />
            <span className="absolute right-3 text-xs text-gray-400">cm</span>
          </div>
        </Field>

        <button
          onClick={handleSaveAttributes}
          disabled={weightLoading}
          className="bg-primary-green-400 hover:bg-primary-green-500 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
        >
          {weightLoading && <Loader2 size={14} className="animate-spin" />}
          Save Measurements
        </button>

        <div className="border-t border-gray-100" />

        {/* ── Goal ── */}
        <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Target size={15} />
          <span>Goal</span>
        </div>

        <Field>
          <Label className="text-sm font-medium">Target Weight</Label>
          <div className="relative mt-3 flex items-center">
            <Input
              type="number"
              min={1}
              step={0.1}
              value={targetWeight}
              placeholder="e.g. 70.0"
              onChange={(e) => setTargetWeight(e.target.value)}
              className="block w-full rounded-lg border bg-white/5 px-3 py-1.5 pr-10 text-sm/6 text-black focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25"
            />
            <span className="absolute right-3 text-xs text-gray-400">kg</span>
          </div>
        </Field>

        <Field>
          <Label className="text-sm font-medium">Deadline</Label>
          <Input
            type="date"
            min={today}
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="mt-3 block w-full rounded-lg border bg-white/5 px-3 py-1.5 text-sm/6 text-black focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25"
          />
        </Field>

        <button
          onClick={handleSaveGoal}
          disabled={goalLoading}
          className="bg-primary-green-400 hover:bg-primary-green-500 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
        >
          {goalLoading && <Loader2 size={14} className="animate-spin" />}
          Save Goal
        </button>
      </Fieldset>
    </Modal>
  );
};

export default UpdateProfileModal;
