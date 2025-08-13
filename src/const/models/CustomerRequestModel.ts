export interface CustomerRequestModel {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
}

export const CustomerRequestModelDefault: CustomerRequestModel = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
}; 
