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
      const { AttributesPage } = await import(
        "@/pages/products-section/attributes-page/AttributesPage.tsx"
      );
      return {
        element: <AttributesPage />,
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
    path: "supplier/:purchaseId?",
    lazy: async () => {
      const { SupplierPage } = await import(
        "@/pages/products-section/supplier-page/SupplierPage.tsx"
      );
      return {
        element: <SupplierPage />,
      };
    },
  },
  {
    path: "purchase-products/:purchaseId?",
    lazy: async () => {
      const { PurchaseProductsPage } = await import(
        "@/pages/products-section/purchase-products-page/PurchaseProductsPage.tsx"
      );
      return {
        element: <PurchaseProductsPage />,
      };
    },
  },
  {
    path: "margins/:purchaseId?",
    lazy: async () => {
      const { MarginsPage } = await import(
        "@/pages/products-section/margins-page/MarginsPage.tsx"
      );
      return {
        element: <MarginsPage />,
      };
    },
  },
  {
    path: "invoices/:purchaseId?",
    lazy: async () => {
      const { InvoicesPage } = await import(
        "@/pages/products-section/invoices-page/InvoicesPage.tsx"
      );
      return {
        element: <InvoicesPage />,
      };
    },
  },
];
