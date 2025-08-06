import { CustomerModel } from "@/const/models/CustomerModel";
import { CustomerRequestModel } from "@/const/models/CustomerRequestModel";

/**
 * Converts a CustomerModel to CustomerRequestModel
 * Extracts only the fields needed for API requests: firstName, lastName, email, phoneNumber
 * @param customer - The CustomerModel to convert
 * @returns CustomerRequestModel with the required fields
 */
export function convertCustomerToRequestModel(customer: CustomerModel): CustomerRequestModel {
    return {
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        phoneNumber: customer.phoneNumber,
    };
}

/**
 * Creates a CustomerRequestModel from individual fields
 * Useful when creating a new customer from form data
 * @param firstName - Customer's first name
 * @param lastName - Customer's last name
 * @param email - Customer's email address
 * @param phoneNumber - Customer's phone number
 * @returns CustomerRequestModel
 */
export function createCustomerRequestModel(
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string
): CustomerRequestModel {
    return {
        firstName,
        lastName,
        email,
        phoneNumber,
    };
} 