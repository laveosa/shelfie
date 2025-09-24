import { createApi } from "@reduxjs/toolkit/query/react";

import { ApiConfigurationService } from "@/utils/services/api/ApiConfigurationService.ts";
import { ApiServiceNameEnum } from "@/const/enums/ApiServiceNameEnum.ts";
import { ApiUrlEnum } from "@/const/enums/ApiUrlEnum.ts";
import { CountryCodeModel } from "@/const/models/CountryCodeModel.ts";
import { TypeOfTraitModel } from "@/const/models/TypeOfTraitModel.ts";
import { TaxTypeModel } from "@/const/models/TaxTypeModel.ts";
import { CurrencyModel } from "@/const/models/CurrencyModel.ts";
import { LanguageModel } from "@/const/models/LanguageModel.ts";

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
    getSortingOptionsForGrid: apiConfig.createQuery<any, void>(builder, {
      query: () => ({
        url: "/sortingoptions/products",
      }),
      providesTags: (result: any) =>
        apiConfig.providesTags(result, ApiServiceNameEnum.DICTIONARY),
    }),
    getListOfTypesOfTraits: apiConfig.createQuery<TypeOfTraitModel[], void>(
      builder,
      {
        query: () => ({
          url: "/TraitTypes/all",
        }),
        providesTags: (result: TypeOfTraitModel[]) =>
          apiConfig.providesTags(result, ApiServiceNameEnum.DICTIONARY),
      },
    ),
    getTaxesList: apiConfig.createQuery<TaxTypeModel[], void>(builder, {
      query: () => ({
        url: "/taxes/list",
      }),
      providesTags: (result: TaxTypeModel[]) =>
        apiConfig.providesTags(result, ApiServiceNameEnum.DICTIONARY),
    }),
    getCurrenciesList: apiConfig.createQuery<CurrencyModel[], void>(builder, {
      query: () => ({
        url: "/currencies/list",
      }),
      providesTags: (result: CurrencyModel[]) =>
        apiConfig.providesTags(result, ApiServiceNameEnum.DICTIONARY),
    }),
    getLanguagesList: apiConfig.createQuery<LanguageModel[], void>(builder, {
      query: () => ({
        url: "/languages/all",
      }),
      providesTags: (result: LanguageModel[]) =>
        apiConfig.providesTags(result, ApiServiceNameEnum.DICTIONARY),
    }),
  }),
});

export const { endpoints, ...DictionaryApiHooks } = DictionaryApiService;
export default DictionaryApiHooks;
