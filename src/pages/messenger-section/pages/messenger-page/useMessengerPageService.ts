import MessengerApiHooks from "@/utils/services/api/MessengerApiService.ts";

export default function useMessengerPageService() {
  const [getMessagesFromUser] =
    MessengerApiHooks.useGetMessagesFromUserMutation();
  const [sendMessage] = MessengerApiHooks.useSendMessageMutation();
  const [listOfChats] = MessengerApiHooks.useListOfChatsMutation();

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

  return {
    getMessagesFromUserHandler,
    sendMessageHandler,
    listOfChatsHandler,
  };
}
