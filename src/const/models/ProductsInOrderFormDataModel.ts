export interface StockDocumentPriceModel {
  brutto?: number;
}

export interface ProductsInOrderFormDataModel {
  stockDocumentPrice?: StockDocumentPriceModel;
  unitsAmount?: number;
  total?: number;
}

export const ProductsInOrderFormDataDefaultModel: ProductsInOrderFormDataModel =
  {
    stockDocumentPrice: undefined,
    unitsAmount: undefined,
    total: undefined,
  };
