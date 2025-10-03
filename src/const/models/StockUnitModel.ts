export interface StockUnitModel {
  unitAmount?: number;
  priceModel?: {
    price?: number;
    taxTypeId?: number;
    priceType?: number;
    currencyId?: number;
  };
  purchaseId?: number;
}

export const StockUnitModelDefaultModel: StockUnitModel = {
  unitAmount: undefined,
  priceModel: {
    price: undefined,
    taxTypeId: undefined,
    priceType: undefined,
    currencyId: undefined,
  },
  purchaseId: undefined,
};
