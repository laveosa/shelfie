import React, { JSX } from "react";

import cs from "./SheMultiSelectTrigger.module.scss";
import { ISheMultiSelectTrigger } from "@/const/interfaces/primitive-components/ISheMultiSelectTrigger.ts";
import { Button } from "@/components/ui/button.tsx";
import { PopoverTrigger } from "@/components/ui/popover.tsx";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";
import { SheLabel } from "@/components/primitive/she-label/SheLabel.tsx";
import SheSkeleton from "@/components/primitive/she-skeleton/SheSkeleton.tsx";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import { SheClearButton } from "@/components/primitive/she-clear-button/SheClearButton.tsx";
import SheBadgeList from "@/components/primitive/she-badge-list/SheBadgeList.tsx";
import { ChevronDown } from "lucide-react";

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
  items,
  maxCount,
  autoFocus,
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
                autoFocus={autoFocus}
                onClick={onTogglePopover}
                {...props}
              >
                <SheIcon
                  icon={icon}
                  className={cs.iconBlock}
                  aria-describedby={ariaDescribedbyId}
                />
                <SheBadgeList
                  items={items}
                  showCloseBtn
                  fullWidth
                  maxBadgeAmount={3}
                  // autoBadgeAmount
                  onClick={onTogglePopover}
                  onClose={(item) => onToggleOption(item.value)}
                  onCloseAllExtra={onClearExtraOptions}
                />
                <SheIcon
                  icon={ChevronDown}
                  className={cs.chevronIconBlock}
                  aria-describedby={ariaDescribedbyId}
                />
              </Button>
            </SheSkeleton>
            <SheClearButton
              value={items?.length > 0}
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
