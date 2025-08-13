export interface CustomerCounterModel {
  addressesAmount?: number;
  openCartsAmount?: number;
  ordersAmount?: number;
}

export const DEFAULT_CUSTOMER_COUNTER: CustomerCounterModel = {
  addressesAmount: undefined,
  openCartsAmount: undefined,
  ordersAmount: undefined
};

export function createCustomerCounter(partial?: Partial<CustomerCounterModel>): CustomerCounterModel {
  return { ...DEFAULT_CUSTOMER_COUNTER, ...partial };
}