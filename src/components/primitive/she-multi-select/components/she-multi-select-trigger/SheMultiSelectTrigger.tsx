import React, { JSX } from "react";

import cs from "./SheMultiSelectTrigger.module.scss";
import { ISheMultiSelectTrigger } from "@/const/interfaces/primitive-components/ISheMultiSelectTrigger.ts";
import { Button } from "@/components/ui/button.tsx";
import { PopoverTrigger } from "@/components/ui/popover.tsx";
import { SheLabel } from "@/components/primitive/she-label/SheLabel.tsx";
import SheSkeleton from "@/components/primitive/she-skeleton/SheSkeleton.tsx";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import { SheClearButton } from "@/components/primitive/she-clear-button/SheClearButton.tsx";
import SheBadgeList from "@/components/primitive/she-badge-list/SheBadgeList.tsx";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";
import { ChevronDown } from "lucide-react";

export default function SheMultiSelectTrigger({
  id,
  className = "",
  style,
  elementClassName = "",
  elementStyle,
  label,
  labelTransKey,
  icon,
  items,
  badgeListProps,
  contextType = "string",
  placeholder = "select items...",
  placeholderTransKey = "REPLACE_WIDTH_VALID_TRANS_KEY_FOR_DEFAULT_PLACEHOLDER",
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
  isOpen,
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
            <PopoverTrigger asChild>
              <Button
                className={`${elementClassName} ${cs.sheMultiSelectTriggerElement}`}
                style={elementStyle}
                disabled={disabled || isLoading}
                autoFocus={autoFocus}
                onClick={onTogglePopover}
                {...props}
              >
                <SheIcon
                  icon={icon}
                  className={cs.iconBlock}
                  aria-describedby={ariaDescribedbyId}
                />
                {contextType === "badges" && (
                  <SheBadgeList
                    items={items}
                    placeholder={placeholder}
                    placeholderTransKey={placeholderTransKey}
                    maxBadgeAmount={maxCount}
                    autoBadgeAmount
                    showCloseBtn
                    onClick={onTogglePopover}
                    onClose={(item) => onToggleOption(item.value)}
                    onCloseAllExtra={onClearExtraOptions}
                    {...badgeListProps}
                  />
                )}
                {contextType === "string" && (
                  <div className={cs.sheMultiSelectTriggerContextString}>
                    {items && items.length > 0 ? (
                      <div className={cs.contextStringWrapper}>
                        <span className="she-text">
                          [
                          <span
                            className="she-placeholder"
                            style={{ fontWeight: "bold" }}
                          >
                            {items.length}
                          </span>
                          ]{" "}
                          {items.map((item, idx) => (
                            <span
                              key={`${item.text}_${idx + 1}`}
                              className="she-text"
                            >
                              {item.text} {idx !== items.length - 1 ? "| " : ""}
                            </span>
                          ))}
                        </span>
                      </div>
                    ) : (
                      <div className={cs.contextStringWrapper}>
                        <span className="she-placeholder">
                          {translate(placeholderTransKey, placeholder)}
                        </span>
                      </div>
                    )}
                  </div>
                )}
                <SheIcon
                  icon={ChevronDown}
                  className={`${cs.chevronIconBlock} ${isOpen ? cs.rotateChevronIcon : ""}`}
                  aria-describedby={ariaDescribedbyId}
                />
              </Button>
            </PopoverTrigger>
          </SheSkeleton>
          <SheClearButton
            value={items && items.length > 0}
            showClearBtn={showClearBtn}
            disabled={disabled}
            isLoading={isLoading}
            ariaDescribedbyId={ariaDescribedbyId}
            onClear={onClearAll}
          />
        </div>
      </div>
    </div>
  );
}
