import { CustomerModel } from "@/const/models/CustomerModel.ts";
import { AddressModel } from "@/const/models/AddressModel.ts";
import { DeliveryServiceModel } from "@/const/models/DeliveryServiceModel.ts";
import { OrderItemModel } from "@/const/models/OrderItemModel.ts";
import { OrderModel } from "@/const/models/OrderModel.ts";
import { ShipmentHistoryModel } from "@/const/models/ShipmentHistoryModel.ts";

export interface ShipmentModel {
  shipmentId?: number;
  customerId?: number;
  customer?: CustomerModel;
  queueDate?: string;
  queueShipment?: string;
  queuePacking?: string;
  shipmentStatus?: string;
  deliveryAddressId?: number;
  deliveryAddress?: AddressModel;
  quantityPacked?: number;
  deliveryServiceId?: number;
  deliveryService?: DeliveryServiceModel;
  orderItems?: OrderItemModel[];
  shipmentItems?: OrderItemModel[];
  orders?: OrderModel[];
  history?: ShipmentHistoryModel[];
  createdAt?: string;
  trackNumber?: number;
}
