import {
  AddShoppingCartOutlined,
  CategoryOutlined,
  CurrencyBitcoinOutlined,
  InventoryOutlined,
} from "@mui/icons-material";

export interface IDashboardStats {
  id: number;
  title: string;
  description: string;
  icon: any;
  route: string;
}

export const DashboardStats: IDashboardStats[] = [
  {
    id: 1,
    title: "Add new booking",
    description: "click to add a new booking",
    route: "/admin/bookings/manage",
    icon: <AddShoppingCartOutlined />,
  },
  {
    id: 2,
    title: "Add new product",
    description: "click to add a new product",
    route: "/admin/products/manage",
    icon: <InventoryOutlined />,
  },
  {
    id: 3,
    title: "Add new plan",
    description: "click to add a new plan",
    route: "/admin/plans/manage",
    icon: <CategoryOutlined />,
  },
  {
    id: 4,
    title: "Add new blockchain",
    description: "click to add a new blockchain",
    route: "/admin/blockchains/manage",
    icon: <CurrencyBitcoinOutlined />,
  },
];
