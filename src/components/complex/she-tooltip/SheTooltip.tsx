import React from "react";
import { Trans } from "react-i18next";

import cs from "./SheTooltip.module.scss";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ISheTooltip } from "@/const/interfaces/complex-components/ISheTooltip.ts";

export default function SheTooltip({
  className,
  children,
  title,
  titleTransKey,
  text,
  textTransKey,
  description,
  descriptionTransKey,
  side,
  align,
  view,
  onClick,
  ...props
}: ISheTooltip): React.ReactNode {
  // ==================================================================== EVENT

  function onClickHandler(e) {
    e.preventDefault();
    onClick({
      title,
      text,
      description,
      side,
      align,
      ...props,
    });
  }

  // ==================================================================== PRIVATE

  // ==================================================================== LAYOUT

  return (
    <div className={`${className || ""} ${cs.sheTooltip || ""}`}>
      <TooltipProvider {...props}>
        <Tooltip>
          <TooltipTrigger asChild>{children}</TooltipTrigger>
          {(title || text || description) && (
            <TooltipContent
              className={`${cs.tooltipMessageBlock} ${cs[view]}`}
              side={side}
              align={align}
              onClick={onClickHandler}
            >
              <div className={cs.tooltipMessageBlock}>
                {title && (
                  <span className="she-title">
                    <Trans i18nKey={titleTransKey}>{title}</Trans>
                  </span>
                )}
                {text && (
                  <span className="she-text">
                    <Trans i18nKey={textTransKey}>{text}</Trans>
                  </span>
                )}
                {description && (
                  <span className="she-subtext">
                    <Trans i18nKey={descriptionTransKey}>{description}</Trans>
                  </span>
                )}
              </div>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
