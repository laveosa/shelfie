import React, { ComponentPropsWithRef } from "react";

import { ISheLabel } from "@/const/interfaces/primitive-components/ISheLabel.ts";
import { ISheClearButton } from "@/const/interfaces/primitive-components/ISheClearButton.ts";
import { ISheIcon } from "@/const/interfaces/primitive-components/ISheIcon.ts";
import { ISheSkeleton } from "@/const/interfaces/primitive-components/ISheSkeleton.ts";

export interface IShePrimitiveComponentWrapper
  extends ISheLabel,
    ISheClearButton,
    ComponentPropsWithRef<"div"> {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  labelProps?: ISheLabel;
  skeletonProps?: ISheSkeleton;
  clearBtnProps?: ISheClearButton;
  clearBtnValue?: any;
  minWidth?: string;
  maxWidth?: string;
  fullWidth?: string;
  isLoading?: boolean;
  disable?: boolean;
  required?: boolean;
  ariaDescribedbyId?: string;
  icon?: Partial<ISheIcon> | string | React.FC<any>;
  onClear?(value: React.MouseEvent | React.KeyboardEvent): void;
}

export const ShePrimitiveComponentWrapperDefaultModel: IShePrimitiveComponentWrapper =
  {
    id: undefined,
    className: undefined,
    style: undefined,
    labelProps: undefined,
    skeletonProps: undefined,
    clearBtnProps: undefined,
    clearBtnValue: undefined,
    minWidth: undefined,
    maxWidth: undefined,
    fullWidth: undefined,
    isLoading: undefined,
    disable: undefined,
    required: undefined,
    ariaDescribedbyId: undefined,
    icon: undefined,
    onClear: undefined,
  };
