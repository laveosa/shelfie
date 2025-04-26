import { createApi } from "@reduxjs/toolkit/query/react";

import { ApiServiceNameEnum } from "@/const/enums/ApiServiceNameEnum.ts";
import { ApiConfigurationService } from "@/utils/services/api/ApiConfigurationService.ts";
import { ApiUrlEnum } from "@/const/enums/ApiUrlEnum.ts";

const apiConfig = new ApiConfigurationService(ApiUrlEnum.MESSENGER_BASE_URL);

export const MessengerApiService = createApi({
  reducerPath: ApiServiceNameEnum.MESSENGER,
  baseQuery: apiConfig.baseQueryWithInterceptors,
  tagTypes: [ApiServiceNameEnum.MESSENGER],
  endpoints: (builder) => ({
    getMessagesFromUser: apiConfig.createMutation<any, any>(builder, {
      query: ({ userId, model }) => ({
        url: `${ApiUrlEnum.MESSENGER}${ApiUrlEnum.CONVERSATIONS}/by-user/${userId}`,
        method: "POST",
        body: JSON.stringify(model),
      }),
    }),
    sendMessage: apiConfig.createMutation<any, any>(builder, {
      query: ({ senderId, model }) => ({
        url: `${ApiUrlEnum.MESSENGER}/send-message/to/${senderId}`,
        method: "POST",
        body: JSON.stringify(model),
      }),
    }),
    listOfChats: apiConfig.createMutation<any, any>(builder, {
      query: (model) => ({
        url: `${ApiUrlEnum.MESSENGER}${ApiUrlEnum.CONVERSATIONS}/list`,
        method: "POST",
        body: JSON.stringify(model),
      }),
    }),
  }),
});

export const { endpoints, ...MessengerApiHooks } = MessengerApiService;
export default MessengerApiHooks;
