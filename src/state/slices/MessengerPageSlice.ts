import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IMessengerPageSlice } from "@/const/interfaces/store-slices/IMessengerPageSlice.ts";
import { MessengerResponseModel } from "@/const/models/MessengerResponseModel.ts";
import { MessengerListItem } from "@/const/models/MessengerListItem.ts";

const initialState: IMessengerPageSlice = {
  activeCards: [],
  messengerRequestModel: {
    limit: 100,
    continuationToken: "",
    searchQuery: "",
  },
  messengerResponseModel: {
    continuationToken: "",
    searchQuery: "",
    items: [],
  },
  selectedChat: null,
};

function refreshActiveCards(
  state: IMessengerPageSlice,
  action: PayloadAction<any[]>,
) {
  state.activeCards = action?.payload || state.activeCards;
}

function refreshMessengerResponseModel(
  state: IMessengerPageSlice,
  action: PayloadAction<MessengerResponseModel>,
) {
  state.messengerResponseModel =
    action?.payload || state.messengerResponseModel;
}

function refreshSelectedChat(
  state: IMessengerPageSlice,
  action: PayloadAction<MessengerListItem>,
) {
  state.selectedChat = action?.payload || state.selectedChat;
}

const MessengerPageSlice = createSlice({
  name: StoreSliceEnum.MESSENGER,
  initialState,
  reducers: {
    refreshActiveCards,
    refreshMessengerResponseModel,
    refreshSelectedChat,
  },
});

export const MessengerPageSliceActions = MessengerPageSlice.actions;
export default MessengerPageSlice;
