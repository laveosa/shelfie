import React, { JSX } from "react";
import { Trans } from "react-i18next";

import { ChevronDown } from "lucide-react";
import cs from "./SheMultiSelectTrigger.module.scss";
import { Button } from "@/components/ui/button.tsx";
import { PopoverTrigger } from "@/components/ui/popover.tsx";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import SheBadgeList from "@/components/primitive/she-badge-list/SheBadgeList.tsx";
import ShePrimitiveComponentWrapper from "@/components/primitive/she-primitive-component-wrapper/ShePrimitiveComponentWrapper.tsx";
import useComponentUtilities from "@/utils/hooks/useComponentUtilities.ts";
import {
  getCustomProps,
  removeCustomProps,
} from "@/utils/helpers/props-helper.ts";
import {
  ISheMultiSelectTrigger,
  SheMultiSelectTriggerDefaultModel,
} from "@/const/interfaces/primitive-components/ISheMultiSelectTrigger.ts";
import {
  IShePrimitiveComponentWrapper,
  ShePrimitiveComponentWrapperDefaultModel,
} from "@/const/interfaces/primitive-components/IShePrimitiveComponentWrapper.ts";

export default function SheMultiSelectTrigger<T>(
  props: ISheMultiSelectTrigger<T>,
): JSX.Element {
  // ==================================================================== PROPS
  const {
    elementClassName = "",
    elementStyle,
    items,
    badgeListProps,
    contextType = "string",
    placeholder = "select items...",
    placeholderTransKey = "PLACE_VALID_TRANS_KEY",
    maxCount,
    ariaDescribedbyId,
    disabled,
    isLoading,
    isOpen,
    onTogglePopover,
    onToggleOption,
    onClearExtraOptions,
    onClearAll,
  } = props;
  const shePrimitiveComponentWrapperProps = getCustomProps<
    ISheMultiSelectTrigger<T>,
    IShePrimitiveComponentWrapper
  >(props, ShePrimitiveComponentWrapperDefaultModel);
  const restProps = removeCustomProps<ISheMultiSelectTrigger<T>>(props, [
    SheMultiSelectTriggerDefaultModel,
    ShePrimitiveComponentWrapperDefaultModel,
  ]);

  // ==================================================================== UTILITIES
  const { translate } = useComponentUtilities();

  // ==================================================================== EVENT HANDLERS
  function onKeyDownHandler(event) {
    if ((event.code === "ArrowDown" || event.key === "ArrowDown") && !isOpen) {
      onTogglePopover?.();
      event.preventDefault();
    }
  }

  // ==================================================================== LAYOUT
  return (
    <ShePrimitiveComponentWrapper
      {...shePrimitiveComponentWrapperProps}
      className={`${cs.sheMultiSelectTrigger} ${shePrimitiveComponentWrapperProps.className}`}
      ariaDescribedbyId={ariaDescribedbyId}
      clearBtnValue={items}
      onClear={onClearAll}
    >
      <PopoverTrigger asChild>
        <Button
          {...restProps}
          className={`${elementClassName} ${cs.sheMultiSelectTriggerElement} componentTriggerElement`}
          style={elementStyle}
          disabled={disabled || isLoading}
          onKeyDown={onKeyDownHandler}
          onClick={onTogglePopover}
        >
          {contextType === "badges" && (
            <SheBadgeList
              className={cs.sheMultiSelectTriggerBadgeList}
              skeletonClassName={cs.sheMultiSelectTriggerSkeleton}
              items={items}
              placeholder={placeholder}
              placeholderTransKey={placeholderTransKey}
              maxBadgeAmount={maxCount}
              autoBadgeAmount
              showCloseBtn
              fullWidth
              onClick={onTogglePopover}
              onClose={(item, model) => onToggleOption(item.value, model.event)}
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
                        {translate(item.textTransKey, item.text.toString())}{" "}
                        {idx !== items.length - 1 ? "| " : ""}
                      </span>
                    ))}
                  </span>
                </div>
              ) : (
                <div className={cs.contextStringWrapper}>
                  <span className="she-placeholder">
                    <Trans i18nKey={placeholderTransKey}>{placeholder}</Trans>
                  </span>
                </div>
              )}
            </div>
          )}
          <SheIcon
            icon={ChevronDown}
            className={`${cs.chevronIconBlock} ${isOpen ? cs.rotateChevronIcon : ""}`}
          />
        </Button>
      </PopoverTrigger>
    </ShePrimitiveComponentWrapper>
  );
}
