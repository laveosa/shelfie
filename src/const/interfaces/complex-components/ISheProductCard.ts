import { IBaseComponent } from "@/const/interfaces/IBaseComponent.ts";

export interface ISheProductCard extends IBaseComponent {
  loading?: boolean;
  title?: string;
  titleTransKey?: string;
  text?: string;
  textTransKey?: string;
  description?: string;
  descriptionTransKey?: string;
  showToggleButton?: boolean;
  showCloseButton?: boolean;
  fullWidth?: boolean;
}
