import React from "react";

import cs from "./DashboardPage.module.scss";
import useDashboardPageService from "@/pages/dashboard-page/useDashboardPageService.ts";

export function DashboardPage() {
  const service = useDashboardPageService();

  // ================================================================== STATE

  // ================================================================== EVENT HANDLERS

  // ================================================================== LOGIC

  // ================================================================== LAYOUT
  return (
    <div id={cs["DashboardPage"]}>
      <h1>Dashboard</h1>
    </div>
  );
}
