import { SnackbarProps } from "@mui/joy";
import { useSnackbar } from "../SnackbarProvider";

let snackbarFunction: (props: SnackbarProps & { message: string }) => void;

export const SnackbarUtilsConfigurator = () => {
  const { showSnackbar } = useSnackbar();
  snackbarFunction = showSnackbar;
  return null;
};

export const showSnackbar = (props: SnackbarProps & { message: string }) => {
  if (snackbarFunction) {
    snackbarFunction(props);
  } else {
    console.error(
      "SnackbarUtils not initialized. Make sure SnackbarUtilsConfigurator is mounted.",
    );
  }
};
