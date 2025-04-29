import { RouteObject } from "react-router-dom";
import { ManageVariantsPage } from "@/pages/products-section/manage-variants-page/ManageVariantsPage.tsx";
import { SizeChartPage } from "@/pages/products-section/size-chart-page/SizeChartPage.tsx";

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
    path: "product-basic-data/:productId?",
    lazy: async () => {
      const { ProductBasicDataPage } = await import(
        "@/pages/products-section/product-basic-data-page/ProductBasicDataPage.tsx"
      );
      return {
        element: <ProductBasicDataPage />,
      };
    },
  },
  {
    path: "product-gallery/:productId?",
    lazy: async () => {
      const { ProductGalleryPage } = await import(
        "@/pages/products-section/product-gallery-page/ProductGalleryPage.tsx"
      );
      return {
        element: <ProductGalleryPage />,
      };
    },
  },
  {
    path: "manage-variants/:productId?",
    lazy: async () => {
      const { ManageVariantsPage } = await import(
        "@/pages/products-section/manage-variants-page/ManageVariantsPage.tsx"
      );
      return {
        element: <ManageVariantsPage />,
      };
    },
  },
  {
    path: "attributes/:productId?",
    lazy: async () => {
      const { AttributePage } = await import(
        "@/pages/products-section/attributes-page/AttributePage.tsx"
      );
      return {
        element: <AttributePage />,
      };
    },
  },
  {
    path: "size-chart/:productId?",
    lazy: async () => {
      const { SizeChartPage } = await import(
        "@/pages/products-section/size-chart-page/SizeChartPage.tsx"
      );
      return {
        element: <SizeChartPage />,
      };
    },
  },
  {
    path: "purchase/:productId?",
    lazy: async () => {
      const { PurchasePage } = await import(
        "@/pages/products-section/purchase-page/PurchasePage.tsx"
      );
      return {
        element: <PurchasePage />,
      };
    },
  },
];
