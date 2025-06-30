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
import { Popover, PopoverContent } from "@/components/ui/popover";
import { ISheMultiSelect } from "@/const/interfaces/primitive-components/ISheMultiSelect.ts";
import SheMultiSelectTrigger from "@/components/primitive/she-multi-select/components/she-multi-select-trigger/SheMultiSelectTrigger.tsx";
import { addItemsId, generateId } from "@/utils/helpers/quick-helper.ts";
import { ISheMultiSelectItem } from "@/const/interfaces/primitive-components/ISheMultiSelectItem.ts";
import { ISheBadge } from "@/const/interfaces/primitive-components/ISheBadge.ts";
import SheMultiSelectItem from "@/components/primitive/she-multi-select/components/she-multi-select-item/SheMultiSelectItem.tsx";
import SheMultiSelectFooter from "@/components/primitive/she-multi-select/components/she-multi-select-footer/SheMultiSelectFooter.tsx";
import SheMultiSelectSearch from "@/components/primitive/she-multi-select/components/she-multi-select-search/SheMultiSelectSearch.tsx";
import {
  getCustomProps,
  removeCustomProps,
} from "@/utils/helpers/props-helper.ts";
import {
  ISheMultiSelectSearch,
  SheMultiSelectSearchDefaultModel,
} from "@/const/interfaces/primitive-components/ISheMultiSelectSearch.ts";
import {
  ISheMultiSelectFooter,
  SheMultiSelectFooterDefaultModel,
} from "@/const/interfaces/primitive-components/ISheMultiSelectFooter.ts";

export default function SheMultiSelect<T>({
  popoverClassName = "",
  popoverStyle,
  options,
  hideSelectAll,
  selectedValues,
  emptySearchPlaceholder = "no data to display",
  emptySearchPlaceholderTransKey,
  selectAllPlaceholder = "[ select all ]",
  selectAllPlaceholderTransKey,
  isOpen,
  isLoading,
  disabled,
  autoFocus,
  searchValue,
  onIsOpen,
  onValueChange,
  onClear,
  ...props
}: ISheMultiSelect<T>): JSX.Element {
  const [_options, setOptions] = useState<ISheMultiSelectItem<T>[]>(null);
  const [_selectedValues, setSelectedValues] = useState<T[]>([]);
  const [_badges, setBadges] = useState<ISheBadge[]>(null);
  const [_isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [_isItemsWithIcons, setIsItemsWithIcons] = useState<boolean>(null);
  const [_isItemsWithColors, setIsItemsWithColors] = useState<boolean>(null);
  const [_searchValue, setSearchValue] = useState<string>(null);

  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const ariaDescribedbyId = `${generateId()}_MULTI_SELECT_ID`;

  const sheMultiSelectSearchProps = getCustomProps<
    ISheMultiSelect<T>,
    ISheMultiSelectSearch
  >(props, SheMultiSelectSearchDefaultModel);
  const sheMultiSelectFooterProps = getCustomProps<
    ISheMultiSelect<T>,
    ISheMultiSelectFooter
  >(props, SheMultiSelectFooterDefaultModel);
  const restProps = removeCustomProps<ISheMultiSelect<T>>(props, [
    SheMultiSelectSearchDefaultModel,
    SheMultiSelectFooterDefaultModel,
  ]);

  useEffect(() => {
    setIsItemsWithIcons(null);
    setIsItemsWithColors(null);

    if (!_.isEqual(options, _options)) {
      setOptions(addItemsId<ISheMultiSelectItem<T>>(options));
      setBadges(_getSelectedBudges(options, _selectedValues));
      _setAutoFocus();
    }
  }, [options]);

  useEffect(() => {
    if (
      !_.isNil(selectedValues) &&
      !_.isEqual(selectedValues, _selectedValues)
    ) {
      setSelectedValues(selectedValues);
      setBadges(_getSelectedBudges(options, selectedValues));
      _setAutoFocus();
    }
  }, [selectedValues]);

  useEffect(() => {
    onIsOpen?.(_isPopoverOpen);
  }, [_isPopoverOpen]);

  useEffect(() => {
    if (!_.isNil(isOpen) && isOpen !== _isPopoverOpen) setIsPopoverOpen(isOpen);
    _calculatePopoverWidth();
  }, [isOpen]);

  useEffect(() => {
    if (searchValue !== _searchValue) setSearchValue(searchValue);
  }, [searchValue]);

  useEffect(() => {
    _setAutoFocus();
  }, [autoFocus]);

  // ==================================================================== EVENT

  function onTogglePopoverHandler() {
    setIsPopoverOpen((prev) => !prev);
    _calculatePopoverWidth();
  }

  function onToggleOptionHandler(data: any) {
    console.log("VALUE: ", data);

    const newSelectedValues = _selectedValues.includes(data)
      ? _selectedValues.filter((value) => value !== data)
      : [..._selectedValues, data];
    _updateSelectedValues(newSelectedValues);
  }

  function onToggleAllHandler() {
    if (_selectedValues.length === _options.length) {
      onClearButtonHandler();
    } else {
      _updateSelectedValues(_options.map((option) => option.value));
    }
  }

  function onClearExtraOptionsHandler(badges: ISheBadge[]) {
    _updateSelectedValues(_selectedValues.slice(0, -badges.length));
  }

  function onClearButtonHandler() {
    _updateSelectedValues([]);
    setSearchValue("");
    setTimeout(() => searchRef?.current?.focus());
    onClear?.(null);
  }

  function onCloseButtonHandler() {
    setIsPopoverOpen(false);
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
    items: ISheMultiSelectItem<T>[],
    values: T[],
  ): ISheBadge[] {
    if (!items || items.length === 0 || !values || values.length === 0) return;

    return values
      .map((value: string) =>
        options.find((option: ISheMultiSelectItem<T>) =>
          _.isEqual(option.value, value),
        ),
      )
      .map(
        (item: ISheMultiSelectItem<T>): ISheBadge => ({
          text: item?.text,
          icon: item?.icon,
          value: item.value,
        }),
      );
  }

  function _updateSelectedValues(values: T[]) {
    setSelectedValues(values);
    setBadges(_getSelectedBudges(_options, values));
    onValueChange?.(values);
  }

  // ==================================================================== RENDER

  return (
    <Popover open={_isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <SheMultiSelectTrigger
        ref={triggerRef}
        items={_badges}
        isOpen={_isPopoverOpen}
        ariaDescribedbyId={ariaDescribedbyId}
        disabled={disabled || !_options || _options.length === 0}
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
        className={`${popoverClassName} ${cs.sheMultiSelectPopoverContainer} ${disabled || isLoading ? "disabled" : ""}`}
        style={{
          ...popoverStyle,
        }}
        align="start"
      >
        <Command>
          <SheMultiSelectSearch
            searchRef={searchRef}
            searchValue={_searchValue}
            {...sheMultiSelectSearchProps}
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
                  isSelected={_selectedValues?.length === _options?.length}
                  isLoading={isLoading}
                  onClick={onToggleAllHandler}
                />
              )}
              {_options?.map((option) => (
                <SheMultiSelectItem<T>
                  key={option.id}
                  className={cs.sheMultiSelectItemParentWrapper}
                  isSelected={_selectedValues?.includes(option.value)}
                  showIconsColumn={_isItemsWithIcons}
                  showColorsColumn={_isItemsWithColors}
                  isLoading={isLoading}
                  onClick={onToggleOptionHandler}
                  {...option}
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
