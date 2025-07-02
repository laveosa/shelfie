import { createApi } from "@reduxjs/toolkit/query/react";

import { ApiServiceNameEnum } from "@/const/enums/ApiServiceNameEnum.ts";
import { ApiUrlEnum } from "@/const/enums/ApiUrlEnum.ts";
import { ApiConfigurationService } from "@/utils/services/api/ApiConfigurationService.ts";
import { GridModel } from "@/const/models/GridModel.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import { PurchaseModel } from "@/const/models/PurchaseModel.ts";

const apiConfig = new ApiConfigurationService(ApiUrlEnum.PURCHASES_BASE_URL);

export const PurchasesApiService = createApi({
  reducerPath: ApiServiceNameEnum.PURCHASES,
  baseQuery: apiConfig.baseQueryWithInterceptors,
  tagTypes: [ApiServiceNameEnum.PURCHASES],
  endpoints: (builder) => ({
    getListOfPurchasesForGrid: apiConfig.createMutation<
      GridModel,
      GridRequestModel
    >(builder, {
      query: (model?: GridRequestModel) => ({
        url: `${ApiUrlEnum.PURCHASES}/list`,
        method: "POST",
        body: JSON.stringify(model),
      }),
    }),
    getListOfPurchaseProductsForGrid: apiConfig.createMutation<
      GridModel,
      { id: number; model: GridRequestModel }
    >(builder, {
      query: ({ id, model }) => ({
        url: `${ApiUrlEnum.PURCHASES}/${id}${ApiUrlEnum.STOCK_ACTIONS}`,
        method: "POST",
        body: model,
      }),
    }),
    getPurchaseDetails: apiConfig.createQuery<PurchaseModel, number>(builder, {
      query: (id: number) => ({
        url: `${ApiUrlEnum.PURCHASES}/${id}`,
      }),
    }),
    createPurchaseForSupplier: apiConfig.createMutation<any, any>(builder, {
      query: (model?: any) => ({
        url: `${ApiUrlEnum.PURCHASES}`,
        method: "POST",
        body: JSON.stringify(model),
      }),
    }),
    updatePurchaseForSupplier: apiConfig.createMutation<
      any,
      {
        purchaseId: number;
        model: any;
      }
    >(builder, {
      query: ({ purchaseId, model }) => ({
        url: `${ApiUrlEnum.PURCHASES}/${purchaseId}`,
        method: "PATCH",
        body: JSON.stringify(model),
      }),
    }),
    getPurchaseCounters: apiConfig.createQuery<any, number>(builder, {
      query: (purchaseId: number) => ({
        url: `${ApiUrlEnum.PURCHASES}/${purchaseId}/report`,
      }),
    }),
    addVariantToPurchaseProducts: apiConfig.createMutation<
      any,
      {
        id: number;
        model: any;
      }
    >(builder, {
      query: ({ id, model }) => ({
        url: `${ApiUrlEnum.PURCHASES}/${id}${ApiUrlEnum.VARIANTS}`,
        method: "PATCH",
        body: JSON.stringify(model),
      }),
    }),
    updatePurchaseProduct: apiConfig.createMutation<
      any,
      {
        id: number;
        model: any;
      }
    >(builder, {
      query: ({ id, model }) => ({
        url: `${ApiUrlEnum.PURCHASES}${ApiUrlEnum.STOCK_ACTIONS}/${id}`,
        method: "PATCH",
        body: JSON.stringify(model),
      }),
    }),
    getPurchaseProductVariants: apiConfig.createQuery<
      any,
      {
        purchaseId: number;
        productId: number;
      }
    >(builder, {
      query: ({ purchaseId, productId }) => ({
        url: `${ApiUrlEnum.PURCHASES}/${purchaseId}${ApiUrlEnum.PRODUCTS}/${productId}`,
      }),
    }),
    deleteStockAction: apiConfig.createMutation<void, number>(builder, {
      query: (stockActionId: number) => ({
        url: `${ApiUrlEnum.PURCHASES}${ApiUrlEnum.STOCK_ACTIONS}/${stockActionId}`,
        method: "DELETE",
      }),
    }),
    getPurchaseSummary: apiConfig.createQuery<any, number>(builder, {
      query: (purchaseId) => ({
        url: `${ApiUrlEnum.PURCHASES}/${purchaseId}/fiscal-summary`,
      }),
    }),
  }),
});

export const { endpoints, ...PurchasesApiHooks } = PurchasesApiService;
export default PurchasesApiHooks;
