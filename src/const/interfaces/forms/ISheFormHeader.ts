import { ComponentPropsWithRef } from "react";

import { SheFormHeaderPositionEnum } from "@/const/enums/SheFormHeaderPositionEnum.ts";

export interface ISheFormHeader extends ComponentPropsWithRef<"label"> {
  title?: any;
  titleTransKey?: string;
  text?: any;
  textTransKey?: string;
  description?: any;
  descriptionTransKey?: string;
  headerPosition?: SheFormHeaderPositionEnum;
}
