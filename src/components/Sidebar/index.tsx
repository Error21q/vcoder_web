import Box from "@mui/joy/Box";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import ListItemContent from "@mui/joy/ListItemContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { closeSidebar } from "../../common/sidebar-utils";
import { styles } from "./style";
import { useLocation, useNavigate } from "react-router-dom";
import { ISidebarMenu } from "../../common/sidebar-menu";

interface SidebarProps {
  sidebarMenu: ISidebarMenu[];
}

const Sidebar = (props: SidebarProps) => {
  const { sidebarMenu } = props;
  const navigate = useNavigate();
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
            <ListItem key={item.id}>
              <ListItemButton
                sx={{ py: 1 }}
                selected={location.pathname === item.route}
                onClick={() => {
                  closeSidebar();
                  item.newTab
                    ? window.open(item.route, "_blank")
                    : navigate(item.route);
                }}
              >
                {item.icon}
                <ListItemContent>
                  <Typography level="title-md">{item.title}</Typography>
                </ListItemContent>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Sheet>
  );
};

export default Sidebar;
