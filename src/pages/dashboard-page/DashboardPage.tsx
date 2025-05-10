import React, { useState } from "react";

import cs from "./DashboardPage.module.scss";
import useDashboardPageService from "@/pages/dashboard-page/useDashboardPageService.ts";
import SheTimePicker from "@/components/primitive/she-time-picker/SheTimePicker.tsx";
import { TimerIcon } from "lucide-react";
import { TimeFormatEnum } from "@/const/enums/TimeFormatEnum.ts";

export function DashboardPage() {
  const service = useDashboardPageService();

  const [time, setTime] = useState(new Date());

  function onAction(value) {
    console.log("onAction: ", value);
    // setTime(value);
  }

  return (
    <div id={cs["DashboardPage"]}>
      <h1>Dashboard</h1>

      <br />

      <SheTimePicker
        label="TimePicker"
        icon={TimerIcon}
        // date={time}
        dateFormat={TimeFormatEnum.HH_MM_XM}
        showClearBtn
        // hideInputLabels
        // hideSeconds
        // size={"small"}
        // view={ComponentViewEnum.CARD}
        onDelay={onAction}
        // onSetDate={onAction}
      />

      <br />
    </div>
  );
}
