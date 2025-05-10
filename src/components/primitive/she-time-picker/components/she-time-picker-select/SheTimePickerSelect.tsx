import React, { JSX } from "react";

import { ISheTimePickerSelect } from "@/const/interfaces/primitive-components/ISheTimePickerSelect.ts";
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";
import {
  display12HourValue,
  Period,
  setDateByType,
} from "@/utils/helpers/time-picker-helper.ts";

export default function SheTimePickerSelect({
  ref,
  date,
  period,
  setDate,
  setPeriod,
  onLeftFocus,
  onRightFocus,
  ...props
}: ISheTimePickerSelect): JSX.Element {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowRight") onRightFocus?.();
    if (e.key === "ArrowLeft") onLeftFocus?.();
  };

  const handleValueChange = (value: Period) => {
    setPeriod(value);

    if (date) {
      const tempDate = new Date(date);
      const hours = display12HourValue(date.getHours());
      setDate(
        setDateByType(
          tempDate,
          hours.toString(),
          "12hours",
          period === "AM" ? "PM" : "AM",
        ),
      );
    }
  };

  return (
    <SheSelect
      triggerRef={ref}
      items={[
        { text: "AM", value: "AM" },
        { text: "PM", value: "PM" },
      ]}
      selected={period}
      hideFirstOption
      minWidth="65px"
      maxWidth="65px"
      onTriggerKeyDown={handleKeyDown}
      onSelect={handleValueChange}
      {...props}
    />
  );
}
