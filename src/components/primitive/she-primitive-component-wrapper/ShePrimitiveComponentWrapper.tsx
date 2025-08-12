import React, { JSX } from "react";

import cs from "./ShePrimitiveComponentWrapper.module.scss";
import SheLabel from "@/components/primitive/she-label/SheLabel.tsx";
import SheSkeleton from "@/components/primitive/she-skeleton/SheSkeleton.tsx";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import SheClearButton from "@/components/primitive/she-clear-button/SheClearButton.tsx";
import SheContextLengthLimits from "@/components/primitive/she-context-length-limits/SheContextLengthLimits.tsx";
import SheDescriptionBlock from "@/components/primitive/she-description-block/SheDescriptionBlock.tsx";
import SheErrorMessageBlock from "@/components/primitive/she-error-message-block/SheErrorMessageBlock.tsx";
import {
  getCustomProps,
  mergeComponentProps,
  removeCustomProps,
} from "@/utils/helpers/props-helper.ts";
import {
  IShePrimitiveComponentWrapper,
  ShePrimitiveComponentWrapperDefaultModel,
} from "@/const/interfaces/primitive-components/IShePrimitiveComponentWrapper.ts";
import {
  ISheLabel,
  SheLabelDefaultModel,
} from "@/const/interfaces/primitive-components/ISheLabel.ts";
import {
  ISheSkeleton,
  SheSkeletonDefaultModel,
} from "@/const/interfaces/primitive-components/ISheSkeleton.ts";
import {
  ISheIcon,
  SheIconDefaultModel,
} from "@/const/interfaces/primitive-components/ISheIcon.ts";
import {
  ISheClearButton,
  SheClearButtonDefaultModel,
} from "@/const/interfaces/primitive-components/ISheClearButton.ts";
import {
  ISheContextLengthLimits,
  SheContextLengthLimitsDefaultModel,
} from "@/const/interfaces/primitive-components/ISheContextLengthLimits.ts";
import {
  ISheDescriptionBlock,
  SheDescriptionBlockDefaultModel,
} from "@/const/interfaces/primitive-components/ISheDescriptionBlock.ts";
import {
  ISheErrorMessageBlock,
  SheErrorMessageBlockDefaultModel,
} from "@/const/interfaces/primitive-components/ISheErrorMessageBlock.ts";

export default function ShePrimitiveComponentWrapper(
  props: IShePrimitiveComponentWrapper,
): JSX.Element {
  // ==================================================================== PROPS
  const {
    id,
    className = "",
    style,
    children,
    minWidth,
    maxWidth,
    fullWidth,
    required,
    icon,
    iconPosition = "in",
    iconProps,
    showClearBtn,
    clearBtnPosition = "in",
    view = "normal",
    onClear,
  } = props;
  const sheLabelProps = getCustomProps<
    IShePrimitiveComponentWrapper,
    ISheLabel
  >({ ...props }, SheLabelDefaultModel);
  const sheSkeletonProps = getCustomProps<
    IShePrimitiveComponentWrapper,
    ISheSkeleton
  >(
    {
      ...props,
      minWidth: undefined,
      maxWidth: undefined,
      fullWidth: undefined,
      style: undefined,
    },
    SheSkeletonDefaultModel,
  );
  const sheIconProps = getCustomProps<IShePrimitiveComponentWrapper, ISheIcon>(
    {
      ...props,
      minWidth: undefined,
      maxWidth: undefined,
      fullWidth: undefined,
      style: undefined,
    },
    SheIconDefaultModel,
  );
  const sheClearButtonProps = getCustomProps<
    IShePrimitiveComponentWrapper,
    ISheClearButton
  >({ ...props }, SheClearButtonDefaultModel);
  const sheContextLengthLimitsProps = getCustomProps<
    IShePrimitiveComponentWrapper,
    ISheContextLengthLimits
  >({ ...props }, SheContextLengthLimitsDefaultModel);
  const sheDescriptionBockProps = getCustomProps<
    IShePrimitiveComponentWrapper,
    ISheDescriptionBlock
  >({ ...props }, SheDescriptionBlockDefaultModel);
  const sheErrorMessageBlockProps = getCustomProps<
    IShePrimitiveComponentWrapper,
    ISheErrorMessageBlock
  >({ ...props }, SheErrorMessageBlockDefaultModel);
  const restProps = removeCustomProps<IShePrimitiveComponentWrapper>(props, [
    ShePrimitiveComponentWrapperDefaultModel,
    SheLabelDefaultModel,
    SheSkeletonDefaultModel,
    SheIconDefaultModel,
    SheClearButtonDefaultModel,
    SheDescriptionBlockDefaultModel,
    SheErrorMessageBlockDefaultModel,
  ]);

  // ==================================================================== EVENT HANDLERS
  function onClearHandler(event: React.MouseEvent | React.KeyboardEvent) {
    onClear?.(event);
  }

  // ==================================================================== LAYOUT
  return (
    <div
      id={id}
      className={`${cs.shePrimitiveComponentWrapper} ${className} ${icon ? (iconPosition === "in" ? "withIconIn" : "withIconOut") : ""} ${showClearBtn && clearBtnPosition === "in" ? "withClearButtonIn" : "withClearButtonOut"} ${fullWidth ? cs.fullWidth : ""} ${required ? cs.required : ""} ${view === "card" ? cs.card : ""}`}
      style={{
        minWidth,
        maxWidth,
        ...style,
      }}
      {...restProps}
    >
      <div className={cs.shePrimitiveComponentWrapperContainer}>
        <SheLabel {...sheLabelProps} />
        <div className={cs.shePrimitiveComponentWrapperControl}>
          <SheSkeleton {...sheSkeletonProps} fullWidth>
            <SheIcon
              {...mergeComponentProps(sheIconProps, iconProps)}
              className={`${iconProps?.className ?? ""} ${cs.iconBlock}`}
            />
            <div className={cs.shePrimitiveComponentWrapperContext}>
              {children}
            </div>
          </SheSkeleton>
          <SheClearButton
            {...sheClearButtonProps}
            clearBtnClassName={`${sheClearButtonProps?.clearBtnClassName} ${cs.clearButton}`}
            onClear={onClearHandler}
          />
        </div>
        <SheContextLengthLimits
          {...sheContextLengthLimitsProps}
          contextLengthLimitsClassName={`${sheContextLengthLimitsProps.contextLengthLimitsClassName} ${cs.contextLengthLimits}`}
        />
        <SheDescriptionBlock
          {...sheDescriptionBockProps}
          descriptionBlockClassName={`${sheDescriptionBockProps.descriptionBlockClassName} ${cs.descriptionBlock} ${sheDescriptionBockProps.descriptionIcon ? cs.descriptionBlockWithIcon : ""}`}
        />
        <SheErrorMessageBlock
          {...sheErrorMessageBlockProps}
          errorMessageBlockClassName={`${sheErrorMessageBlockProps.errorMessageBlockClassName} ${cs.errorBlock} ${sheErrorMessageBlockProps.errorMessageIcon ? cs.errorBlockWithIcon : ""}`}
        />
      </div>
    </div>
  );
}
