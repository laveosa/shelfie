import { ShipmentModel } from "@/const/models/ShipmentModel.ts";

export interface IShipmentConfigurationCard {
  isLoading?: boolean;
  shipment?: ShipmentModel;
  orders?: any[];
  onAction?: (identifier: string, payload?: any) => void;
}
