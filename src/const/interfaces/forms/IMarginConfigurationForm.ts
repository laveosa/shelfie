import { MarginModel } from "@/const/models/MarginModel.ts";

export interface IMarginConfigurationForm {
  className?: string;
  data?: any;
  isConfigurationCard?: boolean;
  onSubmit?: (data: MarginModel) => void;
  onCancel?: () => void;
}
