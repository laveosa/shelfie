import React, { JSX } from "react";

import cs from "./SheBadge.module.scss";
import { Badge } from "@/components/ui/badge.tsx";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";
import { ISheBadge } from "@/const/interfaces/primitive-components/ISheBadge.ts";
import SheSkeleton from "@/components/primitive/she-skeleton/SheSkeleton.tsx";
import { SheClearButton } from "@/components/primitive/she-clear-button/SheClearButton.tsx";

export default function SheBadge({
  id,
  className = "",
  style,
  elementClassName = "",
  elementStyle,
  color,
  textColor,
  iconColor,
  icon,
  text,
  textTransKey,
  minWidth,
  maxWidth,
  fullWidth,
  disabled,
  isLoading,
  hideCloseBtn,
  onClick,
  onClose,
  ...props
}: ISheBadge): JSX.Element {
  const { translate } = useAppTranslation();

  // ==================================================================== EVENT

  function onClickHandler(event) {
    event.stopPropagation();
    if (onClick) onClick(event);
  }

  function onCloseHandler(event) {
    event.stopPropagation();
    if (onClose) onClose();
  }

  // ==================================================================== PRIVATE

  // ==================================================================== LAYOUT

  return (
    <div
      id={id}
      className={`${cs.sheBadge} ${className} ${icon ? cs.withIcon : ""} ${fullWidth ? cs.fullWidth : ""} ${disabled || isLoading ? "disabled" : ""} ${onClick ? cs["isClickable"] : ""}`}
      style={{
        minWidth,
        maxWidth,
        ...style,
      }}
    >
      <div className={cs.sheBadgeComponent}>
        <div className={cs.sheBadgeControl}>
          <SheSkeleton
            className={cs.sheBadgeSkeleton}
            isLoading={isLoading}
            fullWidth
          >
            <Badge
              className={`${elementClassName} ${cs.sheBadgeElement}`}
              style={{
                backgroundColor: color,
                ...elementStyle,
              }}
              onClick={onClickHandler}
              {...props}
            >
              <span className="she-text" style={{ color: textColor }}>
                {translate(textTransKey, text)}
              </span>
              <SheClearButton
                value={true}
                color={iconColor}
                className={cs.sheBadgeCloseBtn}
                showClearBtn={!hideCloseBtn}
                onClear={onCloseHandler}
              />
            </Badge>
          </SheSkeleton>
        </div>
      </div>
    </div>
  );
}
