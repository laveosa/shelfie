import { VariantModel } from "@/const/models/VariantModel.ts";
import { GridModel } from "@/const/models/GridModel.ts";
import { TaxTypeModel } from "@/const/models/TaxTypeModel.ts";
import { ProductCounterModel } from "@/const/models/ProductCounterModel.ts";

export interface IVariantConfigurationCard {
  isLoading?: boolean;
  isVariantOptionsGridLoading?: boolean;
  isVariantPhotoGridLoading?: boolean;
  variant?: VariantModel;
  variantPhotos?: any[];
  data?: GridModel;
  taxesList?: TaxTypeModel[];
  productCounter?: ProductCounterModel;
  onAction?: (identifier: string, payload?: any) => void;
  onGenerateProductCode?: () => Promise<any>;
  onSecondaryButtonClick?: () => void;
}
