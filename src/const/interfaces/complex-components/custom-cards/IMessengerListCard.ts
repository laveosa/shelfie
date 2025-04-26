import { MessengerListItem } from "@/const/models/MessengerListItem.ts";

export interface IMessengerListCard {
  chats?: MessengerListItem[];
  onAction?: (identifier: string, payload?: any) => void;
}
