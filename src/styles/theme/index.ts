import { createTheme } from "@mui/material/styles";

// Create a theme instance.
const theme = createTheme({
  palette: {
    text: {
      primary: '#010101',
      secondary: '#999999',
      disabled: '#5B5B98',
      // hint: '#5B5B98',
    },
    
    primary: {
      main: "#E01E26",
    },
    secondary: {
      main: "#010101",
    },
    success: {
      main: "#16CF16",
    },
    info: {
      main: "#2DB6F5",
    },
    warning: {
      main: "#FFBC2B",
    },
    // danger: {
    //   main: "#EE368C",
    // },
    // dark: {
    //   main: "#260944",
    // },
  },

  typography: {
    fontSize: 12
  },
});

export default theme;
