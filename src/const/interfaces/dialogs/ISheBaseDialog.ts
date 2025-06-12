import { ISheIcon } from "@/const/interfaces/primitive-components/ISheIcon.ts";
import React from "react";
import { ISheButton } from "@/const/interfaces/primitive-components/ISheButton.ts";

export interface ISheBaseDialog {
  type?: string;
  isLoading?: boolean;
  headerTitle?: string;
  headerTitleTransKey?: string;
  headerText?: string;
  headerTextTransKey?: string;
  headerDescription?: string;
  headerDescriptionTransKey?: string;
  icon?: Partial<ISheIcon> | string | React.FC<any>;
  hideCloseButton?: boolean;
  showHeader?: boolean;
  showFooter?: boolean;
  children?: any;
  width?: string;
  maxWidth?: string;
  minWidth?: string;
  primaryButtonValue?: string;
  primaryButtonValueTransKey?: string;
  primaryButtonModel?: ISheButton;
  secondaryButtonValue?: string;
  secondaryButtonValueTransKey?: string;
  secondaryButtonModel?: ISheButton;
  onPrimaryButtonClick?: () => void;
  onSecondaryButtonClick?: () => void;
}
