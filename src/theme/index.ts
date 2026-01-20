import {
  createTheme as createMuiTheme,
  PaletteMode,
  responsiveFontSizes,
} from "@mui/material";

export function createTheme(mode: PaletteMode) {
  return responsiveFontSizes(
    createMuiTheme({
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              textTransform: "none", // Prevents all-caps buttons
              fontWeight: 700,
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              backgroundImage: "none", // Removes default MUI dark mode gradient
            },
          },
        },
      },
      cssVariables: {
        colorSchemeSelector: "data",
      },
      palette: {
        mode,
        primary: {
          main: "#664ce9", // Your primary brand color
        },
        secondary: {
          main: "#fec99b",
        },
        success: {
          main: "#00b894",
        },
        error: {
          main: "#d63031",
        },
        background: {
          default: mode === "light" ? "#f5f6fa" : "#121212",
          paper: mode === "light" ? "#ffffff" : "#1e1e1e",
        },
      },
      shape: {
        borderRadius: 16, // Rounded corners as per your design
      },
      typography: {
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        h1: { fontWeight: 900 },
        h6: { fontWeight: 700 },
      },
    }),
  );
}
