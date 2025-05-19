import React, { useEffect, useState } from "react";

import cs from "./DashboardPage.module.scss";
import useDashboardPageService from "@/pages/dashboard-page/useDashboardPageService.ts";
import SheCalendar from "@/components/primitive/she-calendar/SheCalendar.tsx";
import { ComponentViewEnum } from "@/const/enums/ComponentViewEnum.ts";
import { DateFormatEnum } from "@/const/enums/DateFormatEnum.ts";
import SheTimePicker from "@/components/primitive/she-time-picker/SheTimePicker.tsx";

const singleDates: any[] = [
  "05/21/1982",
  "05.21.1982",
  new Date("05/05/2025"),
  new Date(),
];

const multipleDates1: any[] = [
  "05/5/2025",
  "5/6/2025",
  "5/04/2025",
  "05/20/2025",
];

const multipleDates2: any[] = [
  new Date("05/04/2025"),
  new Date("05/17/2025"),
  new Date("05/06/2025"),
  new Date("05/01/2025"),
];

const multipleDates3: any[] = [
  "5/05/2025",
  "06/6/2025",
  new Date("04/4/2025"),
  new Date("07/07/2025"),
  "5/04/2025",
  "5/02/2025",
  new Date("05/6/2025"),
  new Date("05/21/2025"),
];

const range1 = {
  from: "05.1.2025",
  to: new Date("5.12.2025"),
};

export function DashboardPage() {
  const service = useDashboardPageService();

  const [dateCollection1, setDateCollection1] = useState<any>(null);
  const [dateCollection2, setDateCollection2] = useState<any>(null);

  useEffect(() => {
    setTimeout(() => setDateCollection1(multipleDates1), 2000);

    setTimeout(() => setDateCollection2(multipleDates2), 2000);
  }, []);

  // ================================================================== EVENT

  function onChange(event) {
    console.log("onChange: ", event);
    console.log(
      ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",
    );
  }

  function onDelay(event) {
    console.log("onDelay: ", event);
  }

  // ================================================================== LAYOUT

  return (
    <div id={cs["DashboardPage"]}>
      <h1>Dashboard</h1>

      <br />

      {/*<SheTimePicker
        label="Label"
        showClearBtn
        onSetDate={onChange}
        onDelay={onDelay}
      />*/}

      <br />

      <SheCalendar
        label="Select"
        date={singleDates[2]}
        // date={range1}
        // date={multipleDates3}
        // date={multipleDates1}
        view={ComponentViewEnum.CARD}
        // dateFormat={DateFormatEnum.MM_DD_YYYY}
        showClearBtn
        onSelectDate={onChange}
      />

      <br />
    </div>
  );
}
