import { useEffect } from "react";

import cs from "./MessengerPage.module.scss";
import { MessengerPageSliceActions as actions } from "@/state/slices/MessengerPageSlice.ts";
import useMessengerPageService from "@/pages/messenger-section/pages/messenger-page/useMessengerPageService.ts";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IMessengerPageSlice } from "@/const/interfaces/store-slices/IMessengerPageSlice.ts";
import MessengerListCard from "@/components/complex/custom-cards/messenger-list-card/MessengerListCard.tsx";

export function MessengerPage() {
  const dispatch = useAppDispatch();
  const state = useAppSelector<IMessengerPageSlice>(StoreSliceEnum.MESSENGER);
  const service = useMessengerPageService();

  useEffect(() => {
    service.listOfChatsHandler(state.messengerRequestModel).then((res) => {
      console.log(res);
      dispatch(actions.refreshMessengerResponseModel(res));
    });
  }, []);

  function onAction(actionIdentifier: string, payload?: any) {
    switch (actionIdentifier) {
      case "chatListSearch":
        console.log(payload);
        const updatedRequestModel = {
          ...state.messengerRequestModel,
          searchQuery: payload.value,
        };
        console.log(updatedRequestModel);
        service.listOfChatsHandler(updatedRequestModel).then((res) => {
          console.log(res);
          dispatch(actions.refreshMessengerResponseModel(res));
        });
        break;
      case "onChatClick":
        console.log("CHAT", payload);
        break;
      case "onAvatarClick":
        console.log("AVATAR", payload);
        break;
    }
  }

  return (
    <div id={cs.messengerPage}>
      <MessengerListCard
        chats={state.messengerResponseModel.items}
        onAction={onAction}
      />
    </div>
  );
}
