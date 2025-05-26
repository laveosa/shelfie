import React, { JSX } from "react";

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
    if (onClose) onClose(event);
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
              {icon && <SheIcon className={cs.sheBadgeIcon} icon={icon} />}
              <span className="she-text" style={{ color: textColor }}>
                {translate(textTransKey, text)}
              </span>
              <div className={cs.sheBadgeCloseBtn} onClick={onCloseHandler}>
                <XCircle className={cs.sheBadgeCloseBtnIcon} />
              </div>
            </Badge>
          </SheSkeleton>
        </div>
      </div>
    </div>
  );
}
