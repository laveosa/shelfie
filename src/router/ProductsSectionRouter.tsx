import { RouteObject } from "react-router-dom";
import { JSX } from "react";

export const ProductsSectionRouter: RouteObject[] = [
  {
    index: true,
    lazy: async (): Promise<{ element: JSX.Element }> => {
      const { ProductsPage } = await import(
        "@/pages/products-section/products-page/ProductsPage.tsx"
      );
      return {
        element: <ProductsPage />,
      };
    },
  },
];
