import React, { ComponentPropsWithRef } from "react";

import { ISheLabel } from "@/const/interfaces/primitive-components/ISheLabel.ts";
import { ISheClearButton } from "@/const/interfaces/primitive-components/ISheClearButton.ts";
import { ISheIcon } from "@/const/interfaces/primitive-components/ISheIcon.ts";
import { ISheRadioItem } from "@/const/interfaces/primitive-components/ISheRadioItem.ts";
import { ComponentViewEnum } from "@/const/enums/ComponentViewEnum.ts";

export interface ISheRadioGroup
  extends ISheLabel,
    ISheClearButton,
    ComponentPropsWithRef<any> {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  elemClassName?: string;
  elemStyle?: React.CSSProperties;
  direction?: "row" | "column";
  gap?: string;
  icon?: Partial<ISheIcon> | string | React.FC<any>;
  name?: string;
  selected?: any;
  items?: ISheRadioItem[];
  itemsView?: ComponentViewEnum;
  view?: ComponentViewEnum;
  minWidth?: string;
  maxWidth?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  skeletonQuantity?: number;
  required?: boolean;
  noDataMessage?: string;
  noDataMessageTransKey?: string;
  onValueChange?: (value: any) => void;
}
