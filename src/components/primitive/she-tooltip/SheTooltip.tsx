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
import { SheTooltipEnum } from "@/const/enums/SheTooltipEnum.ts";

export default function SheTooltip({
  className = "",
  style,
  children,
  icon,
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
  // ==================================================================== UTILITIES
  const contextColor =
    view && view !== SheTooltipEnum.LIGHT ? "#ffffff" : "#0f172a";

  // ==================================================================== EVENT HANDLERS
  function onClickHandler(e) {
    e.preventDefault();
    onClick({
      icon,
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
                  className={cs.tooltipIconTrigger}
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
              <div className={cs.tooltipMessageBlockContext}>
                <SheIcon
                  className={cs.tooltipIconContext}
                  icon={icon}
                  color={contextColor}
                />
                <div className={cs.tooltipMessageContext}>
                  {title && (
                    <span className="she-title" style={{ color: contextColor }}>
                      <Trans i18nKey={titleTransKey}>{title}</Trans>
                    </span>
                  )}
                  {text && (
                    <span className="she-text" style={{ color: contextColor }}>
                      <Trans i18nKey={textTransKey}>{text}</Trans>
                    </span>
                  )}
                  {description && (
                    <span
                      className="she-subtext"
                      style={{ color: contextColor }}
                    >
                      <Trans i18nKey={descriptionTransKey}>{description}</Trans>
                    </span>
                  )}
                </div>
              </div>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
