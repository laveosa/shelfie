import React from "react";

import cs from "./DashboardPage.module.scss";
import useDashboardPageService from "@/pages/dashboard-page/useDashboardPageService.ts";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";

export function DashboardPage() {
  const { translate } = useAppTranslation();
  const service = useDashboardPageService();

  // ================================================================== STATE

  // ================================================================== EVENT HANDLERS

  // ================================================================== LOGIC

  // ================================================================== LAYOUT
  return (
    <div id={cs["DashboardPage"]}>
      <h1>{translate("PageTitles.Dashboard")}</h1>
    </div>
  );
}
