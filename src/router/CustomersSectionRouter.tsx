import { RouteObject } from "react-router-dom";
import { JSX } from "react";

import { CustomerBasicDataPage } from "@/pages/customers-section/customer-basic-data/CustomerBasicDataPage.tsx";
import { CustomerAddressesPage } from "@/pages/customers-section/customer-addresses/CustomerAddressesPage.tsx";
import { CustomerOpenCartPage } from "@/pages/customers-section/customer-open-cart/CustomerOpenCartPage.tsx";

export const CustomersSectionRouter: RouteObject[] = [
  {
    index: true,
    lazy: async (): Promise<{ element: JSX.Element }> => {
      const { CustomersPage } = await import(
        "@/pages/customers-section/customers-page/CustomersPage.tsx"
      );
      return {
        element: <CustomersPage />,
      };
    },
  },
  {
    path: "customer-basic-data",
    lazy: async (): Promise<{ element: JSX.Element }> => {
      const { CustomerBasicDataPage } = await import(
        "@/pages/customers-section/customer-basic-data/CustomerBasicDataPage.tsx"
      );
      return {
        element: <CustomerBasicDataPage />,
      };
    },
  },
  {
    path: "customer-basic-data/:customerId?",
    lazy: async (): Promise<{ element: JSX.Element }> => {
      const { CustomerBasicDataPage } = await import(
        "@/pages/customers-section/customer-basic-data/CustomerBasicDataPage.tsx"
      );
      return {
        element: <CustomerBasicDataPage />,
      };
    },
  },
  {
    path: "customer-addresses/:customerId?",
    lazy: async (): Promise<{ element: JSX.Element }> => {
      const { CustomerAddressesPage } = await import(
        "@/pages/customers-section/customer-addresses/CustomerAddressesPage.tsx"
      );
      return {
        element: <CustomerAddressesPage />,
      };
    },
  },
  {
    path: "customer-open-cart/:customerId?",
    lazy: async (): Promise<{ element: JSX.Element }> => {
      const { CustomerOpenCartPage } = await import(
        "@/pages/customers-section/customer-open-cart/CustomerOpenCartPage.tsx"
      );
      return {
        element: <CustomerOpenCartPage />,
      };
    },
  },
  {
    path: "customer-orders/:customerId?",
    lazy: async (): Promise<{ element: JSX.Element }> => {
      const { CustomerOrdersPage } = await import(
        "@/pages/customers-section/customer-orders/CustomerOrdersPage.tsx"
      );
      return {
        element: <CustomerOrdersPage />,
      };
    },
  },
];
