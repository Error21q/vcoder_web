import React from "react";
import { CssVarsProvider, extendTheme } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import GlobalStyles from "@mui/joy/GlobalStyles";
import { globalStyles } from "./globalStyles";
import { SnackbarUtilsConfigurator } from "./components";
import Navigation from "./Navigation";
import { KeyboardArrowDown } from "@mui/icons-material";
import { selectClasses } from "@mui/joy";

const App: React.FC = () => {
  const joyUiTheme = extendTheme({
    fontFamily: {
      display: "Plus Jakarta Sans",
      body: "Plus Jakarta Sans",
    },
    colorSchemes: {
      dark: {
        palette: {
          background: {
            // body: "#010314",
          },
        },
      },
    },
    components: {
      JoySelect: {
        defaultProps: {
          indicator: <KeyboardArrowDown />,
        },
        styleOverrides: {
          root: () => ({
            [`& .${selectClasses.indicator}`]: {
              transition: "0.2s",
              [`&.${selectClasses.expanded}`]: {
                transform: "rotate(-180deg)",
              },
            },
          }),
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
