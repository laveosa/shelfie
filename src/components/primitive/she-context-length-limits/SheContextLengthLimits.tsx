import React, { JSX } from "react";

import cs from "./SheContextLengthLimits.module.scss";
import { ISheContextLengthLimits } from "@/const/interfaces/primitive-components/ISheContextLengthLimits.ts";

export function SheContextLengthLimits({
  className = "",
  style,
  value,
  isValid,
  minLength,
  maxLength,
  contextType,
}: ISheContextLengthLimits): JSX.Element {
  const valueLength = value
    ? contextType === "number"
      ? value
      : String(value).length
    : 0;

  // ==================================================================== EVENT

  // ==================================================================== PRIVATE

  // ==================================================================== LAYOUT
  if (!minLength && !maxLength) return null;

  return (
    <div
      className={`${cs.sheContextLengthLimits} ${className} ${!isValid ? cs.lengthInvalid : ""}`}
      style={style}
      aria-live="polite"
    >
      <div className={cs.minMaxBlock}>
        {minLength && <span className="she-subtext">min: {minLength}</span>}
        <span className="she-subtext">value: {valueLength}</span>
        {maxLength && <span className="she-subtext">max: {maxLength}</span>}
      </div>
    </div>
  );
}
