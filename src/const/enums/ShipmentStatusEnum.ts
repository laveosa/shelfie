export enum ShipmentStatusEnum {
  NONE = "None",
  NEW = "New",
  PACKING_PENDING = "PackingPending",
  DELIVERY_PENDING = "DeliveryPending",
  COMPLETED = "Completed",
}

export const ShipmentStatusLabels: Record<ShipmentStatusEnum, string> = {
  [ShipmentStatusEnum.NONE]: "No Status",
  [ShipmentStatusEnum.NEW]: "New",
  [ShipmentStatusEnum.PACKING_PENDING]: "Packing Pending",
  [ShipmentStatusEnum.DELIVERY_PENDING]: "Delivery Pending",
  [ShipmentStatusEnum.COMPLETED]: "Completed",
};
