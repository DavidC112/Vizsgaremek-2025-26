import { Loader2 } from "lucide-react";

type Props = {
  email: string;
  deleteConfirm: string;
  isSubmitting: boolean;
  onChange: (value: string) => void;
  onDelete: () => void;
};

const DangerTab = ({
  email,
  deleteConfirm,
  isSubmitting,
  onChange,
  onDelete,
}: Props) => (
  <div className="flex flex-col gap-4">
    <div className="rounded-xl border border-red-100 bg-red-50 p-4">
      <p className="text-sm font-medium text-red-700">Delete account</p>
      <p className="mt-1 text-xs text-red-500">
        This action is permanent and cannot be undone. Type your email to
        confirm.
      </p>
    </div>
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-neutral-500">
        Type <span className="font-semibold text-neutral-700">{email}</span> to
        confirm
      </label>
      <input
        type="email"
        value={deleteConfirm}
        onChange={(e) => onChange(e.target.value)}
        placeholder={email}
        className="rounded-lg border border-neutral-200 px-3 py-2 text-sm transition outline-none focus:border-red-300"
      />
    </div>
    <button
      onClick={onDelete}
      disabled={isSubmitting || deleteConfirm !== email}
      className="rounded-full bg-red-500 px-6 py-2 text-sm font-medium text-white transition hover:bg-red-600 disabled:opacity-40"
    >
      {isSubmitting ? (
        <Loader2 className="mx-auto size-4 animate-spin" />
      ) : (
        "Delete my account"
      )}
    </button>
  </div>
);

export default DangerTab;
