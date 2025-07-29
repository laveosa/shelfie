import React, { JSX } from "react";

import cs from "./ShePrimitiveComponentWrapper.module.scss";
import SheLabel from "@/components/primitive/she-label/SheLabel.tsx";
import SheSkeleton from "@/components/primitive/she-skeleton/SheSkeleton.tsx";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import SheClearButton from "@/components/primitive/she-clear-button/SheClearButton.tsx";
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
    className,
    style,
    children,
    minWidth,
    maxWidth,
    fullWidth,
    required,
    icon,
    iconProps,
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
    },
    SheSkeletonDefaultModel,
  );
  const sheIconProps = getCustomProps<IShePrimitiveComponentWrapper, ISheIcon>(
    { ...props },
    SheIconDefaultModel,
  );
  const sheClearButtonProps = getCustomProps<
    IShePrimitiveComponentWrapper,
    ISheClearButton
  >({ ...props }, SheClearButtonDefaultModel);
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

  // ==================================================================== UTILITIES

  // ==================================================================== EVENT HANDLERS
  function onClearHandler(event: React.MouseEvent | React.KeyboardEvent) {
    onClear?.(event);
  }

  // ==================================================================== PRIVATE

  // ==================================================================== LAYOUT
  return (
    <div
      id={id}
      className={`${cs.shePrimitiveComponentWrapper} ${className} ${icon ? cs.withIcon : ""} ${fullWidth ? cs.fullWidth : ""} ${required ? cs.required : ""}`}
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
              className={cs.iconBlock}
            />
            <div className={cs.shePrimitiveComponentWrapperContext}>
              {children}
            </div>
          </SheSkeleton>
          <SheClearButton {...sheClearButtonProps} onClear={onClearHandler} />
        </div>
        <SheDescriptionBlock {...sheDescriptionBockProps} />
        <SheErrorMessageBlock {...sheErrorMessageBlockProps} />
      </div>
    </div>
  );
}
