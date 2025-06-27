import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IProductsPageSlice } from "@/const/interfaces/store-slices/IProductsPageSlice.ts";
import { ProductModel } from "@/const/models/ProductModel.ts";
import { BrandModel } from "@/const/models/BrandModel.ts";
import { CategoryModel } from "@/const/models/CategoryModel.ts";
import { GridSortingModel } from "@/const/models/GridSortingModel.ts";
import { GridModel } from "@/const/models/GridModel.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import {
  ProductCountersModel,
  PurchaseCountersModel,
} from "@/const/models/CounterModel.ts";
import { ImageModel } from "@/const/models/ImageModel.ts";
import { TaxTypeModel } from "@/const/models/TaxTypeModel.ts";
import { CurrencyModel } from "@/const/models/CurrencyModel.ts";
import { VariantModel } from "@/const/models/VariantModel.ts";
import { PurchaseModel } from "@/const/models/PurchaseModel.ts";
import { SupplierModel } from "@/const/models/SupplierModel.ts";
import { CountryCodeModel } from "@/const/models/CountryCodeModel.ts";
import { TraitModel } from "@/const/models/TraitModel.ts";
import { TypeOfTraitModel } from "@/const/models/TypeOfTraitModel.ts";

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
  suppliers: [],
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
  selectedSupplier: null,
  selectedPurchase: null,
  taxesList: [],
  currenciesList: [],
  countryCodeList: null,
  purchaseCounters: null,
  typesOfTraits: [],
  traits: null,
  listOfTraitsWithOptionsForProduct: null,
  brand: null,
  category: null,
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
  action: PayloadAction<ProductCountersModel>,
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

function refreshSuppliers(
  state: IProductsPageSlice,
  action: PayloadAction<SupplierModel[]>,
) {
  state.suppliers = action?.payload || state.suppliers;
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
  action: PayloadAction<VariantModel[]>,
) {
  state.productVariants = action?.payload || state.productVariants;
}

function refreshSelectedVariant(
  state: IProductsPageSlice,
  action: PayloadAction<VariantModel>,
) {
  state.selectedVariant = action?.payload || state.selectedVariant;
}

function refreshSelectedSupplier(
  state: IProductsPageSlice,
  action: PayloadAction<SupplierModel>,
) {
  state.selectedSupplier = action?.payload || state.selectedSupplier;
}

function resetSelectedSupplier(state: IProductsPageSlice) {
  state.selectedSupplier = null;
}

function refreshSelectedPurchase(
  state: IProductsPageSlice,
  action: PayloadAction<PurchaseModel>,
) {
  state.selectedPurchase = action?.payload || state.selectedPurchase;
}

function resetSelectedPurchase(state: IProductsPageSlice) {
  state.selectedPurchase = null;
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

function refreshCountryCodeList(
  state: IProductsPageSlice,
  action: PayloadAction<CountryCodeModel[]>,
) {
  state.countryCodeList = action?.payload || state.countryCodeList;
}

function refreshPurchaseCounters(
  state: IProductsPageSlice,
  action: PayloadAction<PurchaseCountersModel>,
) {
  state.purchaseCounters = action?.payload || state.purchaseCounters;
}

function refreshTypesOfTraits(
  state: IProductsPageSlice,
  action: PayloadAction<TypeOfTraitModel[]>,
) {
  state.typesOfTraits = action?.payload || state.typesOfTraits;
}

function refreshTraits(
  state: IProductsPageSlice,
  action: PayloadAction<TraitModel[]>,
) {
  state.traits = action?.payload || state.traits;
}

function refreshListOfTraitsWithOptionsForProduct(
  state: IProductsPageSlice,
  action: PayloadAction<TraitModel[]>,
) {
  state.listOfTraitsWithOptionsForProduct =
    action?.payload || state.listOfTraitsWithOptionsForProduct;
}

function refreshBrand(
  state: IProductsPageSlice,
  action: PayloadAction<BrandModel>,
) {
  state.brand = action?.payload || state.brand;
}

function refreshCategory(
  state: IProductsPageSlice,
  action: PayloadAction<CategoryModel>,
) {
  state.category = action?.payload || state.category;
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
    refreshSuppliers,
    refreshSortingOptions,
    refreshProductPhotos,
    refreshProductVariants,
    refreshSelectedVariant,
    resetSelectedVariant,
    refreshSelectedSupplier,
    resetSelectedSupplier,
    refreshSelectedPurchase,
    resetSelectedPurchase,
    refreshTaxesList,
    refreshCurrenciesList,
    refreshCountryCodeList,
    refreshPurchaseCounters,
    refreshTypesOfTraits,
    refreshTraits,
    refreshListOfTraitsWithOptionsForProduct,
    refreshBrand,
    refreshCategory,
  },
});

export const ProductsPageSliceActions = ProductsPageSlice.actions;
export default ProductsPageSlice;
