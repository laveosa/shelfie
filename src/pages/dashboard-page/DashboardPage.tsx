import React, { useState } from "react";
import { User, Users } from "lucide-react";

import cs from "./DashboardPage.module.scss";
import useDashboardPageService from "@/pages/dashboard-page/useDashboardPageService.ts";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import { ComponentViewEnum } from "@/const/enums/ComponentViewEnum.ts";
import SheCalendar from "@/components/primitive/she-calendar/SheCalendar.tsx";

export function DashboardPage() {
  const service = useDashboardPageService();

  const [date, setDate] = useState<Date>(new Date());

  const [icon, setIcon] = useState<any>(Users);
  const [isLoading, setIsLoading] = useState<boolean>(null);
  const [showClearBtn, setShowClearBtn] = useState<boolean>(null);
  const [fullWidth, setFullWidth] = useState<boolean>(null);
  const [minWidth, setMinWidth] = useState<string>(null);
  const [maxWidth, setMaxWidth] = useState<string>(null);

  function onAction(date) {
    console.log("Date: ", date);
    setDate(date);
  }

  return (
    <div id={cs["DashboardPage"]}>
      <h1>Dashboard</h1>

      <br />

      <SheCalendar
        label="Calendar"
        labelTransKey="sdoiwfejfowidj"
        required
        date={date}
        // showClearBtn
        // view={ComponentViewEnum.CARD}
        // minWidth="320px"
        onSelectDate={onAction}
      />

      {/*<div className="flex gap-2 items-end border-b-2 border-solid pb-6">
        <SheInput
          label="Min width"
          type="number"
          showClearBtn
          onDelay={(value) => setMinWidth(value ? `${value}px` : null)}
        />
        <SheInput
          label="Max width"
          type="number"
          showClearBtn
          onDelay={(value) => setMaxWidth(value ? `${value}px` : null)}
        />
        <SheButton
          icon={Trash2}
          onClick={() => setShowClearBtn(!showClearBtn)}
        />
        <SheButton icon={Loader} onClick={() => setIsLoading(!isLoading)} />
        <SheButton icon={Box} onClick={() => setFullWidth(!fullWidth)} />
        <SheButton icon={Image} onClick={() => setIcon(!icon ? Users : null)} />
      </div>*/}

      <br />

      <SheInput
        label="Input"
        labelTransKey="sdifwoisdijoij"
        icon={icon}
        minWidth={minWidth}
        maxWidth={maxWidth}
        fullWidth={fullWidth}
        showClearBtn={true}
        isLoading={isLoading}
      />

      {/*<br />

      <SheDatePicker
        label="DatePicker"
        labelTransKey="sdifwiejosijd"
        icon={icon}
        minWidth={minWidth}
        maxWidth={maxWidth}
        fullWidth={fullWidth}
        showClearBtn={showClearBtn}
        isLoading={isLoading}
        onSelectDate={onAction}
      />

      <br />

      <SheSelect
        label="Select"
        items={[
          { text: "option 1", value: 1 },
          { text: "option 2", value: 2 },
        ]}
        icon={icon}
        minWidth={minWidth}
        maxWidth={maxWidth}
        fullWidth={fullWidth}
        showClearBtn={showClearBtn}
        isLoading={isLoading}
      />

      <br />

      <SheTextArea
        label="Textarea"
        icon={icon}
        minWidth={minWidth}
        maxWidth={maxWidth}
        fullWidth={fullWidth}
        showClearBtn={showClearBtn}
        isLoading={isLoading}
      />

      <br />

      <SheToggle
        label="Toggle"
        view={ComponentViewEnum.CARD}
        type={SheToggleTypeEnum.SWITCH}
        text="Soem text"
        icon={icon}
        minWidth={minWidth}
        maxWidth={maxWidth}
        fullWidth={fullWidth}
        isLoading={isLoading}
      />*/}

      <br />
    </div>
  );
}
