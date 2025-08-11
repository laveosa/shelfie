import { createApi } from "@reduxjs/toolkit/query/react";

import { ApiConfigurationService } from "@/utils/services/api/ApiConfigurationService.ts";
import { ApiServiceNameEnum } from "@/const/enums/ApiServiceNameEnum.ts";
import { ApiUrlEnum } from "@/const/enums/ApiUrlEnum.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";

const apiConfig = new ApiConfigurationService(ApiUrlEnum.ORDER_BASE_URL);

export const OrderApiService = createApi({
  reducerPath: ApiServiceNameEnum.ORDER,
  baseQuery: apiConfig.baseQueryWithInterceptors,
  tagTypes: [ApiServiceNameEnum.ORDER],
  endpoints: (builder) => ({
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
  }),
});

export const { endpoints, ...OrderApiHooks } = OrderApiService;
export default OrderApiHooks;
