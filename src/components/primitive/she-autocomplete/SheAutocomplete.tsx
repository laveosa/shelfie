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
import { ISheAutocomplete } from "@/const/interfaces/primitive-components/ISheAutocomplete.ts";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import { Popover, PopoverContent } from "@/components/ui/popover.tsx";
import { PopoverAnchor } from "@radix-ui/react-popover";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { ISheAutocompleteItem } from "@/const/interfaces/primitive-components/ISheAutocompleteItem.ts";
import { getCustomProps } from "@/utils/helpers/props-helper.ts";
import { addItemsId } from "@/utils/helpers/quick-helper.ts";
import { Check } from "lucide-react";

export default function SheAutocomplete({
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
  minWidth,
  maxWidth,
  fullWidth,
  onChange,
  onBlur,
  onSearch,
  onSelect,
  onIsOpen,
  ...props
}: ISheAutocomplete): JSX.Element {
  const [_items, setItems] = useState<ISheAutocompleteItem[]>(null);
  const [_searchValue, setSearchValue] = useState<string>(null);
  const [_selected, setSelected] = useState<string>(null);
  const [_isPopoverOpen, setIsPopoverOpen] = useState(false);

  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLInputElement>(null);
  const sheInputProps = getCustomProps<ISheAutocomplete, ISheInput>(
    props,
    SheInputDefaultModel,
  );
  const filteredItems: ISheAutocompleteItem[] = useMemo(() => {
    if (!_items || _items.length === 0) return [];

    return _items.filter((option) =>
      _searchValue && _searchValue.length > 0
        ? option.text.includes(_searchValue)
        : true,
    );
  }, [_items, _searchValue]);

  useEffect(() => {
    if (!_.isEqual(items, _items))
      setItems(addItemsId<ISheAutocompleteItem>(items));
    if (searchValue !== _searchValue) {
      setSearchValue(searchValue);
      setSelected(searchValue);
    }
    _setAutoFocus();
  }, [items, searchValue]);

  useEffect(() => {
    if (onIsOpen) onIsOpen(_isPopoverOpen);
    if (_isPopoverOpen) _calculatePopoverWidth();
  }, [_isPopoverOpen]);

  useEffect(() => {
    if (!_.isNil(isOpen) && isOpen !== _isPopoverOpen) setIsPopoverOpen(isOpen);
    _calculatePopoverWidth();
  }, [isOpen]);

  useEffect(() => {
    _setAutoFocus();
  }, [autoFocus]);

  // ==================================================================== EVENT

  function onChangeHandler(data: string) {
    const tmpSearchValue = data.trim();
    setIsPopoverOpen(true);
    setSearchValue(tmpSearchValue);
    if (onChange) onChange(tmpSearchValue);
  }

  function onBlurHandler() {
    setIsPopoverOpen(false);
    if (onBlur) onBlur(_searchValue);
  }

  function onSearchHandler() {
    if (onSearch) onSearch(_searchValue);
  }

  function onSelectHandler(data: string) {
    setIsPopoverOpen(false);
    setSelected(data);

    if (data !== _searchValue) {
      setSearchValue(data);
      if (onSelect) onSelect(data);
    }
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

  // ==================================================================== LAYOUT

  return (
    <Popover open={_isPopoverOpen} onOpenChange={setIsPopoverOpen}>
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
                ref={triggerRef}
                className={elementClassName}
                style={elementStyle}
                value={_searchValue}
                disabled={disabled}
                autoFocus={autoFocus}
                fullWidth
                onFocus={() => setTimeout(() => setIsPopoverOpen(true))}
                onKeyDown={(event) =>
                  event.code === "Enter" && onSelectHandler(_searchValue)
                }
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
                onDelay={onSearchHandler}
                onClear={() => onSelectHandler(null)}
                {...sheInputProps}
              />
            </PopoverAnchor>
            {showSelectBtn && (
              <SheButton
                icon={Check}
                variant="secondary"
                disabled={
                  !_searchValue ||
                  _searchValue.length === 0 ||
                  _selected === _searchValue
                }
                onClick={() => onSelectHandler(_searchValue)}
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
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <CommandList>
            <CommandGroup>
              {_items && _items.length > 0 ? (
                <div>
                  {filteredItems && filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                      <div
                        key={item.id}
                        className={cs.sheAutocompleteItemParentWrapper}
                        onKeyDown={() => console.log("fix this logic")}
                        onClick={() => onSelectHandler(item.text)}
                      >
                        <CommandItem>
                          <span className="she-text">
                            <Trans i18nKey={item.textTransKey}>
                              {item.text}
                            </Trans>
                          </span>
                        </CommandItem>
                      </div>
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
