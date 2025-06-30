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
  onCheck,
  ...props
}: ISheSelectItem<T>): JSX.Element {
  // ==================================================================== EVENT

  // ==================================================================== PRIVATE

  // ==================================================================== RENDER

  return (
    <SelectItem
      id={id}
      className={`${cs.sheSelectItem} ${className} ${showSelectIcon ? cs.sheShowSelectIcon : ""}`}
      style={style}
      value={id}
      defaultValue={id}
    >
      <SheOption<T>
        {...props}
        className={`${cs.sheSelectItemOption} ${elementClassName}`}
        mode="plain"
        view="normal"
        style={elementStyle}
      />
    </SelectItem>
  );
}
