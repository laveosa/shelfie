import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IOrderDetailsPageSlice } from "@/const/interfaces/store-slices/IOrderDetailsPageSlice.ts";
import { DiscountModel } from "@/const/models/DiscountModel.ts";
import { CustomerModel } from "@/const/models/CustomerModel.ts";

const initialState: IOrderDetailsPageSlice = {
  isOrderConfigurationCardLoading: false,
  isSelectEntityCardLoading: false,
  isSelectDiscountCardLoading: false,
  isSelectEntityGridLoading: false,
  isSelectDiscountGridLoading: false,
  isCustomerCardLoading: false,
  activeCards: [],
  discountsList: [],
  selectedCustomer: null,
};

//----------------------------------------------------- LOADERS

function setIsOrderConfigurationCardLoading(
  state: IOrderDetailsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isOrderConfigurationCardLoading = action?.payload;
}

function setIsSelectEntityCardLoading(
  state: IOrderDetailsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isSelectEntityCardLoading = action?.payload;
}

function setIsSelectDiscountCardLoading(
  state: IOrderDetailsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isSelectDiscountCardLoading = action?.payload;
}

function setIsSelectEntityGridLoading(
  state: IOrderDetailsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isSelectEntityGridLoading = action?.payload;
}

function setIsSelectDiscountGridLoading(
  state: IOrderDetailsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isSelectDiscountGridLoading = action?.payload;
}

function setIsCustomerCardLoading(
  state: IOrderDetailsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isCustomerCardLoading = action?.payload;
}

//----------------------------------------------------- API

function refreshActiveCards(
  state: IOrderDetailsPageSlice,
  action: PayloadAction<any[]>,
) {
  state.activeCards = action?.payload || state.activeCards;
}

function refreshDiscountsList(
  state: IOrderDetailsPageSlice,
  action: PayloadAction<DiscountModel[]>,
) {
  state.discountsList = action?.payload || state.discountsList;
}

function refreshSelectedCustomer(
  state: IOrderDetailsPageSlice,
  action: PayloadAction<CustomerModel>,
) {
  state.selectedCustomer = action?.payload || state.selectedCustomer;
}

function resetSelectedCustomer(state: IOrderDetailsPageSlice) {
  state.selectedCustomer = null;
}

const OrderDetailsPageSlice = createSlice({
  name: StoreSliceEnum.ORDER_DETAILS,
  initialState,
  reducers: {
    setIsOrderConfigurationCardLoading,
    setIsSelectEntityCardLoading,
    setIsSelectDiscountCardLoading,
    setIsSelectEntityGridLoading,
    setIsSelectDiscountGridLoading,
    setIsCustomerCardLoading,
    refreshActiveCards,
    refreshDiscountsList,
    refreshSelectedCustomer,
    resetSelectedCustomer,
  },
});

export const OrderDetailsPageSliceActions = OrderDetailsPageSlice.actions;
export default OrderDetailsPageSlice;
