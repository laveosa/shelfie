import React, { JSX, useEffect, useState } from "react";

import cs from "./SheSelect.module.scss";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import {
  ISheSelect,
  ISheSelectItem,
} from "@/const/interfaces/primitive-components/ISheSelect.ts";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";
import { generateId } from "@/utils/helpers/quick-helper.ts";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import { SheLabel } from "@/components/primitive/she-label/SheLabel.tsx";
import SheSkeleton from "@/components/primitive/she-skeleton/SheSkeleton.tsx";
import { SheClearButton } from "@/components/primitive/she-clear-button/SheClearButton.tsx";

export default function SheSelect({
  id,
  className = "",
  style,
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
  onOpenChange,
  onSelect,
  ...props
}: ISheSelect): JSX.Element {
  const { translate } = useAppTranslation();
  const [_selected, setSelected] = useState<ISheSelectItem>(null);
  const [_items, setItems] = useState<ISheSelectItem[]>(_addItemsIds(null));
  const [_open, setOpen] = useState<boolean>(null);
  const [_loading, setLoading] = useState<boolean>(null);

  const ariaDescribedbyId = `${generateId()}_SELECT_ID`;

  useEffect(() => {
    let updatedItems = [...(items || [])];

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

  function onChangeHandler(id: string) {
    setSelected(() => {
      const selected = _getSelectedItemById(id);

      if (onSelect) {
        onSelect(selected ? selected.value : null);
      }

      return selected;
    });
  }

  function onClearHandler() {
    setSelected(null);

    if (onSelect) {
      onSelect(null);
    }
  }

  // ==================================================================== PRIVATE

  function _addItemsIds(items: ISheSelectItem[]) {
    return items?.map((item, idx) => ({
      ...item,
      id: item.text.replace(/ /g, "_") + idx.toString(),
    }));
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
              {...props}
              value={_selected?.id ?? ""}
              disabled={disabled || _loading || !items || items.length === 0}
              open={_open}
              onOpenChange={(val) => {
                if (_loading) return;
                setOpen(val);
                if (onOpenChange) onOpenChange(val);
              }}
              onValueChange={(id) => onChangeHandler(id)}
            >
              <SelectTrigger>
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
                    <SelectItem
                      key={item.id}
                      className={`${cs.sheSelectItem} ${_loading ? "disabled" : ""}`}
                      value={item.id}
                      disabled={item.disabled}
                    >
                      <div>
                        <span className="she-text">
                          {translate(item.textTransKey, item.text)}
                        </span>
                        {/*// TODO add logic that will display description only in select items*/}
                        {item.description && (
                          <span className="she-subtext">
                            {translate(
                              item.descriptionTransKey,
                              item.description,
                            )}
                          </span>
                        )}
                      </div>
                    </SelectItem>
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
