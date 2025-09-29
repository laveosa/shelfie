import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { BrandModel } from "@/const/models/BrandModel.ts";
import { CategoryModel } from "@/const/models/CategoryModel.ts";
import { IProductBasicDataPageSlice } from "@/const/interfaces/store-slices/IProductBasicDataPageSlice.ts";
import { ProductModel } from "@/const/models/ProductModel.ts";
import { ProductCountersModel } from "@/const/models/CounterModel.ts";
import { ImageModel } from "@/const/models/ImageModel.ts";
import { CountryCodeModel } from "@/const/models/CountryCodeModel.ts";
import { CompanyModel } from "@/const/models/CompanyModel.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";

const initialState: IProductBasicDataPageSlice = {
  isLoading: false,
  isProductConfigurationCardLoading: false,
  isCreateProductCategoryCardLoading: false,
  isCreateProductBrandCardLoading: false,
  isSelectEntityCardLoading: false,
  isCreateCompanyCardLoading: false,
  isCompanyConfigurationCardLoading: false,
  isProductsLoading: false,
  isPhotoUploaderLoading: false,
  isCompaniesGridLoading: false,
  isLocationsGridLoading: false,
  products: [],
  product: {},
  activeCards: [],
  countryCodes: [],
  brandsList: [],
  categoriesList: [],
  brand: {},
  category: {},
  contextId: null,
  productCounter: null,
  photos: [],
  selectedCompany: undefined,
  companiesList: [],
  companiesGridRequestModel: {},
  managedCompany: undefined,
};

//------------------------------------- LOADERS/

function setLoading(
  state: IProductBasicDataPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isLoading = action?.payload;
}

function setIsProductConfigurationCardLoading(
  state: IProductBasicDataPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isProductConfigurationCardLoading = action?.payload;
}

function setIsCreateProductCategoryCardLoading(
  state: IProductBasicDataPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isCreateProductCategoryCardLoading = action?.payload;
}

function setIsCreateProductBrandCardLoading(
  state: IProductBasicDataPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isCreateProductBrandCardLoading = action?.payload;
}

function setIsSelectEntityCardLoading(
  state: IProductBasicDataPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isSelectEntityCardLoading = action?.payload;
}

function setIsCreateCompanyCardLoading(
  state: IProductBasicDataPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isCreateCompanyCardLoading = action?.payload;
}

function setIsCompanyConfigurationCardLoading(
  state: IProductBasicDataPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isCompanyConfigurationCardLoading = action?.payload;
}

function setProductsLoading(
  state: IProductBasicDataPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isProductsLoading = action?.payload;
}

function setIsPhotoUploaderLoading(
  state: IProductBasicDataPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isPhotoUploaderLoading = action?.payload;
}

function setIsCompaniesGridLoading(
  state: IProductBasicDataPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isCompaniesGridLoading = action?.payload;
}

function setIsLocationsGridLoading(
  state: IProductBasicDataPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isLocationsGridLoading = action?.payload;
}

//------------------------------------- API/

function refreshProducts(
  state: IProductBasicDataPageSlice,
  action: PayloadAction<ProductModel[]>,
) {
  state.products = action?.payload || state.products;
}

function refreshProduct(
  state: IProductBasicDataPageSlice,
  action: PayloadAction<ProductModel>,
) {
  state.product = action?.payload || state.product;
}

function refreshActiveCards(
  state: IProductBasicDataPageSlice,
  action: PayloadAction<any[]>,
) {
  state.activeCards = action?.payload || state.activeCards;
}

function refreshCountryCodes(
  state: IProductBasicDataPageSlice,
  action: PayloadAction<CountryCodeModel[]>,
) {
  state.countryCodes = action?.payload || state.countryCodes;
}

function refreshBrandsList(
  state: IProductBasicDataPageSlice,
  action: PayloadAction<BrandModel[]>,
) {
  state.brandsList = action?.payload || state.brandsList;
}

function refreshCategoriesList(
  state: IProductBasicDataPageSlice,
  action: PayloadAction<CategoryModel[]>,
) {
  state.categoriesList = action?.payload || state.categoriesList;
}

function refreshBrand(
  state: IProductBasicDataPageSlice,
  action: PayloadAction<BrandModel>,
) {
  state.brand = action?.payload || state.brand;
}

function refreshCategory(
  state: IProductBasicDataPageSlice,
  action: PayloadAction<CategoryModel>,
) {
  state.category = action?.payload || state.category;
}

function refreshContextId(
  state: IProductBasicDataPageSlice,
  action: PayloadAction<number>,
) {
  state.contextId = action?.payload || state.contextId;
}

function refreshProductCounter(
  state: IProductBasicDataPageSlice,
  action: PayloadAction<ProductCountersModel>,
) {
  state.productCounter = action?.payload || state.productCounter;
}

function refreshProductPhotos(
  state: IProductBasicDataPageSlice,
  action: PayloadAction<ImageModel[]>,
) {
  state.photos = action?.payload || state.photos;
}

function refreshSelectedCompany(
  state: IProductBasicDataPageSlice,
  action: PayloadAction<CompanyModel>,
) {
  state.selectedCompany = action?.payload || state.selectedCompany;
}

function resetSelectedCompany(state: IProductBasicDataPageSlice) {
  state.selectedCompany = null;
}

function refreshCompaniesGridRequestModel(
  state: IProductBasicDataPageSlice,
  action: PayloadAction<GridRequestModel>,
) {
  state.companiesGridRequestModel =
    action?.payload || state.companiesGridRequestModel;
}

function refreshManagedCompany(
  state: IProductBasicDataPageSlice,
  action: PayloadAction<CompanyModel>,
) {
  state.managedCompany = action?.payload || state.managedCompany;
}

function resetManagedCompany(state: IProductBasicDataPageSlice) {
  state.managedCompany = null;
}

const ProductBasicDataPageSlice = createSlice({
  name: StoreSliceEnum.PRODUCT_BASIC_DATA,
  initialState,
  reducers: {
    setLoading,
    setIsProductConfigurationCardLoading,
    setIsCreateProductCategoryCardLoading,
    setIsCreateProductBrandCardLoading,
    setIsSelectEntityCardLoading,
    setIsCreateCompanyCardLoading,
    setIsCompanyConfigurationCardLoading,
    setProductsLoading,
    setIsPhotoUploaderLoading,
    setIsCompaniesGridLoading,
    setIsLocationsGridLoading,
    refreshProducts,
    refreshProduct,
    refreshActiveCards,
    refreshCountryCodes,
    refreshBrandsList,
    refreshCategoriesList,
    refreshBrand,
    refreshCategory,
    refreshContextId,
    refreshProductCounter,
    refreshProductPhotos,
    refreshSelectedCompany,
    resetSelectedCompany,
    refreshCompaniesGridRequestModel,
    refreshManagedCompany,
    resetManagedCompany,
  },
});

export const ProductBasicDataPageSliceActions =
  ProductBasicDataPageSlice.actions;
export default ProductBasicDataPageSlice;
