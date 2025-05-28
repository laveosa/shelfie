import { JSX, useEffect, useState } from "react";
import * as React from "react";
import _ from "lodash";

import { CheckIcon, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";
import SheBadge from "@/components/primitive/she-badge/SheBadge.tsx";
import SheMultiSelectTrigger from "@/components/primitive/she-multi-select/components/she-multi-select-trigger/SheMultiSelectTrigger.tsx";
import { generateId } from "@/utils/helpers/quick-helper.ts";
import { ISheMultiSelectItem } from "@/const/interfaces/primitive-components/ISheMultiSelectItem.ts";

export default function SheMultiSelect({
  options,
  selectedValues,
  maxCount = 3,
  isModalPopover,
  isOpen,
  onIsOpen,
  onValueChange,
  onClear,
  ...props
}: ISheMultiSelect): JSX.Element {
  const [_options, setOptions] = useState<ISheMultiSelectItem[]>(null);
  const [_selectedValues, setSelectedValues] = useState<string[]>([]);
  const [_isPopoverOpen, setIsPopoverOpen] = useState(false);

  const ariaDescribedbyId = `${generateId()}_MULTI_SELECT_ID`;

  useEffect(() => {
    if (!_.isEqual(options, _options)) setOptions(options);
  }, options);

  useEffect(() => {
    if (
      !_.isNil(selectedValues) &&
      !_.isEqual(selectedValues, _selectedValues)
    ) {
      setSelectedValues(selectedValues);
    }
  }, selectedValues);

  useEffect(() => {
    if (onIsOpen) onIsOpen(_isPopoverOpen);
  }, [_isPopoverOpen]);

  useEffect(() => {
    if (!_.isNil(isOpen) && isOpen !== _isPopoverOpen) setIsPopoverOpen(isOpen);
  }, [isOpen]);

  // ==================================================================== EVENT

  function onTogglePopoverHandler() {
    setIsPopoverOpen((prev) => !prev);
  }

  function onToggleOptionHandler(option: string) {
    const newSelectedValues = _selectedValues.includes(option)
      ? _selectedValues.filter((value) => value !== option)
      : [..._selectedValues, option];
    setSelectedValues(newSelectedValues);
    onValueChange(newSelectedValues);
  }

  function onClearExtraOptionsHandler() {
    const newSelectedValues = _selectedValues.slice(0, maxCount);
    setSelectedValues(newSelectedValues);
    onValueChange(newSelectedValues);
  }

  // ==================================================================== PRIVATE

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setIsPopoverOpen(true);
    } else if (event.key === "Backspace" && !event.currentTarget.value) {
      const newSelectedValues = [..._selectedValues];
      newSelectedValues.pop();
      setSelectedValues(newSelectedValues);
      onValueChange(newSelectedValues);
    }
  };

  const handleClear = () => {
    setSelectedValues([]);
    onValueChange([]);
    if (onClear) onClear([]);
  };

  const toggleAll = () => {
    if (_selectedValues.length === _options.length) {
      handleClear();
    } else {
      const allValues = _options.map((option) => option.value);
      setSelectedValues(allValues);
      onValueChange(allValues);
    }
  };

  // ==================================================================== RENDER

  return (
    <Popover
      open={_isPopoverOpen}
      modal={isModalPopover}
      onOpenChange={setIsPopoverOpen}
    >
      <SheMultiSelectTrigger
        options={_options}
        selectedValues={_selectedValues}
        maxCount={maxCount}
        ariaDescribedbyId={ariaDescribedbyId}
        onTogglePopover={onTogglePopoverHandler}
        onToggleOption={onToggleOptionHandler}
        onClearExtraOptions={onClearExtraOptionsHandler}
        {...props}
      />
      <PopoverContent
        className="w-auto p-0"
        align="start"
        onEscapeKeyDown={() => setIsPopoverOpen(false)}
      >
        <Command>
          <CommandInput
            placeholder="Search..."
            onKeyDown={handleInputKeyDown}
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              <CommandItem
                key="all"
                onSelect={toggleAll}
                className="cursor-pointer"
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
                    <span>{option.label}</span>
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
                      onSelect={handleClear}
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
                  onSelect={() => setIsPopoverOpen(false)}
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
