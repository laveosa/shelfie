import { ComponentPropsWithRef, ReactNode } from "react";

import { DirectionEnum } from "@/const/enums/DirectionEnum.ts";

export interface ISheFormHeader extends ComponentPropsWithRef<"label"> {
  icon?: ReactNode;
  image?: string | Object;
  title?: string | ReactNode;
  titleTransKey?: string;
  text?: string | ReactNode;
  textTransKey?: string;
  description?: string | ReactNode;
  descriptionTransKey?: string;
  headerPosition?: DirectionEnum;
}
