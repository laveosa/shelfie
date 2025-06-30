import React, { JSX, useEffect, useState } from "react";
import _ from "lodash";

import cs from "./SheSelect.module.scss";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { ISheSelect } from "@/const/interfaces/primitive-components/ISheSelect.ts";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";
import { generateId } from "@/utils/helpers/quick-helper.ts";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import { SheLabel } from "@/components/primitive/she-label/SheLabel.tsx";
import SheSkeleton from "@/components/primitive/she-skeleton/SheSkeleton.tsx";
import { SheClearButton } from "@/components/primitive/she-clear-button/SheClearButton.tsx";
import SheSelectItem from "@/components/primitive/she-select/components/she-select-item/SheSelectItem.tsx";

export default function SheSelect<T>({
  id,
  className = "",
  style,
  elementClassName = "",
  elementStyle,
  triggerRef,
  label,
  labelTransKey,
  placeholder,
  placeholderTransKey,
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
  onOpenChange,
  onSelect,
  onSelectModel,
  ...props
}: ISheSelect<T>): JSX.Element {
  const { translate } = useAppTranslation();
  const [_selected, setSelected] = useState<ISheSelectItem<T>>(null);
  const [_items, setItems] = useState<ISheSelectItem<T>[]>(_addItemsIds(null));
  const [_open, setOpen] = useState<boolean>(null);
  const [_loading, setLoading] = useState<boolean>(null);
  const [_isItemsWithIcons, setIsItemsWithIcons] = useState<boolean>(null);
  const [_isItemsWithColors, setIsItemsWithColors] = useState<boolean>(null);

  const ariaDescribedbyId = `${generateId()}_SELECT_ID`;

  useEffect(() => {
    let updatedItems = [...(items || [])];
    setIsItemsWithIcons(null);
    setIsItemsWithColors(null);

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

    const itemsWithIds = _addItemsIds(updatedItems);
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
  }, [isOpen, isLoading]);

  // ==================================================================== EVENT

  function onValueChangeHandler(id: string, _event?: React.MouseEvent) {
    setSelected(() => {
      const selected = _getSelectedItemById(id);

      if (selected) {
        selected.isSelected = true;
        setSelectedItemInCollection(selected.value);
        onSelect?.(selected?.value);
        onSelectModel?.({
          value: selected?.value,
          model: selected,
          event: _event,
        });
      } else {
        onSelect?.(null);
        onSelectModel?.(null);
      }

      return selected;
    });
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

    onOpenChange?.(value);
  }

  function onClearHandler() {
    setSelected(null);
    onSelect?.(null);
    onSelectModel?.(null);
  }

  // ==================================================================== PRIVATE

  function _addItemsIds(items: ISheSelectItem<T>[]) {
    return items?.map((item, idx) => {
      if (item.icon) setIsItemsWithIcons(true);
      if (item.colors) setIsItemsWithColors(true);

      return {
        ...item,
        id: `${
          item.text && item.text.length > 0
            ? item.text.replace(/ /g, "_")
            : "selectOption_"
        }_${(idx + 1).toString()}`,
      };
    });
  }

  function setSelectedItemInCollection(value: T) {
    if (!_items || _items.length === 0 || _.isNull(value)) return;
    setItems(
      _items.map((item) => {
        item.isSelected = item.value === value;
        return item;
      }),
    );
  }

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
              {...props}
            >
              <SelectTrigger
                ref={triggerRef}
                className={elementClassName}
                style={elementStyle}
              >
                <SheIcon
                  icon={icon}
                  className={cs.iconBlock}
                  aria-describedby={ariaDescribedbyId}
                />
                <SelectValue
                  placeholder={
                    placeholder
                      ? translate(placeholderTransKey, placeholder)
                      : "select item..."
                  }
                />
              </SelectTrigger>
              {_items?.length > 0 && (
                <SelectContent>
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
                        showIconsColumn={_isItemsWithIcons}
                        showColorsColumn={_isItemsWithColors}
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
