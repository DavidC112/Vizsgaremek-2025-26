import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: { primary: { main: "#6b9080" } },
  components: {
    MuiInput: {
      styleOverrides: {
        root: {
          "&:hover:not(.Mui-disabled):before": { borderBottomColor: "#6b9080" },
          "&:before": { borderBottomColor: "#d1d5db" },
          "&:after": { borderBottomColor: "#6b9080" },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#6b7280",
          "&.Mui-focused": { color: "#6b9080" },
        },
      },
    },
  },
});
