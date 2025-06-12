import { VariantModel } from "@/const/models/VariantModel.ts";
import { GridModel } from "@/const/models/GridModel.ts";
import { TaxTypeModel } from "@/const/models/TaxTypeModel.ts";
import { ProductCountersModel } from "@/const/models/CounterModel.ts";

export interface IVariantConfigurationCard {
  isLoading?: boolean;
  isVariantOptionsGridLoading?: boolean;
  isVariantPhotoGridLoading?: boolean;
  variant?: VariantModel;
  variantPhotos?: any[];
  data?: GridModel;
  taxesList?: TaxTypeModel[];
  productCounter?: ProductCountersModel;
  onAction?: (identifier: string, payload?: any) => void;
  onGenerateProductCode?: () => Promise<any>;
  onSecondaryButtonClick?: () => void;
}
