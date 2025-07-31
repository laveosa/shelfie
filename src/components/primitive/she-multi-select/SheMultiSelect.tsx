import { JSX, RefObject, useEffect, useState } from "react";
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
import useDefaultRef from "@/utils/hooks/useDefaultRef.ts";
import useValueWithEvent from "@/utils/hooks/useValueWithEvent.ts";
import { ISheBadge } from "@/const/interfaces/primitive-components/ISheBadge.ts";
import { ISheMultiSelectItem } from "@/const/interfaces/primitive-components/ISheMultiSelectItem.ts";
import { IOutputEventModel } from "@/const/interfaces/IOutputEventModel.ts";
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
    ref: triggerRef,
    searchRef,
    popoverRef,
    popoverClassName = "",
    popoverStyle,
    items,
    hideSelectAll,
    selectedValues,
    emptySearchPlaceholder = "no data to display...",
    emptySearchPlaceholderTransKey = "PLACE_VALID_TRANS_KEY",
    selectAllPlaceholder = "select all",
    selectAllPlaceholderTransKey = "PLACE_VALID_TRANS_KEY",
    isLoading,
    disabled,
    autoFocus,
    searchValue,
    openOnFocus,
    isOpen,
    onOpen,
    onClear,
    onSelect,
  } = props;
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
    { popoverRef: undefined, triggerRef: undefined, searchRef: undefined },
  ]);

  // ==================================================================== STATE MANAGEMENT
  const [_items, setItems] = useState<ISheMultiSelectItem<T>[]>(null);
  const [_selectedValues, setSelectedValues] = useState<T[]>([]);
  const [_badges, setBadges] = useState<ISheBadge<T>[]>(null);
  const [_open, setOpen] = useState<boolean>(null);
  const [_loading, setLoading] = useState<boolean>(null);
  const [_searchValue, setSearchValue] = useState<string>(null);

  // ==================================================================== REFS
  const _triggerRef = useDefaultRef<HTMLButtonElement>(triggerRef);
  const _popoverRef = useDefaultRef<HTMLDivElement>(popoverRef);
  const _searchRef = useDefaultRef<HTMLInputElement>(searchRef);

  // ==================================================================== UTILITIES
  const {
    ariaDescribedbyId,
    setFocus,
    initializeItemsList,
    updateSelectedItems,
    calculatePopoverWidth,
  } = useComponentUtilities({
    identifier: "SheMultiSelect",
  });

  const {
    eventHandler: eventToggleOptionHandler,
    valueHandler: valueToggleOptionHandler,
  } = useValueWithEvent<React.MouseEvent | React.KeyboardEvent, T>(
    onToggleOptionHandler,
  );

  const {
    eventHandler: eventToggleAllHandler,
    valueHandler: valueToggleAllHandler,
  } = useValueWithEvent<React.MouseEvent | React.KeyboardEvent, T>(
    onToggleAllHandler,
  );

  // ==================================================================== SIDE EFFECTS
  useEffect(() => {
    const arrSelectedValues: T[] =
      selectedValues && !Array.isArray(selectedValues)
        ? [selectedValues]
        : selectedValues;

    const tmpSelectedValues: T[] =
      (!_.isEqual(arrSelectedValues, _selectedValues)
        ? arrSelectedValues
        : _selectedValues) ??
      items?.filter((item) => item.isSelected).map((item) => item.value);

    const newItems = initializeItemsList<T, ISheMultiSelectItem<T>>(
      items,
      tmpSelectedValues,
    );

    if (!_.isEqual(newItems, _items)) {
      setItems(newItems);
    } else {
      setItems(updateSelectedItems(_items, tmpSelectedValues));
    }

    setSelectedValues(tmpSelectedValues);
    setBadges(_generateBadgesFromSelectedItems(items, tmpSelectedValues));
    _updateFocusRelatedLogic();
  }, [items, selectedValues]);

  useEffect(() => {
    if (!_.isEqual(searchValue, _searchValue)) setSearchValue(searchValue);

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
  }, [searchValue, isOpen, isLoading]);

  useEffect(() => {
    _updateFocusRelatedLogic();
  }, [autoFocus]);

  // ==================================================================== EVENT HANDLERS
  function onTogglePopoverHandler() {
    _setIsOpen(!_open);
  }

  function onSelectHandler(
    value: T,
    event: React.MouseEvent | React.KeyboardEvent,
  ) {
    event
      ? onToggleOptionHandler(value, event)
      : valueToggleOptionHandler(value);
  }

  function onSelectAllHandler(
    value: T,
    event: React.MouseEvent | React.KeyboardEvent,
  ) {
    event ? onToggleAllHandler(value, event) : valueToggleAllHandler(value);
  }

  function onToggleOptionHandler(
    value: T,
    event?: React.MouseEvent | React.KeyboardEvent,
  ) {
    const newSelectedValues = _selectedValues.includes(value)
      ? _selectedValues.filter((item) => item !== value)
      : [..._selectedValues, value];
    _updateSelectedValues(newSelectedValues, event);
  }

  function onToggleAllHandler(
    value: T,
    event?: React.MouseEvent | React.KeyboardEvent,
  ) {
    const isAllSelected = _items.every((item) =>
      _selectedValues.includes(item.value),
    );

    if (isAllSelected) {
      onClearButtonHandler<HTMLInputElement>(event, _searchRef);
    } else {
      _updateSelectedValues(
        _items.map((item) => item.value),
        event,
      );
    }
  }

  function onClearExtraOptionsHandler(
    badges: ISheBadge<T>[],
    model: IOutputEventModel<T[] | string[], ISheBadge<T>[], React.MouseEvent>,
  ) {
    _updateSelectedValues(
      _selectedValues.slice(0, -badges.length),
      model.event,
    );
  }

  function onClearButtonHandler<T>(
    event: React.MouseEvent | React.KeyboardEvent,
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
  function _generateBadgesFromSelectedItems(
    fromItems: ISheMultiSelectItem<T>[],
    values: T[],
  ): ISheBadge<T>[] {
    let selectedItems: ISheMultiSelectItem<T>[] = [];

    values?.forEach((value: T) => {
      fromItems?.forEach((item: ISheMultiSelectItem<T>) => {
        if (_.isEqual(value, item.value)) {
          selectedItems.push(item);
        }
      });
    });

    return selectedItems?.map(
      (item: ISheMultiSelectItem<T>): ISheBadge<T> => ({
        text: item?.text,
        icon: item?.icon,
        value: item.value,
      }),
    );
  }

  function _updateSelectedValues(
    values: T[],
    event?: React.MouseEvent | React.KeyboardEvent,
  ) {
    const tmpItems: ISheMultiSelectItem<T>[] = updateSelectedItems(
      _items,
      values,
    );

    setItems(tmpItems);
    setSelectedValues(values);
    setBadges(_generateBadgesFromSelectedItems(_items, values));
    onSelect?.(values, {
      value: values,
      model: {
        ...props,
        items: tmpItems,
        selectedValues: values,
        searchValue: _searchValue,
      },
      event,
    });
  }

  function _setIsOpen(_isOpen: boolean) {
    if (isLoading || disabled || !items || items.length === 0) {
      setOpen(false);
      onOpen?.(false);
    } else if (!_.isEqual(_isOpen, _open)) {
      setOpen(_isOpen);
      onOpen?.(_isOpen);

      if (_isOpen) {
        calculatePopoverWidth<HTMLButtonElement>(_popoverRef, _triggerRef);
      } else {
        setFocus<HTMLButtonElement>(autoFocus, _triggerRef);
      }
    }
  }

  function _updateFocusRelatedLogic() {
    if (!items || items.length === 0) return;

    if (openOnFocus || isOpen) {
      _setIsOpen(isOpen ?? autoFocus);
      setFocus<HTMLInputElement>(autoFocus, _searchRef);
    } else {
      setTimeout(() => {
        _open
          ? setFocus<HTMLInputElement>(autoFocus, _searchRef)
          : setFocus<HTMLButtonElement>(autoFocus, _triggerRef);
      });
    }
  }

  // ==================================================================== LAYOUT
  return (
    <Popover open={_open} onOpenChange={_setIsOpen}>
      <SheMultiSelectTrigger<T>
        {...restProps}
        ref={_triggerRef}
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
          onClearButtonHandler<HTMLButtonElement>(event, _triggerRef)
        }
      />
      <PopoverContent
        ref={_popoverRef}
        className={`${popoverClassName} ${cs.sheMultiSelectPopoverContainer}`}
        style={{
          ...popoverStyle,
        }}
        align="start"
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            eventToggleOptionHandler(event);
            eventToggleAllHandler(event);
            event.stopPropagation();
            event.preventDefault();
          }
        }}
      >
        <Command className={`${disabled || isLoading ? "disabled" : ""}`}>
          <SheMultiSelectSearch
            {...sheMultiSelectSearchProps}
            searchRef={_searchRef}
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
                  tabIndex={_open ? 0 : -1}
                  onClick={onSelectAllHandler}
                />
              )}
              {_items?.map((item) => (
                <SheMultiSelectItem<T>
                  key={item.id}
                  {...item}
                  className={cs.sheMultiSelectItemParentWrapper}
                  isLoading={
                    !_.isNil(item.isLoading) ? item.isLoading : _loading
                  }
                  onClick={onSelectHandler}
                />
              ))}
            </CommandGroup>
          </CommandList>
          <SheMultiSelectFooter
            selectedValues={_selectedValues}
            onSecondaryBtnClick={(event) =>
              onClearButtonHandler<HTMLInputElement>(event, _searchRef)
            }
            onPrimaryBtnClick={onCloseButtonHandler}
            {...sheMultiSelectFooterProps}
          />
        </Command>
      </PopoverContent>
    </Popover>
  );
}
