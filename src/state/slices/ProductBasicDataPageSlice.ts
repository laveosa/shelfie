import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { BrandModel } from "@/const/models/BrandModel.ts";
import { CategoryModel } from "@/const/models/CategoryModel.ts";
import { IProductBasicDataPageSlice } from "@/const/interfaces/store-slices/IProductBasicDataPageSlice.ts";
import { ProductModel } from "@/const/models/ProductModel.ts";
import { ProductCounterModel } from "@/const/models/ProductCounterModel.ts";
import { ImageModel } from "@/const/models/ImageModel.ts";

const initialState: IProductBasicDataPageSlice = {
  isLoading: false,
  isProductConfigurationCardLoading: false,
  isCreateProductCategoryCardLoading: false,
  isCreateProductBrandCardLoading: false,
  isProductsLoading: false,
  products: [],
  product: {},
  activeCards: [],
  brandsList: [],
  categoriesList: [],
  brand: {},
  category: {},
  contextId: null,
  productCounter: null,
  photos: [],
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

function setProductsLoading(
  state: IProductBasicDataPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isProductsLoading = action?.payload;
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
  action: PayloadAction<ProductCounterModel>,
) {
  state.productCounter = action?.payload || state.productCounter;
}

function refreshProductPhotos(
  state: IProductBasicDataPageSlice,
  action: PayloadAction<ImageModel[]>,
) {
  state.photos = action?.payload || state.photos;
}

const ProductBasicDataPageSlice = createSlice({
  name: StoreSliceEnum.PRODUCT_BASIC_DATA,
  initialState,
  reducers: {
    setLoading,
    setIsProductConfigurationCardLoading,
    setIsCreateProductCategoryCardLoading,
    setIsCreateProductBrandCardLoading,
    setProductsLoading,
    refreshProducts,
    refreshProduct,
    refreshActiveCards,
    refreshBrandsList,
    refreshCategoriesList,
    refreshBrand,
    refreshCategory,
    refreshContextId,
    refreshProductCounter,
    refreshProductPhotos,
  },
});

export const ProductBasicDataPageSliceActions =
  ProductBasicDataPageSlice.actions;
export default ProductBasicDataPageSlice;
