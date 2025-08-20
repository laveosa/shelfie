export interface CounterModel {
  gallery?: number;
  variants?: number;
  attributes?: number;
  invoicesAmount?: number;
  productsAmount?: number;
  purchaseId?: number;
  products?: number;
}

export interface ProductCountersModel
  extends Pick<CounterModel, "gallery" | "variants" | "attributes"> {}

export interface PurchaseCountersModel
  extends Pick<
    CounterModel,
    "invoicesAmount" | "productsAmount" | "purchaseId"
  > {}
export interface OrderCountersModel extends Pick<CounterModel, "products"> {}
