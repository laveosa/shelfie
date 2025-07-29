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
  ISheErrorMessageBlock,
  SheErrorMessageBlockDefaultModel,
} from "@/const/interfaces/primitive-components/ISheErrorMessageBlock.ts";
import {
  ISheDescriptionBlock,
  SheDescriptionBlockDefaultModel,
} from "@/const/interfaces/primitive-components/ISheDescriptionBlock.ts";
import {
  ISheSkeleton,
  SheSkeletonDefaultModel,
} from "@/const/interfaces/primitive-components/ISheSkeleton.ts";

export interface IShePrimitiveComponentWrapper
  extends ISheLabel,
    ISheClearButton,
    Omit<ISheSkeleton, "minWidth" | "maxWidth" | "fullWidth">,
    ISheDescriptionBlock,
    ISheErrorMessageBlock,
    ComponentPropsWithRef<"div"> {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  minWidth?: string;
  maxWidth?: string;
  fullWidth?: string;
  isLoading?: boolean;
  disable?: boolean;
  required?: boolean;
  ariaDescribedbyId?: string;
  icon?: Partial<ISheIcon> | string | React.FC<any>;
  iconProps?: ISheIcon;
  onClear?(value: React.MouseEvent | React.KeyboardEvent): void;
}

export const ShePrimitiveComponentWrapperDefaultModel: IShePrimitiveComponentWrapper =
  {
    ...SheLabelDefaultModel,
    ...SheSkeletonDefaultModel,
    ...SheClearButtonDefaultModel,
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
    icon: undefined,
    iconProps: undefined,
    onClear: undefined,
  };
