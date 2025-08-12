import { createSlice } from "@reduxjs/toolkit";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IPaymentsPageSlice } from "@/const/interfaces/store-slices/IPaymentsPageSlice.ts";

const initialState: IPaymentsPageSlice = {};
const PaymentsPageSlice = createSlice({
  name: StoreSliceEnum.PAYMENTS,
  initialState,
  reducers: {},
});

export const PaymentsPageSliceActions = PaymentsPageSlice.actions;
export default PaymentsPageSlice;
