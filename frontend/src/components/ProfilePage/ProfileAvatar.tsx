import { useRef } from "react";
import { Camera, Trash2, X } from "lucide-react";

type Props = {
  src: string;
  hasExistingPicture: boolean;
  hasPreview: boolean;
  isSubmitting: boolean;
  onImageChange: (file: File, previewUrl: string) => void;
  onClearPreview: () => void;
  onDeletePicture: () => void;
};

const ProfileAvatar = ({
  src,
  hasExistingPicture,
  hasPreview,
  isSubmitting,
  onImageChange,
  onClearPreview,
  onDeletePicture,
}: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onImageChange(file, URL.createObjectURL(file));
    e.target.value = "";
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative size-24">
        <img
          src={src}
          alt="Profile"
          className="size-24 rounded-full object-cover ring-2 ring-neutral-200"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="absolute right-0 bottom-0 flex size-7 items-center justify-center rounded-full bg-neutral-800 text-white transition hover:bg-neutral-700"
        >
          <Camera className="size-3.5" />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleChange}
        />
      </div>

      {hasPreview && (
        <button
          type="button"
          onClick={onClearPreview}
          className="flex items-center gap-1.5 text-xs text-neutral-400 transition hover:text-neutral-600"
        >
          <X className="size-3.5" /> Cancel selection
        </button>
      )}

      {!hasPreview && hasExistingPicture && (
        <button
          type="button"
          onClick={onDeletePicture}
          disabled={isSubmitting}
          className="flex items-center gap-1.5 text-xs text-red-400 transition hover:text-red-600 disabled:opacity-50"
        >
          <Trash2 className="size-3.5" /> Remove picture
        </button>
      )}
    </div>
  );
};

export default ProfileAvatar;
