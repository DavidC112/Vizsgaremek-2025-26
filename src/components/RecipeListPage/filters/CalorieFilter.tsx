import Slider from "@mui/material/Slider";
import FilterAccordion from "./FilterAccordion";
import { useDrawerDraft } from "../../../context/DrawerDraftContext";

type CalorieFilterProps = {
  min?: number;
  max?: number;
};

const CalorieFilter = ({ min = 0, max = 2000 }: CalorieFilterProps) => {
  const { draft, updateDraft } = useDrawerDraft();
  const value = draft.calories;
  const sliderValue: [number, number] = [value.min ?? min, value.max ?? max];
  const isActive = value.min !== null || value.max !== null;

  const handleChange = (_: Event, newValue: number | number[]) => {
    const [lo, hi] = newValue as number[];
    updateDraft("calories", {
      min: lo === min ? null : lo,
      max: hi === max ? null : hi,
    });
  };

  return (
    <FilterAccordion label="Calories" activeCount={isActive ? 1 : 0}>
      <div className="flex flex-col gap-2 px-1 pt-2">
        <div className="flex justify-between text-xs text-neutral-400">
          <span>{sliderValue[0]} kcal</span>
          <span>{sliderValue[1]} kcal</span>
        </div>
        <Slider
          value={sliderValue}
          onChange={handleChange}
          min={min}
          max={max}
          step={50}
          valueLabelDisplay="auto"
          valueLabelFormat={(v) => `${v} kcal`}
          sx={{
            "& .MuiSlider-thumb": { width: 16, height: 16 },
            "& .MuiSlider-valueLabel": {
              fontSize: "0.7rem",
            },
          }}
        />
        <div className="flex justify-between text-xs text-neutral-300">
          <span>{min} kcal</span>
          <span>{max} kcal</span>
        </div>
      </div>
    </FilterAccordion>
  );
};

export default CalorieFilter;
