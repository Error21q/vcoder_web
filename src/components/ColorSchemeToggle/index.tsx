import * as React from "react";
import { useColorScheme } from "@mui/joy/styles";
import IconButton, { IconButtonProps } from "@mui/joy/IconButton";
import { Tooltip } from "@mui/joy";
import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";

const ColorSchemeToggle = (props: IconButtonProps) => {
  const { onClick, sx, ...other } = props;
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return (
      <IconButton
        size="sm"
        variant="plain"
        color="neutral"
        {...other}
        sx={sx}
        disabled
      />
    );
  }
  return (
    <Tooltip title="Change theme" variant="outlined" arrow>
      <IconButton
        size="sm"
        {...other}
        onClick={(event) => {
          if (mode === "light") {
            setMode("dark");
          } else {
            setMode("light");
          }
          onClick?.(event);
        }}
        sx={[
          mode === "dark"
            ? { "& > *:first-child": { display: "none" } }
            : { "& > *:first-child": { display: "initial" } },
          mode === "light"
            ? { "& > *:last-child": { display: "none" } }
            : { "& > *:last-child": { display: "initial" } },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        <DarkModeOutlined />
        <LightModeOutlined />
      </IconButton>
    </Tooltip>
  );
};

export default ColorSchemeToggle;
