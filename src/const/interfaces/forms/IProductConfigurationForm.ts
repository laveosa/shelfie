import { ProductModel } from "@/const/models/ProductModel.ts";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";

export interface IProductConfigurationForm {
  data?: ProductModel;
  categories?: ISheSelectItem<number>[];
  brands?: ISheSelectItem<number>[];
  countryCodes?: ISheSelectItem<number>[];
  selectedCategory?: number;
  productCode?: string;
  notDisabledSubmit?: boolean;
  showSecondaryButton?: boolean;
  onSubmit?(value: ProductModel): void;
  onCancel?(value: ProductModel): void;
  onAction?(identifier: string, payload?: any): void;
}
