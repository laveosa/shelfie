import { MessengerListItem } from "@/const/models/MessengerListItem.ts";

export interface MessengerResponseModel {
  searchQuery?: string;
  continuationToken?: string;
  items?: MessengerListItem[];
}
