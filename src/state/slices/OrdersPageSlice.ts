import { createSlice } from "@reduxjs/toolkit";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IOrdersPageSlice } from "@/const/interfaces/store-slices/IOrdersPageSlice.ts";

const initialState: IOrdersPageSlice = {};

const OrdersPageSlice = createSlice({
  name: StoreSliceEnum.ORDERS,
  initialState,
  reducers: {},
});

export const OrdersPageSliceActions = OrdersPageSlice.actions;
export default OrdersPageSlice;
