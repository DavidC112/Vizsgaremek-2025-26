import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import AuthContextProvider from "./context/AuthContextProvider";
import { NotificationProvider } from "./context/NotificationProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthContextProvider>
      <NotificationProvider>
        <App />
      </NotificationProvider>
    </AuthContextProvider>
  </StrictMode>,
);
