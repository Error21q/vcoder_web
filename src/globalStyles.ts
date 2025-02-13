import { Theme } from "@mui/joy/styles";

export const globalStyles = (theme: Theme) => ({
  ":root": {
    // "--Header-height": "52px",
    // [theme.breakpoints.up("md")]: {
    //   "--Header-height": "0px",
    // },
    "--Sidebar-width": "220px",
    [theme.breakpoints.up("lg")]: {
      "--Sidebar-width": "220px",
    },
  },
});
