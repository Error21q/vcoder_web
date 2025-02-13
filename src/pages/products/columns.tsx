import { Image, TableColumnsType } from "antd";
import { Avatar, Chip, Link } from "@mui/joy";
import moment from "moment";
import { Launch } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { IBooking } from "../../interfaces/booking";

const useColumns = (infoUrl?: string): TableColumnsType<IBooking> => {
  const navigate = useNavigate();

  const columns: TableColumnsType<IBooking> = [
    {
      title: "Name",
      width: 200,
      dataIndex: "name",
      key: "name",
      sorter: true,
      fixed: "left",
      render(value, record: IBooking) {
        return (
          <Link
            level="body-sm"
            onClick={() => {
              navigate(infoUrl ? infoUrl : "view", { state: record });
            }}
          >
            {value}
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
      title: "URL",
      width: 200,
      dataIndex: "url",
      key: "url",
      render(value) {
        return (
          <Link
            href={value}
            slotProps={{ root: { target: "_blank" } }}
            endDecorator={<Launch />}
            level="body-sm"
          >
            {value}
          </Link>
        );
      },
    },
    {
      title: "Category",
      width: 200,
      dataIndex: "category",
      key: "category",
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
      render(value) {
        const is_delivered = value?.find(
          (item: any) => item.status == "delivered"
        );
        return (
          <Chip
            color={is_delivered ? "success" : "danger"}
            size="sm"
            variant="soft"
            sx={{ textTransform: "uppercase", borderRadius: "sm" }}
          >
            {is_delivered ? "YES" : "NO"}
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
