import Sheet from "@mui/joy/Sheet";
import IconButton from "@mui/joy/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { toggleSidebar } from "../../common/sidebar-utils";
import { styles } from "./style";
import ColorSchemeToggle from "../ColorSchemeToggle";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Avatar from "@mui/joy/Avatar";
import Tooltip from "@mui/joy/Tooltip";
import Dropdown from "@mui/joy/Dropdown";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import ListDivider from "@mui/joy/ListDivider";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import { logout } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import {
  AccountCircleOutlined,
  CheckCircleOutlined,
  LogoutOutlined,
} from "@mui/icons-material";
import { showSnackbar } from "../SnackbarUtils";
import { useUserRole } from "../../common/auth-utils";

const Header = () => {
  const userRole = useUserRole();
  const navigate = useNavigate();
  const onLogout = () => {
    logout();
    showSnackbar({
      message: "Logged out successfully.",
      variant: "soft",
      color: "success",
      size: "lg",
      autoHideDuration: 3000,
      open: true,
      startDecorator: <CheckCircleOutlined />,
    });
    navigate("/login");
  };

  return (
    <Sheet sx={styles.root}>
      <Box sx={{ display: { md: "none" } }}>
        <IconButton onClick={() => toggleSidebar()}>
          <MenuIcon />
        </IconButton>
      </Box>

      <Box>
        <img src="/logo.svg" alt="logo" loading="lazy" width={100} />
      </Box>

      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <ColorSchemeToggle sx={{ ml: "auto" }} />

        <Dropdown>
          <Tooltip title="Menu" variant="outlined" arrow>
            <IconButton component={MenuButton} size="sm">
              <AccountCircleOutlined />
            </IconButton>
          </Tooltip>

          <Menu
            placement="bottom-end"
            size="sm"
            sx={{
              zIndex: "99999",
              p: 1,
              gap: 1,
              "--ListItem-radius": "var(--joy-radius-sm)",
            }}
          >
            <MenuItem>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar />
                <Box sx={{ ml: 1.5 }}>
                  <Typography level="title-sm" textColor="text.primary">
                    {userRole}
                  </Typography>
                </Box>
              </Box>
            </MenuItem>
            <ListDivider />
            <MenuItem>
              <HelpRoundedIcon />
              Profile
            </MenuItem>
            <MenuItem>
              <SettingsRoundedIcon />
              Settings
            </MenuItem>
            <ListDivider />
            <MenuItem
              color="danger"
              onClick={() => {
                onLogout();
              }}
            >
              <LogoutOutlined />
              Log out
            </MenuItem>
          </Menu>
        </Dropdown>
      </Box>
    </Sheet>
  );
};

export default Header;
