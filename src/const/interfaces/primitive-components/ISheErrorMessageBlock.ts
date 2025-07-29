import React from "react";

import { ISheIcon } from "@/const/interfaces/primitive-components/ISheIcon.ts";

export interface ISheErrorMessageBlock {
  errorMessageBlockClassName?: string;
  errorMessageBlockStyle?: React.CSSProperties;
  errorMessage?: string;
  errorMessageTransKey?: string;
  errorMessageIcon?: Partial<ISheIcon> | string | React.FC<any>;
  hideErrorMessage?: boolean;
}

export const SheErrorMessageBlockDefaultModel: ISheErrorMessageBlock = {
  errorMessageBlockClassName: undefined,
  errorMessageBlockStyle: undefined,
  errorMessage: undefined,
  errorMessageTransKey: undefined,
  errorMessageIcon: undefined,
  hideErrorMessage: undefined,
};
