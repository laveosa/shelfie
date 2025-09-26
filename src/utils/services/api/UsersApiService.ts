import { createApi } from "@reduxjs/toolkit/query/react";

import { ApiServiceNameEnum } from "@/const/enums/ApiServiceNameEnum.ts";
import { ApiUrlEnum } from "@/const/enums/ApiUrlEnum.ts";
import { ApiConfigurationService } from "@/utils/services/api/ApiConfigurationService.ts";
import { PreferencesModel } from "@/const/models/PreferencesModel.ts";
import { UserModel } from "@/const/models/UserModel.ts";
import { PasswordModel } from "@/const/models/PasswordModel.ts";
import { LanguageModel } from "@/const/models/LanguageModel.ts";

const apiConfig = new ApiConfigurationService(ApiUrlEnum.USERS_BASE_URL);

export const UsersApiService = createApi({
  reducerPath: ApiServiceNameEnum.USERS,
  baseQuery: apiConfig.baseQueryWithInterceptors,
  tagTypes: [ApiServiceNameEnum.USERS],
  endpoints: (builder) => ({
    getUserPreferences: apiConfig.createQuery<PreferencesModel, void>(builder, {
      query: () => ({
        url: ApiUrlEnum.PREFERENCES,
        responseType: "json",
      }),
      providesTags: (result, _error, _id) => [
        {
          type: ApiServiceNameEnum.USERS,
          result,
        },
      ],
    }),
    getDefaultUserPreferences: apiConfig.createQuery<PreferencesModel, void>(
      builder,
      {
        query: () => ({
          url: `${ApiUrlEnum.PREFERENCES}/default`,
        }),
        providesTags: (_result, _error, _id) => [
          {
            type: ApiServiceNameEnum.USERS,
          },
        ],
      },
    ),
    updateUserPreferences: apiConfig.createMutation<void, PreferencesModel>(
      builder,
      {
        query: (model: PreferencesModel) => ({
          url: ApiUrlEnum.PREFERENCES,
          method: "PATCH",
          body: JSON.stringify(model),
        }), //TODO - invalidation needs to be conditional. No need to fire a request when the state has not changed.
        invalidatesTags: (result) => [
          {
            type: ApiServiceNameEnum.USERS,
            result,
          },
        ],
      },
    ),
    resetUserPreferences: apiConfig.createMutation<void, any>(builder, {
      query: (grid: string) => ({
        url: `${ApiUrlEnum.PREFERENCES}/reset/${grid}`,
        method: "PATCH",
      }),
    }),
    getUserDetails: apiConfig.createQuery<UserModel, void>(builder, {
      query: () => ({
        url: `${ApiUrlEnum.USERS}/info`,
        responseType: "json",
      }),
    }),
    updateUserContactInformation: apiConfig.createMutation<void, any>(builder, {
      query: (model: UserModel) => ({
        url: `${ApiUrlEnum.USERS}/`,
        method: "PATCH",
        body: JSON.stringify(model),
      }),
    }),
    updateUserPassword: apiConfig.createMutation<void, any>(builder, {
      query: (model: PasswordModel) => ({
        url: `${ApiUrlEnum.USERS}/change-password`,
        method: "PATCH",
        body: JSON.stringify(model),
      }),
    }),
    changeLanguage: apiConfig.createMutation<void, any>(builder, {
      query: (model: LanguageModel) => ({
        url: `${ApiUrlEnum.USERS}/change-language`,
        method: "PATCH",
        body: JSON.stringify(model),
      }),
    }),
    getUserOrganizations: apiConfig.createQuery<UserModel, void>(builder, {
      query: () => ({
        url: `${ApiUrlEnum.ORGANIZATIONS}/list`,
      }),
    }),
  }),
});

export const { endpoints, ...UsersApiHooks } = UsersApiService;
export default UsersApiHooks;
