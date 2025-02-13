import Input, { InputProps } from "@mui/joy/Input";
import { useRef } from "react";

type DebounceProps = {
  handleDebounce: (value: string) => void;
  debounceTimeout: number;
};

const DebounceInput = (props: InputProps & DebounceProps) => {
  const { handleDebounce, debounceTimeout, ...other } = props;

  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      handleDebounce(event.target.value);
    }, debounceTimeout);
  };

  return <Input {...other} onChange={handleChange} />;
};

export default DebounceInput;
