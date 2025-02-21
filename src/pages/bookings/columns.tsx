import { TableColumnsType } from "antd";
import { IBooking } from "../../interfaces/booking";
import moment from "moment";
import { Chip, Link } from "@mui/joy";
import {
  BookingStatusColor,
  BookingStatuses,
  BookingStatusType,
} from "../../common/booking-utils";
import AudioPlayer from "react-h5-audio-player";
import { useNavigate } from "react-router-dom";
import { Launch } from "@mui/icons-material";
import { IProduct } from "../../interfaces/product";

const useColumns = (
  infoUrl?: string,
  productInfo?: IProduct
): TableColumnsType<IBooking> => {
  const navigate = useNavigate();

  const columns: TableColumnsType<IBooking> = [
    {
      title: "Product Name",
      width: 200,
      dataIndex: "product",
      key: "product",
      fixed: "left",
      render(_, record) {
        return record?.product?.name;
      },
    },
    {
      title: "Booking ID",
      width: 200,
      dataIndex: "booking_id",
      key: "booking_id",
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
      title: "WhatsApp Number",
      width: 200,
      dataIndex: "whatsapp_number",
      key: "whatsapp_number",
    },
    {
      title: "Wallet Address",
      width: 200,
      dataIndex: "wallet_address",
      key: "wallet_address",
    },
    {
      title: "Email Address",
      width: 200,
      dataIndex: "email_address",
      key: "email_address",
    },

    {
      title: "Contract address",
      width: 200,
      dataIndex: "contract_address",
      key: "contract_address",
      render(value, record) {
        const url: string =
          record?.product?.blockchain?.url ||
          productInfo?.blockchain?.url ||
          "";
        return (
          <Link
            href={url + value}
            slotProps={{ root: { target: "_blank" } }}
            level="body-sm"
            variant="plain"
            startDecorator={value && <Launch />}
          >
            {value}
          </Link>
        );
      },
    },
    {
      title: "Website",
      width: 200,
      dataIndex: "domain_name",
      key: "domain_name",
      render(value) {
        return (
          <Link
            href={value}
            slotProps={{ root: { target: "_blank" } }}
            level="body-sm"
            variant="plain"
            startDecorator={value && <Launch />}
          >
            {value}
          </Link>
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
            color={BookingStatusColor[value as BookingStatusType]}
            size="sm"
            variant="soft"
            sx={{ textTransform: "uppercase", borderRadius: "sm" }}
            startDecorator={BookingStatuses.find((i) => i.value == value)?.icon}
          >
            {value}
          </Chip>
        );
      },
    },

    {
      title: "Audio",
      width: 400,
      dataIndex: "audio",
      key: "audio",
      render(value) {
        return <AudioPlayer src={value} />;
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
