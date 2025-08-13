import { createSlice } from "@reduxjs/toolkit";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IOrderPaymentPageSlice } from "@/const/interfaces/store-slices/IOrderPaymentPageSlice.ts";

const initialState: IOrderPaymentPageSlice = {};
const OrderPaymentPageSlice = createSlice({
  name: StoreSliceEnum.ORDER_PAYMENT,
  initialState,
  reducers: {},
});

export const OrderPaymentPageSliceActions = OrderPaymentPageSlice.actions;
export default OrderPaymentPageSlice;
