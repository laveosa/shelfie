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
  delayDuration,
  ariaDescribedbyId,
  showDefaultIcon,
  onClick,
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
    });
  }

  // ==================================================================== PRIVATE

  // ==================================================================== LAYOUT

  return (
    <div className={`${className || ""} ${cs.sheTooltip || ""}`}>
      <TooltipProvider delayDuration={delayDuration}>
        <Tooltip>
          <TooltipTrigger asChild>
            {showDefaultIcon ? (
              <div className={cs.tooltipIcon}>
                <span className="she-title">!</span>
              </div>
            ) : (
              children
            )}
          </TooltipTrigger>
          {(title || text || description) && (
            <TooltipContent
              className={`${cs.tooltipMessageBlock} ${cs[view]}`}
              side={side}
              align={align}
              aria-describedby={ariaDescribedbyId}
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
