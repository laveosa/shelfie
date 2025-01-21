import { createApi } from "@reduxjs/toolkit/query/react";

import { ApiConfigurationService as apiConfig } from "@/utils/services/api/ApiConfigurationService.ts";
import { ApiServiceNameEnum } from "@/const/enums/ApiServiceNameEnum.ts";
import { ApiUrlEnum } from "@/const/enums/ApiUrlEnum.ts";
import { CountryCodeModel } from "@/const/models/CountryCodeModel.ts";

export const DictionaryApiService = createApi({
  reducerPath: ApiServiceNameEnum.DICTIONARY,
  baseQuery: ({ args, ...props }) =>
    apiConfig.baseQueryWithInterceptors(
      {
        ...args,
        baseUrl: ApiUrlEnum.DICTIONARY_BASE_URL,
      },
      ...props,
    ),
  tagTypes: [ApiServiceNameEnum.DICTIONARY],
  endpoints: (builder) => ({
    getCountryCode: apiConfig.createQuery<CountryCodeModel[], void>(builder, {
      query: () => ({
        url: `${ApiUrlEnum.DICTIONARY}/countries/list`,
      }),
      providesTags: (result: CountryCodeModel[]) =>
        apiConfig.providesTags(result, ApiServiceNameEnum.DICTIONARY),
    }),
  }),
});

export const { endpoints, ...DictionaryApiHooks } = DictionaryApiService;
export default DictionaryApiHooks;
