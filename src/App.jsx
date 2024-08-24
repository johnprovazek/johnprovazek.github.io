import HomePage from "./pages/home/home.jsx";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme, responsiveFontSizes } from "@mui/material/styles";

let portfolio = createTheme({
  palette: {
    background: {
      default: "#AED1EF",
    },
    offwhite: {
      main: "#F1EEE6",
    },
  },
  components: {
    MuiCircularProgress: {
      colorPrimary: "red",
      styleOverrides: {
        color: "transparent",
      },
      defaultProps: {
        color: "common",
      },
    },
    MuiCardActionArea: {
      styleOverrides: {
        focusHighlight: {
          color: "transparent",
        },
      },
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#FAF9F6",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          "&:last-child": {
            paddingBottom: 16,
          },
        },
      },
    },
  },
  typography: {
    fontFamily: ["Geologica Variable", "Roboto", "Helvetica", "Arial", "sans-serif"].join(","),
    fontSize: 18,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      pf: 750,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});
portfolio = responsiveFontSizes(portfolio);

const App = () => {
  return (
    <ThemeProvider theme={portfolio}>
      <CssBaseline />
      <HomePage />
    </ThemeProvider>
  );
};

export default App;
