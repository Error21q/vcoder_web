import React from "react";
import { CssVarsProvider, extendTheme } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import GlobalStyles from "@mui/joy/GlobalStyles";
import { globalStyles } from "./globalStyles";
import { SnackbarUtilsConfigurator } from "./components";
import Navigation from "./Navigation";

const App: React.FC = () => {
  const joyUiTheme = extendTheme({
    colorSchemes: {
      dark: {
        palette: {
          background: {
            // body: "#010314",
          },
        },
      },
    },
  });

  return (
    <CssVarsProvider theme={joyUiTheme}>
      <CssBaseline />
      <SnackbarUtilsConfigurator />
      <GlobalStyles styles={globalStyles} />
      <Navigation />
    </CssVarsProvider>
  );
};

export default App;
