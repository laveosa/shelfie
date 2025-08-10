import React from "react";

import { IShePrimitiveComponentWrapper } from "@/const/interfaces/primitive-components/IShePrimitiveComponentWrapper.ts";
import { IOutputEventModel } from "@/const/interfaces/IOutputEventModel.ts";

export interface ISheTextarea extends IShePrimitiveComponentWrapper {
  value?: string;
  placeholder?: string;
  placeholderTransKey?: string;
  autoFocus?: boolean;
  isValid?: boolean;
  ignoreValidation?: boolean;
  resize?: boolean;
  rows?: number;
  rowToExtend?: number;
  delayTime?: number;
  onIsValid?(value: boolean): void;
  onChange?(
    value: string,
    model?: IOutputEventModel<
      string,
      ISheTextarea,
      React.ChangeEvent | React.KeyboardEvent
    >,
  ): void;
  onBlur?(
    value: string,
    model?: IOutputEventModel<string, ISheTextarea, React.ChangeEvent>,
  ): void;
  onDelay?(
    value: string,
    model?: IOutputEventModel<
      string,
      ISheTextarea,
      React.ChangeEvent | React.KeyboardEvent
    >,
  ): void;
  onClear?(
    value: null,
    model?: IOutputEventModel<
      null,
      ISheTextarea,
      React.MouseEvent | React.KeyboardEvent
    >,
  ): void;
}

export const SheTextareaDefaultModel: ISheTextarea = {
  value: undefined,
  placeholder: undefined,
  placeholderTransKey: undefined,
  autoFocus: undefined,
  isValid: undefined,
  ignoreValidation: undefined,
  resize: undefined,
  rows: undefined,
  rowToExtend: undefined,
  delayTime: undefined,
  onIsValid: undefined,
  onChange: undefined,
  onBlur: undefined,
  onDelay: undefined,
  onClear: undefined,
};
