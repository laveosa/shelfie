import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import "@/translation/i18n";

import "./index.css";
import mainRouter from "@/router/main-router.tsx";
import { store } from "@/state/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={mainRouter} />
    </Provider>
  </StrictMode>,
);
