import Avatar from "@mui/joy/Avatar";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import { Card, Grid, Typography } from "@mui/joy";
import { IBookingStats } from "../../interfaces/booking";

interface CardSummaryProps {
  data: IBookingStats[];
}

const CardSummary = (props: CardSummaryProps) => {
  const { data } = props;
  return (
    <List
      orientation="horizontal"
      variant="outlined"
      component={Card}
      sx={{
        "--ListItemDecorator-size": "50px",
        "--ListItem-paddingY": "1rem",
        borderRadius: "sm",
      }}
    >
      <Grid container minWidth={"100%"}>
        {data?.map((item: IBookingStats, index) => (
          <Grid key={index} xs={12} md={12 / data?.length}>
            <ListItem sx={{ justifyContent: { md: "center" } }}>
              <ListItemDecorator>
                <Avatar size="lg">{item.avatar}</Avatar>
              </ListItemDecorator>
              <Typography level="title-lg">{item.title}</Typography>
            </ListItem>
          </Grid>
        ))}
      </Grid>
    </List>
  );
};

export default CardSummary;
