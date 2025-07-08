import React, { JSX, useEffect, useRef, useState } from "react";
import _ from "lodash";

import cs from "./SheSelect.module.scss";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import {
  ISheSelect,
  SheSelectDefaultModel,
} from "@/const/interfaces/primitive-components/ISheSelect.ts";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import { SheLabel } from "@/components/primitive/she-label/SheLabel.tsx";
import SheSkeleton from "@/components/primitive/she-skeleton/SheSkeleton.tsx";
import { SheClearButton } from "@/components/primitive/she-clear-button/SheClearButton.tsx";
import SheSelectItem from "@/components/primitive/she-select/components/she-select-item/SheSelectItem.tsx";
import useDefaultRef from "@/utils/hooks/useDefaultRef.ts";
import useComponentUtilities from "@/utils/hooks/useComponentUtilities.ts";
import { getCustomProps } from "@/utils/helpers/props-helper.ts";
import { ISheOption } from "@/const/interfaces/primitive-components/ISheOption.ts";

export default function SheSelect<T>(props: ISheSelect<T>): JSX.Element {
  // ==================================================================== PROPS
  const {
    id,
    className = "",
    style,
    elementClassName = "",
    elementStyle,
    triggerRef,
    label,
    labelTransKey,
    placeholder = "select item...",
    placeholderTransKey = "PLACE_VALID_TRANS_KEY",
    icon,
    selected,
    items,
    showClearBtn,
    hideFirstOption,
    tooltip,
    minWidth,
    maxWidth,
    fullWidth,
    required,
    disabled,
    isLoading,
    isOpen,
    showSelectIcon,
    autoFocus,
    onOpen,
    onSelect,
    onSelectModel,
  } = props;
  const sheSelectProps = getCustomProps<ISheSelect<T>, ISheSelect<T>>(
    props,
    SheSelectDefaultModel,
  );

  // ==================================================================== STATE MANAGEMENT
  const [_items, setItems] = useState<ISheSelectItem<T>[]>(null);
  const [_selected, setSelected] = useState<ISheSelectItem<T>>(null);
  const [_open, setOpen] = useState<boolean>(null);
  const [_loading, setLoading] = useState<boolean>(null);

  // ==================================================================== REFS
  // TODO ---------------------------------------------- all ref-s need to be in props and use "useDefaultRef" logic
  const _triggerRef = useDefaultRef<HTMLInputElement>(triggerRef);
  const popoverRef = useRef<HTMLDivElement>(null);

  // ==================================================================== UTILITIES FUNCTIONS
  const {
    ariaDescribedbyId,
    isItemsWithIcons,
    isItemsWithColors,
    translate,
    updateSelectedItems,
    setFocus,
    addItemsId,
    calculatePopoverWidth,
  } = useComponentUtilities<T, ISheOption<T>>({
    identifier: "SheSelect",
    items: _items,
  });

  // ==================================================================== DEPENDENCIES
  useEffect(() => {
    let updatedItems = [...(items || [])];

    if (!hideFirstOption) {
      const firstIsNotSelected =
        updatedItems.length === 0 || updatedItems[0].text !== "not selected";

      if (firstIsNotSelected) {
        updatedItems.unshift({
          className: cs.sheSelectItemNotSelected,
          text: "not selected",
          textTransKey: "not_selected",
          value: null,
        });
      }
    }

    const itemsWithIds = addItemsId<ISheSelectItem<T>>(updatedItems);

    setItems(itemsWithIds);

    const selectedItem = _getSelectedItemByIdentifier(
      selected,
      "value",
      itemsWithIds,
    );
    const resolved = selectedItem?.id
      ? _getSelectedItemById(selectedItem.id, itemsWithIds)
      : _getSelectedItemFromCollection(itemsWithIds);

    setSelected(resolved);

    if (isOpen && updatedItems?.length > 0) {
      requestAnimationFrame(() => {
        setOpen(true);
      });
    }

    setFocus<HTMLInputElement>(autoFocus, _triggerRef);
  }, [items, selected]);

  useEffect(() => {
    if (isLoading) {
      setOpen(false);
    } else if (typeof isOpen === "boolean") {
      setOpen(isOpen);
    }

    if (typeof isLoading === "boolean" && isLoading !== _loading) {
      setLoading(isLoading);
    }

    calculatePopoverWidth<HTMLInputElement>(popoverRef, _triggerRef);
  }, [isOpen, isLoading]);

  useEffect(() => {
    setFocus<HTMLInputElement>(autoFocus, _triggerRef);
  }, [autoFocus]);

  // ==================================================================== EVENT
  function onValueChangeHandler(id: string, event?: React.MouseEvent) {
    const selected: ISheSelectItem<T> = _getSelectedItemById(id);

    if (selected) {
      selected.isSelected = true;
      const tmpItems = updateSelectedItems<ISheSelectItem<T>, T>(
        _items,
        selected.value,
      );
      setItems(tmpItems);
      onSelect?.(selected.value);
      onSelectModel?.({
        value: selected.value,
        model: { ...sheSelectProps, items: tmpItems, selected: selected.value },
        event,
      });
    } else {
      onSelect?.(null);
      onSelectModel?.(null);
    }

    setSelected(selected);
  }

  function onOpenChangeHandler(value: boolean) {
    if (_loading) return;

    setOpen(value);

    if (value && _selected) {
      requestAnimationFrame(() => {
        const selectedElement = document.getElementById(_selected.id);

        if (selectedElement) {
          selectedElement.scrollIntoView({ block: "start" });
        }
      });
    }

    onOpen?.(value);
    calculatePopoverWidth<HTMLInputElement>(popoverRef, _triggerRef);
  }

  function onClearHandler() {
    setSelected(null);
    onSelect?.(null);
    onSelectModel?.(null);
    setFocus<HTMLInputElement>(true, _triggerRef);
  }

  // ==================================================================== PRIVATE
  function _getSelectedItemById(
    id: string,
    fromItems: ISheSelectItem<T>[] = _items,
  ): ISheSelectItem<T> {
    if (!id) return null;

    const selected = _getSelectedItemByIdentifier(id, "id", fromItems);

    if (selected && selected.value) {
      setItems(
        fromItems.map((item) => {
          item.isSelected = item.value === selected.value;
          return item;
        }),
      );
      return selected;
    } else {
      return null;
    }
  }

  function _getSelectedItemByIdentifier(
    data: any,
    identifier: string,
    fromItems: ISheSelectItem<T>[],
  ): ISheSelectItem<T> {
    if (!data || !identifier || !fromItems || fromItems.length === 0)
      return null;

    return fromItems.find((item) => item[identifier] == data);
  }

  function _getSelectedItemFromCollection(
    fromItems: ISheSelectItem<T>[],
  ): ISheSelectItem<T> {
    if (!fromItems || fromItems.length === 0) return null;

    let selectedItem: ISheSelectItem<T> = null;

    setItems(
      fromItems.map((item) => {
        if (!selectedItem && item.isSelected) {
          selectedItem = item;
        } else if (selectedItem && item.isSelected) {
          item.isSelected = false;
        }

        return item;
      }),
    );

    return selectedItem;
  }

  // ==================================================================== LAYOUT
  return (
    <div
      id={id}
      className={`${cs.sheSelect} ${className} ${icon ? cs.withIcon : ""} ${fullWidth ? cs.fullWidth : ""} ${required ? cs.required : ""}`}
      style={{
        minWidth,
        maxWidth,
        ...style,
      }}
    >
      <div className={cs.sheSelectComponent}>
        <SheLabel
          label={label}
          labelTransKey={labelTransKey}
          tooltip={tooltip}
          ariaDescribedbyId={ariaDescribedbyId}
        />
        <div className={cs.sheSelectControl}>
          <SheSkeleton
            className={cs.sheSelectSkeleton}
            isLoading={isLoading}
            fullWidth
          >
            <Select
              value={_selected?.id ?? ""}
              open={_open}
              disabled={disabled || _loading || !items || items.length === 0}
              onOpenChange={onOpenChangeHandler}
              onValueChange={onValueChangeHandler}
              {...sheSelectProps}
            >
              <SelectTrigger
                ref={_triggerRef}
                className={elementClassName}
                style={elementStyle}
              >
                <SheIcon
                  icon={icon}
                  className={cs.iconBlock}
                  aria-describedby={ariaDescribedbyId}
                />
                <SelectValue
                  placeholder={translate(placeholderTransKey, placeholder)}
                />
              </SelectTrigger>
              {_items?.length > 0 && (
                <SelectContent ref={popoverRef}>
                  <div className={cs.sheSelectItemsContainer}>
                    {_items?.map((item) => (
                      <SheSelectItem<T>
                        {...item}
                        key={item.id}
                        id={item.id}
                        className={`${cs.sheSelectItemCover} ${item.className || ""}`}
                        iconClassName={`${cs.sheSelectItemIconContainer} ${item.iconClassName || ""}`}
                        colorsClassName={`${cs.sheSelectItemColorsContainer} ${item.colorsClassName || ""}`}
                        infoClassName={`${cs.sheSelectItemInfoContainer} ${item.infoClassName || ""}`}
                        tooltipClassName={`${cs.sheSelectItemTooltipContainer} ${item.tooltipClassName || ""}`}
                        showSelectIcon={showSelectIcon}
                        showIconsColumn={isItemsWithIcons}
                        showColorsColumn={isItemsWithColors}
                        ariaDescribedbyId={ariaDescribedbyId}
                        isLoading={
                          !_.isNil(item.isLoading) ? item.isLoading : _loading
                        }
                      />
                    ))}
                  </div>
                </SelectContent>
              )}
            </Select>
          </SheSkeleton>
          <SheClearButton
            value={_selected}
            showClearBtn={showClearBtn}
            disabled={disabled}
            isLoading={isLoading}
            ariaDescribedbyId={ariaDescribedbyId}
            onClear={onClearHandler}
          />
        </div>
      </div>
    </div>
  );
}
