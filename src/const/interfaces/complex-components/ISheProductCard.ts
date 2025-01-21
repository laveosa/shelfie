import { IBaseComponent } from "@/const/interfaces/IBaseComponent.ts";

export interface ISheProductCard extends IBaseComponent {
  loading?: boolean;
  view?: "" | "card";
  title?: string;
  titleTransKey?: string;
  text?: string;
  textTransKey?: string;
  description?: string;
  descriptionTransKey?: string;
  showToggleButton?: boolean;
  showCloseButton?: boolean;
  fullWidth?: boolean;
  showPrimaryButton?: boolean;
  primaryButtonTitle?: string;
  primaryButtonTitleTransKey?: string;
  showSecondaryButton?: boolean;
  secondaryButtonTitle?: string;
  secondaryButtonTitleTransKey?: string;
  onPrimaryButtonClick?: () => void;
  onSecondaryButtonClick?: () => void;
}
