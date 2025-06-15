import React from "react";

import cs from "./DashboardPage.module.scss";
import useDashboardPageService from "@/pages/dashboard-page/useDashboardPageService.ts";
import SheAutocomplete from "@/components/primitive/she-autocomplete/SheAutocomplete.tsx";

export function DashboardPage() {
  const service = useDashboardPageService();

  // ================================================================== EVENT

  // ================================================================== LAYOUT

  return (
    <div id={cs["DashboardPage"]}>
      <h1>Dashboard</h1>

      <br />

      <br />

      {/*<br/>

      <SheAutocomplete/>

      <br/>*/}
    </div>
  );
}
