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
import { VariantModel } from "@/const/models/VariantModel.ts";
import { PurchaseModel } from "@/const/models/PurchaseModel.ts";

const initialState: IProductsPageSlice = {
  isLoading: false,
  isItemsCardLoading: false,
  isProductMenuCardLoading: false,
  isProductsLoading: false,
  isProductPhotosLoading: false,
  isProductVariantsLoading: false,
  products: null,
  product: null,
  selectedProduct: null,
  variants: [],
  purchases: [],
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
  purchasesGridModel: {
    pager: {},
    items: [],
  },
  gridRequestModel: {
    currentPage: 1,
    pageSize: 10,
  },
  productsGridRequestModel: {
    currentPage: 1,
    pageSize: 10,
  },
  variantsGridRequestModel: {
    currentPage: 1,
    pageSize: 10,
  },
  purchasesGridRequestModel: {
    currentPage: 1,
    pageSize: 10,
  },
  productPhotos: [],
  productVariants: [],
  selectedVariant: null,
  taxesList: [],
  currenciesList: [],
};

//----------------------------------------------------- LOADERS

function setIsLoading(
  state: IProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isLoading = action?.payload;
}

function setIsItemsCardLoading(
  state: IProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isItemsCardLoading = action?.payload;
}

function setIsProductMenuCardLoading(
  state: IProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isProductMenuCardLoading = action?.payload;
}

function setIsProductsLoading(
  state: IProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isProductsLoading = action?.payload;
}

function setIsProductPhotosLoading(
  state: IProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isProductPhotosLoading = action?.payload;
}

function setIsProductVariantsLoading(
  state: IProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isProductVariantsLoading = action?.payload;
}

//----------------------------------------------------- API

function refreshProducts(
  state: IProductsPageSlice,
  action: PayloadAction<ProductModel[]>,
) {
  state.products = action?.payload || state.products;
}

function refreshProduct(
  state: IProductsPageSlice,
  action: PayloadAction<ProductModel>,
) {
  state.product = action?.payload || state.product;
}

function resetProduct(state: IProductsPageSlice) {
  state.product = null;
}

function refreshSelectedProduct(
  state: IProductsPageSlice,
  action: PayloadAction<ProductModel>,
) {
  state.selectedProduct = action?.payload || state.selectedProduct;
}

function refreshVariants(
  state: IProductsPageSlice,
  action: PayloadAction<VariantModel[]>,
) {
  state.variants = action?.payload || state.variants;
}

function refreshPurchases(
  state: IProductsPageSlice,
  action: PayloadAction<PurchaseModel[]>,
) {
  state.purchases = action?.payload || state.purchases;
}

function refreshProductCounter(
  state: IProductsPageSlice,
  action: PayloadAction<ProductCounterModel>,
) {
  state.productCounter = action?.payload || state.productCounter;
}

function resetProductCounter(state: IProductsPageSlice) {
  state.productCounter = null;
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

function refreshPurchasesGridModel(
  state: IProductsPageSlice,
  action: PayloadAction<GridModel>,
) {
  state.purchasesGridModel = action?.payload || state.purchasesGridModel;
}

function refreshGridRequestModel(
  state: IProductsPageSlice,
  action: PayloadAction<GridRequestModel>,
) {
  state.gridRequestModel = action?.payload || state.gridRequestModel;
}

function refreshProductsGridRequestModel(
  state: IProductsPageSlice,
  action: PayloadAction<GridRequestModel>,
) {
  state.productsGridRequestModel =
    action?.payload || state.productsGridRequestModel;
}

function refreshVariantsGridRequestModel(
  state: IProductsPageSlice,
  action: PayloadAction<GridRequestModel>,
) {
  state.variantsGridRequestModel =
    action?.payload || state.variantsGridRequestModel;
}

function refreshPurchasesGridRequestModel(
  state: IProductsPageSlice,
  action: PayloadAction<GridRequestModel>,
) {
  state.purchasesGridRequestModel =
    action?.payload || state.purchasesGridRequestModel;
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

function refreshProductVariants(
  state: IProductsPageSlice,
  action: PayloadAction<any[]>,
) {
  state.productVariants = action?.payload || state.productVariants;
}

function refreshSelectedVariant(
  state: IProductsPageSlice,
  action: PayloadAction<VariantModel>,
) {
  state.selectedVariant = action?.payload || state.selectedVariant;
}

function resetSelectedVariant(state: IProductsPageSlice) {
  state.selectedVariant = null;
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
    setIsLoading,
    setIsItemsCardLoading,
    setIsProductMenuCardLoading,
    setIsProductsLoading,
    setIsProductPhotosLoading,
    setIsProductVariantsLoading,
    refreshProducts,
    refreshProduct,
    resetProduct,
    refreshSelectedProduct,
    refreshVariants,
    refreshPurchases,
    refreshProductCounter,
    resetProductCounter,
    refreshProductsGridModel,
    refreshVariantsGridModel,
    refreshGridRequestModel,
    refreshPurchasesGridModel,
    refreshProductsGridRequestModel,
    refreshVariantsGridRequestModel,
    refreshPurchasesGridRequestModel,
    refreshBrands,
    refreshCategories,
    refreshSortingOptions,
    refreshProductPhotos,
    refreshProductVariants,
    refreshSelectedVariant,
    resetSelectedVariant,
    refreshTaxesList,
    refreshCurrenciesList,
  },
});

export const ProductsPageSliceActions = ProductsPageSlice.actions;
export default ProductsPageSlice;
