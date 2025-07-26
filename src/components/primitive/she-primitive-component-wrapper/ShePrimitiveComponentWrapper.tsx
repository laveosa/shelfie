import React, { JSX } from "react";

import cs from "./ShePrimitiveComponentWrapper.module.scss";
import {
  IShePrimitiveComponentWrapper,
  ShePrimitiveComponentWrapperDefaultModel,
} from "@/const/interfaces/primitive-components/IShePrimitiveComponentWrapper.ts";
import { SheLabel } from "@/components/primitive/she-label/SheLabel.tsx";
import SheSkeleton from "@/components/primitive/she-skeleton/SheSkeleton.tsx";
import { SheClearButton } from "@/components/primitive/she-clear-button/SheClearButton.tsx";
import {
  getCustomProps,
  mergeComponentProps,
  removeCustomProps,
} from "@/utils/helpers/props-helper.ts";
import {
  ISheLabel,
  SheLabelDefaultModel,
} from "@/const/interfaces/primitive-components/ISheLabel.ts";
import {
  ISheSkeleton,
  SheSkeletonDefaultModel,
} from "@/const/interfaces/primitive-components/ISheSkeleton.ts";
import {
  ISheClearButton,
  SheClearButtonDefaultModel,
} from "@/const/interfaces/primitive-components/ISheClearButton.ts";

export default function ShePrimitiveComponentWrapper(
  props: IShePrimitiveComponentWrapper,
): JSX.Element {
  // ==================================================================== PROPS
  const {
    id,
    className,
    style,
    children,
    labelProps,
    skeletonProps,
    clearBtnProps,
    clearBtnValue,
    clearBtnPosition,
    minWidth,
    maxWidth,
    fullWidth,
    isLoading,
    disabled,
    required,
    ariaDescribedbyId,
    icon,
    onClear,
  } = props;
  const shePrimitiveComponentWrapperProps = getCustomProps<
    IShePrimitiveComponentWrapper,
    IShePrimitiveComponentWrapper
  >(props, ShePrimitiveComponentWrapperDefaultModel);
  const sheLabelProps = getCustomProps<
    IShePrimitiveComponentWrapper,
    ISheLabel
  >(props, SheLabelDefaultModel);
  const sheSkeletonProps = getCustomProps<
    IShePrimitiveComponentWrapper,
    ISheSkeleton
  >(props, SheSkeletonDefaultModel);
  const sheClearButtonProps = getCustomProps<
    IShePrimitiveComponentWrapper,
    ISheClearButton
  >(props, SheClearButtonDefaultModel);
  const restProps = removeCustomProps<IShePrimitiveComponentWrapper>(props, [
    ShePrimitiveComponentWrapperDefaultModel,
    SheLabelDefaultModel,
    SheSkeletonDefaultModel,
    SheClearButtonDefaultModel,
  ]);

  // ==================================================================== UTILITIES

  // ==================================================================== EVENT HANDLERS

  function onClearHandler(event: React.MouseEvent | React.KeyboardEvent) {
    console.log(event);
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
      <div className={cs.shePrimitiveComponentWrapperContext}>
        <SheLabel
          {...mergeComponentProps<ISheLabel>(sheLabelProps, labelProps)}
          ariaDescribedbyId={ariaDescribedbyId}
        />
        <div className={cs.shePrimitiveComponentWrapperControl}>
          <SheSkeleton
            className={cs.shePrimitiveComponentWrapperSkeleton}
            isLoading={isLoading}
            fullWidth
          >
            {children}
          </SheSkeleton>
          <SheClearButton
            {...mergeComponentProps<ISheClearButton>(
              sheClearButtonProps,
              clearBtnProps,
            )}
            value={clearBtnValue}
            disabled={disabled || !clearBtnValue}
            isLoading={isLoading}
            ariaDescribedbyId={ariaDescribedbyId}
            onClear={onClearHandler}
          />
        </div>
      </div>
    </div>
  );
}
