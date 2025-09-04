import React, { JSX } from "react";
import _ from "lodash";

import { XCircle } from "lucide-react";
import cs from "./SheBadge.module.scss";
import { Badge } from "@/components/ui/badge.tsx";
import SheSkeleton from "@/components/primitive/she-skeleton/SheSkeleton.tsx";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import useComponentUtilities from "@/utils/hooks/useComponentUtilities.ts";
import { removeCustomProps } from "@/utils/helpers/props-helper.ts";
import {
  ISheBadge,
  SheBadgeDefaultModel,
} from "@/const/interfaces/primitive-components/ISheBadge.ts";

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
  const restProps = removeCustomProps<ISheBadge<T>>(props, [
    SheBadgeDefaultModel,
  ]);

  // ==================================================================== UTILITIES
  const { translate, getContextColorBasedOnVariant } = useComponentUtilities<
    ISheBadge<T>
  >({
    props,
    identifier: "SheBadge",
  });
  const contextColor = getContextColorBasedOnVariant(variant);
  const circleView = _isCircle();

  // ==================================================================== EVENT HANDLERS
  function onClickHandler(event: React.MouseEvent<HTMLElement>) {
    event.stopPropagation();
    const tmpValue: T | string = value ?? text?.toString();
    onClick?.(tmpValue, {
      event,
      model: props,
      value: tmpValue,
    });
  }

  function onCloseHandler(event: React.MouseEvent<HTMLElement>) {
    event.stopPropagation();
    const tmpValue: T | string = value ?? text?.toString();
    onClose?.(tmpValue, {
      event,
      model: props,
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
        text.length <= 1 &&
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
            skeletonClassName={cs.sheBadgeSkeleton}
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
