import React, { RefObject, useEffect, useState } from "react";

import {
  generateId,
  generateSafeItemId,
} from "@/utils/helpers/quick-helper.ts";
import { ISelectable } from "@/const/interfaces/primitive-components/ISelecteble.ts";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";
import { ISheIcon } from "@/const/interfaces/primitive-components/ISheIcon.ts";
import { ISheOption } from "@/const/interfaces/primitive-components/ISheOption.ts";

export interface IComponentUtilities {
  identifier?: string;
}

export default function useComponentUtilities({
  identifier,
}?: IComponentUtilities) {
  const { translate } = useAppTranslation();
  const [ariaDescribedbyId, setAriaDescribedbyId] = useState<string>(null);

  useEffect(() => {
    if (identifier !== ariaDescribedbyId)
      setAriaDescribedbyId(`${generateId()}_${identifier ?? "component"}_ID`);
  }, [identifier]);

  // ================================================================== LOGIC

  function initializeItemsList<V, T extends ISheOption<V>>(
    items: T[],
    selectedValues?: V | V[],
  ): T[] {
    if (!items || items.length === 0) return [];

    const values: V[] = Array.isArray(selectedValues)
      ? selectedValues
      : selectedValues
        ? [selectedValues]
        : [];

    const { withIcons, withColors } = _analyzeElementsForSpecificData(items);

    return items.map((item: T, idx) => {
      // ----------------------------------- INITIALIZE ID
      item.id = generateSafeItemId(item.text, idx);
      // ----------------------------------- INITIALIZE COLUMNS
      item.showIconsColumn = withIcons;
      item.showColorsColumn = withColors;
      // ----------------------------------- INITIALIZE SELECTED
      if (values && values.length > 0) {
        item.isSelected = values.includes(item.value);
      }

      return item;
    });
  }

  function getItemFromListByIdentifier<T, V>(
    items: T[],
    identifier: string,
    value: V,
  ): T {
    if (!items || items.length === 0 || !identifier || identifier.length === 0)
      return null;

    return items.find((item) => item[identifier] === value);
  }

  function getSelectedItems<T extends ISelectable<V>, V>(items: T[]): T[] {
    if (!items || items.length === 0) return items;

    return items.filter((item) => item.isSelected);
  }

  function updateSelectedItems<T extends ISelectable<V>, V>(
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

  function setFocus<T>(focus: boolean, triggerRef: RefObject<T>) {
    if (focus && triggerRef && triggerRef.current) {
      setTimeout(() => triggerRef.current.focus());
    }
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

  function getContextColorBasedOnVariant(variant: string): string {
    switch (variant) {
      case "ghost":
      case "link":
      case "outline":
      case "secondary":
        return "black";
      default:
        return "white";
    }
  }

  // ================================================================== OUTPUT
  return {
    ariaDescribedbyId,
    translate,
    setFocus,
    getSelectedItems,
    updateSelectedItems,
    getItemFromListByIdentifier,
    initializeItemsList,
    calculatePopoverWidth,
    getContextColorBasedOnVariant,
  };
}

// ================================================================== PRIVATE
function _analyzeElementsForSpecificData<
  T extends {
    icon?: Partial<ISheIcon> | string | React.FC<any>;
    colors?: string[];
  },
>(
  items: T[],
): {
  withIcons: boolean;
  withColors: boolean;
} {
  let withIcons = false;
  let withColors = false;

  for (const item of items) {
    if (!withIcons && item.icon) withIcons = true;
    if (!withColors && item.colors) withColors = true;
    if (withIcons && withColors) break;
  }

  return { withIcons, withColors };
}
