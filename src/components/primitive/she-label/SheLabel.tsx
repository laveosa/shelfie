import React, { JSX } from "react";
import { Trans } from "react-i18next";

import cs from "./SheLabel.module.scss";
import SheTooltip from "@/components/complex/she-tooltip/SheTooltip.tsx";
import { ISheLabel } from "@/const/interfaces/primitive-components/ISheLabel.ts";

export function SheLabel({
  className = "",
  style,
  label,
  labelTransKey,
  tooltip,
  ariaDescribedbyId,
}: ISheLabel): JSX.Element {
  // ==================================================================== EVENT

  // ==================================================================== PRIVATE

  // ==================================================================== LAYOUT
  if (!label && !tooltip) return null;

  return (
    <label
      className={`${cs.sheLabel} ${className} she-text`}
      style={style}
      htmlFor={ariaDescribedbyId}
      aria-describedby={ariaDescribedbyId}
    >
      {label && <Trans i18nKey={labelTransKey}>{label}</Trans>}
      {tooltip?.text?.length > 0 && (
        <SheTooltip
          {...tooltip}
          side={tooltip?.side || "right"}
          align={tooltip?.align || "end"}
          showDefaultIcon
          ariaDescribedbyId={ariaDescribedbyId}
        />
      )}
    </label>
  );
}
