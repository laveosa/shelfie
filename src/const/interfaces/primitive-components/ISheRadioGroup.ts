import React, { ComponentPropsWithRef } from "react";

import { ISheLabel } from "@/const/interfaces/primitive-components/ISheLabel.ts";
import { ISheClearButton } from "@/const/interfaces/primitive-components/ISheClearButton.ts";
import { ISheIcon } from "@/const/interfaces/primitive-components/ISheIcon.ts";
import { ISheRadioItem } from "@/const/interfaces/primitive-components/ISheRadioItem.ts";
import { RadioGroupProps } from "@radix-ui/react-radio-group";
import { ComponentViewEnum } from "@/const/enums/ComponentViewEnum.ts";

export interface ISheRadioGroup
  extends ISheLabel,
    ISheClearButton,
    RadioGroupProps,
    ComponentPropsWithRef<any> {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  elemClassName?: string;
  elemStyle?: React.CSSProperties;
  icon?: Partial<ISheIcon> | string | React.FC<any>;
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
}
