import { SxProps } from "@mui/system";
import { Theme } from "@mui/joy/styles";

export const styles: Record<string, SxProps<Theme>> = {
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },
  content: {
    display: "flex",
    flex: 1,
  },
  main: {
    flex: 1,
    marginLeft: { xs: 0, md: "var(--Sidebar-width)" },
    padding: "16px",
    overflow: "auto",
    zIndex: 1,
  },
};
