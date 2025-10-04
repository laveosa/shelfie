import { createApi } from "@reduxjs/toolkit/query/react";

import { ApiServiceNameEnum } from "@/const/enums/ApiServiceNameEnum.ts";
import { ApiUrlEnum } from "@/const/enums/ApiUrlEnum.ts";
import { ApiConfigurationService } from "@/utils/services/api/ApiConfigurationService.ts";
import { CompanyModel } from "@/const/models/CompanyModel.ts";

const apiConfig = new ApiConfigurationService(ApiUrlEnum.COMPANY_BASE_URL);

export const CompaniesApiService = createApi({
  reducerPath: ApiServiceNameEnum.COMPANIES,
  baseQuery: apiConfig.baseQueryWithInterceptors,
  tagTypes: [ApiServiceNameEnum.COMPANIES],
  endpoints: (builder) => ({
    getListOfCompanies: apiConfig.createQuery<CompanyModel[], void>(builder, {
      query: () => ({
        url: `${ApiUrlEnum.COMPANIES}/all`,
      }),
    }),
    getListOfCompaniesForGrid: apiConfig.createMutation<any, any>(builder, {
      query: (model?: any) => ({
        url: `${ApiUrlEnum.COMPANIES}/list`,
        method: "POST",
        body: JSON.stringify(model),
      }),
    }),
    createCompany: apiConfig.createMutation<any, any>(builder, {
      query: (model?: any) => ({
        url: `${ApiUrlEnum.COMPANIES}`,
        method: "POST",
        body: JSON.stringify(model),
      }),
    }),
    getCompanyDetails: apiConfig.createQuery<CompanyModel, any>(builder, {
      query: (companyId) => ({
        url: `${ApiUrlEnum.COMPANIES}/${companyId}`,
      }),
    }),
    addLocationToCompany: apiConfig.createMutation<void, any>(builder, {
      query: ({ companyId, model }) => ({
        url: `${ApiUrlEnum.COMPANIES}/${companyId}${ApiUrlEnum.LOCATIONS}`,
        method: "POST",
        body: JSON.stringify(model),
      }),
    }),
    deleteCompany: apiConfig.createMutation<void, any>(builder, {
      query: (companyId) => ({
        url: `${ApiUrlEnum.COMPANIES}/${companyId}`,
        method: "DELETE",
      }),
    }),
    restoreCompany: apiConfig.createMutation<void, any>(builder, {
      query: (companyId) => ({
        url: `${ApiUrlEnum.SUPPLIERS}/${companyId}/restore`,
        method: "PATCH",
      }),
    }),
    updateLocationDetails: apiConfig.createMutation<void, any>(builder, {
      query: ({ locationId, model }) => ({
        url: `${ApiUrlEnum.LOCATIONS}/${locationId}`,
        method: "PATCH",
        body: JSON.stringify(model),
      }),
    }),
    addNewLocationToCompany: apiConfig.createMutation<any, any>(builder, {
      query: ({ companyId, model }) => ({
        url: `${ApiUrlEnum.COMPANIES}/${companyId}/locations`,
        method: "POST",
        body: JSON.stringify(model),
      }),
    }),
    updateCompanyDetails: apiConfig.createMutation<void, any>(builder, {
      query: ({ companyId, model }) => ({
        url: `${ApiUrlEnum.COMPANIES}/${companyId}`,
        method: "PATCH",
        body: JSON.stringify(model),
      }),
    }),
    changePositionOfCompanyPhoto: apiConfig.createMutation<
      any,
      {
        companyId?: number;
        photoId?: number;
        index?: number;
      }
    >(builder, {
      query: ({ companyId, photoId, index }) => ({
        url: `${ApiUrlEnum.COMPANIES}/${companyId}/photo/${photoId}/${index}`,
        method: "PATCH",
      }),
    }),
    changePositionOfLocationPhoto: apiConfig.createMutation<
      any,
      {
        locationId?: number;
        photoId?: number;
        index?: number;
      }
    >(builder, {
      query: ({ locationId, photoId, index }) => ({
        url: `${ApiUrlEnum.LOCATIONS}/${locationId}/photo/${photoId}/${index}`,
        method: "PATCH",
      }),
    }),
  }),
});

export const { endpoints, ...CompaniesApiHooks } = CompaniesApiService;
export default CompaniesApiHooks;
