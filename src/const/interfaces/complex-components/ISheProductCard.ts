import { IBaseComponent } from "@/const/interfaces/IBaseComponent.ts";

export interface ISheProductCard extends IBaseComponent {
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
  showPrimaryButton?: boolean;
  primaryButtonTitle?: string;
  primaryButtonTitleTransKey?: string;
  primaryButtonDisabled?: any;
  showSecondaryButton?: boolean;
  secondaryButtonTitle?: string;
  secondaryButtonTitleTransKey?: string;
  onPrimaryButtonClick?: () => void;
  onSecondaryButtonClick?: () => void;
}
