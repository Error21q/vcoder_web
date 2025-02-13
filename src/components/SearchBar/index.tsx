import { FormControl, FormLabel } from "@mui/joy";
import SearchIcon from "@mui/icons-material/Search";
import DebounceInput from "../DebounceInput";

interface SearchBarProps {
  value?: string;
  onChange: (search: string) => void;
  label?: string;
  placeholder?: string;
  size?: "sm" | "md" | "lg";
  debounceTimeout?: number;
}

const SearchBar = (props: SearchBarProps) => {
  const { onChange, label, placeholder, size, debounceTimeout } = props;

  return (
    <FormControl sx={{ flex: 1 }} size={size || "sm"}>
      <FormLabel>{label || "Search"}</FormLabel>
      <DebounceInput
        size={size || "sm"}
        placeholder={placeholder || "Search"}
        startDecorator={<SearchIcon />}
        debounceTimeout={debounceTimeout || 1000}
        handleDebounce={(txt) => onChange(txt)}
      />
    </FormControl>
  );
};

export default SearchBar;
