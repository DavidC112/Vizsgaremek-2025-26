type Props = {
  onImageChange: (file: File) => void;
};

const ImageUpload = ({ onImageChange }: Props) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-end">
        <label className="hover:border-primary-green-400 hover:text-primary-green-500 cursor-pointer rounded-xl border border-gray-600 px-4 py-1.5 text-sm text-gray-700 transition">
          Upload image
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              onImageChange(file);
            }}
          />
        </label>
      </div>
    </div>
  );
};
export default ImageUpload;
