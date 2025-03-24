import { ComponentPropsWithRef } from "react";

import { DirectionEnum } from "@/const/enums/DirectionEnum.ts";
import { ISheButton } from "@/const/interfaces/primitive-components/ISheButton.ts";

export interface ISheFormFooter extends ComponentPropsWithRef<"div"> {
  primaryTitle?: string;
  primaryTitleTransKey?: string;
  primaryProps?: ISheButton;
  secondaryTitle?: string;
  secondaryTitleTransKey?: string;
  secondaryProps?: ISheButton;
  notDisabledSubmit?: boolean;
  loading?: boolean;
  isValid?: boolean;
  footerPosition?: DirectionEnum;
  onPrimary?: () => void;
  onSecondary?: () => void;
}
