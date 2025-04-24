import React, { JSX } from "react";

import cs from "./SheContextLengthLimits.module.scss";
import { ISheContextLengthLimits } from "@/const/interfaces/primitive-components/ISheContextLengthLimits.ts";

export function SheContextLengthLimits({
  className = "",
  style,
  value,
  lengthInvalid,
  minLength,
  maxLength,
}: ISheContextLengthLimits): JSX.Element {
  return (
    <>
      {(minLength || maxLength) && (
        <div
          className={`${cs.sheContextLengthLimits} ${className} ${!lengthInvalid ? cs.lengthInvalid : ""}`}
          style={style}
        >
          <div className={cs.minMaxBlock}>
            {minLength && <span className="she-subtext">min: {minLength}</span>}
            <span className="she-subtext">
              value: {value ? value.toString().length : 0}
            </span>
            {maxLength && <span className="she-subtext">max: {maxLength}</span>}
          </div>
        </div>
      )}
    </>
  );
}
