import { RefObject } from "react";

import { generateId } from "@/utils/helpers/quick-helper.ts";
import { ISelectable } from "@/const/interfaces/primitive-components/ISelecteble.ts";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";

export default function useComponentUtilities() {
  const { translate } = useAppTranslation();

  function updateSelectedItems<T extends ISelectable<T>, V>(
    items: T[],
    selectedValues: V | V[],
  ): T[] {
    if (!items || items.length === 0 || !selectedValues) return items;

    const values: V[] = !Array.isArray(selectedValues)
      ? [selectedValues]
      : selectedValues;

    items.forEach((item: T) => (item.isSelected = values.includes(item.value)));
    return items;
  }

  function setAutoFocus<T>(autoFocus: boolean, triggerRef: RefObject<T>) {
    if (autoFocus && triggerRef && triggerRef.current) {
      setTimeout(() => triggerRef.current.focus());
    }
  }

  function addItemsId<T>(
    items: T[],
    identifier: string = "item",
    generateLength?: number,
  ): T[] {
    if (!items || items.length === 0) return items;

    return items.map((item: T, idx) => ({
      ...item,
      id:
        item.id ??
        `${
          item[identifier] && item[identifier].length > 0
            ? item[identifier].replace(/ /g, "_")
            : generateId(generateLength)
        }_${(idx + 1).toString()}`,
    }));
  }

  function calculatePopoverWidth<T>(
    popoverRef: RefObject<HTMLDivElement>,
    triggerRef: RefObject<T>,
  ) {
    if (!popoverRef || !triggerRef) return null;

    requestAnimationFrame(() => {
      const popover = popoverRef.current;
      const trigger = triggerRef.current;
      if (!popover || !trigger || !trigger.offsetParent) return;
      popover.style.width = `${trigger.getBoundingClientRect().width}px`;
    });
  }

  return {
    translate,
    updateSelectedItems,
    setAutoFocus,
    addItemsId,
    calculatePopoverWidth,
  };
}
