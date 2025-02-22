import { Theme } from "@mui/joy/styles";

export const globalStyles = (theme: Theme) => ({
  ":root": {
    "--Sidebar-width": "220px",
    [theme.breakpoints.up("lg")]: {
      "--Sidebar-width": "220px",
    },
  },
});
