import { createApi } from "@reduxjs/toolkit/query/react";

import { AuthController as controller } from "db/controllers/auth-controller.ts";
import { ApiServiceNameEnum } from "@/const/enums/ApiServiceNameEnum.ts";
import { ApiConfigurationService } from "@/utils/services/api/ApiConfigurationService.ts";
import { ApiUrlEnum } from "@/const/enums/ApiUrlEnum.ts";
import { RequestAuthModel } from "@/const/models/RequestAuthModel.ts";
import { ResponseAuthModel } from "@/const/models/ResponseAuthModel.ts";

const apiConfig = new ApiConfigurationService(ApiUrlEnum.AUTH_BASE_URL);
type ControllerType = typeof controller;

export const AuthApiService = createApi({
  reducerPath: ApiServiceNameEnum.AUTH,
  baseQuery: async () => ({ date: undefined }),
  // baseQuery: apiConfig.baseQueryWithInterceptors,
  tagTypes: [ApiServiceNameEnum.AUTH],
  endpoints: (builder) => ({
    userSignIn: builder.mutation<ResponseAuthModel, RequestAuthModel>(
      apiConfig.getStaticData<ControllerType>("userSignIn", controller),
    ),
    userSignUp: builder.mutation<ResponseAuthModel, RequestAuthModel>(
      apiConfig.getStaticData<ControllerType>("userSignUp", controller),
    ),
    switchOrganization: builder.mutation<void, RequestAuthModel>(
      apiConfig.getStaticData<ControllerType>("switchOrganization", controller),
    ),
    forgotPassword: builder.mutation<ResponseAuthModel, RequestAuthModel>(
      apiConfig.getStaticData<ControllerType>("forgotPassword", controller),
    ),
    resetPassword: builder.mutation<ResponseAuthModel, RequestAuthModel>(
      apiConfig.getStaticData<ControllerType>("resetPassword", controller),
    ),
    confirmSignInNumber: builder.mutation<ResponseAuthModel, RequestAuthModel>(
      apiConfig.getStaticData<ControllerType>(
        "confirmSignInNumber",
        controller,
      ),
    ),
    confirmSignUpPhoneNumber: builder.mutation<
      ResponseAuthModel,
      RequestAuthModel
    >(
      apiConfig.getStaticData<ControllerType>(
        "confirmSignUpPhoneNumber",
        controller,
      ),
    ),
    verifySignUpNumber: builder.mutation<ResponseAuthModel, RequestAuthModel>(
      apiConfig.getStaticData<ControllerType>("verifySignUpNumber", controller),
    ),
    verifySignInNumber: builder.mutation<ResponseAuthModel, void>(
      apiConfig.getStaticData<ControllerType>("verifySignInNumber", controller),
    ),
    switchUserOrganization: builder.mutation<any, any>(
      apiConfig.getStaticData<ControllerType>(
        "switchUserOrganization",
        controller,
      ),
    ),
  }),
});

export const { endpoints, ...AuthApiHooks } = AuthApiService;
export default AuthApiHooks;
