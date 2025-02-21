import { Outlet, useNavigate } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import Footer from "../Footer";
import { styles } from "./style";
import { Box } from "@mui/joy";
import { useJwt } from "react-jwt";
import { getSidebarMenu } from "../../common/sidebar-menu";

const Layout = () => {
  const navigate = useNavigate();

  // authentication and redirection
  const rawAccessToken: any = localStorage.getItem("access_token");
  const access_token = useJwt(rawAccessToken);
  const decodedToken: any = access_token.decodedToken;

  if (!decodedToken?.role && access_token?.isExpired) {
    navigate("/login");
  }

  return (
    <Box sx={styles.root}>
      <Header />
      <Box sx={styles.content}>
        <Sidebar sidebarMenu={getSidebarMenu()} />
        <Box component="main" className="Main" sx={styles.main}>
          <Outlet />
          <Footer />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
