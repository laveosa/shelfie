import { createSlice } from "@reduxjs/toolkit";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IOrderDetailsPageSlice } from "@/const/interfaces/store-slices/IOrderDetailsPageSlice.ts";

const initialState: IOrderDetailsPageSlice = {};
const OrderDetailsPageSlice = createSlice({
  name: StoreSliceEnum.ORDER_DETAILS,
  initialState,
  reducers: {},
});

export const OrderDetailsPageSliceActions = OrderDetailsPageSlice.actions;
export default OrderDetailsPageSlice;
