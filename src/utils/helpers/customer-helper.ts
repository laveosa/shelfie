import { CustomerModel } from "@/const/models/CustomerModel";
import { CustomerRequestModel } from "@/const/models/CustomerRequestModel";

export function convertCustomerToRequestModel(
  customer: CustomerModel,
): CustomerRequestModel {
  return {
    firstName: customer.firstName,
    lastName: customer.lastName,
    email: customer.email,
    phoneNumber: customer.phoneNumber,
  };
}

export function createCustomerRequestModel(
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
): CustomerRequestModel {
  return {
    firstName,
    lastName,
    email,
    phoneNumber,
  };
}
