import React, { JSX, useEffect, useState } from "react";
import { Trans } from "react-i18next";
import { X } from "lucide-react";

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
import cs from "./SheSelect.module.scss";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";
import SheTooltip from "@/components/complex/she-tooltip/SheTooltip.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { isSheIconConfig } from "@/utils/helpers/quick-helper.ts";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";

export default function SheSelect({
  className,
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
    if (typeof isOpen === "boolean") {
      setOpen(isOpen);
    }
  }, [isOpen]);

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

  return (
    <div
      className={`${className || ""} ${cs.sheSelect || ""} ${icon ? cs.withIcon : ""} ${fullWidth ? cs.fullWidth : ""} ${required ? cs.required : ""}`}
      style={{
        minWidth,
        maxWidth,
      }}
    >
      <SheTooltip {...tooltip}>
        <div className={cs.sheSelectComponent}>
          {label && (
            <label className="she-text">
              <Trans i18nKey={labelTransKey}>{label}</Trans>
            </label>
          )}
          <div className={cs.sheSelectControl}>
            <Select
              {...props}
              value={_selected?.id ?? ""}
              disabled={disabled || isLoading || !items || items.length === 0}
              open={_open}
              onOpenChange={(val) => {
                setOpen(val);
                if (onOpenChange) onOpenChange(val);
              }}
              onValueChange={(id) => onChangeHandler(id)}
            >
              <SelectTrigger>
                {icon &&
                  (isSheIconConfig(icon) ? (
                    <SheIcon {...icon} className={cs.iconBlock} />
                  ) : (
                    <SheIcon icon={icon} className={cs.iconBlock} />
                  ))}
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
                      className={`${cs.sheSelectItem} ${isLoading ? "disabled" : ""}`}
                      key={item.id}
                      value={item.id}
                      disabled={item.disabled}
                    >
                      <div>
                        <span className="she-text">
                          {translate(item.textTransKey, item.text)}
                        </span>
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
            {showClearBtn && (
              <SheButton
                variant="ghost"
                size="icon"
                icon={X}
                disabled={!_selected}
                onClick={onClearHandler}
              />
            )}
          </div>
        </div>
      </SheTooltip>
    </div>
  );
}
