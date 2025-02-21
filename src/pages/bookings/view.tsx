import { Box, Typography } from "@mui/joy";
import { useLocation } from "react-router-dom";
import { IProductInfo } from "../../interfaces/product";
import { DataTable, BookingInfo, ProductInfo } from "../../components";
import useColumns from "./columns";
import { getProductInfoObject } from "../../common/product-utils";
import { IBooking, IBookingInfo } from "../../interfaces/booking";
import { useEffect, useState } from "react";
import { getProduct } from "../../api/products";
import {
  getBookingInfoLeftContent,
  getBookingInfoRightContent,
} from "../../common/booking-utils";

export const ViewBooking = () => {
  const booking: IBooking = useLocation().state;
  const columns = useColumns("", booking.product);
  const productInfoObject: IProductInfo[] = getProductInfoObject(
    booking.product
  );
  const bookingInfoLeftContent: IBookingInfo[] =
    getBookingInfoLeftContent(booking);
  const bookingInfoRightContent: IBookingInfo[] =
    getBookingInfoRightContent(booking);
  const [loading, setLoading] = useState<boolean>(false);
  const [pastBookings, setPastBookings] = useState<IBooking[]>([]);

  const fetchPastBookings = async () => {
    setLoading(true);
    try {
      const response = await getProduct(booking.product.id);
      setPastBookings(response.data.bookings || []);
    } catch (error) {}
    setLoading(false);
  };

  useEffect(() => {
    fetchPastBookings();
  }, []);

  return (
    <Box>
      <Typography level="h2" mb={3}>
        Booking Information
      </Typography>

      <BookingInfo
        bookingInfoLeftContent={bookingInfoLeftContent}
        bookingInfoRightContent={bookingInfoRightContent}
      />

      <Typography level="h2" py={3}>
        Product Information
      </Typography>

      <ProductInfo
        product={booking.product}
        productInfoObject={productInfoObject}
      />

      <Typography level="h2" py={3}>
        Previous Bookings
      </Typography>

      <DataTable
        columns={columns}
        dataSource={pastBookings || []}
        loading={loading}
        showSorterTooltip={false}
        paginate={{
          page_size: 100,
          current_page: 1,
          total_pages: 1,
          total_items: pastBookings?.length || 0,
        }}
      />
    </Box>
  );
};

export default ViewBooking;
