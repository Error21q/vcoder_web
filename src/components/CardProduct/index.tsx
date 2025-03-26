import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Chip from "@mui/joy/Chip";
import Typography from "@mui/joy/Typography";
import { Avatar, CardActions, Divider } from "@mui/joy";
import { Image } from "antd";
import { IProduct } from "../../interfaces/product";
import {
  BarChartOutlined,
  LanOutlined,
  Launch,
  Percent,
} from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/joy";

interface CardProductProps {
  product: IProduct;
  onBook?: () => void;
}

const CardProduct = (props: CardProductProps) => {
  const { product, onBook } = props;

  return (
    <Card sx={{ "&:hover": { borderColor: "ButtonFace" } }}>
      <CardOverflow>
        <AspectRatio sx={{ minWidth: 200 }}>
          <Image
            placeholder
            src={product.image}
            loading="lazy"
            alt="product-image"
            style={{
              objectFit: "cover",
              objectPosition: "top center",
            }}
            preview={{
              toolbarRender: (_, __) => <></>,
              styles: {
                body: {
                  backdropFilter: "blur(8px)",
                  background: "var(--joy-palette-background-backdrop)",
                },
              },
            }}
          />
        </AspectRatio>
      </CardOverflow>

      <CardContent>
        <Typography
          level="title-lg"
          flexWrap={"wrap"}
          sx={{ py: 1, fontWeight: "xl" }}
          endDecorator={
            <Chip
              startDecorator={
                <Avatar alt="Blockchain-logo" src={product.blockchain?.logo} />
              }
            >
              {product.blockchain?.name}
            </Chip>
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
          {product.name}
        </Typography>
      </CardContent>

      <CardOverflow
        variant="soft"
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          px: 0,
          py: 2,
          borderTop: "1px solid",
          borderBottom: "1px solid",
          borderColor: "divider",
          background: "transparent",
        }}
      >
        <Typography
          startDecorator={
            <Avatar size="sm">
              <Percent />
            </Avatar>
          }
          level="title-sm"
        >
          {product.plan.roi}% ROI
        </Typography>
        <Divider orientation="vertical" />
        <Typography
          startDecorator={
            <Avatar size="sm">
              <LanOutlined />
            </Avatar>
          }
          level="title-sm"
        >
          {product.plan.referral}% Referral
        </Typography>
        <Divider orientation="vertical" />
        <Typography
          startDecorator={
            <Avatar size="sm">
              <BarChartOutlined />
            </Avatar>
          }
          level="title-sm"
        >
          {product.plan.level} Levels
        </Typography>
      </CardOverflow>

      <CardOverflow sx={{ p: 0 }}>
        <CardActions buttonFlex="1" sx={{ px: 1, py: 1 }}>
          {onBook && (
            <Button
              onClick={() => {
                onBook?.();
              }}
            >
              Book Now
            </Button>
          )}

          <Link
            component={RouterLink}
            to={product.url}
            target="_blank"
            underline="none"
          >
            <Button variant="soft" color="primary" startDecorator={<Launch />}>
              View Demo
            </Button>
          </Link>
        </CardActions>
      </CardOverflow>
    </Card>
  );
};

export default CardProduct;
