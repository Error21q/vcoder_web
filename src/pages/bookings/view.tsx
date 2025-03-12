import { Box, Typography } from "@mui/joy";
import { useLocation, useParams } from "react-router-dom";
import { DataTable, BookingInfo, ProductInfo, Loader } from "../../components";
import useColumns from "./columns";
import { getProductInfoObject } from "../../common/product-utils";
import { IBooking } from "../../interfaces/booking";
import { useEffect, useMemo, useState } from "react";
import { getProduct } from "../../api/products";
import {
  getBookingInfoLeftContent,
  getBookingInfoRightContent,
} from "../../common/booking-utils";
import { getBooking } from "../../api/bookings";

export const ViewBooking = () => {
  const { bookingId } = useParams();
  const location = useLocation();
  const [booking, setBooking] = useState<IBooking | null>(
    location.state || null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [pastBookings, setPastBookings] = useState<IBooking[]>([]);

  // Derived values using useMemo (only recomputed if `booking` changes)
  const columns = useMemo(
    () => (booking ? useColumns("", booking.product) : []),
    [booking]
  );
  const productInfoObject = useMemo(
    () => (booking ? getProductInfoObject(booking.product) : []),
    [booking]
  );
  const bookingInfoLeftContent = useMemo(
    () => (booking ? getBookingInfoLeftContent(booking) : []),
    [booking]
  );
  const bookingInfoRightContent = useMemo(
    () => (booking ? getBookingInfoRightContent(booking) : []),
    [booking]
  );

  const fetchBooking = async () => {
    if (!bookingId) return;
    try {
      const response = await getBooking(bookingId);
      setBooking(response.data);
    } catch (error) {
      console.error("Error fetching booking:", error);
    }
  };

  const fetchPastBookings = async () => {
    setLoading(true);
    try {
      const response = await getProduct(booking?.product.id || 0);
      setPastBookings(response.data.bookings || []);
    } catch (error) {}
    setLoading(false);
  };

  useEffect(() => {
    if (!booking) fetchBooking();
    fetchPastBookings();
  }, [booking, bookingId]);

  if (loading) {
    return (
      <Loader
        propsBox={{
          display: "flex",
          justifyContent: "center",
          p: 5,
        }}
      />
    );
  }

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

      {booking && (
        <ProductInfo
          product={booking.product}
          productInfoObject={productInfoObject}
        />
      )}

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
