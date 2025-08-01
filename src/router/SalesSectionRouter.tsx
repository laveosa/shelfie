import { RouteObject } from "react-router-dom";

export const SalesSectionRouter: RouteObject[] = [
  {
    path: "orders/",
    lazy: async () => {
      const { OrdersPage } = await import(
        "@/pages/sales-section/orders-page/OrdersPage.tsx"
      );
      return { element: <OrdersPage /> };
    },
  },
  {
    path: "open-carts/",
    lazy: async () => {
      const { OpenCartsPage } = await import(
        "@/pages/sales-section/open-carts-page/OpenCartsPage.tsx"
      );
      return { element: <OpenCartsPage /> };
    },
  },
];
