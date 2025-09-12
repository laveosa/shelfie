import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IPurchaseProductsPageSlice } from "@/const/interfaces/store-slices/IPurchaseProductsPageSlice.ts";
import { ProductModel } from "@/const/models/ProductModel.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import { BrandModel } from "@/const/models/BrandModel.ts";
import { CategoryModel } from "@/const/models/CategoryModel.ts";
import { ImageModel } from "@/const/models/ImageModel.ts";
import { TraitModel } from "@/const/models/TraitModel.ts";
import { VariantModel } from "@/const/models/VariantModel.ts";
import { IPurchaseSummaryModel } from "@/const/models/PurchaseSummaryModel.ts";
import { VariantHistoryModel } from "@/const/models/VariantHistoryModel.ts";
import { IProductsPageSlice } from "@/const/interfaces/store-slices/IProductsPageSlice.ts";
import { TraitOptionModel } from "@/const/models/TraitOptionModel.ts";
import { IManageVariantsPageSlice } from "@/const/interfaces/store-slices/IManageVariantsPageSlice.ts";
import { PurchaseModel } from "@/const/models/PurchaseModel.ts";
import { CompanyModel } from "@/const/models/CompanyModel.ts";

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
  isSelectPurchaseCardLoading: false,
  isSupplierCardLoading: false,
  isSelectEntityCardLoading: false,
  isImageUploaderLoading: false,
  isProductPhotosLoading: false,
  isVariantsGridLoading: false,
  isTraitOptionsGridLoading: false,
  isVariantGridLoading: false,
  isVariantOptionsGridLoading: false,
  isVariantPhotoGridLoading: false,
  isProductPhotoGridLoading: false,
  isVariantHistoryGridLoading: false,
  isVariantsForPurchaseGridLoading: false,
  isPurchaseGridLoading: false,
  isSuppliersGridLoading: false,
  activeCards: [],
  activeTab: "purchaseProducts",
  variants: [],
  selectedProduct: null,
  colorOptionsGridRequestModel: null,
  purchaseProductVariantsGridRequestModel: null,
  purchaseProducts: [],
  purchasesProductsGridRequestModel: {},
  variantsForPurchaseGridRequestModel: {},
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
  variantHistory: [],
  traitsForFilters: { color: [], size: [] },
  traitsForFilter: [],
  colorsForFilter: [],
  sizesForFilter: [],
  purchasesList: [],
  purchaseGridRequestModel: {},
  selectedPurchase: null,
  companiesGriRequestModel: {},
  selectedCompany: null,
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

function setIsSelectPurchaseCardLoading(
  state: IManageVariantsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isSelectPurchaseCardLoading = action?.payload;
}

function setIsSupplierCardLoading(
  state: IManageVariantsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isSupplierCardLoading = action?.payload;
}

function setIsSelectEntityCardLoading(
  state: IManageVariantsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isSelectEntityCardLoading = action?.payload;
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

function setIsVariantHistoryGridLoading(
  state: IPurchaseProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isVariantHistoryGridLoading = action?.payload;
}

function setIsVariantsForPurchaseGridLoading(
  state: IPurchaseProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isVariantsForPurchaseGridLoading = action?.payload;
}

function setIsPurchaseGridLoading(
  state: IManageVariantsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isPurchaseGridLoading = action?.payload;
}

function setIsSuppliersGridLoading(
  state: IManageVariantsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isSuppliersGridLoading = action?.payload;
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

function refreshVariants(
  state: IPurchaseProductsPageSlice,
  action: PayloadAction<VariantModel[]>,
) {
  state.variants = action?.payload || state.variants;
}

function refreshSelectedProduct(
  state: IPurchaseProductsPageSlice,
  action: PayloadAction<ProductModel>,
) {
  state.selectedProduct = action?.payload || state.selectedProduct;
}

function resetSelectedProduct(state: IPurchaseProductsPageSlice) {
  state.selectedProduct = null;
}

function refreshColorOptionsGridRequestModel(
  state: IPurchaseProductsPageSlice,
  action: PayloadAction<GridRequestModel>,
) {
  state.colorOptionsGridRequestModel =
    action?.payload || state.colorOptionsGridRequestModel;
}

function refreshPurchaseProducts(
  state: IPurchaseProductsPageSlice,
  action: PayloadAction<ProductModel[]>,
) {
  state.purchaseProducts = action?.payload || state.purchaseProducts;
}

function refreshPurchaseProductVariantsGridRequestModel(
  state: IPurchaseProductsPageSlice,
  action: PayloadAction<GridRequestModel>,
) {
  state.purchaseProductVariantsGridRequestModel =
    action?.payload || state.purchaseProductVariantsGridRequestModel;
}

function refreshPurchasesProductsGridRequestModel(
  state: IPurchaseProductsPageSlice,
  action: PayloadAction<GridRequestModel>,
) {
  state.purchasesProductsGridRequestModel =
    action?.payload || state.purchasesProductsGridRequestModel;
}

function refreshVariantsForPurchaseGridRequestModel(
  state: IPurchaseProductsPageSlice,
  action: PayloadAction<GridRequestModel>,
) {
  state.variantsForPurchaseGridRequestModel =
    action?.payload || state.variantsForPurchaseGridRequestModel;
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

function refreshVariantHistory(
  state: IPurchaseProductsPageSlice,
  action: PayloadAction<VariantHistoryModel[]>,
) {
  state.variantHistory = action?.payload || state.variantHistory;
}

function refreshColorsForFilter(
  state: IProductsPageSlice,
  action: PayloadAction<TraitOptionModel[]>,
) {
  state.colorsForFilter = action?.payload || state.colorsForFilter;
}

function refreshSizesForFilter(
  state: IProductsPageSlice,
  action: PayloadAction<TraitOptionModel[]>,
) {
  state.sizesForFilter = action?.payload || state.sizesForFilter;
}

function refreshPurchasesList(
  state: IManageVariantsPageSlice,
  action: PayloadAction<PurchaseModel[]>,
) {
  state.purchasesList = action?.payload || state.purchasesList;
}

function refreshPurchaseGridRequestModel(
  state: IManageVariantsPageSlice,
  action: PayloadAction<GridRequestModel>,
) {
  state.purchaseGridRequestModel =
    action?.payload || state.purchaseGridRequestModel;
}

function refreshSelectedPurchase(
  state: IManageVariantsPageSlice,
  action: PayloadAction<PurchaseModel>,
) {
  state.selectedPurchase = action?.payload || state.selectedPurchase;
}

function resetSelectedPurchase(state: IManageVariantsPageSlice) {
  state.selectedPurchase = null;
}

function refreshCompaniesGridRequestModel(
  state: IManageVariantsPageSlice,
  action: PayloadAction<GridRequestModel>,
) {
  state.companiesGridRequestModel =
    action?.payload || state.companiesGridRequestModel;
}

function refreshSelectedCompany(
  state: IManageVariantsPageSlice,
  action: PayloadAction<CompanyModel>,
) {
  state.selectedCompany = action?.payload || state.selectedCompany;
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
    setIsSelectPurchaseCardLoading,
    setIsSupplierCardLoading,
    setIsSelectEntityCardLoading,
    setIsImageUploaderLoading,
    setIsProductPhotosLoading,
    setIsProductsGridLoading,
    setIsVariantsGridLoading,
    setIsTraitOptionsGridLoading,
    setIsVariantGridLoading,
    setIsVariantOptionsGridLoading,
    setIsVariantPhotoGridLoading,
    setIsProductPhotoGridLoading,
    setIsVariantHistoryGridLoading,
    setIsVariantsForPurchaseGridLoading,
    setIsPurchaseGridLoading,
    setIsSuppliersGridLoading,
    refreshActiveCards,
    refreshActiveTab,
    refreshVariants,
    refreshSelectedProduct,
    resetSelectedProduct,
    refreshColorOptionsGridRequestModel,
    refreshPurchaseProducts,
    refreshPurchaseProductVariantsGridRequestModel,
    refreshPurchasesProductsGridRequestModel,
    refreshVariantsForPurchaseGridRequestModel,
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
    refreshVariantHistory,
    refreshColorsForFilter,
    refreshSizesForFilter,
    refreshPurchasesList,
    refreshPurchaseGridRequestModel,
    refreshSelectedPurchase,
    resetSelectedPurchase,
    refreshCompaniesGridRequestModel,
    refreshSelectedCompany,
  },
});

export const PurchaseProductsPageSliceActions =
  PurchaseProductsPageSlice.actions;
export default PurchaseProductsPageSlice;
