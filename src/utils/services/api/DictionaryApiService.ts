import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiConfigurationService as apiConfig } from "@/utils/services/api/ApiConfigurationService.ts";
import { ApiServiceNameEnum } from "@/const/enums/ApiServiceNameEnum.ts";
import { ApiUrlEnum } from "@/const/enums/ApiUrlEnum.ts";

export const DictionaryApiService = createApi({
  reducerPath: "Countries",
  baseQuery: (args: any, api: any, extraOptions: any) =>
    apiConfig.baseQueryWithInterceptors(
      {
        ...args,
        baseUrl: ApiUrlEnum.DICTIONARY_BASE_URL,
      },
      api,
      extraOptions,
    ),
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
