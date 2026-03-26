import ProfileAvatar from "./ProfileAvatar";
import type { ProfileState } from "../../hooks/useEditProfileForm";
import { useUserContext } from "../../context/UserContext";

type Props = {
  state: ProfileState;
  set: (
    field: keyof ProfileState,
    value: string | boolean | null | File,
  ) => void;
  isSubmitting: boolean;
  hasExistingPicture: boolean;
  onDeletePicture: () => void;
};

const FIELDS = [
  { label: "First name", field: "firstName", type: "text" },
  { label: "Last name", field: "lastName", type: "text" },
  { label: "Email", field: "email", type: "email" },
  { label: "Birth date", field: "birthDate", type: "date" },
] as const;

const ProfileTab = ({
  state,
  set,
  isSubmitting,
  hasExistingPicture,
  onDeletePicture,
}: Props) => {
  const { singleUser } = useUserContext();

  const hasPreview = !!state.previewUrl;

  return (
    <div className="flex flex-col gap-5">
      <ProfileAvatar
        src={state.previewUrl || singleUser?.profilePictureUrl || ""}
        hasExistingPicture={hasExistingPicture}
        hasPreview={hasPreview}
        isSubmitting={isSubmitting}
        onImageChange={(file, previewUrl) => {
          set("imageFile", file);
          set("previewUrl", previewUrl);
        }}
        onClearPreview={() => {
          set("imageFile", null);
          set("previewUrl", "");
        }}
        onDeletePicture={onDeletePicture}
      />

      {FIELDS.map(({ label, field, type }) => (
        <div key={field} className="flex flex-col gap-1">
          <label className="text-xs font-medium text-neutral-500">
            {label}
          </label>
          <input
            type={type}
            value={state[field]}
            onChange={(e) => set(field, e.target.value)}
            className="rounded-lg border border-neutral-200 px-3 py-2 text-sm transition outline-none focus:border-neutral-400"
          />
        </div>
      ))}
    </div>
  );
};

export default ProfileTab;
