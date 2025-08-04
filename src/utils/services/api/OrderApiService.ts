import { createApi } from "@reduxjs/toolkit/query/react";

import { ApiConfigurationService } from "@/utils/services/api/ApiConfigurationService.ts";
import { ApiServiceNameEnum } from "@/const/enums/ApiServiceNameEnum.ts";
import { ApiUrlEnum } from "@/const/enums/ApiUrlEnum.ts";

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
  }),
});

export const { endpoints, ...OrderApiHooks } = OrderApiService;
export default OrderApiHooks;
