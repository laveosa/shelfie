import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { ISupplierPageSlice } from "@/const/interfaces/store-slices/ISupplierPageSlice.ts";
import { PurchaseModel } from "@/const/models/PurchaseModel.ts";
import { SupplierModel } from "@/const/models/SupplierModel.ts";

const initialState: ISupplierPageSlice = {
  isLoading: false,
  isSupplierCardLoading: false,
  isSelectSupplierCard: false,
  isCreateSupplierCard: false,
  activeCards: [],
  purchase: null,
  suppliers: null,
  selectedSupplier: null,
};

//----------------------------------------------------- LOADERS

function setIsLoading(
  state: ISupplierPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isLoading = action?.payload;
}

function setIsSupplierCardLoading(
  state: ISupplierPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isSupplierCardLoading = action?.payload;
}

function setIsSelectSupplierCard(
  state: ISupplierPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isSelectSupplierCard = action?.payload;
}

function setIsCreateSupplierCard(
  state: ISupplierPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isCreateSupplierCard = action?.payload;
}

//----------------------------------------------------- API
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
    setIsLoading,
    setIsSupplierCardLoading,
    setIsSelectSupplierCard,
    setIsCreateSupplierCard,
    refreshActiveCards,
    refreshPurchase,
    refreshSuppliers,
    refreshSelectedSupplier,
  },
});

export const SupplierPageSliceActions = SupplierPageSlice.actions;
export default SupplierPageSlice;
