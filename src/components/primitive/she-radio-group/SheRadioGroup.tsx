import React, { JSX, useEffect, useState } from "react";
import _ from "lodash";

import cs from "./SheRadioGroup.module.scss";
import { RadioGroup } from "@/components/ui/radio-group";
import SheRadioItem from "@/components/primitive/she-radio-group/components/she-radio-item/SheRadioItem.tsx";
import SheSkeleton from "@/components/primitive/she-skeleton/SheSkeleton.tsx";
import ShePrimitiveComponentWrapper from "@/components/primitive/she-primitive-component-wrapper/ShePrimitiveComponentWrapper.tsx";
import { ComponentViewEnum } from "@/const/enums/ComponentViewEnum.ts";
import { ISheRadioGroup } from "@/const/interfaces/primitive-components/ISheRadioGroup.ts";
import { ISheRadioItem } from "@/const/interfaces/primitive-components/ISheRadioItem.ts";
import useComponentUtilities from "@/utils/hooks/useComponentUtilities.ts";
import { getCustomProps } from "@/utils/helpers/props-helper.ts";
import {
  IShePrimitiveComponentWrapper,
  ShePrimitiveComponentWrapperDefaultModel,
} from "@/const/interfaces/primitive-components/IShePrimitiveComponentWrapper.ts";

export default function SheRadioGroup<T>(
  props: ISheRadioGroup<T>,
): JSX.Element {
  // ==================================================================== PROPS
  const {
    elemClassName = "",
    elemStyle,
    direction = "column",
    gap,
    name = "radioGroupNameDefault",
    selected,
    items,
    itemsView,
    disabled,
    isLoading,
    skeletonQuantity = 3,
    noDataMessage = "no data to show...",
    noDataMessageTransKey = "PLACE_VALID_TRANS_KEY",
    onValueChange,
  } = props;
  const shePrimitiveComponentWrapperProps = getCustomProps<
    ISheRadioGroup<T>,
    IShePrimitiveComponentWrapper
  >(props, ShePrimitiveComponentWrapperDefaultModel);

  // ==================================================================== STATE MANAGEMENT
  const [_items, setItems] = useState<ISheRadioItem<T>[]>(null);
  const [_selected, setSelected] = useState<any>(null);

  // ==================================================================== UTILITIES
  const { translate, ariaDescribedbyId } = useComponentUtilities({
    identifier: "SheRadioGroup",
  });

  // ==================================================================== SIDE EFFECTS
  useEffect(() => {
    if (!_.isNil(selected) && !_.isEqual(selected, _selected)) {
      setSelected(selected);
    }
  }, [selected]);

  useEffect(() => {
    if (items !== _items) setItems(_addItemsIds(items));
  }, [items]);

  // ==================================================================== EVENT HANDLERS
  function onValueChangeHandler(value) {
    if (value === _selected) return;

    setSelected(value);
    onValueChange?.(value);
  }

  function onClearHandler() {
    if (_selected !== null) {
      setSelected(null);
      onValueChange?.(null);
    }
  }

  // ==================================================================== PRIVATE

  function _addItemsIds(items: ISheRadioItem<T>[]) {
    return items?.map((item, idx) => {
      return {
        ...item,
        id: `${ariaDescribedbyId}_${idx.toString()}`,
      };
    });
  }

  // ==================================================================== RENDER

  return (
    <ShePrimitiveComponentWrapper
      {...shePrimitiveComponentWrapperProps}
      className={`${cs.sheRadioGroup} ${shePrimitiveComponentWrapperProps.className} ${itemsView === ComponentViewEnum.CARD ? cs.sheRadioGroupItemsCardView : ""}`}
      ariaDescribedbyId={ariaDescribedbyId}
      iconProps={{ className: `${cs.sheRadioGroupIcon}` }}
      iconPosition="out"
      clearBtnClassName={`${shePrimitiveComponentWrapperProps.clearBtnClassName} ${cs.sheRadioGroupClearButton}`}
      clearBtnPosition="out"
      clearBtnValue={_selected}
      onClear={onClearHandler}
    >
      <div className={cs.sheRadioGroupControl}>
        {_items && _items.length > 0 && (
          <RadioGroup
            className={`${elemClassName} ${cs.sheRadioGroupElement}`}
            style={
              {
                flexDirection: direction,
                gap: gap,
                ...elemStyle,
              } as React.CSSProperties
            }
            name={name}
            value={_selected}
            onValueChange={onValueChangeHandler}
          >
            {_items.map((item, idx) => (
              <SheRadioItem<T>
                key={item.id}
                ariaDescribedbyId={`${item.id}_${idx + 1}`}
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
          <div className={cs.sheRadioGroupPlaceholder}>
            <span className="she-placeholder">
              {translate(noDataMessageTransKey, noDataMessage)}
            </span>
          </div>
        )}
        {(!_items || _items.length === 0) && isLoading && (
          <div
            className={cs.sheRadioGroupRadioItemsSkeletons}
            style={
              {
                flexDirection: direction,
                gap: gap,
              } as React.CSSProperties
            }
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
      </div>
    </ShePrimitiveComponentWrapper>
  );
}
