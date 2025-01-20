import { RouteObject } from "react-router-dom";

export const ProductsSectionRouter: RouteObject[] = [
  {
    index: true,
    lazy: async () => {
      const { ProductsPage } = await import(
        "@/pages/products-section/products-page/ProductsPage.tsx"
      );
      return {
        element: <ProductsPage />,
      };
    },
  },
  {
    path: "create-product",
    lazy: async () => {
      const { CreateProductPage } = await import(
        "@/pages/products-section/create-product-page/CreateProductPage.tsx"
      );
      return {
        element: <CreateProductPage />,
      };
    },
  },
];
