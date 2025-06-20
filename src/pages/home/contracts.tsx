import { Box, Button, Grid, Typography } from "@mui/joy";
import { BookingModal, CardProduct, Loader } from "../../components";
import { useEffect, useState } from "react";
import { IProduct, IProductFilter } from "../../interfaces/product";
import { getProducts } from "../../api/products";
import { IPaginate, IPagination } from "../../interfaces/pagination";
import { saveBooking } from "../../api/bookings";
import { IBooking } from "../../interfaces/booking";
import { CheckOutlined, ErrorOutline, Search } from "@mui/icons-material";
import { showSnackbar } from "../../components/SnackbarUtils";
import {
  ProductFilterInitialValues,
  ProductInitialValues,
} from "../../common/form-values";
import { Empty } from "antd";
import { uploadFile } from "../../api/storage";
import Filters from "./filters";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/joy";

export const Contracts = () => {
  const [rows, setRows] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [filters, setFilters] = useState<IProductFilter>({
    ...ProductFilterInitialValues,
    status: "available",
  });
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [selectedProduct, setSelectedProduct] =
    useState<IProduct>(ProductInitialValues);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [pagination, setPagination] = useState<IPagination>();
  const [paginate, setPaginate] = useState<IPaginate>({
    page: Number(import.meta.env.VITE_PAGINATION_PAGE),
    limit: Number(import.meta.env.VITE_PAGINATION_PRODUCT_LIMIT),
  });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await getProducts(
        "",
        paginate.page,
        paginate.limit,
        "",
        filters,
        true
      );

      if (paginate.page === 1) {
        setRows(response.data);
      } else {
        setRows((prevRows) => [...prevRows, ...response.data]);
      }
      setInitialLoading(false);
      setPagination(response.pagination);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleUpload = async (file: File) => {
    try {
      const resp = await uploadFile(file, import.meta.env.VITE_FOLDER_AUDIOS);
      return resp.data.file_path;
    } catch (error) {
      showSnackbar({
        message: "Audio file upload failed, please try again.",
        color: "danger",
        size: "lg",
        open: true,
        startDecorator: <ErrorOutline />,
      });
      throw new Error("Audio file upload failed, please try again.");
    }
  };

  const handleSubmit = async (values: IBooking, audioFile: File) => {
    setLoading(true);
    try {
      let payload: IBooking = values;
      payload.product = selectedProduct;
      payload.audio = await handleUpload(audioFile);
      await saveBooking(payload);
      await fetchProducts();
      showSnackbar({
        message: "Smart contract has been booked successfully.",
        color: "success",
        size: "lg",
        open: true,
        startDecorator: <CheckOutlined />,
      });
      setOpenModal(false);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [paginate, filters]);

  return (
    <Box>
      <Grid
        container
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        gap={2}
        position={"sticky"}
        top={0}
        zIndex={1000}
        bgcolor={"#000"}
        sx={{
          px: { md: 5, xs: 1 },
          py: { md: 1, xs: 2 },
        }}
      >
        <Link
          component={RouterLink}
          to={"/track"}
          target="_blank"
          underline="none"
        >
          <Button
            variant="outlined"
            color="primary"
            size="lg"
            startDecorator={<Search />}
          >
            Track booking
          </Button>
        </Link>

        <Grid
          container
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          gap={2}
        >
          <Filters
            onApplyFilters={(filters: IProductFilter) => {
              setPaginate((prevPaginate) => ({
                ...prevPaginate,
                page: 1,
              }));
              setFilters({ ...filters, status: "available" });
            }}
          />
        </Grid>
      </Grid>

      <Grid
        id="smart-contracts"
        container
        spacing={2}
        rowGap={2}
        sx={{
          p: { md: 5, xs: 1 },
        }}
      >
        {rows?.map((item: IProduct, index: number) => (
          <Grid key={index} md={3} xs={12} sm={12}>
            <CardProduct
              product={item}
              onBook={() => {
                setSelectedProduct(item);
                setOpenModal(true);
              }}
            />
          </Grid>
        ))}
      </Grid>

      {initialLoading && (
        <Loader
          propsBox={{
            display: "flex",
            justifyContent: "center",
            py: 5,
          }}
        />
      )}

      {!initialLoading && rows?.length == 0 && (
        <Empty
          image={Empty.PRESENTED_IMAGE_DEFAULT}
          description={
            <Typography level="body-lg" py={4}>
              {"No smart contracts are available at the moment."}
            </Typography>
          }
          style={{ padding: "50px" }}
        />
      )}

      <Box
        py={5}
        display={
          rows?.length == 0 ||
          pagination?.current_page == pagination?.total_pages
            ? "none"
            : "flex"
        }
        justifyContent={"center"}
      >
        <Button
          size="lg"
          onClick={() => {
            setPaginate((prevPaginate) => ({
              ...prevPaginate,
              page: prevPaginate.page + 1,
            }));
          }}
          variant="outlined"
          loading={loading}
        >
          Load More
        </Button>
      </Box>

      <BookingModal
        open={openModal}
        loading={loading}
        selectedProduct={selectedProduct}
        onClose={() => {
          setSelectedProduct(ProductInitialValues);
          setOpenModal(false);
        }}
        onSubmit={(values: IBooking, audioFile: File) => {
          handleSubmit(values, audioFile);
        }}
      />
    </Box>
  );
};

export default Contracts;
