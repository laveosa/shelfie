import { createBrowserRouter, Navigate } from "react-router-dom";

import App from "@/App.tsx";
import ErrorPage from "@/pages/error-page/ErrorPage.tsx";
import { NavUrlEnum } from "@/const/enums/NavUrlEnum.ts";
import { MessengerSectionRouter } from "@/pages/messenger-section/MessengerSectionRouter.tsx";

const mainRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Navigate to={NavUrlEnum.DASHBOARD} relative="route" />,
      },
      {
        path: NavUrlEnum.DASHBOARD,
        lazy: async () => {
          const { DashboardPage } = await import(
            "@/pages/dashboard-page/DashboardPage.tsx"
          );
          return {
            element: <DashboardPage />,
          };
        },
      },
      {
        path: NavUrlEnum.MESSENGER,
        lazy: async () => {
          const { MessengerSection } = await import(
            "@/pages/messenger-section/MessengerSection.tsx"
          );
          return {
            element: <MessengerSection />,
          };
        },
        children: MessengerSectionRouter,
      },
    ],
  },
]);

export default mainRouter;
