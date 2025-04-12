import { createApi } from "@reduxjs/toolkit/query/react";

import { ApiServiceNameEnum } from "@/const/enums/ApiServiceNameEnum.ts";
import { ApiConfigurationService } from "@/utils/services/api/ApiConfigurationService.ts";
import { ApiUrlEnum } from "@/const/enums/ApiUrlEnum.ts";
import { UploadPhotoModel } from "@/const/models/UploadPhotoModel.ts";

const apiConfig = new ApiConfigurationService(ApiUrlEnum.ASSETS_BASE_URL);

export const AssetsApiService = createApi({
  reducerPath: ApiServiceNameEnum.ASSETS,
  baseQuery: apiConfig.baseQueryWithInterceptors,
  tagTypes: [ApiServiceNameEnum.ASSETS],
  endpoints: (builder) => ({
    uploadPhoto: apiConfig.createMutation<void, any>(builder, {
      query: (model: UploadPhotoModel) => {
        return {
          url: `${ApiUrlEnum.ASSETS_BASE_URL}${ApiUrlEnum.ASSET}/${model.contextName}/${model.contextId}/upload-photo`,
          method: "POST",
          body: model.file,
        };
      },
      invalidatesTags: (_result, _error, file) => [
        {
          type: ApiServiceNameEnum.ASSETS,
          file,
        },
      ],
    }),
    deletePhoto: apiConfig.createMutation<void, number>(builder, {
      query: (id: number) => ({
        url: `${ApiUrlEnum.ASSETS_BASE_URL}${ApiUrlEnum.ASSET}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        {
          type: ApiServiceNameEnum.ASSETS,
          id,
        },
      ],
    }),
  }),
});

export const { endpoints, ...AssetsApiHooks } = AssetsApiService;
export default AssetsApiHooks;
