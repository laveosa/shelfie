import { createApi } from "@reduxjs/toolkit/query/react";

import { ApiConfigurationService } from "@/utils/services/api/ApiConfigurationService.ts";
import { ApiServiceNameEnum } from "@/const/enums/ApiServiceNameEnum.ts";
import { ApiUrlEnum } from "@/const/enums/ApiUrlEnum.ts";
import { CountryCodeModel } from "@/const/models/CountryCodeModel.ts";

const apiConfig = new ApiConfigurationService(ApiUrlEnum.DICTIONARY_BASE_URL);

export const DictionaryApiService = createApi({
  reducerPath: ApiServiceNameEnum.DICTIONARY,
  baseQuery: apiConfig.baseQueryWithInterceptors,
  tagTypes: [ApiServiceNameEnum.DICTIONARY],
  endpoints: (builder) => ({
    getCountryCode: apiConfig.createQuery<CountryCodeModel[], void>(builder, {
      query: () => ({
        url: "/countries/list",
      }),
      providesTags: (result: CountryCodeModel[]) =>
        apiConfig.providesTags(result, ApiServiceNameEnum.DICTIONARY),
    }),
  }),
});

export const { endpoints, ...DictionaryApiHooks } = DictionaryApiService;
export default DictionaryApiHooks;
