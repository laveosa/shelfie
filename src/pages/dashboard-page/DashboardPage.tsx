import React, { useEffect, useState } from "react";

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
    description: "sdcwecsd",
    sideText: "Q22",
    sideDescription: "sssl ",
    value: 1,
    icon: Logo,
    colors: ["red", "green", "blue", "violet"],
    tooltip: {
      text: "Some text for tooltip",
    },
  },
  {
    text: "option 2",
    // description: "22222222222",
    value: "2",
    colors: ["#234536"],
  },
  {
    text: "option 3",
    description: "3333333333",
    value: {
      name: "Dou Jon",
      age: 23,
      position: "worker",
    },
    icon: Tmp,
  },
  {
    text: "option 4",
    sideText: "Q22",
    sideDescription: "sssl ",
    value: [2, 3, 4, 2, 545],
    icon: Users,
  },
];

export function DashboardPage() {
  const service = useDashboardPageService();

  const [value, setValue] = useState<string | number | readonly string[]>(null);

  const [loading, setLoading] = useState<boolean>(null);

  const [selectItems, setSelectItems] = useState<ISheSelectItem[]>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  useEffect(() => {
    setTimeout(() => {
      setSelectItems(items);
    }, 2000);

    setTimeout(() => {
      setSelectedItem(items[2].value);
    }, 3000);
  }, []);

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
        tooltip={{ text: "Select component tooltip text for test only!!!" }}
        icon={Logo}
        items={selectItems}
        selected={selectedItem}
        hideFirstOption
        showClearBtn
        required
        isLoading={loading}
        isOpen
        onSelect={(value) => console.log("Selected: ", value)}
        // onOpenChange={(value) => console.log("On Open: ", value)}
      />

      <br />

      <SheInput label="Input" icon={Logo} showClearBtn isLoading={loading} />

      <br />

      <SheTextArea label="Input" icon={Logo} showClearBtn isLoading={loading} />

      <br />
    </div>
  );
}
