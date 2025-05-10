import { VariantModel } from "@/const/models/VariantModel.ts";
import { TypeOfTraitModel } from "@/const/models/TypeOfTraitModel.ts";
import { TraitOptionModel } from "@/const/models/TraitOptionModel.ts";
import { GridModel } from "@/const/models/GridModel.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import { TraitModel } from "@/const/models/TraitModel.ts";
import { ImageModel } from "@/const/models/ImageModel.ts";
import { ProductModel } from "@/const/models/ProductModel.ts";
import { ProductCounterModel } from "@/const/models/ProductCounterModel.ts";

export interface IManageVariantsPageSlice {
  isLoading?: boolean;
  isProductsLoading?: boolean;
  isTraitOptionsGridLoading?: boolean;
  isVariantOptionsGridLoading?: boolean;
  isVariantPhotoGridLoading?: boolean;
  isProductPhotoGridLoading?: boolean;
  products?: ProductModel[];
  variants: VariantModel[];
  selectedVariant: VariantModel;
  traits?: TraitModel[];
  typesOfTraits?: TypeOfTraitModel[];
  listOfTraitsForProduct?: TraitModel[];
  listOfTraitsWithOptionsForProduct?: TraitModel[];
  activeCards?: any[];
  contextId?: number;
  selectedTraitsIds?: number[];
  selectedTrait?: TraitModel;
  productCounter?: ProductCounterModel;
  traitOptions?: TraitOptionModel[];
  colorOptionsGridModel?: GridModel;
  sizeOptionsGridModel?: GridModel;
  variantTraitsGridModel?: GridModel;
  photosGridModel?: GridModel;
  gridRequestModel?: GridRequestModel;
  variantPhotos?: ImageModel[];
}
