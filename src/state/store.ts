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
import AuthPageSlice from "@/state/slices/AuthPageSlice.ts";
import { ProductsApiService } from "@/utils/services/api/ProductsApiService.ts";
import { AuthApiService } from "@/utils/services/api/AuthApiService.ts";
import { DictionaryApiService } from "@/utils/services/api/DictionaryApiService.ts";
import { UsersApiService } from "@/utils/services/api/UsersApiService.ts";
import { AssetsApiService } from "@/utils/services/api/AssetsApiService.ts";

export const store = configureStore({
  reducer: {
    [StoreSliceEnum.APP]: AppSlice.reducer,
    [StoreSliceEnum.AUTH]: AuthPageSlice.reducer,
    [StoreSliceEnum.DASHBOARD]: DashboardPageSlice.reducer,
    [StoreSliceEnum.MESSENGER]: MessengerPageSlice.reducer,
    [StoreSliceEnum.ORDERS]: OrdersPageSlice.reducer,
    [StoreSliceEnum.PRODUCTS]: ProductsPageSlice.reducer,
    [StoreSliceEnum.PROFILE]: ProfilePageSlice.reducer,
    [StoreSliceEnum.SETTINGS]: SettingsPageSlice.reducer,
    [StoreSliceEnum.SUPPORT]: SupportPageSlice.reducer,
    [StoreSliceEnum.TRANSMISSIONS]: TransmissionsPageSlice.reducer,
    [StoreSliceEnum.USERS]: UsersPageSlice.reducer,
    [AuthApiService.reducerPath]: AuthApiService.reducer,
    [ProductsApiService.reducerPath]: ProductsApiService.reducer,
    [DictionaryApiService.reducerPath]: DictionaryApiService.reducer,
    [UsersApiService.reducerPath]: UsersApiService.reducer,
    [AssetsApiService.reducerPath]: AssetsApiService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(AuthApiService.middleware)
      .concat(ProductsApiService.middleware)
      .concat(DictionaryApiService.middleware)
      .concat(UsersApiService.middleware)
      .concat(AssetsApiService.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
