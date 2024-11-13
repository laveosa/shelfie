import { RouteObject } from "react-router-dom";

export const OrdersSectionRouter: RouteObject[] = [
  {
    index: true,
    lazy: async () => {
      const { OrdersPage } = await import(
        "@/pages/orders-section/orders-page/OrdersPage.tsx"
      );
      return {
        element: <OrdersPage />,
      };
    },
  },
];
