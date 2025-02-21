import axios from "axios";
import { getAccessToken } from "../common/auth-utils";
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
    const errorMessage = error?.response?.data?.error?.message;

    // handle errors between status code 400 to 600.
    if (status >= 400 && status < 600) {
      // handle 401 error (e.g., token expiration, etc.)
      if (status === 401 && !errorMessage) {
        localStorage.removeItem("access_token");
        showSnackbar({
          message: "Session expired. Please log in again.",
          color: "danger",
          size: "lg",
          open: true,
          startDecorator: <ErrorOutline />,
        });
      }
      //Show a toast for error responses like 400, 500, etc.
      else {
        showSnackbar({
          message: errorMessage || "Something went wrong",
          color: "danger",
          size: "lg",
          open: true,
          startDecorator: <ErrorOutline />,
        });
      }
    }

    return Promise.reject(error);
  }
);

export default Request;
