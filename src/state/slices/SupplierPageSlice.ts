import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { ISupplierPageSlice } from "@/const/interfaces/store-slices/ISupplierPageSlice.ts";
import { PurchaseModel } from "@/const/models/PurchaseModel.ts";
import { SupplierModel } from "@/const/models/SupplierModel.ts";

const initialState: ISupplierPageSlice = {
  isLoading: false,
  isProductMenuCardLoading: false,
  isSupplierCardLoading: false,
  isSelectSupplierCardLoading: false,
  isSupplierConfigurationCardLoading: false,
  isSupplierPhotosGridLoading: false,
  isSuppliersGridLoading: false,
  activeCards: [],
  purchase: null,
  suppliers: null,
  suppliersWithLocations: null,
  selectedSupplier: null,
  managedSupplier: null,
};

//----------------------------------------------------- LOADERS

function setIsLoading(
  state: ISupplierPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isLoading = action?.payload;
}

function setIsProductMenuCardLoading(
  state: ISupplierPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isProductMenuCardLoading = action?.payload;
}

function setIsSupplierCardLoading(
  state: ISupplierPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isSupplierCardLoading = action?.payload;
}

function setIsSelectSupplierCardLoading(
  state: ISupplierPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isSelectSupplierCardLoading = action?.payload;
}

function setIsSupplierConfigurationCardLoading(
  state: ISupplierPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isSupplierConfigurationCardLoading = action?.payload;
}

function setIsSupplierPhotosGridLoading(
  state: ISupplierPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isSupplierPhotosGridLoading = action?.payload;
}

function setIsSuppliersGridLoading(
  state: ISupplierPageSlice,
  action: PayloadAction<boolean>,
) {
  state.isSuppliersGridLoading = action?.payload;
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

function refreshSuppliersWithLocations(
  state: ISupplierPageSlice,
  action: PayloadAction<SupplierModel[]>,
) {
  state.suppliersWithLocations =
    action?.payload || state.suppliersWithLocations;
}

function refreshSelectedSupplier(
  state: ISupplierPageSlice,
  action: PayloadAction<SupplierModel>,
) {
  state.selectedSupplier = action?.payload || state.selectedSupplier;
}

function resetSelectedSupplier(state: ISupplierPageSlice) {
  state.selectedSupplier = null;
}

function refreshManagedSupplier(
  state: ISupplierPageSlice,
  action: PayloadAction<SupplierModel>,
) {
  state.managedSupplier = action?.payload || state.managedSupplier;
}

function resetManagedSupplier(state: ISupplierPageSlice) {
  state.managedSupplier = null;
}

const SupplierPageSlice = createSlice({
  name: StoreSliceEnum.SUPPLIER,
  initialState,
  reducers: {
    setIsLoading,
    setIsProductMenuCardLoading,
    setIsSupplierCardLoading,
    setIsSelectSupplierCardLoading,
    setIsSupplierConfigurationCardLoading,
    setIsSupplierPhotosGridLoading,
    setIsSuppliersGridLoading,
    refreshActiveCards,
    refreshPurchase,
    refreshSuppliers,
    refreshSuppliersWithLocations,
    refreshSelectedSupplier,
    resetSelectedSupplier,
    refreshManagedSupplier,
    resetManagedSupplier,
  },
});

export const SupplierPageSliceActions = SupplierPageSlice.actions;
export default SupplierPageSlice;
