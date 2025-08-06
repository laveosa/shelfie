import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IOrderDetailsPageSlice } from "@/const/interfaces/store-slices/IOrderDetailsPageSlice.ts";

const initialState: IOrderDetailsPageSlice = {
  isOrderConfigurationCardLoading: false,
  isSelectEntityCardLoading: false,
  isSelectEntityGridLoading: false,
  activeCards: [],
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

function setIsSelectEntityGridLoading(
  state: IOrderDetailsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isSelectEntityGridLoading = action?.payload;
}

//----------------------------------------------------- API

function refreshActiveCards(
  state: IOrderDetailsPageSlice,
  action: PayloadAction<any[]>,
) {
  state.activeCards = action?.payload || state.activeCards;
}

const OrderDetailsPageSlice = createSlice({
  name: StoreSliceEnum.ORDER_DETAILS,
  initialState,
  reducers: {
    setIsOrderConfigurationCardLoading,
    setIsSelectEntityCardLoading,
    setIsSelectEntityGridLoading,
    refreshActiveCards,
  },
});

export const OrderDetailsPageSliceActions = OrderDetailsPageSlice.actions;
export default OrderDetailsPageSlice;
