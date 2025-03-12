import { Box, Typography } from "@mui/joy";
import { useLocation, useParams } from "react-router-dom";
import { IProduct } from "../../interfaces/product";
import { DataTable, Loader, ProductInfo } from "../../components";
import useColumns from "../bookings/columns";
import { getProductInfoObject } from "../../common/product-utils";
import { getProduct } from "../../api/products";
import { useEffect, useMemo, useState } from "react";

export const ViewProduct = () => {
  const { productId } = useParams();
  const location = useLocation();

  const [product, setProduct] = useState<IProduct | null>(
    location.state || null
  );
  const [loading, setLoading] = useState<boolean>(!location.state);

  // Derived values using useMemo
  const columns = useMemo(
    () => (product ? useColumns("/admin/bookings/view/", product) : []),
    [product]
  );
  const productInfoObject = useMemo(
    () => (product ? getProductInfoObject(product) : []),
    [product]
  );

  const fetchProduct = async () => {
    if (!productId) return;
    setLoading(true);
    try {
      const response = await getProduct(productId);
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!product) fetchProduct();
  }, [product, productId]);

  if (loading) {
    return (
      <Loader
        propsBox={{
          display: "flex",
          justifyContent: "center",
          p: 5,
        }}
      />
    );
  }

  return (
    <Box>
      <Typography level="h2" mb={3}>
        Product Information
      </Typography>

      {product && (
        <ProductInfo product={product} productInfoObject={productInfoObject} />
      )}

      <Typography level="h2" py={3}>
        Product's Bookings
      </Typography>

      <DataTable
        columns={columns}
        dataSource={product?.bookings || []}
        loading={loading}
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
