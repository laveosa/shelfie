import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IProductsPageSlice } from "@/const/interfaces/store-slices/IProductsPageSlice.ts";
import { ProductModel } from "@/const/models/ProductModel.ts";
import { BrandModel } from "@/const/models/BrandModel.ts";
import { CategoryModel } from "@/const/models/CategoryModel.ts";
import { GridSortingModel } from "@/const/models/GridSortingModel.ts";
import { GridModel } from "@/const/models/GridModel.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import { ProductCounterModel } from "@/const/models/ProductCounterModel.ts";
import { ImageModel } from "@/const/models/ImageModel.ts";
import { TaxTypeModel } from "@/const/models/TaxTypeModel.ts";
import { CurrencyModel } from "@/const/models/CurrencyModel.ts";

const initialState: IProductsPageSlice = {
  loading: false,
  products: null,
  productCounter: null,
  columnsPreferences: null,
  brands: [],
  categories: [],
  sortingOptions: [],
  productsGridModel: {
    pager: {},
    items: [],
  },
  variantsGridModel: {
    pager: {},
    items: [],
  },
  gridRequestModel: {
    currentPage: 1,
    pageSize: 10,
  },
  productPhotos: [],
  taxesList: [],
  currenciesList: [],
};

function setLoading(state: IProductsPageSlice, action: PayloadAction<boolean>) {
  state.loading = action?.payload;
}

function refreshProducts(
  state: IProductsPageSlice,
  action: PayloadAction<ProductModel[]>,
) {
  state.products = action?.payload || state.products;
}

function refreshProductCounter(
  state: IProductsPageSlice,
  action: PayloadAction<ProductCounterModel>,
) {
  state.productCounter = action?.payload || state.productCounter;
}

function refreshProductsGridModel(
  state: IProductsPageSlice,
  action: PayloadAction<GridModel>,
) {
  state.productsGridModel = action?.payload || state.productsGridModel;
}

function refreshVariantsGridModel(
  state: IProductsPageSlice,
  action: PayloadAction<GridModel>,
) {
  state.variantsGridModel = action?.payload || state.variantsGridModel;
}

function refreshGridRequestModel(
  state: IProductsPageSlice,
  action: PayloadAction<GridRequestModel>,
) {
  state.gridRequestModel = action?.payload || state.gridRequestModel;
}

function refreshBrands(
  state: IProductsPageSlice,
  action: PayloadAction<BrandModel[]>,
) {
  state.brands = action?.payload || state.brands;
}

function refreshCategories(
  state: IProductsPageSlice,
  action: PayloadAction<CategoryModel[]>,
) {
  state.categories = action?.payload || state.categories;
}

function refreshSortingOptions(
  state: IProductsPageSlice,
  action: PayloadAction<GridSortingModel[]>,
) {
  state.sortingOptions = action?.payload || state.sortingOptions;
}

function refreshProductPhotos(
  state: IProductsPageSlice,
  action: PayloadAction<ImageModel[]>,
) {
  state.productPhotos = action?.payload || state.productPhotos;
}

function refreshTaxesList(
  state: IProductsPageSlice,
  action: PayloadAction<TaxTypeModel[]>,
) {
  state.taxesList = action?.payload || state.taxesList;
}

function refreshCurrenciesList(
  state: IProductsPageSlice,
  action: PayloadAction<CurrencyModel[]>,
) {
  state.currenciesList = action?.payload || state.currenciesList;
}

const ProductsPageSlice = createSlice({
  name: StoreSliceEnum.PRODUCTS,
  initialState,
  reducers: {
    setLoading,
    refreshProducts,
    refreshProductCounter,
    refreshProductsGridModel,
    refreshVariantsGridModel,
    refreshGridRequestModel,
    refreshBrands,
    refreshCategories,
    refreshSortingOptions,
    refreshProductPhotos,
    refreshTaxesList,
    refreshCurrenciesList,
  },
});

export const ProductsPageSliceActions = ProductsPageSlice.actions;
export default ProductsPageSlice;
