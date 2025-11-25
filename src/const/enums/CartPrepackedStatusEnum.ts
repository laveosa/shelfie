export enum CartPrepackedStatusEnum {
  PREPACKED = "Prepacked",
  NOT_PREPACKED = "NotPrepacked",
}

export const CartPrepackedStatusLabels: Record<
  CartPrepackedStatusEnum,
  string
> = {
  [CartPrepackedStatusEnum.PREPACKED]: "Prepacked",
  [CartPrepackedStatusEnum.NOT_PREPACKED]: "Not prepacked",
};
