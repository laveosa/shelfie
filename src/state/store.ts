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
import CustomersPageSlice from "@/state/slices/CustomersPageSlice";
import ProductsPageSlice from "@/state/slices/ProductsPageSlice.ts";
import AuthPageSlice from "@/state/slices/AuthPageSlice.ts";
import { ProductsApiService } from "@/utils/services/api/ProductsApiService.ts";
import { AuthApiService } from "@/utils/services/api/AuthApiService.ts";
import { DictionaryApiService } from "@/utils/services/api/DictionaryApiService.ts";
import { UsersApiService } from "@/utils/services/api/UsersApiService.ts";
import { AssetsApiService } from "@/utils/services/api/AssetsApiService.ts";
import ProductBasicDataPageSlice from "@/state/slices/ProductBasicDataPageSlice.ts";
import ProductGalleryPageSlice from "@/state/slices/ProductGalleryPageSlice.ts";
import ManageVariantsPageSlice from "@/state/slices/ManageVariantsPageSlice.ts";
import MessengerApiService from "@/utils/services/api/MessengerApiService.ts";
import { FacebookApiService } from "@/utils/services/api/FacebookApiService.ts";
import AttributesPageSlice from "@/state/slices/AttributesPageSlice.ts";
import SizeChartPageSlice from "@/state/slices/SizeChartPageSlice.ts";
import DialogSlice from "@/state/slices/DialogSlice.ts";
import { PurchasesApiService } from "@/utils/services/api/PurchasesApiService.ts";
import { SuppliersApiService } from "@/utils/services/api/SuppliersApiService.ts";
import PurchaseProductsPageSlice from "@/state/slices/PurchaseProductsPageSlice.ts";
import MarginsPageSlice from "@/state/slices/MarginsPageSlice.ts";
import InvoicesPageSlice from "@/state/slices/InvoicesPageSlice.ts";
import SupplierPageSlice from "@/state/slices/SupplierPageSlice.ts";
import { OrdersApiService } from "@/utils/services/api/OrdersApiService.ts";

export const store = configureStore({
  reducer: {
    [StoreSliceEnum.APP]: AppSlice.reducer,
    [StoreSliceEnum.DIALOG]: DialogSlice.reducer,
    [StoreSliceEnum.AUTH]: AuthPageSlice.reducer,
    [StoreSliceEnum.DASHBOARD]: DashboardPageSlice.reducer,
    [StoreSliceEnum.MESSENGER]: MessengerPageSlice.reducer,
    [StoreSliceEnum.ORDERS]: OrdersPageSlice.reducer,
    [StoreSliceEnum.PRODUCTS]: ProductsPageSlice.reducer,
    [StoreSliceEnum.PRODUCT_BASIC_DATA]: ProductBasicDataPageSlice.reducer,
    [StoreSliceEnum.PRODUCT_GALLERY]: ProductGalleryPageSlice.reducer,
    [StoreSliceEnum.MANAGE_VARIANTS]: ManageVariantsPageSlice.reducer,
    [StoreSliceEnum.ATTRIBUTES]: AttributesPageSlice.reducer,
    [StoreSliceEnum.SIZE_CHART]: SizeChartPageSlice.reducer,
    [StoreSliceEnum.SUPPLIER]: SupplierPageSlice.reducer,
    [StoreSliceEnum.PURCHASE_PRODUCTS]: PurchaseProductsPageSlice.reducer,
    [StoreSliceEnum.MARGINS]: MarginsPageSlice.reducer,
    [StoreSliceEnum.INVOICES]: InvoicesPageSlice.reducer,
    [StoreSliceEnum.PROFILE]: ProfilePageSlice.reducer,
    [StoreSliceEnum.SETTINGS]: SettingsPageSlice.reducer,
    [StoreSliceEnum.SUPPORT]: SupportPageSlice.reducer,
    [StoreSliceEnum.TRANSMISSIONS]: TransmissionsPageSlice.reducer,
    [StoreSliceEnum.CUSTOMERS]: CustomersPageSlice.reducer,
    [AuthApiService.reducerPath]: AuthApiService.reducer,
    [ProductsApiService.reducerPath]: ProductsApiService.reducer,
    [PurchasesApiService.reducerPath]: PurchasesApiService.reducer,
    [SuppliersApiService.reducerPath]: SuppliersApiService.reducer,
    [DictionaryApiService.reducerPath]: DictionaryApiService.reducer,
    [UsersApiService.reducerPath]: UsersApiService.reducer,
    [AssetsApiService.reducerPath]: AssetsApiService.reducer,
    [MessengerApiService.reducerPath]: MessengerApiService.reducer,
    [FacebookApiService.reducerPath]: FacebookApiService.reducer,
    [OrdersApiService.reducerPath]: OrdersApiService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(AuthApiService.middleware)
      .concat(ProductsApiService.middleware)
      .concat(PurchasesApiService.middleware)
      .concat(SuppliersApiService.middleware)
      .concat(DictionaryApiService.middleware)
      .concat(UsersApiService.middleware)
      .concat(AssetsApiService.middleware)
      .concat(MessengerApiService.middleware)
      .concat(FacebookApiService.middleware)
      .concat(OrdersApiService.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
