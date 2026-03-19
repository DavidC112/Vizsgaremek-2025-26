type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  isDeleted: boolean;
  onDeletedChange: (val: boolean) => void;
  placeholder?: string;
  type: string;
  isCommunity?: boolean;
  onCommunityChange?: (val: boolean) => void;
  isVegetarian?: boolean;
  onVegetarianChange?: (val: boolean) => void;
  isVegan?: boolean;
  onVeganChange?: (val: boolean) => void;
};

const AdminSearchBar = ({
  value,
  onChange,
  placeholder,
  type,
  isCommunity,
  onCommunityChange,
  isVegetarian,
  onVegetarianChange,
  isVegan,
  onVeganChange,
  isDeleted,
  onDeletedChange,
}: SearchBarProps) => {
  return (
    <div className="flex w-full flex-col gap-3 md:w-auto md:items-end">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-8 w-48 rounded-md border border-gray-300 px-3 text-sm shadow-sm focus:border-emerald-500 focus:outline-none"
      />
      <div className="flex flex-wrap gap-4">
        {type === "Recipe" && (
          <>
            <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={isCommunity ?? false}
                onChange={(e) => onCommunityChange?.(e.target.checked)}
                className="h-4 w-4 accent-emerald-500"
              />
              Community
            </label>
            <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={isVegetarian ?? false}
                onChange={(e) => onVegetarianChange?.(e.target.checked)}
                className="h-4 w-4 accent-emerald-500"
              />
              Vegetarian
            </label>
            <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={isVegan ?? false}
                onChange={(e) => onVeganChange?.(e.target.checked)}
                className="h-4 w-4 accent-emerald-500"
              />
              Vegan
            </label>
          </>
        )}
        <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={isDeleted}
            onChange={(e) => onDeletedChange(e.target.checked)}
            className="h-4 w-4 accent-emerald-500"
          />
          Deleted only
        </label>
      </div>
    </div>
  );
};

export default AdminSearchBar;
