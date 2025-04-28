import { createApi } from "@reduxjs/toolkit/query/react";

import { ApiConfigurationService } from "@/utils/services/api/ApiConfigurationService.ts";
import { ApiServiceNameEnum } from "@/const/enums/ApiServiceNameEnum.ts";
import { ApiUrlEnum } from "@/const/enums/ApiUrlEnum.ts";

const apiConfig = new ApiConfigurationService(ApiUrlEnum.FACEBOOK_BASE_URL);

export const FacebookApiService = createApi({
  reducerPath: ApiServiceNameEnum.FACEBOOK,
  baseQuery: apiConfig.baseQueryWithInterceptors,
  tagTypes: [ApiServiceNameEnum.FACEBOOK],
  endpoints: (builder) => ({
    getMessagesFromCurrentConversation: apiConfig.createQuery<any, any>(
      builder,
      {
        query: (conversationId) => ({
          url: `/${conversationId}/messages`,
        }),
      },
    ),
  }),
});

export const { endpoints, ...FacebookApiHooks } = FacebookApiService;
export default FacebookApiHooks;
