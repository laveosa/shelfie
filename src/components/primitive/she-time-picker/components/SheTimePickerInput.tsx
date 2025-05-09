import React, { JSX } from "react";
import { cn } from "@/lib/utils";

import {
  getArrowByType,
  getDateByType,
  setDateByType,
} from "@/utils/helpers/time-picker-helper.ts";
import { ISheTimePickerInput } from "@/const/interfaces/primitive-components/ISheTimePickerInput.ts";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import cs from "./SheTimePickerInput.module.scss";

export default function SheTimePickerInput({
  id,
  className = "",
  value,
  date = new Date(new Date().setHours(0, 0, 0, 0)),
  type = "tel",
  name,
  picker,
  period,
  setDate,
  onKeyDown,
  onLeftFocus,
  onRightFocus,
  onChange,
  ref,
  ...props
}: ISheTimePickerInput): JSX.Element {
  const [flag, setFlag] = React.useState<boolean>(false);
  const [prevIntKey, setPrevIntKey] = React.useState<string>("0");
  const calculatedValue = React.useMemo(() => {
    return getDateByType(date, picker);
  }, [date, picker]);

  React.useEffect(() => {
    if (flag) {
      const timer = setTimeout(() => {
        setFlag(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [flag]);

  // ==================================================================== EVENT

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Tab") return;

    e.preventDefault();

    if (e.key === "ArrowRight") onRightFocus?.();

    if (e.key === "ArrowLeft") onLeftFocus?.();

    if (["ArrowUp", "ArrowDown"].includes(e.key)) {
      const step = e.key === "ArrowUp" ? 1 : -1;
      const newValue = getArrowByType(calculatedValue, step, picker);
      if (flag) setFlag(false);
      const tempDate = new Date(date);
      setDate(setDateByType(tempDate, newValue, picker, period));
    }

    if (e.key >= "0" && e.key <= "9") {
      if (picker === "12hours") setPrevIntKey(e.key);

      const newValue = calculateNewValue(e.key);

      if (flag) onRightFocus?.();

      setFlag((prev) => !prev);
      const tempDate = new Date(date);
      setDate(setDateByType(tempDate, newValue, picker, period));
    }
  }

  // ==================================================================== PRIVATE

  function calculateNewValue(key: string) {
    if (picker === "12hours") {
      if (flag && calculatedValue.slice(1, 2) === "1" && prevIntKey === "0")
        return "0" + key;
    }

    return !flag ? "0" + key : calculatedValue.slice(1, 2) + key;
  }

  // ==================================================================== LAYOUT

  return (
    <SheInput
      ref={ref}
      id={id || picker}
      className={`${cs.sheTimePickerInput} ${cn(
        "tabular-nums caret-transparent focus:bg-accent focus:text-accent-foreground [&::-webkit-inner-spin-button]:appearance-none",
        className,
      )}`}
      name={name || picker}
      value={value || calculatedValue}
      type={type}
      inputMode="decimal"
      onKeyDown={(event: any) => {
        onKeyDown?.(event);
        handleKeyDown(event);
      }}
      onChange={(event: any) => {
        event.preventDefault();
        onChange?.(event);
      }}
      {...props}
    />
  );
}
