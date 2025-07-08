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

  // ================================================================== LOGIC
  function addItemsId<T extends { id: string }>(
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

  function initializeItemsList<V, T extends ISheOption<V>>(
    items: T[],
    selectedValues?: V | V[],
  ): T[] {
    if (!items || items.length === 0) return null;

    const values: V[] = selectedValues
      ? !Array.isArray(selectedValues)
        ? [selectedValues]
        : selectedValues
      : null;

    _analyzeElementsForSpecificData(items).then(({ withIcons, withColors }) => {
      items = items.map((item: T, idx) => {
        // ----------------------------------- INITIALIZE ID
        item.id =
          item.id ??
          `${
            item[identifier] && item[identifier].length > 0
              ? item[identifier].replace(/ /g, "_")
              : generateId()
          }_${(idx + 1).toString()}`;
        // ----------------------------------- INITIALIZE COLUMNS
        item.showIconsColumn = withIcons;
        item.showColorsColumn = withColors;
        // ----------------------------------- INITIALIZE SELECTED
        if (values && values.length > 0) {
          item.isSelected = values.includes(item.value);
        }

        return item;
      });
    });

    return items;
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
    updateSelectedItems,
    initializeItemsList,
    calculatePopoverWidth,
  };
}

// ============================================================== PRIVATE FUNC-S
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
