import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiServiceNameEnum } from "@/const/enums/ApiServiceNameEnum.ts";
import { ApiUrlEnum } from "@/const/enums/ApiUrlEnum.ts";
import { ApiConfigurationService } from "@/utils/services/api/ApiConfigurationService.ts";
import { GridModel } from "@/const/models/GridModel.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import { CustomerModel } from "@/const/models/CustomerModel";
import { CustomerRequestModel } from "@/const/models/CustomerRequestModel";
import { AddressModel } from "@/const/models/AddressModel";
import { AddressRequestModel } from "@/const/models/AddressRequestModel";
import { CustomerCounterModel } from "@/const/models/CustomerCounterModel";

const apiConfig = new ApiConfigurationService(ApiUrlEnum.ORDERS_BASE_URL);

export const OrdersApiService = createApi({
  reducerPath: ApiServiceNameEnum.ORDERS,
  baseQuery: apiConfig.baseQueryWithInterceptors,
  tagTypes: [ApiServiceNameEnum.ORDERS],
  endpoints: (builder) => ({
    getCustomersForGrid: apiConfig.createMutation<GridModel, GridRequestModel>(
      builder,
      {
        query: (model?: GridRequestModel) => ({
          url: `${ApiUrlEnum.CUSTOMERS}/list`,
          method: "POST",
          body: JSON.stringify(model),
        }),
      },
    ),
    getCustomerDetails: apiConfig.createQuery<CustomerModel, number>(builder, {
      query: (id: number) => ({
        url: `${ApiUrlEnum.CUSTOMERS}/${id}`,
      }),
    }),
    createCustomer: apiConfig.createMutation<any, CustomerRequestModel>(
      builder,
      {
        query: (model: CustomerRequestModel) => ({
          url: `${ApiUrlEnum.CUSTOMERS}`,
          method: "POST",
          body: JSON.stringify(model),
        }),
      },
    ),
    updateCustomer: apiConfig.createMutation<
      any,
      { id: number; model: CustomerRequestModel }
    >(builder, {
      query: ({ id, model }) => ({
        url: `${ApiUrlEnum.CUSTOMERS}/${id}`,
        method: "PATCH",
        body: JSON.stringify(model),
      }),
    }),
    deleteCustomer: apiConfig.createMutation<any, number>(builder, {
      query: (id: number) => ({
        url: `${ApiUrlEnum.CUSTOMERS}/${id}`,
        method: "DELETE",
      }),
    }),
    getCustomerAddressesForGrid: apiConfig.createMutation<
      GridModel,
      { model?: GridRequestModel; id: number }
    >(builder, {
      query: ({ model, id }) => ({
        url: `${ApiUrlEnum.CUSTOMERS}/${id}/delivery-addresses`,
        method: "POST",
        body: JSON.stringify(model),
      }),
    }),
    getCustomerAddressDetails: apiConfig.createQuery<AddressModel, number>(
      builder,
      {
        query: (id: number) => ({
          url: `${ApiUrlEnum.DELIVERY_ADDRESSES}/${id}`,
        }),
      },
    ),
    createCustomerAddress: apiConfig.createMutation<
      any,
      { id: number; model: AddressRequestModel }
    >(builder, {
      query: ({ id, model }) => ({
        url: `${ApiUrlEnum.CUSTOMERS}/${id}/delivery-addresses/create`,
        method: "POST",
        body: JSON.stringify(model),
      }),
    }),
    updateCustomerAddress: apiConfig.createMutation<
      any,
      { id: number; model: AddressRequestModel }
    >(builder, {
      query: ({ id, model }) => ({
        url: `${ApiUrlEnum.DELIVERY_ADDRESSES}/${id}`,
        method: "PATCH",
        body: JSON.stringify(model),
      }),
    }),
    deleteCustomerAddress: apiConfig.createMutation<any, number>(builder, {
      query: (id: number) => ({
        url: `${ApiUrlEnum.DELIVERY_ADDRESSES}/${id}`,
        method: "DELETE",
      }),
    }),
    getCustomerInfo: apiConfig.createQuery<CustomerCounterModel, number>(
      builder,
      {
        query: (id: number) => ({
          url: `${ApiUrlEnum.CUSTOMERS}/${id}/info`,
        }),
      },
    ),
    getListOfOrdersForGrid: apiConfig.createMutation<any, any>(builder, {
      query: (model?: any) => ({
        url: `${ApiUrlEnum.ORDERS}/list`,
        method: "POST",
        body: JSON.stringify(model),
      }),
    }),
    createOrder: apiConfig.createMutation<any, void>(builder, {
      query: () => ({
        url: `${ApiUrlEnum.ORDERS}`,
        method: "POST",
      }),
    }),
    deleteOrder: apiConfig.createMutation<void, number>(builder, {
      query: (orderId) => ({
        url: `${ApiUrlEnum.ORDERS}/${orderId}`,
        method: "DELETE",
      }),
    }),
    getOrderDetails: apiConfig.createQuery<number, void>(builder, {
      query: (orderId) => ({
        url: `${ApiUrlEnum.ORDERS}/${orderId}`,
      }),
    }),
    getListOfCustomersForGrid: apiConfig.createMutation<any, any>(builder, {
      query: (model?: any) => ({
        url: `${ApiUrlEnum.CUSTOMERS}/list`,
        method: "POST",
        body: JSON.stringify(model),
      }),
    }),
    assignCustomerToOrder: apiConfig.createMutation<void, any>(builder, {
      query: ({ orderId, customerId }) => ({
        url: `${ApiUrlEnum.ORDERS}/${orderId}/customer/${customerId}`,
        method: "PATCH",
      }),
    }),
    getListOfStockActionsForGrid: apiConfig.createMutation<
      any,
      { orderId: number; model: GridRequestModel }
    >(builder, {
      query: ({ orderId, model }) => ({
        url: `${ApiUrlEnum.ORDERS}/${orderId}/stock-actions`,
        method: "POST",
        body: JSON.stringify(model),
      }),
    }),
    addVariantsToOrder: apiConfig.createMutation<
      void,
      { orderId: number; model: any }
    >(builder, {
      query: ({ orderId, model }) => ({
        url: `${ApiUrlEnum.ORDERS}/${orderId}/variants`,
        method: "PATCH",
        body: JSON.stringify(model),
      }),
    }),
    updateStockActionInOrder: apiConfig.createMutation<
      void,
      { stockActionId: number; model: any }
    >(builder, {
      query: ({ stockActionId, model }) => ({
        url: `${ApiUrlEnum.ORDERS}${ApiUrlEnum.STOCK_ACTIONS}/${stockActionId}`,
        method: "PATCH",
        body: JSON.stringify(model),
      }),
    }),
    removeStockActionFromOrder: apiConfig.createMutation<void, number>(
      builder,
      {
        query: (stockActionId) => ({
          url: `${ApiUrlEnum.ORDERS}${ApiUrlEnum.STOCK_ACTIONS}/${stockActionId}`,
          method: "DELETE",
        }),
      },
    ),
    getDiscountsList: apiConfig.createQuery<void, void>(builder, {
      query: () => ({
        url: `${ApiUrlEnum.DISCOUNTS}/all`,
      }),
    }),
    createDiscount: apiConfig.createMutation<any, any>(builder, {
      query: (model) => ({
        url: `${ApiUrlEnum.DISCOUNTS}`,
        method: "POST",
        body: JSON.stringify(model),
      }),
    }),
    updateDiscount: apiConfig.createMutation<
      void,
      { discountId: number; model: any }
    >(builder, {
      query: ({ discountId, model }) => ({
        url: `${ApiUrlEnum.DISCOUNTS}/${discountId}`,
        method: "PATCH",
        body: JSON.stringify(model),
      }),
    }),
    getShipmentsListForForGrid: apiConfig.createMutation<any, GridRequestModel>(
      builder,
      {
        query: (model) => ({
          url: `${ApiUrlEnum.SHIPMENTS}/list`,
          method: "POST",
          body: JSON.stringify(model),
        }),
      },
    ),
    getShipmentDetails: apiConfig.createQuery<void, number>(builder, {
      query: (shipmentId) => ({
        url: `${ApiUrlEnum.SHIPMENTS}/${shipmentId}`,
      }),
    }),
    createShipment: apiConfig.createMutation<any, any>(builder, {
      query: (model) => ({
        url: `${ApiUrlEnum.SHIPMENTS}`,
        method: "POST",
        body: JSON.stringify(model),
      }),
    }),
  }),
});
export const { endpoints, ...OrdersApiHooks } = OrdersApiService;
export default OrdersApiHooks;
