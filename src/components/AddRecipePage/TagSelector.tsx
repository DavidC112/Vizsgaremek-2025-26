import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";

const AVAILABLE_TAGS = ["Vegan", "Vegetarian"];

type Props = {
  selected: string[];
  onChange: (tags: string[]) => void;
};

export const TagSelector = ({ selected, onChange }: Props) => (
  <Autocomplete
    multiple
    options={AVAILABLE_TAGS}
    value={selected}
    onChange={(_, newValue) => onChange(newValue)}
    renderTags={(value, getTagProps) =>
      value.map((option, index) => (
        <Chip label={option} size="small" {...getTagProps({ index })} />
      ))
    }
    renderInput={(params) => (
      <TextField {...params} variant="standard" label="Tags" />
    )}
  />
);
