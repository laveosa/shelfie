import { Calendar } from "@/components/ui/calendar.tsx";
import cs from "./SheCalendar.module.scss";
import React from "react";

export default function SheCalendar() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className={cs.SheCalendar}
    />
  );
}
