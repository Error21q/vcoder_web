import axios from "axios";
import { getAccessToken } from "../common/api-utils";
import { showSnackbar } from "../components/SnackbarUtils";
import { ErrorOutline } from "@mui/icons-material";

const Request = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
});

Request.interceptors.request.use(
  (config: any) => {
    const token = getAccessToken();
    return {
      ...config,
      headers: {
        ...(token !== null && { Authorization: `Bearer ${token}` }),
        ...config.headers,
      },
    };
  },
  (error) => {
    return Promise.reject(error);
  }
);

Request.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = error.response?.status;
    const errorMessage =
      error?.response?.data?.error?.message || "Something went wrong";

    if (status === 401) {
      // handle 401 error (e.g., token expiration, etc.)
      // For example, you can redirect the user to login page or show a specific message
    }

    // Show a toast for error responses like 400, 500, etc.
    if (status >= 400 && status < 600) {
      showSnackbar({
        message: errorMessage,
        color: "danger",
        size: "lg",
        open: true,
        startDecorator: <ErrorOutline />,
      });
    }

    return Promise.reject(error);
  }
);

export default Request;
