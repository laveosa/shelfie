import React, { useEffect, useState } from "react";

import cs from "./DashboardPage.module.scss";
import useDashboardPageService from "@/pages/dashboard-page/useDashboardPageService.ts";
import Logo from "@/assets/images/AuthLogo.png";
import SheTextArea from "@/components/primitive/she-textarea/SheTextarea.tsx";
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import { IconViewEnum } from "@/const/enums/IconViewEnum.ts";

export function DashboardPage() {
  const service = useDashboardPageService();

  const [text, setText] = useState<string>(null);

  useEffect(() => {
    setTimeout(() => {
      // setText("some value for text area");
    }, 4000);
  }, []);

  return (
    <div id={cs["DashboardPage"]}>
      <h1>Dashboard</h1>

      <br />

      <SheTextArea />

      <br />

      <SheTextArea
        label="Textarea 1"
        value={text}
        icon={{
          icon: Logo,
          iconView: IconViewEnum.SMOOTH,
        }}
        showClearBtn
        onChange={(event) => console.log("onChange: ", event)}
        onDelay={(event) => console.log("onDelay: ", event)}
        onBlur={(event) => console.log("onBlur: ", event)}
      />

      <br />

      <br />

      <br />

      <br />

      <SheInput label="Input" />

      <br />

      <SheSelect label="Select" />

      <br />
    </div>
  );
}
