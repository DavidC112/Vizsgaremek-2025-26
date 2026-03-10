import { useState } from "react";
import Modal from "../ui/Modal";

type FieldConfig<T> = {
  name: keyof T;
  label: string;
  type: "text" | "number";
};

type GenericModalProps<T> = {
  data: T;
  onSave: (data: T) => Promise<void>;
  addNotification: (msg: string) => void;
  fields: FieldConfig<T>[];
  triggerLabel: string;
};

function GenericAdminModal<T extends Record<string, any>>({
  data,
  onSave,
  addNotification,
  fields,
  triggerLabel,
}: GenericModalProps<T>) {
  const [tempData, setTempData] = useState<T>(data);

  const isFilled = fields.some((f) => f.type === "text" && !tempData[f.name]);

  return (
    <Modal
      onClose={() => {}}
      trigger={
        <button className="flex h-6 w-25 items-center justify-center rounded border border-emerald-200 bg-white px-2 text-sm font-medium text-emerald-600 hover:border-emerald-300 hover:bg-emerald-50 md:h-7 md:w-30">
          {triggerLabel}
        </button>
      }
      actions={(close) => (
        <div className="mt-3 flex gap-2">
          <button
            onClick={() => close()}
            className="w-20 rounded border bg-red-100 px-2 py-1 text-sm font-medium text-red-600 hover:bg-red-200 disabled:cursor-not-allowed disabled:bg-red-200 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            disabled={isFilled}
            onClick={async () => {
              await onSave(tempData);
              close();
              addNotification(
                `${tempData[fields[0].name]} created successfully`,
              );
              setTempData(data);
            }}
            className="w-20 rounded border border-emerald-200 bg-white px-2 py-1 text-sm font-medium text-emerald-600 hover:bg-emerald-50"
          >
            Save
          </button>
        </div>
      )}
    >
      <div className="space-y-3">
        {fields.map((field) => (
          <div key={String(field.name)}>
            <label className="block text-sm font-medium">{field.label}</label>
            <input
              type={field.type}
              placeholder={tempData[field.name]}
              onChange={(e) =>
                setTempData((prev) => ({
                  ...prev,
                  [field.name]:
                    field.type === "number"
                      ? Number(e.target.value)
                      : e.target.value,
                }))
              }
              className="mt-1 block w-full rounded border px-2 py-1"
            />
          </div>
        ))}
      </div>
    </Modal>
  );
}

export default GenericAdminModal;
