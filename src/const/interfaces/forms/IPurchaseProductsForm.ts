import { PurchaseProductsModel } from "@/const/models/PurchaseProductsModel.ts";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";

export interface IPurchaseProductsForm {
  className?: string;
  data?: any;
  currencies?: ISheSelectItem<number>[];
  taxes?: ISheSelectItem<number>[];
  activeTab?: string;
  isVariantGrid?: boolean;
  onSubmit?: (data: PurchaseProductsModel) => void;
  onDelete?: () => void;
  onCancel?: () => void;
}
