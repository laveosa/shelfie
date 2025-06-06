import { JSX, useEffect, useRef, useState } from "react";
import * as React from "react";
import _ from "lodash";
import { cn } from "@/lib/utils";

import { CheckIcon } from "lucide-react";

import cs from "./SheMultiSelect.module.scss";
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverContent } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { ISheMultiSelect } from "@/const/interfaces/primitive-components/ISheMultiSelect.ts";
import SheMultiSelectTrigger from "@/components/primitive/she-multi-select/components/she-multi-select-trigger/SheMultiSelectTrigger.tsx";
import { generateId } from "@/utils/helpers/quick-helper.ts";
import { ISheMultiSelectItem } from "@/const/interfaces/primitive-components/ISheMultiSelectItem.ts";
import { ISheBadge } from "@/const/interfaces/primitive-components/ISheBadge.ts";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";

export default function SheMultiSelect({
  popoverClassName = "",
  popoverStyles,
  icon,
  options,
  selectedValues,
  isOpen,
  isLoading,
  disabled,
  searchPlaceholder = "search...",
  searchPlaceholderTransKey,
  emptySearchPlaceholder = "no data to display",
  emptySearchPlaceholderTransKey,
  onIsOpen,
  onValueChange,
  onClear,
  ...props
}: ISheMultiSelect): JSX.Element {
  const { translate } = useAppTranslation();
  const [_options, setOptions] = useState<ISheMultiSelectItem[]>(null);
  const [_selectedValues, setSelectedValues] = useState<any[]>([]);
  const [_badges, setBadges] = useState<ISheBadge[]>(null);
  const [_isPopoverOpen, setIsPopoverOpen] = useState(false);

  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const ariaDescribedbyId = `${generateId()}_MULTI_SELECT_ID`;

  useEffect(() => {
    if (!_.isEqual(options, _options)) {
      setOptions(options);
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

  function _calculatePopoverWidth() {
    setTimeout(() => {
      const popover = popoverRef?.current;
      const trigger = triggerRef?.current;
      popover.style.width = `${trigger.clientWidth}px`;
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
          <CommandInput
            className={cs.sheMultiSelectPopoverSearchBlock}
            placeholder={translate(
              searchPlaceholderTransKey,
              searchPlaceholder,
            )}
          />
          <CommandList>
            <CommandEmpty
              className={cs.sheMultiSelectPopoverNoDataMessageBlock}
            >
              {translate(
                emptySearchPlaceholderTransKey,
                emptySearchPlaceholder,
              )}
            </CommandEmpty>
            <CommandGroup className={cs.sheMultiSelectPopoverGroupContainer}>
              <CommandItem
                key="all"
                className="cursor-pointer"
                onSelect={onToggleAllHandler}
              >
                <div
                  className={cn(
                    "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                    _selectedValues?.length === _options?.length
                      ? "bg-primary text-primary-foreground"
                      : "opacity-50 [&_svg]:invisible",
                  )}
                >
                  <CheckIcon className="h-4 w-4" />
                </div>
                <span>(Select All)</span>
              </CommandItem>
              {_options?.map((option, idx) => {
                const isSelected = _selectedValues?.includes(option.value);
                return (
                  <CommandItem
                    key={idx + 1}
                    onSelect={() => onToggleOptionHandler(option.value)}
                    className="cursor-pointer"
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible",
                      )}
                    >
                      <CheckIcon className="h-4 w-4" />
                    </div>
                    {option.icon && (
                      <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="she-text">{option.text}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup>
              <div className="flex items-center justify-between">
                {_selectedValues?.length > 0 && (
                  <>
                    <CommandItem
                      onSelect={onClearButtonHandler}
                      className="flex-1 justify-center cursor-pointer"
                    >
                      Clear
                    </CommandItem>
                    <Separator
                      orientation="vertical"
                      className="flex min-h-6 h-full"
                    />
                  </>
                )}
                <CommandItem
                  onSelect={onCloseButtonHandler}
                  className="flex-1 justify-center cursor-pointer max-w-full"
                >
                  Close
                </CommandItem>
              </div>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
