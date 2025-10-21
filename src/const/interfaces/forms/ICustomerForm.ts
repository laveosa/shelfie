import { CustomerRequestModel } from "@/const/models/CustomerRequestModel.ts";

export interface ICustomerForm {
  data: CustomerRequestModel;
  isCreate: boolean;
  onSubmit: (data: CustomerRequestModel) => void;
  onCancel: () => void;
}
