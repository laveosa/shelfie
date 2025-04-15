import React, { JSX, SVGProps } from "react";
import { isObject } from "lodash";

import cs from "./SheIcon.module.scss";
import { ISheIcon } from "@/const/interfaces/primitive-components/ISheIcon.ts";
import { IconViewEnum } from "@/const/enums/IconViewEnum.ts";

export default function SheIcon({
  className,
  icon,
  iconView = IconViewEnum.SQUARE,
  color,
  fullWidth,
  minWidth,
  maxWidth,
  minHeight,
  maxHeight,
  hoverEffect,
  style,
  onClick,
  ...props
}: ISheIcon): JSX.Element {
  console.log(icon);

  function onClickHandler(event) {
    if (onClick) {
      onClick(event);
    }
  }

  return (
    <div
      {...props}
      className={`${cs.sheIcon} ${cs[iconView] || ""} ${className || ""} ${fullWidth ? cs.fullWidth : ""} ${hoverEffect ? cs.hoverEffect : ""} ${onClick ? cs.onClickEffect : ""}`}
      style={{ color, minWidth, maxWidth, minHeight, maxHeight, ...style }}
      onClick={onClickHandler}
    >
      {/\.(png|jpe?g|gif|webp)$/i.test(icon) && <img src={icon} alt="icon" />}
      {icon && isObject(icon) && (
        <Icon icon={icon as React.FC<Object>} color={color} />
      )}
    </div>
  );
}

function Icon({
  icon: IconComponent,
  color,
}: {
  icon: React.FC<SVGProps<SVGSVGElement>>;
  color?: string;
}) {
  return <IconComponent color={color} />;
}
