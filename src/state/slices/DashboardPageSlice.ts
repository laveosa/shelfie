import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IDashboardPageSlice } from "@/const/interfaces/store-slices/IDashboardPageSlice.ts";
import { BrandModel } from "@/const/models/BrandModel.ts";
import { CategoryModel } from "@/const/models/CategoryModel.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import { CustomerModel } from "@/const/models/CustomerModel.ts";

const initialState: IDashboardPageSlice = {
  brands: [],
  categories: [],
  customers: [],
  dashboardGridRequestModel: {},
};

function refreshBrands(
  state: IDashboardPageSlice,
  action: PayloadAction<BrandModel[]>,
) {
  state.brands = action?.payload || state.brands;
}

function refreshCategories(
  state: IDashboardPageSlice,
  action: PayloadAction<CategoryModel[]>,
) {
  state.categories = action?.payload || state.categories;
}

function refreshCustomers(
  state: IDashboardPageSlice,
  action: PayloadAction<CustomerModel[]>,
) {
  state.customers = action?.payload || state.customers;
}

function refreshDashboardGridRequestModel(
  state: IDashboardPageSlice,
  action: PayloadAction<GridRequestModel>,
) {
  state.dashboardGridRequestModel =
    action?.payload || state.dashboardGridRequestModel;
}

const DashboardPageSlice = createSlice({
  name: StoreSliceEnum.DASHBOARD,
  initialState,
  reducers: {
    refreshBrands,
    refreshCategories,
    refreshCustomers,
    refreshDashboardGridRequestModel,
  },
});

export const DashboardPageSliceActions = DashboardPageSlice.actions;
export default DashboardPageSlice;
