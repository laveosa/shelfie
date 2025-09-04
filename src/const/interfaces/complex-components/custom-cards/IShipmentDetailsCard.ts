import { CustomerModel } from "@/const/models/CustomerModel.ts";

export interface IShipmentDetailsCard {
  isLoading?: boolean;
  isProductsGridLoading?: boolean;
  isShipmentsGridLoading?: boolean;
  products?: any[];
  shipments?: any[];
  customer?: CustomerModel;
  onAction?: (identifier: string, payload?: any) => void;
}
