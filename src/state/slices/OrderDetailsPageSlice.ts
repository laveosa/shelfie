import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IOrderDetailsPageSlice } from "@/const/interfaces/store-slices/IOrderDetailsPageSlice.ts";
import { DiscountModel } from "@/const/models/DiscountModel.ts";

const initialState: IOrderDetailsPageSlice = {
  isOrderConfigurationCardLoading: false,
  isSelectEntityCardLoading: false,
  isSelectDiscountCardLoading: false,
  isSelectEntityGridLoading: false,
  isSelectDiscountGridLoading: false,
  activeCards: [],
  discountsList: [],
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

const OrderDetailsPageSlice = createSlice({
  name: StoreSliceEnum.ORDER_DETAILS,
  initialState,
  reducers: {
    setIsOrderConfigurationCardLoading,
    setIsSelectEntityCardLoading,
    setIsSelectDiscountCardLoading,
    setIsSelectEntityGridLoading,
    setIsSelectDiscountGridLoading,
    refreshActiveCards,
    refreshDiscountsList,
  },
});

export const OrderDetailsPageSliceActions = OrderDetailsPageSlice.actions;
export default OrderDetailsPageSlice;
