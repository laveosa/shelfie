import React from "react";
import { isObject } from "lodash";

import cs from "./SheIcon.module.scss";
import { ISheIcon } from "@/const/interfaces/primitive-components/ISheIcon.ts";

export default function SheIcon({
  id,
  className,
  icon,
  minWidth,
  maxWidth,
  fullWidth,
}: ISheIcon): React.ReactNode {
  return (
    <div
      id={id}
      className={`${cs.sheIcon} ${className || ""} ${fullWidth ? cs.fullWidth : ""}`}
      style={{ minWidth, maxWidth }}
    >
      {/\.(png|jpe?g|gif|webp)$/i.test(icon) && <img src={icon} alt="icon" />}
      {icon && isObject(icon) && <Icon icon={icon as React.FC<any>} />}
    </div>
  );
}

function Icon({ icon: Icon }: { icon: any }) {
  return <Icon />;
}
