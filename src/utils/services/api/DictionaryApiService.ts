import { createApi } from "@reduxjs/toolkit/query/react";

import { DictionaryController as controller } from "db/controllers/dictionary-controller.ts";
import { ApiConfigurationService } from "@/utils/services/api/ApiConfigurationService.ts";
import { ApiServiceNameEnum } from "@/const/enums/ApiServiceNameEnum.ts";
import { ApiUrlEnum } from "@/const/enums/ApiUrlEnum.ts";
import { CountryCodeModel } from "@/const/models/CountryCodeModel.ts";
import { TypeOfTraitModel } from "@/const/models/TypeOfTraitModel.ts";
import { TaxTypeModel } from "@/const/models/TaxTypeModel.ts";
import { CurrencyModel } from "@/const/models/CurrencyModel.ts";
import { LanguageModel } from "@/const/models/LanguageModel.ts";
import { DeliveryServiceModel } from "@/const/models/DeliveryServiceModel.ts";

const apiConfig = new ApiConfigurationService(ApiUrlEnum.DICTIONARY_BASE_URL);
type ControllerType = typeof controller;

export const DictionaryApiService = createApi({
  reducerPath: ApiServiceNameEnum.DICTIONARY,
  baseQuery: async () => ({ date: undefined }),
  // baseQuery: apiConfig.baseQueryWithInterceptors,
  tagTypes: [ApiServiceNameEnum.DICTIONARY],
  endpoints: (builder) => ({
    getCountryCode: builder.query<CountryCodeModel[], void>(
      apiConfig.getStaticData<ControllerType>("getCountryCode", controller),
    ),
    getSortingOptionsForGrid: builder.query<any, void>(
      apiConfig.getStaticData<ControllerType>(
        "getSortingOptionsForGrid",
        controller,
      ),
    ),
    getListOfTypesOfTraits: builder.query<TypeOfTraitModel[], void>(
      apiConfig.getStaticData<ControllerType>(
        "getListOfTypesOfTraits",
        controller,
      ),
    ),
    getTaxesList: builder.query<TaxTypeModel[], void>(
      apiConfig.getStaticData<ControllerType>("getTaxesList", controller),
    ),
    getCurrenciesList: builder.query<CurrencyModel[], void>(
      apiConfig.getStaticData<ControllerType>("getCurrenciesList", controller),
    ),
    getLanguagesList: builder.query<LanguageModel[], void>(
      apiConfig.getStaticData<ControllerType>("getLanguagesList", controller),
    ),
    getDeliveryServicesList: builder.query<DeliveryServiceModel[], void>(
      apiConfig.getStaticData<ControllerType>(
        "getDeliveryServicesList",
        controller,
      ),
    ),
  }),
});

export const { endpoints, ...DictionaryApiHooks } = DictionaryApiService;
export default DictionaryApiHooks;
