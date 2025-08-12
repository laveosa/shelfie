import { ShipmentModel } from "@/const/models/ShipmentModel.ts";

export interface IShipmentConfigurationCard {
  isLoading?: boolean;
  shipment?: ShipmentModel;
  onAction?: (identifier: string, payload?: any) => void;
}
