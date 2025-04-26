import React, { useState } from "react";

import cs from "./DashboardPage.module.scss";
import useDashboardPageService from "@/pages/dashboard-page/useDashboardPageService.ts";
import SheTextArea from "@/components/primitive/she-textarea/SheTextarea.tsx";

import Logo from "@/assets/icons/TNF_logo.svg?react";
import { Users, X } from "lucide-react";
import Tmp from "@/assets/images/AuthLogo.png";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import { ContextPatternEnum } from "@/const/enums/ContextPatternEnum.ts";

export function DashboardPage() {
  const service = useDashboardPageService();

  const [value, setValue] = useState<string | number | readonly string[]>(null);

  const [loading, setLoading] = useState<boolean>(null);

  return (
    <div id={cs["DashboardPage"]}>
      <h1>Dashboard</h1>

      <br />
      <div className="flex items-end gap-6">
        <SheInput
          label="Input"
          showClearBtn
          onDelay={(value) => setValue(value)}
        />
        <SheButton value="Loading" onClick={() => setLoading(!loading)} />
      </div>
      <br />

      <SheButton
        id="ID_BTN"
        className="BUTTON_MAIN_CLASS"
        value="Button 1"
        valueTransKey="sdfwijfijw"
        isLoading={loading}
        icon={Logo}
        type="submit"
        txtColor="#2DAA58"
        bgColor="#1E9CEF"
        onClick={(e) => console.log(e)}
      />

      <br />
    </div>
  );
}
