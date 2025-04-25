import React, { JSX } from "react";

import cs from "./SheLabel.module.scss";
import { Trans } from "react-i18next";
import SheTooltip from "@/components/complex/she-tooltip/SheTooltip.tsx";
import { ISheLabel } from "@/const/interfaces/primitive-components/ISheLabel.ts";

export function SheLabel({
  className = "",
  style,
  label,
  labelTransKey,
  tooltip,
  ariaDescribedbyId,
  ...props
}: ISheLabel): JSX.Element {
  // ==================================================================== EVENT

  // ==================================================================== PRIVATE

  // ==================================================================== LAYOUT
  if (!label && !tooltip) return null;

  return (
    <label
      {...props}
      className={`${cs.sheLabel} ${className} she-text`}
      style={style}
      htmlFor={ariaDescribedbyId}
      aria-describedby={ariaDescribedbyId}
    >
      <Trans i18nKey={labelTransKey}>{label}</Trans>
      {tooltip?.text?.length > 0 && (
        <SheTooltip
          {...tooltip}
          id={ariaDescribedbyId}
          side={tooltip?.side || "right"}
          align={tooltip?.align || "end"}
        >
          <div className={cs.tooltipIcon}>
            <span className="she-title">!</span>
          </div>
        </SheTooltip>
      )}
    </label>
  );
}
