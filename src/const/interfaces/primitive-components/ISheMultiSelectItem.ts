import React, { ComponentPropsWithRef } from "react";
import { ISheIcon } from "@/const/interfaces/primitive-components/ISheIcon.ts";

export interface ISheMultiSelectItem extends ComponentPropsWithRef<any> {
  className?: string;
  text?: string;
  value?: any;
  icon?: Partial<ISheIcon> | string | React.FC<any>;
}
