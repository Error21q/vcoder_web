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
import { ICategory } from "../../interfaces/category";
import { FormikProps } from "formik";
import { CategoryInitialValues } from "../../common/form-values";
import { CategoryValidationSchema } from "../../common/form-schema";
import { saveCategory } from "../../api/category";
import { showSnackbar } from "../../components/SnackbarUtils";
import { CheckOutlined } from "@mui/icons-material";
import { Form } from "../../components";
import { CategoryInputFields } from "../../common/form-fields";
import { useRef, useState } from "react";

export const ManageCategory = () => {
  const navigate = useNavigate();
  const rowData: ICategory = useLocation().state;
  const formikRef = useRef<FormikProps<any>>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (formikRef.current) await formikRef.current.submitForm();
    if (!formikRef.current?.isValid) return;
    setLoading(true);

    try {
      const payload: ICategory = formikRef.current?.values;
      await saveCategory(payload);
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
        Manage Category
      </Typography>

      <Card>
        <CardOverflow variant="soft" sx={{ py: 2 }}>
          <Typography level="title-md">
            {rowData?.id
              ? "Update an existing category"
              : "Create a new category"}
          </Typography>
        </CardOverflow>

        <CardContent>
          <Box gap={3} flexDirection="column" display="flex">
            <Form
              formikRef={formikRef}
              initialValues={rowData || CategoryInitialValues}
              validationSchema={CategoryValidationSchema}
              inputFields={CategoryInputFields}
              onSubmit={(_) => _}
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

export default ManageCategory;
