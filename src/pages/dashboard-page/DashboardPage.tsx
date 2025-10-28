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
      <h1>Dashboard Page</h1>
      <div>
        <h2>this is copy of original Sheltie project</h2>
        <h2>Igor test</h2>
        <h2>Igor test2</h2>
      </div>
    </div>
  );
}
