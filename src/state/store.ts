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
import ProductBasicDataPageSlice from "@/state/slices/ProductBasicDataPageSlice.ts";
import ProductGalleryPageSlice from "@/state/slices/ProductGalleryPageSlice.ts";
import ManageVariantsPageSlice from "@/state/slices/ManageVariantsPageSlice.ts";
import MessengerApiService from "@/utils/services/api/MessengerApiService.ts";
import AttributesPageSlice from "@/state/slices/AttributesPageSlice.ts";
import SizeChartPageSlice from "@/state/slices/SizeChartPageSlice.ts";
import DialogSlice from "@/state/slices/DialogSlice.ts";
import PurchaseProductsPageSlice from "@/state/slices/PurchaseProductsPageSlice.ts";
import MarginsPageSlice from "@/state/slices/MarginsPageSlice.ts";
import InvoicesPageSlice from "@/state/slices/InvoicesPageSlice.ts";
import SupplierPageSlice from "@/state/slices/SupplierPageSlice.ts";
import { OrdersApiService } from "@/utils/services/api/OrdersApiService.ts";
import { ProductsApiService } from "@/utils/services/api/ProductsApiService.ts";
import { AuthApiService } from "@/utils/services/api/AuthApiService.ts";
import { DictionaryApiService } from "@/utils/services/api/DictionaryApiService.ts";
import { UsersApiService } from "@/utils/services/api/UsersApiService.ts";
import { AssetsApiService } from "@/utils/services/api/AssetsApiService.ts";
import { FacebookApiService } from "@/utils/services/api/FacebookApiService.ts";
import { PurchasesApiService } from "@/utils/services/api/PurchasesApiService.ts";
import { SuppliersApiService } from "@/utils/services/api/SuppliersApiService.ts";
import OpenCartsPageSlice from "@/state/slices/OpenCartsPageSlice.ts";
import OrderDetailsPageSlice from "@/state/slices/OrderDetailsPageSlice.ts";
import OrderPaymentPageSlice from "@/state/slices/OrderPaymentPageSlice.ts";
import OrderProductsPageSlice from "@/state/slices/OrderProductsPageSlice.ts";
import PaymentsPageSlice from "@/state/slices/PaymentsPageSlice.ts";
import ReturnsPageSlice from "@/state/slices/ReturnsPageSlice.ts";
import ShipmentsPageSlice from "@/state/slices/ShipmentsPageSlice.ts";
import OrderShipmentPageSlice from "@/state/slices/OrderShipmentPageSlice.ts";
import ShipmentDetailsPageSlice from "@/state/slices/ShipmentDetailsPageSlice.ts";
import { CompaniesApiService } from "@/utils/services/api/CompaniesApiService.ts";

export const store = configureStore({
  reducer: {
    [StoreSliceEnum.APP]: AppSlice.reducer,
    [StoreSliceEnum.DIALOG]: DialogSlice.reducer,
    [StoreSliceEnum.AUTH]: AuthPageSlice.reducer,
    [StoreSliceEnum.DASHBOARD]: DashboardPageSlice.reducer,
    [StoreSliceEnum.MESSENGER]: MessengerPageSlice.reducer,
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
    [StoreSliceEnum.ORDERS]: OrdersPageSlice.reducer,
    [StoreSliceEnum.OPEN_CARTS]: OpenCartsPageSlice.reducer,
    [StoreSliceEnum.RETURNS]: ReturnsPageSlice.reducer,
    [StoreSliceEnum.SHIPMENTS]: ShipmentsPageSlice.reducer,
    [StoreSliceEnum.PAYMENTS]: PaymentsPageSlice.reducer,
    [StoreSliceEnum.ORDER_DETAILS]: OrderDetailsPageSlice.reducer,
    [StoreSliceEnum.ORDER_PRODUCTS]: OrderProductsPageSlice.reducer,
    [StoreSliceEnum.ORDER_SHIPMENT]: OrderShipmentPageSlice.reducer,
    [StoreSliceEnum.ORDER_PAYMENT]: OrderPaymentPageSlice.reducer,
    [StoreSliceEnum.SHIPMENT_DETAILS]: ShipmentDetailsPageSlice.reducer,
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
    [CompaniesApiService.reducerPath]: CompaniesApiService.reducer,
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
      .concat(OrdersApiService.middleware)
      .concat(CompaniesApiService.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
