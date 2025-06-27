import React, { JSX } from "react";

import cs from "./SheSelectItem.module.scss";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";
import { SelectItem } from "@/components/ui/select.tsx";
import SheOption from "@/components/primitive/she-option/SheOption.tsx";

export default function SheSelectItem<T>({
  id,
  className = "",
  style,
  elementClassName = "",
  elementStyle,
  showSelectIcon,
  ...props
}: ISheSelectItem<T>): JSX.Element {
  // ==================================================================== EVENT

  // ==================================================================== PRIVATE

  // ==================================================================== RENDER

  return (
    <SelectItem
      id={id}
      className={`${cs.sheSelectItem} ${className} ${showSelectIcon ? cs.sheShowSelectIcon : ""}`}
      value={id}
      defaultValue={id}
      style={style}
    >
      <SheOption<T>
        className={`${cs.sheSelectItemOption} ${elementClassName}`}
        mode="plain"
        style={elementStyle}
        {...props}
      />
    </SelectItem>
  );
}
