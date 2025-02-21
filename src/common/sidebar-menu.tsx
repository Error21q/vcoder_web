import {
  CategoryOutlined,
  CurrencyBitcoinOutlined,
  DashboardOutlined,
  Inventory2Outlined,
  LanguageOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { useUserRole, UserRole } from "./auth-utils";

export interface ISidebarMenu {
  id: number;
  title: string;
  route: string;
  icon: any;
  hide?: boolean;
  newTab?: boolean;
}

export const getSidebarMenu = () => {
  const userRole = useUserRole();

  const SidebarMenu: ISidebarMenu[] = [
    {
      id: 1,
      title: "Home/Site",
      route: "/",
      icon: <LanguageOutlined />,
      newTab: true,
    },
    {
      id: 2,
      title: "Dashboard",
      route: "/admin/dashboard",
      icon: <DashboardOutlined />,
    },
    {
      id: 3,
      title: "Bookings",
      route: "/admin/bookings",
      icon: <ShoppingCartOutlined />,
    },
    {
      id: 4,
      title: "Products",
      route: "/admin/products",
      icon: <Inventory2Outlined />,
      hide: userRole === UserRole.MANAGER,
    },
    {
      id: 5,
      title: "Categories",
      route: "/admin/categories",
      icon: <CategoryOutlined />,
      hide: userRole === UserRole.MANAGER,
    },
    {
      id: 6,
      title: "BlockChains",
      route: "/admin/blockchains",
      icon: <CurrencyBitcoinOutlined />,
      hide: userRole === UserRole.MANAGER,
    },
  ];

  return SidebarMenu;
};
