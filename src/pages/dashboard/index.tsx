import { Box, Card, CardContent, CardCover, Grid, Typography } from "@mui/joy";
import { CardClickable, CardSummary } from "../../components";
import { DashboardStats } from "../../common/dashboard-stats";
import { useEffect, useState } from "react";
import { summaryBookings } from "../../api/bookings";
import { IBookingSummary } from "../../interfaces/booking";
import { UserRole, useUserRole } from "../../common/auth-utils";
import { BookingSummaryInitialValues } from "../../common/form-values";

export const DashboardPage = () => {
  const userRole = useUserRole();
  const [loading, setLoading] = useState<boolean>(false);
  const [bookingSummary, setBookingSummary] = useState<IBookingSummary>(
    BookingSummaryInitialValues
  );

  const fetchSummary = async () => {
    setLoading(true);
    try {
      const response = await summaryBookings();
      setBookingSummary(response.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  return (
    <Box>
      <Card sx={{ minHeight: "150px" }} variant="plain">
        <CardCover
          sx={{
            background: "#0B0D0E",
            borderRadius: 0,
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

      <Grid container spacing={2} py={2}>
        {userRole === UserRole.ADMIN &&
          DashboardStats.map((card) => (
            <Grid key={card.id} xs={12} sm={6} md={3}>
              <CardClickable {...card} />
            </Grid>
          ))}
      </Grid>

      <Grid container spacing={2}>
        <Grid xs={12} sm={12} md={12}>
          <CardSummary
            title="Today's Bookings"
            data={bookingSummary}
            separator={"today_"}
            titlePrefix={"Today's"}
            loading={loading}
          />
        </Grid>

        <Grid xs={12} sm={6} md={6}>
          <CardSummary
            title="Monthly Bookings"
            data={bookingSummary}
            separator={"monthly_"}
            titlePrefix={"Monthly"}
            loading={loading}
          />
        </Grid>

        <Grid xs={12} sm={6} md={6}>
          <CardSummary
            title="Total Bookings"
            data={bookingSummary}
            separator={"total_"}
            titlePrefix={"Total"}
            loading={loading}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
