import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { ISupplierPage } from "@/const/interfaces/store-slices/ISupplierPage.ts";
import { PurchaseModel } from "@/const/models/PurchaseModel.ts";

const initialState: ISupplierPage = {
  activeCards: [],
  purchase: null,
};

function refreshActiveCards(
  state: ISupplierPage,
  action: PayloadAction<any[]>,
) {
  state.activeCards = action?.payload || state.activeCards;
}

function refreshPurchase(
  state: ISupplierPage,
  action: PayloadAction<PurchaseModel>,
) {
  state.purchase = action?.payload || state.purchase;
}

const SupplierPageSlice = createSlice({
  name: StoreSliceEnum.SUPPLIER,
  initialState,
  reducers: {
    refreshActiveCards,
    refreshPurchase,
  },
});

export const SupplierPageSliceActions = SupplierPageSlice.actions;
export default SupplierPageSlice;
