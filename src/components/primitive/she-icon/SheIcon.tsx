import React, { JSX } from "react";
import { isObject } from "lodash";

import cs from "./SheIcon.module.scss";
import { ISheIcon } from "@/const/interfaces/primitive-components/ISheIcon.ts";
import { LucideProps } from "lucide-react";
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
  function onClickHandler(event) {
    if (onClick) {
      onClick(event);
    }
  }

  return (
    <div
      {...props}
      className={`${cs.sheIcon} ${cs[iconView] || ""} ${className || ""} ${fullWidth ? cs.fullWidth : ""} ${hoverEffect ? cs.hoverEffect : ""} ${onClick ? cs.onClickEffect : ""}`}
      style={{ minWidth, maxWidth, minHeight, maxHeight, ...style }}
      onClick={onClickHandler}
    >
      {/\.(png|jpe?g|gif|webp)$/i.test(icon) && <img src={icon} alt="icon" />}
      {icon && isObject(icon) && <Icon icon={icon as any} />}
    </div>
  );
}

function Icon({ icon: Icon }: { icon: LucideProps }) {
  return <Icon />;
}
