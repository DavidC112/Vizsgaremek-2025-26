import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import AuthContextProvider from "./context/AuthContextProvider";
import { NotificationProvider } from "./context/NotificationProvider";
import { StyledEngineProvider } from "@mui/material/styles";
import GlobalStyles from "@mui/material/GlobalStyles";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthContextProvider>
      <NotificationProvider>
        <StyledEngineProvider enableCssLayer>
          <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
          <App />
        </StyledEngineProvider>
      </NotificationProvider>
    </AuthContextProvider>
  </StrictMode>,
);
