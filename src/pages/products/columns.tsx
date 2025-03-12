import { Image, TableColumnsType } from "antd";
import { Avatar, Chip, Link } from "@mui/joy";
import moment from "moment";
import { Launch } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { IBooking } from "../../interfaces/booking";
import { ProductStatuses } from "../../common/product-utils";

const useColumns = (infoUrl?: string): TableColumnsType<IBooking> => {
  const columns: TableColumnsType<IBooking> = [
    {
      title: "Name",
      width: 200,
      dataIndex: ["id", "name"],
      key: "name",
      sorter: true,
      fixed: "left",
      render(_, record: any) {
        return (
          <Link
            level="body-sm"
            component={RouterLink}
            to={infoUrl ? infoUrl : "view/" + record["id"]}
            underline="none"
            state={record}
          >
            {record["name"] as string}
          </Link>
        );
      },
    },
    {
      title: "Image",
      width: 200,
      dataIndex: "image",
      key: "image",
      render(value) {
        return (
          <Image placeholder src={value} height={100} alt="product-image" />
        );
      },
    },
    {
      title: "Demo URL",
      width: 200,
      dataIndex: "url",
      key: "url",
      render(value) {
        return (
          <Link
            href={value}
            slotProps={{ root: { target: "_blank" } }}
            startDecorator={<Launch />}
            level="body-sm"
            underline="none"
          >
            {value}
          </Link>
        );
      },
    },
    {
      title: "Plan",
      width: 200,
      dataIndex: "plan",
      key: "plan",
      render(value) {
        return value?.name;
      },
    },
    {
      title: "Blockchain",
      width: 200,
      dataIndex: "blockchain",
      key: "blockchain",
      render(value) {
        return (
          <Chip
            size="sm"
            startDecorator={
              <Avatar size="sm" alt="blockchain-logo" src={value?.logo}>
                {value?.currency}
              </Avatar>
            }
          >
            {value?.name}
          </Chip>
        );
      },
    },
    {
      title: "Status",
      width: 200,
      dataIndex: "status",
      key: "status",
      render(value) {
        return (
          <Chip
            color={value == "available" ? "success" : "danger"}
            size="sm"
            variant="soft"
            sx={{ textTransform: "uppercase", borderRadius: "sm" }}
            startDecorator={ProductStatuses.find((i) => i.value == value)?.icon}
          >
            {value}
          </Chip>
        );
      },
    },
    {
      title: "Delivered?",
      width: 200,
      dataIndex: "booking.status",
      key: "booking.status",
      render(_, record: any) {
        const isDelivered = record?.bookings?.find(
          (item: any) => item.status == "delivered"
        );
        return (
          <Chip
            color={isDelivered ? "success" : "danger"}
            size="sm"
            variant="soft"
            sx={{ textTransform: "uppercase", borderRadius: "sm" }}
          >
            {isDelivered ? "YES" : "NO"}
          </Chip>
        );
      },
    },
    {
      title: "Created At",
      width: 200,
      dataIndex: "created_at",
      key: "created_at",
      sorter: true,
      render(value) {
        return moment(value).format(import.meta.env.VITE_TIME_STAMP);
      },
    },
    {
      title: "Updated At",
      width: 200,
      dataIndex: "updated_at",
      key: "updated_at",
      sorter: true,
      render(value) {
        return moment(value).format(import.meta.env.VITE_TIME_STAMP);
      },
    },
  ];

  return columns;
};

export default useColumns;
