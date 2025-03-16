import {
  HourglassEmptyOutlined,
  CheckCircleOutlined,
  CancelOutlined,
  LocalShippingOutlined,
  FindInPageOutlined,
  Check,
  Close,
  Tag,
} from "@mui/icons-material";
import { IBooking, IBookingInfo, IBookingStepper } from "../interfaces/booking";
import { Chip, ColorPaletteProp, Typography } from "@mui/joy";
import moment from "moment";
import {
  defaultCountries,
  FlagImage,
  parseCountry,
} from "react-international-phone";

export type BookingStatusType =
  | "pending"
  | "approved"
  | "cancelled"
  | "delivered";

export const BookingStatusColor: Record<BookingStatusType, ColorPaletteProp> = {
  pending: "warning",
  approved: "success",
  cancelled: "danger",
  delivered: "primary",
};

export interface BookingAlertMetaInfo {
  status: BookingStatusType;
  title?: string;
  description?: string;
}

export const BookingStatuses = [
  {
    id: 1,
    value: "pending",
    icon: <HourglassEmptyOutlined />,
    title: "Pending",
  },
  {
    id: 2,
    value: "approved",
    icon: <CheckCircleOutlined />,
    title: "Approved",
  },
  {
    id: 3,
    value: "cancelled",
    icon: <CancelOutlined />,
    title: "Cancelled",
  },
  {
    id: 4,
    value: "delivered",
    icon: <LocalShippingOutlined />,
    title: "Delivered",
  },
];

export const BookingAlertMeta: BookingAlertMetaInfo[] = [
  {
    status: "approved",
    title: "Approval confirmation",
    description: "Are you sure, you want to approve this booking?",
  },
  {
    status: "cancelled",
    title: "Cancellation confirmation",
    description: "Are you sure, you want to cancel this booking?",
  },
  {
    status: "delivered",
    title: "Delivery confirmation",
    description: "Are you sure, you want to deliver this booking?",
  },
];

export const getBookingInfoLeftContent = (booking: IBooking) => {
  const countryData = defaultCountries.find(
    (c) => parseCountry(c).iso2 === booking?.country_code
  );
  const countryDetails = countryData ? parseCountry(countryData) : null;

  const bookingInfo: IBookingInfo[] = [
    {
      title: <Typography level="title-sm">Booking ID</Typography>,
      value: (
        <Chip
          size="sm"
          color="primary"
          sx={{ textTransform: "uppercase", borderRadius: "sm" }}
          startDecorator={<Tag />}
        >
          {booking.booking_id}
        </Chip>
      ),
    },

    {
      title: <Typography level="title-sm">Status</Typography>,
      value: (
        <Chip
          color={BookingStatusColor[booking.status as BookingStatusType]}
          size="sm"
          variant="soft"
          sx={{ textTransform: "uppercase", borderRadius: "sm" }}
          startDecorator={
            BookingStatuses.find((i) => i.value == booking.status)?.icon
          }
        >
          {booking.status}
        </Chip>
      ),
    },

    {
      title: <Typography level="title-sm">Wallet address</Typography>,
      value: <Typography level="body-sm">{booking.wallet_address}</Typography>,
    },

    {
      title: <Typography level="title-sm">Email address</Typography>,
      value: <Typography level="body-sm">{booking.email_address}</Typography>,
    },
    {
      title: <Typography level="title-sm">WhatsApp number</Typography>,
      value: (
        <Typography level="body-sm" sx={{ display: "flex" }}>
          <FlagImage
            iso2={countryDetails?.iso2}
            style={{ marginRight: "8px" }}
          />
          (+{countryDetails?.dialCode}) {booking.whatsapp_number}
        </Typography>
      ),
    },
    {
      title: <Typography level="title-sm">Telegram username</Typography>,
      value: (
        <Typography level="body-sm">
          {booking.telegram_user || "---"}
        </Typography>
      ),
    },
    {
      title: <Typography level="title-sm">Telegram group</Typography>,
      value: (
        <Typography level="body-sm">
          {booking.telegram_group || "---"}
        </Typography>
      ),
    },
    {
      title: <Typography level="title-sm">Refer code</Typography>,
      value: (
        <Typography level="body-sm">{booking.refer_code || "---"}</Typography>
      ),
    },
  ];
  return bookingInfo;
};

export const getBookingInfoRightContent = (booking: IBooking) => {
  const bookingInfo: IBookingInfo[] = [
    {
      title: <Typography level="title-sm">Approved at</Typography>,
      value: (
        <Typography level="body-sm">
          {moment(booking.approved_time).isValid()
            ? moment(booking.approved_time).format(
                import.meta.env.VITE_TIME_STAMP
              )
            : "---"}
        </Typography>
      ),
    },
    {
      title: <Typography level="title-sm">Cancelled at</Typography>,
      value: (
        <Typography level="body-sm">
          {moment(booking.cancel_time).isValid()
            ? moment(booking.cancel_time).format(
                import.meta.env.VITE_TIME_STAMP
              )
            : "---"}
        </Typography>
      ),
    },
    {
      title: <Typography level="title-sm">Cancel reason</Typography>,
      value: (
        <Typography level="body-sm">
          {booking.cancel_reason || "---"}
        </Typography>
      ),
    },
    {
      title: <Typography level="title-sm">Delivered at</Typography>,
      value: (
        <Typography level="body-sm">
          {moment(booking.deliver_time).isValid()
            ? moment(booking.deliver_time).format(
                import.meta.env.VITE_TIME_STAMP
              )
            : "---"}
        </Typography>
      ),
    },
    {
      title: <Typography level="title-sm">Booked on</Typography>,
      value: (
        <Typography level="body-sm">
          {moment(booking.created_at).format(import.meta.env.VITE_TIME_STAMP)}
        </Typography>
      ),
    },
    {
      title: <Typography level="title-sm">Last modified</Typography>,
      value: (
        <Typography level="body-sm">
          {moment(booking.updated_at).format(import.meta.env.VITE_TIME_STAMP)}
        </Typography>
      ),
    },
  ];

  return bookingInfo;
};

export const getBookingStepper = (booking: IBooking) => {
  const is_pending: boolean = booking.status == "pending";
  const is_approved: boolean = booking.status == "approved";
  const is_cancelled: boolean = booking.status == "cancelled";
  const is_delivered: boolean = booking.status == "delivered";

  const step3Icon =
    is_approved || is_delivered ? (
      <Check />
    ) : is_cancelled ? (
      <Close />
    ) : (
      <HourglassEmptyOutlined />
    );
  const step3Color = is_approved
    ? "success"
    : is_delivered
    ? "success"
    : is_cancelled
    ? "danger"
    : "primary";

  const bookingInfo: IBookingStepper[] = [
    {
      title: "completed",
      description: "Booked successfully",
      isCompleted: true,
    },
    {
      title: is_pending ? "in progress" : "completed",
      description: "Under review",
      isCompleted: is_pending ? false : true,
      icon: is_pending && <FindInPageOutlined />,
      color: is_pending ? "primary" : "success",
      variant: is_pending ? "outlined" : "solid",
    },
    {
      title:
        is_approved || is_cancelled || is_delivered
          ? "completed"
          : "in progress",

      description: is_pending
        ? "Approved/Rejected"
        : is_cancelled
        ? "Rejected"
        : "Approved",

      isCompleted:
        is_approved || is_delivered ? true : is_cancelled ? false : false,

      icon: step3Icon,
      color: step3Color,
      variant:
        is_approved || is_cancelled || is_delivered ? "solid" : "outlined",
    },
    {
      title: is_delivered ? "completed" : "",
      description: "Delivered",
      isCompleted: is_delivered ? true : false,
      icon: is_delivered ? <Check /> : <LocalShippingOutlined />,
      color: is_delivered ? "success" : "primary",
      variant: is_delivered ? "solid" : "outlined",
    },
  ];

  return bookingInfo;
};
