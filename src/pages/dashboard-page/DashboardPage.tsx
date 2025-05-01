import React from "react";

import Logo from "@/assets/icons/TNF_logo.svg?react";
import Tmp from "@/assets/images/AuthLogo.png";
import { Users } from "lucide-react";

import cs from "./DashboardPage.module.scss";
import useDashboardPageService from "@/pages/dashboard-page/useDashboardPageService.ts";
import SheDatePicker from "@/components/primitive/she-date-picker/SheDatePicker.tsx";
import SheTextArea from "@/components/primitive/she-textarea/SheTextarea.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";

export function DashboardPage() {
  const service = useDashboardPageService();

  return (
    <div id={cs["DashboardPage"]}>
      <h1>Dashboard</h1>

      <br />

      <SheTextArea
        label="Textarea"
        tooltip="Some message for tooltip"
        tooltipTransKey="weifwoifosdijo"
      />

      <br />

      <SheTextArea
        label="Textarea"
        tooltip={{
          text: "TEXT message for tooltip",
        }}
      />

      <br />

      <SheInput label="Input" tooltip="INPUT tooltop message" />

      <br />

      <SheSelect label="Select" />

      <br />

      <SheDatePicker />

      <br />
    </div>
  );
}
