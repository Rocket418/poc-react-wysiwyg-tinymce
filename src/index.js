import React from "react";
import ReactDOM from "react-dom/client";
import { theme as proTheme } from "@chakra-ui/pro-theme";
import { ChakraBaseProvider, extendTheme, theme as baseTheme } from "@chakra-ui/react";
import App from "./App";
import "./index.css";

export const theme = extendTheme(
    {
        colors: { ...baseTheme.colors, brand: baseTheme.colors.purple },
    },
    proTheme
);

/**
 * PALETA DE COLORES DE OSCAR. Que código de color ees el pr✅imario?
 */

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <ChakraBaseProvider theme={theme}>
            <App />
        </ChakraBaseProvider>
    </React.StrictMode>
);
