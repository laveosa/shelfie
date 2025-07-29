import React, { JSX, useEffect, useState } from "react";
import _ from "lodash";

import cs from "./SheRadioGroup.module.scss";
import { RadioGroup } from "@/components/ui/radio-group";
import { ISheRadioGroup } from "@/const/interfaces/primitive-components/ISheRadioGroup.ts";
import { generateId } from "@/utils/helpers/quick-helper.ts";
import SheLabel from "@/components/primitive/she-label/SheLabel.tsx";
import SheClearButton from "@/components/primitive/she-clear-button/SheClearButton.tsx";
import { ISheRadioItem } from "@/const/interfaces/primitive-components/ISheRadioItem.ts";
import SheRadioItem from "@/components/primitive/she-radio-group/components/she-radio-item/SheRadioItem.tsx";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";
import SheSkeleton from "@/components/primitive/she-skeleton/SheSkeleton.tsx";

export default function SheRadioGroup({
  id,
  className = "",
  style,
  elemClassName = "",
  elemStyle,
  direction = "column",
  gap,
  label,
  labelTransKey,
  tooltip,
  icon,
  name = "radioGroupNameDefault",
  selected,
  items,
  itemsView,
  view,
  loop,
  showClearBtn,
  minWidth,
  maxWidth,
  fullWidth,
  disabled,
  isLoading,
  skeletonQuantity = 3,
  required,
  noDataMessage = "no data to show...",
  noDataMessageTransKey = "PLACE_VALID_TRANS_KEY",
  onValueChange,
  ...props
}: ISheRadioGroup): JSX.Element {
  const { translate } = useAppTranslation();
  const [_selected, setSelected] = useState<any>(null);
  const [_items, setItems] = useState<ISheRadioItem[]>(null);

  const ariaDescribedbyId = `${generateId()}_RADIO_GROUP_ID`;

  useEffect(() => {
    if (!_.isNil(selected) && !_.isEqual(selected, _selected)) {
      setSelected(selected);
    }
  }, [selected]);

  useEffect(() => {
    if (items !== _items) setItems(_addItemsIds(items));
  }, [items]);

  // ==================================================================== EVENT

  function onValueChangeHandler(value) {
    if (value === _selected) return;

    setSelected(value);
    if (onValueChange) onValueChange(value);
  }

  function onClearHandler() {
    if (_selected !== null) {
      setSelected(null);
      onValueChange?.(null);
    }
  }

  // ==================================================================== PRIVATE

  function _addItemsIds(items: ISheRadioItem[]) {
    return items?.map((item, idx) => {
      return {
        ...item,
        id: `${ariaDescribedbyId}_${idx.toString()}`,
      };
    });
  }

  // ==================================================================== RENDER

  return (
    <div
      id={id}
      className={`${cs.sheRadioGroup} ${className} ${icon ? cs.withIcon : ""} ${fullWidth ? cs.fullWidth : ""} ${required ? cs.required : ""}  ${view ? cs[view] : ""}`}
      style={{
        minWidth,
        maxWidth,
        ...style,
      }}
    >
      <div className={cs.sheRadioGroupComponent}>
        <SheLabel
          label={label}
          labelTransKey={labelTransKey}
          tooltip={tooltip}
          ariaDescribedbyId={ariaDescribedbyId}
        />
        <div className={cs.sheRadioGroupControl}>
          {_items && _items.length > 0 && (
            <RadioGroup
              className={`${elemClassName} ${cs.sheRadioGroupElement}`}
              style={{
                flexDirection: direction,
                gap: gap,
                ...elemStyle,
              }}
              name={name}
              value={_selected}
              onValueChange={onValueChangeHandler}
              {...props}
            >
              {_items.map((item, idx) => (
                <SheRadioItem
                  key={item.id}
                  ariaDescribedbyId={`${item.id}_${idx + 1}`}
                  icon={!_.isNil(item.icon) ? item.icon : icon}
                  isLoading={
                    !_.isNil(item.isLoading) ? item.isLoading : isLoading
                  }
                  disabled={!_.isNil(item.disabled) ? item.disabled : disabled}
                  view={item.view ?? itemsView}
                  {...item}
                />
              ))}
            </RadioGroup>
          )}
          {(!_items || _items.length === 0) && !isLoading && (
            <div>
              <span className="she-placeholder">
                {translate(noDataMessageTransKey, noDataMessage)}
              </span>
            </div>
          )}
          {(!_items || _items.length === 0) && isLoading && (
            <div
              className={cs.sheRadioGroupRadioItemsSkeletons}
              style={{
                flexDirection: direction,
                gap: gap,
              }}
            >
              {[...Array(skeletonQuantity)].map((_, idx) => (
                <div key={idx + 1} className={cs.radioItemSkeletonBlock}>
                  <SheSkeleton
                    skeletonClassName={cs.radioItemTriggerSkeleton}
                    isLoading={isLoading}
                  />
                  <SheSkeleton
                    skeletonClassName={cs.radioItemContextSkeleton}
                    isLoading={isLoading}
                  />
                </div>
              ))}
            </div>
          )}
          {_items && _items.length > 0 && (
            <SheClearButton
              clearBtnValue={selected}
              showClearBtn={showClearBtn}
              disabled={disabled}
              isLoading={isLoading}
              ariaDescribedbyId={ariaDescribedbyId}
              onClear={onClearHandler}
            />
          )}
        </div>
      </div>
    </div>
  );
}
