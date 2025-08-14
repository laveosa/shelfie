import React, { JSX } from "react";

import cs from "./SheContextLengthLimits.module.scss";
import { ISheContextLengthLimits } from "@/const/interfaces/primitive-components/ISheContextLengthLimits.ts";

export default function SheContextLengthLimits({
  contextLengthLimitsClassName = "",
  contextLengthLimitsStyle,
  contextLengthLimitsValue,
  isContextLengthLimitsValid,
  minLength,
  maxLength,
  type,
}: ISheContextLengthLimits): JSX.Element {
  // ==================================================================== UTILITIES
  const valueLength = contextLengthLimitsValue
    ? type === "number"
      ? contextLengthLimitsValue
      : String(contextLengthLimitsValue).length
    : 0;

  // ==================================================================== LAYOUT
  if (!minLength && !maxLength) return null;

  return (
    <div
      className={`${cs.sheContextLengthLimits} ${contextLengthLimitsClassName} ${!isContextLengthLimitsValid ? cs.lengthInvalid : ""}`}
      style={contextLengthLimitsStyle}
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
