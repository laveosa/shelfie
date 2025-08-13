import React, { JSX } from "react";

import cs from "./SheMultiSelectItem.module.scss";
import { ISheMultiSelectItem } from "@/const/interfaces/primitive-components/ISheMultiSelectItem.ts";
import { CommandItem } from "@/components/ui/command.tsx";
import SheOption from "@/components/primitive/she-option/SheOption.tsx";

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
  // ==================================================================== EVENT HANDLERS
  function onSelectHandler(
    value: T,
    event?: React.MouseEvent | React.KeyboardEvent,
  ) {
    event?.stopPropagation();
    setTimeout(() => {
      onClick?.(value, event);
    });
  }

  // ==================================================================== LAYOUT
  return (
    <CommandItem
      className={`${cs.sheMultiSelectItem} ${className}`}
      style={style}
      onSelect={() => onSelectHandler(value)}
    >
      <SheOption<T>
        {...props}
        id={id}
        className={`${cs.sheSelectItemOption} ${elementClassName}`}
        style={elementStyle}
        value={value}
        mode="multiple"
        view="normal"
        checkOnClick
        onCheck={(data) => onSelectHandler(value, data.event)}
      />
    </CommandItem>
  );
}
