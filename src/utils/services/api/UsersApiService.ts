import { createApi } from "@reduxjs/toolkit/query/react";

import { ApiServiceNameEnum } from "@/const/enums/ApiServiceNameEnum.ts";
import { ApiUrlEnum } from "@/const/enums/ApiUrlEnum.ts";
import { ApiConfigurationService as apiConfig } from "@/utils/services/api/ApiConfigurationService.ts";
import { PreferencesModel } from "@/const/models/PreferencesModel.ts";

export const UsersApiService = createApi({
  reducerPath: ApiServiceNameEnum.USERS,
  baseQuery: (args: any, api: any, extraOptions: any) =>
    apiConfig.baseQueryWithInterceptors(
      {
        ...args,
        baseUrl: ApiUrlEnum.USERS_BASE_URL,
      },
      api,
      extraOptions,
    ),
  tagTypes: [ApiServiceNameEnum.USERS],
  endpoints: (builder) => ({
    getUserPreferences: apiConfig.createQuery<PreferencesModel, void>(builder, {
      query: () => ({
        url: ApiUrlEnum.PREFERENCES,
      }),
      // transformResponse: (res: any) => res.products, //TODO delete this code after we will receive real data
      providesTags: (result: PreferencesModel) =>
        apiConfig.providesTags<PreferencesModel>(
          result,
          ApiServiceNameEnum.USERS,
        ),
    }),
    updateUserPreferences: apiConfig.createMutation<void, PreferencesModel>(
      builder,
      {
        query: (model: PreferencesModel) => ({
          url: ApiUrlEnum.PREFERENCES,
          method: "PATCH",
          body: JSON.stringify(model),
        }),
        invalidatesTags: (result) => [
          {
            type: ApiServiceNameEnum.USERS,
            result,
          },
        ],
      },
    ),
    resetUserPreferences: apiConfig.createMutation<void, void>(builder, {
      query: () => ({
        url: `${ApiUrlEnum.PREFERENCES}/reset`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        {
          type: ApiServiceNameEnum.USERS,
          id,
        },
      ],
    }),
  }),
});

export const { endpoints, ...UsersApiHooks } = UsersApiService;
export default UsersApiHooks;
