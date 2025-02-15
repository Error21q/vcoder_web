import { login } from "../../api/auth";
import { Form } from "../../components";
import {
  Button,
  Card,
  Grid,
  Stack,
  Typography,
  useColorScheme,
} from "@mui/joy";
import {
  CheckCircleOutlined,
  ErrorOutline,
  LoginOutlined,
} from "@mui/icons-material";
import { showSnackbar } from "../../components/SnackbarUtils";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthInitialValues } from "../../common/form-values";
import { AuthValidationSchema } from "../../common/form-schema";
import { AuthInputFields } from "../../common/form-fields";
import { useRef, useState } from "react";
import { FormikProps } from "formik";
import { IAuth } from "../../interfaces/auth";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { mode } = useColorScheme();
  const formikRef = useRef<FormikProps<any>>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const access_token: string | null = localStorage.getItem("access_token");

  if (access_token) return <Navigate to="/admin" />;

  const handleLogin = async () => {
    if (formikRef.current) await formikRef.current.submitForm();
    if (!formikRef.current?.isValid) return;
    setLoading(true);

    try {
      const payload: IAuth = formikRef.current?.values;
      const response: any = await login(payload);
      if (response?.statusCode === 200) {
        showSnackbar({
          message: "Logged in successfully.",
          variant: "soft",
          color: "success",
          size: "lg",
          autoHideDuration: 3000,
          open: true,
          startDecorator: <CheckCircleOutlined />,
        });
        localStorage.setItem("access_token", response.data.access_token);
        navigate("/admin");
      } else {
        showSnackbar({
          message: "Invalid login details, please try again.",
          variant: "soft",
          color: "danger",
          size: "lg",
          autoHideDuration: 3000,
          open: true,
          startDecorator: <ErrorOutline />,
        });
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <Grid
      container
      bgcolor={mode == "light" ? "#fff1f3" : ""}
      sx={{ flexGrow: 1 }}
      justifyContent="center"
      alignItems="center"
      height="100vh"
      p={2}
    >
      <Grid md={4} xs={12}>
        <Stack mb={2} justifyContent={"center"} alignItems={"center"}>
          <img src="/logo.svg" alt="logo" loading="lazy" width={200} />
        </Stack>

        <Card size="lg" sx={{ background: "transparent", boxShadow: "sm" }}>
          <Stack py={2}>
            <Typography level="h2">Sign in</Typography>
          </Stack>

          <Form
            formikRef={formikRef}
            initialValues={AuthInitialValues}
            validationSchema={AuthValidationSchema}
            inputFields={AuthInputFields}
            onSubmit={(_) => _}
          />

          <Button
            fullWidth
            loading={loading}
            loadingPosition="end"
            type="submit"
            endDecorator={<LoginOutlined />}
            onClick={() => {
              handleLogin();
            }}
          >
            Sign in
          </Button>
        </Card>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
