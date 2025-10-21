import { ShipmentModel } from "@/const/models/ShipmentModel.ts";
import { DeliveryServiceModel } from "@/const/models/DeliveryServiceModel.ts";

export interface IShipmentConfigurationCard {
  isLoading?: boolean;
  shipment?: ShipmentModel;
  orders?: any[];
  deliveryServices?: DeliveryServiceModel[];
  onAction?: (identifier: string, payload?: any) => void;
}
