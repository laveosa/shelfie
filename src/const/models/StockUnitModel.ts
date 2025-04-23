export interface StockUnitModel {
  unitAmount?: number;
  priceModel?: {
    price?: number;
    taxTypeId?: number;
    priceType?: "string";
    currencyId?: number;
  };
  purchaseId?: number;
}
