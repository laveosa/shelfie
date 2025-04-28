import { MessengerRequestModel } from "@/const/models/MessengerRequestModel.ts";
import { MessengerResponseModel } from "@/const/models/MessengerResponseModel.ts";
import { MessengerListItem } from "@/const/models/MessengerListItem.ts";

export interface IMessengerPageSlice {
  loading?: boolean;
  activeCards?: any[];
  messengerRequestModel?: MessengerRequestModel;
  messengerResponseModel?: MessengerResponseModel;
  selectedChat?: MessengerListItem;
}
