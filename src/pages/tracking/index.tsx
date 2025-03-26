import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Divider,
  FormLabel,
  Grid,
  IconButton,
  Input,
  Typography,
} from "@mui/joy";
import ScrollToTop from "../home/common/ScrollToTop";
import Footer from "../home/layout/Footer";
import Header from "../home/layout/Header";
import { useState } from "react";
import { getBooking } from "../../api/bookings";
import { IBooking } from "../../interfaces/booking";
import { getBookingStepper } from "../../common/booking-utils";
import {
  ArrowBackOutlined,
  ArrowForwardOutlined,
  ErrorOutlined,
  InfoOutlined,
  Tag,
} from "@mui/icons-material";
import { CardProduct, DataTable, TrackingStepper } from "../../components";
import { Empty } from "antd";
import useColumns from "./columns";

export const TrackingPage = () => {
  const columns = useColumns();
  const [trackingId, setTrackingId] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [booking, setBooking] = useState<IBooking>();

  const lastColumn: any = {
    title: "Action",
    key: "operation",
    width: 120,
    render: (_: any, record: IBooking) => (
      <Button
        fullWidth
        size="sm"
        endDecorator={<ArrowForwardOutlined />}
        onClick={() => {
          setBooking(record);
        }}
      >
        Track
      </Button>
    ),
  };

  const fetchBooking = async (bookingId: string) => {
    if (!trackingId) return;
    setLoading(true);
    try {
      const response = await getBooking(bookingId);
      if (response?.data?.length === 0) {
        setShowError(true);
      } else {
        setShowError(false);
        setBookings(response.data);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="home-purple-gradient">
      <ScrollToTop />
      <Header />
      <div className="feature-area-2 pt-110 pb-140 position-relative overflow-hidden container">
        <Grid container my={5} spacing={2}>
          <Grid xs={12} sm={12} md={4}>
            <Card variant="soft">
              <Typography level="h4">Track your booking</Typography>
              <Divider />
              <CardContent sx={{ py: 5 }}>
                <FormLabel required>
                  Enter your Booking number or Email address
                </FormLabel>
                <Input
                  type="text"
                  size="lg"
                  required
                  value={trackingId}
                  onChange={(event) => {
                    setTrackingId(event.target.value);
                  }}
                />

                {showError && (
                  <Alert
                    startDecorator={<ErrorOutlined />}
                    color="danger"
                    sx={{ my: 1 }}
                  >
                    Invalid booking number or email address.
                  </Alert>
                )}
              </CardContent>
              <Divider />

              <CardActions buttonFlex="1">
                <Button
                  variant="outlined"
                  onClick={() => {
                    setTrackingId("");
                    setShowError(false);
                    setBooking(undefined);
                    setBookings([]);
                  }}
                >
                  Clear
                </Button>

                <Button
                  loading={loading}
                  disabled={bookings.length > 0}
                  type="submit"
                  onClick={() => {
                    trackingId && fetchBooking(trackingId);
                  }}
                >
                  Search
                </Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid xs={12} sm={12} md={8}>
            <Card variant="soft">
              <Typography
                level="h4"
                flexWrap={"wrap"}
                startDecorator={
                  booking && (
                    <IconButton
                      size="sm"
                      color="primary"
                      variant="solid"
                      onClick={() => {
                        setBooking(undefined);
                      }}
                    >
                      <ArrowBackOutlined />
                    </IconButton>
                  )
                }
                endDecorator={
                  booking && (
                    <Chip
                      component="span"
                      variant="outlined"
                      color="primary"
                      startDecorator={<Tag />}
                    >
                      {booking.booking_id}
                    </Chip>
                  )
                }
                slotProps={{
                  endDecorator: {
                    sx: {
                      display: "flex",
                      flex: 1,
                      justifyContent: "flex-end",
                    },
                  },
                }}
              >
                Booking information
              </Typography>
              <Divider />
              <CardContent>
                {booking?.status === "deactivated" && (
                  <Alert color="danger" startDecorator={<InfoOutlined />}>
                    The website and smart contract for this booking has been
                    deactivated.
                  </Alert>
                )}

                {booking ? (
                  <Grid container spacing={5} alignItems={"center"}>
                    <Grid xs={12} sm={12} md={6}>
                      <CardProduct product={booking.product} />
                    </Grid>
                    <Grid xs={12} sm={12} md={6}>
                      <TrackingStepper steps={getBookingStepper(booking)} />
                    </Grid>
                  </Grid>
                ) : !booking && bookings.length > 0 ? (
                  <DataTable
                    columns={[...columns, lastColumn]}
                    dataSource={bookings}
                    loading={loading}
                    showSorterTooltip={false}
                    hideIndexColumn={true}
                    paginate={{
                      page_size: 10,
                      current_page: 1,
                      total_items: bookings?.length || 0,
                      total_pages: 1,
                    }}
                  />
                ) : (
                  <Empty
                    image={Empty.PRESENTED_IMAGE_DEFAULT}
                    description={
                      <Typography level="body-md" py={5}>
                        Try searching for your booking request using either your
                        booking number or email address.
                      </Typography>
                    }
                  />
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
      <Footer />
    </div>
  );
};

export default TrackingPage;
