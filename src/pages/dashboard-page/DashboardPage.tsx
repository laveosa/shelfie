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
      setDate(new Date("05.10.2025"));
    }, 4000);
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
        // date={new Date("05.10.2025")}
        date={date}
        // dateFormat={DateFormatEnum.MM_DD_YYYY}
        // markedDates={markedDays}
        view={ComponentViewEnum.CARD}
        showClearBtn
        onSelectDate={onAction}
      />

      <br />
    </div>
  );
}
