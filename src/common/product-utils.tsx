import moment from "moment";
import { IProduct, IProductInfo } from "../interfaces/product";
import { Avatar, Box, Chip, Link, Typography } from "@mui/joy";
import {
  CancelOutlined,
  CheckCircleOutlined,
  Launch,
} from "@mui/icons-material";
import { PlanInfo } from "../components";

export type ProductStatusType = "available" | "notavailable";

export const ProductStatuses = [
  {
    id: 1,
    value: "available",
    icon: <CheckCircleOutlined />,
    title: "Available",
  },
  {
    id: 2,
    value: "notavailable",
    icon: <CancelOutlined />,
    title: "Not available",
  },
];

export const getProductInfoObject = (product: IProduct) => {
  const productInfo: IProductInfo[] = [
    {
      title: <Typography level="title-lg">{product.name}</Typography>,
      value: (
        <Link
          href={product.url}
          slotProps={{ root: { target: "_blank" } }}
          startDecorator={<Launch />}
          level="body-sm"
          underline="none"
        >
          {product.url}
        </Link>
      ),
    },
    {
      title: <Typography level="title-sm">Status</Typography>,
      value: (
        <Chip
          color={product.status == "available" ? "success" : "danger"}
          size="sm"
          variant="soft"
          sx={{ textTransform: "uppercase", borderRadius: "sm" }}
          startDecorator={
            ProductStatuses.find((i) => i.value == product.status)?.icon
          }
        >
          {product.status}
        </Chip>
      ),
    },
    {
      title: <Typography level="title-sm">BlockChain</Typography>,
      value: (
        <Chip
          size="sm"
          startDecorator={
            <Avatar
              size="sm"
              alt="blockchain-logo"
              src={product.blockchain?.logo}
            >
              {product.blockchain?.currency}
            </Avatar>
          }
        >
          {product.blockchain?.name}
        </Chip>
      ),
    },
    {
      title: <Typography level="title-sm">Plan</Typography>,
      value: (
        <Box display={"flex"} gap={1} alignItems={"center"}>
          <Typography level="body-sm">{product.plan.name}</Typography>
          <PlanInfo plan={product.plan} />
        </Box>
      ),
    },
    {
      title: <Typography level="title-sm">Listed on</Typography>,
      value: (
        <Typography level="body-sm">
          {moment(product.created_at).format(import.meta.env.VITE_TIME_STAMP)}
        </Typography>
      ),
    },
    {
      title: <Typography level="title-sm">Last modified</Typography>,
      value: (
        <Typography level="body-sm">
          {moment(product.updated_at).format(import.meta.env.VITE_TIME_STAMP)}
        </Typography>
      ),
    },
  ];
  return productInfo;
};
