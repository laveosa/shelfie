import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IOrderProductsPageSlice } from "@/const/interfaces/store-slices/IOrderProductsPageSlice.ts";
import { IOrderDetailsPageSlice } from "@/const/interfaces/store-slices/IOrderDetailsPageSlice.ts";

const initialState: IOrderProductsPageSlice = {
  isProductsInOrderCardLoading: false,
  isFindProductsCardLoading: false,
  isProductsInOrderGridLoading: false,
  isFindProductsGridLoading: false,
  activeCards: [],
};

//----------------------------------------------------- LOADERS

function setIsProductsInOrderCardLoading(
  state: IOrderProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isProductsInOrderCardLoading = action?.payload;
}

function setIsFindProductsCardLoading(
  state: IOrderProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isFindProductsCardLoading = action?.payload;
}

function setIsProductsInOrderGridLoading(
  state: IOrderProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isProductsInOrderGridLoading = action?.payload;
}

function setIsFindProductsGridLoading(
  state: IOrderProductsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isFindProductsGridLoading = action?.payload;
}

//----------------------------------------------------- API

function refreshActiveCards(
  state: IOrderDetailsPageSlice,
  action: PayloadAction<any[]>,
) {
  state.activeCards = action?.payload || state.activeCards;
}

const OrderProductsPageSlice = createSlice({
  name: StoreSliceEnum.ORDER_PRODUCTS,
  initialState,
  reducers: {
    setIsProductsInOrderCardLoading,
    setIsFindProductsCardLoading,
    setIsProductsInOrderGridLoading,
    setIsFindProductsGridLoading,
    refreshActiveCards,
  },
});

export const OrderProductsPageSliceActions = OrderProductsPageSlice.actions;
export default OrderProductsPageSlice;
