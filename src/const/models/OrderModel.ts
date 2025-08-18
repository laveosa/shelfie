import { CurrencyModel } from "@/const/models/CurrencyModel.ts";
import { CustomerModel } from "@/const/models/CustomerModel.ts";
import { OrderSubtotalModel } from "@/const/models/OrderSubtotalModel.ts";

export interface OrderModel {
  id?: number;
  customerId?: number;
  customer?: CustomerModel;
  date?: string;
  channel?: string;
  orderStatus?: string;
  paymentStatus?: string;
  shipmentStatus?: string;
  count?: number;
  value?: number;
  income?: number;
  currency?: CurrencyModel;
  discounts?: any[];
  orderSubTotal?: OrderSubtotalModel;
  discountAmount?: string;
}
