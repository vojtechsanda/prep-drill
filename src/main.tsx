import "./globals.css";

import React from "react";
import ReactDOM from "react-dom/client";

import { LanguageProvider } from "./lang/language-provider";
import { RouterProvider } from "./routes/router-provider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LanguageProvider>
      <RouterProvider />
    </LanguageProvider>
  </React.StrictMode>,
);
