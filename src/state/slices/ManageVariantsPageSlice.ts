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
  isManageVariantsCardLoading: false,
  isVariantConfigurationCardLoading: false,
  isAddStockCardLoading: false,
  isDisposeStockCardLoading: false,
  isStockHistoryCardLoading: false,
  isAddVariantCardLoading: false,
  isManageTraitsCardLoading: false,
  isChooseVariantTraitsCardLoading: false,
  isProductTraitConfigurationCardLoading: false,
  isVariantPhotosCardLoading: false,
  isProductsLoading: false,
  isTraitOptionsGridLoading: false,
  isVariantOptionsGridLoading: false,
  isVariantPhotoGridLoading: false,
  isProductPhotoGridLoading: false,
  variants: [],
  selectedVariant: null,
  isDuplicateVariant: false,
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
  variantPhotos: [],
  productPhotosForVariant: [],
};

//----------------------------------------------------- LOADERS

function setIsLoading(
  state: IManageVariantsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isLoading = action?.payload;
}

function setIsManageVariantsCardLoading(
  state: IManageVariantsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isManageVariantsCardLoading = action?.payload;
}

function setIsVariantConfigurationCardLoading(
  state: IManageVariantsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isVariantConfigurationCardLoading = action?.payload;
}

function setIsAddStockCardLoading(
  state: IManageVariantsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isAddStockCardLoading = action?.payload;
}

function setIsDisposeStockCardLoading(
  state: IManageVariantsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isDisposeStockCardLoading = action?.payload;
}

function setIsStockHistoryCardLoading(
  state: IManageVariantsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isStockHistoryCardLoading = action?.payload;
}

function setIsAddVariantCardLoading(
  state: IManageVariantsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isAddVariantCardLoading = action?.payload;
}

function setIsManageTraitsCardLoading(
  state: IManageVariantsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isManageTraitsCardLoading = action?.payload;
}

function setIsChooseVariantTraitsCardLoading(
  state: IManageVariantsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isChooseVariantTraitsCardLoading = action?.payload;
}

function setIsProductTraitConfigurationCardLoading(
  state: IManageVariantsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isProductTraitConfigurationCardLoading = action?.payload;
}

function setIsVariantPhotosCardLoading(
  state: IManageVariantsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isVariantPhotosCardLoading = action?.payload;
}

function setIsProductsLoading(
  state: IManageVariantsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isProductsLoading = action?.payload;
}

function setIsTraitOptionsGridLoading(
  state: IManageVariantsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isTraitOptionsGridLoading = action?.payload;
}

function setIsVariantOptionsGridLoading(
  state: IManageVariantsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isVariantOptionsGridLoading = action?.payload;
}

function setIsVariantPhotoGridLoading(
  state: IManageVariantsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isVariantPhotoGridLoading = action?.payload;
}

function setIsProductPhotoGridLoading(
  state: IManageVariantsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isProductPhotoGridLoading = action?.payload;
}

//----------------------------------------------------- API

function refreshVariants(
  state: IManageVariantsPageSlice,
  action: PayloadAction<VariantModel[]>,
) {
  state.variants = action?.payload || state.variants;
}

function refreshSelectedVariant(
  state: IManageVariantsPageSlice,
  action: PayloadAction<VariantModel>,
) {
  state.selectedVariant = action?.payload || state.selectedVariant;
}

function refreshIsDuplicateVariant(
  state: IManageVariantsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isDuplicateVariant = action?.payload;
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

function resetSelectedTrait(state: IManageVariantsPageSlice) {
  state.selectedTrait = null;
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

function refreshVariantPhotos(
  state: IManageVariantsPageSlice,
  action: PayloadAction<ImageModel[]>,
) {
  state.variantPhotos = action?.payload || state.variantPhotos;
}

function refreshProductPhotosForVariant(
  state: IManageVariantsPageSlice,
  action: PayloadAction<ImageModel[]>,
) {
  state.productPhotosForVariant =
    action?.payload || state.productPhotosForVariant;
}

const ManageVariantsPageSlice = createSlice({
  name: StoreSliceEnum.MANAGE_VARIANTS,
  initialState,
  reducers: {
    setIsLoading,
    setIsManageVariantsCardLoading,
    setIsVariantConfigurationCardLoading,
    setIsAddStockCardLoading,
    setIsDisposeStockCardLoading,
    setIsStockHistoryCardLoading,
    setIsAddVariantCardLoading,
    setIsManageTraitsCardLoading,
    setIsChooseVariantTraitsCardLoading,
    setIsProductTraitConfigurationCardLoading,
    setIsVariantPhotosCardLoading,
    setIsProductsLoading,
    setIsTraitOptionsGridLoading,
    setIsVariantOptionsGridLoading,
    setIsVariantPhotoGridLoading,
    setIsProductPhotoGridLoading,
    refreshVariants,
    refreshSelectedVariant,
    refreshIsDuplicateVariant,
    refreshTraits,
    refreshTypesOfTraits,
    refreshListOfTraitsForProduct,
    refreshListOfTraitsWithOptionsForProduct,
    refreshProductCounter,
    refreshActiveCards,
    refreshSelectedTraitsIds,
    refreshSelectedTrait,
    resetSelectedTrait,
    refreshContextId,
    refreshTraitOption,
    refreshColorOptionsGridModel,
    refreshSizeOptionsGridModel,
    refreshGridRequestModel,
    refreshVariantPhotos,
    refreshProductPhotosForVariant,
  },
});

export const ManageVariantsPageSliceActions = ManageVariantsPageSlice.actions;
export default ManageVariantsPageSlice;
