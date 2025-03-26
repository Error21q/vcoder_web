import { TableColumnsType } from "antd";
import { IBooking } from "../../interfaces/booking";
import moment from "moment";
import { Chip } from "@mui/joy";
import {
  BookingStatusColor,
  BookingStatuses,
  BookingStatusType,
} from "../../common/booking-utils";

const useColumns = (): TableColumnsType<IBooking> => {
  const columns: TableColumnsType<IBooking> = [
    {
      title: "Booking ID",
      width: 200,
      dataIndex: "booking_id",
      key: "booking_id",
    },
    {
      title: "Current Status",
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
      title: "Booked At",
      width: 200,
      dataIndex: "created_at",
      key: "created_at",
      render(value) {
        return moment(value).format(import.meta.env.VITE_TIME_STAMP);
      },
    },
  ];

  return columns;
};

export default useColumns;
