import React, { JSX } from "react";
import { Trans } from "react-i18next";

import cs from "./SheLabel.module.scss";
import SheTooltip from "@/components/primitive/she-tooltip/SheTooltip.tsx";
import { ISheLabel } from "@/const/interfaces/primitive-components/ISheLabel.ts";
import { ISheTooltip } from "@/const/interfaces/complex-components/ISheTooltip.ts";

export function SheLabel({
  className = "",
  style,
  label,
  labelTransKey,
  tooltip,
  tooltipTransKey,
  ariaDescribedbyId,
}: ISheLabel): JSX.Element {
  // ==================================================================== EVENT

  // ==================================================================== PRIVATE

  // ==================================================================== LAYOUT
  if (!label && !tooltip) return null;

  const normalizedTooltip: ISheTooltip | null =
    typeof tooltip === "string"
      ? {
          text: tooltip,
          textTransKey: tooltipTransKey,
          side: "right",
          align: "end",
        }
      : tooltip?.text
        ? {
            ...tooltip,
            side: tooltip.side || "right",
            align: tooltip.align || "end",
          }
        : null;

  return (
    <label
      className={`${cs.sheLabel} ${className} she-text`}
      style={style}
      htmlFor={ariaDescribedbyId}
      aria-describedby={ariaDescribedbyId}
    >
      {label && <Trans i18nKey={labelTransKey}>{label}</Trans>}
      {normalizedTooltip && (
        <SheTooltip
          {...normalizedTooltip}
          showDefaultIcon
          ariaDescribedbyId={ariaDescribedbyId}
        />
      )}
    </label>
  );
}
