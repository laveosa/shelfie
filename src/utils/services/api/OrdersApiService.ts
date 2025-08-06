import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiServiceNameEnum } from "@/const/enums/ApiServiceNameEnum.ts";
import { ApiUrlEnum } from "@/const/enums/ApiUrlEnum.ts";
import { ApiConfigurationService } from "@/utils/services/api/ApiConfigurationService.ts";
import { GridModel } from "@/const/models/GridModel.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import { CustomerModel } from "@/const/models/CustomerModel";

const apiConfig = new ApiConfigurationService(ApiUrlEnum.ORDERS_BASE_URL);

export const OrdersApiService = createApi({
    reducerPath: ApiServiceNameEnum.CUSTOMERS,
    baseQuery: apiConfig.baseQueryWithInterceptors,
    tagTypes: [ApiServiceNameEnum.CUSTOMERS],
    endpoints: (builder) => ({
        getCustomersForGrid: apiConfig.createMutation<GridModel, GridRequestModel>(
            builder,
            {
              query: (model?: GridRequestModel) => ({
                url: `${ApiUrlEnum.CUSTOMERS}/list`,
                method: "POST",
                body: JSON.stringify(model),
              }),
            },
          ),
          getCustomerDetails: apiConfig.createQuery<CustomerModel, number>(builder, {
            query: (id: number) => ({
              url: `${ApiUrlEnum.CUSTOMERS}/${id}`,
            }),
          }),
          createCustomer: apiConfig.createMutation<any, CustomerRequestModel>(builder, {
            query: (model: CustomerRequestModel) => ({
              url: `${ApiUrlEnum.CUSTOMERS}`,
              method: "POST",
              body: JSON.stringify(model),
            }),
          }),
          updateCustomer: apiConfig.createMutation<any, { id: number; model: CustomerRequestModel }>(builder, {
            query: ({ id, model }) => ({
              url: `${ApiUrlEnum.CUSTOMERS}/${id}`,
              method: "PATCH",
              body: JSON.stringify(model),
            }),
          }),
          deleteCustomer: apiConfig.createMutation<any, number>(builder, {
            query: (id: number) => ({
              url: `${ApiUrlEnum.CUSTOMERS}/${id}`,
              method: "DELETE",
            }),
          }),
          getCustomerAddressesForGrid: apiConfig.createMutation<GridModel, { model?: GridRequestModel; id: number }>(
            builder,
            {
              query: ({ model, id }) => ({
                url: `${ApiUrlEnum.CUSTOMERS}/${id}/delivery-addresses`,
                method: "POST",
                body: JSON.stringify(model),
              }),
            },
          ),
          getCustomerAddressDetails: apiConfig.createQuery<AddressModel, number>(builder, {
            query: (id: number) => ({
              url: `${ApiUrlEnum.DELIVERY_ADDRESSES}/${id}`,
            }),
          }),
          createCustomerAddress: apiConfig.createMutation<any, { id: number; model: AddressRequestModel }>(builder, {
            query: ({ id, model }) => ({
              url: `${ApiUrlEnum.CUSTOMERS}/${id}/delivery-addresses/create`,
              method: "POST",
              body: JSON.stringify(model),
            }),
          }),
          updateCustomerAddress: apiConfig.createMutation<any, { id: number; model: AddressRequestModel }>(builder, {
            query: ({ id, model }) => ({
              url: `${ApiUrlEnum.DELIVERY_ADDRESSES}/${id}`,
              method: "PATCH",
              body: JSON.stringify(model),
            }),
          }),
          deleteCustomerAddress: apiConfig.createMutation<any, number>(builder, { 
            query: (id: number) => ({
              url: `${ApiUrlEnum.DELIVERY_ADDRESSES}/${id}`,
              method: "DELETE",
            }),
          }),
          getCustomerInfo: apiConfig.createQuery<CustomerCounterModel, number>(builder, {
            query: (id: number) => ({
              url: `${ApiUrlEnum.CUSTOMERS}/${id}/info`,
            }),
          }),
    })
})