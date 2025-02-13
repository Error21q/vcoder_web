// Header.styles.ts
import { SxProps } from "@mui/system";
import { Theme } from "@mui/joy/styles";
import { listItemButtonClasses } from "@mui/joy/ListItemButton";

export const styles: Record<string, SxProps<Theme>> = {
  root: {
    position: { xs: "fixed", md: "fixed" },
    transform: {
      xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
      md: "none",
    },
    transition: "transform 0.5s, width 0.5s",
    zIndex: { xs: 1200, md: 0 },
    height: "100dvh",
    width: "var(--Sidebar-width)",
    top: 80,
    p: 1,
    flexShrink: 0,
    display: "flex",
    flexDirection: "column",
    gap: 2,
    borderRight: "1px solid",
    borderColor: "divider",
  },
  sidebarOverlay: {
    position: "fixed",
    zIndex: 9998,
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    opacity: "var(--SideNavigation-slideIn)",
    backgroundColor: "var(--joy-palette-background-backdrop)",
    transition: "opacity 0.4s",
    transform: {
      xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))",
      lg: "translateX(-100%)",
    },
  },
  sidebarContainer: {
    minHeight: 0,
    overflow: "hidden auto",
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    [`& .${listItemButtonClasses.root}`]: {
      gap: 3,
    },
  },
  list: {
    gap: 1,
    "--ListItem-radius": (theme) => theme.vars.radius.md,
  },
};
