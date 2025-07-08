import { JSX, RefObject, useEffect, useRef, useState } from "react";
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
import SheMultiSelectTrigger from "@/components/primitive/she-multi-select/components/she-multi-select-trigger/SheMultiSelectTrigger.tsx";
import SheMultiSelectItem from "@/components/primitive/she-multi-select/components/she-multi-select-item/SheMultiSelectItem.tsx";
import SheMultiSelectFooter from "@/components/primitive/she-multi-select/components/she-multi-select-footer/SheMultiSelectFooter.tsx";
import SheMultiSelectSearch from "@/components/primitive/she-multi-select/components/she-multi-select-search/SheMultiSelectSearch.tsx";
import useComponentUtilities from "@/utils/hooks/useComponentUtilities.ts";
import { ISheBadge } from "@/const/interfaces/primitive-components/ISheBadge.ts";
import { ISheMultiSelectItem } from "@/const/interfaces/primitive-components/ISheMultiSelectItem.ts";
import { ISheOption } from "@/const/interfaces/primitive-components/ISheOption.ts";
import {
  ISheMultiSelect,
  SheMultiSelectDefaultModel,
} from "@/const/interfaces/primitive-components/ISheMultiSelect.ts";
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
  // ==================================================================== PROPS
  const {
    popoverClassName = "",
    popoverStyle,
    items,
    hideSelectAll,
    selectedValues,
    emptySearchPlaceholder = "no data to display...",
    emptySearchPlaceholderTransKey = "PLACE_VALID_TRANS_KEY",
    selectAllPlaceholder = "select all",
    selectAllPlaceholderTransKey = "PLACE_VALID_TRANS_KEY",
    isOpen,
    isLoading,
    disabled,
    autoFocus,
    searchValue,
    onOpen,
    onClear,
    onSelect,
    onSelectModel,
  } = props;
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

  // ==================================================================== STATE MANAGEMENT
  const [_items, setItems] = useState<ISheMultiSelectItem<T>[]>(null);
  const [_selectedValues, setSelectedValues] = useState<T[]>([]);
  const [_badges, setBadges] = useState<ISheBadge[]>(null);
  const [_open, setOpen] = useState<boolean>(null);
  const [_loading, setLoading] = useState<boolean>(null);
  const [_searchValue, setSearchValue] = useState<string>(null);

  // ==================================================================== REFS
  // TODO ---------------------------------------------- all ref-s need to be in props and use "useDefaultRef" logic
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // ==================================================================== UTILITIES FUNCTIONS
  const {
    ariaDescribedbyId,
    isItemsWithIcons,
    isItemsWithColors,
    setFocus,
    addItemsId,
    calculatePopoverWidth,
  } = useComponentUtilities<T, ISheOption<T>>({
    identifier: "SheMultiSelect",
    items: _items,
  });

  // ==================================================================== DEPENDENCIES
  useEffect(() => {
    let tmpItems: ISheMultiSelectItem<T>[] = _items;
    let tmpSelectedValues: T[] = _selectedValues;

    // TODO refactor this logic   1 (make as one expression)
    if (!_.isEqual(items, _items)) {
      tmpItems = _updateItemsIsSelectedCondition(
        addItemsId<ISheMultiSelectItem<T>>(items),
        selectedValues || _selectedValues,
      );
      tmpSelectedValues = selectedValues
        ? selectedValues
        : tmpItems?.filter((item) => item.isSelected).map((item) => item.value);
    }
    // TODO refactor this logic   2 (make as one expression)
    if (!_.isEqual(selectedValues, _selectedValues)) {
      tmpSelectedValues = selectedValues
        ? selectedValues
        : tmpItems?.filter((item) => item.isSelected).map((item) => item.value);
      tmpItems = _updateItemsIsSelectedCondition(tmpItems, tmpSelectedValues);
    }

    setItems(tmpItems);
    setSelectedValues(tmpSelectedValues);
    setBadges(_getSelectedBadges(items, tmpSelectedValues));
    setFocus<HTMLButtonElement>(autoFocus, triggerRef);
  }, [items, selectedValues]);

  useEffect(() => {
    if (!_.isEqual(searchValue, _searchValue)) setSearchValue(searchValue);

    if (
      !_.isNil(isOpen) &&
      typeof isOpen === "boolean" &&
      !_.isEqual(isOpen, _open)
    )
      _setIsOpen(isOpen);

    if (
      !_.isNil(isLoading) &&
      typeof isLoading === "boolean" &&
      !_.isEqual(isLoading, _loading)
    )
      _setIsLoading(isLoading);
  }, [searchValue, isOpen, isLoading]);

  useEffect(() => {
    // TODO create new prop "openOnFocus" and related logic for it
    // _setIsOpen(autoFocus);
    setFocus<HTMLButtonElement>(autoFocus, triggerRef);
  }, [autoFocus]);

  // ==================================================================== EVENT

  function onTogglePopoverHandler() {
    _setIsOpen(!_open);
  }

  function onToggleOptionHandler(_value: T, event?: React.MouseEvent) {
    const newSelectedValues = _selectedValues.includes(_value)
      ? _selectedValues.filter((value) => value !== _value)
      : [..._selectedValues, _value];
    _updateSelectedValues(newSelectedValues, event);
  }

  function onToggleAllHandler(_value: T, event?: React.MouseEvent) {
    if (_selectedValues.length === _items.length) {
      onClearButtonHandler<HTMLInputElement>(event, searchRef);
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

  function onClearButtonHandler<T>(
    event: React.MouseEvent,
    refElement: RefObject<T>,
  ) {
    _updateSelectedValues([], event);
    setSearchValue("");
    setFocus<T>(true, refElement);
    onClear?.(null);
  }

  function onCloseButtonHandler() {
    _setIsOpen(false);
  }

  // ==================================================================== PRIVATE

  function _getSelectedBadges(
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
    setBadges(_getSelectedBadges(_items, values));
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

  // TODO replace with "updateSelectedItems" func in "useComponentUtilities" hook
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
      item.isSelected = fromSelectedValues.includes(item.value);
      return item;
    });
  }

  function _setIsOpen(_isOpen: boolean) {
    if (isLoading || disabled) {
      setOpen(false);
      onOpen?.(false);
    } else if (!_.isEqual(_isOpen, _open)) {
      setOpen(_isOpen);
      onOpen?.(_isOpen);

      if (_isOpen) {
        calculatePopoverWidth<HTMLButtonElement>(popoverRef, triggerRef);
      } else {
        setFocus<HTMLButtonElement>(autoFocus, triggerRef);
      }
    }
  }

  function _setIsLoading(_isLoading: boolean) {
    if (!_.isEqual(_isLoading, _loading)) setLoading(_isLoading);
  }

  // ==================================================================== RENDER

  return (
    <Popover open={_open} onOpenChange={_setIsOpen}>
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
        onClearAll={(event) =>
          onClearButtonHandler<HTMLButtonElement>(event, triggerRef)
        }
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
                  tabIndex={0}
                  onClick={onToggleAllHandler}
                />
              )}
              {_items?.map((item) => (
                <SheMultiSelectItem<T>
                  {...item}
                  key={item.id}
                  className={cs.sheMultiSelectItemParentWrapper}
                  showIconsColumn={isItemsWithIcons}
                  showColorsColumn={isItemsWithColors}
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
            onSecondaryBtnClick={(event) =>
              onClearButtonHandler<HTMLInputElement>(event, searchRef)
            }
            onPrimaryBtnClick={onCloseButtonHandler}
            {...sheMultiSelectFooterProps}
          />
        </Command>
      </PopoverContent>
    </Popover>
  );
}
