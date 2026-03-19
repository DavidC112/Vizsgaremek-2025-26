import FilterAccordion from "./FilterAccordion";
import type { Filters } from "./Filters";
import { useDrawerDraft } from "../../../context/DrawerDraftContext";

type TagConfig = {
  label: string;
  field: keyof Filters["tags"];
  trueLabel: string;
  falseLabel: string;
};

const TAG_CONFIG: TagConfig[] = [
  {
    label: "Source",
    field: "isCommunity",
    trueLabel: "Community",
    falseLabel: "Official",
  },
  {
    label: "Vegan",
    field: "isVegan",
    trueLabel: "Vegan",
    falseLabel: "Not Vegan",
  },
  {
    label: "Vegetarian",
    field: "isVegetarian",
    trueLabel: "Vegetarian",
    falseLabel: "Not Vegetarian",
  },
];

const ThreeWayToggle = ({
  config,
  value,
  onChange,
}: {
  config: TagConfig;
  value: boolean | null;
  onChange: (val: boolean | null) => void;
}) => {
  const options: { label: string; val: boolean | null }[] = [
    { label: "All", val: null },
    { label: config.falseLabel, val: false },
    { label: config.trueLabel, val: true },
  ];

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs tracking-wider text-neutral-400 uppercase">
        {config.label}
      </span>
      <div className="flex overflow-hidden rounded-lg border border-neutral-200">
        {options.map((opt) => (
          <button
            key={String(opt.val)}
            onClick={() => onChange(opt.val)}
            className={`flex-1 cursor-pointer border-r border-neutral-200 py-1.5 text-xs transition-colors last:border-r-0 ${
              value === opt.val
                ? "bg-primary-green-400 font-semibold text-white"
                : "bg-white text-neutral-500 hover:bg-neutral-50"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
};

const TagFilter = () => {
  const { draft, updateDraft } = useDrawerDraft();
  const activeCount = Object.values(draft.tags).filter(
    (v) => v !== null,
  ).length;

  return (
    <FilterAccordion label="Tags" activeCount={activeCount}>
      <div className="flex flex-col gap-4 pt-1">
        {TAG_CONFIG.map((config) => (
          <ThreeWayToggle
            key={config.field}
            config={config}
            value={draft.tags[config.field]}
            onChange={(val) =>
              updateDraft("tags", { ...draft.tags, [config.field]: val })
            }
          />
        ))}
      </div>
    </FilterAccordion>
  );
};

export default TagFilter;
