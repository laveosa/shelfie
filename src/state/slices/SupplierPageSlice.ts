import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { ISupplierPageSlice } from "@/const/interfaces/store-slices/ISupplierPageSlice.ts";
import { PurchaseModel } from "@/const/models/PurchaseModel.ts";
import { SupplierModel } from "@/const/models/SupplierModel.ts";

const initialState: ISupplierPageSlice = {
  activeCards: [],
  purchase: null,
  suppliers: null,
  selectedSupplier: null,
};

function refreshActiveCards(
  state: ISupplierPageSlice,
  action: PayloadAction<any[]>,
) {
  state.activeCards = action?.payload || state.activeCards;
}

function refreshPurchase(
  state: ISupplierPageSlice,
  action: PayloadAction<PurchaseModel>,
) {
  state.purchase = action?.payload || state.purchase;
}

function refreshSuppliers(
  state: ISupplierPageSlice,
  action: PayloadAction<SupplierModel[]>,
) {
  state.suppliers = action?.payload || state.suppliers;
}

function refreshSelectedSupplier(
  state: ISupplierPageSlice,
  action: PayloadAction<SupplierModel>,
) {
  state.selectedSupplier = action?.payload || state.selectedSupplier;
}

const SupplierPageSlice = createSlice({
  name: StoreSliceEnum.SUPPLIER,
  initialState,
  reducers: {
    refreshActiveCards,
    refreshPurchase,
    refreshSuppliers,
    refreshSelectedSupplier,
  },
});

export const SupplierPageSliceActions = SupplierPageSlice.actions;
export default SupplierPageSlice;
