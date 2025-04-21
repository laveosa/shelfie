import React, { useState } from "react";

import cs from "./DashboardPage.module.scss";
import useDashboardPageService from "@/pages/dashboard-page/useDashboardPageService.ts";
import SheToggle from "@/components/primitive/she-checkbox/SheToggle.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";

import Home from "@/assets/icons/house-solid.svg?react";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import { Users } from "lucide-react";
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";
import { ComponentViewEnum } from "@/const/enums/ComponentViewEnum.ts";
import { SheToggleTypeEnum } from "@/const/enums/SheToggleTypeEnum.ts";

export function DashboardPage() {
  const service = useDashboardPageService();

  const [isChecked, setIsChecked] = useState<boolean>(null);

  function onAction(value: any) {
    console.log("onAction: ", value);
  }

  return (
    <div id={cs["DashboardPage"]}>
      <h1>Dashboard</h1>

      <br />

      <SheButton value="Change" onClick={() => setIsChecked(!isChecked)} />

      <br />

      <SheToggle
        label="Label"
        text="txt context for she toggle"
        required
        icon={Home}
        onChecked={onAction}
      />

      <br />

      <SheToggle
        label="Label"
        text="txt context for she toggle"
        description="some text for description"
        required
        onChecked={onAction}
      />

      <br />

      <SheToggle
        label="Label"
        text="TTxt context for she toggle text context for she toggle text context for she toggle text context for she toggle text context for she toggle text context for she toggle text context for she toggle text context for she toggle text context for she toggle text context for she toggle "
        description="some description for she-toggle component some description for she-toggle component some description for she-toggle component some description for she-toggle component"
        checked={isChecked}
        required
        view={ComponentViewEnum.CARD}
        type={SheToggleTypeEnum.SWITCH}
        onChecked={onAction}
      />

      <br />

      <SheInput label="Input" required icon={Users} />

      <br />

      <SheSelect label="Label" required icon={Home} />

      <br />
    </div>
  );
}
