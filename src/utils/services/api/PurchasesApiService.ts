import { createApi } from "@reduxjs/toolkit/query/react";

import { PurchasesController as controller } from "db/controllers/purchases-controller.ts";
import { ApiServiceNameEnum } from "@/const/enums/ApiServiceNameEnum.ts";
import { ApiUrlEnum } from "@/const/enums/ApiUrlEnum.ts";
import { ApiConfigurationService } from "@/utils/services/api/ApiConfigurationService.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import { PurchaseModel } from "@/const/models/PurchaseModel.ts";
import { MarginItemModel } from "@/const/models/MarginItemModel.ts";
import { MarginRuleModel } from "@/const/models/MarginRuleModel.ts";

const apiConfig = new ApiConfigurationService(ApiUrlEnum.PURCHASES_BASE_URL);
type ControllerType = typeof controller;

export const PurchasesApiService = createApi({
  reducerPath: ApiServiceNameEnum.PURCHASES,
  baseQuery: async () => ({ data: undefined }),
  // baseQuery: apiConfig.baseQueryWithInterceptors,
  tagTypes: [ApiServiceNameEnum.PURCHASES],
  endpoints: (builder) => ({
    getListOfPurchasesForGrid: builder.mutation<
      GridRequestModel,
      GridRequestModel
    >(
      apiConfig.getStaticData<ControllerType>(
        "getListOfPurchasesForGrid",
        controller,
      ),
    ),
    getListOfPurchaseProductsForGrid: builder.mutation<
      GridRequestModel,
      { id: number; model: GridRequestModel }
    >(
      apiConfig.getStaticData<ControllerType>(
        "getListOfPurchaseProductsForGrid",
        controller,
      ),
    ),
    getPurchaseDetails: builder.query<PurchaseModel, number>(
      apiConfig.getStaticData<ControllerType>("getPurchaseDetails", controller),
    ),
    createPurchaseForSupplier: builder.mutation<any, any>(
      apiConfig.getStaticData<ControllerType>(
        "createPurchaseForSupplier",
        controller,
      ),
    ),
    updatePurchaseForSupplier: builder.mutation<
      any,
      {
        purchaseId: number;
        model: any;
      }
    >(
      apiConfig.getStaticData<ControllerType>(
        "updatePurchaseForSupplier",
        controller,
      ),
    ),
    getPurchaseCounters: builder.query<any, number>(
      apiConfig.getStaticData<ControllerType>(
        "getPurchaseCounters",
        controller,
      ),
    ),
    addVariantToPurchaseProducts: builder.mutation<
      any,
      {
        id: number;
        model: any;
      }
    >(
      apiConfig.getStaticData<ControllerType>(
        "addVariantToPurchaseProducts",
        controller,
      ),
    ),
    updatePurchaseProduct: builder.mutation<
      any,
      {
        id: number;
        model: any;
      }
    >(
      apiConfig.getStaticData<ControllerType>(
        "updatePurchaseProduct",
        controller,
      ),
    ),
    getPurchaseProductVariants: builder.query<
      any,
      {
        purchaseId: number;
        productId: number;
      }
    >(
      apiConfig.getStaticData<ControllerType>(
        "getPurchaseProductVariants",
        controller,
      ),
    ),
    deleteStockAction: builder.mutation<void, number>(
      apiConfig.getStaticData<ControllerType>("deleteStockAction", controller),
    ),
    getPurchaseSummary: builder.query<any, number>(
      apiConfig.getStaticData<ControllerType>("getPurchaseSummary", controller),
    ),
    getMarginsListForGrid: builder.mutation<
      any,
      {
        model: GridRequestModel;
      }
    >(
      apiConfig.getStaticData<ControllerType>(
        "getMarginsListForGrid",
        controller,
      ),
    ),
    getAllMargins: builder.query<any, void>(
      apiConfig.getStaticData<ControllerType>("getAllMargins", controller),
    ),
    getMarginForPurchase: builder.query<any, number>(
      apiConfig.getStaticData<ControllerType>(
        "getMarginForPurchase",
        controller,
      ),
    ),
    getMarginDetails: builder.query<any, number>(
      apiConfig.getStaticData<ControllerType>("getMarginDetails", controller),
    ),
    createMargin: builder.mutation<any, { model: any }>(
      apiConfig.getStaticData<ControllerType>("createMargin", controller),
    ),
    updateMargin: builder.mutation<
      any,
      {
        marginId: number;
        model: any;
      }
    >(apiConfig.getStaticData<ControllerType>("updateMargin", controller)),
    createMarginRules: builder.mutation<
      any,
      {
        marginId: number;
        model: any;
      }
    >(apiConfig.getStaticData<ControllerType>("createMarginRules", controller)),
    deleteMargin: builder.mutation<void, number>(
      apiConfig.getStaticData<ControllerType>("deleteMargin", controller),
    ),
    restoreMargin: builder.mutation<any, number>(
      apiConfig.getStaticData<ControllerType>("restoreMargin", controller),
    ),
    connectMarginToPurchase: builder.mutation<
      any,
      {
        purchaseId: number;
        marginId: number;
      }
    >(
      apiConfig.getStaticData<ControllerType>(
        "connectMarginToPurchase",
        controller,
      ),
    ),
    detachMargin: builder.mutation<void, number>(
      apiConfig.getStaticData<ControllerType>("detachMargin", controller),
    ),
    updateMarginRulesForPurchase: builder.mutation<
      any,
      {
        purchaseId: number;
        model: MarginRuleModel;
      }
    >(
      apiConfig.getStaticData<ControllerType>(
        "updateMarginRulesForPurchase",
        controller,
      ),
    ),
    getMarginItemsListForGrid: builder.mutation<
      any,
      {
        purchaseId: number;
        model: GridRequestModel;
      }
    >(
      apiConfig.getStaticData<ControllerType>(
        "getMarginItemsListForGrid",
        controller,
      ),
    ),
    getInvoicesForGrid: builder.mutation<any, number>(
      apiConfig.getStaticData<ControllerType>("getInvoicesForGrid", controller),
    ),
    restoreMarginRuleToDefault: builder.mutation<any, number>(
      apiConfig.getStaticData<ControllerType>(
        "restoreMarginRuleToDefault",
        controller,
      ),
    ),
    updateMarginItem: builder.mutation<
      any,
      {
        marginItemId: number;
        model: MarginItemModel;
      }
    >(apiConfig.getStaticData<ControllerType>("updateMarginItem", controller)),
    applyMarginItem: builder.mutation<any, number>(
      apiConfig.getStaticData<ControllerType>("applyMarginItem", controller),
    ),
    applyVisibleMarginItems: builder.mutation<
      any,
      {
        purchaseId: number;
        model: GridRequestModel;
      }
    >(
      apiConfig.getStaticData<ControllerType>(
        "applyVisibleMarginItems",
        controller,
      ),
    ),
    applyAllMarginItems: builder.mutation<any, number>(
      apiConfig.getStaticData<ControllerType>(
        "applyAllMarginItems",
        controller,
      ),
    ),
    deletePurchase: builder.mutation<void, number>(
      apiConfig.getStaticData<ControllerType>("deletePurchase", controller),
    ),
  }),
});

export const { endpoints, ...PurchasesApiHooks } = PurchasesApiService;
export default PurchasesApiHooks;
