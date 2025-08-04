import { createSlice } from "@reduxjs/toolkit";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IOrderShipmentPageSlice } from "@/const/interfaces/store-slices/IOrderShipmentPageSlice.ts";

const initialState: IOrderShipmentPageSlice = {};
const OrderShipmentPageSlice = createSlice({
  name: StoreSliceEnum.ORDER_SHIPMENT,
  initialState,
  reducers: {},
});

export const OrderShipmentPageSliceActions = OrderShipmentPageSlice.actions;
export default OrderShipmentPageSlice;
