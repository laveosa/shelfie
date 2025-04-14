import { RouteObject } from "react-router-dom";
import { JSX } from "react";

export const OrdersSectionRouter: RouteObject[] = [
  {
    index: true,
    lazy: async (): Promise<{ element: JSX.Element }> => {
      const { OrdersPage } = await import(
        "@/pages/orders-section/orders-page/OrdersPage.tsx"
      );
      return {
        element: <OrdersPage />,
      };
    },
  },
];
