import MessengerApiHooks from "@/utils/services/api/MessengerApiService.ts";
import FacebookApiHooks from "@/utils/services/api/FacebookApiService.ts";

export default function useMessengerPageService() {
  const [getMessagesFromUser] =
    MessengerApiHooks.useGetMessagesFromUserMutation();
  const [sendMessage] = MessengerApiHooks.useSendMessageMutation();
  const [listOfChats] = MessengerApiHooks.useListOfChatsMutation();
  const [getMessagesFromCurrentConversation] =
    FacebookApiHooks.useLazyGetMessagesFromCurrentConversationQuery();

  function getMessagesFromUserHandler(userId, model) {
    return getMessagesFromUser({ userId, model }).then((res: any) => {
      return res;
    });
  }

  function sendMessageHandler(senderId, model) {
    return sendMessage({ senderId, model }).then((res: any) => {
      return res;
    });
  }

  function listOfChatsHandler(model) {
    return listOfChats(model).then((res: any) => {
      return res.data;
    });
  }

  function getMessagesFromCurrentConversationHandler(model) {
    return getMessagesFromCurrentConversation(model).then((res: any) => {
      return res;
    });
  }

  return {
    getMessagesFromUserHandler,
    sendMessageHandler,
    listOfChatsHandler,
    getMessagesFromCurrentConversationHandler,
  };
}
