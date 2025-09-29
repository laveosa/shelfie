import React from "react";

import { ComponentViewEnum } from "@/const/enums/ComponentViewEnum.ts";
import { ISheCardNotification } from "@/const/interfaces/complex-components/ISheCardNotification.ts";
import { ISheButton } from "@/const/interfaces/primitive-components/ISheButton.ts";

export interface ISheCardFooter {
  footerClassName?: string;
  footerStyle?: React.CSSProperties;
  showFooter?: boolean;
  view?: ComponentViewEnum;
  showNotificationCard?: boolean;
  notificationCardProps?: ISheCardNotification;
  isMinimized?: boolean;
  isLoading?: boolean;
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
}

export const SheCardFooterDefaultModel: ISheCardFooter = {
  footerClassName: undefined,
  footerStyle: undefined,
  view: undefined,
  showNotificationCard: undefined,
  notificationCardProps: undefined,
  isMinimized: undefined,
  isLoading: undefined,
  showFooter: undefined,
  showPrimaryButton: undefined,
  primaryButtonTitle: undefined,
  primaryButtonTitleTransKey: undefined,
  primaryButtonDisabled: undefined,
  primaryButtonProps: undefined,
  showSecondaryButton: undefined,
  secondaryButtonTitle: undefined,
  secondaryButtonTitleTransKey: undefined,
  secondaryButtonDisabled: undefined,
  secondaryButtonProps: undefined,
  onPrimaryButtonClick: undefined,
  onSecondaryButtonClick: undefined,
};
