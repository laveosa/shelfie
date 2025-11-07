import { createApi } from "@reduxjs/toolkit/query/react";

import { AssetsController as controller } from "db/controllers/assets-controller.ts";
import { ApiServiceNameEnum } from "@/const/enums/ApiServiceNameEnum.ts";
import { ApiConfigurationService } from "@/utils/services/api/ApiConfigurationService.ts";
import { ApiUrlEnum } from "@/const/enums/ApiUrlEnum.ts";

const apiConfig = new ApiConfigurationService(ApiUrlEnum.ASSETS_BASE_URL);
type ControllerType = typeof controller;

export const AssetsApiService = createApi({
  reducerPath: ApiServiceNameEnum.ASSETS,
  baseQuery: async () => ({ date: undefined }),
  // baseQuery: apiConfig.baseQueryWithInterceptors,
  tagTypes: [ApiServiceNameEnum.ASSETS],
  endpoints: (builder) => ({
    uploadPhoto: builder.mutation<void, any>(
      apiConfig.getStaticData<ControllerType>("uploadPhoto", controller),
    ),
    deletePhoto: builder.mutation<void, number>(
      apiConfig.getStaticData<ControllerType>("deletePhoto", controller),
    ),
    downloadAsset: builder.query<Blob, number>(
      apiConfig.getStaticData<ControllerType>("downloadAsset", controller),
    ),
    setPhotoActivationState: builder.mutation<
      any,
      {
        contextName?: string;
        contextId?: number;
        photoId?: number;
        model?: any;
      }
    >(
      apiConfig.getStaticData<ControllerType>(
        "setPhotoActivationState",
        controller,
      ),
    ),
  }),
});

export const { endpoints, ...AssetsApiHooks } = AssetsApiService;
export default AssetsApiHooks;
