import React, { JSX, useEffect, useState } from "react";
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

export default function SheSelect<T>(props: ISheSelect<T>): JSX.Element {
  // ==================================================================== PROPS
  const {
    triggerRef,
    popoverRef,
    id,
    className = "",
    style,
    elementClassName = "",
    elementStyle,
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
    openOnFocus,
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
  const _triggerRef = useDefaultRef<HTMLInputElement>(triggerRef);
  const _popoverRef = useDefaultRef<HTMLDivElement>(popoverRef);

  // ==================================================================== UTILITIES
  const {
    translate,
    ariaDescribedbyId,
    setFocus,
    initializeItemsList,
    getSelectedItems,
    updateSelectedItems,
    calculatePopoverWidth,
  } = useComponentUtilities({
    identifier: "SheSelect",
  });

  // ==================================================================== SIDE EFFECTS
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

    const initializedItems =
      initializeItemsList<ISheSelectItem<T>>(updatedItems);
    setItems(initializedItems);
    setSelected(getSelectedItems(initializedItems)[0]);

    if (isOpen && updatedItems?.length > 0) {
      requestAnimationFrame(() => {
        _setIsOpen(true);
      });
    }

    _updateFocusRelatedLogic();
  }, [items, selected]);

  useEffect(() => {
    if (
      !_.isNil(isOpen) &&
      typeof isOpen === "boolean" &&
      !_.isEqual(isOpen, _open)
    ) {
      _setIsOpen(isOpen);
    }

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
    _setIsOpen(value);
    if (!_loading && value && _selected) {
      requestAnimationFrame(() => {
        const selectedElement = document.getElementById(_selected.id);

        if (selectedElement) {
          selectedElement.scrollIntoView({ block: "start" });
        }
      });
    }
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

  function _setIsOpen(_isOpen: boolean) {
    if (isLoading || disabled) {
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
    if (openOnFocus) {
      _setIsOpen(autoFocus);
      setFocus<HTMLDivElement>(autoFocus, _popoverRef);
    } else {
      setFocus<HTMLInputElement>(autoFocus, _triggerRef);
    }
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
                ref={_triggerRef as any}
                className={`${elementClassName} ${_open ? cs.sheSelectOpen : ""}`}
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
                <SelectContent ref={_popoverRef}>
                  <div className={cs.sheSelectItemsContainer}>
                    {_items?.map((item, idx) => (
                      <SheSelectItem<T>
                        key={`${item.id}_${idx}`}
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
