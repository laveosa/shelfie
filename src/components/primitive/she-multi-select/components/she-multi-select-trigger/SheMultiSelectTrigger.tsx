import React, { JSX } from "react";

import cs from "./SheMultiSelectTrigger.module.scss";
import { cn } from "@/lib/utils.ts";
import { ISheMultiSelectTrigger } from "@/const/interfaces/primitive-components/ISheMultiSelectTrigger.ts";
import { Button } from "@/components/ui/button.tsx";
import SheBadge from "@/components/primitive/she-badge/SheBadge.tsx";
import { PopoverTrigger } from "@/components/ui/popover.tsx";
import { ISheMultiSelectItem } from "@/const/interfaces/primitive-components/ISheMultiSelectItem.ts";
import { ChevronDown } from "lucide-react";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";
import { SheLabel } from "@/components/primitive/she-label/SheLabel.tsx";
import SheSkeleton from "@/components/primitive/she-skeleton/SheSkeleton.tsx";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";
import SheSelectItem from "@/components/primitive/she-select-item/SheSelectItem.tsx";
import { SheClearButton } from "@/components/primitive/she-clear-button/SheClearButton.tsx";

export default function SheMultiSelectTrigger({
  id,
  className = "",
  style,
  elementClassName = "",
  elementStyle,
  icon,
  label,
  labelTransKey,
  placeholder = "select items...",
  placeholderTransKey = "REPLACE_WIDTH_VALID_TRANS_KEY_FOR_DEFAULT_PLACEHOLDER",
  options,
  selectedValues,
  maxCount,
  asChild,
  showClearBtn,
  tooltip,
  ariaDescribedbyId,
  required,
  minWidth,
  maxWidth,
  fullWidth,
  disabled,
  isLoading,
  onTogglePopover,
  onToggleOption,
  onClearExtraOptions,
  onClearAll,
  ...props
}: ISheMultiSelectTrigger): JSX.Element {
  const { translate } = useAppTranslation();

  // ==================================================================== EVENT

  // ==================================================================== PRIVATE

  // ==================================================================== LAYOUT

  return (
    <PopoverTrigger asChild>
      <div
        id={id}
        className={`${cs.sheMultiSelectTrigger} ${className} ${icon ? cs.withIcon : ""} ${fullWidth ? cs.fullWidth : ""} ${required ? cs.required : ""}`}
        style={{
          minWidth,
          maxWidth,
          ...style,
        }}
      >
        <div className={cs.sheMultiSelectTriggerComponent}>
          <SheLabel
            label={label}
            labelTransKey={labelTransKey}
            tooltip={tooltip}
            ariaDescribedbyId={ariaDescribedbyId}
          />
          <div className={cs.sheMultiSelectTriggerControl}>
            <SheSkeleton
              className={cs.sheMultiSelectTriggerSkeleton}
              isLoading={isLoading}
              fullWidth
            >
              <Button
                className={`${elementClassName} ${cs.sheMultiSelectTriggerElement}`}
                style={elementStyle}
                onClick={onTogglePopover}
                {...props}
              >
                <SheIcon
                  icon={icon}
                  className={cs.iconBlock}
                  aria-describedby={ariaDescribedbyId}
                />
                {selectedValues?.length > 0 ? (
                  <div className="flex justify-between items-center w-full">
                    <div className="flex flex-wrap items-center">
                      {selectedValues.slice(0, maxCount).map((value, idx) => {
                        const option = options.find(
                          (item: ISheMultiSelectItem) => item.value === value,
                        );
                        return (
                          <SheBadge
                            key={`${ariaDescribedbyId}_BADGE_${idx + 1}`}
                            text={option?.label}
                            icon={option?.icon}
                            onClose={() => {
                              onToggleOption(value);
                            }}
                          />
                        );
                      })}
                      {selectedValues?.length > maxCount && (
                        <SheBadge
                          text={`+ ${selectedValues.length - maxCount} more`}
                          onClose={() => {
                            onClearExtraOptions();
                          }}
                        />
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between w-full mx-auto">
                    <span className="text-sm text-muted-foreground mx-3">
                      {translate(placeholderTransKey, placeholder)}
                    </span>
                    <ChevronDown className="h-4 cursor-pointer text-muted-foreground mx-2" />
                  </div>
                )}
              </Button>
            </SheSkeleton>
            <SheClearButton
              value={selectedValues?.length > 0}
              showClearBtn={showClearBtn}
              disabled={disabled}
              isLoading={isLoading}
              ariaDescribedbyId={ariaDescribedbyId}
              onClear={onClearAll}
            />
          </div>
        </div>
      </div>
    </PopoverTrigger>
  );
}
