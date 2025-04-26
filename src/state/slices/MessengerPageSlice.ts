import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IMessengerPageSlice } from "@/const/interfaces/store-slices/IMessengerPageSlice.ts";
import { MessengerResponseModel } from "@/const/models/MessengerResponseModel.ts";

const initialState: IMessengerPageSlice = {
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
};

function refreshMessengerResponseModel(
  state: IMessengerPageSlice,
  action: PayloadAction<MessengerResponseModel>,
) {
  state.messengerResponseModel =
    action?.payload || state.messengerResponseModel;
}

const MessengerPageSlice = createSlice({
  name: StoreSliceEnum.MESSENGER,
  initialState,
  reducers: { refreshMessengerResponseModel },
});

export const MessengerPageSliceActions = MessengerPageSlice.actions;
export default MessengerPageSlice;
