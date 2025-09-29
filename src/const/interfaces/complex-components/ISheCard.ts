import { ComponentPropsWithRef } from "react";

import { ComponentViewEnum } from "@/const/enums/ComponentViewEnum.ts";
import { ISheCardNotification } from "@/const/interfaces/complex-components/ISheCardNotification.ts";
import { ISheButton } from "@/const/interfaces/primitive-components/ISheButton.ts";
import {
  ISheCardHeader,
  SheCardHeaderDefaultModel,
} from "@/const/interfaces/complex-components/ISheCardHeader.ts";

export interface ISheCard extends ISheCardHeader, ComponentPropsWithRef<"div"> {
  className?: string;
  footerClassName?: string;
  contextClassName?: string;
  view?: ComponentViewEnum;
  isMinimized?: boolean;
  saveIsMinimizedCondition?: boolean;
  isMinimizedConditionStorageKey?: string;
  showNotificationCard?: boolean;
  notificationCardProps?: ISheCardNotification;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  fullWidth?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  showFooter?: boolean;
  showPrimaryButton?: boolean;
  primaryButtonTitle?: string;
  primaryButtonTitleTransKey?: string;
  primaryButtonDisabled?: boolean;
  primaryButtonProps?: ISheButton;
  showSecondaryButton?: boolean;
  secondaryButtonTitle?: string;
  secondaryButtonTitleTransKey?: string;
  secondaryButtonDisabled?: boolean;
  secondaryButtonProps?: ISheButton;
  onPrimaryButtonClick?(value: any): void;
  onSecondaryButtonClick?(value: any): void;
  onIsMinimizedChange?(value: boolean): void;
}

export const SheCardDefaultModel: ISheCard = {
  ...SheCardHeaderDefaultModel,
};
