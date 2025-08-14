export interface CustomerModel {
  id: number;
  customerId?: number;
  customerName?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  rank?: string;
  createdAt?: string;
  lastOrderDate?: string | null;
  thumbnailUrl?: string | null;
  name?: string;
  phone?: string;
}
