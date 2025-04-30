import React, { useEffect, useState } from "react";

import cs from "./DashboardPage.module.scss";
import useDashboardPageService from "@/pages/dashboard-page/useDashboardPageService.ts";
import SheTextArea from "@/components/primitive/she-textarea/SheTextarea.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";
import SheToggle from "@/components/primitive/she-toggle/SheToggle.tsx";
import { SheToggleTypeEnum } from "@/const/enums/SheToggleTypeEnum.ts";
import { Users } from "lucide-react";
import { ContextPatternEnum } from "@/const/enums/ContextPatternEnum.ts";

import Logo from "@/assets/icons/TNF_logo.svg?react";
import Tmp from "@/assets/images/AuthLogo.png";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";
import { ComponentViewEnum } from "@/const/enums/ComponentViewEnum.ts";

const items: ISheSelectItem[] = [
  {
    className: "SELECT-OPTION-1",
    style: {
      color: "red",
    },
    text: "option 1",
    textTransKey: "fwef wefwefwef sd",
    description: "some small description for first option",
    descriptionTransKey: "sfwfjdijfosijdfe",
    value: 1,
    icon: Tmp,
    sideText: "QQ23",
    sideTextTransKey: "sdfeiwofjosdif",
    sideDescription: "+++",
    sideDescriptionTransKey: "sdfweoijsdifsdfwe",
    tooltip: { text: "some text for tooltip" },
    colors: ["#FE0032", "#224134", "#FFBF03", null, "23"],
  },
  {
    text: "option 2",
    value: 2,
  },
];

export function DashboardPage() {
  const service = useDashboardPageService();

  const [selectItems, setSelectItems] = useState<ISheSelectItem[]>(null);
  const [selected, setSelected] = useState<ISheSelectItem>(null);
  const [value, setValue] = useState<any>(null);

  useEffect(() => {
    setTimeout(() => {
      setSelectItems(items);
    }, 2000);

    setTimeout(() => {
      setSelected(items[1].value);
    }, 4000);

    /*setTimeout(() => {
      setValue("INPUT asyc text sdkskdjf eiwjo eiwjeoi oih");
    }, 2000);

    setTimeout(() => {
      setValue(23);
    }, 4000);*/
  }, []);

  return (
    <div id={cs["DashboardPage"]}>
      <h1>Dashboard</h1>

      <br />

      <SheInput
        id="INPUT_ID"
        className="EXTRA_input_class-name"
        label="Input"
        labelTransKey="0w9efjwjef09jwe"
        value={value}
        type="password"
        placeholder="EXTRA new placeholder..."
        placeholderTransKey="sfw30fjef0w9ejfi"
        icon={Users}
        showClearBtn
        autoFocus
        minLength={4}
        maxLength={15}
        required
        pattern={ContextPatternEnum.PASSWORD}
        patternErrorMessage="PATTERN error message"
        onChange={(eve) => console.log("onChange: ", eve)}
        onDelay={(eve) => console.log("onDelay: ", eve)}
        onBlur={(eve) => console.log("onBlur: ", eve)}
        onIsValid={(eve) => console.log("onIsValid: ", eve)}
      />

      <br />

      <SheTextArea
        label="Textarea"
        labelTransKey="sjfwweiefjowijfowijsd"
        value={value}
        placeholder="textarea some new placeholder..."
        placeholderTransKey="sfjieosdifjweijwjsodijo"
        icon={Logo}
        showClearBtn
        autoFocus
        minLength={4}
        maxLength={15}
        required
        rows={1}
        rowToExtend={4}
        maxWidth="200px"
        /*onChange={(eve) => console.log("onChange: ", eve)}
        onDelay={(eve) => console.log("onDelay: ", eve)}
        onBlur={(eve) => console.log("onBlur: ", eve)}
        onIsValid={(eve) => console.log("onIsValid: ", eve)}*/
      />

      <br />

      <SheSelect
        label="Select"
        labelTransKey="sdifowioeoidjfsd"
        items={selectItems}
        selected={selected}
        hideFirstOption
        required
        onSelect={(eve) => console.log("onSelect: ", eve)}
      />

      <br />

      <SheToggle
        label="Toggle"
        text="Checked"
        tooltip={{ text: "some sdkflskdfjslk" }}
        description="some description for Checkbox"
        required
        icon={Logo}
        view={ComponentViewEnum.CARD}
        type={SheToggleTypeEnum.SWITCH}
      />

      <br />

      <br />

      <br />

      <br />
    </div>
  );
}
