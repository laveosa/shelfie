import { VariantModel } from "@/const/models/VariantModel.ts";
import { TypeOfTraitModel } from "@/const/models/TypeOfTraitModel.ts";
import { TraitOptionModel } from "@/const/models/TraitOptionModel.ts";
import { GridModel } from "@/const/models/GridModel.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import { TraitModel } from "@/const/models/TraitModel.ts";
import { ImageModel } from "@/const/models/ImageModel.ts";
import { ProductModel } from "@/const/models/ProductModel.ts";

export interface IManageVariantsPageSlice {
  loading?: boolean;
  products?: ProductModel[];
  variants: VariantModel[];
  productVariants: VariantModel[];
  selectedVariant: VariantModel;
  traits?: TraitModel[];
  typesOfTraits?: TypeOfTraitModel[];
  listOfTraitsForProduct?: TraitModel[];
  listOfTraitsWithOptionsForProduct?: TraitModel[];
  activeCards?: any[];
  contextId?: number;
  selectedTraitsIds?: number[];
  selectedTrait?: TraitModel;
  // productCounter?: ProductCounterModel;
  traitOptions?: TraitOptionModel[];
  colorOptionsGridModel?: GridModel;
  sizeOptionsGridModel?: GridModel;
  variantTraitsGridModel?: GridModel;
  photosGridModel?: GridModel;
  gridRequestModel?: GridRequestModel;
  // productPhotos?: ImageModel[];
  variantPhotos?: ImageModel[];
  // taxesList?: TaxTypeModel[];
  // currenciesList?: CurrencyModel[];
}
