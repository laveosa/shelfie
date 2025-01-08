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
    userSignIn: apiConfig.createMutation<ResponseAuthModel, RequestAuthModel>(
      builder,
      {
        query: (model: RequestAuthModel) => ({
          url: `${ApiUrlEnum.AUTH}/signin`,
          method: "POST",
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
    userSignUp: apiConfig.createMutation<ResponseAuthModel, RequestAuthModel>(
      builder,
      {
        query: (model: RequestAuthModel) => ({
          url: `${ApiUrlEnum.AUTH}/signup`,
          method: "POST",
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
    switchOrganization: apiConfig.createMutation<void, RequestAuthModel>(
      builder,
      {
        query: (model: RequestAuthModel) => ({
          url: `${ApiUrlEnum.AUTH}/switch-organization`,
          method: "POST",
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
        body: JSON.stringify(model),
      }),
      invalidatesTags: (result) => [
        {
          type: ApiServiceNameEnum.AUTH,
          result,
        },
      ],
    }),
    confirmSignInNumber: apiConfig.createMutation<
      ResponseAuthModel,
      RequestAuthModel
    >(builder, {
      query: (model: RequestAuthModel) => ({
        url: `${ApiUrlEnum.AUTH}/confirm-signin-number`,
        method: "POST",
        body: JSON.stringify(model),
      }),
      invalidatesTags: (result) => [
        {
          type: ApiServiceNameEnum.AUTH,
          result,
        },
      ],
    }),
    verifySignUpNumber: apiConfig.createMutation<
      ResponseAuthModel,
      RequestAuthModel
    >(builder, {
      query: (model: RequestAuthModel) => ({
        url: `${ApiUrlEnum.AUTH}/verify-phone-number`,
        method: "PATCH",
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
