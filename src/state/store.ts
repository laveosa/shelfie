import { configureStore } from "@reduxjs/toolkit";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import AppSlice from "@/state/slices/AppSlice.ts";
import DashboardPageSlice from "@/state/slices/DashboardPageSlice.ts";
import OrdersPageSlice from "@/state/slices/OrdersPageSlice.ts";
import MessengerPageSlice from "@/state/slices/MessengerPageSlice.ts";
import ProfilePageSlice from "@/state/slices/ProfilePageSlice.ts";
import SettingsPageSlice from "@/state/slices/SettingsPageSlice.ts";
import SupportPageSlice from "@/state/slices/SupportPageSlice.ts";
import TransmissionsPageSlice from "@/state/slices/TransmissionsPageSlice.ts";
import UsersPageSlice from "@/state/slices/UsersPAgeSlice.ts";
import ProductsPageSlice from "@/state/slices/ProductsPageSlice.ts";

export const store = configureStore({
  reducer: {
    [StoreSliceEnum.APP]: AppSlice.reducer,
    [StoreSliceEnum.DASHBOARD]: DashboardPageSlice.reducer,
    [StoreSliceEnum.MESSENGER]: MessengerPageSlice.reducer,
    [StoreSliceEnum.ORDERS]: OrdersPageSlice.reducer,
    [StoreSliceEnum.PRODUCTS]: ProductsPageSlice.reducer,
    [StoreSliceEnum.PROFILE]: ProfilePageSlice.reducer,
    [StoreSliceEnum.SETTINGS]: SettingsPageSlice.reducer,
    [StoreSliceEnum.SUPPORT]: SupportPageSlice.reducer,
    [StoreSliceEnum.TRANSMISSIONS]: TransmissionsPageSlice.reducer,
    [StoreSliceEnum.USERS]: UsersPageSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
