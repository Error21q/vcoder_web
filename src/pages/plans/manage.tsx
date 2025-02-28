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
import { IPlan } from "../../interfaces/plan";
import { FormikProps } from "formik";
import { PlanInitialValues } from "../../common/form-values";
import { PlanValidationSchema } from "../../common/form-schema";
import { savePlan } from "../../api/plan";
import { showSnackbar } from "../../components/SnackbarUtils";
import { CheckOutlined } from "@mui/icons-material";
import { Form } from "../../components";
import { PlanInputFields } from "../../common/form-fields";
import { useRef, useState } from "react";

export const ManagePlan = () => {
  const navigate = useNavigate();
  const rowData: IPlan = useLocation().state;
  const formikRef = useRef<FormikProps<any>>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (formikRef.current) await formikRef.current.submitForm();
    if (!formikRef.current?.isValid) return;
    setLoading(true);

    try {
      const payload: IPlan = formikRef.current?.values;
      await savePlan(payload);
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
        Manage Plan
      </Typography>

      <Card>
        <CardOverflow variant="soft" sx={{ py: 2 }}>
          <Typography level="title-md">
            {rowData?.id
              ? "Update an existing plan"
              : "Create a new plan"}
          </Typography>
        </CardOverflow>

        <CardContent>
          <Box gap={3} flexDirection="column" display="flex">
            <Form
              formikRef={formikRef}
              initialValues={rowData || PlanInitialValues}
              validationSchema={PlanValidationSchema}
              inputFields={PlanInputFields}
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

export default ManagePlan;
