import { IBaseComponent } from "@/const/interfaces/IBaseComponent.ts";
import { ISheButton } from "@/const/interfaces/primitive-components/ISheButton.ts";
import { ISheCardNotification } from "@/const/interfaces/complex-components/ISheCardNotification.ts";

export interface ISheProductCard extends IBaseComponent {
  className?: string;
  headerClassName?: string;
  contextClassName?: string;
  loading?: boolean;
  view?: "borderless" | "card";
  title?: string;
  titleTransKey?: string;
  text?: string;
  textTransKey?: string;
  description?: string;
  descriptionTransKey?: string;
  showHeader?: boolean;
  showToggleButton?: boolean;
  showCloseButton?: boolean;
  width?: string;
  fullWidth?: boolean;
  isMinimized?: boolean;
  showNotificationCard?: boolean;
  notificationCardProps?: ISheCardNotification;
  showPrimaryButton?: boolean;
  primaryButtonTitle?: string;
  primaryButtonTitleTransKey?: string;
  primaryButtonDisabled?: any;
  primaryButtonModel?: ISheButton;
  showSecondaryButton?: boolean;
  secondaryButtonTitle?: string;
  secondaryButtonTitleTransKey?: string;
  secondaryButtonModel?: ISheButton;
  onPrimaryButtonClick?: () => void;
  onSecondaryButtonClick?: () => void;
  onIsMinimizedChange?: (value: boolean) => void;
}
