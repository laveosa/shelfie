import React, { RefObject, useEffect, useState } from "react";

import {
  generateId,
  generateSafeItemId,
} from "@/utils/helpers/quick-helper.ts";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";
import { ISelectable } from "@/const/interfaces/primitive-components/ISelecteble.ts";
import { ISheIcon } from "@/const/interfaces/primitive-components/ISheIcon.ts";
import { ISheOption } from "@/const/interfaces/primitive-components/ISheOption.ts";
import { ReactHookFormMode } from "@/const/enums/ReactHookFormMode.ts";
import { useSheFormItemContext } from "@/state/context/she-form-item-context.ts";
import { IComponentUtilities } from "@/const/interfaces/IComponentUtilities.ts";
import _ from "lodash";

export default function useComponentUtilities<T>({
  props,
  identifier,
}: IComponentUtilities<T> = {}) {
  // ==================================================================== STATE MANAGEMENT
  const [_props, setProps] = useState<T>(null);
  const [ariaDescribedbyId, setAriaDescribedbyId] = useState<string>(null);

  // ==================================================================== UTILITIES
  const { translate } = useAppTranslation();
  const ctx = useSheFormItemContext();

  // ==================================================================== SIDE EFFECTS
  useEffect(() => {
    if (props && !_.isEqual(props, _props)) {
      setProps((oldProps: T): T => {
        oldProps = _.cloneDeep<T>(props);
        oldProps.field = oldProps.field || ctx.field;
        oldProps.form = oldProps.field || ctx.form;
        return oldProps;
      });
    }
  }, [props]);

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
    selectedValues?: V | V[],
  ): T[] {
    const values: V[] = !Array.isArray(selectedValues)
      ? [selectedValues]
      : selectedValues;

    items?.forEach(
      (item: T) => (item.isSelected = values?.includes(item.value)),
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
  function updateFormValue(value: any) {
    if (_props.field) {
      _props.field.onChange(value);
      void _props.form?.trigger(_props.field.name);
    }
  }

  function resetForm() {
    if (_props.field) {
      _props.form?.resetField?.(_props.field.name, {
        keepDirty: false,
        keepTouched: false,
        defaultValue: "",
      });
    }
  }

  function getFormMode(): ReactHookFormMode {
    return (
      (_props?.form?.control?._options?.mode as ReactHookFormMode) ||
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
    initializeItemsList,
    calculatePopoverWidth,
    getContextColorBasedOnVariant,
    updateFormValue,
    resetForm,
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
