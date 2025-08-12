import { CustomerModel } from "@/const/models/CustomerModel.ts";
import { AddressModel } from "@/const/models/AddressModel.ts";
import { DeliveryServiceModel } from "@/const/models/DeliveryServiceModel.ts";

export interface ShipmentModel {
  shipmentId?: number;
  customerId?: number;
  customer?: CustomerModel;
  queueDate?: string;
  queueShipment?: string;
  shipmentStatus?: string;
  deliveryAddressId?: number;
  deliveryAddress?: AddressModel;
  quantityPacked?: number;
  deliveryServiceId?: number;
  deliveryService?: DeliveryServiceModel;
}
