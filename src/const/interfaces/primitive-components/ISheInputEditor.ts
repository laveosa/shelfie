import React, { ComponentPropsWithRef } from "react";

import { ISheInput } from "@/const/interfaces/primitive-components/ISheInput.ts";
import { ISheButton } from "@/const/interfaces/primitive-components/ISheButton.ts";
import { ISheLabel } from "@/const/interfaces/primitive-components/ISheLabel.ts";
import { ISheIcon } from "@/const/interfaces/primitive-components/ISheIcon.ts";

export interface ISheInputEditor extends ISheLabel, ComponentPropsWithRef<any> {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  textClassName?: string;
  textStyle?: React.CSSProperties;
  icon?: Partial<ISheIcon> | string | React.FC<any>;
  value?: string | number;
  noValuePlaceholder?: string;
  noValuePlaceholderTransKey?: string;
  placeholder?: string;
  placeholderTransKey?: string;
  type?: "text" | "number";
  step?: number;
  disabled?: boolean;
  isLoading?: boolean;
  minWidth?: string;
  maxWidth?: string;
  fullWidth?: boolean;
  required?: boolean;
  showClearBtn?: boolean;
  isManage?: boolean;
  size?: "sizeNormal" | "sizeSmall";
  inputProps?: ISheInput;
  manageBtnProps?: ISheButton;
  saveBtnProps?: ISheButton;
  cancelBtnProps?: ISheButton;
  onChange?: (data: string | number) => void;
  onToggleManage?: (data: boolean) => void;
  onSave?: (data: string | number) => void;
  onCancel?: (data: string | number) => void;
}
