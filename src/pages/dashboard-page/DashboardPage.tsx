import React from "react";

import cs from "./DashboardPage.module.scss";
import useDashboardPageService from "@/pages/dashboard-page/useDashboardPageService.ts";
import SheTextArea from "@/components/primitive/she-textarea/SheTextarea.tsx";

export function DashboardPage() {
  const service = useDashboardPageService();

  return (
    <div id={cs["DashboardPage"]}>
      <h1>Dashboard</h1>

      <SheTextArea label="Textarea" />
    </div>
  );
}
