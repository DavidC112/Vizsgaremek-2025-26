const ProgressBar = ({ value = 0 }: { value: number }) => {
  return (
    <div className="w-full">
      <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-emerald-600 transition-all duration-500"
          style={{ width: `${value < 0 ? 0 : value}%` }}
        />
      </div>
    </div>
  );
};
export default ProgressBar;
