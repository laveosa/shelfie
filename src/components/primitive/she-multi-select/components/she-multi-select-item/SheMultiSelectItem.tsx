import React, { JSX } from "react";

import cs from "./SheMultiSelectItem.module.scss";
import { ISheMultiSelectItem } from "@/const/interfaces/primitive-components/ISheMultiSelectItem.ts";
import { CommandItem } from "@/components/ui/command.tsx";
import SheOption from "@/components/primitive/she-option/SheOption.tsx";
import { IOutputEventModel } from "@/const/interfaces/IOutputEventModel.ts";

export default function SheMultiSelectItem<T>({
  id,
  className = "",
  style,
  elementClassName = "",
  elementStyle,
  value,
  onClick,
  ...props
}: ISheMultiSelectItem<T>): JSX.Element {
  // ==================================================================== EVENT

  function onSelectHandler(value: T) {
    setTimeout(() => onClick(value));
  }

  // ==================================================================== PRIVATE

  // ==================================================================== RENDER

  return (
    <CommandItem
      id={id}
      className={`${cs.sheMultiSelectItem} ${className}`}
      style={style}
      onSelect={() => onSelectHandler(value)}
    >
      <SheOption<T>
        {...props}
        className={`${cs.sheSelectItemOption} ${elementClassName}`}
        style={elementStyle}
        value={value}
        mode="multiple"
        view="normal"
        checkOnClick
        onCheck={(data) => {
          data.event.stopPropagation();
          onSelectHandler(data.model.value);
        }}
      />
    </CommandItem>
  );
}
