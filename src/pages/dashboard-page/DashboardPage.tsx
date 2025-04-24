import React from "react";

import cs from "./DashboardPage.module.scss";
import useDashboardPageService from "@/pages/dashboard-page/useDashboardPageService.ts";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { Users } from "lucide-react";
import SheTextArea from "@/components/primitive/she-textarea/SheTextarea.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";

export function DashboardPage() {
  const service = useDashboardPageService();

  return (
    <div id={cs["DashboardPage"]}>
      <h1>Dashboard</h1>

      <br />

      <SheTextArea
        label="Label"
        labelTransKey="sdfiwef920329j0"
        tooltip={{
          text: "Some text for tooltip",
        }}
        required
        showClearBtn
        minLength={4}
        maxLength={10}
      />

      <br />

      <br />
    </div>
  );
}
