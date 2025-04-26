import { MessengerListItem } from "@/const/models/MessengerListItem.ts";

export interface IMessengerConversationCard {
  chat?: MessengerListItem;
  onAction?: (identifier: string, payload?: any) => void;
}
