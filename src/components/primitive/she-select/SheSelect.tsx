import React, { JSX, useEffect, useRef, useState } from "react";
import _ from "lodash";

import cs from "./SheSelect.module.scss";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import SheSelectItem from "@/components/primitive/she-select/components/she-select-item/SheSelectItem.tsx";
import useDefaultRef from "@/utils/hooks/useDefaultRef.ts";
import useComponentUtilities from "@/utils/hooks/useComponentUtilities.ts";
import useValueWithEvent from "@/utils/hooks/useValueWithEvent.ts";
import ShePrimitiveComponentWrapper from "@/components/primitive/she-primitive-component-wrapper/ShePrimitiveComponentWrapper.tsx";
import { generateSafeItemId } from "@/utils/helpers/quick-helper.ts";
import { getCustomProps } from "@/utils/helpers/props-helper.ts";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";
import {
  ISheSelect,
  SheSelectDefaultModel,
} from "@/const/interfaces/primitive-components/ISheSelect.ts";
import {
  IShePrimitiveComponentWrapper,
  ShePrimitiveComponentWrapperDefaultModel,
} from "@/const/interfaces/primitive-components/IShePrimitiveComponentWrapper.ts";

export default function SheSelect<T>(props: ISheSelect<T>): JSX.Element {
  // ==================================================================== PROPS
  const {
    triggerRef,
    popoverRef,
    elementClassName = "",
    elementStyle,
    placeholder = "select item...",
    placeholderTransKey = "PLACE_VALID_TRANS_KEY",
    selected,
    items,
    hideFirstOption,
    disabled,
    isLoading,
    isOpen,
    showSelectIcon,
    autoFocus,
    openOnFocus,
    showHighlighted,
    onOpen,
    onSelect,
    onTriggerKeyDown,
  } = props;
  const sheSelectProps = getCustomProps<ISheSelect<T>, ISheSelect<T>>(
    props,
    SheSelectDefaultModel,
  );
  const shePrimitiveComponentWrapperProps = getCustomProps<
    ISheSelect<T>,
    IShePrimitiveComponentWrapper
  >(props, ShePrimitiveComponentWrapperDefaultModel);

  // ==================================================================== STATE MANAGEMENT
  const [_items, setItems] = useState<ISheSelectItem<T>[]>(null);
  const [_selected, setSelected] = useState<ISheSelectItem<T>>(null);
  const [_open, setOpen] = useState<boolean>(null);
  const [_loading, setLoading] = useState<boolean>(null);
  const [_isHighlighted, setIsHighlighted] = useState<boolean>(null);

  // ==================================================================== REFS
  const _triggerRef = useDefaultRef<HTMLInputElement>(triggerRef);
  const _popoverRef = useDefaultRef<HTMLDivElement>(popoverRef);
  const _sourceValue = useRef<T>(null);

  // ==================================================================== UTILITIES
  const {
    translate,
    ariaDescribedbyId,
    setFocus,
    initializeItemsList,
    updateSelectedItems,
    getItemFromListByIdentifier,
    calculatePopoverWidth,
  } = useComponentUtilities({
    identifier: "SheSelect",
  });

  const { eventHandler, valueHandler } = useValueWithEvent<
    React.MouseEvent | React.KeyboardEvent,
    string
  >(onValueChangeHandler);

  // ==================================================================== SIDE EFFECTS
  useEffect(() => {
    const newItems = initializeItemsList<T, ISheSelectItem<T>>([
      ...(items || []),
    ]);
    // ----------------------------------- GET ALL SELECTED ITEMS FROM THE LIST
    const listSelected: ISheSelectItem<T>[] = newItems?.filter(
      (item) => item.isSelected,
    );
    // ----------------------------------- SET SELECTED ITEM
    let tmpSelected: ISheSelectItem<T> = getItemFromListByIdentifier(
      newItems,
      "value",
      selected,
    );

    if (!tmpSelected && listSelected && listSelected.length > 0)
      tmpSelected = listSelected[0];
    // ----------------------------------- ADD NOT SELECTED ITEM
    if (!hideFirstOption) {
      const firstIsNotSelected =
        newItems.length === 0 || newItems[0].text !== "not selected";

      if (firstIsNotSelected) {
        newItems.unshift({
          id: generateSafeItemId("not selected", 0),
          className: cs.sheSelectItemNotSelected,
          text: "not selected",
          textTransKey: "not_selected",
          value: null,
        });
      }
    }
    // ----------------------------------- SET UPDATED ITEMS
    if (!_.isEqual(newItems, _items)) {
      setItems(newItems);
    } else {
      setItems(updateSelectedItems(_items, tmpSelected));
    }
    // ----------------------------------- SET SELECTED
    if (!_.isEqual(tmpSelected, _selected)) setSelected(tmpSelected);
    setIsHighlighted(false);
    _sourceValue.current = tmpSelected?.value;
    // ----------------------------------- UPDATE FOCUS CONDITION
    _updateFocusRelatedLogic();
  }, [items, selected]);

  useEffect(() => {
    // ----------------------------------- SET IS OPEN
    if (
      !_.isNil(isOpen) &&
      typeof isOpen === "boolean" &&
      !_.isEqual(isOpen, _open)
    ) {
      _setIsOpen(isOpen);
    }
    // ----------------------------------- SET IS LOADING
    if (
      !_.isNil(isLoading) &&
      typeof isLoading === "boolean" &&
      !_.isEqual(isLoading, _loading)
    ) {
      setLoading(isLoading);
      _setIsOpen(isOpen);
    }
  }, [isOpen, isLoading]);

  useEffect(() => {
    _updateFocusRelatedLogic();
  }, [autoFocus]);

  // ==================================================================== EVENT HANDLERS
  function onValueChangeHandler(
    id: string,
    event?: React.MouseEvent | React.KeyboardEvent,
  ) {
    const selected: ISheSelectItem<T> = _.cloneDeep(
      getItemFromListByIdentifier<ISheSelectItem<T>, string>(items, "id", id),
    );

    if (selected) {
      selected.isSelected = true;
      const tmpItems = updateSelectedItems<ISheSelectItem<T>, T>(
        _items,
        selected.value,
      );
      setItems(tmpItems);
      setIsHighlighted(!_.isEqual(_sourceValue.current, selected.value));
      onSelect?.(selected.value, {
        value: selected.value,
        model: { ...props, items: tmpItems, selected: selected.value },
        event,
      });
      setSelected(selected);
    }
  }

  function onOpenChangeHandler(value: boolean) {
    if (!_loading && value && _selected) {
      requestAnimationFrame(() => {
        const selectedElement = document.getElementById(_selected.id);

        if (selectedElement) {
          selectedElement.scrollIntoView({ block: "start" });
        }
      });
    }

    setTimeout(() => _setIsOpen(value));
  }

  function onClearHandler(event: React.MouseEvent | React.KeyboardEvent) {
    const tmpItems = updateSelectedItems<ISheSelectItem<T>, T>(_items);
    setItems(tmpItems);
    setSelected(null);
    onSelect?.(null, {
      value: null,
      model: { ...props, items: tmpItems, selected: null },
      event,
    });
    setFocus<HTMLInputElement>(true, _triggerRef);
  }

  // ==================================================================== PRIVATE
  function _setIsOpen(_isOpen: boolean) {
    if (isLoading || disabled || !items || items.length === 0) {
      setOpen(false);
      onOpen?.(false);
    } else if (!_.isEqual(_isOpen, _open)) {
      setOpen(_isOpen);
      onOpen?.(_isOpen);

      if (_isOpen) {
        calculatePopoverWidth<HTMLInputElement>(_popoverRef, _triggerRef);
      } else {
        setFocus<HTMLInputElement>(autoFocus, _triggerRef);
      }
    }
  }

  function _updateFocusRelatedLogic() {
    if (!items || items.length === 0) return;

    if (openOnFocus || isOpen) {
      _setIsOpen(isOpen ?? autoFocus);
      setFocus<HTMLDivElement>(autoFocus, _popoverRef);
    } else {
      setFocus<HTMLInputElement>(autoFocus, _triggerRef);
    }
  }

  // ==================================================================== LAYOUT
  return (
    <ShePrimitiveComponentWrapper
      {...shePrimitiveComponentWrapperProps}
      className={`${cs.sheSelect} ${shePrimitiveComponentWrapperProps.className} ${showHighlighted && _isHighlighted ? cs.highlighted : ""}`}
      ariaDescribedbyId={ariaDescribedbyId}
      clearBtnValue={_selected}
      onClear={onClearHandler}
      onKeyDown={onTriggerKeyDown}
    >
      <Select
        value={_selected?.id ?? ""}
        open={_open}
        disabled={disabled || _loading || !items || items.length === 0}
        onOpenChange={onOpenChangeHandler}
        onValueChange={(value) => {
          if (value !== _selected?.id) {
            setTimeout(() => valueHandler(value));
          }
        }}
        {...sheSelectProps}
      >
        <SelectTrigger
          ref={_triggerRef as any}
          className={`${elementClassName} ${_open ? cs.sheSelectOpen : ""} componentTriggerElement`}
          style={elementStyle}
        >
          <SelectValue
            placeholder={translate(placeholderTransKey, placeholder)}
          />
        </SelectTrigger>
        {_items?.length > 0 && (
          <SelectContent ref={_popoverRef}>
            <div className={cs.sheSelectItemsContainer}>
              {_items?.map((item) => (
                <SheSelectItem<T>
                  key={item.id}
                  {...item}
                  id={item.id}
                  className={`${cs.sheSelectItemCover} ${item.className || ""}`}
                  iconClassName={`${cs.sheSelectItemIconContainer} ${item.iconClassName || ""}`}
                  colorsClassName={`${cs.sheSelectItemColorsContainer} ${item.colorsClassName || ""}`}
                  infoClassName={`${cs.sheSelectItemInfoContainer} ${item.infoClassName || ""}`}
                  tooltipClassName={`${cs.sheSelectItemTooltipContainer} ${item.tooltipClassName || ""}`}
                  showSelectIcon={showSelectIcon}
                  ariaDescribedbyId={ariaDescribedbyId}
                  isLoading={
                    !_.isNil(item.isLoading) ? item.isLoading : _loading
                  }
                  onCheck={(event) => eventHandler(event.event)}
                />
              ))}
            </div>
          </SelectContent>
        )}
      </Select>
    </ShePrimitiveComponentWrapper>
  );
}
