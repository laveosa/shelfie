import React, { useRef, useState } from "react";

import cs from "./DashboardPage.module.scss";
import useDashboardPageService from "@/pages/dashboard-page/useDashboardPageService.ts";
import SheTimePicker from "@/components/primitive/she-time-picker/SheTimePicker.tsx";
import { TimeFormatEnum } from "@/const/enums/TimeFormatEnum.ts";
import { Clock } from "lucide-react";
import { ComponentViewEnum } from "@/const/enums/ComponentViewEnum.ts";

export function DashboardPage() {
  const service = useDashboardPageService();

  const [time, setTime] = useState<Date>(new Date());
  const hhRef = useRef<HTMLInputElement>(null);

  function onSetDateHandler(value) {
    console.log("onSetDate: ", value);
    // setTime(value);
  }

  function onDelayHandler(value) {
    console.log("onDelay: ", value);
  }

  function onBlurHandler(value) {
    console.log("onBlur: ", value);
  }

  return (
    <div id={cs["DashboardPage"]}>
      <h1>Dashboard</h1>

      <br />

      <SheTimePicker
        label="Time Picker"
        labelTransKey="wf0239jf09wj"
        hhLabel="HH Label"
        hhLabelTransKey="wef9jdsf"
        mmLabel="MM Label"
        mmLabelTransKey="we0f9jdf"
        ssLabel="SS Label"
        ssLabelTransKey="fwofijds"
        periodLabel="PP Label"
        icon={Clock}
        // timeFormat={"12"}
        // timePeriod={"AM"}
        dateFormat={TimeFormatEnum.HH_MM_SS_XM}
        size={"small"}
        view={ComponentViewEnum.CARD}
        autoFocus
        required
        showClearBtn
        hideInputLabels
        // hideSeconds
        date={time}
        onSetDate={onSetDateHandler}
        onDelay={onDelayHandler}
        onBlur={onBlurHandler}
      />

      <br />

      <br />

      {/*<SheTimePicker
        label="TimePicker"
        icon={TimerIcon}
        date={time}
        dateFormat={TimeFormatEnum.HH_MM_SS_XM}
        showClearBtn
        timeFormat={"12"}
        autoFocus
        hoursRef={hhRef}
        onSetDate={onAction}
        onBlur={onBlurHandler}
      />*/}

      <br />
    </div>
  );
}
