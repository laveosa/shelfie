export interface PurchaseProductsModel {
  nettoPrice?: number;
  currencyId?: number;
  taxTypeId?: number;
  unitsAmount?: number;
}

export const PurchaseProductsModelDefault: PurchaseProductsModel = {
  nettoPrice: null,
  currencyId: undefined,
  taxTypeId: undefined,
  unitsAmount: null,
};
