import React, { RefObject, useEffect, useState } from "react";

import { generateId } from "@/utils/helpers/quick-helper.ts";
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

  // ================================================================== COMMON

  async function initializeItemsList<V, T extends ISheOption<V>>(
    items: T[],
    selectedValues?: V | V[],
  ): Promise<T[]> {
    if (!items || items.length === 0) return [];

    const values: V[] = Array.isArray(selectedValues)
      ? selectedValues
      : selectedValues
        ? [selectedValues]
        : [];

    const { withIcons, withColors } =
      await _analyzeElementsForSpecificData(items);

    return items.map((item: T, idx) => {
      item.id =
        item.id ??
        `${
          item[identifier] && item[identifier].length > 0
            ? item[identifier].replace(/ /g, "_")
            : generateId()
        }_${(idx + 1).toString()}`;
      item.showIconsColumn = withIcons;
      item.showColorsColumn = withColors;
      item.isSelected = values.includes(item.value);
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
  };
}

function _analyzeElementsForSpecificData<
  T extends {
    icon: Partial<ISheIcon> | string | React.FC<any>;
    colors: string[];
  },
>(
  items: T[],
): Promise<{
  withIcons: boolean;
  withColors: boolean;
}> {
  return new Promise((resolve, reject) => {
    if (!items || items.length === 0) return reject(null);

    let withIcons;
    let withColors;

    items.forEach((item) => {
      if (!withIcons && item.icon) {
        withIcons = true;
      }

      if (!withColors && item.colors) {
        withColors = true;
      }
    });

    resolve({ withIcons, withColors });
  });
}
