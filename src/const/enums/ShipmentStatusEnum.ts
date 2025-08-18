export enum ShipmentStatus {
  None = "None",
  New = "New",
  PackingPending = "PackingPending",
  DeliveryPending = "DeliveryPending",
  Completed = "Completed",
}

export const ShipmentStatusLabels: Record<ShipmentStatus, string> = {
  [ShipmentStatus.None]: "No Status",
  [ShipmentStatus.New]: "New",
  [ShipmentStatus.PackingPending]: "Packing Pending",
  [ShipmentStatus.DeliveryPending]: "Delivery Pending",
  [ShipmentStatus.Completed]: "Completed",
};
