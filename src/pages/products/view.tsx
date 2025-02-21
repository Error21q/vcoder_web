import { Box, Typography } from "@mui/joy";
import { useLocation } from "react-router-dom";
import { IProduct, IProductInfo } from "../../interfaces/product";
import { DataTable, ProductInfo } from "../../components";
import useColumns from "../bookings/columns";
import { getProductInfoObject } from "../../common/product-utils";

export const ViewProduct = () => {
  const product: IProduct = useLocation().state;
  const columns = useColumns("/admin/bookings/view", product);
  const productInfoObject: IProductInfo[] = getProductInfoObject(product);

  return (
    <Box>
      <Typography level="h2" mb={3}>
        Product Information
      </Typography>

      <ProductInfo product={product} productInfoObject={productInfoObject} />

      <Typography level="h2" py={3}>
        Product's Bookings
      </Typography>

      <DataTable
        columns={columns}
        dataSource={product?.bookings || []}
        loading={product?.id ? false : true}
        showSorterTooltip={false}
        paginate={{
          page_size: 100,
          current_page: 1,
          total_pages: 1,
          total_items: product?.bookings?.length || 0,
        }}
      />
    </Box>
  );
};

export default ViewProduct;
