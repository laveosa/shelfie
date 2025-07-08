import React, {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import { generateId } from "@/utils/helpers/quick-helper.ts";
import { ISelectable } from "@/const/interfaces/primitive-components/ISelecteble.ts";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";
import { ISheIcon } from "@/const/interfaces/primitive-components/ISheIcon.ts";

export interface IComponentUtilities<V, T extends ISelectable<V>> {
  identifier?: string;
  items?: T[];
}

export default function useComponentUtilities<V, T>({
  identifier,
  items,
}?: IComponentUtilities<V, T>) {
  const { translate } = useAppTranslation();
  const [ariaDescribedbyId, setAriaDescribedbyId] = useState<string>(null);
  const [isItemsWithIcons, setIsItemsWithIcons] = useState<boolean>(null);
  const [isItemsWithColors, setIsItemsWithColors] = useState<boolean>(null);

  useEffect(() => {
    _analyzeElementsForSpecificData(
      items,
      isItemsWithIcons,
      isItemsWithColors,
      setIsItemsWithIcons,
      setIsItemsWithColors,
    );
  }, [items]);

  useEffect(() => {
    if (identifier !== ariaDescribedbyId)
      setAriaDescribedbyId(`${generateId()}_${identifier ?? "component"}_ID`);
  }, [identifier]);

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
    ariaDescribedbyId,
    translate,
    isItemsWithIcons,
    isItemsWithColors,
    updateSelectedItems,
    setFocus,
    addItemsId,
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
  isItemsWithIcons: boolean,
  isItemsWithColors: boolean,
  setIsItemsWithIcons: Dispatch<SetStateAction<boolean>>,
  setIsItemsWithColors: Dispatch<SetStateAction<boolean>>,
): Promise<T[]> {
  setIsItemsWithIcons(null);
  setIsItemsWithColors(null);

  return new Promise<T[]>((resolve, reject) => {
    if (!items || items.length === 0) return reject(null);

    let withIcons = isItemsWithIcons;
    let withColors = isItemsWithColors;

    items.forEach((item) => {
      if (!withIcons && item.icon) {
        withIcons = true;
        setIsItemsWithIcons(withIcons);
      }

      if (!withColors && item.colors) {
        withColors = true;
        setIsItemsWithColors(withColors);
      }
    });

    resolve(items);
  });
}
