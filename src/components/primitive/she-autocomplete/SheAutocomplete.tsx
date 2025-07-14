import React, { JSX, useEffect, useMemo, useState } from "react";
import { Trans } from "react-i18next";
import _ from "lodash";

import cs from "./SheAutocomplete.module.scss";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command.tsx";
import {
  ISheInput,
  SheInputDefaultModel,
} from "@/const/interfaces/primitive-components/ISheInput.ts";
import {
  ISheAutocomplete,
  SheAutocompleteDefaultModel,
} from "@/const/interfaces/primitive-components/ISheAutocomplete.ts";
import { ISheOption } from "@/const/interfaces/primitive-components/ISheOption.ts";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import { Popover, PopoverContent } from "@/components/ui/popover.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { getCustomProps } from "@/utils/helpers/props-helper.ts";
import SheOption from "@/components/primitive/she-option/SheOption.tsx";
import useComponentUtilities from "@/utils/hooks/useComponentUtilities.ts";
import useDefaultRef from "@/utils/hooks/useDefaultRef.ts";
import { PopoverAnchor } from "@radix-ui/react-popover";
import { Check } from "lucide-react";

export default function SheAutocomplete(props: ISheAutocomplete): JSX.Element {
  // ==================================================================== PROPS
  const {
    ref: triggerRef,
    popoverRef,
    id,
    className = "",
    style,
    elementClassName = "",
    elementStyle,
    popoverClassName = "",
    popoverStyle,
    searchValue,
    selectBtnProps,
    showSelectBtn,
    noDataPlaceholder = "no data to display...",
    noDataPlaceholderTransKey = "PLACE_VALID_TRANS_KEY",
    noSearchPlaceholder = "no options was found...",
    noSearchPlaceholderTransKey = "PLACE_VALID_TRANS_KEY",
    items,
    autoFocus,
    disabled,
    isLoading,
    isOpen,
    openOnFocus,
    minWidth,
    maxWidth,
    fullWidth,
    minAmount = 0,
    onOpen,
    onChange,
    onBlur,
    onSearch,
    onSelect,
    onSelectModel,
  } = props;
  const sheAutocompleteProps = getCustomProps<
    ISheAutocomplete,
    ISheAutocomplete
  >(props, SheAutocompleteDefaultModel);
  const sheInputProps = getCustomProps<ISheAutocomplete, ISheInput>(
    props,
    SheInputDefaultModel,
  );

  // ==================================================================== STATE MANAGEMENT
  const [_items, setItems] = useState<ISheOption<string>[]>(null);
  const [_selected, setSelected] = useState<string>(null);
  const [_open, setOpen] = useState<boolean>(null);
  const [_loading, setLoading] = useState<boolean>(null);
  const [_searchValue, setSearchValue] = useState<string>(null);

  // ==================================================================== REFS
  const _triggerRef = useDefaultRef<HTMLInputElement>(triggerRef);
  const _popoverRef = useDefaultRef<HTMLDivElement>(popoverRef);

  // ==================================================================== UTILITIES
  const { setFocus, initializeItemsList, calculatePopoverWidth } =
    useComponentUtilities({
      identifier: "SheAutocomplete",
    });

  // ==================================================================== SIDE EFFECTS
  useEffect(() => {
    _updateComponentStyles();
  }, []);

  useEffect(() => {
    const newItems = initializeItemsList<string, ISheOption<string>>(items);

    if (!_.isEqual(newItems, _items)) {
      setItems(newItems);
    }

    if (searchValue !== _searchValue) {
      setSearchValue(searchValue);
      setSelected(searchValue);
    }

    const tmpSearchValue = searchValue?.trim();
    const tmpOpen =
      !_.isNil(minAmount) && minAmount > 0
        ? tmpSearchValue && tmpSearchValue.length + 1 > minAmount
        : autoFocus;

    _updateFocusRelatedLogic(tmpOpen, openOnFocus);
  }, [items, searchValue]);

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
  }, [isOpen, isLoading, disabled]);

  useEffect(() => {
    const tmpSearchValue = _searchValue?.trim();
    const tmpOpen =
      !_.isNil(minAmount) && minAmount > 0
        ? tmpSearchValue && tmpSearchValue.length + 1 > minAmount
        : autoFocus;

    _updateFocusRelatedLogic(tmpOpen, openOnFocus);
  }, [autoFocus]);

  const filteredItems: ISheOption<string>[] = useMemo(() => {
    if (!_items || _items.length === 0) return [];

    return _items.filter((item) =>
      _searchValue && _searchValue.length > 0
        ? item.text.toLowerCase().includes(_searchValue.toLowerCase())
        : true,
    );
  }, [_items, _searchValue]);

  // ==================================================================== EVENT HANDLERS
  function onChangeHandler(value: string) {
    const tmpSearchValue = value.trim();
    const tmpOpen =
      !_.isNil(minAmount) && minAmount > 0
        ? tmpSearchValue && tmpSearchValue.length + 1 > minAmount
        : true;

    _setIsOpen(tmpOpen);
    setSearchValue(tmpSearchValue);
    if (onChange) onChange(tmpSearchValue);
  }

  function onBlurHandler() {
    _setIsOpen(false);
    if (onBlur) onBlur(_searchValue);
  }

  function onSearchHandler() {
    onSearch?.(_searchValue);
  }

  function onSelectHandler(
    value: string,
    event?: React.MouseEvent | React.KeyboardEvent,
  ) {
    _setIsOpen(false);

    if (value !== _searchValue) setSearchValue(value);
    if (value !== _selected) {
      setSelected(value);
      onSelect?.(value);
      onSelectModel?.({
        value,
        model: { ...sheAutocompleteProps, searchValue: value },
        event,
      });
    }

    event?.stopPropagation();
  }

  function onForceSelectHandler(
    value: string,
    event?: React.MouseEvent | React.KeyboardEvent,
  ) {
    _setIsOpen(false);
    setSelected(value);
    onSelect?.(value);
    onSelectModel?.({
      value,
      model: { ...sheAutocompleteProps, searchValue: value },
      event,
    });
    // setFocus<HTMLInputElement>(true, _triggerRef);
    event?.stopPropagation();
  }

  function onFocusHandler() {
    const tmpSearchValue = _searchValue?.trim();
    const tmpOpen =
      !_.isNil(minAmount) && minAmount > 0
        ? tmpSearchValue && tmpSearchValue.length + 1 > minAmount
        : true;

    setTimeout(() => _setIsOpen(tmpOpen));
  }

  function onEnterHandler(event: React.KeyboardEvent) {
    if (event.code === "Enter") onSelectHandler(_searchValue, event);
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
      }
    }
  }

  function _updateFocusRelatedLogic(_autoFocus, _openOnFocus) {
    if (!items || items.length === 0) return;

    if (_openOnFocus || isOpen) {
      _setIsOpen(isOpen ?? _autoFocus);
      setFocus<HTMLDivElement>(_autoFocus, _popoverRef);
    }
  }

  function _updateComponentStyles() {
    const element = document.getElementsByClassName(cs.sheAutocomplete);
    if (element) element[0].parentElement.style.overflow = "visible";
  }

  // ==================================================================== LAYOUT
  return (
    <Popover open={_open} onOpenChange={setOpen}>
      <Command>
        <div
          id={id}
          className={`${cs.sheAutocomplete} ${className} ${fullWidth ? cs.fullWidth : ""}`}
          style={{
            minWidth,
            maxWidth,
            ...style,
          }}
        >
          <div className={cs.sheAutocompleteTriggerContainer}>
            <PopoverAnchor className={cs.sheAutocompleteTriggerAnchor}>
              <SheInput
                {...sheInputProps}
                ref={_triggerRef}
                className={elementClassName}
                style={elementStyle}
                value={_searchValue}
                disabled={disabled}
                autoFocus={autoFocus}
                isLoading={_loading}
                fullWidth
                ignoreValidation
                onFocus={onFocusHandler}
                onKeyDown={onEnterHandler}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
                onDelay={onSearchHandler}
                onClear={onForceSelectHandler}
              />
            </PopoverAnchor>
            {showSelectBtn && (
              <SheButton
                icon={Check}
                variant="secondary"
                isLoading={_loading}
                disabled={
                  !_searchValue ||
                  _searchValue.length === 0 ||
                  _selected === _searchValue
                }
                onKeyDown={(event) =>
                  event.code === "Enter" &&
                  onForceSelectHandler(_searchValue, event)
                }
                onClick={(event) => onForceSelectHandler(_searchValue, event)}
                {...selectBtnProps}
              />
            )}
          </div>
        </div>
        <PopoverContent
          ref={_popoverRef}
          className={`${popoverClassName} ${cs.sheAutocompletePopoverContainer} ${disabled || isLoading ? "disabled" : ""}`}
          style={{
            ...popoverStyle,
          }}
          align="start"
          onOpenAutoFocus={(event) => event.preventDefault()}
        >
          <CommandList>
            <CommandGroup className={cs.sheAutocompleteGroupContainer}>
              {_items && _items.length > 0 ? (
                <div>
                  {filteredItems && filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                      <CommandItem
                        key={item.id}
                        className={cs.sheAutocompleteItemParentWrapper}
                      >
                        <SheOption<string>
                          {...item}
                          className={`${cs.sheSelectItemOption}`}
                          mode="plain"
                          view="normal"
                          onClick={(data) =>
                            onSelectHandler(item.text, data.event)
                          }
                        />
                      </CommandItem>
                    ))
                  ) : (
                    <div className={cs.sheAutocompletePopoverPlaceholder}>
                      <span className="she-text">
                        <Trans i18nKey={noSearchPlaceholderTransKey}>
                          {noSearchPlaceholder}
                        </Trans>
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div className={cs.sheAutocompletePopoverPlaceholder}>
                  <span className="she-text">
                    <Trans i18nKey={noDataPlaceholderTransKey}>
                      {noDataPlaceholder}
                    </Trans>
                  </span>
                </div>
              )}
            </CommandGroup>
          </CommandList>
        </PopoverContent>
      </Command>
    </Popover>
  );
}
