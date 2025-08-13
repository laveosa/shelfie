import React, { ComponentPropsWithRef } from "react";

import { ISheInput } from "@/const/interfaces/primitive-components/ISheInput.ts";
import { ISheButton } from "@/const/interfaces/primitive-components/ISheButton.ts";
import { IShePrimitiveComponentWrapper } from "@/const/interfaces/primitive-components/IShePrimitiveComponentWrapper.ts";
import { IOutputEventModel } from "@/const/interfaces/IOutputEventModel.ts";

export interface ISheInputEditor
  extends Omit<
      IShePrimitiveComponentWrapper,
      "clearBtnValue" | "clearBtnPosition" | "iconPosition" | "onChange"
    >,
    ComponentPropsWithRef<any> {
  textClassName?: string;
  textStyle?: React.CSSProperties;
  value?: string | number;
  noValuePlaceholder?: string;
  noValuePlaceholderTransKey?: string;
  placeholder?: string;
  placeholderTransKey?: string;
  type?: "text" | "number";
  step?: number;
  isManage?: boolean;
  saveOnBlur?: boolean;
  inputProps?: ISheInput;
  manageBtnProps?: ISheButton;
  saveBtnProps?: ISheButton;
  cancelBtnProps?: ISheButton;
  onChange?(
    value: string | number,
    model?: IOutputEventModel<any, ISheInputEditor, React.ChangeEvent>,
  ): void;
  onToggleManage?(value: boolean): void;
  onSave?(
    value: string | number,
    model?: IOutputEventModel<
      any,
      ISheInputEditor,
      React.KeyboardEvent | React.MouseEvent | React.ChangeEvent
    >,
  ): void;
  onCancel?(
    value: string | number,
    model?: IOutputEventModel<
      any,
      ISheInputEditor,
      React.KeyboardEvent | React.MouseEvent
    >,
  ): void;
}

export const SheInputEditorDefaultModel: ISheInputEditor = {
  textClassName: undefined,
  textStyle: undefined,
  value: undefined,
  noValuePlaceholder: undefined,
  noValuePlaceholderTransKey: undefined,
  placeholder: undefined,
  placeholderTransKey: undefined,
  type: undefined,
  step: undefined,
  isManage: undefined,
  saveOnBlur: undefined,
  inputProps: undefined,
  manageBtnProps: undefined,
  saveBtnProps: undefined,
  cancelBtnProps: undefined,
  onChange: undefined,
  onToggleManage: undefined,
  onSave: undefined,
  onCancel: undefined,
};
