import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
    typography: {
        allVariants: {
            fontFamily: "Mukta"
        }
    },
    palette: {
        mode: "dark",
    }
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
        </ThemeProvider>
    </React.StrictMode>
);
