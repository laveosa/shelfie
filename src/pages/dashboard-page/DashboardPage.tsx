import React, { useState } from "react";

import cs from "./DashboardPage.module.scss";
import useDashboardPageService from "@/pages/dashboard-page/useDashboardPageService.ts";
import SheTimePicker from "@/components/primitive/she-time-picker/SheTimePicker.tsx";
import { TimerIcon } from "lucide-react";

export function DashboardPage() {
  const service = useDashboardPageService();

  const [time, setTime] = useState(new Date());

  function onAction(value) {
    console.log("onAction: ", value);
    setTime(value);
  }

  return (
    <div id={cs["DashboardPage"]}>
      <h1>Dashboard</h1>

      <br />

      <SheTimePicker
        label="TimePicker"
        tooltip={{
          text: "some text for toolrip",
        }}
        required
        icon={TimerIcon}
        date={time}
        // size={"small"}
        showClearBtn
        hideInputLabels
        // view={ComponentViewEnum.CARD}
        onSetDate={onAction}
      />

      <br />
    </div>
  );
}
