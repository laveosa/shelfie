import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IOpenCartsPageSlice } from "@/const/interfaces/store-slices/IOpenCartsPageSlice.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import { TraitOptionModel } from "@/const/models/TraitOptionModel.ts";
import { BrandModel } from "@/const/models/BrandModel.ts";
import { CategoryModel } from "@/const/models/CategoryModel.ts";
import { IOrdersPageSlice } from "@/const/interfaces/store-slices/IOrdersPageSlice.ts";
import { CustomerModel } from "@/const/models/CustomerModel.ts";
import { CartModel } from "@/const/models/CartModel.ts";
import { VariantModel } from "@/const/models/VariantModel.ts";
import { OrderModel } from "@/const/models/OrderModel.ts";
import { VariantHistoryModel } from "@/const/models/VariantHistoryModel.ts";

const initialState: IOpenCartsPageSlice = {
  isLoading: false,
  isOpenCartsCardLoading: false,
  isCustomerCartCardLoading: false,
  isSelectEntityCardLoading: false,
  isCustomerCardLoading: false,
  isFindProductsCardLoading: false,
  isCreateOrderCardLoading: false,
  isVariantHistoryCardLoading: false,
  isOpenCartsGridLoading: false,
  isCartContentGridLoading: false,
  isSelectEntityGridLoading: false,
  isFindProductsGridLoading: false,
  isReplaceVariantGridLoading: false,
  isCartsWithSpecificProductGridLoading: false,
  isCreateOrderGridLoading: false,
  isVariantsHistoryGridLoading: false,
  isImageUploaderLoading: false,
  activeCards: [],
  openCartsGridRequestModel: {},
  customersGridRequestModel: {},
  variantsGridRequestModel: {},
  selectedCustomer: undefined,
  managedCustomer: undefined,
  colorsForFilter: undefined,
  sizesForFilter: undefined,
  brands: undefined,
  categories: undefined,
  managedCart: undefined,
  selectedVariant: undefined,
  variantsList: undefined,
  selectedOrder: undefined,
  variantHistory: undefined,
  cartsWithSpecificProduct: undefined,
};

//----------------------------------------------------- LOADERS

function setIsLoading(
  state: IOpenCartsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isLoading = action?.payload;
}

function setIsOpenCartsCardLoading(
  state: IOpenCartsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isOpenCartsCardLoading = action?.payload;
}

function setIsFindProductsCardLoading(
  state: IOpenCartsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isFindProductsCardLoading = action?.payload;
}

function setIsCustomerCardLoading(
  state: IOpenCartsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isCustomerCardLoading = action?.payload;
}

function setIsSelectEntityCardLoading(
  state: IOpenCartsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isSelectEntityCardLoading = action?.payload;
}

function setIsCreateOrderCardLoading(
  state: IOpenCartsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isCreateOrderCardLoading = action?.payload;
}

function setIsVariantHistoryCardLoading(
  state: IOpenCartsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isVariantHistoryCardLoading = action?.payload;
}

function setIsOpenCartsGridLoading(
  state: IOpenCartsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isOpenCartsGridLoading = action?.payload;
}

function setIsCartContentGridLoading(
  state: IOpenCartsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isCartContentGridLoading = action?.payload;
}

function setIsFindProductsGridLoading(
  state: IOpenCartsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isFindProductsGridLoading = action?.payload;
}

function setIsReplaceVariantGridLoading(
  state: IOpenCartsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isReplaceVariantGridLoading = action?.payload;
}

function setIsCartsWithSpecificProductGridLoading(
  state: IOpenCartsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isCartsWithSpecificProductGridLoading = action?.payload;
}

function setIsCreateOrderGridLoading(
  state: IOpenCartsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isCreateOrderGridLoading = action?.payload;
}

function setIsVariantsHistoryGridLoading(
  state: IOpenCartsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isVariantsHistoryGridLoading = action?.payload;
}

function setIsImageUploaderLoading(
  state: IOpenCartsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isImageUploaderLoading = action?.payload;
}

function setIsSelectEntityGridLoading(
  state: IOpenCartsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isSelectEntityGridLoading = action?.payload;
}

//----------------------------------------------------- API
function refreshActiveCards(
  state: IOpenCartsPageSlice,
  action: PayloadAction<any[]>,
) {
  state.activeCards = action?.payload || state.activeCards;
}

function refreshOpenCartsGridRequestModel(
  state: IOpenCartsPageSlice,
  action: PayloadAction<GridRequestModel>,
) {
  state.openCartsGridRequestModel =
    action?.payload || state.openCartsGridRequestModel;
}

function refreshCustomersGridRequestModel(
  state: IOpenCartsPageSlice,
  action: PayloadAction<GridRequestModel>,
) {
  state.customersGridRequestModel =
    action?.payload || state.customersGridRequestModel;
}

function refreshVariantsGridRequestModel(
  state: IOrdersPageSlice,
  action: PayloadAction<GridRequestModel>,
) {
  state.variantsGridRequestModel =
    action?.payload || state.variantsGridRequestModel;
}

function refreshSelectedCustomer(
  state: IOpenCartsPageSlice,
  action: PayloadAction<CustomerModel>,
) {
  state.selectedCustomer = action?.payload || state.selectedCustomer;
}

function resetSelectedCustomer(state: IOpenCartsPageSlice) {
  state.selectedCustomer = null;
}

function refreshManagedCustomer(
  state: IOpenCartsPageSlice,
  action: PayloadAction<CustomerModel>,
) {
  state.managedCustomer = action?.payload || state.managedCustomer;
}

function resetManagedCustomer(state: IOpenCartsPageSlice) {
  state.managedCustomer = null;
}

function refreshBrands(
  state: IOpenCartsPageSlice,
  action: PayloadAction<BrandModel[]>,
) {
  state.brands = action?.payload || state.brands;
}

function refreshCategories(
  state: IOpenCartsPageSlice,
  action: PayloadAction<CategoryModel[]>,
) {
  state.categories = action?.payload || state.categories;
}

function refreshSizesForFilter(
  state: IOpenCartsPageSlice,
  action: PayloadAction<TraitOptionModel[]>,
) {
  state.sizesForFilter = action?.payload || state.sizesForFilter;
}

function refreshColorsForFilter(
  state: IOpenCartsPageSlice,
  action: PayloadAction<TraitOptionModel[]>,
) {
  state.colorsForFilter = action?.payload || state.colorsForFilter;
}

function refreshManagedCart(
  state: IOpenCartsPageSlice,
  action: PayloadAction<CartModel>,
) {
  state.managedCart = action?.payload || state.managedCart;
}

function resetManagedCart(state: IOpenCartsPageSlice) {
  state.managedCart = undefined;
}

function refreshSelectedVariant(
  state: IOpenCartsPageSlice,
  action: PayloadAction<VariantModel>,
) {
  state.selectedVariant = action?.payload || state.selectedVariant;
}

function resetSelectedVariant(state: IOpenCartsPageSlice) {
  state.selectedVariant = undefined;
}

function refreshVariantsList(
  state: IOpenCartsPageSlice,
  action: PayloadAction<VariantModel[]>,
) {
  state.variantsList = action?.payload || state.variantsList;
}

function refreshSelectedOrder(
  state: IOpenCartsPageSlice,
  action: PayloadAction<OrderModel>,
) {
  state.selectedOrder = action?.payload || state.selectedOrder;
}

function resetSelectedOrder(state: IOpenCartsPageSlice) {
  state.selectedOrder = undefined;
}

function refreshVariantHistory(
  state: IOpenCartsPageSlice,
  action: PayloadAction<VariantHistoryModel[]>,
) {
  state.variantHistory = action?.payload || state.variantHistory;
}

function refreshCartsWithSpecificProduct(
  state: IOpenCartsPageSlice,
  action: PayloadAction<CartModel[]>,
) {
  state.cartsWithSpecificProduct =
    action?.payload || state.cartsWithSpecificProduct;
}

const OpenCartsPageSlice = createSlice({
  name: StoreSliceEnum.OPEN_CARTS,
  initialState,
  reducers: {
    setIsLoading,
    setIsOpenCartsCardLoading,
    setIsFindProductsCardLoading,
    setIsCustomerCardLoading,
    setIsSelectEntityCardLoading,
    setIsCreateOrderCardLoading,
    setIsVariantHistoryCardLoading,
    setIsOpenCartsGridLoading,
    setIsCartContentGridLoading,
    setIsFindProductsGridLoading,
    setIsReplaceVariantGridLoading,
    setIsCartsWithSpecificProductGridLoading,
    setIsCreateOrderGridLoading,
    setIsVariantsHistoryGridLoading,
    setIsImageUploaderLoading,
    setIsSelectEntityGridLoading,
    refreshActiveCards,
    refreshOpenCartsGridRequestModel,
    refreshCustomersGridRequestModel,
    refreshVariantsGridRequestModel,
    refreshSelectedCustomer,
    resetSelectedCustomer,
    refreshManagedCustomer,
    resetManagedCustomer,
    refreshBrands,
    refreshCategories,
    refreshSizesForFilter,
    refreshColorsForFilter,
    refreshManagedCart,
    resetManagedCart,
    refreshSelectedVariant,
    resetSelectedVariant,
    refreshVariantsList,
    refreshSelectedOrder,
    resetSelectedOrder,
    refreshVariantHistory,
    refreshCartsWithSpecificProduct,
  },
});

export const OpenCartsPageSliceActions = OpenCartsPageSlice.actions;
export default OpenCartsPageSlice;
