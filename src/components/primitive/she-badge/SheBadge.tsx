import React, { JSX } from "react";
import _ from "lodash";

import cs from "./SheBadge.module.scss";
import {
  getCustomProps,
  removeCustomProps,
} from "@/utils/helpers/props-helper.ts";
import {
  ISheBadge,
  SheBadgeDefaultModel,
} from "@/const/interfaces/primitive-components/ISheBadge.ts";
import { Badge } from "@/components/ui/badge.tsx";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";
import SheSkeleton from "@/components/primitive/she-skeleton/SheSkeleton.tsx";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import { XCircle } from "lucide-react";
import useComponentUtilities from "@/utils/hooks/useComponentUtilities.ts";

export default function SheBadge<T>(props: ISheBadge<T>): JSX.Element {
  // ==================================================================== PROPS
  const {
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
    variant,
    value,
    minWidth,
    maxWidth,
    fullWidth,
    disabled,
    isLoading,
    isCircle,
    showCloseBtn,
    onClick,
    onClose,
  } = props;
  const sheBadgeProps: ISheBadge<T> = getCustomProps<
    ISheBadge<T>,
    ISheBadge<T>
  >(props, SheBadgeDefaultModel);
  const restProps = removeCustomProps<ISheBadge<T>>(props, [
    SheBadgeDefaultModel,
  ]);

  // ==================================================================== UTILITIES
  const { getContextColorBasedOnVariant } = useComponentUtilities({
    identifier: "SheBadge",
  });

  const { translate } = useAppTranslation();
  const contextColor = getContextColorBasedOnVariant(variant);
  const circleView = _isCircle();

  // ==================================================================== EVENT HANDLERS
  function onClickHandler(event: React.MouseEvent<HTMLElement>) {
    event.stopPropagation();
    const tmpValue: T | string = value ?? text?.toString();
    onClick?.(tmpValue, {
      event,
      model: sheBadgeProps,
      value: tmpValue,
    });
  }

  function onCloseHandler(event: React.MouseEvent<HTMLElement>) {
    event.stopPropagation();
    const tmpValue: T | string = value ?? text?.toString();
    onClose?.(tmpValue, {
      event,
      model: sheBadgeProps,
      value: tmpValue,
    });
  }

  // ==================================================================== PRIVATE
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
              {...restProps}
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
