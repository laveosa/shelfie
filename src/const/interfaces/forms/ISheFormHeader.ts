import { ComponentPropsWithRef, ReactNode } from "react";

import { DirectionEnum } from "@/const/enums/DirectionEnum.ts";

export interface ISheFormHeader extends ComponentPropsWithRef<any> {
  icon?: ReactNode;
  image?: any;
  title?: string;
  titleTransKey?: string;
  text?: string;
  textTransKey?: string;
  description?: string;
  descriptionTransKey?: string;
  headerPosition?: DirectionEnum;
}
