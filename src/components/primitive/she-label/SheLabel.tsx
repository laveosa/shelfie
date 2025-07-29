import React, { JSX } from "react";
import { Trans } from "react-i18next";

import cs from "./SheLabel.module.scss";
import SheTooltip from "@/components/primitive/she-tooltip/SheTooltip.tsx";
import { ISheLabel } from "@/const/interfaces/primitive-components/ISheLabel.ts";
import { ISheTooltip } from "@/const/interfaces/primitive-components/ISheTooltip.ts";

export default function SheLabel({
  labelClassName = "",
  labelStyle,
  label,
  labelTransKey,
  tooltip,
  tooltipTransKey,
  ariaDescribedbyId,
  htmlFor,
}: ISheLabel): JSX.Element {
  // ==================================================================== UTILITIES
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

  // ==================================================================== LAYOUT
  if (!label && !tooltip) return null;

  return (
    <label
      className={`${cs.sheLabel} ${labelClassName} she-text`}
      style={labelStyle}
      htmlFor={ariaDescribedbyId || htmlFor}
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
