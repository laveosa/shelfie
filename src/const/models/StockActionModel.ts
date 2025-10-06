export interface StockActionModel {
  currencyId: number;
  nettoPrice: number;
  taxTypeId: number;
  unitsAmount: number;
}

export const StockActionDefaultModel: StockActionModel = {
  currencyId: undefined,
  nettoPrice: undefined,
  taxTypeId: undefined,
  unitsAmount: undefined,
};
