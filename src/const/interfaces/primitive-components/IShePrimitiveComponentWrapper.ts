import React, { ComponentPropsWithRef } from "react";

import { ISheIcon } from "@/const/interfaces/primitive-components/ISheIcon.ts";
import {
  ISheLabel,
  SheLabelDefaultModel,
} from "@/const/interfaces/primitive-components/ISheLabel.ts";
import {
  ISheClearButton,
  SheClearButtonDefaultModel,
} from "@/const/interfaces/primitive-components/ISheClearButton.ts";
import {
  ISheSkeleton,
  SheSkeletonDefaultModel,
} from "@/const/interfaces/primitive-components/ISheSkeleton.ts";
import {
  ISheContextLengthLimits,
  SheContextLengthLimitsDefaultModel,
} from "@/const/interfaces/primitive-components/ISheContextLengthLimits.ts";
import {
  ISheErrorMessageBlock,
  SheErrorMessageBlockDefaultModel,
} from "@/const/interfaces/primitive-components/ISheErrorMessageBlock.ts";
import {
  ISheDescriptionBlock,
  SheDescriptionBlockDefaultModel,
} from "@/const/interfaces/primitive-components/ISheDescriptionBlock.ts";

export interface IShePrimitiveComponentWrapper
  extends ISheLabel,
    ISheClearButton,
    Omit<ISheSkeleton, "minWidth" | "maxWidth" | "fullWidth">,
    ISheContextLengthLimits,
    ISheDescriptionBlock,
    ISheErrorMessageBlock {
  children?: React.ReactNode;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  minWidth?: string;
  maxWidth?: string;
  fullWidth?: boolean;
  isLoading?: boolean;
  disable?: boolean;
  required?: boolean;
  ariaDescribedbyId?: string;
  clearBtnPosition?: "in" | "out";
  icon?: Partial<ISheIcon> | string | React.FC<any>;
  iconPosition?: "in" | "out";
  iconProps?: ISheIcon;
  view?: "normal" | "card";
  onKeyDown?(event: React.KeyboardEvent): void;
  onClear?(value: React.MouseEvent | React.KeyboardEvent): void;
}

export const ShePrimitiveComponentWrapperDefaultModel: IShePrimitiveComponentWrapper =
  {
    ...SheLabelDefaultModel,
    ...SheSkeletonDefaultModel,
    ...SheClearButtonDefaultModel,
    ...SheContextLengthLimitsDefaultModel,
    ...SheDescriptionBlockDefaultModel,
    ...SheErrorMessageBlockDefaultModel,
    id: undefined,
    className: undefined,
    style: undefined,
    minWidth: undefined,
    maxWidth: undefined,
    fullWidth: undefined,
    isLoading: undefined,
    disable: undefined,
    required: undefined,
    ariaDescribedbyId: undefined,
    clearBtnPosition: undefined,
    icon: undefined,
    iconPosition: undefined,
    iconProps: undefined,
    view: undefined,
    onClear: undefined,
  };
