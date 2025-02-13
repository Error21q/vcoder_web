import {
  FormControl,
  FormLabel,
  Select,
  Option,
  Grid,
  ListItemDecorator,
  SelectStaticProps,
  IconButton,
} from "@mui/joy";
import { useRef, useState } from "react";
import { CloseRounded } from "@mui/icons-material";
import { ProductStatuses } from "../../common/product-utils";

interface FiltersProps {
  onChange: (search: string | null) => void;
}

const Filters = (props: FiltersProps) => {
  const { onChange } = props;
  const [value, setValue] = useState<string | null>("");
  const action: SelectStaticProps["action"] = useRef(null);

  return (
    <Grid container display={"flex"} gap={2}>
      <Grid xs={12}>
        <FormControl size="sm">
          <FormLabel>Status</FormLabel>
          <Select
            size="sm"
            placeholder="Filter by status"
            value={value}
            onChange={(_, value) => {
              setValue(value);
              onChange(value);
            }}
            {...(value && {
              // display the button and remove select indicator
              // when user has selected a value
              endDecorator: (
                <IconButton
                  size="sm"
                  variant="plain"
                  color="neutral"
                  onMouseDown={(event) => {
                    // don't open the popup when clicking on this button
                    event.stopPropagation();
                  }}
                  onClick={() => {
                    setValue(null);
                    onChange("");
                    action.current?.focusVisible();
                  }}
                >
                  <CloseRounded />
                </IconButton>
              ),
              indicator: null,
            })}
          >
            {ProductStatuses.map((item) => (
              <Option
                key={item.id.toString()}
                label={item.title}
                value={item.value}
              >
                <ListItemDecorator>{item.icon}</ListItemDecorator>
                {item.title}
              </Option>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default Filters;
