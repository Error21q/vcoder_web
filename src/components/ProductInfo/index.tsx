import {
  AspectRatio,
  Box,
  Card,
  CardContent,
  Grid,
  List,
  ListDivider,
  ListItem,
} from "@mui/joy";
import { IProduct, IProductInfo } from "../../interfaces/product";
import { Image } from "antd";

interface ProductInfoProps {
  product: IProduct;
  productInfoObject: IProductInfo[];
}

const ProductInfo = (props: ProductInfoProps) => {
  const { product, productInfoObject } = props;

  return (
    <Card orientation="horizontal" sx={{ p: 0 }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid xs={12} sm={12} md={6}>
            <List>
              {productInfoObject.map((item: IProductInfo, index: number) => (
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
                  {index !== productInfoObject.length - 1 && (
                    <ListDivider inset="gutter" />
                  )}
                </Box>
              ))}
            </List>
          </Grid>

          <Grid xs={12} sm={12} md={6}>
            <AspectRatio variant="plain">
              <Image placeholder src={product?.image} alt="product-image" />
            </AspectRatio>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ProductInfo;
