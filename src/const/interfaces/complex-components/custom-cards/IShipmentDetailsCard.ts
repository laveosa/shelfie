export interface IShipmentDetailsCard {
  isLoading?: boolean;
  isProductsGridLoading?: boolean;
  isShipmentsGridLoading?: boolean;
  products?: any[];
  shipments?: any[];
  onAction?: (identifier: string, payload?: any) => void;
}
