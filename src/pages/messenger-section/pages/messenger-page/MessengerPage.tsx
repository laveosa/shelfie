import { useEffect } from "react";
import cs from "./MessengerPage.module.scss";
import { MessengerPageSliceActions as actions } from "@/state/slices/MessengerPageSlice.ts";
import useMessengerPageService from "@/pages/messenger-section/pages/messenger-page/useMessengerPageService.ts";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IMessengerPageSlice } from "@/const/interfaces/store-slices/IMessengerPageSlice.ts";
import MessengerListCard from "@/components/complex/custom-cards/messenger-list-card/MessengerListCard.tsx";
import MessengerConversationCard from "@/components/complex/custom-cards/messenger-conversation-card/MessengerConversationCard.tsx";

export function MessengerPage() {
  const dispatch = useAppDispatch();
  const state = useAppSelector<IMessengerPageSlice>(StoreSliceEnum.MESSENGER);
  const service = useMessengerPageService();

  useEffect(() => {
    service.listOfChatsHandler(state.messengerRequestModel).then((res) => {
      dispatch(actions.refreshMessengerResponseModel(res));
    });
  }, []);

  function handleCardAction(
    identifier: string,
    clickedChatId: string | number,
  ) {
    const chatCardIdentifier = `${identifier}-${clickedChatId}`;
    const isAlreadyOpen = state.activeCards.includes(chatCardIdentifier);

    if (!isAlreadyOpen) {
      const newActiveCards = [...state.activeCards, chatCardIdentifier];
      dispatch(actions.refreshActiveCards(newActiveCards));
    } else {
      const updatedCards = state.activeCards.filter(
        (card) => card !== chatCardIdentifier,
      );
      dispatch(actions.refreshActiveCards(updatedCards));
    }
  }

  function onAction(actionIdentifier: string, payload?: any) {
    switch (actionIdentifier) {
      case "chatListSearch":
        console.log("Search payload:", payload);
        const updatedRequestModel = {
          ...state.messengerRequestModel,
          searchQuery: payload.value,
        };
        service.listOfChatsHandler(updatedRequestModel).then((res) => {
          dispatch(actions.refreshMessengerResponseModel(res));
        });
        break;
      case "onChatClick":
        if (!payload || !payload.userId) {
          return;
        }
        dispatch(actions.refreshSelectedChat(payload));
        handleCardAction("messengerConversationCard", payload.userId);
        break;
      case "onAvatarClick":
        console.log("AVATAR", payload);
        break;
      case "sendMessage":
        break;
    }
  }

  return (
    <div className={cs.messengerPage} style={{ padding: "20px" }}>
      <MessengerListCard
        chats={state.messengerResponseModel.items}
        selectedChat={state.selectedChat?.userId}
        onAction={onAction}
      />

      {state.activeCards
        .filter((card) => card.startsWith("messengerConversationCard-"))
        .map((card) => {
          const userId = card.split("-")[1];
          const chat = state.messengerResponseModel.items.find((c) => {
            return String(c.userId) === userId;
          });
          if (!chat) {
            return null;
          }
          return (
            <MessengerConversationCard
              key={card}
              chat={chat}
              onAction={onAction}
              onReceiveConversation={
                service.getMessagesFromCurrentConversationHandler
              }
            />
          );
        })}
    </div>
  );
}
