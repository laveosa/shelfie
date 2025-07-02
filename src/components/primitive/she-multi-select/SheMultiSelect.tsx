import { JSX, useEffect, useRef, useState } from "react";
import { Trans } from "react-i18next";
import * as React from "react";
import _ from "lodash";

import cs from "./SheMultiSelect.module.scss";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandList,
} from "@/components/ui/command";
import {
  getCustomProps,
  removeCustomProps,
} from "@/utils/helpers/props-helper.ts";
import { Popover, PopoverContent } from "@/components/ui/popover";
import {
  ISheMultiSelect,
  SheMultiSelectDefaultModel,
} from "@/const/interfaces/primitive-components/ISheMultiSelect.ts";
import SheMultiSelectTrigger from "@/components/primitive/she-multi-select/components/she-multi-select-trigger/SheMultiSelectTrigger.tsx";
import { addItemsId, generateId } from "@/utils/helpers/quick-helper.ts";
import { ISheMultiSelectItem } from "@/const/interfaces/primitive-components/ISheMultiSelectItem.ts";
import { ISheBadge } from "@/const/interfaces/primitive-components/ISheBadge.ts";
import SheMultiSelectItem from "@/components/primitive/she-multi-select/components/she-multi-select-item/SheMultiSelectItem.tsx";
import SheMultiSelectFooter from "@/components/primitive/she-multi-select/components/she-multi-select-footer/SheMultiSelectFooter.tsx";
import SheMultiSelectSearch from "@/components/primitive/she-multi-select/components/she-multi-select-search/SheMultiSelectSearch.tsx";
import {
  ISheMultiSelectSearch,
  SheMultiSelectSearchDefaultModel,
} from "@/const/interfaces/primitive-components/ISheMultiSelectSearch.ts";
import {
  ISheMultiSelectFooter,
  SheMultiSelectFooterDefaultModel,
} from "@/const/interfaces/primitive-components/ISheMultiSelectFooter.ts";

export default function SheMultiSelect<T>(
  props: ISheMultiSelect<T>,
): JSX.Element {
  const {
    popoverClassName = "",
    popoverStyle,
    items,
    hideSelectAll,
    selectedValues,
    emptySearchPlaceholder = "no data to display",
    emptySearchPlaceholderTransKey,
    selectAllPlaceholder = "select all",
    selectAllPlaceholderTransKey,
    isOpen,
    isLoading,
    disabled,
    autoFocus,
    searchValue,
    onOpenChange,
    onClear,
    onSelect,
    onSelectModel,
  } = props;

  const [_items, setItems] = useState<ISheMultiSelectItem<T>[]>(null);
  const [_selectedValues, setSelectedValues] = useState<T[]>([]);
  const [_badges, setBadges] = useState<ISheBadge[]>(null);
  const [_open, setOpen] = useState<boolean>(null);
  const [_loading, setLoading] = useState<boolean>(null);
  const [_searchValue, setSearchValue] = useState<string>(null);
  const [_isItemsWithIcons, setIsItemsWithIcons] = useState<boolean>(null);
  const [_isItemsWithColors, setIsItemsWithColors] = useState<boolean>(null);

  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const ariaDescribedbyId = `${generateId()}_MULTI_SELECT_ID`;

  const sheMultiSelectProps = getCustomProps<
    ISheMultiSelect<T>,
    ISheMultiSelect<T>
  >(props, SheMultiSelectDefaultModel);
  const sheMultiSelectSearchProps = getCustomProps<
    ISheMultiSelect<T>,
    ISheMultiSelectSearch
  >(props, SheMultiSelectSearchDefaultModel);
  const sheMultiSelectFooterProps = getCustomProps<
    ISheMultiSelect<T>,
    ISheMultiSelectFooter
  >(props, SheMultiSelectFooterDefaultModel);
  const restProps = removeCustomProps<ISheMultiSelect<T>>(props, [
    SheMultiSelectDefaultModel,
    SheMultiSelectSearchDefaultModel,
    SheMultiSelectFooterDefaultModel,
  ]);

  useEffect(() => {
    let tmpItems: ISheMultiSelectItem<T>[] = _items;
    let tmpSelectedValues: T[] = _selectedValues;

    setIsItemsWithIcons(null);
    setIsItemsWithColors(null);

    if (!_.isEqual(items, _items)) {
      tmpItems = _updateItemsIsSelectedCondition(
        addItemsId<ISheMultiSelectItem<T>>(items),
        selectedValues || _selectedValues,
      );
      tmpSelectedValues = selectedValues
        ? selectedValues
        : tmpItems?.filter((item) => item.isSelected).map((item) => item.value);
    }

    if (!_.isEqual(selectedValues, _selectedValues)) {
      tmpSelectedValues = selectedValues
        ? selectedValues
        : tmpItems?.filter((item) => item.isSelected).map((item) => item.value);
      tmpItems = _updateItemsIsSelectedCondition(tmpItems, tmpSelectedValues);
    }

    setItems(tmpItems);
    setSelectedValues(tmpSelectedValues);
    setBadges(_getSelectedBudges(items, tmpSelectedValues));
    _setAutoFocus();
  }, [items, selectedValues]);

  useEffect(() => {
    onOpenChange?.(_open);
  }, [_open]);

  useEffect(() => {
    if (isLoading || disabled) {
      setOpen(false);
    } else if (
      !_.isNil(isOpen) &&
      typeof isOpen === "boolean" &&
      isOpen !== _open
    ) {
      setOpen(isOpen);
    }

    if (typeof isLoading === "boolean" && isLoading !== _loading) {
      setLoading(isLoading);
    }

    _calculatePopoverWidth();
  }, [isOpen, isLoading, disabled]);

  useEffect(() => {
    if (!_.isEqual(searchValue, _searchValue)) setSearchValue(searchValue);
  }, [searchValue]);

  useEffect(() => {
    _setAutoFocus();
  }, [autoFocus]);

  // ==================================================================== EVENT

  function onTogglePopoverHandler() {
    setOpen((prev) => !prev);
    _calculatePopoverWidth();
  }

  function onToggleOptionHandler(_value: T, event?: React.MouseEvent) {
    const newSelectedValues = _selectedValues.includes(_value)
      ? _selectedValues.filter((value) => value !== _value)
      : [..._selectedValues, _value];
    _updateSelectedValues(newSelectedValues, event);
  }

  function onToggleAllHandler(_value: T, event?: React.MouseEvent) {
    if (_selectedValues.length === _items.length) {
      onClearButtonHandler(event);
    } else {
      _updateSelectedValues(
        _items.map((item) => item.value),
        event,
      );
    }
  }

  function onClearExtraOptionsHandler(badges: ISheBadge[]) {
    _updateSelectedValues(_selectedValues.slice(0, -badges.length));
  }

  function onClearButtonHandler(event: React.MouseEvent) {
    _updateSelectedValues([], event);
    setSearchValue("");
    setTimeout(() => searchRef?.current?.focus());
    onClear?.(null);
  }

  function onCloseButtonHandler() {
    setOpen(false);
  }

  // ==================================================================== PRIVATE

  function _setAutoFocus() {
    if (autoFocus && triggerRef.current) {
      setTimeout(() => triggerRef.current.focus());
    }
  }

  function _calculatePopoverWidth() {
    requestAnimationFrame(() => {
      const popover = popoverRef.current;
      const trigger = triggerRef.current;
      if (!popover || !trigger || !trigger.offsetParent) return;
      popover.style.width = `${trigger.getBoundingClientRect().width}px`;
    });
  }

  function _getSelectedBudges(
    fromItems: ISheMultiSelectItem<T>[],
    values: T[],
  ): ISheBadge[] {
    if (
      !fromItems ||
      !Array.isArray(values) ||
      fromItems.length === 0 ||
      !values ||
      !Array.isArray(values) ||
      values.length === 0
    )
      return;

    let selectedItems: ISheMultiSelectItem<T>[] = [];

    values.forEach((value: T) => {
      fromItems.forEach((item: ISheMultiSelectItem<T>) => {
        if (_.isEqual(value, item.value)) {
          selectedItems.push(item);
        }
      });
    });

    return selectedItems.map(
      (item: ISheMultiSelectItem<T>): ISheBadge => ({
        text: item?.text,
        icon: item?.icon,
        value: item.value,
      }),
    );
  }

  function _updateSelectedValues(values: T[], event?: React.MouseEvent) {
    setItems((prevState) => {
      return prevState.map((item) => {
        item.isSelected = values.includes(item.value);
        return item;
      });
    });
    setSelectedValues(values);
    setBadges(_getSelectedBudges(_items, values));
    onSelect?.(values);
    onSelectModel?.({
      value: values,
      model: {
        ...sheMultiSelectProps,
        items: _items,
        selectedValues: values,
        searchValue: _searchValue,
      },
      event,
    });
  }

  function _updateItemsIsSelectedCondition(
    fromItems: ISheMultiSelectItem<T>[],
    fromSelectedValues: T[],
  ): ISheMultiSelectItem<T>[] {
    if (
      !fromItems ||
      fromItems.length === 0 ||
      !fromSelectedValues ||
      fromSelectedValues.length === 0
    )
      return fromItems;

    return fromItems.map((item) => {
      if (item.icon) setIsItemsWithIcons(true);
      if (item.colors) setIsItemsWithColors(true);
      item.isSelected = fromSelectedValues.includes(item.value);
      return item;
    });
  }

  // ==================================================================== RENDER

  return (
    <Popover open={_open} onOpenChange={setOpen}>
      <SheMultiSelectTrigger
        ref={triggerRef}
        items={_badges}
        isOpen={_open}
        ariaDescribedbyId={ariaDescribedbyId}
        disabled={disabled || !_items || _items.length === 0}
        isLoading={isLoading}
        autoFocus={autoFocus}
        onTogglePopover={onTogglePopoverHandler}
        onToggleOption={onToggleOptionHandler}
        onClearExtraOptions={onClearExtraOptionsHandler}
        onClearAll={onClearButtonHandler}
        {...restProps}
      />
      <PopoverContent
        ref={popoverRef}
        className={`${popoverClassName} ${cs.sheMultiSelectPopoverContainer}`}
        style={{
          ...popoverStyle,
        }}
        align="start"
      >
        <Command className={`${disabled || isLoading ? "disabled" : ""}`}>
          <SheMultiSelectSearch
            {...sheMultiSelectSearchProps}
            searchRef={searchRef}
            searchValue={_searchValue}
            onSearch={setSearchValue}
          />
          <CommandList>
            <CommandEmpty
              className={cs.sheMultiSelectPopoverNoDataMessageBlock}
            >
              <span className="she-placeholder">
                <Trans i18nKey={emptySearchPlaceholderTransKey}>
                  {emptySearchPlaceholder}
                </Trans>
              </span>
            </CommandEmpty>
            <CommandGroup className={cs.sheMultiSelectPopoverGroupContainer}>
              {!hideSelectAll && (
                <SheMultiSelectItem<T>
                  className={`${cs.sheMultiSelectItemParentWrapper} ${cs.sheMultiSelectItemParentWrapperSelectAll}`}
                  text={selectAllPlaceholder}
                  textTransKey={selectAllPlaceholderTransKey}
                  isSelected={_selectedValues?.length === _items?.length}
                  isLoading={isLoading}
                  onClick={onToggleAllHandler}
                />
              )}
              {_items?.map((item) => (
                <SheMultiSelectItem<T>
                  {...item}
                  key={item.id}
                  className={cs.sheMultiSelectItemParentWrapper}
                  showIconsColumn={_isItemsWithIcons}
                  showColorsColumn={_isItemsWithColors}
                  isLoading={
                    !_.isNil(item.isLoading) ? item.isLoading : _loading
                  }
                  onClick={onToggleOptionHandler}
                />
              ))}
            </CommandGroup>
          </CommandList>
          <SheMultiSelectFooter
            selectedValues={_selectedValues}
            onSecondaryBtnClick={onClearButtonHandler}
            onPrimaryBtnClick={onCloseButtonHandler}
            {...sheMultiSelectFooterProps}
          />
        </Command>
      </PopoverContent>
    </Popover>
  );
}
