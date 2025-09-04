import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IShipmentDetailsPageSlice } from "@/const/interfaces/store-slices/IShipmentDetailsPageSlice.ts";

const initialState: IShipmentDetailsPageSlice = {
  isShipmentConfigurationCardLoading: false,
  activeCards: [],
};

//----------------------------------------------------- LOADERS

function setIsShipmentConfigurationCardLoading(
  state: IShipmentDetailsPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isShipmentConfigurationCardLoading = action?.payload;
}

//----------------------------------------------------- API

function refreshActiveCards(
  state: IShipmentDetailsPageSlice,
  action: PayloadAction<any[]>,
) {
  state.activeCards = action?.payload || state.activeCards;
}

const ShipmentDetailsPageSlice = createSlice({
  name: StoreSliceEnum.SHIPMENT_DETAILS,
  initialState,
  reducers: {
    setIsShipmentConfigurationCardLoading,
    refreshActiveCards,
  },
});

export const ShipmentDetailsPageSliceActions = ShipmentDetailsPageSlice.actions;
export default ShipmentDetailsPageSlice;
