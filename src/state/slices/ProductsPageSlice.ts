import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IProductsPageSlice } from "@/const/interfaces/store-slices/IProductsPageSlice.ts";
import { ProductModel } from "@/const/models/ProductModel.ts";
import { BrandModel } from "@/const/models/BrandModel.ts";
import { CategoryModel } from "@/const/models/CategoryModel.ts";
import { GridSortingModel } from "@/const/models/GridSortingModel.ts";
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
import { TraitOptionModel } from "@/const/models/TraitOptionModel.ts";

const initialState: IProductsPageSlice = {
  isLoading: false,
  isItemsCardLoading: false,
  isProductMenuCardLoading: false,
  isProductsLoading: false,
  isProductPhotosLoading: false,
  isProductVariantsLoading: false,
  isPhotoUploaderLoading: false,
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
  productsGridRequestModel: {},
  variantsGridRequestModel: {},
  purchasesGridRequestModel: {},
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
  traitsForFilters: { color: [], size: [] },
  traitsForFilter: [],
  colorsForFilter: [],
  sizesForFilter: [],
  activeTab: "products",
  variantPhotos: [],
  productCode: null,
  createdPurchase: null,
};

//----------------------------------------------------- LOADERS

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

function setIsPhotoUploaderLoading(
  state: IProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isPhotoUploaderLoading = action?.payload;
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

function refreshProductsGridRequestModel(
  state: IProductsPageSlice,
  action: PayloadAction<GridRequestModel>,
) {
  if (_.isEqual(state.productsGridRequestModel, action?.payload)) {
    return;
  }
  state.productsGridRequestModel =
    action?.payload || state.productsGridRequestModel;
}

function refreshVariantsGridRequestModel(
  state: IProductsPageSlice,
  action: PayloadAction<GridRequestModel>,
) {
  if (_.isEqual(state.variantsGridRequestModel, action?.payload)) {
    return;
  }

  state.variantsGridRequestModel =
    action?.payload || state.variantsGridRequestModel;
}

function refreshPurchasesGridRequestModel(
  state: IProductsPageSlice,
  action: PayloadAction<GridRequestModel>,
) {
  if (_.isEqual(state.purchasesGridRequestModel, action?.payload)) {
    return;
  }

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

function resetPurchaseCounters(state: IProductsPageSlice) {
  state.purchaseCounters = null;
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

function refreshActiveTab(
  state: IProductsPageSlice,
  action: PayloadAction<string>,
) {
  state.activeTab = action?.payload || state.activeTab;
}

function refreshVariantPhotos(
  state: IProductsPageSlice,
  action: PayloadAction<ImageModel[]>,
) {
  state.variantPhotos = action?.payload || state.variantPhotos;
}

function refreshProductCode(
  state: IProductsPageSlice,
  action: PayloadAction<string>,
) {
  state.productCode = action?.payload || state.productCode;
}

function refreshCreatedPurchase(
  state: IProductsPageSlice,
  action: PayloadAction<PurchaseModel>,
) {
  state.createdPurchase = action?.payload || state.createdPurchase;
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
    setIsPhotoUploaderLoading,
    refreshProducts,
    refreshProduct,
    resetProduct,
    refreshSelectedProduct,
    refreshVariants,
    refreshPurchases,
    refreshProductCounter,
    resetProductCounter,
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
    resetPurchaseCounters,
    refreshTypesOfTraits,
    refreshTraits,
    refreshListOfTraitsWithOptionsForProduct,
    refreshBrand,
    refreshCategory,
    refreshColorsForFilter,
    refreshSizesForFilter,
    refreshActiveTab,
    refreshVariantPhotos,
    refreshProductCode,
    refreshCreatedPurchase,
  },
});

export const ProductsPageSliceActions = ProductsPageSlice.actions;
export default ProductsPageSlice;
