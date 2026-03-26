import { Eye, EyeOff } from "lucide-react";
import type { ProfileState } from "../../hooks/useEditProfileForm";

type Props = {
  state: ProfileState;
  set: (
    field: keyof ProfileState,
    value: string | boolean | null | File,
  ) => void;
};

const FIELDS = [
  {
    label: "Current password",
    field: "currentPassword",
    showField: "showCurrent",
  },
  { label: "New password", field: "newPassword", showField: "showNew" },
  {
    label: "Confirm new password",
    field: "confirmPassword",
    showField: "showConfirm",
  },
] as const;

const PasswordTab = ({ state, set }: Props) => (
  <div className="flex flex-col gap-5">
    {FIELDS.map(({ label, field, showField }) => {
      const show = state[showField] as boolean;
      return (
        <div key={field} className="flex flex-col gap-1">
          <label className="text-xs font-medium text-neutral-500">
            {label}
          </label>
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              value={state[field]}
              onChange={(e) => set(field, e.target.value)}
              className="w-full rounded-lg border border-neutral-200 px-3 py-2 pr-10 text-sm transition outline-none focus:border-neutral-400"
            />
            <button
              type="button"
              onClick={() => set(showField, !show)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
            >
              {show ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
        </div>
      );
    })}
  </div>
);

export default PasswordTab;
