import React, { RefObject, useEffect, useState } from "react";

import {
  generateId,
  generateSafeItemId,
} from "@/utils/helpers/quick-helper.ts";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";
import { ReactHookFormMode } from "@/const/enums/ReactHookFormMode.ts";
import { ISelectable } from "@/const/interfaces/primitive-components/ISelecteble.ts";
import { ISheIcon } from "@/const/interfaces/primitive-components/ISheIcon.ts";
import { ISheOption } from "@/const/interfaces/primitive-components/ISheOption.ts";
import { IComponentUtilities } from "@/const/interfaces/IComponentUtilities.ts";
import useSheFormData from "@/utils/hooks/useSheFormData.ts";
import { IShePrimitiveComponentWrapper } from "@/const/interfaces/primitive-components/IShePrimitiveComponentWrapper.ts";

export default function useComponentUtilities<
  T extends IShePrimitiveComponentWrapper,
>({ props, identifier }: IComponentUtilities<T> = {}) {
  // ==================================================================== STATE MANAGEMENT
  const [ariaDescribedbyId, setAriaDescribedbyId] = useState<string>(null);

  // ==================================================================== UTILITIES
  const { translate } = useAppTranslation();
  const { field, form } = useSheFormData<T>(props);

  // ==================================================================== SIDE EFFECTS
  useEffect(() => {
    if (identifier !== ariaDescribedbyId)
      setAriaDescribedbyId(`${generateId()}_${identifier ?? "component"}_ID`);
  }, [identifier]);

  // ================================================================== LOGIC
  function addItemsId<T extends { id?: string }>(
    items: T[],
    identifier: string = "item",
    generateLength?: number,
  ): T[] {
    if (!items || items.length === 0) return null;

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
        item.isSelected = isValueInCollection(values, item.value);
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
    selectedValues?: V | V[],
  ): T[] {
    const values: V[] = !Array.isArray(selectedValues)
      ? [selectedValues]
      : selectedValues;

    items?.forEach(
      (item: T) => (item.isSelected = isValueInCollection(values, item.value)),
    );
    return items;
  }

  function removeItemFromListByIdentifier<T, K extends keyof T>(
    items: T[],
    identifier: K,
    value: T[K],
  ): T[] {
    return items?.filter((elem) => elem[identifier] !== value);
  }

  function isValueInCollection<V>(collection: V[], value: V): boolean {
    return collection.some((v) => deepEqual(v, value));
  }

  function deepEqual(a: any, b: any): boolean {
    if (a === b) return true;

    if (a == null || b == null) return a === b;

    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return false;

      return a.every((el, i) => deepEqual(el, b[i]));
    }

    if (typeof a === "object" && typeof b === "object") {
      const keysA = Object.keys(a);
      const keysB = Object.keys(b);
      if (keysA.length !== keysB.length) return false;

      return keysA.every((key) => deepEqual(a[key], b[key]));
    }

    return false;
  }

  function setFocus<T extends HTMLElement>(
    focus: boolean,
    triggerRef: RefObject<T>,
  ) {
    if (focus && triggerRef && triggerRef.current) {
      setTimeout(() => triggerRef.current.focus());
    }
  }

  function calculatePopoverWidth<T extends HTMLElement>(
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

  // --------------------------------------------------------------- FORM
  function updateFormValue(value: any, validate: boolean = true) {
    if (props.ignoreFormAction) return null;

    if (field) {
      field.onChange(value);
      if (validate) void form.trigger(field.name);
    }
  }

  function resetFormField(defaultValue: any = "") {
    if (props.ignoreFormAction) return null;

    if (field) {
      form?.resetField?.(field.name, {
        keepDirty: false,
        keepTouched: false,
        defaultValue: defaultValue,
      });
    }
  }

  function getFormMode(): ReactHookFormMode {
    if (props.ignoreFormAction) return null;

    return (
      (form?.control?._options?.mode as ReactHookFormMode) ||
      ReactHookFormMode.SUBMIT
    );
  }

  // ================================================================== OUTPUT
  return {
    ariaDescribedbyId,
    translate,
    addItemsId,
    setFocus,
    getSelectedItems,
    updateSelectedItems,
    getItemFromListByIdentifier,
    removeItemFromListByIdentifier,
    isValueInCollection,
    deepEqual,
    initializeItemsList,
    calculatePopoverWidth,
    getContextColorBasedOnVariant,
    updateFormValue,
    resetFormField,
    getFormMode,
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
