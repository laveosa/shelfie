import { ComponentPropsWithRef } from "react";

import { DirectionEnum } from "@/const/enums/DirectionEnum.ts";

export interface ISheFormHeader extends ComponentPropsWithRef<"label"> {
  title?: any;
  titleTransKey?: string;
  text?: any;
  textTransKey?: string;
  description?: any;
  descriptionTransKey?: string;
  headerPosition?: DirectionEnum;
}
