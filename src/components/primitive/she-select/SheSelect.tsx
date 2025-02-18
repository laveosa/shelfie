import React, { useEffect, useState } from "react";
import { Trans } from "react-i18next";
import { X } from "lucide-react";
import _ from "lodash";

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
  showFirstOption = true,
  tooltip,
  minWidth,
  maxWidth,
  fullWidth,
  required,
  disabled,
  isLoading,
  onSelect,
  ...props
}: ISheSelect): React.ReactNode {
  const { translate } = useAppTranslation();
  const [_selected, setSelected] = useState<ISheSelectItem>(selected || null);
  const [_items, setItems] = useState<ISheSelectItem[]>(_addItemsIds(items));

  useEffect(() => {
    if (showFirstOption) {
      items?.unshift({
        value: null,
        text: "not selected",
        textTransKey: "not_selected",
      });
    }

    setItems(_addItemsIds(items));
  }, [items]);

  useEffect(() => {
    setSelected(selected);

    if (selected && _items) {
      onChangeHandler(
        _getSelectedItemByIdentifier(selected, "value", _items).id,
      );
    }
  }, [selected]);

  // ==================================================================== EVENT

  function onChangeHandler(id: string | null) {
    let selected = id ? _getSelectedItemByIdentifier(id, "id", _items) : null;
    selected = selected.value ? selected : null;
    setSelected(selected);
    onSelect(selected ? selected.value : null);
  }

  function onClearHandler() {
    setSelected(null);
    onSelect(null);
  }

  // ==================================================================== PRIVATE

  function _addItemsIds(items: ISheSelectItem[]) {
    return items?.map((item, idx) => ({
      ...item,
      id: item.text.replace(/ /g, "_") + idx.toString(),
    }));
  }

  function _getSelectedItemByIdentifier(
    data: any,
    identifier: string,
    items: ISheSelectItem[],
  ): ISheSelectItem {
    return items?.find((item) => item[identifier] === data);
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
              onValueChange={(id) => onChangeHandler(id)}
            >
              <SelectTrigger>
                {icon && <div className={cs.iconBlock}>{icon}</div>}
                <SelectValue
                  placeholder={
                    placeholder
                      ? translate(placeholderTransKey, placeholder)
                      : "select item..."
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {_items?.map((item: ISheSelectItem) => (
                  <SelectItem
                    className={cs.sheSelectItem}
                    key={item.id}
                    value={item.id}
                    disabled={item.disabled}
                  >
                    <span className="she-text">
                      {translate(item.textTransKey, item.text)}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {showClearBtn && (
              <SheButton
                variant="ghost"
                size="icon"
                disabled={!_selected}
                onClick={onClearHandler}
              >
                <X />
              </SheButton>
            )}
          </div>
        </div>
      </SheTooltip>
    </div>
  );
}
