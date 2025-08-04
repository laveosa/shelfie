import { createSlice } from "@reduxjs/toolkit";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IOrderProductsPageSlice } from "@/const/interfaces/store-slices/IOrderProductsPageSlice.ts";

const initialState: IOrderProductsPageSlice = {};
const OrderProductsPageSlice = createSlice({
  name: StoreSliceEnum.ORDER_PRODUCTS,
  initialState,
  reducers: {},
});

export const OrderProductsPageSliceActions = OrderProductsPageSlice.actions;
export default OrderProductsPageSlice;
