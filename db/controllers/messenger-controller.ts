import { BaseController } from "./base-controller";

import messagesFromUser from "../static-collections/Messanger/messages-from-user.json";
import message from "../static-collections/Messanger/message.json";
import listOfChatsModel from "../static-collections/Messanger/list-of-chats.json";

export class MessengerController extends BaseController {
  public static getCountryCode() {
    return this.staticDataApiHandler(messagesFromUser);
  }

  public static sendMessage() {
    return this.staticDataApiHandler(message);
  }

  public static listOfChats() {
    return this.staticDataApiHandler(listOfChatsModel);
  }
}
