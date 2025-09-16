import React, { useEffect, useState } from "react";

import cs from "./DashboardPage.module.scss";
import useDashboardPageService from "@/pages/dashboard-page/useDashboardPageService.ts";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";
import ProductsApiHooks from "@/utils/services/api/ProductsApiService.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";

export function DashboardPage() {
  const { translate } = useAppTranslation();
  const service = useDashboardPageService();

  const [getTheProductsForGrid] =
    ProductsApiHooks.useGetTheProductsForGridMutation();

  const [gridModel, setGridModel] = useState<GridRequestModel>({});

  useEffect(() => {
    getTheProductsForGrid(gridModel).then(() => {});
  }, []);

  // ================================================================== STATE

  // ================================================================== EVENT HANDLERS

  function updateGridRequestModel(model: GridRequestModel) {
    setGridModel(model);
  }

  // ================================================================== LOGIC

  // ================================================================== LAYOUT
  return (
    <div id={cs["DashboardPage"]}>
      <h1>{translate("PageTitles.Dashboard")}</h1>
      <br />
      <br />
    </div>
  );
}
