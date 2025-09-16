import { Navigate, RouteObject } from "react-router-dom";
import { ReturnsPage } from "@/pages/sales-section/returns-page/ReturnsPage.tsx";
import { ShipmentsPage } from "@/pages/sales-section/shipments-page/ShipmentsPage.tsx";
import { PaymentsPage } from "@/pages/sales-section/payments-page/PaymentsPage.tsx";

export const SalesSectionRouter: RouteObject[] = [
  {
    index: true,
    element: <Navigate to="orders" replace />,
  },
  {
    path: "orders",
    lazy: async () => {
      const { OrdersPage } = await import(
        "@/pages/sales-section/orders-page/OrdersPage.tsx"
        );
      return { element: <OrdersPage /> };
    },
  },
  {
    path: "order-details/:orderId?",
    lazy: async () => {
      const { OrderDetailsPage } = await import(
        "@/pages/sales-section/order-details-page/OrderDetailsPage.tsx"
      );
      return {
        element: <OrderDetailsPage />,
      };
    },
  },
  {
    path: "order-products/:orderId?",
    lazy: async () => {
      const { OrderProductsPage } = await import(
        "@/pages/sales-section/order-products-page/OrderProductsPage.tsx"
      );
      return {
        element: <OrderProductsPage />,
      };
    },
  },
  {
    path: "order-shipment/:orderId?",
    lazy: async () => {
      const { OrderShipmentPage } = await import(
        "@/pages/sales-section/order-shipment-page/OrderShipmentPage.tsx"
      );
      return {
        element: <OrderShipmentPage />,
      };
    },
  },
  {
    path: "order-payment/:orderId?",
    lazy: async () => {
      const { OrderPaymentPage } = await import(
        "@/pages/sales-section/order-payment-page/OrderPaymentPage.tsx"
      );
      return {
        element: <OrderPaymentPage />,
      };
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
  {
    path: "returns/",
    lazy: async () => {
      const { ReturnsPage } = await import(
        "@/pages/sales-section/returns-page/ReturnsPage.tsx"
      );
      return { element: <ReturnsPage /> };
    },
  },
  {
    path: "shipments/",
    lazy: async () => {
      const { ShipmentsPage } = await import(
        "@/pages/sales-section/shipments-page/ShipmentsPage.tsx"
      );
      return { element: <ShipmentsPage /> };
    },
  },
  {
    path: "shipments/shipment-details/:shipmentId?",
    lazy: async () => {
      const { ShipmentDetailsPage } = await import(
        "@/pages/sales-section/shipment-details-page/ShipmentDetailsPage.tsx"
      );
      return { element: <ShipmentDetailsPage /> };
    },
  },
  {
    path: "payments/",
    lazy: async () => {
      const { PaymentsPage } = await import(
        "@/pages/sales-section/payments-page/PaymentsPage.tsx"
      );
      return { element: <PaymentsPage /> };
    },
  },
] as RouteObject[];
