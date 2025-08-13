import React, { ComponentPropsWithRef } from "react";

import { SheToggleTypeEnum } from "@/const/enums/SheToggleTypeEnum.ts";
import { IShePrimitiveComponentWrapper } from "@/const/interfaces/primitive-components/IShePrimitiveComponentWrapper.ts";
import { IOutputEventModel } from "@/const/interfaces/IOutputEventModel.ts";

export interface ISheToggle
  extends Omit<
      IShePrimitiveComponentWrapper,
      | "showClearBtn"
      | "clearBtnValue"
      | "clearBtnPosition"
      | "clearBtnProps"
      | "iconPosition"
    >,
    ComponentPropsWithRef<any> {
  checked?: boolean;
  text?: string;
  textTransKey?: string;
  type?: SheToggleTypeEnum;
  isLoading?: boolean;
  disabled?: boolean;
  required?: boolean;
  onChecked?(
    value: boolean,
    model?: IOutputEventModel<boolean, ISheToggle, React.MouseEvent>,
  ): void;
}

export const SheToggleDefaultModel: ISheToggle = {
  checked: undefined,
  text: undefined,
  textTransKey: undefined,
  type: undefined,
  isLoading: undefined,
  disabled: undefined,
  required: undefined,
  onChecked: undefined,
};
