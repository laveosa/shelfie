import React from "react";

import { IShePrimitiveComponentWrapper } from "@/const/interfaces/primitive-components/IShePrimitiveComponentWrapper.ts";
import { IOutputEventModel } from "@/const/interfaces/IOutputEventModel.ts";
import { ISheCalendar } from "@/const/interfaces/primitive-components/ISheCalendar.ts";

export interface ISheDatePicker
  extends ISheCalendar,
    IShePrimitiveComponentWrapper {
  placeholder?: string;
  placeholderTransKey?: string;
  isOpen?: boolean;
  closeOnDateSelect?: boolean;
  onOpenChange?(
    value: any,
    model?: IOutputEventModel<any, ISheDatePicker, React.MouseEvent>,
  ): void;
}

export const SheDatePickerDefaultModel: ISheDatePicker = {
  placeholder: undefined,
  placeholderTransKey: undefined,
  isOpen: undefined,
  closeOnDateSelect: undefined,
  onOpenChange: undefined,
};
