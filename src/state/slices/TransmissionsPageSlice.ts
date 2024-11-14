import { createSlice } from "@reduxjs/toolkit";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { ITransmissionsPageSlice } from "@/const/interfaces/store-slices/ITransmissionsPageSlice.ts";

const initialState: ITransmissionsPageSlice = {};

const TransmissionsPageSlice = createSlice({
  name: StoreSliceEnum.TRANSMISSIONS,
  initialState,
  reducers: {},
});

export const TransmissionsPageSliceActions = TransmissionsPageSlice.actions;
export default TransmissionsPageSlice;
