import React, { JSX, useEffect, useMemo, useState } from "react";
import { Trans } from "react-i18next";
import _ from "lodash";

import { Check } from "lucide-react";
import { PopoverAnchor } from "@radix-ui/react-popover";
import cs from "./SheAutocomplete.module.scss";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command.tsx";
import { Popover, PopoverContent } from "@/components/ui/popover.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import SheOption from "@/components/primitive/she-option/SheOption.tsx";
import ShePrimitiveComponentWrapper from "@/components/primitive/she-primitive-component-wrapper/ShePrimitiveComponentWrapper.tsx";
import useComponentUtilities from "@/utils/hooks/useComponentUtilities.ts";
import useDefaultRef from "@/utils/hooks/useDefaultRef.ts";
import {
  filterCustomProps,
  getCustomProps,
  removeCustomProps,
} from "@/utils/helpers/props-helper.ts";
import { ISheOption } from "@/const/interfaces/primitive-components/ISheOption.ts";
import { ISheAutocomplete } from "@/const/interfaces/primitive-components/ISheAutocomplete.ts";
import {
  IShePrimitiveComponentWrapper,
  ShePrimitiveComponentWrapperDefaultModel,
} from "@/const/interfaces/primitive-components/IShePrimitiveComponentWrapper.ts";
import { SheLabelDefaultModel } from "@/const/interfaces/primitive-components/ISheLabel.ts";
import { SheDescriptionBlockDefaultModel } from "@/const/interfaces/primitive-components/ISheDescriptionBlock.ts";
import { SheErrorMessageBlockDefaultModel } from "@/const/interfaces/primitive-components/ISheErrorMessageBlock.ts";

const SheAutocompletePCWDefaultModel: IShePrimitiveComponentWrapper = {
  ...SheLabelDefaultModel,
  ...SheDescriptionBlockDefaultModel,
  ...SheErrorMessageBlockDefaultModel,
  id: undefined,
  className: undefined,
  style: undefined,
  minWidth: undefined,
  maxWidth: undefined,
  fullWidth: undefined,
  isLoading: undefined,
  disabled: undefined,
  required: undefined,
  ariaDescribedbyId: undefined,
  view: undefined,
};

export default function SheAutocomplete(props: ISheAutocomplete): JSX.Element {
  // ==================================================================== PROPS
  const {
    ref: triggerRef,
    popoverRef,
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
    icon,
    iconPosition = "in",
    autoFocus,
    disabled,
    isLoading,
    isOpen,
    minAmount = 0,
    onOpen,
    onChange,
    onBlur,
    onSearch,
    onSelect,
  } = props;
  const shePrimitiveComponentWrapperProps = getCustomProps<
    ISheAutocomplete,
    IShePrimitiveComponentWrapper
  >(props, ShePrimitiveComponentWrapperDefaultModel);
  const autocompleteWrapperProps = filterCustomProps(
    shePrimitiveComponentWrapperProps,
    [SheAutocompletePCWDefaultModel],
  );
  const inputWrapperProps = removeCustomProps(
    shePrimitiveComponentWrapperProps,
    [SheAutocompletePCWDefaultModel],
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
  const {
    ariaDescribedbyId,
    setFocus,
    initializeItemsList,
    calculatePopoverWidth,
  } = useComponentUtilities({
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

    _updateFocusRelatedLogic(
      _checkIsOpenCondition(autoFocus, _searchValue?.trim()),
    );
  }, [items, searchValue]);

  useEffect(() => {
    const shouldTryOpen = _checkIsOpenCondition(true, _searchValue?.trim());

    if (!_open && _items?.length && shouldTryOpen) {
      if (document.activeElement === _triggerRef.current) {
        _setIsOpen(true);
      }
    }
  }, [_items]);

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
    _updateFocusRelatedLogic(
      _checkIsOpenCondition(autoFocus, _searchValue?.trim()),
    );
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
    const tmpSearchValue = value?.trim();
    _setIsOpen(_checkIsOpenCondition(true, tmpSearchValue));
    setSearchValue(tmpSearchValue);
    onChange?.(tmpSearchValue);
  }

  function onBlurHandler() {
    setTimeout(() => {
      _setIsOpen(false);
      onBlur?.(_searchValue);
    }, 100);
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
      onSelect?.(value, {
        value,
        model: { ...props, searchValue: value },
        event,
      });
    }

    event?.stopPropagation();
  }

  function onForceSelectHandler(
    value: string,
    event?: React.MouseEvent | React.KeyboardEvent,
  ) {
    setSelected(value);
    onSelect?.(value, {
      value,
      model: { ...props, searchValue: value },
      event,
    });
    setSearchValue(value);

    setTimeout(() => {
      setFocus<HTMLInputElement>(true, _triggerRef);
    }, 0);

    event?.stopPropagation();
  }

  function onFocusHandler() {
    setTimeout(() =>
      _setIsOpen(_checkIsOpenCondition(true, _searchValue?.trim())),
    );
  }

  function onEnterHandler(event: React.KeyboardEvent) {
    if (event.code === "Enter") onSelectHandler(_searchValue, event);
  }

  function onClearHandler(event?: React.MouseEvent | React.KeyboardEvent) {
    setSelected(undefined);
    setSearchValue("");
    onSelect?.("", {
      value: "",
      model: { ...props, searchValue: "" },
      event,
    });
    event?.stopPropagation();
    setFocus<HTMLInputElement>(true, _triggerRef);
    setTimeout(() => {
      _setIsOpen(true);
    });
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
        setTimeout(() =>
          calculatePopoverWidth<HTMLInputElement>(_popoverRef, _triggerRef),
        );
      }
    }
  }

  function _checkIsOpenCondition(_isOpen: boolean, _search: string) {
    return !_.isNil(minAmount) && minAmount > 0
      ? _search && _search.length + 1 > minAmount
      : _isOpen;
  }

  function _updateFocusRelatedLogic(_autoFocus) {
    if (!items || items.length === 0) return;

    if (isOpen) {
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
      <Command className={cs.sheAutocompletePopoverWrapper}>
        <ShePrimitiveComponentWrapper
          {...autocompleteWrapperProps}
          className={`${cs.sheAutocomplete} ${shePrimitiveComponentWrapperProps.className}`}
          ariaDescribedbyId={ariaDescribedbyId}
        >
          <PopoverAnchor className={cs.sheAutocompleteTriggerAnchor}>
            <SheInput
              ref={_triggerRef}
              {...inputWrapperProps}
              ariaDescribedbyId={ariaDescribedbyId}
              className={elementClassName}
              style={elementStyle}
              value={_searchValue}
              disabled={disabled}
              autoFocus={autoFocus}
              isLoading={_loading}
              fullWidth
              ignoreValidation
              hideErrorMessage
              hideDescription
              onFocus={onFocusHandler}
              onKeyDown={onEnterHandler}
              onChange={onChangeHandler}
              onBlur={onBlurHandler}
              onDelay={onSearchHandler}
              onClear={onClearHandler}
            />
          </PopoverAnchor>
          {showSelectBtn && (
            <SheButton
              className={cs.sheAutocompleteSelectButton}
              icon={Check}
              variant="secondary"
              size="small"
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
        </ShePrimitiveComponentWrapper>
        <PopoverContent
          ref={_popoverRef}
          className={`${popoverClassName} ${cs.sheAutocompletePopoverContainer} ${icon && iconPosition === "out" ? "withIcon" : ""} ${disabled || isLoading ? "disabled" : ""}`}
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
