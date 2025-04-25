import React from "react";

import cs from "./DashboardPage.module.scss";
import useDashboardPageService from "@/pages/dashboard-page/useDashboardPageService.ts";
import SheTextArea from "@/components/primitive/she-textarea/SheTextarea.tsx";

import Logo from "@/assets/icons/TNF_logo.svg?react";
import { Users, X } from "lucide-react";
import Tmp from "@/assets/images/AuthLogo.png";

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
        icon={{
          icon: X,
          color: "red",
        }}
        autoFocus={true}
      />

      <br />

      <br />
    </div>
  );
}
