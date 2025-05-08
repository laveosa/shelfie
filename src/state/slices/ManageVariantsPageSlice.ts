import { IManageVariantsPageSlice } from "@/const/interfaces/store-slices/IManageVariantsPageSlice.ts";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { VariantModel } from "@/const/models/VariantModel.ts";
import { TypeOfTraitModel } from "@/const/models/TypeOfTraitModel.ts";
import { GridModel } from "@/const/models/GridModel.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import { TraitModel } from "@/const/models/TraitModel.ts";
import { ImageModel } from "@/const/models/ImageModel.ts";
import { ProductCounterModel } from "@/const/models/ProductCounterModel.ts";

const initialState: IManageVariantsPageSlice = {
  isLoading: false,
  isProductsLoading: false,
  // products: [],
  variants: [],
  // productVariants: [],
  selectedVariant: null,
  productCounter: null,
  activeCards: [],
  traits: [],
  typesOfTraits: [],
  listOfTraitsForProduct: [],
  listOfTraitsWithOptionsForProduct: [],
  contextId: null,
  selectedTraitsIds: [],
  selectedTrait: null,
  colorOptionsGridModel: null,
  sizeOptionsGridModel: {
    pager: {},
    items: [],
  },
  variantTraitsGridModel: {
    pager: {},
    items: [],
  },
  photosGridModel: {
    pager: {},
    items: [],
  },
  gridRequestModel: {
    currentPage: 1,
    pageSize: 10,
  },
  traitOptions: [],
  // productPhotos: [],
  variantPhotos: [],
  // taxesList: [],
  // currenciesList: [],
};

function setIsLoading(
  state: IManageVariantsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isLoading = action?.payload;
}

function setIsProductsLoading(
  state: IManageVariantsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isProductsLoading = action?.payload;
}

// function refreshProducts(
//   state: IManageVariantsPageSlice,
//   action: PayloadAction<ProductModel[]>,
// ) {
//   state.products = action?.payload || state.products;
// }

function refreshVariants(
  state: IManageVariantsPageSlice,
  action: PayloadAction<VariantModel[]>,
) {
  state.variants = action?.payload || state.variants;
}

// function refreshProductVariants(
//   state: IManageVariantsPageSlice,
//   action: PayloadAction<any[]>,
// ) {
//   state.productVariants = action?.payload || state.productVariants;
// }

function refreshSelectedVariant(
  state: IManageVariantsPageSlice,
  action: PayloadAction<VariantModel>,
) {
  state.selectedVariant = action?.payload || state.selectedVariant;
}

function refreshTraits(
  state: IManageVariantsPageSlice,
  action: PayloadAction<TraitModel[]>,
) {
  state.traits = action?.payload || state.traits;
}

function refreshTypesOfTraits(
  state: IManageVariantsPageSlice,
  action: PayloadAction<TypeOfTraitModel[]>,
) {
  state.typesOfTraits = action?.payload || state.typesOfTraits;
}

function refreshListOfTraitsForProduct(
  state: IManageVariantsPageSlice,
  action: PayloadAction<TraitModel[]>,
) {
  state.listOfTraitsForProduct =
    action?.payload || state.listOfTraitsForProduct;
}

function refreshListOfTraitsWithOptionsForProduct(
  state: IManageVariantsPageSlice,
  action: PayloadAction<TraitModel[]>,
) {
  state.listOfTraitsWithOptionsForProduct =
    action?.payload || state.listOfTraitsWithOptionsForProduct;
}

function refreshProductCounter(
  state: IManageVariantsPageSlice,
  action: PayloadAction<ProductCounterModel>,
) {
  state.productCounter = action?.payload || state.productCounter;
}

function refreshActiveCards(
  state: IManageVariantsPageSlice,
  action: PayloadAction<any[]>,
) {
  state.activeCards = action?.payload || state.activeCards;
}

function refreshContextId(
  state: IManageVariantsPageSlice,
  action: PayloadAction<number>,
) {
  state.contextId = action?.payload || state.contextId;
}

function refreshSelectedTraitsIds(
  state: IManageVariantsPageSlice,
  action: PayloadAction<number[]>,
) {
  state.selectedTraitsIds = action?.payload || state.selectedTraitsIds;
}

function refreshSelectedTrait(
  state: IManageVariantsPageSlice,
  action: PayloadAction<TraitModel>,
) {
  state.selectedTrait = action?.payload || state.selectedTrait;
}

function refreshTraitOption(
  state: IManageVariantsPageSlice,
  action: PayloadAction<any>,
) {
  state.traitOptions = action?.payload || state.traitOptions;
}

function refreshColorOptionsGridModel(
  state: IManageVariantsPageSlice,
  action: PayloadAction<GridModel>,
) {
  state.colorOptionsGridModel = action?.payload || state.colorOptionsGridModel;
}

function refreshSizeOptionsGridModel(
  state: IManageVariantsPageSlice,
  action: PayloadAction<GridModel>,
) {
  state.sizeOptionsGridModel = action?.payload || state.sizeOptionsGridModel;
}

function refreshGridRequestModel(
  state: IManageVariantsPageSlice,
  action: PayloadAction<GridRequestModel>,
) {
  state.gridRequestModel = action?.payload || state.gridRequestModel;
}

// function refreshProductPhotos(
//   state: IManageVariantsPageSlice,
//   action: PayloadAction<ImageModel[]>,
// ) {
//   state.productPhotos = action?.payload || state.productPhotos;
// }

function refreshVariantPhotos(
  state: IManageVariantsPageSlice,
  action: PayloadAction<ImageModel[]>,
) {
  state.variantPhotos = action?.payload || state.variantPhotos;
}

// function refreshTaxesList(
//   state: IManageVariantsPageSlice,
//   action: PayloadAction<TaxTypeModel[]>,
// ) {
//   state.taxesList = action?.payload || state.taxesList;
// }
//
// function refreshCurrenciesList(
//   state: IManageVariantsPageSlice,
//   action: PayloadAction<CurrencyModel[]>,
// ) {
//   state.currenciesList = action?.payload || state.currenciesList;
// }

const ManageVariantsPageSlice = createSlice({
  name: StoreSliceEnum.MANAGE_VARIANTS,
  initialState,
  reducers: {
    // refreshProducts,
    setIsLoading,
    setIsProductsLoading,
    refreshVariants,
    // refreshProductVariants,
    refreshSelectedVariant,
    refreshTraits,
    refreshTypesOfTraits,
    refreshListOfTraitsForProduct,
    refreshListOfTraitsWithOptionsForProduct,
    refreshProductCounter,
    refreshActiveCards,
    refreshSelectedTraitsIds,
    refreshSelectedTrait,
    refreshContextId,
    refreshTraitOption,
    refreshColorOptionsGridModel,
    refreshSizeOptionsGridModel,
    refreshGridRequestModel,
    // refreshProductPhotos,
    refreshVariantPhotos,
    // refreshTaxesList,
    // refreshCurrenciesList,
  },
});

export const ManageVariantsPageSliceActions = ManageVariantsPageSlice.actions;
export default ManageVariantsPageSlice;
