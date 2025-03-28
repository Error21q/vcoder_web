import { TableColumnsType } from "antd";
import { IBooking } from "../../interfaces/booking";
import moment from "moment";
import { Chip, Link, Typography, useColorScheme } from "@mui/joy";
import {
  BookingStatusColor,
  BookingStatuses,
  BookingStatusType,
} from "../../common/booking-utils";
import { Link as RouterLink } from "react-router-dom";
import { Launch } from "@mui/icons-material";
import { IProduct } from "../../interfaces/product";
import { AudioPlayer } from "react-audio-play";
import { CopyToClipboardButton } from "../../components";

const useColumns = (
  infoUrl?: string,
  productInfo?: IProduct
): TableColumnsType<IBooking> => {
  const { mode } = useColorScheme();

  const columns: TableColumnsType<IBooking> = [
    {
      title: "Product Name",
      width: 150,
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
            component={RouterLink}
            to={
              infoUrl
                ? infoUrl + record.booking_id
                : "view/" + record.booking_id
            }
            underline="none"
            state={record}
            endDecorator={
              <CopyToClipboardButton
                text={record.booking_id?.toString() || ""}
              />
            }
          >
            {value}
          </Link>
        );
      },
    },
    {
      title: "WhatsApp Number",
      width: 150,
      dataIndex: "whatsapp_number",
      key: "whatsapp_number",
    },
    {
      title: "Wallet Address",
      width: 150,
      dataIndex: "wallet_address",
      key: "wallet_address",
      render(value) {
        return (
          <Typography
            level="body-sm"
            endDecorator={<CopyToClipboardButton text={value || ""} />}
          >
            {value}
          </Typography>
        );
      },
    },
    {
      title: "Email Address",
      width: 150,
      dataIndex: "email_address",
      key: "email_address",
    },

    {
      title: "Contract address",
      width: 150,
      dataIndex: "contract_address",
      key: "contract_address",
      render(value, record) {
        const url: string =
          record?.product?.blockchain?.scan_url ||
          productInfo?.blockchain?.scan_url ||
          "";
        return (
          <Link
            href={url + value}
            slotProps={{ root: { target: "_blank" } }}
            level="body-sm"
            underline="none"
            startDecorator={value && <Launch />}
          >
            {value}
          </Link>
        );
      },
    },
    {
      title: "Website",
      width: 150,
      dataIndex: "domain_name",
      key: "domain_name",
      render(value) {
        return (
          <Link
            href={value}
            slotProps={{ root: { target: "_blank" } }}
            level="body-sm"
            underline="none"
            startDecorator={value && <Launch />}
          >
            {value}
          </Link>
        );
      },
    },

    {
      title: "Status",
      width: 150,
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
      width: 300,
      dataIndex: "audio",
      key: "audio",
      render(value) {
        return (
          <AudioPlayer
            src={value}
            backgroundColor="transparent"
            color={
              mode === "dark"
                ? "var(--joy-palette-neutral-100)"
                : "var(--joy-palette-neutral-800)"
            }
            style={{ boxShadow: "none", padding: 0 }}
          />
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
