import { createApi } from "@reduxjs/toolkit/query/react";

import { ApiServiceNameEnum } from "@/const/enums/ApiServiceNameEnum.ts";
import { ApiUrlEnum } from "@/const/enums/ApiUrlEnum.ts";
import { ApiConfigurationService } from "@/utils/services/api/ApiConfigurationService.ts";

const apiConfig = new ApiConfigurationService(ApiUrlEnum.SUPPLIERS_BASE_URL);

export const SuppliersApiService = createApi({
  reducerPath: ApiServiceNameEnum.SUPPLIERS,
  baseQuery: apiConfig.baseQueryWithInterceptors,
  tagTypes: [ApiServiceNameEnum.SUPPLIERS],
  endpoints: (builder) => ({
    getListOfAllSuppliers: apiConfig.createQuery<any, any>(builder, {
      query: () => ({
        url: `${ApiUrlEnum.SUPPLIERS}/list`,
      }),
    }),
    createSupplier: apiConfig.createMutation<any, any>(builder, {
      query: (model?: any) => ({
        url: `${ApiUrlEnum.SUPPLIERS}`,
        method: "POST",
        body: JSON.stringify(model),
      }),
    }),
  }),
});

export const { endpoints, ...SuppliersApiHooks } = SuppliersApiService;
export default SuppliersApiHooks;
