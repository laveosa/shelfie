import React, { JSX, SVGProps } from "react";
import { isObject } from "lodash";

import cs from "./SheIcon.module.scss";
import { ISheIcon } from "@/const/interfaces/primitive-components/ISheIcon.ts";
import { IconViewEnum } from "@/const/enums/IconViewEnum.ts";
import { isSheIconConfig } from "@/utils/helpers/quick-helper.ts";

function SheIconComponent({
  id,
  className = "",
  style,
  elementClassName = "",
  elementStyle,
  icon,
  iconView = IconViewEnum.SQUARE,
  color,
  fullWidth,
  minWidth,
  maxWidth,
  minHeight,
  maxHeight,
  hoverEffect,
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
      className={`${cs.sheIcon} ${className} ${iconView ? cs[iconView] : ""} ${fullWidth ? cs.fullWidth : ""} ${hoverEffect ? cs.hoverEffect : ""} ${onClick ? cs.onClickEffect : ""}`}
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
      {...props}
    >
      {typeof icon === "string" && /\.(png|jpe?g|gif|webp)$/i.test(icon) && (
        <img
          src={icon}
          className={elementClassName}
          style={{ ...elementStyle }}
          alt="icon"
          role="img"
        />
      )}
      {icon && isObject(icon) && (
        <Icon
          icon={icon as React.FC<Object>}
          className={elementClassName}
          style={{ ...elementStyle }}
          color={color}
        />
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
  className = "",
  style,
  icon: IconComponent,
  color,
}: {
  className?: string;
  style?: React.CSSProperties;
  icon: React.FC<SVGProps<SVGSVGElement>>;
  color?: string;
}) {
  return (
    <IconComponent className={className ?? ""} style={style} color={color} />
  );
}
