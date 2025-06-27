import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IPurchaseProductsPageSlice } from "@/const/interfaces/store-slices/IPurchaseProductsPageSlice.ts";
import { ProductModel } from "@/const/models/ProductModel.ts";
import { GridModel } from "@/const/models/GridModel.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import { BrandModel } from "@/const/models/BrandModel.ts";
import { CategoryModel } from "@/const/models/CategoryModel.ts";
import { ImageModel } from "@/const/models/ImageModel.ts";
import { TraitModel } from "@/const/models/TraitModel.ts";
import { VariantModel } from "@/const/models/VariantModel.ts";
import { IPurchaseSummaryModel } from "@/const/models/PurchaseSummaryModel.ts";

const initialState: IPurchaseProductsPageSlice = {
  isLoading: false,
  isProductMenuCardLoading: false,
  isPurchaseProductsCardLoading: false,
  isPurchasesProductsGridLoading: false,
  isProductsGridLoading: false,
  isProductConfigurationCardLoading: false,
  isCreateCategoryCardLoading: false,
  isCreateBrandCardLoading: false,
  isManageProductCardLoading: false,
  isProductPhotosCardLoading: false,
  isConnectImageCardLoading: false,
  isChooseVariantTraitsCardLoading: false,
  isProductTraitConfigurationCardLoading: false,
  isAddVariantCardLoading: false,
  isVariantConfigurationCardLoading: false,
  isAddStockCardLoading: false,
  isDisposeStockCardLoading: false,
  isVariantHistoryCardLoading: false,
  isVariantPhotosCardLoading: false,
  isManageTraitsCardLoading: false,
  isImageUploaderLoading: false,
  isProductPhotosLoading: false,
  isVariantsGridLoading: false,
  isTraitOptionsGridLoading: false,
  isVariantGridLoading: false,
  isVariantOptionsGridLoading: false,
  isVariantPhotoGridLoading: false,
  isProductPhotoGridLoading: false,
  activeCards: [],
  activeTab: "purchaseProducts",
  selectedProduct: null,
  colorOptionsGridModel: null,
  purchaseProductVariantsGridModel: null,
  purchaseProducts: [],
  purchasesProductsGridModel: {
    pager: {},
    items: [],
  },
  purchasesProductsGridRequestModel: {
    currentPage: 1,
    pageSize: 10,
  },
  brands: [],
  categories: [],
  selectedPhoto: null,
  selectedTraitsIds: [],
  selectedTrait: null,
  isDuplicateVariant: false,
  purchaseProductVariants: [],
  purchaseSummary: null,
  variantPhotos: [],
  productPhotosForVariant: [],
};

//----------------------------------------------------- LOADERS

function setIsLoading(
  state: IPurchaseProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isLoading = action?.payload;
}

function setIsProductMenuCardLoading(
  state: IPurchaseProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isProductMenuCardLoading = action?.payload;
}

function setIsPurchaseProductsCardLoading(
  state: IPurchaseProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isPurchaseProductsCardLoading = action?.payload;
}

function setIsPurchasesProductsGridLoading(
  state: IPurchaseProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isPurchasesProductsGridLoading = action?.payload;
}

function setIsProductsGridLoading(
  state: IPurchaseProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isProductsGridLoading = action?.payload;
}

function setIsProductConfigurationCardLoading(
  state: IPurchaseProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isProductConfigurationCardLoading = action?.payload;
}

function setIsCreateCategoryCardLoading(
  state: IPurchaseProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isCreateCategoryCardLoading = action?.payload;
}

function setIsCreateBrandCardLoading(
  state: IPurchaseProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isCreateBrandCardLoading = action?.payload;
}

function setIsManageProductCardLoading(
  state: IPurchaseProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isManageProductCardLoading = action?.payload;
}

function setIsProductPhotosCardLoading(
  state: IPurchaseProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isProductPhotosCardLoading = action?.payload;
}

function setIsChooseVariantTraitsCardLoading(
  state: IPurchaseProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isChooseVariantTraitsCardLoading = action?.payload;
}

function setIsConnectImageCardLoading(
  state: IPurchaseProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isConnectImageCardLoading = action?.payload;
}

function setIsProductTraitConfigurationCardLoading(
  state: IPurchaseProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isProductTraitConfigurationCardLoading = action?.payload;
}

function setIsAddVariantCardLoading(
  state: IPurchaseProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isAddVariantCardLoading = action?.payload;
}

function setIsVariantConfigurationCardLoading(
  state: IPurchaseProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isVariantConfigurationCardLoading = action?.payload;
}

function setIsAddStockCardLoading(
  state: IPurchaseProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isAddStockCardLoading = action?.payload;
}

function setIsDisposeStockCardLoading(
  state: IPurchaseProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isDisposeStockCardLoading = action?.payload;
}

function setIsVariantHistoryCardLoading(
  state: IPurchaseProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isVariantHistoryCardLoading = action?.payload;
}

function setIsVariantPhotosCardLoading(
  state: IPurchaseProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isVariantPhotosCardLoading = action?.payload;
}

function setIsManageTraitsCardLoading(
  state: IPurchaseProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isManageTraitsCardLoading = action?.payload;
}

function setIsImageUploaderLoading(
  state: IPurchaseProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isImageUploaderLoading = action?.payload;
}

function setIsProductPhotosLoading(
  state: IPurchaseProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isProductPhotosLoading = action?.payload;
}

function setIsVariantsGridLoading(
  state: IPurchaseProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isVariantsGridLoading = action?.payload;
}

function setIsTraitOptionsGridLoading(
  state: IPurchaseProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isTraitOptionsGridLoading = action?.payload;
}

function setIsVariantGridLoading(
  state: IPurchaseProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isVariantGridLoading = action?.payload;
}

function setIsVariantOptionsGridLoading(
  state: IPurchaseProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isVariantOptionsGridLoading = action?.payload;
}

function setIsVariantPhotoGridLoading(
  state: IPurchaseProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isVariantPhotoGridLoading = action?.payload;
}

function setIsProductPhotoGridLoading(
  state: IPurchaseProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isProductPhotoGridLoading = action?.payload;
}

//----------------------------------------------------- API

function refreshActiveCards(
  state: IPurchaseProductsPageSlice,
  action: PayloadAction<any[]>,
) {
  state.activeCards = action?.payload || state.activeCards;
}

function refreshActiveTab(
  state: IPurchaseProductsPageSlice,
  action: PayloadAction<string>,
) {
  state.activeTab = action?.payload || state.activeTab;
}

function refreshSelectedProduct(
  state: IPurchaseProductsPageSlice,
  action: PayloadAction<ProductModel>,
) {
  state.selectedProduct = action?.payload || state.selectedProduct;
}

function refreshColorOptionsGridModel(
  state: IPurchaseProductsPageSlice,
  action: PayloadAction<GridModel>,
) {
  state.colorOptionsGridModel = action?.payload || state.colorOptionsGridModel;
}

function refreshPurchaseProducts(
  state: IPurchaseProductsPageSlice,
  action: PayloadAction<ProductModel[]>,
) {
  state.purchaseProducts = action?.payload || state.purchaseProducts;
}

function refreshPurchasesProductsGridModel(
  state: IPurchaseProductsPageSlice,
  action: PayloadAction<GridModel>,
) {
  state.purchasesProductsGridModel =
    action?.payload || state.purchasesProductsGridModel;
}

function refreshPurchaseProductVariantsGridModel(
  state: IPurchaseProductsPageSlice,
  action: PayloadAction<GridModel>,
) {
  state.purchaseProductVariantsGridModel =
    action?.payload || state.purchaseProductVariantsGridModel;
}

function refreshPurchasesProductsGridRequestModel(
  state: IPurchaseProductsPageSlice,
  action: PayloadAction<GridRequestModel>,
) {
  state.purchasesProductsGridRequestModel =
    action?.payload || state.purchasesProductsGridRequestModel;
}

function refreshBrands(
  state: IPurchaseProductsPageSlice,
  action: PayloadAction<BrandModel[]>,
) {
  state.brands = action?.payload || state.brands;
}

function refreshCategories(
  state: IPurchaseProductsPageSlice,
  action: PayloadAction<CategoryModel[]>,
) {
  state.categories = action?.payload || state.categories;
}

function refreshSelectedPhoto(
  state: IPurchaseProductsPageSlice,
  action: PayloadAction<ImageModel>,
) {
  state.selectedPhoto = action?.payload || state.selectedPhoto;
}

function refreshSelectedTraitsIds(
  state: IPurchaseProductsPageSlice,
  action: PayloadAction<number[]>,
) {
  state.selectedTraitsIds = action?.payload || state.selectedTraitsIds;
}

function refreshSelectedTrait(
  state: IPurchaseProductsPageSlice,
  action: PayloadAction<TraitModel>,
) {
  state.selectedTrait = action?.payload || state.selectedTrait;
}

function resetSelectedTrait(state: IPurchaseProductsPageSlice) {
  state.selectedTrait = null;
}

function refreshIsDuplicateVariant(
  state: IPurchaseProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isDuplicateVariant = action?.payload;
}

function refreshPurchaseProductVariants(
  state: IPurchaseProductsPageSlice,
  action: PayloadAction<VariantModel[]>,
) {
  state.purchaseProductVariants = action?.payload;
}

function refreshPurchaseSummary(
  state: IPurchaseProductsPageSlice,
  action: PayloadAction<IPurchaseSummaryModel>,
) {
  state.purchaseSummary = action?.payload || state.purchaseSummary;
}

function refreshVariantPhotos(
  state: IPurchaseProductsPageSlice,
  action: PayloadAction<ImageModel[]>,
) {
  state.variantPhotos = action?.payload || state.variantPhotos;
}

function refreshProductPhotosForVariant(
  state: IPurchaseProductsPageSlice,
  action: PayloadAction<ImageModel[]>,
) {
  state.productPhotosForVariant =
    action?.payload || state.productPhotosForVariant;
}

const PurchaseProductsPageSlice = createSlice({
  name: StoreSliceEnum.PURCHASE_PRODUCTS,
  initialState,
  reducers: {
    setIsLoading,
    setIsProductMenuCardLoading,
    setIsPurchaseProductsCardLoading,
    setIsPurchasesProductsGridLoading,
    setIsProductConfigurationCardLoading,
    setIsCreateCategoryCardLoading,
    setIsCreateBrandCardLoading,
    setIsChooseVariantTraitsCardLoading,
    setIsProductTraitConfigurationCardLoading,
    setIsManageProductCardLoading,
    setIsProductPhotosCardLoading,
    setIsConnectImageCardLoading,
    setIsAddVariantCardLoading,
    setIsVariantConfigurationCardLoading,
    setIsAddStockCardLoading,
    setIsDisposeStockCardLoading,
    setIsVariantHistoryCardLoading,
    setIsVariantPhotosCardLoading,
    setIsManageTraitsCardLoading,
    setIsImageUploaderLoading,
    setIsProductPhotosLoading,
    setIsProductsGridLoading,
    setIsVariantsGridLoading,
    setIsTraitOptionsGridLoading,
    setIsVariantGridLoading,
    setIsVariantOptionsGridLoading,
    setIsVariantPhotoGridLoading,
    setIsProductPhotoGridLoading,
    refreshActiveCards,
    refreshActiveTab,
    refreshSelectedProduct,
    refreshColorOptionsGridModel,
    refreshPurchaseProducts,
    refreshPurchasesProductsGridModel,
    refreshPurchaseProductVariantsGridModel,
    refreshPurchasesProductsGridRequestModel,
    refreshBrands,
    refreshCategories,
    refreshSelectedPhoto,
    refreshSelectedTraitsIds,
    refreshSelectedTrait,
    resetSelectedTrait,
    refreshIsDuplicateVariant,
    refreshPurchaseProductVariants,
    refreshPurchaseSummary,
    refreshVariantPhotos,
    refreshProductPhotosForVariant,
  },
});

export const PurchaseProductsPageSliceActions =
  PurchaseProductsPageSlice.actions;
export default PurchaseProductsPageSlice;
