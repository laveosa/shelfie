import React, { useEffect, useRef, useState } from "react";

import cs from "./DashboardPage.module.scss";
import useDashboardPageService from "@/pages/dashboard-page/useDashboardPageService.ts";
import SheTimePicker from "@/components/primitive/she-time-picker/SheTimePicker.tsx";
import { TimeFormatEnum } from "@/const/enums/TimeFormatEnum.ts";
import { TimerIcon } from "lucide-react";

export function DashboardPage() {
  const service = useDashboardPageService();

  const [time, setTime] = useState<Date>(new Date());
  const hhRef = useRef<HTMLInputElement>(null);

  function onAction(value) {
    console.log("onAction: ", value);
    // setTime(value);
  }

  function onBlurHandler(value) {
    console.log("onBlur: ", value);
  }

  return (
    <div id={cs["DashboardPage"]}>
      <h1>Dashboard</h1>

      <br />

      <SheTimePicker
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
      />

      <br />
    </div>
  );
}
