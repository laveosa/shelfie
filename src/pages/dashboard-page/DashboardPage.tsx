import React, { useEffect } from "react";

import cs from "./DashboardPage.module.scss";
import useDashboardPageService from "@/pages/dashboard-page/useDashboardPageService.ts";
import ProductsApiHooks from "@/utils/services/api/ProductsApiService.ts";

export function DashboardPage() {
  const service = useDashboardPageService();

  const [getAllProducts] = ProductsApiHooks.useLazyGetAllProductsQuery();
  const [getProductDetail] = ProductsApiHooks.useLazyGetProductDetailQuery();
  const [updateProduct] = ProductsApiHooks.useUpdateProductMutation();

  useEffect(() => {
    getAllProducts().then((res) => console.log("ALL PRODUCTS: ", res));

    getProductDetail().then((res) => console.log("PRODUCT DETAIL: ", res));

    setTimeout(() => {
      updateProduct().then((res) => console.log("RES: ", res));
    }, 3000);
  }, []);

  // ================================================================== STATE

  // ================================================================== EVENT HANDLERS

  // ================================================================== LOGIC

  // ================================================================== LAYOUT
  return (
    <div id={cs["DashboardPage"]}>
      <h1>Dashboard Page</h1>
    </div>
  );
}
