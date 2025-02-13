import { AspectRatio, Link } from "@mui/joy";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { useNavigate } from "react-router-dom";

interface CardStatsProps {
  title: string;
  description: string;
  icon: any;
  route: string;
}

const CardClickable = (props: CardStatsProps) => {
  const { title, description, icon, route } = props;
  const navigate = useNavigate();
  return (
    <Card
      variant="outlined"
      sx={{
        "&:hover": {
          boxShadow: "md",
          borderColor: "neutral.outlinedHoverBorder",
        },
      }}
    >
      <CardContent orientation="horizontal" sx={{ alignItems: "center" }}>
        <AspectRatio ratio="1" variant="plain" sx={{ width: 42 }}>
          {icon}
        </AspectRatio>

        <Link
          overlay
          underline="none"
          sx={{ color: "text.tertiary" }}
          onClick={() => {
            navigate(route);
          }}
        >
          <CardContent>
            <Typography level="title-lg">{title}</Typography>
            <Typography level="body-sm">{description}</Typography>
          </CardContent>
        </Link>
      </CardContent>
    </Card>
  );
};

export default CardClickable;
