import { Box, Card, Divider, Grid, Skeleton, Typography } from "@mui/joy";
import { IBookingSummary } from "../../interfaces/booking";
import { Statistic } from "antd";
import {
  BookingStatusColor,
  BookingStatuses,
  BookingStatusType,
} from "../../common/booking-utils";

interface CardSummaryProps {
  data: IBookingSummary;
  separator: string;
  title: string;
  titlePrefix: string;
  loading?: boolean;
}

const CardSummary = (props: CardSummaryProps) => {
  const { data, separator, title, titlePrefix, loading } = props;
  return (
    <Card>
      <Typography level="h4" mb={1}>
        {title}
      </Typography>
      <Divider />
      <Grid container textAlign={"center"} spacing={loading ? 1 : 1}>
        {Object.keys(data)
          .filter((key) => key.startsWith(separator))
          .map((key, index) => {
            const status = key
              .replace(separator, "")
              .replace(/_/g, " ")
              .replace(/\b\w/g, (char) => char.toUpperCase());
            const formattedTitle = titlePrefix + " " + status;

            return (
              <Grid xs={6} sm={6} md={2.4} key={index}>
                <Skeleton variant="text" level="h1" loading={loading}>
                  <Statistic
                    title={
                      <Typography level="title-sm">{formattedTitle}</Typography>
                    }
                    formatter={() => (
                      <Box
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        gap={1}
                      >
                        <Typography
                          level="title-sm"
                          color={
                            BookingStatusColor[
                              status.toLowerCase() as BookingStatusType
                            ]
                          }
                        >
                          {
                            BookingStatuses.find(
                              (i) => i.value == status.toLowerCase()
                            )?.icon
                          }
                        </Typography>
                        <Typography level="h4">
                          {data[key as keyof IBookingSummary]}
                        </Typography>
                      </Box>
                    )}
                    loading={loading}
                  />
                </Skeleton>
              </Grid>
            );
          })}
      </Grid>
    </Card>
  );
};

export default CardSummary;
