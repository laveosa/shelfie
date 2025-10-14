export interface PurchaseProductsModel {
  nettoPrice?: number;
  currencyId?: number;
  taxTypeId?: number;
  unitsAmount?: number;
}

export const PurchaseProductsModelDefault: PurchaseProductsModel = {
  nettoPrice: undefined,
  currencyId: undefined,
  taxTypeId: undefined,
  unitsAmount: undefined,
};
