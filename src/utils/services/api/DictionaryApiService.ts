import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiConfigurationService as apiConfig } from "@/utils/services/api/ApiConfigurationService.ts";
import { ApiServiceNameEnum } from "@/const/enums/ApiServiceNameEnum.ts";

export const DictionaryApiService = createApi({
  reducerPath: "Countries",
  baseQuery: apiConfig.baseQueryWithInterceptors,
  tagTypes: ["Countries"],
  endpoints: (builder) => ({
    getCountryCode: apiConfig.createQuery<any, void>(builder, {
      query: () => ({
        url: "Countries/list",
      }),
      // transformResponse: (res: any) => res, //TODO delete this code after we will receive real data
      providesTags: (result: any) =>
        apiConfig.providesTags(result, ApiServiceNameEnum.DICTIONARY),
    }),
  }),
});

export const { endpoints, ...DictionaryApiHooks } = DictionaryApiService;
export default DictionaryApiHooks;
