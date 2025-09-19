export interface PurchaseProductsModel {
  nettoPrice?: number;
  currencyId?: number;
  taxTypeId?: number;
  unitsAmount?: number;
}

export const PurchaseProductsModelDefault: PurchaseProductsModel = {
  nettoPrice: 0,
  currencyId: undefined,
  taxTypeId: undefined,
  unitsAmount: 0,
};
