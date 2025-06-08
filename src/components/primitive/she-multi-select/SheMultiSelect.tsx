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
import { generateId } from "@/utils/helpers/quick-helper.ts";
import { ISheMultiSelectItem } from "@/const/interfaces/primitive-components/ISheMultiSelectItem.ts";
import { ISheBadge } from "@/const/interfaces/primitive-components/ISheBadge.ts";
import SheMultiSelectItem from "@/components/primitive/she-multi-select/components/she-multi-select-item/SheMultiSelectItem.tsx";
import SheMultiSelectFooter from "@/components/primitive/she-multi-select/components/she-multi-select-footer/SheMultiSelectFooter.tsx";
import SheMultiSelectSearch from "@/components/primitive/she-multi-select/components/she-multi-select-search/SheMultiSelectSearch.tsx";

export default function SheMultiSelect({
  popoverClassName = "",
  popoverStyles,
  icon,
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

  showSearch,
  searchClassName,
  searchStyle,
  searchValue,
  searchPlaceholder,
  searchPlaceholderTransKey,
  hideSearchClearBtn,
  onSearch,

  showFooter,
  footerClassName,
  footerStyle,
  hideSecondaryBtn,
  secondaryBtnValue,
  secondaryBtnValueTransKey,
  hidePrimaryBtn,
  primaryBtnValue,
  primaryBtnValueTransKey,

  onIsOpen,
  onValueChange,
  onClear,
  ...props
}: ISheMultiSelect): JSX.Element {
  const [_options, setOptions] = useState<ISheMultiSelectItem[]>(null);
  const [_selectedValues, setSelectedValues] = useState<any[]>([]);
  const [_badges, setBadges] = useState<ISheBadge[]>(null);
  const [_isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [_isItemsWithIcons, setIsItemsWithIcons] = useState<boolean>(null);
  const [_isItemsWithColors, setIsItemsWithColors] = useState<boolean>(null);

  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const ariaDescribedbyId = `${generateId()}_MULTI_SELECT_ID`;

  useEffect(() => {
    setIsItemsWithIcons(null);
    setIsItemsWithColors(null);

    if (!_.isEqual(options, _options)) {
      setOptions(_addItemsIds(options));
      setBadges(_getSelectedBudges(options, _selectedValues));
    }
  }, [options]);

  useEffect(() => {
    if (
      !_.isNil(selectedValues) &&
      !_.isEqual(selectedValues, _selectedValues)
    ) {
      setSelectedValues(selectedValues);
      setBadges(_getSelectedBudges(options, selectedValues));
    }
  }, [selectedValues]);

  useEffect(() => {
    if (onIsOpen) onIsOpen(_isPopoverOpen);
  }, [_isPopoverOpen]);

  useEffect(() => {
    if (!_.isNil(isOpen) && isOpen !== _isPopoverOpen) setIsPopoverOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (autoFocus && triggerRef.current) {
      setTimeout(() => triggerRef.current.focus());
    }
  }, [autoFocus]);

  // ==================================================================== EVENT

  function onTogglePopoverHandler() {
    setIsPopoverOpen((prev) => !prev);
    _calculatePopoverWidth();
  }

  function onToggleOptionHandler(option: string) {
    const newSelectedValues = _selectedValues.includes(option)
      ? _selectedValues.filter((value) => value !== option)
      : [..._selectedValues, option];
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
    if (onClear) onClear([]);
  }

  function onCloseButtonHandler() {
    setIsPopoverOpen(false);
  }

  // ==================================================================== PRIVATE

  function _addItemsIds(items: ISheMultiSelectItem[]) {
    return items?.map((item, idx) => {
      if (item.icon) setIsItemsWithIcons(true);
      if (item.colors) setIsItemsWithColors(true);

      return {
        ...item,
        id: `${
          item.text && item.text.length > 0
            ? item.text.replace(/ /g, "_")
            : "multiSelectOption_"
        }_${(idx + 1).toString()}`,
      };
    });
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
    items: ISheMultiSelectItem[],
    values: any[],
  ): ISheBadge[] {
    if (!items || items.length === 0 || !values || values.length === 0) return;

    return values
      .map((value: string) =>
        options.find((option: ISheMultiSelectItem) =>
          _.isEqual(option.value, value),
        ),
      )
      .map(
        (item: ISheMultiSelectItem): ISheBadge => ({
          text: item?.text,
          icon: item?.icon,
          value: item.value,
        }),
      );
  }

  function _updateSelectedValues(values: any[]) {
    setSelectedValues(values);
    setBadges(_getSelectedBudges(_options, values));
    onValueChange(values);
  }

  // ==================================================================== RENDER

  return (
    <Popover open={_isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <SheMultiSelectTrigger
        ref={triggerRef}
        items={_badges}
        icon={icon}
        isOpen={_isPopoverOpen}
        ariaDescribedbyId={ariaDescribedbyId}
        disabled={disabled || !_options || _options.length === 0}
        isLoading={isLoading}
        autoFocus={autoFocus}
        onTogglePopover={onTogglePopoverHandler}
        onToggleOption={onToggleOptionHandler}
        onClearExtraOptions={onClearExtraOptionsHandler}
        onClearAll={onClearButtonHandler}
        {...props}
      />
      <PopoverContent
        ref={popoverRef}
        className={`${popoverClassName} ${cs.sheMultiSelectPopoverContainer}`}
        style={{
          ...popoverStyles,
        }}
        align="start"
      >
        <Command>
          <SheMultiSelectSearch
            searchClassName={searchClassName}
            searchStyle={searchStyle}
            searchValue={searchValue}
            searchPlaceholder={searchPlaceholder}
            searchPlaceholderTransKey={searchPlaceholderTransKey}
            hideSearchClearBtn={hideSearchClearBtn}
            showSearch={showSearch}
            onSearch={onSearch}
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
                <SheMultiSelectItem
                  key="all"
                  className={`${cs.sheMultiSelectItemParentWrapper} ${cs.sheMultiSelectItemParentWrapperSelectAll}`}
                  text={selectAllPlaceholder}
                  textTransKey={selectAllPlaceholderTransKey}
                  isSelected={_selectedValues?.length === _options?.length}
                  isLoading={isLoading}
                  onClick={onToggleAllHandler}
                />
              )}
              {_options?.map((option) => (
                <SheMultiSelectItem
                  key={option.id}
                  className={cs.sheMultiSelectItemParentWrapper}
                  isSelected={_selectedValues?.includes(option.value)}
                  isItemsWithIcons={_isItemsWithIcons}
                  isItemsWithColors={_isItemsWithColors}
                  isLoading={isLoading}
                  onClick={onToggleOptionHandler}
                  {...option}
                />
              ))}
            </CommandGroup>
          </CommandList>
          <SheMultiSelectFooter
            footerClassName={footerClassName}
            footerStyle={footerStyle}
            selectedValues={_selectedValues}
            hideSecondaryBtn={hideSecondaryBtn}
            secondaryBtnValue={secondaryBtnValue}
            secondaryBtnValueTransKey={secondaryBtnValueTransKey}
            hidePrimaryBtn={hidePrimaryBtn}
            primaryBtnValue={primaryBtnValue}
            primaryBtnValueTransKey={primaryBtnValueTransKey}
            showFooter={showFooter}
            onSecondaryBtnClick={onClearButtonHandler}
            onPrimaryBtnClick={onCloseButtonHandler}
          />
        </Command>
      </PopoverContent>
    </Popover>
  );
}
