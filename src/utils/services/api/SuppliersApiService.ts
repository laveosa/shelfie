import { createApi } from "@reduxjs/toolkit/query/react";

import { ApiServiceNameEnum } from "@/const/enums/ApiServiceNameEnum.ts";
import { ApiUrlEnum } from "@/const/enums/ApiUrlEnum.ts";
import { ApiConfigurationService } from "@/utils/services/api/ApiConfigurationService.ts";
import { SupplierModel } from "@/const/models/SupplierModel.ts";

const apiConfig = new ApiConfigurationService(ApiUrlEnum.SUPPLIERS_BASE_URL);

export const SuppliersApiService = createApi({
  reducerPath: ApiServiceNameEnum.SUPPLIERS,
  baseQuery: apiConfig.baseQueryWithInterceptors,
  tagTypes: [ApiServiceNameEnum.SUPPLIERS],
  endpoints: (builder) => ({
    getListOfSuppliers: apiConfig.createQuery<SupplierModel[], void>(builder, {
      query: () => ({
        url: `${ApiUrlEnum.SUPPLIERS}/all`,
      }),
    }),
    getListOfSuppliersForGrid: apiConfig.createMutation<any, any>(builder, {
      query: (model?: any) => ({
        url: `${ApiUrlEnum.SUPPLIERS}/list`,
        method: "POST",
        body: JSON.stringify(model),
      }),
    }),
    createSupplier: apiConfig.createMutation<any, any>(builder, {
      query: (model?: any) => ({
        url: `${ApiUrlEnum.SUPPLIERS}`,
        method: "POST",
        body: JSON.stringify(model),
      }),
    }),
    getSupplierDetails: apiConfig.createQuery<SupplierModel, any>(builder, {
      query: ({ supplierId, locationId }) => ({
        url: `${ApiUrlEnum.SUPPLIERS}/${supplierId}${ApiUrlEnum.LOCATIONS}/${locationId}`,
      }),
    }),
    updateSupplier: apiConfig.createMutation<void, any>(builder, {
      query: ({ model, supplierId, locationId }) => ({
        url: `${ApiUrlEnum.SUPPLIERS}/${supplierId}${ApiUrlEnum.LOCATIONS}/${locationId}`,
        method: "PATCH",
        body: JSON.stringify(model),
      }),
    }),
    deleteSupplier: apiConfig.createMutation<void, any>(builder, {
      query: (supplierId) => ({
        url: `${ApiUrlEnum.SUPPLIERS}/${supplierId}`,
        method: "DELETE",
      }),
    }),
    restoreSupplier: apiConfig.createMutation<void, any>(builder, {
      query: (supplierId) => ({
        url: `${ApiUrlEnum.SUPPLIERS}/${supplierId}/restore`,
        method: "PATCH",
      }),
    }),
  }),
});

export const { endpoints, ...SuppliersApiHooks } = SuppliersApiService;
export default SuppliersApiHooks;
