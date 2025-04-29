import React, { ComponentPropsWithRef } from "react";

import { ISheIcon } from "@/const/interfaces/primitive-components/ISheIcon.ts";
import { ISheLabel } from "@/const/interfaces/primitive-components/ISheLabel.ts";
import { ISheClearButton } from "@/const/interfaces/primitive-components/ISheClearButton.ts";
import { ISheTooltip } from "@/const/interfaces/complex-components/ISheTooltip.ts";

export interface ISheSelectItem extends ComponentPropsWithRef<any> {
  id?: string; // reserved PRIVATE property, "DON'T USE" this property
  className?: string;
  style?: React.CSSProperties;
  icon?: Partial<ISheIcon> | string | React.FC<any>;
  value: any;
  text: string;
  textTransKey?: string;
  description?: string;
  descriptionTransKey?: string;
  sideText?: string;
  sideTextTransKey?: string;
  sideDescription?: string;
  sideDescriptionTransKey?: string;
  disabled?: boolean;
  colors?: string[];
  tooltip?: ISheTooltip;
}

export interface ISheSelect
  extends ISheLabel,
    ISheClearButton,
    ComponentPropsWithRef<any> {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  icon?: Partial<ISheIcon> | string | React.FC<any>;
  items?: ISheSelectItem[];
  selected?: any;
  hideFirstOption?: boolean;
  placeholder?: string;
  placeholderTransKey?: string;
  disabled?: boolean;
  isLoading?: boolean;
  minWidth?: string;
  maxWidth?: string;
  fullWidth?: boolean;
  required?: boolean;
  isOpen?: boolean;
  showSelectIcon?: boolean;
  selectedColor?: string;
  onOpenChange?: (value: any) => void;
  onSelect?: (value: any) => void;
}
