import { createApi } from "@reduxjs/toolkit/query/react";

import { UsersController as controller } from "db/controllers/users-controller.ts";
import { ApiConfigurationService } from "@/utils/services/api/ApiConfigurationService.ts";
import { ApiUrlEnum } from "@/const/enums/ApiUrlEnum.ts";
import { ApiServiceNameEnum } from "@/const/enums/ApiServiceNameEnum.ts";
import { PreferencesModel } from "@/const/models/PreferencesModel.ts";
import { UserModel } from "@/const/models/UserModel.ts";

const apiConfig = new ApiConfigurationService(ApiUrlEnum.USERS_BASE_URL);
type ControllerType = typeof controller;

export const UsersApiService = createApi({
  reducerPath: ApiServiceNameEnum.USERS,
  baseQuery: async () => ({ data: undefined }),
  // baseQuery: apiConfig.baseQueryWithInterceptors,
  tagTypes: [ApiServiceNameEnum.USERS],
  endpoints: (builder) => ({
    getUserPreferences: builder.query<PreferencesModel, void>(
      apiConfig.getStaticData<ControllerType>("getUserPreferences", controller),
    ),
    getDefaultUserPreferences: builder.query<PreferencesModel, void>(
      apiConfig.getStaticData<ControllerType>(
        "getDefaultUserPreferences",
        controller,
      ),
    ),
    updateUserPreferences: builder.mutation<void, PreferencesModel>(
      apiConfig.getStaticData<ControllerType>(
        "updateUserPreferences",
        controller,
      ),
    ),
    resetUserPreferences: builder.mutation<void, PreferencesModel>(
      apiConfig.getStaticData<ControllerType>(
        "resetUserPreferences",
        controller,
      ),
    ),
    getUserDetails: builder.query<UserModel, void>(
      apiConfig.getStaticData<ControllerType>("getUserDetails", controller),
    ),
    updateUserContactInformation: builder.mutation<void, any>(
      apiConfig.getStaticData<ControllerType>(
        "updateUserContactInformation",
        controller,
      ),
    ),
    updateUserPassword: builder.mutation<void, any>(
      apiConfig.getStaticData("updateUserPassword", controller),
    ),
    changeLanguage: builder.mutation<void, any>(
      apiConfig.getStaticData<ControllerType>("changeLanguage", controller),
    ),
    getUserOrganizations: builder.query<UserModel, void>(
      apiConfig.getStaticData<ControllerType>(
        "getUserOrganization",
        controller,
      ),
    ),
  }),
});

export const { endpoints, ...UsersApiHooks } = UsersApiService;
export default UsersApiHooks;
