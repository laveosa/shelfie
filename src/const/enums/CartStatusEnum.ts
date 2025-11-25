export enum CartStatusEnum {
  DRAFT = "Draft",
  NEW = "New",
  EXPIRED = "Expired",
  CLOSED = "Closed",
}

export const CartStatusLabels: Record<CartStatusEnum, string> = {
  [CartStatusEnum.DRAFT]: "Draft",
  [CartStatusEnum.NEW]: "New",
  [CartStatusEnum.EXPIRED]: "Expired",
  [CartStatusEnum.CLOSED]: "Closed",
};
