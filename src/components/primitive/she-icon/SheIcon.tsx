import React, { JSX, SVGProps } from "react";
import { isObject } from "lodash";

import cs from "./SheIcon.module.scss";
import { ISheIcon } from "@/const/interfaces/primitive-components/ISheIcon.ts";
import { IconViewEnum } from "@/const/enums/IconViewEnum.ts";
import { isSheIconConfig } from "@/utils/helpers/quick-helper.ts";

function SheIconComponent({
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
  // ==================================================================== EVENT

  function onClickHandler(event) {
    if (onClick) {
      onClick(event);
    }
  }

  // ==================================================================== PRIVATE

  // ==================================================================== LAYOUT

  return (
    <div
      {...props}
      className={`${cs.sheIcon} ${cs[iconView] || ""} ${className || ""} ${fullWidth ? cs.fullWidth : ""} ${hoverEffect ? cs.hoverEffect : ""} ${onClick ? cs.onClickEffect : ""}`}
      style={{
        minWidth,
        maxWidth,
        minHeight,
        maxHeight,
        color,
        stroke: color,
        fill: color,
        ...style,
      }}
      onClick={onClickHandler}
    >
      {typeof icon === "string" && /\.(png|jpe?g|gif|webp)$/i.test(icon) && (
        <img src={icon} alt="icon" role="img" />
      )}
      {icon && isObject(icon) && (
        <Icon icon={icon as React.FC<Object>} color={color} />
      )}
    </div>
  );
}

export default function SheIcon({ icon, ...props }: ISheIcon): JSX.Element {
  if (!icon) return null;

  if (isSheIconConfig(icon)) return <SheIconComponent {...icon} {...props} />;

  return <SheIconComponent icon={icon} {...props} />;
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
