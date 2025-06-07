import React, { JSX, useEffect, useState } from "react";

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
import SheSelectItem from "@/components/primitive/she-select-item/SheSelectItem.tsx";

export default function SheSelect({
  id,
  className = "",
  style,
  elemClassName = "",
  elemStyle,
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
  selectedColor,
  onTriggerKeyDown,
  onOpenChange,
  onSelect,
  ...props
}: ISheSelect): JSX.Element {
  const { translate } = useAppTranslation();
  const [_selected, setSelected] = useState<ISheSelectItem>(null);
  const [_items, setItems] = useState<ISheSelectItem[]>(_addItemsIds(null));
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
          value: null,
          text: "not selected",
          textTransKey: "not_selected",
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
      : null;

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

  function onValueChangeHandler(id: string) {
    setSelected(() => {
      const selected = _getSelectedItemById(id);

      if (onSelect) {
        setTimeout(() => {
          onSelect(selected ? selected.value : null);
        });
      }

      return selected;
    });
  }

  function onOpenChangeHandler(event) {
    if (_loading) return;
    setOpen(event);

    if (event && _selected) {
      requestAnimationFrame(() => {
        const selectedElement = document.getElementById(_selected.id);

        if (selectedElement) {
          selectedElement.scrollIntoView({ block: "start" });
        }
      });
    }

    if (onOpenChange) onOpenChange(event);
  }

  function onClearHandler() {
    setSelected(null);

    if (onSelect) {
      onSelect(null);
    }
  }

  // ==================================================================== PRIVATE

  function _addItemsIds(items: ISheSelectItem[]) {
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

  function _getSelectedItemById(
    id: string,
    fromItems: ISheSelectItem[] = _items,
  ): ISheSelectItem {
    if (!id) return null;

    const selected = _getSelectedItemByIdentifier(id, "id", fromItems);
    return selected?.value ? selected : null;
  }

  function _getSelectedItemByIdentifier(
    data: any,
    identifier: string,
    items: ISheSelectItem[],
  ): ISheSelectItem {
    if (!data || !identifier || !items || items.length === 0) return null;

    return items.find((item) => item[identifier] == data);
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
              <SelectTrigger ref={triggerRef} onKeyDown={onTriggerKeyDown}>
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
                  {_items?.map((item: ISheSelectItem) => (
                    <SheSelectItem
                      key={item.id}
                      id={item.id}
                      className={cs.sheSelectItemCover}
                      isLoading={_loading}
                      showSelectIcon={showSelectIcon}
                      isItemsWithIcons={_isItemsWithIcons}
                      isItemsWithColors={_isItemsWithColors}
                      ariaDescribedbyId={ariaDescribedbyId}
                      {...item}
                    />
                  ))}
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
