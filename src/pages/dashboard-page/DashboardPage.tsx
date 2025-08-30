import React from "react";
import { useTranslation } from "react-i18next";

import cs from "./DashboardPage.module.scss";
import useDashboardPageService from "@/pages/dashboard-page/useDashboardPageService.ts";

export function DashboardPage() {
  const { t } = useTranslation();
  const service = useDashboardPageService();

  // ================================================================== LAYOUT
  return (
    <div id={cs["DashboardPage"]}>
      <h1>{t("PageTitles.Dashboard")}</h1>
    </div>
  );
}
