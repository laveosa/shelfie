import { createApi } from "@reduxjs/toolkit/query/react";

import { ApiServiceNameEnum } from "@/const/enums/ApiServiceNameEnum.ts";
import { ApiConfigurationService as apiConfig } from "@/utils/services/api/ApiConfigurationService.ts";
import { ApiUrlEnum } from "@/const/enums/ApiUrlEnum.ts";
import { RequestAuthModel } from "@/const/models/RequestAuthModel.ts";
import { ResponseAuthModel } from "@/const/models/ResponseAuthModel.ts";

export const AuthApiService = createApi({
  reducerPath: ApiServiceNameEnum.AUTH,
  baseQuery: apiConfig.baseQueryWithInterceptors,
  tagTypes: [ApiServiceNameEnum.AUTH],
  endpoints: (builder) => ({
    userLogin: apiConfig.createMutation<ResponseAuthModel, RequestAuthModel>(
      builder,
      {
        query: (model: RequestAuthModel) => ({
          url: `${ApiUrlEnum.AUTH}/signin`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(model),
        }),
        invalidatesTags: (result) => [
          {
            type: ApiServiceNameEnum.AUTH,
            result,
          },
        ],
      },
    ),
    registerNewUser: apiConfig.createMutation<
      ResponseAuthModel,
      RequestAuthModel
    >(builder, {
      query: (model: RequestAuthModel) => ({
        url: `${ApiUrlEnum.AUTH}/signup`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(model),
      }),
      invalidatesTags: (result) => [
        {
          type: ApiServiceNameEnum.AUTH,
          result,
        },
      ],
    }),
    switchOrganization: apiConfig.createMutation<void, RequestAuthModel>(
      builder,
      {
        query: (model: RequestAuthModel) => ({
          url: `${ApiUrlEnum.AUTH}/switch-organization`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(model),
        }),
        invalidatesTags: (result) => [
          {
            type: ApiServiceNameEnum.AUTH,
            result,
          },
        ],
      },
    ),
    forgotPassword: apiConfig.createMutation<
      ResponseAuthModel,
      RequestAuthModel
    >(builder, {
      query: (model: RequestAuthModel) => ({
        url: `${ApiUrlEnum.AUTH}/forgot-password`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(model),
      }),
      invalidatesTags: (result) => [
        {
          type: ApiServiceNameEnum.AUTH,
          result,
        },
      ],
    }),
    resetPassword: apiConfig.createMutation<
      ResponseAuthModel,
      RequestAuthModel
    >(builder, {
      query: (model: RequestAuthModel) => ({
        url: `${ApiUrlEnum.AUTH}/reset-password`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(model),
      }),
      invalidatesTags: (result) => [
        {
          type: ApiServiceNameEnum.AUTH,
          result,
        },
      ],
    }),
    verifyIdentity: apiConfig.createMutation<
      ResponseAuthModel,
      RequestAuthModel
    >(builder, {
      query: (model: RequestAuthModel) => ({
        url: `${ApiUrlEnum.AUTH}/verify-identity`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(model),
      }),
      invalidatesTags: (result) => [
        {
          type: ApiServiceNameEnum.AUTH,
          result,
        },
      ],
    }),
    verifyPhoneNumber: apiConfig.createMutation<
      ResponseAuthModel,
      RequestAuthModel
    >(builder, {
      query: (model: RequestAuthModel) => ({
        url: `${ApiUrlEnum.AUTH}/verify-identity`,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(model),
      }),
      invalidatesTags: (result) => [
        {
          type: ApiServiceNameEnum.AUTH,
          result,
        },
      ],
    }),
  }),
});

export const { endpoints, ...AuthApiHooks } = AuthApiService;
export default AuthApiHooks;
