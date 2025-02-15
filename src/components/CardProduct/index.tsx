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

interface CardProductProps {
  product: IProduct;
  onBook?: () => void;
}

const CardProduct = (props: CardProductProps) => {
  const { product, onBook } = props;

  return (
    <Card sx={{ "&:hover": { boxShadow: "lg" } }}>
      <CardOverflow>
        <AspectRatio sx={{ minWidth: 200 }}>
          <Image
            placeholder
            src={product.image}
            loading="lazy"
            alt="product-image"
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
          sx={{ py: 1, fontWeight: "xl" }}
          endDecorator={
            <Chip
              size="md"
              startDecorator={
                <Avatar
                  size="md"
                  alt="Blockchain-logo"
                  src={product.blockchain?.logo}
                />
              }
            >
              {product.blockchain?.name}
            </Chip>
          }
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
          {product.roi}% ROI
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
          {product.commission}% Referral
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
          {product.level} Levels
        </Typography>
      </CardOverflow>

      <CardOverflow sx={{ p: 0 }}>
        <CardActions buttonFlex="1" sx={{ px: 1, py: 1 }}>
          <Button
            onClick={() => {
              onBook?.();
            }}
          >
            Book Now
          </Button>

          <Button
            variant="soft"
            color="primary"
            endDecorator={<Launch />}
            onClick={() => {
              window.open(product.url, "_blank");
            }}
          >
            View Demo
          </Button>
        </CardActions>
      </CardOverflow>
    </Card>
  );
};

export default CardProduct;
