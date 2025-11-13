import { createApi } from "@reduxjs/toolkit/query/react";

import { MessengerController as controller } from "db/controllers/messenger-controller.ts";
import { ApiServiceNameEnum } from "@/const/enums/ApiServiceNameEnum.ts";
import { ApiConfigurationService } from "@/utils/services/api/ApiConfigurationService.ts";
import { ApiUrlEnum } from "@/const/enums/ApiUrlEnum.ts";

const apiConfig = new ApiConfigurationService(ApiUrlEnum.MESSENGER_BASE_URL);
type ControllerType = typeof controller;

export const MessengerApiService = createApi({
  reducerPath: ApiServiceNameEnum.MESSENGER,
  baseQuery: async () => ({ data: undefined }),
  // baseQuery: apiConfig.baseQueryWithInterceptors,
  tagTypes: [ApiServiceNameEnum.MESSENGER],
  endpoints: (builder) => ({
    getMessagesFromUser: builder.mutation<any, any>(
      apiConfig.getStaticData<ControllerType>(
        "getMessagesFromUser",
        controller,
      ),
    ),
    sendMessage: builder.mutation<any, any>(
      apiConfig.getStaticData<ControllerType>("sendMessage", controller),
    ),
    listOfChats: builder.mutation<any, any>(
      apiConfig.getStaticData<ControllerType>("listOfChats", controller),
    ),
  }),
});

export const { endpoints, ...MessengerApiHooks } = MessengerApiService;
export default MessengerApiHooks;
