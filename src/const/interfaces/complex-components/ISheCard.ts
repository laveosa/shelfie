import { ComponentPropsWithRef } from "react";

import { ComponentViewEnum } from "@/const/enums/ComponentViewEnum.ts";
import {
  ISheCardHeader,
  SheCardHeaderDefaultModel,
} from "@/const/interfaces/complex-components/ISheCardHeader.ts";
import {
  ISheCardFooter,
  SheCardFooterDefaultModel,
} from "@/const/interfaces/complex-components/ISheCardFooter.ts";

export interface ISheCard
  extends ISheCardHeader,
    ISheCardFooter,
    ComponentPropsWithRef<"div"> {
  className?: string;
  contextClassName?: string;
  view?: ComponentViewEnum;
  isMinimized?: boolean;
  saveIsMinimizedCondition?: boolean;
  isMinimizedConditionStorageKey?: string;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  fullWidth?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  onIsMinimizedChange?(value: boolean): void;
}

export const SheCardDefaultModel: ISheCard = {
  ...SheCardHeaderDefaultModel,
  ...SheCardFooterDefaultModel,
  className: undefined,
  contextClassName: undefined,
  view: undefined,
  isMinimized: undefined,
  saveIsMinimizedCondition: undefined,
  isMinimizedConditionStorageKey: undefined,
  width: undefined,
  minWidth: undefined,
  maxWidth: undefined,
  fullWidth: undefined,
  isLoading: undefined,
  disabled: undefined,
  onIsMinimizedChange: undefined,
};
