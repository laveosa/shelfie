import React, { useState } from "react";

import cs from "./DashboardPage.module.scss";
import useDashboardPageService from "@/pages/dashboard-page/useDashboardPageService.ts";
import SheTextArea from "@/components/primitive/she-textarea/SheTextarea.tsx";

import Logo from "@/assets/icons/TNF_logo.svg?react";
import { Users, X } from "lucide-react";
import Tmp from "@/assets/images/AuthLogo.png";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";

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

      <SheTextArea
        id="ID_TEXTAREA"
        className="SOME_CLASS"
        label="Label"
        labelTransKey="sdjfoiwejo"
        tooltip={{
          title: "Tooltip TITLE",
          titleTransKey: "sdjfowfo23 iwef",
          text: "TOOLTIP text for test",
          textTransKey: "sji owejfsd",
        }}
        value={value}
        placeholder="new placeholder for textarea"
        placeholderTransKey="sfw09jwfeiwje"
        icon={Logo}
        autoFocus
        showClearBtn
        isLoading={loading}
        minLength={4}
        maxLength={20}
        required
        onChange={(value) => console.log("On Change: ", value)}
        onDelay={(value) => console.log("On Delay: ", value)}
        onBlur={(value) => console.log("On Blur: ", value)}
        onIsValid={(value) => console.log("On isValid: ", value)}
      />

      <br />

      {/*<SheTextArea
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
      />*/}

      <br />
    </div>
  );
}
