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
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelect.ts";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";

const items: ISheSelectItem[] = [
  {
    text: "option 1",
    value: 1,
  },
  {
    text: "option 2",
    value: "2",
  },
  {
    text: "option 3",
    value: {
      name: "Dou Jon",
      age: 23,
      position: "worker",
    },
  },
  {
    text: "option 4",
    value: [2, 3, 4, 2, 545],
  },
];

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

      <SheSelect
        id="SELECT_ID"
        className="SELECT_CLASSNAME"
        label="Select"
        labelTransKey="wefoiwjoefi"
        items={items}
        selected={2}
        icon={Logo}
        showClearBtn
        isLoading={loading}
        onSelect={(value) => console.log("Selected: ", value)}
        onOpenChange={(value) => console.log("On Open: ", value)}
      />

      <br />

      <SheInput label="Input" icon={Logo} showClearBtn isLoading={loading} />

      <br />

      <SheTextArea label="Input" icon={Logo} showClearBtn isLoading={loading} />

      <br />
    </div>
  );
}
