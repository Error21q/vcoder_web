import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardOverflow,
  Typography,
} from "@mui/joy";
import { useLocation, useNavigate } from "react-router-dom";
import { FormikProps } from "formik";
import { BookingInitialValues } from "../../common/form-values";
import { BookingValidationSchema } from "../../common/form-schema";
import { showSnackbar } from "../../components/SnackbarUtils";
import { CheckOutlined } from "@mui/icons-material";
import { Form } from "../../components";
import { BookingInputFields } from "../../common/form-fields";
import { useRef, useState } from "react";
import { IBooking } from "../../interfaces/booking";
import { saveBooking } from "../../api/bookings";
import { IProduct } from "../../interfaces/product";
import { getProducts } from "../../api/products";
import { BookingStatuses } from "../../common/booking-utils";

export const ManageBooking = () => {
  const navigate = useNavigate();
  const rowData: IBooking = useLocation().state;
  const formikRef = useRef<FormikProps<any>>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<IProduct[]>();

  const onProductSearch = async (value: string) => {
    try {
      const response = await getProducts(value, 1, 100);
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    if (formikRef.current) await formikRef.current.submitForm();
    if (
      !formikRef.current?.isValid ||
      formikRef.current?.values.product?.id == 0
    )
      return;
    setLoading(true);

    try {
      const payload: IBooking = {
        ...formikRef.current?.values,
        // status: "pending",
        audio: import.meta.env.VITE_DEFAULT_AUDIO,
      };
      await saveBooking(payload);
      showSnackbar({
        message: "Data saved successfully.",
        color: "success",
        size: "lg",
        open: true,
        startDecorator: <CheckOutlined />,
      });
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <Box>
      <Typography level="h2" mb={5}>
        Manage Booking
      </Typography>

      <Card>
        <CardOverflow variant="soft" sx={{ py: 2 }}>
          <Typography level="title-md">
            {rowData?.id
              ? "Update an existing booking"
              : "Create a new booking"}
          </Typography>
        </CardOverflow>

        <CardContent>
          <Box gap={3} flexDirection="column" display="flex">
            <Form
              formikRef={formikRef}
              initialValues={rowData || BookingInitialValues}
              validationSchema={BookingValidationSchema}
              inputFields={BookingInputFields}
              statuses={BookingStatuses}
              products={products}
              onSubmit={(_) => _}
              onSearch={onProductSearch}
            />
          </Box>
        </CardContent>

        <CardOverflow variant="soft">
          <CardActions>
            <Button
              variant="outlined"
              color="neutral"
              onClick={() => {
                navigate(-1);
              }}
            >
              Back
            </Button>
            <Button
              variant="solid"
              color="primary"
              loading={loading}
              onClick={() => {
                handleSubmit();
              }}
            >
              Submit
            </Button>
          </CardActions>
        </CardOverflow>
      </Card>
    </Box>
  );
};

export default ManageBooking;
