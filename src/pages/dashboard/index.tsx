import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardCover,
  Chip,
  Divider,
  Grid,
  List,
  ListDivider,
  ListItem,
  Typography,
} from "@mui/joy";
import { CardClickable, CardSummary, Loader } from "../../components";
import { DashboardStats } from "../../common/dashboard-stats";
import { useEffect, useState } from "react";
import { getBookings, summaryBookings } from "../../api/bookings";
import { getProducts } from "../../api/products";
import { IBooking, IBookingStats } from "../../interfaces/booking";
import { IProduct } from "../../interfaces/product";
import { Inventory2Outlined, ShoppingCartOutlined } from "@mui/icons-material";
import moment from "moment";
import {
  getBookingStatsJSON,
  BookingStatusColor,
  BookingStatusType,
} from "../../common/booking-utils";
import { UserRole, useUserRole } from "../../common/auth-utils";

export const DashboardPage = () => {
  const userRole = useUserRole();
  const [loading, setLoading] = useState<boolean>(false);
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [bookingSummary, setBookingSummary] = useState<IBookingStats[]>([]);
  const search = "",
    page = 1,
    limit = 6,
    sort = "updated_at,DESC";

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await getBookings(search, page, limit, sort);
      setBookings(response.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await getProducts(search, page, limit, sort);
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const fetchSummary = async () => {
    setLoading(true);
    try {
      const response = await summaryBookings();
      const smm: IBookingStats[] = getBookingStatsJSON(response.data);
      setBookingSummary(smm);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();
    fetchProducts();
    fetchSummary();
  }, []);

  return (
    <Box>
      <Card sx={{ minHeight: "150px" }} variant="plain">
        <CardCover
          sx={{
            background: "#0B0D0E",
            bbookingRadius: 0,
            margin: "-50px",
          }}
        >
          <img
            src="/assets/img/main/header_bg.png"
            srcSet="/assets/img/main/header_bg.png"
            loading="lazy"
            alt="background-image"
          />
        </CardCover>

        <CardContent sx={{ justifyContent: "right" }}>
          <Typography level="h2" mb={1} textColor={"common.white"}>
            Dashboard
          </Typography>
        </CardContent>
      </Card>

      <CardSummary data={bookingSummary} />

      <Grid container spacing={2} py={2}>
        {userRole === UserRole.ADMIN &&
          DashboardStats.map((card) => (
            <Grid key={card.id} xs={12} sm={6} md={3}>
              <CardClickable {...card} />
            </Grid>
          ))}
      </Grid>

      <Grid container spacing={2}>
        <Grid xs={12} sm={6} md={6}>
          <Card>
            <Typography level="h4" mb={1}>
              Latest Bookings
            </Typography>

            <Divider />

            <CardContent>
              <List>
                {bookings.map((item: IBooking, index: number) => (
                  <Box key={index.toString()}>
                    <ListItem
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Box display={"flex"} alignItems={"center"}>
                        <Avatar>
                          <ShoppingCartOutlined />
                        </Avatar>

                        <Typography level="body-sm" mx={1}>
                          {moment(item.updated_at).format(
                            import.meta.env.VITE_TIME_STAMP
                          )}
                        </Typography>
                      </Box>

                      <Typography level="body-sm">
                        {item.wallet_address}
                      </Typography>

                      <Chip
                        color={
                          BookingStatusColor[item.status as BookingStatusType]
                        }
                        size="sm"
                        variant="soft"
                        sx={{ textTransform: "uppercase" }}
                      >
                        {item.status}
                      </Chip>
                    </ListItem>

                    {index !== bookings.length - 1 && (
                      <ListDivider inset="gutter" />
                    )}
                  </Box>
                ))}
              </List>
            </CardContent>
            {loading && <Loader />}
          </Card>
        </Grid>
        <Grid xs={12} sm={6} md={6}>
          <Card>
            <Typography level="h4" mb={1}>
              Latest Products
            </Typography>

            <Divider />

            <CardContent>
              <List>
                {products.map((item: IProduct, index: number) => (
                  <Box key={index.toString()}>
                    <ListItem
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Box display={"flex"} alignItems={"center"}>
                        <Avatar>
                          <Inventory2Outlined />
                        </Avatar>

                        <Typography level="body-sm" mx={1}>
                          {moment(item.updated_at).format(
                            import.meta.env.VITE_TIME_STAMP
                          )}
                        </Typography>
                      </Box>

                      <Typography level="body-sm">{item.name}</Typography>

                      <Chip
                        color={
                          item.status == "available" ? "success" : "danger"
                        }
                        size="sm"
                        variant="soft"
                        sx={{ textTransform: "uppercase" }}
                      >
                        {item.status}
                      </Chip>
                    </ListItem>

                    {index !== bookings.length - 1 && (
                      <ListDivider inset="gutter" />
                    )}
                  </Box>
                ))}
              </List>
            </CardContent>
            {loading && <Loader />}
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
