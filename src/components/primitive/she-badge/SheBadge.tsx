import React, { JSX } from "react";
import _ from "lodash";

import cs from "./SheBadge.module.scss";
import { Badge } from "@/components/ui/badge.tsx";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";
import { ISheBadge } from "@/const/interfaces/primitive-components/ISheBadge.ts";
import SheSkeleton from "@/components/primitive/she-skeleton/SheSkeleton.tsx";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import { XCircle } from "lucide-react";

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
  textWrap = "wrap",
  minWidth,
  maxWidth,
  fullWidth,
  disabled,
  isLoading,
  isCircle,
  showCloseBtn,
  onClick,
  onClose,
  ...props
}: ISheBadge): JSX.Element {
  const { translate } = useAppTranslation();

  const contextColor = _getContextColor();
  const circleView = _isCircle();

  console.log("--------------------------------------");
  console.log("badge text: ", text);
  console.log("badge text wrap: ", textWrap);
  console.log("badge max width: ", maxWidth);

  // ==================================================================== EVENT

  function onClickHandler(event: React.MouseEvent<HTMLElement>) {
    event.stopPropagation();
    if (onClick) onClick(event);
  }

  function onCloseHandler(event: React.MouseEvent<HTMLElement>) {
    event.stopPropagation();
    if (onClose) onClose(event);
  }

  // ==================================================================== PRIVATE

  function _getContextColor(): string {
    switch (props.variant) {
      case "outline":
      case "secondary":
        return "black";
      default:
        return "white";
    }
  }

  function _isCircle(): boolean {
    return (
      isCircle ||
      (icon && !text && !showCloseBtn) ||
      (!icon && !_.isNil(text) && typeof text === "number" && !showCloseBtn) ||
      (!icon &&
        !_.isNil(text) &&
        typeof text === "string" &&
        text.length > 0 &&
        text.length <= 2 &&
        !showCloseBtn)
    );
  }

  // ==================================================================== LAYOUT

  return (
    <div
      id={id}
      className={`${cs.sheBadge} ${className} ${icon ? cs.withIcon : ""} ${fullWidth ? cs.fullWidth : ""} ${disabled || isLoading ? "disabled" : ""} ${onClick ? cs["isClickable"] : ""} ${textWrap ? cs[textWrap] : ""} ${circleView ? cs["circle"] : ""}`}
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
              {icon && (
                <SheIcon
                  className={cs.sheBadgeIcon}
                  icon={icon}
                  color={iconColor || contextColor}
                />
              )}
              {text && (
                <span
                  className="she-text"
                  style={{ color: textColor || contextColor }}
                >
                  {translate(textTransKey, text?.toString())}
                </span>
              )}
              {showCloseBtn && (
                <div className={cs.sheBadgeCloseBtn} onClick={onCloseHandler}>
                  <XCircle
                    className={cs.sheBadgeCloseBtnIcon}
                    style={{
                      color: iconColor || contextColor,
                    }}
                  />
                </div>
              )}
            </Badge>
          </SheSkeleton>
        </div>
      </div>
    </div>
  );
}
