import {
  CategoryOutlined,
  CurrencyBitcoinOutlined,
  DashboardOutlined,
  Inventory2Outlined,
  LanguageOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";

export interface ISidebarMenu {
  id: number;
  title: string;
  route: string;
  icon: any;
}

export const SidebarMenu: ISidebarMenu[] = [
  {
    id: 1,
    title: "Home/Site",
    route: "/",
    icon: <LanguageOutlined />,
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
  },
  {
    id: 5,
    title: "Categories",
    route: "/admin/categories",
    icon: <CategoryOutlined />,
  },
  {
    id: 6,
    title: "BlockChains",
    route: "/admin/blockchains",
    icon: <CurrencyBitcoinOutlined />,
  },
];
