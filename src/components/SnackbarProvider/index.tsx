import React, { createContext, useContext, useState, ReactNode } from "react";
import { Snackbar, SnackbarProps } from "@mui/joy";

type SnackbarContextType = {
  showSnackbar: (props: SnackbarProps & { message: string }) => void;
};

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [snackbarProps, setSnackbarProps] = useState<
    SnackbarProps & { message: string }
  >({
    open: false,
    message: "",
  });

  const showSnackbar = (props: SnackbarProps & { message: string }) => {
    setSnackbarProps({ ...props, open: true });
  };

  const handleClose: SnackbarProps["onClose"] = (
    _event: React.SyntheticEvent | Event | null,
    reason?: string
  ) => {
    if (reason !== "clickaway") {
      setSnackbarProps((prev) => ({ ...prev, open: false }));
    }
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        autoHideDuration={3000}
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
        variant="soft"
        {...snackbarProps}
        onClose={snackbarProps.onClose || handleClose}
      >
        {snackbarProps?.message}
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = (): SnackbarContextType => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};
