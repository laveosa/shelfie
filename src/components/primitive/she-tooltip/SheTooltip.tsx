import React from "react";
import { Trans } from "react-i18next";

import ExclamationMarkIcon from "@/assets/icons/exclamation-mark.svg?react";
import cs from "./SheTooltip.module.scss";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip.tsx";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import { ISheTooltip } from "@/const/interfaces/primitive-components/ISheTooltip.ts";

export default function SheTooltip({
  className = "",
  style,
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
  // ==================================================================== EVENT HANDLERS
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

  // ==================================================================== LAYOUT
  return (
    <div className={`${className} ${cs.sheTooltip || ""}`}>
      <TooltipProvider delayDuration={delayDuration}>
        <Tooltip>
          <TooltipTrigger asChild>
            {showDefaultIcon ? (
              <div className={cs.tooltipIcon}>
                <SheIcon
                  icon={ExclamationMarkIcon}
                  className={cs.tooltipIconElement}
                />
              </div>
            ) : (
              children
            )}
          </TooltipTrigger>
          {(title || text || description) && (
            <TooltipContent
              className={`${cs.tooltipMessageBlock} ${cs[view]}`}
              style={style}
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
