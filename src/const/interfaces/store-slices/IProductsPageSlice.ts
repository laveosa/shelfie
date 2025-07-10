import { ProductModel } from "@/const/models/ProductModel.ts";
import { PreferencesModel } from "@/const/models/PreferencesModel.ts";
import { BrandModel } from "@/const/models/BrandModel.ts";
import { CategoryModel } from "@/const/models/CategoryModel.ts";
import { GridSortingModel } from "@/const/models/GridSortingModel.ts";
import { GridModel } from "@/const/models/GridModel.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import { VariantModel } from "@/const/models/VariantModel.ts";
import {
  ProductCountersModel,
  PurchaseCountersModel,
} from "@/const/models/CounterModel.ts";
import { ImageModel } from "@/const/models/ImageModel.ts";
import { TaxTypeModel } from "@/const/models/TaxTypeModel.ts";
import { CurrencyModel } from "@/const/models/CurrencyModel.ts";
import { PurchaseModel } from "@/const/models/PurchaseModel.ts";
import { SupplierModel } from "@/const/models/SupplierModel.ts";
import { CountryCodeModel } from "@/const/models/CountryCodeModel.ts";
import { TraitModel } from "@/const/models/TraitModel.ts";
import { TypeOfTraitModel } from "@/const/models/TypeOfTraitModel.ts";
import { TraitOptionModel } from "@/const/models/TraitOptionModel.ts";

export interface IProductsPageSlice {
  isLoading?: boolean;
  isItemsCardLoading?: boolean;
  isProductMenuCardLoading?: boolean;
  isProductsLoading?: boolean;
  isProductPhotosLoading?: boolean;
  isProductVariantsLoading?: boolean;
  products?: ProductModel[];
  product?: ProductModel;
  variants?: VariantModel[];
  purchases?: PurchaseModel[];
  contextId?: number;
  activeCards?: any[];
  selectedProduct?: ProductModel;
  productCounter?: ProductCountersModel;
  productVariants?: VariantModel[];
  selectedVariant?: VariantModel;
  selectedSupplier?: SupplierModel;
  selectedPurchase?: PurchaseModel;
  columnsPreferences?: PreferencesModel;
  brands?: BrandModel[];
  categories?: CategoryModel[];
  suppliers?: SupplierModel[];
  sortingOptions?: GridSortingModel[];
  productsGridModel?: GridModel;
  variantsGridModel?: GridModel;
  purchasesGridModel?: GridModel;
  gridRequestModel?: GridRequestModel;
  productsGridRequestModel?: GridRequestModel;
  variantsGridRequestModel?: GridRequestModel;
  purchasesGridRequestModel?: GridRequestModel;
  productPhotos?: ImageModel[];
  taxesList?: TaxTypeModel[];
  currenciesList?: CurrencyModel[];
  countryCodeList?: CountryCodeModel[];
  purchaseCounters?: PurchaseCountersModel;
  typesOfTraits?: TypeOfTraitModel[];
  traits?: TraitModel[];
  listOfTraitsWithOptionsForProduct?: TraitModel[];
  brand?: BrandModel;
  category?: CategoryModel;
  traitsForFilters?: { color?: TraitOptionModel[]; size?: TraitOptionModel[] };
  traitsForFilter?: TraitModel[];
  colorsForFilter?: TraitOptionModel[];
  sizesForFilter?: TraitOptionModel[];
  activeTab?: string;
}
