import Slider from "@mui/material/Slider";
import FilterAccordion from "./FilterAccordion";
import { useDrawerDraft } from "../../../context/DrawerDraftContext";

type TimeRangeFilterProps = {
  label: string;
  filterKey: "prepTime" | "cookTime";
  min?: number;
  max?: number;
};

const TimeRangeFilter = ({
  label,
  filterKey,
  min = 0,
  max = 180,
}: TimeRangeFilterProps) => {
  const { draft, updateDraft } = useDrawerDraft();
  const value = draft[filterKey];
  const sliderValue: [number, number] = [value.min ?? min, value.max ?? max];
  const isActive = value.min !== null || value.max !== null;

  const handleChange = (_: Event, newValue: number | number[]) => {
    const [lo, hi] = newValue as number[];
    updateDraft(filterKey, {
      min: lo === min ? null : lo,
      max: hi === max ? null : hi,
    });
  };

  return (
    <FilterAccordion label={label} activeCount={isActive ? 1 : 0}>
      <div className="flex flex-col gap-2 px-1 pt-2">
        <div className="flex justify-between text-xs text-neutral-400">
          <span>{sliderValue[0]} min</span>
          <span>{sliderValue[1]} min</span>
        </div>
        <Slider
          value={sliderValue}
          onChange={handleChange}
          min={min}
          max={max}
          valueLabelDisplay="auto"
          valueLabelFormat={(v) => `${v}m`}
          sx={{
            "& .MuiSlider-thumb": { width: 16, height: 16 },
            "& .MuiSlider-valueLabel": {
              fontSize: "0.7rem",
            },
          }}
        />
        <div className="flex justify-between text-xs text-neutral-300">
          <span>{min} min</span>
          <span>{max} min</span>
        </div>
      </div>
    </FilterAccordion>
  );
};

export default TimeRangeFilter;
