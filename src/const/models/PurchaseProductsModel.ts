export interface PurchaseProductsModel {
  nettoPrice?: number;
  currencyId?: number;
  taxTypeId?: number;
  unitsAmount?: string;
}

export const PurchaseProductsModelDefault: PurchaseProductsModel = {
  nettoPrice: undefined,
  currencyId: undefined,
  taxTypeId: undefined,
  unitsAmount: undefined,
};
