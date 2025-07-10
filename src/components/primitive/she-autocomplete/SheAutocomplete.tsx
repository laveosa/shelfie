import React, { JSX, useEffect, useMemo, useRef, useState } from "react";
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
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import { Popover, PopoverContent } from "@/components/ui/popover.tsx";
import { PopoverAnchor } from "@radix-ui/react-popover";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { getCustomProps } from "@/utils/helpers/props-helper.ts";
import { ISheOption } from "@/const/interfaces/primitive-components/ISheOption.ts";
import SheOption from "@/components/primitive/she-option/SheOption.tsx";
import useComponentUtilities from "@/utils/hooks/useComponentUtilities.ts";
import { Check } from "lucide-react";

export default function SheAutocomplete(props: ISheAutocomplete): JSX.Element {
  // ==================================================================== PROPS
  const {
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
  // TODO ---------------------------------------------- all ref-s need to be in props and use "useDefaultRef" logic
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLInputElement>(null);

  // ==================================================================== UTILITIES
  const { setFocus, initializeItemsList, calculatePopoverWidth } =
    useComponentUtilities({
      identifier: "SheAutocomplete",
    });

  const filteredItems: ISheOption<string>[] = useMemo(() => {
    if (!_items || _items.length === 0) return [];

    return _items.filter((item) =>
      _searchValue && _searchValue.length > 0
        ? item.text.toLowerCase().includes(_searchValue.toLowerCase())
        : true,
    );
  }, [_items, _searchValue]);

  // ==================================================================== SIDE EFFECTS
  useEffect(() => {
    _updateComponentStyles();
  }, []);

  useEffect(() => {
    if (!_.isEqual(items, _items)) {
      setItems(initializeItemsList<ISheOption<string>>(items));
    }

    if (searchValue !== _searchValue) {
      setSearchValue(searchValue);
      setSelected(searchValue);
    }

    setFocus<HTMLInputElement>(autoFocus, triggerRef);
  }, [items, searchValue]);

  useEffect(() => {
    if (typeof isLoading === "boolean" && isLoading !== _loading) {
      setLoading(isLoading);
    }

    if (
      !_.isNil(isOpen) &&
      typeof isOpen === "boolean" &&
      !_.isEqual(isOpen, _open)
    ) {
      _updateIsOpenCondition(isOpen, searchValue);
    }

    calculatePopoverWidth<HTMLInputElement>(popoverRef, triggerRef);
  }, [isOpen, isLoading, disabled]);

  useEffect(() => {
    setFocus<HTMLInputElement>(autoFocus, triggerRef);
  }, [autoFocus]);

  // ==================================================================== EVENT HANDLERS
  function onChangeHandler(value: string) {
    const tmpSearchValue = value.trim();
    _updateIsOpenCondition(true, tmpSearchValue);
    setSearchValue(tmpSearchValue);
    if (onChange) onChange(tmpSearchValue);
  }

  function onBlurHandler() {
    _updateIsOpenCondition(false, _searchValue);
    if (onBlur) onBlur(_searchValue);
  }

  function onSearchHandler() {
    if (onSearch) onSearch(_searchValue);
  }

  function onSelectHandler(
    value: string,
    event?: React.MouseEvent | React.KeyboardEvent,
  ) {
    _updateIsOpenCondition(false, value);
    if (value !== _searchValue) setSearchValue(value);
    setSelected(value);
    onSelect?.(value);
    onSelectModel?.({
      value,
      model: { ...sheAutocompleteProps, searchValue: value },
      event,
    });
    event?.stopPropagation();
  }

  function onForceSelectHandler(
    value: string,
    event?: React.MouseEvent | React.KeyboardEvent,
  ) {
    _updateIsOpenCondition(false, value);
    setSelected(value);
    onSelect?.(value);
    onSelectModel?.({
      value,
      model: { ...sheAutocompleteProps, searchValue: value },
      event,
    });
    setTimeout(() => triggerRef.current.focus());
    event?.stopPropagation();
  }

  function onFocusHandler() {
    setTimeout(() => _updateIsOpenCondition(true, _searchValue));
  }

  function onEnterHandler(event: React.KeyboardEvent) {
    if (event.code === "Enter") onSelectHandler(_searchValue, event);
  }

  // ==================================================================== PRIVATE
  function _updateIsOpenCondition(
    _isOpen: boolean,
    value: string = _searchValue,
  ) {
    if (isLoading || disabled) {
      setOpen(false);
      return null;
    }

    if (minAmount && minAmount > 0) {
      setOpen(value?.length + 1 > minAmount);
    } else {
      setOpen(_isOpen);
    }

    calculatePopoverWidth<HTMLInputElement>(popoverRef, triggerRef);
    onOpen?.(_open);
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
                ref={triggerRef}
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
          ref={popoverRef}
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
