// Header.styles.ts
import { SxProps } from "@mui/system";
import { Theme } from "@mui/joy/styles";

export const styles: Record<string, SxProps<Theme>> = {
  root: {
    p: 2,
    gap: 2,
    bgcolor: "background.surface",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gridColumn: "1 / -1",
    borderBottom: "1px solid",
    borderColor: "divider",
    position: "sticky",
    top: 0,
    zIndex: 1100,
  },
};
