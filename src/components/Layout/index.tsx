import { Navigate, Outlet } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import Footer from "../Footer";
import { SidebarMenu } from "../../common/sidebar-menu";
import { styles } from "./style";
import { Box } from "@mui/joy";

const Layout = () => {
  const access_token: any = localStorage.getItem("access_token");

  if (!access_token) return <Navigate to="/login" />;

  return (
    <Box sx={styles.root}>
      <Header />
      <Box sx={styles.content}>
        <Sidebar sidebarMenu={SidebarMenu} />
        <Box component="main" className="Main" sx={styles.main}>
          <Outlet />
          <Footer />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
