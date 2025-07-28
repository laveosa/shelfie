import { createApi } from "@reduxjs/toolkit/query/react";

import { ApiServiceNameEnum } from "@/const/enums/ApiServiceNameEnum.ts";
import { ApiUrlEnum } from "@/const/enums/ApiUrlEnum.ts";
import { ApiConfigurationService } from "@/utils/services/api/ApiConfigurationService.ts";
import { GridModel } from "@/const/models/GridModel.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import { PurchaseModel } from "@/const/models/PurchaseModel.ts";
import { MarginItemModel } from "@/const/models/MarginItemModel.ts";
import { MarginRuleModel } from "@/const/models/MarginRuleModel.ts";

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
    getMarginsListForGrid: apiConfig.createMutation<
      any,
      {
        model: GridRequestModel;
      }
    >(builder, {
      query: (model) => ({
        url: `${ApiUrlEnum.MARGIN}/list`,
        method: "POST",
        body: JSON.stringify(model),
      }),
    }),
    getAllMargins: apiConfig.createQuery<any, void>(builder, {
      query: () => ({
        url: `${ApiUrlEnum.MARGIN}/all`,
      }),
    }),
    getMarginForPurchase: apiConfig.createQuery<any, number>(builder, {
      query: (purchaseId) => ({
        url: `${ApiUrlEnum.PURCHASES}/${purchaseId}/margin-rules`,
      }),
    }),
    getMarginDetails: apiConfig.createQuery<any, number>(builder, {
      query: (marginId) => ({
        url: `${ApiUrlEnum.MARGIN}/${marginId}`,
      }),
    }),
    createMargin: apiConfig.createMutation<any, { model: any }>(builder, {
      query: (model) => ({
        url: `${ApiUrlEnum.MARGIN}`,
        method: "POST",
        body: JSON.stringify(model),
      }),
    }),
    updateMargin: apiConfig.createMutation<
      any,
      {
        marginId: number;
        model: any;
      }
    >(builder, {
      query: ({ marginId, model }) => ({
        url: `${ApiUrlEnum.MARGIN}/${marginId}`,
        method: "PATCH",
        body: JSON.stringify(model),
      }),
    }),
    createMarginRules: apiConfig.createMutation<
      any,
      {
        marginId: number;
        model: any;
      }
    >(builder, {
      query: ({ marginId, model }) => ({
        url: `${ApiUrlEnum.MARGIN}/${marginId}/rules`,
        method: "PATCH",
        body: JSON.stringify(model),
      }),
    }),
    deleteMargin: apiConfig.createMutation<void, number>(builder, {
      query: (marginId: number) => ({
        url: `${ApiUrlEnum.MARGIN}/${marginId}`,
        method: "DELETE",
      }),
    }),
    restoreMargin: apiConfig.createMutation<any, number>(builder, {
      query: (marginId) => ({
        url: `${ApiUrlEnum.MARGIN}/${marginId}/undelete`,
        method: "PATCH",
      }),
    }),
    connectMarginToPurchase: apiConfig.createMutation<
      any,
      {
        purchaseId: number;
        marginId: number;
      }
    >(builder, {
      query: ({ purchaseId, marginId }) => ({
        url: `${ApiUrlEnum.PURCHASES}/${purchaseId}/margin-rules/${marginId}`,
        method: "PATCH",
      }),
    }),
    detachMargin: apiConfig.createMutation<void, number>(builder, {
      query: (purchaseId: number) => ({
        url: `${ApiUrlEnum.PURCHASES}/${purchaseId}/margin-rules`,
        method: "DELETE",
      }),
    }),
    updateMarginRulesForPurchase: apiConfig.createMutation<
      any,
      {
        purchaseId: number;
        model: MarginRuleModel;
      }
    >(builder, {
      query: ({ purchaseId, model }) => ({
        url: `${ApiUrlEnum.PURCHASES}/${purchaseId}/margin-rules`,
        method: "PATCH",
        body: JSON.stringify(model),
      }),
    }),
    getMarginItemsListForGrid: apiConfig.createMutation<
      any,
      {
        purchaseId: number;
        model: GridRequestModel;
      }
    >(builder, {
      query: ({ purchaseId, model }) => ({
        url: `${ApiUrlEnum.PURCHASES}/${purchaseId}/margin-items/list`,
        method: "POST",
        body: JSON.stringify(model),
      }),
    }),
    getInvoicesForGrid: apiConfig.createMutation<any, number>(builder, {
      query: (purchaseId) => ({
        url: `${ApiUrlEnum.PURCHASES}/${purchaseId}/invoices`,
        method: "POST",
        body: {},
      }),
    }),
    restoreMarginRuleToDefault: apiConfig.createMutation<any, number>(builder, {
      query: (purchaseId) => ({
        url: `${ApiUrlEnum.PURCHASES}/${purchaseId}/margin-rules/restore`,
        method: "PATCH",
      }),
    }),
    updateMarginItem: apiConfig.createMutation<
      any,
      {
        marginItemId: number;
        model: MarginItemModel;
      }
    >(builder, {
      query: ({ marginItemId, model }) => ({
        url: `${ApiUrlEnum.MARGIN_ITEMS}/${marginItemId}/manage`,
        method: "PATCH",
        body: JSON.stringify(model),
      }),
    }),
    applyMarginItem: apiConfig.createMutation<any, number>(builder, {
      query: (marginItemId) => ({
        url: `${ApiUrlEnum.MARGIN_ITEMS}/${marginItemId}/apply`,
        method: "POST",
      }),
    }),
    applyVisibleMarginItems: apiConfig.createMutation<
      any,
      {
        purchaseId: number;
        model: GridRequestModel;
      }
    >(builder, {
      query: ({ purchaseId, model }) => ({
        url: `${ApiUrlEnum.PURCHASES}/${purchaseId}/margin-items/apply`,
        method: "POST",
        body: JSON.stringify(model),
      }),
    }),
    applyAllMarginItems: apiConfig.createMutation<any, number>(builder, {
      query: (purchaseId) => ({
        url: `${ApiUrlEnum.PURCHASES}/${purchaseId}/margin-items/apply-all`,
        method: "POST",
      }),
    }),
  }),
});

export const { endpoints, ...PurchasesApiHooks } = PurchasesApiService;
export default PurchasesApiHooks;
