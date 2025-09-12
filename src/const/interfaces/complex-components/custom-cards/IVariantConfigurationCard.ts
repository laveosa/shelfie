import { TaxTypeModel } from "@/const/models/TaxTypeModel.ts";
import { ProductCountersModel } from "@/const/models/CounterModel.ts";
import { VariantModel } from "@/const/models/VariantModel.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";

export interface IVariantConfigurationCard {
  isLoading?: boolean;
  isVariantOptionsGridLoading?: boolean;
  isVariantPhotoGridLoading?: boolean;
  variant?: VariantModel;
  variantPhotos?: any[];
  data?: GridRequestModel;
  taxesList?: TaxTypeModel[];
  productCounter?: ProductCountersModel;
  onAction?: (identifier: string, payload?: any) => void;
  onGenerateProductCode?: () => Promise<any>;
  onSecondaryButtonClick?: () => void;
}
