import Box from "@mui/joy/Box";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import ListItemContent from "@mui/joy/ListItemContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { closeSidebar } from "../../common/sidebar-utils";
import { styles } from "./style";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { ISidebarMenu } from "../../common/sidebar-menu";
import { Link } from "@mui/joy";

interface SidebarProps {
  sidebarMenu: ISidebarMenu[];
}

const Sidebar = (props: SidebarProps) => {
  const { sidebarMenu } = props;
  const location = useLocation();

  return (
    <Sheet className="Sidebar" sx={styles.root}>
      <Box
        className="Sidebar-overlay"
        sx={styles.sidebarOverlay}
        onClick={() => closeSidebar()}
      />

      <Box sx={{}}>
        <List sx={styles.list}>
          {sidebarMenu.map((item) => (
            <Link
              component={RouterLink}
              to={item.route}
              key={item.id}
              underline="none"
            >
              <ListItem
                key={item.id}
                sx={{ width: "100%", display: item.hide ? "none" : "block" }}
              >
                <ListItemButton
                  sx={{ py: 1 }}
                  selected={location.pathname === item.route}
                >
                  {item.icon}
                  <ListItemContent>
                    <Typography level="title-md">{item.title}</Typography>
                  </ListItemContent>
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </Box>
    </Sheet>
  );
};

export default Sidebar;
