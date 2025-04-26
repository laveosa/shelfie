import { MessengerRequestModel } from "@/const/models/MessengerRequestModel.ts";
import { MessengerResponseModel } from "@/const/models/MessengerResponseModel.ts";

export interface IMessengerPageSlice {
  loading?: boolean;
  messengerRequestModel?: MessengerRequestModel;
  messengerResponseModel?: MessengerResponseModel;
}
