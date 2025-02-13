import {
  Box,
  Card,
  CardContent,
  Grid,
  List,
  ListDivider,
  ListItem,
} from "@mui/joy";
import { IBookingInfo } from "../../interfaces/booking";

interface BookingInfoProps {
  bookingInfoLeftContent: IBookingInfo[];
  bookingInfoRightContent: IBookingInfo[];
}

const BookingInfo = (props: BookingInfoProps) => {
  const { bookingInfoLeftContent, bookingInfoRightContent } = props;

  return (
    <Card orientation="horizontal" sx={{ p: 0 }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid xs={12} sm={12} md={6}>
            <List>
              {bookingInfoLeftContent.map(
                (item: IBookingInfo, index: number) => (
                  <Box>
                    <ListItem
                      key={index}
                      sx={{
                        p: 1,
                        display: "flex",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                      }}
                    >
                      {item.title}
                      {item.value}
                    </ListItem>
                    {index !== bookingInfoLeftContent.length - 1 && (
                      <ListDivider inset="gutter" />
                    )}
                  </Box>
                ),
              )}
            </List>
          </Grid>

          <Grid xs={12} sm={12} md={6}>
            <List>
              {bookingInfoRightContent.map(
                (item: IBookingInfo, index: number) => (
                  <Box>
                    <ListItem
                      key={index}
                      sx={{
                        p: 1,
                        display: "flex",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                      }}
                    >
                      {item.title}
                      {item.value}
                    </ListItem>
                    {index !== bookingInfoRightContent.length - 1 && (
                      <ListDivider inset="gutter" />
                    )}
                  </Box>
                ),
              )}
            </List>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default BookingInfo;
