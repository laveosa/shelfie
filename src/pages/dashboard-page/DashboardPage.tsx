import React, { useEffect, useState } from "react";
import { Users } from "lucide-react";

import cs from "./DashboardPage.module.scss";
import useDashboardPageService from "@/pages/dashboard-page/useDashboardPageService.ts";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import { ComponentViewEnum } from "@/const/enums/ComponentViewEnum.ts";
import SheCalendar from "@/components/primitive/she-calendar/SheCalendar.tsx";
import { DateFormatEnum } from "@/const/enums/DateFormatEnum.ts";

const selectedDaysRowModel = [
  "05.02.2025",
  "05.04.2025",
  "05.06.2025",
  "05.07.2025",
  "05.08.2025",
  "05.10.2025",
];

const selectedDaysDateModel = [
  new Date("05.02.2025"),
  new Date("05.04.2025"),
  new Date("05.06.2025"),
  new Date("05.08.2025"),
  new Date("05.10.2025"),
];

const selectedDaysMixModel = [
  "03.02.2025",
  new Date("01.11.2025"),
  "04.06.2025",
  new Date("05.08.2025"),
  "02.10.2025",
  new Date("06.26.2025"),
  "01.01.2024",
];

const rangeDaysRowModel = {
  from: "05.01.2025",
  to: "05.10.2025",
};

const rangeDaysDateModel = {
  from: new Date("05.01.2025"),
  to: new Date("05.10.2025"),
};

const rangeDaysMixModel = {
  from: "05-10-2025",
  to: new Date("05/20/2025"),
};

export function DashboardPage() {
  const service = useDashboardPageService();

  const [date, setDate] = useState<Date | string>(null);
  const [markedDays, setMarkedDays] = useState<any>(null);

  const [icon, setIcon] = useState<any>(Users);
  const [isLoading, setIsLoading] = useState<boolean>(null);
  const [showClearBtn, setShowClearBtn] = useState<boolean>(null);
  const [fullWidth, setFullWidth] = useState<boolean>(null);
  const [minWidth, setMinWidth] = useState<string>(null);
  const [maxWidth, setMaxWidth] = useState<string>(null);

  // =========================================================================== SIDE-EFFECTS

  useEffect(() => {
    setTimeout(() => {
      setMarkedDays(selectedDaysDateModel);
    }, 2000);
  }, []);

  // =========================================================================== EVENTS

  // =========================================================================== LAYOUT

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
        // -------------------------------- MULTIPLE
        // date={selectedDaysRowModel}
        // date={selectedDaysDateModel}
        // date={selectedDaysDateModel}
        // -------------------------------- RANGE
        // date={rangeDaysRowModel}
        // date={rangeDaysDateModel}
        // date={rangeDaysMixModel}
        // -------------------------------- SINGLE
        // date={"05.10.2025"}
        date={new Date("05.10.2025")}
        dateFormat={DateFormatEnum.MM_DD_YYYY}
        markedDates={markedDays}
        view={ComponentViewEnum.CARD}
        showClearBtn
        onSelectDate={onAction}
      />
      {/*<br />

      <SheCalendar
        label="Calendar"
        labelTransKey="sdoiwfejfowidj"
        mode="range"
        date={date}
        dateFormat={DateFormatEnum.MM_DD_YYYY}
        markedDates={markedDays}
        showClearBtn
        view={ComponentViewEnum.CARD}
        required
        minWidth="320px"
        tooltip="some text for tooltip"
        onSelectDate={onAction}
      />*/}
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
