import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IOrderProductsPageSlice } from "@/const/interfaces/store-slices/IOrderProductsPageSlice.ts";
import { IOrderDetailsPageSlice } from "@/const/interfaces/store-slices/IOrderDetailsPageSlice.ts";
import { TraitModel } from "@/const/models/TraitModel.ts";
import { TypeOfTraitModel } from "@/const/models/TypeOfTraitModel.ts";
import { ProductCountersModel } from "@/const/models/CounterModel.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import { ImageModel } from "@/const/models/ImageModel.ts";
import { VariantHistoryModel } from "@/const/models/VariantHistoryModel.ts";
import { PurchaseModel } from "@/const/models/PurchaseModel.ts";
import { CompanyModel } from "@/const/models/CompanyModel.ts";
import { CountryCodeModel } from "@/const/models/CountryCodeModel.ts";
import { LocationModel } from "@/const/models/LocationModel.ts";
import { TaxTypeModel } from "@/const/models/TaxTypeModel.ts";
import { VariantModel } from "@/const/models/VariantModel.ts";
import { CurrencyModel } from "@/const/models/CurrencyModel.ts";

const initialState: IOrderProductsPageSlice = {
  isProductsInOrderCardLoading: false,
  isFindProductsCardLoading: false,
  isProductsInOrderGridLoading: false,
  isFindProductsGridLoading: false,
  activeCards: [],
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
  isVariantHistoryCardLoading: false,
  isSelectPurchaseCardLoading: false,
  isSupplierCardLoading: false,
  isSelectEntityCardLoading: false,
  isCreateCompanyCardLoading: false,
  isCompanyConfigurationCardLoading: false,
  isLocationConfigurationCardLoading: false,
  isProductsLoading: false,
  isTraitOptionsGridLoading: false,
  isVariantOptionsGridLoading: false,
  isVariantPhotoGridLoading: false,
  isProductPhotoGridLoading: false,
  isVariantsHistoryGridLoading: false,
  isPurchaseGridLoading: false,
  isSuppliersGridLoading: false,
  isPhotoUploaderLoading: false,
  isLocationsGridLoading: false,
  selectedVariant: null,
  isDuplicateVariant: false,
  productCounter: null,
  traits: [],
  typesOfTraits: [],
  listOfTraitsForProduct: [],
  listOfTraitsWithOptionsForProduct: [],
  contextId: null,
  selectedTraitsIds: [],
  selectedTrait: null,
  colorOptionsGridRequestModel: null,
  sizeOptionsGridRequestModel: {},
  variantTraitsGridRequestModel: {},
  photosGridRequestModel: {},
  traitOptions: [],
  variantPhotos: [],
  productPhotosForVariant: [],
  variantHistory: [],
  purchasesList: [],
  purchaseGridRequestModel: {},
  selectedPurchase: null,
  companiesGridRequestModel: {},
  selectedCompany: null,
  managedCompany: undefined,
  managedLocation: undefined,
  countryCodes: [],
  productId: null,
  taxesList: [],
  currenciesList: [],
  stockActionsGridRequestModel: {},
};

//----------------------------------------------------- LOADERS

function setIsProductsInOrderCardLoading(
  state: IOrderProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isProductsInOrderCardLoading = action?.payload;
}

function setIsFindProductsCardLoading(
  state: IOrderProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isFindProductsCardLoading = action?.payload;
}

function setIsProductsInOrderGridLoading(
  state: IOrderProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isProductsInOrderGridLoading = action?.payload;
}

function setIsFindProductsGridLoading(
  state: IOrderProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isFindProductsGridLoading = action?.payload;
}

function setIsManageVariantsCardLoading(
  state: IOrderProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isManageVariantsCardLoading = action?.payload;
}

function setIsVariantConfigurationCardLoading(
  state: IOrderProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isVariantConfigurationCardLoading = action?.payload;
}

function setIsAddStockCardLoading(
  state: IOrderProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isAddStockCardLoading = action?.payload;
}

function setIsDisposeStockCardLoading(
  state: IOrderProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isDisposeStockCardLoading = action?.payload;
}

function setIsStockHistoryCardLoading(
  state: IOrderProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isStockHistoryCardLoading = action?.payload;
}

function setIsAddVariantCardLoading(
  state: IOrderProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isAddVariantCardLoading = action?.payload;
}

function setIsManageTraitsCardLoading(
  state: IOrderProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isManageTraitsCardLoading = action?.payload;
}

function setIsChooseVariantTraitsCardLoading(
  state: IOrderProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isChooseVariantTraitsCardLoading = action?.payload;
}

function setIsProductTraitConfigurationCardLoading(
  state: IOrderProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isProductTraitConfigurationCardLoading = action?.payload;
}

function setIsVariantPhotosCardLoading(
  state: IOrderProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isVariantPhotosCardLoading = action?.payload;
}

function setIsVariantHistoryCardLoading(
  state: IOrderProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isVariantHistoryCardLoading = action?.payload;
}

function setIsSelectPurchaseCardLoading(
  state: IOrderProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isSelectPurchaseCardLoading = action?.payload;
}

function setIsSupplierCardLoading(
  state: IOrderProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isSupplierCardLoading = action?.payload;
}

function setIsSelectEntityCardLoading(
  state: IOrderProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isSelectEntityCardLoading = action?.payload;
}

function setIsCreateCompanyCardLoading(
  state: IOrderProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isCreateCompanyCardLoading = action?.payload;
}

function setIsCompanyConfigurationCardLoading(
  state: IOrderProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isCompanyConfigurationCardLoading = action?.payload;
}

function setIsLocationConfigurationCardLoading(
  state: IOrderProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isLocationConfigurationCardLoading = action?.payload;
}

function setIsProductsLoading(
  state: IOrderProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isProductsLoading = action?.payload;
}

function setIsTraitOptionsGridLoading(
  state: IOrderProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isTraitOptionsGridLoading = action?.payload;
}

function setIsVariantOptionsGridLoading(
  state: IOrderProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isVariantOptionsGridLoading = action?.payload;
}

function setIsVariantPhotoGridLoading(
  state: IOrderProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isVariantPhotoGridLoading = action?.payload;
}

function setIsProductPhotoGridLoading(
  state: IOrderProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isProductPhotoGridLoading = action?.payload;
}

function setIsVariantsHistoryGridLoading(
  state: IOrderProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isVariantsHistoryGridLoading = action?.payload;
}

function setIsPurchaseGridLoading(
  state: IOrderProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isPurchaseGridLoading = action?.payload;
}

function setIsSuppliersGridLoading(
  state: IOrderProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isSuppliersGridLoading = action?.payload;
}

function setIsPhotoUploaderLoading(
  state: IOrderProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isPhotoUploaderLoading = action?.payload;
}

function setIsLocationsGridLoading(
  state: IOrderProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isLocationsGridLoading = action?.payload;
}

//----------------------------------------------------- API

function refreshActiveCards(
  state: IOrderDetailsPageSlice,
  action: PayloadAction<any[]>,
) {
  state.activeCards = action?.payload || state.activeCards;
}

function refreshIsDuplicateVariant(
  state: IOrderProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isDuplicateVariant = action?.payload;
}

function refreshTraits(
  state: IOrderProductsPageSlice,
  action: PayloadAction<TraitModel[]>,
) {
  state.traits = action?.payload || state.traits;
}

function refreshTypesOfTraits(
  state: IOrderProductsPageSlice,
  action: PayloadAction<TypeOfTraitModel[]>,
) {
  state.typesOfTraits = action?.payload || state.typesOfTraits;
}

function refreshListOfTraitsForProduct(
  state: IOrderProductsPageSlice,
  action: PayloadAction<TraitModel[]>,
) {
  state.listOfTraitsForProduct =
    action?.payload || state.listOfTraitsForProduct;
}

function refreshListOfTraitsWithOptionsForProduct(
  state: IOrderProductsPageSlice,
  action: PayloadAction<TraitModel[]>,
) {
  state.listOfTraitsWithOptionsForProduct =
    action?.payload || state.listOfTraitsWithOptionsForProduct;
}

function refreshProductCounter(
  state: IOrderProductsPageSlice,
  action: PayloadAction<ProductCountersModel>,
) {
  state.productCounter = action?.payload || state.productCounter;
}

function resetActiveCards(state: IOrderProductsPageSlice) {
  state.activeCards = [];
}

function refreshContextId(
  state: IOrderProductsPageSlice,
  action: PayloadAction<number>,
) {
  state.contextId = action?.payload || state.contextId;
}

function refreshSelectedTraitsIds(
  state: IOrderProductsPageSlice,
  action: PayloadAction<number[]>,
) {
  state.selectedTraitsIds = action?.payload || state.selectedTraitsIds;
}

function refreshSelectedTrait(
  state: IOrderProductsPageSlice,
  action: PayloadAction<TraitModel>,
) {
  state.selectedTrait = action?.payload || state.selectedTrait;
}

function resetSelectedTrait(state: IOrderProductsPageSlice) {
  state.selectedTrait = null;
}

function refreshTraitOption(
  state: IOrderProductsPageSlice,
  action: PayloadAction<any>,
) {
  state.traitOptions = action?.payload || state.traitOptions;
}

function refreshColorOptionsGridRequestModel(
  state: IOrderProductsPageSlice,
  action: PayloadAction<GridRequestModel>,
) {
  state.colorOptionsGridRequestModel =
    action?.payload || state.colorOptionsGridRequestModel;
}

function refreshSizeOptionsGridRequestModel(
  state: IOrderProductsPageSlice,
  action: PayloadAction<GridRequestModel>,
) {
  state.sizeOptionsGridRequestModel =
    action?.payload || state.sizeOptionsGridRequestModel;
}

function refreshVariantPhotos(
  state: IOrderProductsPageSlice,
  action: PayloadAction<any[]>,
) {
  state.variantPhotos = action?.payload || state.variantPhotos;
}

function refreshProductPhotosForVariant(
  state: IOrderProductsPageSlice,
  action: PayloadAction<ImageModel[]>,
) {
  state.productPhotosForVariant =
    action?.payload || state.productPhotosForVariant;
}

function refreshVariantHistory(
  state: IOrderProductsPageSlice,
  action: PayloadAction<VariantHistoryModel[]>,
) {
  state.variantHistory = action?.payload || state.variantHistory;
}

function refreshPurchasesList(
  state: IOrderProductsPageSlice,
  action: PayloadAction<PurchaseModel[]>,
) {
  state.purchasesList = action?.payload || state.purchasesList;
}

function refreshPurchaseGridRequestModel(
  state: IOrderProductsPageSlice,
  action: PayloadAction<GridRequestModel>,
) {
  state.purchaseGridRequestModel =
    action?.payload || state.purchaseGridRequestModel;
}

function refreshSelectedPurchase(
  state: IOrderProductsPageSlice,
  action: PayloadAction<PurchaseModel>,
) {
  state.selectedPurchase = action?.payload || state.selectedPurchase;
}

function resetSelectedPurchase(state: IOrderProductsPageSlice) {
  state.selectedPurchase = null;
}

function refreshCompaniesGridRequestModel(
  state: IOrderProductsPageSlice,
  action: PayloadAction<GridRequestModel>,
) {
  state.companiesGridRequestModel =
    action?.payload || state.companiesGridRequestModel;
}

function refreshSelectedCompany(
  state: IOrderProductsPageSlice,
  action: PayloadAction<CompanyModel>,
) {
  state.selectedCompany = action?.payload || state.selectedCompany;
}

function resetSelectedCompany(state: IOrderProductsPageSlice) {
  state.selectedCompany = null;
}

function refreshCountryCodes(
  state: IOrderProductsPageSlice,
  action: PayloadAction<CountryCodeModel[]>,
) {
  state.countryCodes = action?.payload || state.countryCodes;
}

function refreshManagedCompany(
  state: IOrderProductsPageSlice,
  action: PayloadAction<CompanyModel>,
) {
  state.managedCompany = action?.payload || state.managedCompany;
}

function resetManagedCompany(state: IOrderProductsPageSlice) {
  state.managedCompany = null;
}

function refreshManagedLocation(
  state: IOrderProductsPageSlice,
  action: PayloadAction<LocationModel>,
) {
  state.managedLocation = action?.payload || state.managedLocation;
}

function resetManagedLocation(state: IOrderProductsPageSlice) {
  state.managedLocation = null;
}

function refreshProductId(
  state: IOrderProductsPageSlice,
  action: PayloadAction<number>,
) {
  state.productId = action?.payload || state.productId;
}

function refreshTaxesList(
  state: IOrderProductsPageSlice,
  action: PayloadAction<TaxTypeModel[]>,
) {
  state.taxesList = action?.payload || state.taxesList;
}

function refreshSelectedVariant(
  state: IOrderProductsPageSlice,
  action: PayloadAction<VariantModel>,
) {
  state.selectedVariant = action?.payload || state.selectedVariant;
}

function refreshCurrenciesList(
  state: IOrderProductsPageSlice,
  action: PayloadAction<CurrencyModel[]>,
) {
  state.currenciesList = action?.payload || state.currenciesList;
}

function refreshStockActionsGridRequestModel(
  state: IOrderProductsPageSlice,
  action: PayloadAction<GridRequestModel>,
) {
  state.stockActionsGridRequestModel =
    action?.payload || state.stockActionsGridRequestModel;
}

const OrderProductsPageSlice = createSlice({
  name: StoreSliceEnum.ORDER_PRODUCTS,
  initialState,
  reducers: {
    setIsProductsInOrderCardLoading,
    setIsFindProductsCardLoading,
    setIsProductsInOrderGridLoading,
    setIsFindProductsGridLoading,
    refreshActiveCards,
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
    setIsVariantHistoryCardLoading,
    setIsSelectPurchaseCardLoading,
    setIsSupplierCardLoading,
    setIsSelectEntityCardLoading,
    setIsCreateCompanyCardLoading,
    setIsCompanyConfigurationCardLoading,
    setIsLocationConfigurationCardLoading,
    setIsProductsLoading,
    setIsTraitOptionsGridLoading,
    setIsVariantOptionsGridLoading,
    setIsVariantPhotoGridLoading,
    setIsProductPhotoGridLoading,
    setIsVariantsHistoryGridLoading,
    setIsPurchaseGridLoading,
    setIsSuppliersGridLoading,
    setIsPhotoUploaderLoading,
    setIsLocationsGridLoading,
    refreshIsDuplicateVariant,
    refreshTraits,
    refreshTypesOfTraits,
    refreshListOfTraitsForProduct,
    refreshListOfTraitsWithOptionsForProduct,
    refreshProductCounter,
    resetActiveCards,
    refreshSelectedTraitsIds,
    refreshSelectedTrait,
    resetSelectedTrait,
    refreshContextId,
    refreshTraitOption,
    refreshColorOptionsGridRequestModel,
    refreshSizeOptionsGridRequestModel,
    refreshVariantPhotos,
    refreshProductPhotosForVariant,
    refreshVariantHistory,
    refreshPurchasesList,
    refreshPurchaseGridRequestModel,
    refreshSelectedPurchase,
    resetSelectedPurchase,
    refreshCompaniesGridRequestModel,
    refreshSelectedCompany,
    resetSelectedCompany,
    refreshCountryCodes,
    refreshManagedCompany,
    resetManagedCompany,
    refreshManagedLocation,
    resetManagedLocation,
    refreshProductId,
    refreshTaxesList,
    refreshSelectedVariant,
    refreshCurrenciesList,
    refreshStockActionsGridRequestModel,
  },
});

export const OrderProductsPageSliceActions = OrderProductsPageSlice.actions;
export default OrderProductsPageSlice;
