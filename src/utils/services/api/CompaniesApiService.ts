import { createApi } from "@reduxjs/toolkit/query/react";

import { CompaniesController as controller } from "db/controllers/companies-controller.ts";
import { ApiServiceNameEnum } from "@/const/enums/ApiServiceNameEnum.ts";
import { ApiUrlEnum } from "@/const/enums/ApiUrlEnum.ts";
import { ApiConfigurationService } from "@/utils/services/api/ApiConfigurationService.ts";
import { CompanyModel } from "@/const/models/CompanyModel.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import { LocationModel } from "@/const/models/LocationModel.ts";

const apiConfig = new ApiConfigurationService(ApiUrlEnum.COMPANY_BASE_URL);
type ControllerType = typeof controller;

export const CompaniesApiService = createApi({
  reducerPath: ApiServiceNameEnum.COMPANIES,
  baseQuery: async () => ({ data: undefined }),
  // baseQuery: apiConfig.baseQueryWithInterceptors,
  tagTypes: [ApiServiceNameEnum.COMPANIES],
  endpoints: (builder) => ({
    getListOfCompanies: builder.query<CompanyModel[], void>(
      apiConfig.getStaticData<ControllerType>("getListOfCompanies", controller),
    ),
    getListOfCompaniesForGrid: builder.mutation<
      GridRequestModel,
      GridRequestModel
    >(apiConfig.getStaticData("getListOfCompaniesForGrid", controller)),
    getListOfCompaniesWithLocationsForGrid: builder.mutation<
      GridRequestModel,
      GridRequestModel
    >(
      apiConfig.getStaticData<ControllerType>(
        "getListOfCompaniesWithLocationsForGrid",
        controller,
      ),
    ),
    createCompany: builder.mutation<CompanyModel, CompanyModel>(
      apiConfig.getStaticData<ControllerType>("createCompany", controller),
    ),
    getCompanyDetails: builder.query<CompanyModel, number>(
      apiConfig.getStaticData<ControllerType>("getCompanyDetails", controller),
    ),
    addLocationToCompany: builder.mutation<void, LocationModel>(
      apiConfig.getStaticData<ControllerType>(
        "addLocationToCompany",
        controller,
      ),
    ),
    deleteCompany: builder.mutation<void, number>(
      apiConfig.getStaticData<ControllerType>(
        "addLocationToCompany",
        controller,
      ),
    ),
    restoreCompany: builder.mutation<void, any>(
      apiConfig.getStaticData<ControllerType>("restoreCompany", controller),
    ),
    updateLocationDetails: builder.mutation<void, LocationModel>(
      apiConfig.getStaticData<ControllerType>(
        "updateLocationDetails",
        controller,
      ),
    ),
    addNewLocationToCompany: builder.mutation<any, any>(
      apiConfig.getStaticData<ControllerType>(
        "addNewLocationToCompany",
        controller,
      ),
    ),
    updateCompanyDetails: builder.mutation<void, any>(
      apiConfig.getStaticData<ControllerType>(
        "updateCompanyDetails",
        controller,
      ),
    ),
    changePositionOfCompanyPhoto: builder.mutation<
      any,
      {
        companyId?: number;
        photoId?: number;
        index?: number;
      }
    >(
      apiConfig.getStaticData<ControllerType>(
        "changePositionOfCompanyPhoto",
        controller,
      ),
    ),
    changePositionOfLocationPhoto: builder.mutation<
      any,
      {
        locationId?: number;
        photoId?: number;
        index?: number;
      }
    >(
      apiConfig.getStaticData<ControllerType>(
        "changePositionOfLocationPhoto",
        controller,
      ),
    ),
    deleteLocation: builder.mutation<void, number>(
      apiConfig.getStaticData<ControllerType>("deleteLocation", controller),
    ),
    getCompaniesList: builder.query<void, void>(
      apiConfig.getStaticData<ControllerType>("getCompaniesList", controller),
    ),
  }),
});

export const { endpoints, ...CompaniesApiHooks } = CompaniesApiService;
export default CompaniesApiHooks;
